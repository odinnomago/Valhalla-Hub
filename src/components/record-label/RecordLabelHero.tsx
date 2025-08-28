'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const RecordLabelHero: React.FC = () => {
  const router = useRouter();

  const handleDemoSubmission = () => {
    router.push('/gravadora/demo');
  };

  const handleViewArtists = () => {
    router.push('/gravadora/artistas');
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 font-headline tracking-tight"
            >
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Valhalla Records
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-primary mb-4 font-semibold"
            >
              Onde talentos se transformam em lendas
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Distribuição global, desenvolvimento artístico e oportunidades reais para transformar sua paixão em carreira
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={handleDemoSubmission}
                className="netflix-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all transform hover:scale-105"
              >
                Envie Sua Demo
              </button>
              <button
                onClick={handleViewArtists}
                className="netflix-button bg-transparent border-2 border-accent text-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Conheça Nossos Artistas
              </button>
            </motion.div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-2xl">🌍</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Distribuição Global</p>
                  <p className="text-muted-foreground text-sm">+150 plataformas</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-accent text-2xl">🎵</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Produção Completa</p>
                  <p className="text-muted-foreground text-sm">Estúdios parceiros</p>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-foreground font-semibold">Marketing Estratégico</p>
                  <p className="text-muted-foreground text-sm">Campanhas eficazes</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 backdrop-blur-sm border border-border/50" />
              <div className="absolute inset-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <span className="text-primary text-4xl">🎤</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Estúdio Profissional</h3>
                  <p className="text-muted-foreground">Equipamentos de ponta e produtores experientes</p>
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecordLabelHero;