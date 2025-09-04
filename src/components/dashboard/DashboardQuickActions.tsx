'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  action: () => void;
  tier: string[];
  badge?: string;
}

const DashboardQuickActions: React.FC = () => {
  const [userTier] = useState('pro'); // This would come from user context

  const quickActions: QuickAction[] = [
    {
      id: 'start_course',
      title: 'Continuar Curso',
      description: 'Produção Musical com IA - Módulo 3',
      icon: '🎓',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      action: () => console.log('Starting course'),
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'upload_track',
      title: 'Enviar Demo',
      description: 'Submeta sua música para avaliação',
      icon: '🎵',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      action: () => console.log('Upload track'),
      tier: ['basic', 'pro', 'elite', 'business'],
      badge: 'Nova'
    },
    {
      id: 'book_show',
      title: 'Agendar Show',
      description: 'Encontre oportunidades de apresentação',
      icon: '🎤',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      action: () => console.log('Book show'),
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'ai_marketing',
      title: 'Marketing IA',
      description: 'Gere conteúdo para suas redes sociais',
      icon: '🤖',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      action: () => console.log('AI Marketing'),
      tier: ['pro', 'elite', 'business'],
      badge: 'IA'
    },
    {
      id: 'marketplace',
      title: 'Marketplace',
      description: 'Venda beats, samples e serviços',
      icon: '🛍️',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20',
      action: () => console.log('Marketplace'),
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'community',
      title: 'Comunidade',
      description: 'Conecte-se com outros músicos',
      icon: '👥',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      borderColor: 'border-teal-500/20',
      action: () => console.log('Community'),
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'mentorship',
      title: 'Mentoria 1:1',
      description: 'Agende sua sessão de consultoria',
      icon: '🎯',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      action: () => console.log('Mentorship'),
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Veja relatórios detalhados',
      icon: '📊',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      action: () => console.log('Analytics'),
      tier: ['elite', 'business']
    }
  ];

  const getVisibleActions = () => {
    return quickActions.filter(action => action.tier.includes(userTier));
  };

  const visibleActions = getVisibleActions();

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Ações Rápidas
          </h2>
          <p className="text-muted-foreground text-sm">
            Acesse rapidamente as principais funcionalidades
          </p>
        </div>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {visibleActions.map((action, index) => (
          <motion.button
            key={action.id}
            onClick={action.action}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${action.bgColor} ${action.borderColor} border rounded-xl p-4 text-left transition-all duration-300 hover:border-opacity-50 group relative`}
          >
            {/* Badge */}
            {action.badge && (
              <div className="absolute top-2 right-2">
                <span className="bg-primary-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                  {action.badge}
                </span>
              </div>
            )}

            {/* Icon */}
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {action.icon}
            </div>

            {/* Content */}
            <div>
              <h3 className={`font-semibold mb-1 ${action.color} group-hover:text-opacity-80 transition-colors`}>
                {action.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {action.description}
              </p>
            </div>

            {/* Hover Arrow */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg className={`w-4 h-4 ${action.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </motion.button>
        ))}

        {/* Upgrade Card for Limited Access */}
        {userTier === 'basic' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: visibleActions.length * 0.1 }}
            className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="text-3xl mb-2">🔓</div>
            <h3 className="text-foreground font-semibold mb-1">
              Mais Recursos
            </h3>
            <p className="text-muted-foreground text-sm mb-3">
              Desbloqueie funcionalidades avançadas
            </p>
            <button className="bg-primary-500 text-black px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors">
              Upgrade
            </button>
          </motion.div>
        )}
      </div>

      {/* Recent Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-border/50"
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">5</p>
            <p className="text-muted-foreground text-sm">Ações hoje</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">23</p>
            <p className="text-muted-foreground text-sm">Esta semana</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground mb-1">89</p>
            <p className="text-muted-foreground text-sm">Este mês</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-6 bg-blue-500/5 border border-blue-500/10 rounded-xl p-4"
      >
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-lg">💡</span>
          <div>
            <h4 className="text-foreground font-medium mb-1">Dica do Dia</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Complete pelo menos uma ação por dia para manter sua sequência ativa e ganhar pontos extras!
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardQuickActions;