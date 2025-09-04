'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CommunityActivity {
  id: string;
  type: 'discussion' | 'help' | 'showcase' | 'collaboration';
  user: {
    name: string;
    avatar: string;
    tier: string;
  };
  title: string;
  content: string;
  timestamp: string;
  interactions: {
    likes: number;
    comments: number;
    shares?: number;
  };
  tags: string[];
}

const DashboardCommunity: React.FC = () => {
  const communityActivities: CommunityActivity[] = [
    {
      id: '1',
      type: 'showcase',
      user: {
        name: 'Carlos Mendes',
        avatar: '/images/users/carlos.jpg',
        tier: 'elite'
      },
      title: 'Nova faixa: "Noites de SP"',
      content: 'Acabei de finalizar esta trap com influências de jazz. O que vocês acham da mixagem?',
      timestamp: '2h',
      interactions: { likes: 23, comments: 8, shares: 5 },
      tags: ['Trap', 'Jazz', 'Mixagem']
    },
    {
      id: '2',
      type: 'help',
      user: {
        name: 'Ana Silva',
        avatar: '/images/users/ana.jpg',
        tier: 'pro'
      },
      title: 'Dúvida sobre compressão',
      content: 'Alguém pode me ajudar com settings de compressor para vocais femininos?',
      timestamp: '4h',
      interactions: { likes: 15, comments: 12 },
      tags: ['Compressão', 'Vocal', 'Mixagem']
    },
    {
      id: '3',
      type: 'collaboration',
      user: {
        name: 'João Santos',
        avatar: '/images/users/joao.jpg',
        tier: 'basic'
      },
      title: 'Procuro vocalista',
      content: 'Tenho uma base de pop-rock pronta e preciso de um vocalista para completar.',
      timestamp: '6h',
      interactions: { likes: 31, comments: 18 },
      tags: ['Pop-Rock', 'Vocal', 'Colaboração']
    }
  ];

  const topContributors = [
    { name: 'Marina Costa', points: 2450, avatar: '/images/users/marina.jpg', tier: 'elite' },
    { name: 'Pedro Lima', points: 1890, avatar: '/images/users/pedro.jpg', tier: 'pro' },
    { name: 'Sofia Reis', points: 1654, avatar: '/images/users/sofia.jpg', tier: 'pro' },
    { name: 'Lucas Moura', points: 1432, avatar: '/images/users/lucas.jpg', tier: 'basic' }
  ];

  const getTierColor = (tier: string) => {
    const colors = {
      basic: 'text-blue-400',
      pro: 'text-purple-400',
      elite: 'text-yellow-400',
      business: 'text-green-400'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'showcase': return '🎵';
      case 'help': return '❓';
      case 'collaboration': return '🤝';
      case 'discussion': return '💬';
      default: return '📝';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'showcase': return 'text-purple-400';
      case 'help': return 'text-blue-400';
      case 'collaboration': return 'text-green-400';
      case 'discussion': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-foreground mb-1">
            Comunidade
          </h2>
          <p class="text-muted-foreground text-sm">
            Atividade dos membros
          </p>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors text-sm">
          Ver Tudo →
        </button>
      </div>

      {/* Recent Activities */}
      <div className="space-y-4 mb-6">
        {communityActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-card rounded-xl p-4 hover:bg-border transition-all group"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-sm font-bold">
                {activity.user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span class="text-foreground text-sm font-medium">
                    {activity.user.name}
                  </span>
                  <span className={`text-xs ${getTierColor(activity.user.tier)}`}>
                    {activity.user.tier.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${getActivityColor(activity.type)}`}>
                    {getActivityIcon(activity.type)}
                  </span>
                  <span class="text-muted-foreground text-xs">{activity.timestamp} atrás</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="mb-3">
              <h4 class="text-foreground font-medium text-sm mb-1">
                {activity.title}
              </h4>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {activity.content}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {activity.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-border text-muted-foreground text-xs px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Interactions */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{activity.interactions.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>{activity.interactions.comments}</span>
              </div>
              {activity.interactions.shares && (
                <div className="flex items-center gap-1">
                  <span>🔄</span>
                  <span>{activity.interactions.shares}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Contributors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-border/50 pt-6"
      >
        <h3 class="text-foreground font-semibold mb-4 text-sm">🏆 Top Contribuidores</h3>
        <div className="space-y-3">
          {topContributors.map((contributor, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-xs font-bold">
                {contributor.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p class="text-foreground text-sm font-medium truncate">
                  {contributor.name}
                </p>
                <p class="text-muted-foreground text-xs">
                  {contributor.points.toLocaleString()} pontos
                </p>
              </div>
              <span className={`text-xs ${getTierColor(contributor.tier)}`}>
                {contributor.tier.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-6 pt-6 border-t border-border/50"
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p class="text-lg font-bold text-foreground mb-1">156</p>
            <p class="text-muted-foreground text-xs">Online Agora</p>
          </div>
          <div>
            <p class="text-lg font-bold text-foreground mb-1">34</p>
            <p class="text-muted-foreground text-xs">Suas Conexões</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardCommunity;