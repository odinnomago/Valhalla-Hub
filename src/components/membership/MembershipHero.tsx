'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice } from '@/lib/membership';

interface HeroTestimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  tier: string;
}

const MembershipHero: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const heroTestimonials: HeroTestimonial[] = [
    {
      id: '1',
      name: 'Lucas Mendes',
      role: 'Producer & DJ',
      avatar: '/images/testimonials/lucas-hero.jpg',
      quote: 'Em 6 meses no Valhalla Hub, passei de produtor amador para ter minha primeira música lançada pela gravadora.',
      tier: 'pro'
    },
    {
      id: '2',
      name: 'Marina Silva',
      role: 'Cantora e Compositora',
      avatar: '/images/testimonials/marina-hero.jpg',
      quote: 'A Academy me deu todas as ferramentas que eu precisava. Hoje tenho meu próprio estúdio e 3 artistas sob minha produção.',
      tier: 'elite'
    },
    {
      id: '3',
      name: 'Carlos Roberto',
      role: 'Empresário Musical',
      avatar: '/images/testimonials/carlos-hero.jpg',
      quote: 'O plano Business revolucionou nossa operação. Integração perfeita entre todas as plataformas que precisávamos.',
      tier: 'business'
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % heroTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroTestimonials.length]);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-comparison');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/5 to-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 border border-primary-500/30 px-4 py-2 rounded-full"
            >
              <span className="text-primary-400 text-sm font-medium">🚀 Novo</span>
              <span className="text-gray-300 text-sm">Portal de Membros 2024</span>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-white">Transforme sua</span><br />
                <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  paixão em profissão
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl"
              >
                Acesso exclusivo ao ecossistema completo da música brasileira. 
                <strong className="text-white"> 9 plataformas integradas</strong> para 
                acelerar sua carreira musical.
              </motion.p>
            </div>

            {/* Key Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-3"
            >
              {[
                '🎵 Gravadora Digital + Distribuição',
                '🎓 Academy com +200 cursos',
                '🎤 Bookings + Produção de Eventos',
                '🤖 Marketing IA + Analytics',
                '🛍️ Marketplace + Venda de Ingressos'
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-lg">{benefit.split(' ')[0]}</span>
                  <span>{benefit.substring(2)}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={scrollToPricing}
                className="group bg-gradient-to-r from-primary-500 to-secondary-500 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
              >
                <span className="flex items-center gap-2">
                  Ver Planos
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </button>
              
              <button className="border-2 border-gray-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:border-primary-500 hover:bg-primary-500/10">
                🎬 Ver Demo (2min)
              </button>
            </motion.div>

            {/* Pricing Teaser */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center gap-6 pt-4 text-sm text-gray-400"
            >
              <span>Planos a partir de <strong className="text-primary-400">{formatPrice(19.90)}/mês</strong></span>
              <span>•</span>
              <span>7 dias grátis</span>
              <span>•</span>
              <span>Cancele quando quiser</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Dynamic Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Rotating Testimonials */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-2">
                {heroTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentTestimonial ? 'bg-primary-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold">
                      {heroTestimonials[currentTestimonial].name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">
                        {heroTestimonials[currentTestimonial].name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {heroTestimonials[currentTestimonial].role} • 
                        <span className="text-primary-400 ml-1">
                          {membershipPlans.find(p => p.id === heroTestimonials[currentTestimonial].tier)?.name}
                        </span>
                      </p>
                    </div>
                  </div>
                  
                  <blockquote className="text-gray-300 italic leading-relaxed">
                    "{heroTestimonials[currentTestimonial].quote}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-8 text-gray-500 text-sm"
            >
              <div className="flex items-center gap-2">
                <span>🔒</span>
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📱</span>
                <span>App Mobile</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <span>Acesso 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-gray-400"
        >
          <span className="text-xs uppercase tracking-wider">Ver Planos</span>
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary-400 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MembershipHero;