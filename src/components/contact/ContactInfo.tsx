'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfficeHours {
  day: string;
  hours: string;
  status: 'open' | 'closed' | 'limited';
}

interface SocialLink {
  platform: string;
  icon: string;
  url: string;
  handle: string;
  followers?: string;
  description: string;
}

const ContactInfo: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState<'office' | 'hours' | 'social'>('office');

  const officeHours: OfficeHours[] = [
    { day: 'Segunda-feira', hours: '9:00 - 18:00', status: 'open' },
    { day: 'Terça-feira', hours: '9:00 - 18:00', status: 'open' },
    { day: 'Quarta-feira', hours: '9:00 - 18:00', status: 'open' },
    { day: 'Quinta-feira', hours: '9:00 - 18:00', status: 'open' },
    { day: 'Sexta-feira', hours: '9:00 - 18:00', status: 'open' },
    { day: 'Sábado', hours: '10:00 - 16:00', status: 'limited' },
    { day: 'Domingo', hours: 'Fechado', status: 'closed' }
  ];

  const socialLinks: SocialLink[] = [
    {
      platform: 'Instagram',
      icon: '📷',
      url: 'https://instagram.com/valhallahub',
      handle: '@valhallahub',
      followers: '150K',
      description: 'Acompanhe nossos artistas e bastidores'
    },
    {
      platform: 'YouTube',
      icon: '📺',
      url: 'https://youtube.com/valhallahub',
      handle: '@VhallaHub',
      followers: '85K',
      description: 'Clipes, sessions e documentários'
    },
    {
      platform: 'Twitter',
      icon: '🐦',
      url: 'https://twitter.com/valhallahub',
      handle: '@valhallahub',
      followers: '45K',
      description: 'Novidades e anúncios em primeira mão'
    },
    {
      platform: 'LinkedIn',
      icon: '💼',
      url: 'https://linkedin.com/company/valhalla-hub',
      handle: 'Valhalla Hub',
      followers: '12K',
      description: 'Carreira e oportunidades na música'
    },
    {
      platform: 'TikTok',
      icon: '🎵',
      url: 'https://tiktok.com/@valhallahub',
      handle: '@valhallahub',
      followers: '95K',
      description: 'Conteúdo viral e tendências musicais'
    },
    {
      platform: 'Spotify',
      icon: '🎧',
      url: 'https://open.spotify.com/user/valhallahub',
      handle: 'Valhalla Hub',
      followers: '25K',
      description: 'Playlists curatoriais e lançamentos'
    }
  ];

  const getCurrentStatus = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const currentHour = now.getHours();
    
    // Convert to Brazilian weekday (Monday = 0)
    const brasilianDay = currentDay === 0 ? 6 : currentDay - 1;
    const todayHours = officeHours[brasilianDay];

    if (todayHours.status === 'closed') {
      return { status: 'closed', message: 'Fechado hoje' };
    }

    const [openHour, closeHour] = todayHours.hours.split(' - ').map(time => {
      const [hour] = time.split(':').map(Number);
      return hour;
    });

    if (currentHour >= openHour && currentHour < closeHour) {
      return { status: 'open', message: `Aberto até ${closeHour}:00` };
    } else {
      return { status: 'closed', message: `Abre às ${openHour}:00` };
    }
  };

  const currentStatus = getCurrentStatus();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-green-400';
      case 'closed': return 'text-red-400';
      case 'limited': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Saiba{' '}
            <span className="text-primary-400">mais</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Informações importantes sobre nosso escritório, horários e redes sociais
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-900 rounded-2xl p-2 flex gap-2">
            {[
              { id: 'office', label: 'Escritório', icon: '🏢' },
              { id: 'hours', label: 'Horários', icon: '🕒' },
              { id: 'social', label: 'Redes Sociais', icon: '📱' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-black'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'office' && (
            <motion.div
              key="office"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">📍</span>
                    <h3 className="text-xl font-bold text-white">Nosso Escritório</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        Rua da Música, 123<br />
                        Vila Criativa, São Paulo - SP<br />
                        CEP: 01234-567
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${
                        currentStatus.status === 'open' ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                      }`}></div>
                      <span className={getStatusColor(currentStatus.status)}>
                        {currentStatus.message}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h4 className="font-semibold text-white mb-2">Como chegar:</h4>
                      <ul className="text-gray-400 text-sm space-y-1">
                        <li>🚇 Estação Vila Madalena (500m)</li>
                        <li>🚌 Ponto de ônibus na Rua Principal</li>
                        <li>🚗 Estacionamento gratuito disponível</li>
                      </ul>
                    </div>

                    <button
                      onClick={() => setShowMap(!showMap)}
                      className="w-full bg-primary-500 text-black py-3 rounded-xl font-medium hover:bg-primary-400 transition-colors mt-6"
                    >
                      {showMap ? 'Ocultar Mapa' : 'Ver no Mapa'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <AnimatePresence>
                  {showMap ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gray-800 rounded-2xl p-8 h-96 flex items-center justify-center border border-gray-700"
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4">🗺️</div>
                        <p className="text-gray-300 mb-4">Mapa interativo</p>
                        <p className="text-sm text-gray-500">
                          Integração com Google Maps seria implementada aqui
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 h-96 flex items-center justify-center border border-gray-700"
                    >
                      <div className="text-center">
                        <div className="text-6xl mb-4">🏢</div>
                        <p className="text-gray-300 text-lg">Venha nos visitar!</p>
                        <p className="text-gray-500 text-sm mt-2">
                          Nosso escritório fica no coração da Vila Madalena
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === 'hours' && (
            <motion.div
              key="hours"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">Horários de Atendimento</h3>
                  <p className="text-gray-400">Quando nossa equipe está disponível para atendê-lo</p>
                </div>

                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <motion.div
                      key={schedule.day}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-xl ${
                        schedule.status === 'closed' ? 'bg-gray-800/50' : 'bg-gray-800'
                      }`}
                    >
                      <span className="text-white font-medium">{schedule.day}</span>
                      <div className="flex items-center gap-3">
                        <span className={`${getStatusColor(schedule.status)} font-medium`}>
                          {schedule.hours}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          schedule.status === 'open' ? 'bg-green-500' :
                          schedule.status === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-400 text-lg">💡</span>
                    <div>
                      <h4 className="text-blue-400 font-semibold mb-1">Dica Importante</h4>
                      <p className="text-blue-300 text-sm">
                        Para urgências fora do horário comercial, use nosso chat online ou WhatsApp. 
                        Respondemos emergências 24/7.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div
              key="social"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Nossas Redes Sociais</h3>
                <p className="text-gray-400">Conecte-se conosco e acompanhe tudo sobre música</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-primary-500/50 hover:bg-gray-800/50 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{social.icon}</div>
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-primary-400 transition-colors">
                          {social.platform}
                        </h4>
                        <p className="text-gray-400 text-sm">{social.handle}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      {social.description}
                    </p>

                    {social.followers && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Seguidores</span>
                        <span className="text-primary-400 font-bold">{social.followers}</span>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                      <span className="text-sm text-primary-400 group-hover:text-primary-300 transition-colors">
                        Seguir →
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700">
                  <h4 className="text-white font-bold mb-2">📧 Newsletter Exclusiva</h4>
                  <p className="text-gray-400 mb-4">
                    Receba novidades, lançamentos e conteúdo exclusivo diretamente no seu email
                  </p>
                  <button className="bg-primary-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors">
                    Assinar Newsletter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ContactInfo;