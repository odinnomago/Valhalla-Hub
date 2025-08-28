'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommunityRoom {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
  tier: string[];
  category: 'general' | 'collaboration' | 'learning' | 'networking' | 'exclusive';
  isActive?: boolean;
  lastActivity?: string;
}

interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  tier: string;
  specialties: string[];
  points: number;
  isOnline: boolean;
  location: string;
}

const MemberCommunity: React.FC = () => {
  const [userTier] = useState('pro'); // This would come from user context
  const [activeTab, setActiveTab] = useState<'rooms' | 'members' | 'events'>('rooms');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'collaboration' | 'learning' | 'networking' | 'exclusive'>('all');

  const communityRooms: CommunityRoom[] = [
    {
      id: '1',
      name: 'Lounge Geral',
      description: 'Conversas livres sobre música e vida de artista',
      memberCount: 2847,
      icon: '💬',
      tier: ['free', 'basic', 'pro', 'elite', 'business'],
      category: 'general',
      isActive: true,
      lastActivity: '2 min atrás',
    },
    {
      id: '2',
      name: 'Colaborações Abertas',
      description: 'Encontre parceiros para seus projetos musicais',
      memberCount: 856,
      icon: '🤝',
      tier: ['basic', 'pro', 'elite', 'business'],
      category: 'collaboration',
      isActive: true,
      lastActivity: '5 min atrás',
    },
    {
      id: '3',
      name: 'Feedback e Reviews',
      description: 'Compartilhe suas músicas e receba feedback construtivo',
      memberCount: 1234,
      icon: '🎵',
      tier: ['basic', 'pro', 'elite', 'business'],
      category: 'collaboration',
      isActive: true,
      lastActivity: '1 min atrás',
    },
    {
      id: '4',
      name: 'Academy - Dúvidas',
      description: 'Tire dúvidas sobre cursos e compartilhe conhecimento',
      memberCount: 1567,
      icon: '🎓',
      tier: ['basic', 'pro', 'elite', 'business'],
      category: 'learning',
      isActive: true,
      lastActivity: '3 min atrás',
    },
    {
      id: '5',
      name: 'Networking PRO',
      description: 'Conexões profissionais e oportunidades de negócio',
      memberCount: 543,
      icon: '💼',
      tier: ['pro', 'elite', 'business'],
      category: 'networking',
      isActive: true,
      lastActivity: '7 min atrás',
    },
    {
      id: '6',
      name: 'Inner Circle ELITE',
      description: 'Discussões exclusivas com mentores e artistas estabelecidos',
      memberCount: 128,
      icon: '👑',
      tier: ['elite', 'business'],
      category: 'exclusive',
      isActive: true,
      lastActivity: '12 min atrás',
    },
    {
      id: '7',
      name: 'Business Hub',
      description: 'Estratégias de negócio e gestão para empresários musicais',
      memberCount: 67,
      icon: '🏢',
      tier: ['business'],
      category: 'exclusive',
      isActive: true,
      lastActivity: '15 min atrás',
    },
    {
      id: '8',
      name: 'Produção Técnica',
      description: 'Discussões avançadas sobre mixagem, mastering e produção',
      memberCount: 423,
      icon: '🎛️',
      tier: ['pro', 'elite', 'business'],
      category: 'learning',
      isActive: true,
      lastActivity: '4 min atrás',
    },
  ];

  const communityMembers: CommunityMember[] = [
    {
      id: '1',
      name: 'Marina Costa',
      avatar: '/images/users/marina.jpg',
      tier: 'elite',
      specialties: ['Vocal', 'Composição', 'Pop'],
      points: 4850,
      isOnline: true,
      location: 'São Paulo, SP',
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      avatar: '/images/users/carlos.jpg',
      tier: 'pro',
      specialties: ['Produção', 'Hip Hop', 'Trap'],
      points: 3420,
      isOnline: true,
      location: 'Rio de Janeiro, RJ',
    },
    {
      id: '3',
      name: 'Ana Silva',
      avatar: '/images/users/ana.jpg',
      tier: 'elite',
      specialties: ['Mixagem', 'Mastering', 'Rock'],
      points: 5230,
      isOnline: false,
      location: 'Belo Horizonte, MG',
    },
    {
      id: '4',
      name: 'João Santos',
      avatar: '/images/users/joao.jpg',
      tier: 'business',
      specialties: ['Empresário', 'Marketing', 'Eventos'],
      points: 6100,
      isOnline: true,
      location: 'Brasília, DF',
    },
  ];

  const categories = [
    { id: 'all', name: 'Todas', icon: '📋' },
    { id: 'general', name: 'Geral', icon: '💬' },
    { id: 'collaboration', name: 'Colaboração', icon: '🤝' },
    { id: 'learning', name: 'Aprendizado', icon: '🎓' },
    { id: 'networking', name: 'Networking', icon: '💼' },
    { id: 'exclusive', name: 'Exclusivas', icon: '👑' },
  ];

  const getTierColor = (tier: string) => {
    const colors = {
      free: 'text-gray-400',
      basic: 'text-blue-400',
      pro: 'text-purple-400',
      elite: 'text-yellow-400',
      business: 'text-green-400',
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  const getTierBadgeColor = (tier: string) => {
    const colors = {
      free: 'bg-gray-500/20 border-gray-500/30',
      basic: 'bg-blue-500/20 border-blue-500/30',
      pro: 'bg-purple-500/20 border-purple-500/30',
      elite: 'bg-yellow-500/20 border-yellow-500/30',
      business: 'bg-green-500/20 border-green-500/30',
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-500/20 border-gray-500/30';
  };

  const canAccessRoom = (room: CommunityRoom) => {
    return room.tier.includes(userTier);
  };

  const getFilteredRooms = () => {
    return communityRooms.filter(room => {
      const categoryMatch = selectedCategory === 'all' || room.category === selectedCategory;
      return categoryMatch;
    });
  };

  const handleJoinRoom = (roomId: string) => {
    const room = communityRooms.find(r => r.id === roomId);
    if (room && canAccessRoom(room)) {
      console.log('Joining room:', roomId);
      // In a real implementation, this would navigate to the room
    } else {
      console.log('Access denied to room:', roomId);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Comunidade Valhalla
          </h2>
          <p className="text-gray-400 text-sm">
            Conecte-se com outros músicos e profissionais
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-400 text-sm">1.234 online</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 mb-6 bg-gray-800 rounded-xl p-1">
        {[
          { id: 'rooms', label: 'Salas', icon: '🏠' },
          { id: 'members', label: 'Membros', icon: '👥' },
          { id: 'events', label: 'Eventos', icon: '📅' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-primary-500 text-black'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'rooms' && (
          <motion.div
            key="rooms"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-black font-medium'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>

            {/* Rooms Grid */}
            <div className="grid gap-4">
              {getFilteredRooms().map((room, index) => (
                <motion.div
                  key={room.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 rounded-xl border transition-all ${
                    canAccessRoom(room)
                      ? 'bg-gray-800/50 border-gray-700 hover:border-gray-600 cursor-pointer'
                      : 'bg-gray-800/20 border-gray-800 opacity-60'
                  }`}
                  onClick={() => canAccessRoom(room) && handleJoinRoom(room.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{room.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{room.name}</h3>
                        {!canAccessRoom(room) && (
                          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">
                            🔒 Restrito
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-sm mb-2">{room.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>👥 {room.memberCount.toLocaleString()} membros</span>
                        {room.lastActivity && (
                          <span>💬 {room.lastActivity}</span>
                        )}
                        {room.isActive && (
                          <span className="text-green-400">🟢 Ativa</span>
                        )}
                      </div>
                    </div>
                    {canAccessRoom(room) && (
                      <button className="bg-primary-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors">
                        Entrar
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'members' && (
          <motion.div
            key="members"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid gap-4">
              {communityMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold">
                        {member.name.charAt(0)}
                      </div>
                      {member.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-white font-semibold">{member.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full border ${getTierBadgeColor(member.tier)} ${getTierColor(member.tier)}`}>
                          {member.tier.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {member.specialties.map((specialty, idx) => (
                          <span key={idx} className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full">
                            {specialty}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>⭐ {member.points.toLocaleString()} pontos</span>
                        <span>📍 {member.location}</span>
                        <span className={member.isOnline ? 'text-green-400' : 'text-gray-500'}>
                          {member.isOnline ? '🟢 Online' : '⚫ Offline'}
                        </span>
                      </div>
                    </div>
                    <button className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors">
                      Conectar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'events' && (
          <motion.div
            key="events"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white mb-2">Eventos da Comunidade</h3>
            <p className="text-gray-400 mb-6">
              Participe de webinars, networking sessions e workshops exclusivos
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <h4 className="text-blue-300 font-semibold mb-2">Webinar: Produção Musical com IA</h4>
                <p className="text-blue-200 text-sm mb-3">Quinta, 14 Dezembro • 19h</p>
                <button className="bg-blue-500 text-black px-4 py-2 rounded-lg text-sm font-medium">
                  Participar
                </button>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
                <h4 className="text-purple-300 font-semibold mb-2">Networking PRO</h4>
                <p className="text-purple-200 text-sm mb-3">Sábado, 16 Dezembro • 15h</p>
                <button className="bg-purple-500 text-black px-4 py-2 rounded-lg text-sm font-medium">
                  Participar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Access Upgrade Prompt */}
      {userTier === 'basic' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔓</span>
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-1">Desbloqueie Mais Acesso</h4>
              <p className="text-gray-300 text-sm">
                Upgrade para PRO e acesse salas exclusivas de networking e colaboração
              </p>
            </div>
            <button className="bg-primary-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors">
              Upgrade
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MemberCommunity;