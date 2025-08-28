'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const DemoSubmissionCTA: React.FC = () => {
  const router = useRouter();

  const handleDemoSubmission = () => {
    router.push('/gravadora/demo');
  };

  const handleContactSpecialist = () => {
    router.push('/contato?service=gravadora');
  };

  const benefits = [
    {
      icon: '🎯',
      title: 'Avaliação Profissional',
      description: 'Feedback detalhado da nossa equipe especializada'
    },
    {
      icon: '🚀',
      title: 'Resposta Rápida',
      description: 'Retorno em até 14 dias úteis'
    },
    {
      icon: '💰',
      title: 'Sem Taxas',
      description: 'Processo 100% gratuito e transparente'
    },
    {
      icon: '🌍',
      title: 'Alcance Global',
      description: 'Distribuição em mais de 150 plataformas'
    }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-headline">
            Pronto para{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Transformar
            </span>{' '}
            Sua Carreira?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Envie sua demo e descubra como a Valhalla pode impulsionar seu talento para o próximo nível
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* CTA Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              O Momento é Agora
            </h3>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Milhares de artistas já transformaram suas carreiras conosco. Sua música merece 
              ser ouvida pelo mundo. Não deixe seu talento passar despercebido – junte-se à 
              Valhalla Records e faça parte da revolução musical.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card/30 backdrop-blur-sm border border-border rounded-xl p-4 text-center hover:bg-card/50 transition-all"
                >
                  <div className="text-3xl mb-2">{benefit.icon}</div>
                  <h4 className="text-sm font-bold text-foreground mb-1">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground">{benefit.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={handleDemoSubmission}
                className="netflix-button bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-xl hover:bg-primary/90 transition-all transform hover:scale-105 shadow-2xl"
              >
                Enviar Demo Agora
              </button>
              <button
                onClick={handleContactSpecialist}
                className="netflix-button bg-transparent border-2 border-accent text-accent px-10 py-4 rounded-xl font-bold text-xl hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Falar com Especialista
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Processo Gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">✓</span>
                <span>Feedback Garantido</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Sem Compromisso</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30" />
              <div className="absolute inset-8 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-card/50 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
                  <span className="text-5xl">🎵</span>
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">
                  Sua Música, Nosso Alcance
                </h4>
                <p className="text-muted-foreground">
                  Transformamos talentos em carreiras sustentáveis
                </p>
              </div>
            </div>


          </motion.div>
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-border/30 rounded-2xl p-8">
            <p className="text-lg text-foreground/80 max-w-4xl mx-auto italic">
              "Na Valhalla Records, acreditamos que cada artista tem uma história única para contar. 
              Nossa missão é fornecer as ferramentas, o suporte e a plataforma para que essa história 
              seja ouvida em todo o mundo. Não se trata apenas de distribuir música – se trata de 
              construir carreiras sustentáveis e transformar sonhos em realidade."
            </p>
            <div className="mt-6">
              <p className="text-foreground font-bold">Equipe Valhalla Records</p>
              <p className="text-muted-foreground text-sm">Fundada por músicos, para músicos</p>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default DemoSubmissionCTA;