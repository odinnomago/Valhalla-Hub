'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Handshake, 
  Newspaper, 
  HeadphonesIcon, 
  TrendingUp,
  Mail,
  Phone,
  Users,
  Briefcase,
  Camera
} from 'lucide-react';
import { motion } from 'framer-motion';

const ContactChannels = () => {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const channels = [
    {
      id: 'artistas',
      icon: Music,
      title: 'Quer Fazer Parte do Ecossistema?',
      description: 'Envie seu demo, portfólio ou manifeste seu interesse em se tornar um artista Valhalla',
      email: 'artistas@valhallahub.com.br',
      cta: 'Envie Seu Material',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      category: 'Artistas e Talentos',
      badge: 'Mais Procurado',
      features: [
        'Análise de demo em até 7 dias',
        'Feedback personalizado da equipe A&R',
        'Oportunidades no ecossistema Valhalla',
        'Mentoria com artistas estabelecidos'
      ]
    },
    {
      id: 'parcerias',
      icon: Handshake,
      title: 'Vamos Construir Juntos?',
      description: 'Propostas de parceria, patrocínios e colaborações estratégicas',
      email: 'parcerias@valhallahub.com.br',
      phone: '+55 11 99999-9999',
      cta: 'Seja Nosso Parceiro',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      category: 'Parcerias Empresariais',
      badge: 'Estratégico',
      features: [
        'Patrocínios de eventos e artistas',
        'Colaborações tecnológicas',
        'Integração de marcas no ecossistema',
        'Oportunidades de co-branding'
      ]
    },
    {
      id: 'imprensa',
      icon: Newspaper,
      title: 'Sala de Imprensa',
      description: 'Material para jornalistas, releases e solicitações de entrevistas',
      email: 'imprensa@valhallahub.com.br',
      cta: 'Acesso à Imprensa',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      category: 'Imprensa e Mídia',
      badge: 'Media Kit',
      features: [
        'Kit de mídia completo',
        'Releases e comunicados',
        'Agenda de entrevistas',
        'Fotos e vídeos em alta resolução'
      ]
    },
    {
      id: 'suporte',
      icon: HeadphonesIcon,
      title: 'Precisa de Ajuda?',
      description: 'Suporte para usuários das plataformas Valhalla Hub',
      email: 'suporte@valhallahub.com.br',
      cta: 'Abrir Chamado',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      category: 'Suporte Técnico',
      badge: '24/7',
      features: [
        'Chat online (horário comercial)',
        'Sistema de tickets',
        'FAQ integrado',
        'Suporte técnico especializado'
      ]
    },
    {
      id: 'investidores',
      icon: TrendingUp,
      title: 'Oportunidades de Investimento',
      description: 'Conheça nosso pitch deck e oportunidades de crescimento',
      email: 'investidores@valhallahub.com.br',
      cta: 'Receba Nosso Deck',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      category: 'Investidores',
      badge: 'Exclusivo',
      features: [
        'Pitch deck completo',
        'Relatórios financeiros',
        'Roadmap de crescimento',
        'Oportunidades de investimento'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section id="canais-contato" className="py-20 md:py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline">
            Escolha Seu Canal de Comunicação
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Diferentes necessidades, canais especializados. Encontre o melhor caminho para se conectar.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            const isSelected = selectedChannel === channel.id;
            
            return (
              <motion.div
                key={channel.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedChannel(isSelected ? null : channel.id)}
                className="cursor-pointer"
              >
                <Card className={`
                  group h-full overflow-hidden transition-all duration-500
                  ${isSelected 
                    ? 'bg-card/90 border-primary/50 shadow-2xl shadow-primary/20 scale-105' 
                    : 'bg-card/50 border-border/50 hover:bg-card/80 hover:border-primary/30 hover:shadow-xl'
                  }
                  backdrop-blur-sm
                `}>
                  <CardHeader className="relative pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`
                        p-4 rounded-2xl ${channel.bgColor} 
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className={`w-8 h-8 ${channel.color}`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/20 text-primary-foreground text-xs"
                      >
                        {channel.badge}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                        {channel.category}
                      </p>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                        {channel.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <p className="text-foreground/80 leading-relaxed">
                      {channel.description}
                    </p>

                    {/* Contact Information */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="w-4 h-4 text-primary" />
                        <a 
                          href={`mailto:${channel.email}`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          {channel.email}
                        </a>
                      </div>
                      
                      {channel.phone && (
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-accent" />
                          <a 
                            href={`tel:${channel.phone}`}
                            className="text-accent hover:text-accent/80 transition-colors"
                          >
                            {channel.phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Features */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 border-t border-border/50 pt-4"
                      >
                        <h4 className="font-medium text-foreground">O que oferecemos:</h4>
                        <ul className="space-y-2">
                          {channel.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    <Button 
                      className="w-full netflix-button bg-primary hover:bg-primary/90 group"
                      asChild
                    >
                      <a href={`mailto:${channel.email}`}>
                        {channel.cta}
                        <motion.div
                          className="ml-2"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          →
                        </motion.div>
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Não encontrou o que procura?</h3>
            <p className="text-foreground/70 mb-6">
              Nossa equipe está sempre pronta para ajudar. Use nosso formulário geral ou inicie um chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild className="border-primary/50 hover:border-primary">
                <a href="#formulario-contato">Formulário Geral</a>
              </Button>
              <Button className="bg-accent hover:bg-accent/90">
                <Users className="mr-2 h-4 w-4" />
                Iniciar Chat
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactChannels;