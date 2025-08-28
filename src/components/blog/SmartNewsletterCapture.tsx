'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { X, Mail, Gift, Music, Settings, Calendar } from 'lucide-react';
import { useSmartNewsletter } from '@/hooks/useSmartNewsletter';

interface SmartNewsletterCaptureProps {
  contentCategory?: string;
  authorName?: string;
  className?: string;
}

const SmartNewsletterCapture: React.FC<SmartNewsletterCaptureProps> = ({
  contentCategory = 'general',
  authorName,
  className = ''
}) => {
  const { shouldShow, markAsShown, markAsSubscribed } = useSmartNewsletter();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Smart content based on category - inspired by your UX analysis
  const getContextualContent = () => {
    const contextualMessages = {
      'Produção Musical': {
        title: 'Domine a Produção Musical',
        description: 'Receba tutoriais exclusivos, dicas de produção e técnicas avançadas direto de produtores profissionais.',
        incentive: 'Próximo envio: "10 Segredos de Mixagem dos Profissionais"',
        icon: Music
      },
      'Carreira Artística': {
        title: 'Acelere Sua Carreira Musical',
        description: 'Estratégias comprovadas para construir uma carreira sólida na indústria musical.',
        incentive: 'Bônus: E-book "Guia Completo do Artista Independente"',
        icon: Gift
      },
      'Tecnologia': {
        title: 'Futuro da Música e Tecnologia',
        description: 'Fique por dentro das inovações que estão transformando a indústria musical.',
        incentive: 'Acesso antecipado a reviews de equipamentos',
        icon: Settings
      },
      'Eventos': {
        title: 'Oportunidades Musicais',
        description: 'Seja o primeiro a saber sobre festivais, concursos e oportunidades na cena musical.',
        incentive: 'Newsletter exclusiva com oportunidades semanais',
        icon: Calendar
      }
    };

    return contextualMessages[contentCategory as keyof typeof contextualMessages] || {
      title: 'Receba Conteúdo Exclusivo',
      description: 'Junte-se a milhares de músicos que recebem nosso conteúdo premium.',
      incentive: 'Conteúdo exclusivo toda semana',
      icon: Mail
    };
  };

  const contextualContent = getContextualContent();
  const IconComponent = contextualContent.icon;

  // Exit intent detection - similar to Hypebot approach
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0 && shouldShow) {
      setIsVisible(true);
      markAsShown();
    }
  }, [shouldShow, markAsShown]);

  // Scroll-based trigger - appears after 60% scroll like in your analysis
  const handleScroll = useCallback(() => {
    if (!shouldShow) return;

    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (scrollPercent > 60) {
      setIsVisible(true);
      markAsShown();
    }
  }, [shouldShow, markAsShown]);

  // Time-based trigger (fallback after 3 minutes)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (shouldShow) {
        setIsVisible(true);
        markAsShown();
      }
    }, 180000); // 3 minutes

    return () => clearTimeout(timeoutId);
  }, [shouldShow, markAsShown]);

  // Set up event listeners
  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseLeave, handleScroll]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'blog_modal',
          interests: [contentCategory],
          contentContext: {
            category: contentCategory,
            authorName
          },
          metadata: {
            referrer: window.location.href,
            utm_source: 'blog',
            utm_medium: 'modal',
            utm_campaign: 'smart_newsletter'
          }
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        markAsSubscribed(); // Mark as subscribed to prevent future shows
        
        // Auto-close after success
        setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        throw new Error(data.error || 'Falha na inscrição');
      }
      
    } catch (error) {
      console.error('Newsletter signup failed:', error);
      // Could show error state here
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          className="relative max-w-md w-full"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Card className="bg-card border-border/50 shadow-2xl">
            <CardContent className="p-6">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-muted/20"
              >
                <X className="h-4 w-4" />
              </Button>

              {/* Success State */}
              {isSuccess ? (
                <motion.div
                  className="text-center py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Bem-vindo à família!</h3>
                  <p className="text-muted-foreground">
                    Você receberá nosso próximo conteúdo exclusivo em breve.
                  </p>
                </motion.div>
              ) : (
                <>
                  {/* Icon */}
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">
                      {contextualContent.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {contextualContent.description}
                    </p>
                    <div className="bg-primary/10 text-primary text-sm p-2 rounded-lg">
                      {contextualContent.incentive}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Seu melhor email"
                      required
                      className="w-full"
                    />
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? 'Inscrevendo...' : 'Quero Receber Conteúdo Exclusivo'}
                    </Button>
                  </form>

                  {/* Author context */}
                  {authorName && (
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      Receba atualizações quando {authorName} publicar novos artigos
                    </p>
                  )}

                  {/* Trust indicators */}
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Mais de 10.000 músicos já confiam em nosso conteúdo. Sem spam, descadastre-se quando quiser.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SmartNewsletterCapture;