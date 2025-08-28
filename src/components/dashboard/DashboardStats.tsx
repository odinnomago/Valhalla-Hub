'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Stat {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  description: string;
  tier: string[];
}

interface TimeFilter {
  id: string;
  label: string;
  period: string;
}

const DashboardStats: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [userTier] = useState('pro'); // This would come from user context

  const timeFilters: TimeFilter[] = [
    { id: '7d', label: '7 dias', period: 'week' },
    { id: '30d', label: '30 dias', period: 'month' },
    { id: '90d', label: '3 meses', period: 'quarter' },
    { id: '1y', label: '1 ano', period: 'year' }
  ];

  const getAllStats = (): Stat[] => [
    {
      id: 'courses_completed',
      label: 'Cursos Concluídos',
      value: '12',
      change: '+3',
      changeType: 'positive',
      icon: '🎓',
      description: 'Cursos finalizados com certificado',
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'hours_learned',
      label: 'Horas Estudadas',
      value: '48h',
      change: '+12h',
      changeType: 'positive',
      icon: '⏱️',
      description: 'Tempo total de aprendizado',
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'projects_created',
      label: 'Projetos Criados',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: '🎵',
      description: 'Faixas produzidas e compartilhadas',
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'community_points',
      label: 'Pontos Comunidade',
      value: '2,450',
      change: '+180',
      changeType: 'positive',
      icon: '⭐',
      description: 'Pontos de engajamento e ajuda',
      tier: ['basic', 'pro', 'elite', 'business']
    },
    {
      id: 'network_connections',
      label: 'Conexões',
      value: '34',
      change: '+5',
      changeType: 'positive',
      icon: '🤝',
      description: 'Profissionais conectados',
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'opportunities_applied',
      label: 'Oportunidades',
      value: '6',
      change: '+2',
      changeType: 'positive',
      icon: '🎯',
      description: 'Candidaturas para shows e projetos',
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'revenue_generated',
      label: 'Receita Gerada',
      value: 'R$ 3.200',
      change: '+R$ 800',
      changeType: 'positive',
      icon: '💰',
      description: 'Ganhos através da plataforma',
      tier: ['elite', 'business']
    },
    {
      id: 'followers_gained',
      label: 'Seguidores',
      value: '1,250',
      change: '+85',
      changeType: 'positive',
      icon: '👥',
      description: 'Crescimento de audiência',
      tier: ['pro', 'elite', 'business']
    },
    {
      id: 'streams_total',
      label: 'Total de Streams',
      value: '25,400',
      change: '+2,100',
      changeType: 'positive',
      icon: '🎧',
      description: 'Reproduções das suas músicas',
      tier: ['elite', 'business']
    },
    {
      id: 'mentorship_hours',
      label: 'Mentoria Recebida',
      value: '6h',
      change: '+2h',
      changeType: 'positive',
      icon: '🎯',
      description: 'Tempo de consultoria especializada',
      tier: ['pro', 'elite', 'business']
    }
  ];

  const getVisibleStats = () => {
    return getAllStats().filter(stat => stat.tier.includes(userTier));
  };

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive': return '↗️';
      case 'negative': return '↘️';
      default: return '➡️';
    }
  };

  const visibleStats = getVisibleStats();

  return (
    <section className="bg-gray-950 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Suas Estatísticas
            </h2>
            <p className="text-gray-400">
              Acompanhe seu progresso e conquistas no ecossistema Valhalla
            </p>
          </div>

          {/* Time Filter */}
          <div className="mt-4 sm:mt-0">
            <div className="bg-gray-900 rounded-xl p-1 flex gap-1">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedPeriod(filter.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === filter.id
                      ? 'bg-primary-500 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {visibleStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="mb-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-400 leading-tight">
                  {stat.label}
                </p>
              </div>

              {/* Change */}
              <div className="flex items-center gap-1">
                <span className="text-sm">
                  {getChangeIcon(stat.changeType)}
                </span>
                <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500">
                  {timeFilters.find(f => f.id === selectedPeriod)?.label}
                </span>
              </div>

              {/* Description on hover */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-gray-500 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Upgrade Prompt for Free Users */}
          {userTier === 'free' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: visibleStats.length * 0.1 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl mb-3">🔓</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Desbloqueie Mais
              </h3>
              <p className="text-sm text-gray-300 mb-4">
                Veja estatísticas avançadas com planos pagos
              </p>
              <button className="bg-primary-500 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors">
                Fazer Upgrade
              </button>
            </motion.div>
          )}
        </div>

        {/* Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {/* Achievement Highlight */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏆</span>
              <h3 className="text-lg font-bold text-white">Conquista Desbloqueada</h3>
            </div>
            <p className="text-yellow-300 font-medium mb-1">Estudante Dedicado</p>
            <p className="text-yellow-200 text-sm">
              Completou 10+ cursos em um mês
            </p>
          </div>

          {/* Goal Progress */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🎯</span>
              <h3 className="text-lg font-bold text-white">Meta do Mês</h3>
            </div>
            <p className="text-blue-300 font-medium mb-2">15 horas de estudo</p>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-blue-200 text-sm">11h / 15h (73%)</p>
          </div>

          {/* Streak Info */}
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🔥</span>
              <h3 className="text-lg font-bold text-white">Sequência Ativa</h3>
            </div>
            <p className="text-green-300 font-medium mb-1">12 dias consecutivos</p>
            <p className="text-green-200 text-sm">
              Continue por mais 3 dias para ganhar um bônus!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardStats;