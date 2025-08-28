'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Mail, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Star,
  Gift,
  Calendar,
  Briefcase,
  TrendingUp,
  Music,
  Users,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
  interests: z.array(z.string()).min(1, 'Selecione pelo menos um interesse'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
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

  const interestOptions = [
    {
      id: 'lancamentos',
      label: 'Lançamentos de artistas',
      description: 'Novos álbuns, singles e EPs',
      icon: Music,
      color: 'text-primary'
    },
    {
      id: 'eventos',
      label: 'Eventos e shows',
      description: 'Concertos, festivais e apresentações',
      icon: Calendar,
      color: 'text-accent'
    },
    {
      id: 'cursos',
      label: 'Cursos e workshops',
      description: 'Educação musical e produção',
      icon: Star,
      color: 'text-blue-400'
    },
    {
      id: 'carreira',
      label: 'Oportunidades de carreira',
      description: 'Vagas e oportunidades profissionais',
      icon: Briefcase,
      color: 'text-green-400'
    },
    {
      id: 'noticias',
      label: 'Notícias da indústria',
      description: 'Tendências e novidades do mercado',
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ];

  const benefits = [
    {
      icon: Star,
      title: 'Acesso antecipado a lançamentos',
      description: 'Seja o primeiro a ouvir novos artistas'
    },
    {
      icon: Gift,
      title: 'Descontos exclusivos em eventos',
      description: 'Até 30% off em shows e workshops'
    },
    {
      icon: Users,
      title: 'Conteúdo especial para assinantes',
      description: 'Entrevistas, bastidores e materiais únicos'
    },
    {
      icon: Bell,
      title: 'Oportunidades únicas no ecossistema',
      description: 'Parcerias, colaborações e networking'
    }
  ];

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

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would send the data to your newsletter service
      console.log('Newsletter subscription:', data);
      
      setSubmitStatus('success');
      reset();
      setSelectedInterests([]);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline">
              Fique por Dentro de Tudo
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Receba em primeira mão lançamentos, eventos e oportunidades exclusivas do ecossistema Valhalla.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Newsletter Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/20 rounded-2xl">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Newsletter Valhalla</h3>
                      <p className="text-foreground/70">Junte-se a mais de 50K assinantes</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Field */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="seu@email.com"
                        className={`py-6 ${errors.email ? 'border-destructive' : ''}`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Name Field */}
                    <motion.div 
                      className="space-y-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <Label htmlFor="name">Nome (opcional)</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Seu nome"
                        className="py-6"
                      />
                    </motion.div>

                    {/* Interests */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <Label>Interesses *</Label>
                      <div className="space-y-3">
                        {interestOptions.map((interest) => {
                          const Icon = interest.icon;
                          const isSelected = selectedInterests.includes(interest.id);
                          
                          return (
                            <motion.div
                              key={interest.id}
                              className={`
                                flex items-start gap-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer
                                ${isSelected 
                                  ? 'border-primary/50 bg-primary/10' 
                                  : 'border-border/50 hover:border-primary/30 hover:bg-card/50'
                                }
                              `}
                              onClick={() => handleInterestChange(interest.id, !isSelected)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={(checked) => handleInterestChange(interest.id, checked as boolean)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Icon className={`w-5 h-5 ${interest.color}`} />
                                  <span className="font-medium">{interest.label}</span>
                                </div>
                                <p className="text-sm text-foreground/70">{interest.description}</p>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                      {errors.interests && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.interests.message}
                        </p>
                      )}
                    </motion.div>

                    {/* Submit Status */}
                    <AnimatePresence>
                      {submitStatus !== 'idle' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <Alert className={submitStatus === 'success' ? 'border-green-500' : 'border-destructive'}>
                            <div className="flex items-center gap-2">
                              {submitStatus === 'success' ? (
                                <CheckCircle className="w-4 h-4 text-green-500" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-destructive" />
                              )}
                              <AlertDescription>
                                {submitStatus === 'success' 
                                  ? 'Inscrição realizada com sucesso! Verifique seu email.' 
                                  : 'Erro ao realizar inscrição. Tente novamente.'
                                }
                              </AlertDescription>
                            </div>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <Button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className="w-full netflix-button bg-primary hover:bg-primary/90 py-6 text-lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Inscrevendo...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Inscrever-se na Newsletter
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <p className="text-xs text-muted-foreground text-center">
                      Ao se inscrever, você concorda com nossa política de privacidade. 
                      Você pode cancelar a inscrição a qualquer momento.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Benefits */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-3xl font-bold mb-6">O que você vai receber:</h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-4 p-6 bg-card/30 rounded-xl border border-border/50 hover:bg-card/50 transition-colors duration-300"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-3 bg-primary/20 rounded-xl">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                          <p className="text-foreground/70">{benefit.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30">
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold mb-4 text-center">Nossa Comunidade</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">50K+</div>
                        <div className="text-sm text-foreground/70">Assinantes</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">95%</div>
                        <div className="text-sm text-foreground/70">Satisfação</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">2x</div>
                        <div className="text-sm text-foreground/70">Por semana</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground/80 mb-4 italic">
                      "A newsletter da Valhalla Hub é incrível! Sempre fico sabendo dos lançamentos 
                      antes de todo mundo e já consegui vários descontos exclusivos."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Music className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Marina Silva</div>
                        <div className="text-sm text-foreground/70">Produtora Musical</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;