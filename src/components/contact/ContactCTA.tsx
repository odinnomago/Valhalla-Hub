'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Music, 
  Users, 
  Handshake, 
  TrendingUp,
  ArrowRight,
  Star,
  Zap,
  Target
} from 'lucide-react';
import { motion } from 'framer-motion';

const ContactCTA = () => {
  const ctaOptions = [
    {
      id: 'artistas',
      icon: Music,
      title: 'Para Artistas',
      subtitle: 'Comece Sua Carreira',
      description: 'Transforme seu talento em sucesso profissional',
      href: '/artistas/cadastro',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      borderColor: 'border-primary/30',
      buttonText: 'Enviar Demo',
      badge: 'Mais Popular',
      features: [
        'Análise profissional do seu material',
        'Mentoria com artistas estabelecidos',
        'Distribuição em plataformas digitais',
        'Oportunidades de shows e eventos'
      ]
    },
    {
      id: 'fas',
      icon: Users,
      title: 'Para Fãs',
      subtitle: 'Junte-se à Comunidade',
      description: 'Conecte-se com artistas e outros fãs apaixonados',
      href: '/comunidade',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      borderColor: 'border-accent/30',
      buttonText: 'Participar',
      badge: 'Gratuito',
      features: [
        'Acesso a conteúdo exclusivo',
        'Eventos privados para membros',
        'Desconto em shows e produtos',
        'Interação direta com artistas'
      ]
    },
    {
      id: 'parceiros',
      icon: Handshake,
      title: 'Para Parceiros',
      subtitle: 'Seja Nosso Parceiro',
      description: 'Cresça conosco através de parcerias estratégicas',
      href: '/parcerias',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      borderColor: 'border-blue-400/30',
      buttonText: 'Propor Parceria',
      badge: 'B2B',
      features: [
        'Oportunidades de co-branding',
        'Patrocínio de eventos',
        'Integração tecnológica',
        'Acesso a dados e insights'
      ]
    },
    {
      id: 'investidores',
      icon: TrendingUp,
      title: 'Para Investidores',
      subtitle: 'Conheça Nosso Pitch',
      description: 'Invista no futuro da indústria musical',
      href: '/investidores',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      borderColor: 'border-green-400/30',
      buttonText: 'Ver Oportunidades',
      badge: 'Exclusivo',
      features: [
        'Crescimento de 200% ao ano',
        'Mercado de R$ 2.9 bilhões',
        'Tecnologia proprietária',
        'Equipe experiente e dedicada'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        
        {/* Animated background shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6"
          >
            <Zap className="w-5 h-5" />
            <span className="font-medium">Junte-se à Revolução Musical</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-headline">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Seu Lugar
            </span>
            <br />
            <span className="text-foreground">no Ecossistema</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
            Seja você artista, fã, parceiro ou investidor, há um lugar especial para você 
            no ecossistema Valhalla. Escolha seu caminho e comece hoje mesmo.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {ctaOptions.map((option, index) => {
            const Icon = option.icon;
            
            return (
              <motion.div
                key={option.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <Card className={`
                  h-full overflow-hidden transition-all duration-500
                  bg-card/50 backdrop-blur-sm border-2 ${option.borderColor}
                  group-hover:bg-card/80 group-hover:shadow-2xl
                  group-hover:shadow-primary/20
                `}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`
                        p-4 rounded-2xl ${option.bgColor}
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className={`w-10 h-10 ${option.color}`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/20 text-primary-foreground"
                      >
                        {option.badge}
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-2">
                          {option.title}
                        </p>
                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                          {option.subtitle}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          <Target className="w-4 h-4 text-primary" />
                          O que você ganha:
                        </h4>
                        <ul className="space-y-2">
                          {option.features.map((feature, featureIndex) => (
                            <motion.li 
                              key={featureIndex} 
                              className="flex items-start gap-2 text-sm text-foreground/70"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      <Button 
                        className={`
                          w-full netflix-button text-lg py-6
                          ${option.color === 'text-primary' 
                            ? 'bg-primary hover:bg-primary/90' 
                            : 'bg-accent hover:bg-accent/90'
                          }
                          group/button
                        `}
                        asChild
                      >
                        <a href={option.href}>
                          {option.buttonText}
                          <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-5 h-5 group-hover/button:scale-110 transition-transform" />
                          </motion.div>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;