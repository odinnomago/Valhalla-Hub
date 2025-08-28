'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Star,
  Gift,
  Bell,
  Music,
  Headphones,
  Mic,
  Radio,
  Settings,
  TrendingUp
} from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
  interests: z.array(z.string()).min(1, 'Selecione pelo menos um interesse'),
  source: z.string().optional(),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: 'default' | 'contextual' | 'exit-intent' | 'post-reading';
  context?: {
    articleTitle?: string;
    category?: string;
    tags?: string[];
    userBehavior?: {
      scrollDepth?: number;
      timeOnPage?: number;
      isReturning?: boolean;
    };
  };
  title?: string;
  description?: string;
  className?: string;
  onSuccess?: (data: NewsletterFormData) => void;
}

const NewsletterForm: React.FC<NewsletterFormProps> = ({
  variant = 'default',
  context,
  title,
  description,
  className = '',
  onSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    mode: 'onChange'
  });

  // Intelligent content based on context
  const getContextualContent = () => {
    const defaultContent = {
      title: 'Receba o Melhor Conteúdo Musical',
      description: 'Junte-se a 50.000+ assinantes e receba insights exclusivos, tutoriais e oportunidades no ecossistema Valhalla.',
      interests: ['production', 'career', 'technology', 'events', 'business']
    };

    if (!context) return defaultContent;

    let contextualTitle = title || defaultContent.title;
    let contextualDescription = description || defaultContent.description;
    let suggestedInterests = [...defaultContent.interests];

    // Contextual targeting based on article content
    if (context.category) {
      switch (context.category) {
        case 'Produção Musical':
          contextualTitle = 'Domine a Produção Musical';
          contextualDescription = 'Receba tutoriais exclusivos, dicas de produção e técnicas avançadas para levar sua música ao próximo nível.';
          suggestedInterests = ['production', 'technology', 'tutorials'];
          break;
        case 'Carreira Artística':
          contextualTitle = 'Impulsione Sua Carreira Musical';
          contextualDescription = 'Oportunidades, dicas de marketing e estratégias para artistas independentes e emergentes.';
          suggestedInterests = ['career', 'marketing', 'opportunities'];
          break;
        case 'Tecnologia':
          contextualTitle = 'Inovação na Música Digital';
          contextualDescription = 'Fique por dentro das últimas tecnologias, ferramentas e tendências que estão transformando a música.';
          suggestedInterests = ['technology', 'innovation', 'tools'];
          break;
        case 'Eventos':
          contextualTitle = 'Não Perca Nenhum Evento';
          contextualDescription = 'Seja o primeiro a saber sobre shows, workshops, masterclasses e oportunidades de networking.';
          suggestedInterests = ['events', 'networking', 'workshops'];
          break;
      }
    }

    // Behavioral targeting
    if (context.userBehavior) {
      if (context.userBehavior.scrollDepth && context.userBehavior.scrollDepth > 70) {
        contextualDescription += ' + conteúdo exclusivo para leitores dedicados como você!';
      }
      if (context.userBehavior.isReturning) {
        contextualDescription = 'Vemos que você voltou! Que tal receber nosso conteúdo diretamente na sua caixa de entrada?';
      }
    }

    return {
      title: contextualTitle,
      description: contextualDescription,
      interests: suggestedInterests
    };
  };

  const interestOptions = [
    {
      id: 'production',
      label: 'Produção Musical',
      description: 'Tutoriais, técnicas e ferramentas',
      icon: Music,
      color: 'text-primary'
    },
    {
      id: 'career',
      label: 'Carreira Artística',
      description: 'Marketing, networking e oportunidades',
      icon: TrendingUp,
      color: 'text-accent'
    },
    {
      id: 'technology',
      label: 'Tecnologia Musical',
      description: 'Inovações, ferramentas e tendências',
      icon: Settings,
      color: 'text-blue-400'
    },
    {
      id: 'events',
      label: 'Eventos e Workshops',
      description: 'Shows, cursos e networking',
      icon: Radio,
      color: 'text-green-400'
    },
    {
      id: 'business',
      label: 'Negócios da Música',
      description: 'Indústria, contratos e royalties',
      icon: Headphones,
      color: 'text-purple-400'
    },
    {
      id: 'tutorials',
      label: 'Tutoriais Práticos',
      description: 'Passo a passo e guias detalhados',
      icon: Mic,
      color: 'text-orange-400'
    }
  ];

  const contextualContent = getContextualContent();

  const handleInterestChange = (interestId: string, checked: boolean) => {
    let newInterests;
    if (checked) {
      newInterests = [...selectedInterests, interestId];
    } else {
      newInterests = selectedInterests.filter(id => id !== interestId);
    }
    
    setSelectedInterests(newInterests);
    setValue('interests', newInterests);
  };

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock success response
      console.log('Newsletter subscription successful:', data);
      setSubmitStatus('success');
      onSuccess?.(data);
      
      // Reset form after successful submission
      reset();
      setSelectedInterests([]);
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'exit-intent':
        return 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
      case 'post-reading':
        return 'border-t border-border/50 pt-8 mt-8';
      default:
        return '';
    }
  };

  const renderFormContent = () => (
    <div className={`space-y-6 ${variant === 'exit-intent' ? 'max-w-md w-full' : ''}`}>
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold">
          {contextualContent.title}
        </h3>
        <p className="text-foreground/70">
          {contextualContent.description}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
            className={errors.email ? 'border-destructive' : ''}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Nome (opcional)</Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            {...register('name')}
          />
        </div>

        <div className="space-y-3">
          <Label>Interesses *</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interestOptions
              .filter(option => contextualContent.interests.includes(option.id))
              .map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={`interest-${option.id}`}
                      checked={selectedInterests.includes(option.id)}
                      onCheckedChange={(checked) => 
                        handleInterestChange(option.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`interest-${option.id}`} 
                      className="flex items-start space-x-2 cursor-pointer"
                    >
                      <Icon className={`w-5 h-5 mt-0.5 ${option.color}`} />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
          </div>
          {errors.interests && (
            <p className="text-sm text-destructive">{errors.interests.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full netflix-button bg-primary hover:bg-primary/90"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processando...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Inscrever-se Agora
            </>
          )}
        </Button>
      </form>

      {submitStatus === 'success' && (
        <Alert variant="default" className="border-green-500/50 bg-green-500/10">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertDescription className="text-green-500">
            Inscrição realizada com sucesso! Confira seu email para confirmar.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Ocorreu um erro ao processar sua inscrição. Tente novamente.
          </AlertDescription>
        </Alert>
      )}

      <p className="text-xs text-center text-muted-foreground">
        Ao se inscrever, você concorda com nossa Política de Privacidade.
        Você pode cancelar a inscrição a qualquer momento.
      </p>
    </div>
  );

  if (variant === 'exit-intent') {
    return (
      <div className={getVariantStyles()}>
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 max-w-md w-full mx-4">
          <CardContent className="p-6">
            {renderFormContent()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={className}>
      <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${getVariantStyles()}`}>
        <CardContent className="p-6">
          {renderFormContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterForm;