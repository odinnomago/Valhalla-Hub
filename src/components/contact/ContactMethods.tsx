'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactMethod {
  id: string;
  title: string;
  description: string;
  icon: string;
  availability: string;
  status: 'online' | 'offline' | 'busy';
  action: string;
  href?: string;
  onClick?: () => void;
  badge?: string;
  responseTime?: string;
}

const ContactMethods: React.FC = () => {
  const [hoveredMethod, setHoveredMethod] = useState<string | null>(null);

  const contactMethods: ContactMethod[] = [
    {
      id: 'chat',
      title: 'Chat Online',
      description: 'Atendimento imediato com nossa equipe',
      icon: '💬',
      availability: 'Disponível agora',
      status: 'online',
      action: 'Iniciar Chat',
      responseTime: 'Resposta imediata',
      badge: 'Mais Rápido',
      onClick: () => {
        // Implementar abertura do chat widget
        console.log('Opening chat widget...');
      }
    },
    {
      id: 'phone',
      title: 'Telefone',
      description: 'Conversação direta com especialistas',
      icon: '📞',
      availability: 'Seg-Sex, 9h-18h',
      status: 'online',
      action: 'Ligar Agora',
      href: 'tel:+5511999999999',
      responseTime: '+55 11 99999-9999'
    },
    {
      id: 'email',
      title: 'Email',
      description: 'Para assuntos complexos e documentação',
      icon: '📧',
      availability: 'Sempre disponível',
      status: 'online',
      action: 'Enviar Email',
      responseTime: 'Resposta em 24h',
      href: 'mailto:contato@valhallahub.com.br'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-primary';
      case 'busy': return 'bg-accent';
      case 'offline': return 'bg-destructive';
      default: return 'bg-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online';
      case 'busy': return 'Ocupado';
      case 'offline': return 'Offline';
      default: return 'Indisponível';
    }
  };

  return (
    <section className="py-20 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-foreground mb-4">
            Como você prefere{' '}
            <span className="text-primary">conversar</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada canal tem suas vantagens. Escolha o que melhor se adapta à sua necessidade.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredMethod(method.id)}
              onHoverEnd={() => setHoveredMethod(null)}
              className="group relative"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 h-full transition-all duration-300 hover:border-primary/50 hover:bg-card/80 netflix-hover">
                {/* Badge */}
                {method.badge && (
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
                    {method.badge}
                  </div>
                )}

                {/* Icon and Status */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-5xl">{method.icon}</div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(method.status)} animate-pulse`}></div>
                    <span className="text-xs text-muted-foreground">{getStatusText(method.status)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {method.description}
                  </p>
                  
                  {/* Availability */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>🕒</span>
                    <span>{method.availability}</span>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>⚡</span>
                    <span>{method.responseTime}</span>
                  </div>
                </div>

                {/* Action Button */}
                <motion.div
                  className="mt-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {method.href ? (
                    <a
                      href={method.href}
                      className="block w-full bg-gradient-to-r from-muted to-secondary text-foreground py-3 px-6 rounded-xl font-medium text-center transition-all duration-300 hover:from-primary hover:to-accent hover:text-primary-foreground netflix-button group-hover:shadow-lg group-hover:shadow-primary/25"
                    >
                      {method.action}
                    </a>
                  ) : (
                    <button
                      onClick={method.onClick}
                      className="w-full bg-gradient-to-r from-muted to-secondary text-foreground py-3 px-6 rounded-xl font-medium transition-all duration-300 hover:from-primary hover:to-accent hover:text-primary-foreground netflix-button group-hover:shadow-lg group-hover:shadow-primary/25"
                    >
                      {method.action}
                    </button>
                  )}
                </motion.div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                  animate={{ opacity: hoveredMethod === method.id ? 1 : 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground">
            💡 <strong>Dica:</strong> Para questões urgentes, use o chat. Para assuntos complexos, prefira o email.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactMethods;