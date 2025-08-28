'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookingCalendar from './BookingCalendar';
import ReviewSystem from './ReviewSystem';

interface Professional {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  location: string;
  basePrice: number;
  availability: 'available' | 'busy' | 'unavailable';
  verified: boolean;
  responseTime: string;
  completedProjects: number;
  joinDate: string;
  lastSeen: string;
  specialties: string[];
  genres: string[];
  languages: string[];
  equipment: string[];
  portfolio: {
    id: string;
    title: string;
    image: string;
    type: 'audio' | 'video' | 'image';
    description: string;
  }[];
  services: {
    id: string;
    name: string;
    price: number;
    duration: string;
    description: string;
    includes: string[];
  }[];
  badges: string[];
  tier: 'new' | 'rising' | 'pro' | 'elite';
  socialMedia: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
  reviews: {
    id: string;
    clientName: string;
    rating: number;
    comment: string;
    date: string;
    project: string;
    verified: boolean;
  }[];
}

interface ProfessionalProfileProps {
  professional: Professional;
}

const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ professional }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'portfolio' | 'services' | 'reviews'>('about');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-400 bg-green-500/20';
      case 'busy': return 'text-yellow-400 bg-yellow-500/20';
      case 'unavailable': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return 'Disponível';
      case 'busy': return 'Ocupado';
      case 'unavailable': return 'Indisponível';
      default: return 'Desconhecido';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'elite': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'pro': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'rising': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'new': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const tabs = [
    { id: 'about', label: 'Sobre' },
    { id: 'portfolio', label: 'Portfólio' },
    { id: 'services', label: 'Serviços' },
    { id: 'reviews', label: 'Avaliações' },
  ];

  return (
    <div>
      {/* Cover Section */}
      <section className="relative h-80 lg:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${professional.coverImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-8">
          <div className="flex items-end gap-6 w-full">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-4xl font-bold overflow-hidden border-4 border-white">
                {professional.avatar ? (
                  <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
                ) : (
                  professional.name.charAt(0)
                )}
              </div>
              <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white ${getAvailabilityColor(professional.availability)}`}></div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{professional.name}</h1>
                {professional.verified && (
                  <span className="text-green-400 text-2xl" title="Verificado">✓</span>
                )}
                <span className={`text-sm px-3 py-1 rounded-full border ${getTierColor(professional.tier)}`}>
                  {professional.tier.toUpperCase()}
                </span>
              </div>
              <p className="text-xl text-gray-200 mb-3">{professional.title}</p>
              <div className="flex flex-wrap items-center gap-6 text-gray-300">
                <span className="flex items-center gap-2">
                  <span>⭐</span>
                  <span>{professional.rating} ({professional.reviewCount} avaliações)</span>
                </span>
                <span className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{professional.location}</span>
                </span>
                <span className={`px-3 py-1 rounded-full text-sm ${getAvailabilityColor(professional.availability)}`}>
                  {getAvailabilityLabel(professional.availability)}
                </span>
                <span className="flex items-center gap-2">
                  <span>⚡</span>
                  <span>Responde em {professional.responseTime}</span>
                </span>
              </div>
            </div>

            {/* Back Button */}
            <button
              onClick={() => window.history.back()}
              className="bg-gray-900/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-gray-800/50 transition-colors"
            >
              ← Voltar
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {professional.badges.map((badge, idx) => (
                <span key={idx} className="bg-primary-500/20 text-primary-400 text-sm px-3 py-1 rounded-full">
                  {badge}
                </span>
              ))}
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-1 mb-8 bg-gray-900/50 rounded-xl p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* About Tab */}
              {activeTab === 'about' && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Description */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Sobre</h3>
                    <p className="text-gray-300 leading-relaxed">{professional.description}</p>
                  </div>

                  {/* Specialties */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Especialidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {professional.specialties.map((specialty, idx) => (
                        <span key={idx} className="bg-primary-500/20 text-primary-400 px-3 py-2 rounded-lg">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Genres */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Gêneros Musicais</h3>
                    <div className="flex flex-wrap gap-2">
                      {professional.genres.map((genre, idx) => (
                        <span key={idx} className="bg-gray-700/50 text-gray-300 px-3 py-2 rounded-lg">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Equipamentos</h3>
                    <ul className="space-y-2">
                      {professional.equipment.map((item, idx) => (
                        <li key={idx} className="text-gray-300 flex items-center gap-2">
                          <span className="text-primary-400">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Portfolio Tab */}
              {activeTab === 'portfolio' && (
                <motion.div
                  key="portfolio"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {professional.portfolio.map((item) => (
                      <div key={item.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden">
                        <div className="aspect-video bg-gray-800">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">
                              {item.type === 'audio' ? '🎵' : item.type === 'video' ? '🎬' : '📸'}
                            </span>
                            <h4 className="text-white font-semibold">{item.title}</h4>
                          </div>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Services Tab */}
              {activeTab === 'services' && (
                <motion.div
                  key="services"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {professional.services.map((service) => (
                    <div key={service.id} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-white mb-2">{service.name}</h4>
                          <p className="text-gray-300 mb-3">{service.description}</p>
                          <div className="text-sm text-gray-400 mb-3">
                            <span>⏱️ Duração: {service.duration}</span>
                          </div>
                          <div>
                            <h5 className="text-white font-semibold mb-2">Inclui:</h5>
                            <ul className="space-y-1">
                              {service.includes.map((item, idx) => (
                                <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                                  <span className="text-green-400">✓</span>
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-6">
                          <p className="text-2xl font-bold text-white mb-2">R$ {service.price}</p>
                          <button
                            onClick={() => {
                              setSelectedService(service.id);
                              setShowBookingModal(true);
                            }}
                            className="bg-primary-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors"
                          >
                            Contratar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewSystem reviews={professional.reviews} professionalId={professional.id} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0 space-y-6">
            {/* Contact Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sticky top-6">
              <h3 className="text-xl font-bold text-white mb-4">Entrar em Contato</h3>
              
              <div className="space-y-4 mb-6">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-primary-500 text-black py-3 rounded-xl font-bold hover:bg-primary-400 transition-colors"
                >
                  📅 Agendar Projeto
                </button>
                <button className="w-full bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors">
                  💬 Enviar Mensagem
                </button>
              </div>

              {/* Quick Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">A partir de:</span>
                  <span className="text-white font-bold">R$ {professional.basePrice}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Projetos:</span>
                  <span className="text-white">{professional.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Membro desde:</span>
                  <span className="text-white">{new Date(professional.joinDate).getFullYear()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Último acesso:</span>
                  <span className="text-white">{professional.lastSeen}</span>
                </div>
              </div>

              {/* Social Media */}
              {Object.keys(professional.socialMedia).length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-800">
                  <h4 className="text-white font-semibold mb-3">Redes Sociais</h4>
                  <div className="space-y-2">
                    {professional.socialMedia.instagram && (
                      <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span>📷</span>
                        <span>{professional.socialMedia.instagram}</span>
                      </a>
                    )}
                    {professional.socialMedia.youtube && (
                      <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span>🎬</span>
                        <span>{professional.socialMedia.youtube}</span>
                      </a>
                    )}
                    {professional.socialMedia.spotify && (
                      <a href="#" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                        <span>🎵</span>
                        <span>{professional.socialMedia.spotify}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Idiomas</h3>
              <div className="space-y-2">
                {professional.languages.map((language, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-300">
                    <span>🌐</span>
                    <span>{language}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Agendar Projeto</h3>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              
              <BookingCalendar 
                professionalId={professional.id}
                selectedService={selectedService}
                onClose={() => setShowBookingModal(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfessionalProfile;