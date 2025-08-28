'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string;
  icon: string;
  duration: string;
}

const AdhesionProcess: React.FC = () => {
  const router = useRouter();

  const steps: ProcessStep[] = [
    {
      number: '1',
      title: 'Envie Sua Demo',
      description: 'Compartilhe seu melhor material conosco',
      details: 'Envie até 3 músicas, portfólio e uma breve apresentação sobre sua trajetória musical',
      icon: '📤',
      duration: '5 min'
    },
    {
      number: '2',
      title: 'Avaliação',
      description: 'Nossa equipe analisa seu potencial',
      details: 'Avaliamos qualidade, originalidade, viabilidade comercial e alinhamento com nossa visão',
      icon: '🎯',
      duration: '7-14 dias'
    },
    {
      number: '3',
      title: 'Proposta',
      description: 'Recebemos você com um plano personalizado',
      details: 'Contrato justo com distribuição, marketing, suporte e condições transparentes',
      icon: '📋',
      duration: '2-3 dias'
    },
    {
      number: '4',
      title: 'Lançamento',
      description: 'Sua música chega ao mundo',
      details: 'Distribuição global, campanha de lançamento personalizada e suporte contínuo',
      icon: '🚀',
      duration: 'Contínuo'
    }
  ];

  const handleStartProcess = () => {
    router.push('/gravadora/demo');
  };

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
            Como{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transforme seu talento em carreira em 4 passos simples e transparentes
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 bg-card/20 rounded-xl hover:bg-card/30 transition-all"
            >
              {/* Step Number */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">{step.number}</span>
                </div>
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {step.duration}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {step.description}
                </p>
                <p className="text-xs text-foreground/70">
                  {step.details}
                </p>
              </div>

              {/* Step Icon */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-lg">{step.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Requirements Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-xl font-bold text-foreground text-center mb-6">
            O Que Você Precisa
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-card/20 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-lg">🎵</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Músicas Originais</h4>
                <p className="text-xs text-muted-foreground">3 faixas de alta qualidade</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-card/20 rounded-lg">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-accent text-lg">📁</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Portfólio</h4>
                <p className="text-xs text-muted-foreground">EPK com fotos e biografia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-card/20 rounded-lg">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-lg">🎯</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">Visão Artística</h4>
                <p className="text-xs text-muted-foreground">Objetivos e comprometimento</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">
              Pronto para Começar?
            </h3>
            <p className="text-sm text-foreground/80 mb-4">
              Processo simples, transparente e focado no seu sucesso.
            </p>
            
            <button
              onClick={handleStartProcess}
              className="netflix-button bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all"
            >
              Comece Agora
            </button>
            
            <p className="text-xs text-muted-foreground mt-3">
              Processo 100% gratuito • Resposta em até 14 dias
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdhesionProcess;