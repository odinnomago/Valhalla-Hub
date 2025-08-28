'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
  highlight?: boolean;
}

const LabelServices: React.FC = () => {
  const services: Service[] = [
    {
      icon: '🌍',
      title: 'Distribuição Global',
      description: 'Lançamentos em +150 plataformas de streaming',
      features: [
        'Spotify, Apple Music, YouTube Music',
        'Análise de performance em tempo real',
        'Gestão de direitos autorais',
        'Relatórios detalhados de royalties'
      ]
    },
    {
      icon: '🎙️',
      title: 'Produção e Gravação',
      description: 'Estúdios parceiros e produtores renomados',
      features: [
        'Estúdios equipados com tecnologia de ponta',
        'Produtores especializados por gênero',
        'Preços acessíveis para artistas',
        'Mixagem e masterização profissional'
      ],
      highlight: true
    },
    {
      icon: '📈',
      title: 'Marketing e Promoção',
      description: 'Estratégias digitais e campanhas eficazes',
      features: [
        'Marketing com IA e análise de dados',
        'Campanhas personalizadas por perfil',
        'Parcerias com influenciadores',
        'Gestão de redes sociais'
      ]
    },
    {
      icon: '💰',
      title: 'Gestão de Direitos',
      description: 'Transparência e controle total dos seus ganhos',
      features: [
        'Relatórios detalhados de royalties',
        'Registro de obras musicais',
        'Recuperação de direitos perdidos',
        'Consultoria jurídica especializada'
      ]
    },
    {
      icon: '🎯',
      title: 'Desenvolvimento Artístico',
      description: 'Mentoria e crescimento profissional completo',
      features: [
        'Coaching artístico personalizado',
        'Workshops e masterclasses',
        'Networking com profissionais',
        'Planejamento de carreira estratégico'
      ]
    },
    {
      icon: '🔧',
      title: 'Suporte Técnico',
      description: 'Infraestrutura tecnológica e suporte 24/7',
      features: [
        'Plataforma de gestão completa',
        'Suporte técnico especializado',
        'Backup e segurança de dados',
        'Integração com ferramentas musicais'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-headline">
            Serviços{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Completos
            </span>{' '}
            para Artistas
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tudo que você precisa para transformar seu talento em uma carreira sustentável
          </p>
        </motion.div>

        <div className="space-y-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-card/20 ${
                service.highlight 
                  ? 'bg-primary/5 border-l-4 border-primary' 
                  : 'border-l-4 border-transparent'
              }`}
            >
              {/* Service Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">{service.icon}</span>
                </div>
              </div>

              {/* Service Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {service.title}
                  </h3>
                  {service.highlight && (
                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-bold">
                      Popular
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>

                {/* Service Features - Compact */}
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {service.features.slice(0, 3).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-1">
                      <span className="text-primary text-xs">✓</span>
                      <span className="text-foreground/70 text-xs">{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{service.features.length - 3} mais</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default LabelServices;