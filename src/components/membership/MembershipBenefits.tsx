'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Platform {
  id: string;
  name: string;
  icon: string;
  description: string;
  keyFeatures: string[];
  benefits: {
    free: string;
    basic: string;
    pro: string;
    elite: string;
    business: string;
  };
  color: string;
  image: string;
}

const MembershipBenefits: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('gravadora');

  const platforms: Platform[] = [
    {
      id: 'gravadora',
      name: 'Gravadora Digital',
      icon: '🎵',
      description: 'Distribuição global, análise profissional de demos e suporte completo para lançamentos',
      keyFeatures: [
        'Distribuição em 150+ plataformas',
        'Análise profissional de demos',
        'Produção musical completa',
        'Marketing de lançamento'
      ],
      benefits: {
        free: '1 demo/mês',
        basic: '2 demos/mês',
        pro: '4 demos + feedback',
        elite: 'Ilimitado + prioridade',
        business: '10 demos + relatórios'
      },
      color: 'from-purple-500 to-pink-500',
      image: '/images/platforms/gravadora.jpg'
    },
    {
      id: 'academy',
      name: 'Academy',
      icon: '🎓',
      description: 'Mais de 200 cursos com instrutores renomados, certificações reconhecidas no mercado',
      keyFeatures: [
        '+200 cursos especializados',
        'Instrutores renomados',
        'Certificações oficiais',
        'Aulas ao vivo'
      ],
      benefits: {
        free: '1 curso/mês',
        basic: '3 cursos/mês',
        pro: 'Acesso ilimitado',
        elite: 'Ilimitado + certificados',
        business: '10 contas + relatórios'
      },
      color: 'from-blue-500 to-cyan-500',
      image: '/images/platforms/academy.jpg'
    },
    {
      id: 'bookings',
      name: 'Agência de Bookings',
      icon: '🎤',
      description: 'Conectamos artistas a oportunidades de shows, eventos e apresentações em todo Brasil',
      keyFeatures: [
        'Rede de produtores',
        'Eventos corporativos',
        'Festivais nacionais',
        'Tours organizadas'
      ],
      benefits: {
        free: 'Eventos gratuitos',
        basic: '10% desconto',
        pro: '20% desconto + prioridade',
        elite: '30% desconto + manager',
        business: 'Taxas corporativas'
      },
      color: 'from-green-500 to-emerald-500',
      image: '/images/platforms/bookings.jpg'
    },
    {
      id: 'marketing',
      name: 'Marketing IA',
      icon: '🤖',
      description: 'Inteligência artificial para análise de dados, estratégias personalizadas e automação',
      keyFeatures: [
        'Análise preditiva',
        'Estratégias automatizadas',
        'ROI em tempo real',
        'Segmentação inteligente'
      ],
      benefits: {
        free: 'Relatórios básicos',
        basic: '1 análise/mês',
        pro: '3 análises + estratégias',
        elite: 'Ilimitado + consultoria',
        business: 'API + relatórios custom'
      },
      color: 'from-orange-500 to-red-500',
      image: '/images/platforms/marketing.jpg'
    },
    {
      id: 'marketplace',
      name: 'Marketplace',
      icon: '🛍️',
      description: 'Loja completa com instrumentos, equipamentos, software e produtos exclusivos',
      keyFeatures: [
        'Equipamentos profissionais',
        'Software licenciado',
        'Instrumentos importados',
        'Produtos exclusivos'
      ],
      benefits: {
        free: 'Preços normais',
        basic: '10% desconto',
        pro: '20% desconto + destaque',
        elite: '30% desconto + vitrine',
        business: 'Taxas reduzidas'
      },
      color: 'from-yellow-500 to-orange-500',
      image: '/images/platforms/marketplace.jpg'
    },
    {
      id: 'blog',
      name: 'Blog & Conteúdo',
      icon: '📰',
      description: 'Conteúdo exclusivo, entrevistas, análises de mercado e tendências da indústria',
      keyFeatures: [
        'Artigos especializados',
        'Entrevistas exclusivas',
        'Análises de mercado',
        'Tendências globais'
      ],
      benefits: {
        free: 'Conteúdo geral',
        basic: 'Conteúdo exclusivo',
        pro: 'Premium + webinars',
        elite: 'VIP + entrevistas',
        business: 'Conteúdo B2B'
      },
      color: 'from-indigo-500 to-purple-500',
      image: '/images/platforms/blog.jpg'
    },
    {
      id: 'eventos',
      name: 'Produção de Eventos',
      icon: '🎪',
      description: 'Produção completa de eventos, desde planejamento até execução e pós-evento',
      keyFeatures: [
        'Planejamento completo',
        'Produção técnica',
        'Gestão de artistas',
        'Análise de resultados'
      ],
      benefits: {
        free: 'Eventos gratuitos',
        basic: '10% desconto',
        pro: '20% + early access',
        elite: '30% + VIP',
        business: 'Pacotes corporativos'
      },
      color: 'from-pink-500 to-rose-500',
      image: '/images/platforms/eventos.jpg'
    },
    {
      id: 'ingressos',
      name: 'Venda de Ingressos',
      icon: '🎫',
      description: 'Plataforma completa para venda de ingressos com sistema antifraude e analytics',
      keyFeatures: [
        'Sistema antifraude',
        'Analytics em tempo real',
        'Múltiplas formas de pagamento',
        'Integração com redes sociais'
      ],
      benefits: {
        free: 'Compra normal',
        basic: '10% desconto',
        pro: '20% + acesso antecipado',
        elite: '30% + pacotes VIP',
        business: 'Taxas reduzidas'
      },
      color: 'from-teal-500 to-cyan-500',
      image: '/images/platforms/ingressos.jpg'
    },
    {
      id: 'comunidade',
      name: 'Comunidade',
      icon: '👥',
      description: 'Rede exclusiva de profissionais, artistas e entusiastas da música para networking',
      keyFeatures: [
        'Networking profissional',
        'Grupos especializados',
        'Mentoria peer-to-peer',
        'Colaborações musicais'
      ],
      benefits: {
        free: 'Fóruns públicos',
        basic: 'Grupos fechados',
        pro: 'Comunidade VIP',
        elite: 'Inner Circle',
        business: 'Rede empresarial'
      },
      color: 'from-violet-500 to-purple-500',
      image: '/images/platforms/comunidade.jpg'
    }
  ];

  const selectedPlatformData = platforms.find(p => p.id === selectedPlatform) || platforms[0];

  return (
    <section className="py-20 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="text-primary-400">9 Plataformas</span> Integradas
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Um ecossistema completo para sua carreira musical. 
            Cada plataforma foi desenvolvida para resolver problemas reais da indústria.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Platform Selection Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4"
          >
            {platforms.map((platform, index) => (
              <motion.button
                key={platform.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => setSelectedPlatform(platform.id)}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                  selectedPlatform === platform.id
                    ? `border-transparent bg-gradient-to-br ${platform.color} shadow-lg`
                    : 'border-gray-800 bg-gray-900/50 hover:border-gray-700'
                }`}
              >
                <div className="text-center">
                  <div className={`text-4xl mb-3 ${
                    selectedPlatform === platform.id ? 'scale-110' : 'group-hover:scale-105'
                  } transition-transform`}>
                    {platform.icon}
                  </div>
                  <h3 className={`font-bold text-sm ${
                    selectedPlatform === platform.id ? 'text-black' : 'text-white'
                  }`}>
                    {platform.name}
                  </h3>
                </div>
                
                {selectedPlatform === platform.id && (
                  <motion.div
                    layoutId="selected-indicator"
                    className="absolute inset-0 border-2 border-white/30 rounded-2xl"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Platform Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPlatform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
              >
                {/* Platform Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${selectedPlatformData.color} rounded-2xl flex items-center justify-center text-3xl`}>
                    {selectedPlatformData.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedPlatformData.name}</h3>
                    <p className="text-gray-400">{selectedPlatformData.description}</p>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Recursos Principais</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedPlatformData.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-primary-400">✓</span>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits by Tier */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Benefícios por Plano</h4>
                  <div className="space-y-3">
                    {Object.entries(selectedPlatformData.benefits).map(([tier, benefit]) => (
                      <div key={tier} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                        <span className={`font-medium capitalize ${
                          tier === 'free' ? 'text-gray-400' :
                          tier === 'basic' ? 'text-blue-400' :
                          tier === 'pro' ? 'text-primary-400' :
                          tier === 'elite' ? 'text-yellow-400' :
                          'text-purple-400'
                        }`}>
                          {tier === 'free' ? 'Free' :
                           tier === 'basic' ? 'Basic' :
                           tier === 'pro' ? 'Pro' :
                           tier === 'elite' ? 'Elite' : 'Business'}
                        </span>
                        <span className="text-white text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Integration Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tudo Integrado em{' '}
              <span className="text-primary-400">Uma Plataforma</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Não perca tempo alternando entre diferentes ferramentas. 
              Nosso ecossistema integrado sincroniza todos os dados e processos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🔄
              </div>
              <h4 className="text-white font-semibold mb-2">Sincronização Automática</h4>
              <p className="text-gray-400 text-sm">
                Dados sincronizados em tempo real entre todas as plataformas
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📊
              </div>
              <h4 className="text-white font-semibold mb-2">Dashboard Unificado</h4>
              <p className="text-gray-400 text-sm">
                Visão completa de todos os seus projetos em um só lugar
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🚀
              </div>
              <h4 className="text-white font-semibold mb-2">Automação Inteligente</h4>
              <p className="text-gray-400 text-sm">
                Processos automatizados que economizam tempo e aumentam eficiência
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipBenefits;