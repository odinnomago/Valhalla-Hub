'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans } from '@/lib/membership';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  tier: string;
  achievement: string;
  location: string;
  socialMedia?: {
    platform: string;
    handle: string;
    followers: string;
  };
  metrics?: {
    label: string;
    value: string;
    icon: string;
  }[];
}

interface SuccessMetric {
  icon: string;
  value: string;
  label: string;
  subtext: string;
}

const MembershipTestimonials: React.FC = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [filter, setFilter] = useState<'all' | 'basic' | 'pro' | 'elite' | 'business'>('all');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Marina Santos',
      role: 'Cantora e Compositora',
      avatar: '/images/testimonials/marina.jpg',
      quote: 'Em 8 meses no Valhalla Hub, consegui lançar meu primeiro EP pela gravadora digital e já tenho mais de 100 mil streams. A Academy me ensinou tudo sobre produção musical.',
      tier: 'pro',
      achievement: 'Primeiro EP lançado',
      location: 'São Paulo, SP',
      socialMedia: {
        platform: 'Instagram',
        handle: '@marinasantos',
        followers: '25K'
      },
      metrics: [
        { label: 'Streams', value: '150K+', icon: '🎵' },
        { label: 'Seguidores', value: '25K', icon: '👥' },
        { label: 'Shows', value: '12', icon: '🎤' }
      ]
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      role: 'Produtor Musical',
      avatar: '/images/testimonials/carlos.jpg',
      quote: 'O plano Elite mudou minha carreira. Hoje produzo para 5 artistas diferentes e meu estúdio está sempre cheio. A comunidade Valhalla é incrível para networking.',
      tier: 'elite',
      achievement: 'Estúdio próprio aberto',
      location: 'Rio de Janeiro, RJ',
      socialMedia: {
        platform: 'YouTube',
        handle: '@carlosproducer',
        followers: '45K'
      },
      metrics: [
        { label: 'Artistas Produzidos', value: '15+', icon: '🎧' },
        { label: 'Faturamento', value: '+300%', icon: '📈' },
        { label: 'Equipamentos', value: 'R$ 50K', icon: '🎛️' }
      ]
    },
    {
      id: '3',
      name: 'Julia Oliveira',
      role: 'DJ e Empresária',
      avatar: '/images/testimonials/julia.jpg',
      quote: 'Comecei no plano Basic e hoje tenho minha própria empresa de eventos. O Marketing IA me ajudou a entender meu público e crescer organicamente.',
      tier: 'business',
      achievement: 'Empresa de eventos criada',
      location: 'Belo Horizonte, MG',
      socialMedia: {
        platform: 'TikTok',
        handle: '@juliabeats',
        followers: '80K'
      },
      metrics: [
        { label: 'Eventos Realizados', value: '50+', icon: '🎉' },
        { label: 'Público Total', value: '20K+', icon: '👑' },
        { label: 'Receita Mensal', value: 'R$ 35K', icon: '💰' }
      ]
    },
    {
      id: '4',
      name: 'Ricardo Silva',
      role: 'Guitarrista e Professor',
      avatar: '/images/testimonials/ricardo.jpg',
      quote: 'A Academy Valhalla revolucionou minha forma de ensinar. Hoje tenho minha própria escola online e mais de 200 alunos. O suporte da comunidade foi fundamental.',
      tier: 'pro',
      achievement: 'Escola online criada',
      location: 'Curitiba, PR',
      metrics: [
        { label: 'Alunos Online', value: '250+', icon: '🎓' },
        { label: 'Cursos Criados', value: '8', icon: '📚' },
        { label: 'Avaliação', value: '4.9★', icon: '⭐' }
      ]
    },
    {
      id: '5',
      name: 'Amanda Costa',
      role: 'Rapper e Ativista',
      avatar: '/images/testimonials/amanda.jpg',
      quote: 'O Valhalla Hub me deu a plataforma que eu precisava. Meu último single viralizou no TikTok e agora tenho patrocínio de marca internacional.',
      tier: 'elite',
      achievement: 'Viral no TikTok',
      location: 'Salvador, BA',
      socialMedia: {
        platform: 'TikTok',
        handle: '@amandamcost',
        followers: '120K'
      },
      metrics: [
        { label: 'Views TikTok', value: '2M+', icon: '📱' },
        { label: 'Patrocínios', value: '3', icon: '🤝' },
        { label: 'Impact Score', value: '95%', icon: '🎯' }
      ]
    },
    {
      id: '6',
      name: 'Studio Mix & Master',
      role: 'Estúdio de Gravação',
      avatar: '/images/testimonials/studio.jpg',
      quote: 'Com o plano Business, triplicamos nossa carteira de clientes. A integração com todas as plataformas Valhalla otimizou nossa operação completamente.',
      tier: 'business',
      achievement: '3x mais clientes',
      location: 'Fortaleza, CE',
      metrics: [
        { label: 'Clientes Ativos', value: '45', icon: '🏢' },
        { label: 'Projetos/Mês', value: '120+', icon: '🎵' },
        { label: 'Crescimento', value: '+250%', icon: '📊' }
      ]
    }
  ];

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.tier === filter);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [filteredTestimonials.length, isAutoPlaying]);

  const getTierColor = (tier: string) => {
    const colors = {
      basic: 'text-blue-400',
      pro: 'text-purple-400',
      elite: 'text-yellow-400',
      business: 'text-green-400'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  const getTierBadge = (tier: string) => {
    const plan = membershipPlans.find(p => p.id === tier);
    return plan?.name || tier.toUpperCase();
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-950 via-black to-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-full mb-6">
            <span className="text-primary-400">🎯</span>
            <span className="text-primary-300 text-sm font-medium">Histórias de Sucesso</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Nossos membros estão{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              fazendo história
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Conheça artistas, produtores e empresários que transformaram suas carreiras 
            com o ecossistema Valhalla Hub
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-2 flex gap-2">
            {['all', 'basic', 'pro', 'elite', 'business'].map((tierFilter) => (
              <button
                key={tierFilter}
                onClick={() => {
                  setFilter(tierFilter as any);
                  setActiveTestimonial(0);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 1000);
                }}
                className={`px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  filter === tierFilter
                    ? 'bg-primary-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {tierFilter === 'all' ? 'Todos' : getTierBadge(tierFilter)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main Testimonials */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Active Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 relative overflow-hidden"
              >
                {/* Tier Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getTierColor(filteredTestimonials[activeTestimonial]?.tier)} bg-current/10`}>
                    {getTierBadge(filteredTestimonials[activeTestimonial]?.tier)}
                  </span>
                </div>

                {/* User Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-xl font-bold">
                    {filteredTestimonials[activeTestimonial]?.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {filteredTestimonials[activeTestimonial]?.name}
                    </h3>
                    <p className="text-gray-400 mb-2">
                      {filteredTestimonials[activeTestimonial]?.role}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📍 {filteredTestimonials[activeTestimonial]?.location}</span>
                      {filteredTestimonials[activeTestimonial]?.socialMedia && (
                        <span>
                          {filteredTestimonials[activeTestimonial]?.socialMedia?.platform} •{' '}
                          {filteredTestimonials[activeTestimonial]?.socialMedia?.followers}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-gray-300 leading-relaxed mb-6 italic">
                  "{filteredTestimonials[activeTestimonial]?.quote}"
                </blockquote>

                {/* Achievement */}
                <div className="bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400">🏆</span>
                    <span className="text-primary-300 font-semibold">
                      {filteredTestimonials[activeTestimonial]?.achievement}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                {filteredTestimonials[activeTestimonial]?.metrics && (
                  <div className="grid grid-cols-3 gap-4">
                    {filteredTestimonials[activeTestimonial].metrics.map((metric, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl mb-1">{metric.icon}</div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                        <div className="text-xs text-gray-400">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTestimonial(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 2000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial 
                      ? 'bg-primary-500 w-8' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right - Testimonial Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {filteredTestimonials.slice(0, 4).map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setActiveTestimonial(index)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`w-full text-left p-4 rounded-xl transition-all ${
                  index === activeTestimonial
                    ? 'bg-primary-500/20 border-primary-500/50 border'
                    : 'bg-gray-900/30 border-gray-800 border hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm truncate">{testimonial.role}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${getTierColor(testimonial.tier)} bg-current/10`}>
                    {getTierBadge(testimonial.tier)}
                  </span>
                </div>
              </motion.button>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-6 text-center mt-8"
            >
              <h4 className="text-white font-bold mb-2">Sua história pode ser a próxima!</h4>
              <p className="text-gray-300 text-sm mb-4">
                Junte-se a milhares de membros que estão transformando suas carreiras
              </p>
              <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                Começar Agora
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MembershipTestimonials;