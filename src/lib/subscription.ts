import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export interface UserSubscription {
  id: string;
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'trialing';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  trialEnd?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionUsage {
  userId: string;
  planId: string;
  coursesCompleted: number;
  hoursWatched: number;
  mentorshipHoursUsed: number;
  demosSubmitted: number;
  communityPosts: number;
  opportunitiesApplied: number;
  periodStart: Date;
  periodEnd: Date;
}

export class SubscriptionManager {
  
  static async createCheckoutSession(params: {
    planId: string;
    isAnnual: boolean;
    userId: string;
    email: string;
    successUrl?: string;
    cancelUrl?: string;
  }) {
    try {
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  static async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return {
        success: true,
        cancelAt: new Date(subscription.current_period_end * 1000),
      };
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  static async reactivateSubscription(subscriptionId: string) {
    try {
      const subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });

      return {
        success: true,
        subscription,
      };
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      throw error;
    }
  }

  static async changeSubscriptionPlan(subscriptionId: string, newPriceId: string) {
    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      
      const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: newPriceId,
        }],
        proration_behavior: 'create_prorations',
      });

      return {
        success: true,
        subscription: updatedSubscription,
      };
    } catch (error) {
      console.error('Error changing subscription plan:', error);
      throw error;
    }
  }

  static async getSubscriptionUsage(userId: string): Promise<SubscriptionUsage | null> {
    // In a real implementation, this would query your database
    // For now, return mock data
    return {
      userId,
      planId: 'pro',
      coursesCompleted: 12,
      hoursWatched: 48,
      mentorshipHoursUsed: 2,
      demosSubmitted: 3,
      communityPosts: 15,
      opportunitiesApplied: 6,
      periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      periodEnd: new Date(),
    };
  }

  static async checkPlanLimits(userId: string, action: string): Promise<{ allowed: boolean; reason?: string }> {
    const usage = await this.getSubscriptionUsage(userId);
    if (!usage) {
      return { allowed: false, reason: 'No subscription found' };
    }

    // Get user's current plan limits
    const planLimits = this.getPlanLimits(usage.planId);

    switch (action) {
      case 'course_access':
        if (planLimits.coursesPerMonth === -1) return { allowed: true };
        return {
          allowed: usage.coursesCompleted < planLimits.coursesPerMonth,
          reason: usage.coursesCompleted >= planLimits.coursesPerMonth ? 'Monthly course limit reached' : undefined,
        };

      case 'demo_submission':
        if (planLimits.demosPerMonth === -1) return { allowed: true };
        return {
          allowed: usage.demosSubmitted < planLimits.demosPerMonth,
          reason: usage.demosSubmitted >= planLimits.demosPerMonth ? 'Monthly demo limit reached' : undefined,
        };

      case 'mentorship_booking':
        if (planLimits.mentorshipHoursPerMonth === -1) return { allowed: true };
        return {
          allowed: usage.mentorshipHoursUsed < planLimits.mentorshipHoursPerMonth,
          reason: usage.mentorshipHoursUsed >= planLimits.mentorshipHoursPerMonth ? 'Monthly mentorship limit reached' : undefined,
        };

      default:
        return { allowed: true };
    }
  }

  static getPlanLimits(planId: string) {
    const limits = {
      free: {
        coursesPerMonth: 1,
        demosPerMonth: 0,
        mentorshipHoursPerMonth: 0,
        marketplaceDiscount: 0,
        communityAccess: 'basic',
      },
      basic: {
        coursesPerMonth: 3,
        demosPerMonth: 2,
        mentorshipHoursPerMonth: 0,
        marketplaceDiscount: 10,
        communityAccess: 'standard',
      },
      pro: {
        coursesPerMonth: -1, // unlimited
        demosPerMonth: 4,
        mentorshipHoursPerMonth: 1,
        marketplaceDiscount: 20,
        communityAccess: 'premium',
      },
      elite: {
        coursesPerMonth: -1, // unlimited
        demosPerMonth: -1, // unlimited
        mentorshipHoursPerMonth: 3,
        marketplaceDiscount: 30,
        communityAccess: 'elite',
      },
      business: {
        coursesPerMonth: -1, // unlimited
        demosPerMonth: 10,
        mentorshipHoursPerMonth: -1, // unlimited
        marketplaceDiscount: 25,
        communityAccess: 'business',
      },
    };

    return limits[planId as keyof typeof limits] || limits.free;
  }

  static async generateUpgradeRecommendation(userId: string) {
    const usage = await this.getSubscriptionUsage(userId);
    if (!usage) return null;

    const currentLimits = this.getPlanLimits(usage.planId);
    const recommendations = [];

    // Check if user is hitting limits
    if (currentLimits.coursesPerMonth !== -1 && usage.coursesCompleted >= currentLimits.coursesPerMonth * 0.8) {
      recommendations.push({
        reason: 'course_limit',
        message: 'Você está próximo do limite de cursos mensais',
        suggestedPlan: usage.planId === 'basic' ? 'pro' : 'elite',
        urgency: 'high',
      });
    }

    if (currentLimits.demosPerMonth !== -1 && usage.demosSubmitted >= currentLimits.demosPerMonth * 0.8) {
      recommendations.push({
        reason: 'demo_limit',
        message: 'Você está próximo do limite de demos mensais',
        suggestedPlan: usage.planId === 'basic' ? 'pro' : 'elite',
        urgency: 'medium',
      });
    }

    if (usage.mentorshipHoursUsed > 0 && currentLimits.mentorshipHoursPerMonth === 0) {
      recommendations.push({
        reason: 'mentorship_needed',
        message: 'Desbloqueie acesso à mentoria especializada',
        suggestedPlan: 'pro',
        urgency: 'medium',
      });
    }

    return recommendations.length > 0 ? recommendations[0] : null;
  }

  static async processRefund(paymentIntentId: string, amount?: number) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount: amount, // If not specified, refunds the full amount
      });

      return {
        success: true,
        refund,
      };
    } catch (error) {
      console.error('Error processing refund:', error);
      throw error;
    }
  }

  static async createCustomerPortalSession(customerId: string, returnUrl: string) {
    try {
      const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return {
        success: true,
        url: session.url,
      };
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      throw error;
    }
  }
}

export default SubscriptionManager;