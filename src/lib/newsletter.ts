import { supabase } from './supabase';

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  interests: string[];
  source: string; // Where they subscribed from
  segments: string[];
  subscribed_at: string;
  last_activity?: string;
  preferences: {
    frequency: 'weekly' | 'biweekly' | 'monthly';
    content_types: string[];
    time_preference?: 'morning' | 'afternoon' | 'evening';
  };
  metadata: {
    user_agent?: string;
    referrer?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
  status: 'active' | 'pending' | 'unsubscribed' | 'bounced';
}

export interface SegmentationRules {
  production_enthusiasts: {
    interests: ['Produção Musical', 'Mixing', 'Mastering', 'Audio'];
    content_engagement: ['production', 'tutorial'];
  };
  career_focused: {
    interests: ['Carreira Artística', 'Marketing Musical', 'Negócios'];
    content_engagement: ['career', 'business'];
  };
  tech_innovators: {
    interests: ['Tecnologia', 'IA', 'Plugins', 'Inovação'];
    content_engagement: ['technology', 'innovation'];
  };
  event_goers: {
    interests: ['Eventos', 'Festivais', 'Live Performance'];
    content_engagement: ['events', 'live'];
  };
  beginners: {
    reading_time: { min: 0, max: 5 };
    tags: ['Iniciante', 'Básico', 'Tutorial'];
  };
  advanced_users: {
    reading_time: { min: 10, max: 999 };
    tags: ['Avançado', 'Profissional', 'Técnico'];
  };
}

class NewsletterService {
  private readonly tableName = 'newsletter_subscribers';
  
  /**
   * Subscribe a user to the newsletter with intelligent segmentation
   */
  async subscribe(subscriberData: {
    email: string;
    name?: string;
    source: string;
    interests?: string[];
    contentContext?: {
      category?: string;
      tags?: string[];
      authorName?: string;
      postId?: string;
    };
    metadata?: {
      user_agent?: string;
      referrer?: string;
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
    };
  }): Promise<{ success: boolean; subscriber?: NewsletterSubscriber; error?: string }> {
    try {
      // Check if email already exists
      const { data: existingSubscriber } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('email', subscriberData.email)
        .eq('status', 'active')
        .single();

      if (existingSubscriber) {
        // Update existing subscriber with new interests
        const updatedInterests = [
          ...new Set([
            ...existingSubscriber.interests,
            ...(subscriberData.interests || []),
            ...(subscriberData.contentContext?.category ? [subscriberData.contentContext.category] : [])
          ])
        ];

        const { data: updatedSubscriber, error } = await supabase
          .from(this.tableName)
          .update({
            interests: updatedInterests,
            segments: this.calculateSegments(updatedInterests, subscriberData.contentContext),
            last_activity: new Date().toISOString(),
            source: subscriberData.source
          })
          .eq('id', existingSubscriber.id)
          .select()
          .single();

        if (error) throw error;

        return { 
          success: true, 
          subscriber: updatedSubscriber,
        };
      }

      // Create new subscriber
      const interests = [
        ...(subscriberData.interests || []),
        ...(subscriberData.contentContext?.category ? [subscriberData.contentContext.category] : [])
      ];

      const newSubscriber: Omit<NewsletterSubscriber, 'id'> = {
        email: subscriberData.email,
        name: subscriberData.name,
        interests,
        source: subscriberData.source,
        segments: this.calculateSegments(interests, subscriberData.contentContext),
        subscribed_at: new Date().toISOString(),
        last_activity: new Date().toISOString(),
        preferences: {
          frequency: 'weekly',
          content_types: this.inferContentTypes(interests),
          time_preference: 'morning'
        },
        metadata: subscriberData.metadata || {},
        status: 'active'
      };

      const { data: createdSubscriber, error } = await supabase
        .from(this.tableName)
        .insert(newSubscriber)
        .select()
        .single();

      if (error) throw error;

      // Send to external email service (Mailchimp, ConvertKit, etc.)
      await this.syncToEmailService(createdSubscriber);

      // Send welcome email
      await this.sendWelcomeEmail(createdSubscriber);

      return { 
        success: true, 
        subscriber: createdSubscriber 
      };

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Subscription failed' 
      };
    }
  }

  /**
   * Calculate user segments based on interests and behavior
   */
  private calculateSegments(
    interests: string[], 
    contentContext?: {
      category?: string;
      tags?: string[];
      authorName?: string;
      postId?: string;
    }
  ): string[] {
    const segments: string[] = [];

    // Interest-based segmentation
    if (interests.some(i => ['Produção Musical', 'Mixing', 'Mastering', 'Audio'].includes(i))) {
      segments.push('production_enthusiasts');
    }

    if (interests.some(i => ['Carreira Artística', 'Marketing Musical', 'Negócios'].includes(i))) {
      segments.push('career_focused');
    }

    if (interests.some(i => ['Tecnologia', 'IA', 'Plugins', 'Inovação'].includes(i))) {
      segments.push('tech_innovators');
    }

    if (interests.some(i => ['Eventos', 'Festivais', 'Live Performance'].includes(i))) {
      segments.push('event_goers');
    }

    // Context-based segmentation
    if (contentContext?.tags) {
      const hasBeginnerTags = contentContext.tags.some(tag => 
        ['Iniciante', 'Básico', 'Tutorial'].includes(tag)
      );
      const hasAdvancedTags = contentContext.tags.some(tag => 
        ['Avançado', 'Profissional', 'Técnico'].includes(tag)
      );

      if (hasBeginnerTags) segments.push('beginners');
      if (hasAdvancedTags) segments.push('advanced_users');
    }

    // Author-based segmentation
    if (contentContext?.authorName) {
      segments.push(`author_${contentContext.authorName.toLowerCase().replace(/\s+/g, '_')}_followers`);
    }

    return [...new Set(segments)];
  }

  /**
   * Infer preferred content types from interests
   */
  private inferContentTypes(interests: string[]): string[] {
    const contentTypes: string[] = [];

    if (interests.some(i => ['Produção Musical', 'Mixing', 'Mastering'].includes(i))) {
      contentTypes.push('tutorials', 'tips', 'reviews');
    }

    if (interests.some(i => ['Carreira Artística', 'Marketing Musical'].includes(i))) {
      contentTypes.push('career_advice', 'industry_news', 'opportunities');
    }

    if (interests.some(i => ['Tecnologia', 'IA'].includes(i))) {
      contentTypes.push('tech_news', 'product_reviews', 'innovation');
    }

    if (interests.some(i => ['Eventos', 'Festivais'].includes(i))) {
      contentTypes.push('event_announcements', 'opportunities', 'networking');
    }

    return contentTypes.length > 0 ? contentTypes : ['general'];
  }

  /**
   * Sync subscriber to external email service
   */
  private async syncToEmailService(subscriber: NewsletterSubscriber): Promise<void> {
    try {
      // Example integration with Mailchimp/ConvertKit
      // Replace with your preferred email service API
      
      const emailServicePayload = {
        email: subscriber.email,
        name: subscriber.name,
        tags: subscriber.segments,
        custom_fields: {
          interests: subscriber.interests.join(','),
          source: subscriber.source,
          subscribed_at: subscriber.subscribed_at,
          segments: subscriber.segments.join(',')
        }
      };

      // Uncomment and configure for your email service
      /*
      const response = await fetch('https://api.mailchimp.com/3.0/lists/YOUR_LIST_ID/members', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(emailServicePayload)
      });

      if (!response.ok) {
        throw new Error(`Email service sync failed: ${response.statusText}`);
      }
      */

      console.log('Email service sync payload:', emailServicePayload);
    } catch (error) {
      console.error('Failed to sync to email service:', error);
      // Don't throw - we don't want to fail the whole subscription process
    }
  }

  /**
   * Send personalized welcome email
   */
  private async sendWelcomeEmail(subscriber: NewsletterSubscriber): Promise<void> {
    try {
      const welcomeContent = this.generateWelcomeContent(subscriber);
      
      // Example welcome email logic
      console.log('Welcome email content for', subscriber.email, ':', welcomeContent);
      
      // Integrate with your email sending service here
      // await sendEmail({
      //   to: subscriber.email,
      //   subject: welcomeContent.subject,
      //   html: welcomeContent.html,
      //   tags: ['welcome', 'newsletter']
      // });

    } catch (error) {
      console.error('Failed to send welcome email:', error);
    }
  }

  /**
   * Generate personalized welcome content based on user segments
   */
  private generateWelcomeContent(subscriber: NewsletterSubscriber) {
    let subject = 'Bem-vindo à comunidade Valhalla Hub! 🎵';
    let greeting = `Olá${subscriber.name ? ` ${subscriber.name}` : ''}!`;
    let personalizedContent = '';

    // Personalize based on primary segment
    if (subscriber.segments.includes('production_enthusiasts')) {
      personalizedContent = `
        <p>Vejo que você tem interesse em produção musical! Prepare-se para receber:</p>
        <ul>
          <li>🎧 Tutoriais exclusivos de mixing e mastering</li>
          <li>🔧 Reviews dos melhores plugins e equipamentos</li>
          <li>💡 Dicas avançadas de produtores profissionais</li>
        </ul>
      `;
    } else if (subscriber.segments.includes('career_focused')) {
      personalizedContent = `
        <p>Ótimo saber que você quer acelerar sua carreira musical! Você receberá:</p>
        <ul>
          <li>📈 Estratégias de marketing musical comprovadas</li>
          <li>💼 Oportunidades exclusivas na indústria</li>
          <li>🎯 Dicas para construir uma carreira sustentável</li>
        </ul>
      `;
    } else if (subscriber.segments.includes('tech_innovators')) {
      personalizedContent = `
        <p>Tecnologia musical é o futuro! Você receberá:</p>
        <ul>
          <li>🤖 Novidades em IA para música</li>
          <li>⚡ Reviews de ferramentas inovadoras</li>
          <li>🔮 Tendências que estão moldando a indústria</li>
        </ul>
      `;
    } else {
      personalizedContent = `
        <p>Você faz parte de uma comunidade incrível de músicos e criadores! Você receberá:</p>
        <ul>
          <li>🎵 Conteúdo exclusivo sobre música e tecnologia</li>
          <li>📚 Tutoriais e dicas práticas</li>
          <li>🌟 Oportunidades na indústria musical</li>
        </ul>
      `;
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #00f5ff;">${greeting}</h1>
        
        <p>Obrigado por se juntar à nossa comunidade! Estamos empolgados em ter você conosco.</p>
        
        ${personalizedContent}
        
        <p><strong>Próximos passos:</strong></p>
        <ol>
          <li>📱 Siga-nos nas redes sociais para conteúdo diário</li>
          <li>💬 Participe da nossa comunidade no Discord</li>
          <li>📖 Explore nosso blog para mais conteúdo gratuito</li>
        </ol>
        
        <p>Seu próximo email chegará ${subscriber.preferences.frequency === 'weekly' ? 'na próxima semana' : 'em breve'}!</p>
        
        <p>Música e tecnologia,<br/>
        <strong>Equipe Valhalla Hub</strong></p>
        
        <hr style="margin: 20px 0; border: 1px solid #eee;">
        <p style="font-size: 12px; color: #666;">
          Você pode alterar suas preferências ou cancelar sua inscrição a qualquer momento.
        </p>
      </div>
    `;

    return { subject, html };
  }

  /**
   * Get subscriber analytics and segments
   */
  async getAnalytics(): Promise<{
    total_subscribers: number;
    active_subscribers: number;
    segments: Record<string, number>;
    recent_growth: number;
  }> {
    try {
      const { data: subscribers, error } = await supabase
        .from(this.tableName)
        .select('segments, status, subscribed_at');

      if (error) throw error;

      const total = subscribers.length;
      const active = subscribers.filter(s => s.status === 'active').length;
      
      // Calculate segment distribution
      const segmentCounts: Record<string, number> = {};
      subscribers.forEach(subscriber => {
        if (subscriber.status === 'active') {
          subscriber.segments.forEach((segment: string) => {
            segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
          });
        }
      });

      // Calculate recent growth (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const recentSubscribers = subscribers.filter(s => 
        new Date(s.subscribed_at) > thirtyDaysAgo && s.status === 'active'
      ).length;

      return {
        total_subscribers: total,
        active_subscribers: active,
        segments: segmentCounts,
        recent_growth: recentSubscribers
      };

    } catch (error) {
      console.error('Analytics error:', error);
      return {
        total_subscribers: 0,
        active_subscribers: 0,
        segments: {},
        recent_growth: 0
      };
    }
  }

  /**
   * Unsubscribe a user
   */
  async unsubscribe(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ status: 'unsubscribed' })
        .eq('email', email);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unsubscribe failed' 
      };
    }
  }

  /**
   * Update subscriber preferences
   */
  async updatePreferences(
    email: string, 
    preferences: Partial<NewsletterSubscriber['preferences']>
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .update({ preferences })
        .eq('email', email);

      if (error) throw error;

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Update failed' 
      };
    }
  }
}

export const newsletterService = new NewsletterService();