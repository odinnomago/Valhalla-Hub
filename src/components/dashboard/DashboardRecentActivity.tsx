'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Activity {
  id: string;
  type: 'course' | 'project' | 'community' | 'achievement' | 'opportunity' | 'mentorship';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
  color: string;
  bgColor: string;
  metadata?: {
    progress?: number;
    points?: number;
    participants?: number;
    status?: string;
  };
}

const DashboardRecentActivity: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'course' | 'project' | 'community' | 'achievement'>('all');

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'course',
      title: 'Curso Concluído',
      description: 'Mixagem e Masterização - Módulo Final',
      timestamp: '2 horas atrás',
      icon: '🎓',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      metadata: { progress: 100, points: 150 }
    },
    {
      id: '2',
      type: 'achievement',
      title: 'Conquista Desbloqueada',
      description: 'Estudante Dedicado - 10 cursos completados',
      timestamp: '4 horas atrás',
      icon: '🏆',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      metadata: { points: 500 }
    },
    {
      id: '3',
      type: 'community',
      title: 'Resposta Curtida',
      description: 'Sua dica sobre compressão ajudou 15 pessoas',
      timestamp: '6 horas atrás',
      icon: '❤️',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      metadata: { participants: 15, points: 30 }
    },
    {
      id: '4',
      type: 'project',
      title: 'Demo Enviada',
      description: 'Faixa "Noite de Verão" submetida para avaliação',
      timestamp: '1 dia atrás',
      icon: '🎵',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      metadata: { status: 'Em avaliação' }
    },
    {
      id: '5',
      type: 'opportunity',
      title: 'Candidatura Aceita',
      description: 'Show no Festival de Inverno - São Paulo',
      timestamp: '1 dia atrás',
      icon: '🎤',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      metadata: { status: 'Confirmado' }
    },
    {
      id: '6',
      type: 'mentorship',
      title: 'Sessão de Mentoria',
      description: 'Consultoria sobre estratégia de carreira',
      timestamp: '2 dias atrás',
      icon: '🎯',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      metadata: { status: 'Concluída' }
    },
    {
      id: '7',
      type: 'course',
      title: 'Novo Curso Iniciado',
      description: 'Produção Musical com IA - Módulo 1',
      timestamp: '3 dias atrás',
      icon: '📚',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      metadata: { progress: 25, points: 0 }
    },
    {
      id: '8',
      type: 'community',
      title: 'Novo Seguidor',
      description: 'Carlos Mendes começou a seguir você',
      timestamp: '3 dias atrás',
      icon: '👤',
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/10',
      metadata: { participants: 1 }
    }
  ];

  const filters = [
    { id: 'all', label: 'Todas', icon: '📋' },
    { id: 'course', label: 'Cursos', icon: '🎓' },
    { id: 'project', label: 'Projetos', icon: '🎵' },
    { id: 'community', label: 'Comunidade', icon: '👥' },
    { id: 'achievement', label: 'Conquistas', icon: '🏆' }
  ];

  const filteredActivities = filter === 'all' 
    ? recentActivities 
    : recentActivities.filter(activity => activity.type === filter);

  const getRelativeTime = (timestamp: string) => {
    // In a real implementation, this would calculate actual relative time
    return timestamp;
  };

  const getActivityMetadata = (activity: Activity) => {
    const { metadata } = activity;
    if (!metadata) return null;

    const elements = [];
    
    if (metadata.progress !== undefined) {
      elements.push(
        <div key="progress" className="flex items-center gap-1">
          <span class="text-xs text-muted-foreground">Progresso:</span>
          <span className={`text-xs font-medium ${activity.color}`}>
            {metadata.progress}%
          </span>
        </div>
      );
    }

    if (metadata.points) {
      elements.push(
        <div key="points" className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-xs text-yellow-400 font-medium">
            +{metadata.points} pts
          </span>
        </div>
      );
    }

    if (metadata.participants) {
      elements.push(
        <div key="participants" className="flex items-center gap-1">
          <span class="text-xs text-muted-foreground">👥</span>
          <span class="text-xs text-muted-foreground">
            {metadata.participants}
          </span>
        </div>
      );
    }

    if (metadata.status) {
      elements.push(
        <div key="status" className="flex items-center gap-1">
          <span className={`w-2 h-2 rounded-full ${
            metadata.status === 'Concluída' || metadata.status === 'Confirmado' 
              ? 'bg-green-500' 
              : metadata.status === 'Em avaliação' 
                ? 'bg-yellow-500' 
                : 'bg-gray-500'
          }`}></span>
          <span class="text-xs text-muted-foreground">
            {metadata.status}
          </span>
        </div>
      );
    }

    return elements;
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-foreground mb-1">
            Atividades Recentes
          </h2>
          <p className="text-muted-foreground text-sm">
            Seu histórico de ações e progresso
          </p>
        </div>
        <button className="text-muted-foreground hover:text-primary transition-colors text-sm">
          Ver Todas →
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((filterOption) => (
          <button
            key={filterOption.id}
            onClick={() => setFilter(filterOption.id as any)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
              filter === filterOption.id
                ? 'bg-primary text-primary-foreground font-medium'
                : 'bg-card text-muted-foreground hover:bg-border hover:text-foreground'
            }`}
          >
            <span>{filterOption.icon}</span>
            <span>{filterOption.label}</span>
          </button>
        ))}
      </div>

      {/* Activities List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence mode="wait">
          {filteredActivities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`${activity.bgColor} border border-border/50 rounded-xl p-4 hover:border-border transition-all duration-300 group`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-2xl group-hover:scale-110 transition-transform">
                  {activity.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className={`font-semibold ${activity.color} group-hover:text-opacity-80 transition-colors`}>
                        {activity.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {getRelativeTime(activity.timestamp)}
                    </span>
                  </div>

                  {/* Metadata */}
                  {getActivityMetadata(activity) && (
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      {getActivityMetadata(activity)}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State */}
        {filteredActivities.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-4xl mb-3">📭</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhuma atividade encontrada
            </h3>
            <p className="text-muted-foreground text-sm">
              Comece a explorar a plataforma para ver suas atividades aqui
            </p>
          </motion.div>
        )}
      </div>

      {/* Activity Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 pt-6 border-t border-border/50"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground mb-1">15</p>
            <p className="text-muted-foreground text-xs">Ações Hoje</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground mb-1">89</p>
            <p className="text-muted-foreground text-xs">Esta Semana</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground mb-1">234</p>
            <p className="text-muted-foreground text-xs">Este Mês</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground mb-1">12</p>
            <p className="text-muted-foreground text-xs">Sequência</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardRecentActivity;