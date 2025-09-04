'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

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

// User statistics interface - in a real implementation, this would come from an API
interface UserStats {
  coursesCompleted: number;
  hoursLearned: number;
  projectsCreated: number;
  communityPoints: number;
  networkConnections: number;
  opportunitiesApplied: number;
  revenueGenerated: number;
  followersGained: number;
  streamsTotal: number;
  mentorshipHours: number;
  tier: string;
}

const DashboardStats: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const { user, loading } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // In a real implementation, this would fetch actual user statistics from an API
  useEffect(() => {
    if (user && !loading) {
      // This is where you would fetch real user data from your backend
      // For now, we're setting default values of 0 to indicate no data
      // In a production environment, this would be replaced with an actual API call
      const realUserStats: UserStats = {
        coursesCompleted: 0,
        hoursLearned: 0,
        projectsCreated: 0,
        communityPoints: 0,
        networkConnections: 0,
        opportunitiesApplied: 0,
        revenueGenerated: 0,
        followersGained: 0,
        streamsTotal: 0,
        mentorshipHours: 0,
        tier: 'free' // Default tier, would come from user profile
      };
      
      setUserStats(realUserStats);
      setIsLoading(false);
    } else if (!user && !loading) {
      // Reset stats when user logs out
      setUserStats(null);
      setIsLoading(false);
    }
  }, [user, loading]);

  const timeFilters: TimeFilter[] = [
    { id: '7d', label: '7 dias', period: 'week' },
    { id: '30d', label: '30 dias', period: 'month' },
    { id: '90d', label: '3 meses', period: 'quarter' },
    { id: '1y', label: '1 ano', period: 'year' }
  ];

  const getAllStats = (): Stat[] => {
    if (!userStats) return [];
    
    return [
      {
        id: 'courses_completed',
        label: 'Cursos Concluídos',
        value: userStats.coursesCompleted.toString(),
        change: userStats.coursesCompleted > 0 ? `+${Math.max(0, Math.floor(userStats.coursesCompleted / 4))}` : '0',
        changeType: userStats.coursesCompleted > 0 ? 'positive' : 'neutral',
        icon: 'book-open',
        description: 'Cursos finalizados com certificado',
        tier: ['basic', 'pro', 'elite', 'business']
      },
      {
        id: 'hours_learned',
        label: 'Horas Estudadas',
        value: userStats.hoursLearned > 0 ? `${userStats.hoursLearned}h` : '0h',
        change: userStats.hoursLearned > 0 ? `+${Math.max(0, Math.floor(userStats.hoursLearned / 8))}h` : '0h',
        changeType: userStats.hoursLearned > 0 ? 'positive' : 'neutral',
        icon: 'clock',
        description: 'Tempo total de aprendizado',
        tier: ['basic', 'pro', 'elite', 'business']
      },
      {
        id: 'projects_created',
        label: 'Projetos Criados',
        value: userStats.projectsCreated.toString(),
        change: userStats.projectsCreated > 0 ? `+${Math.max(0, Math.floor(userStats.projectsCreated / 4))}` : '0',
        changeType: userStats.projectsCreated > 0 ? 'positive' : 'neutral',
        icon: 'music',
        description: 'Faixas produzidas e compartilhadas',
        tier: ['pro', 'elite', 'business']
      },
      {
        id: 'community_points',
        label: 'Pontos Comunidade',
        value: userStats.communityPoints > 0 ? userStats.communityPoints.toLocaleString() : '0',
        change: userStats.communityPoints > 0 ? `+${Math.max(0, Math.floor(userStats.communityPoints / 20))}` : '0',
        changeType: userStats.communityPoints > 0 ? 'positive' : 'neutral',
        icon: 'star',
        description: 'Pontos de engajamento e ajuda',
        tier: ['basic', 'pro', 'elite', 'business']
      },
      {
        id: 'network_connections',
        label: 'Conexões',
        value: userStats.networkConnections.toString(),
        change: userStats.networkConnections > 0 ? `+${Math.max(0, Math.floor(userStats.networkConnections / 7))}` : '0',
        changeType: userStats.networkConnections > 0 ? 'positive' : 'neutral',
        icon: 'users',
        description: 'Profissionais conectados',
        tier: ['pro', 'elite', 'business']
      },
      {
        id: 'opportunities_applied',
        label: 'Oportunidades',
        value: userStats.opportunitiesApplied.toString(),
        change: userStats.opportunitiesApplied > 0 ? `+${Math.max(0, Math.floor(userStats.opportunitiesApplied / 3))}` : '0',
        changeType: userStats.opportunitiesApplied > 0 ? 'positive' : 'neutral',
        icon: 'target',
        description: 'Candidaturas para shows e projetos',
        tier: ['pro', 'elite', 'business']
      },
      {
        id: 'revenue_generated',
        label: 'Receita Gerada',
        value: userStats.revenueGenerated > 0 ? `R$ ${userStats.revenueGenerated.toLocaleString()}` : 'R$ 0',
        change: userStats.revenueGenerated > 0 ? `+R$ ${Math.max(0, Math.floor(userStats.revenueGenerated / 10))}` : 'R$ 0',
        changeType: userStats.revenueGenerated > 0 ? 'positive' : 'neutral',
        icon: 'dollar-sign',
        description: 'Ganhos através da plataforma',
        tier: ['elite', 'business']
      },
      {
        id: 'followers_gained',
        label: 'Seguidores',
        value: userStats.followersGained > 0 ? userStats.followersGained.toLocaleString() : '0',
        change: userStats.followersGained > 0 ? `+${Math.max(0, Math.floor(userStats.followersGained / 30))}` : '0',
        changeType: userStats.followersGained > 0 ? 'positive' : 'neutral',
        icon: 'user-plus',
        description: 'Crescimento de audiência',
        tier: ['pro', 'elite', 'business']
      },
      {
        id: 'streams_total',
        label: 'Total de Streams',
        value: userStats.streamsTotal > 0 ? userStats.streamsTotal.toLocaleString() : '0',
        change: userStats.streamsTotal > 0 ? `+${Math.max(0, Math.floor(userStats.streamsTotal / 50))}` : '0',
        changeType: userStats.streamsTotal > 0 ? 'positive' : 'neutral',
        icon: 'headphones',
        description: 'Reproduções das suas músicas',
        tier: ['elite', 'business']
      },
      {
        id: 'mentorship_hours',
        label: 'Mentoria Recebida',
        value: userStats.mentorshipHours > 0 ? `${userStats.mentorshipHours}h` : '0h',
        change: userStats.mentorshipHours > 0 ? `+${Math.max(0, Math.floor(userStats.mentorshipHours / 3))}h` : '0h',
        changeType: userStats.mentorshipHours > 0 ? 'positive' : 'neutral',
        icon: 'user-check',
        description: 'Tempo de consultoria especializada',
        tier: ['pro', 'elite', 'business']
      }
    ];
  };

  const getVisibleStats = () => {
    if (!userStats) return [];
    return getAllStats().filter(stat => stat.tier.includes(userStats.tier));
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
      case 'positive': return 'trending-up';
      case 'negative': return 'trending-down';
      default: return 'minus';
    }
  };

  const visibleStats = getVisibleStats();

  // Show loading state
  if (loading || isLoading) {
    return (
      <section className="bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="h-10 w-48 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card border border-border/50 rounded-2xl p-6">
                <div className="h-8 w-8 bg-muted rounded-full animate-pulse mb-4"></div>
                <div className="h-8 w-16 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Function to render icons based on icon name
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'book-open':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
          </svg>
        );
      case 'clock':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
        );
      case 'music':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18V5l12-2v13"/>
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="16" r="3"/>
          </svg>
        );
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        );
      case 'users':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        );
      case 'target':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
        );
      case 'dollar-sign':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
        );
      case 'user-plus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <line x1="20" y1="8" x2="20" y2="14"/>
            <line x1="23" y1="11" x2="17" y2="11"/>
          </svg>
        );
      case 'headphones':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
          </svg>
        );
      case 'user-check':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="8.5" cy="7" r="4"/>
            <polyline points="17 11 19 13 23 9"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          </svg>
        );
    }
  };

  // Function to render change icons
  const renderChangeIcon = (iconName: string) => {
    switch (iconName) {
      case 'trending-up':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
            <polyline points="17 6 23 6 23 12"/>
          </svg>
        );
      case 'trending-down':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
            <polyline points="17 18 23 18 23 12"/>
          </svg>
        );
      case 'minus':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        );
    }
  };

  return (
    <section className="bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Suas Estatísticas
            </h2>
            <p className="text-muted-foreground">
              Acompanhe seu progresso e conquistas no ecossistema Valhalla
            </p>
          </div>

          {/* Time Filter */}
          <div className="mt-4 sm:mt-0">
            <div className="bg-card rounded-xl p-1 flex gap-1">
              {timeFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedPeriod(filter.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedPeriod === filter.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card'
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
              className="bg-card border border-border/50 rounded-2xl p-6 hover:border-border transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                {renderIcon(stat.icon)}
              </div>

              {/* Value */}
              <div className="mb-2">
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-muted-foreground leading-tight">
                  {stat.label}
                </p>
              </div>

              {/* Change */}
              <div className="flex items-center gap-1">
                <span className="text-sm">
                  {renderChangeIcon(getChangeIcon(stat.changeType))}
                </span>
                <span className={`text-sm font-medium ${getChangeColor(stat.changeType)}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground">
                  {timeFilters.find(f => f.id === selectedPeriod)?.label}
                </span>
              </div>

              {/* Description on hover */}
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Upgrade Prompt for Basic Users */}
          {userStats && userStats.tier === 'basic' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: visibleStats.length * 0.1 }}
              className="bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-3xl mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Desbloqueie Mais
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
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
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                </svg>
              </span>
              <h3 className="text-lg font-bold text-foreground">Conquista Desbloqueada</h3>
            </div>
            <p className="text-foreground font-medium mb-1">Estudante Dedicado</p>
            <p className="text-muted-foreground text-sm">
              Completou 10+ cursos em um mês
            </p>
          </div>

          {/* Goal Progress */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </span>
              <h3 className="text-lg font-bold text-foreground">Meta do Mês</h3>
            </div>
            <p className="text-foreground font-medium mb-2">15 horas de estudo</p>
            <div className="w-full bg-border rounded-full h-2 mb-2">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full w-3/4"></div>
            </div>
            <p className="text-muted-foreground text-sm">11h / 15h (73%)</p>
          </div>

          {/* Streak Info */}
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v10"/>
                  <path d="M18 6v6"/>
                  <path d="M6 6v6"/>
                  <path d="M3 12h18"/>
                  <path d="M3 18h18"/>
                </svg>
              </span>
              <h3 className="text-lg font-bold text-foreground">Sequência Ativa</h3>
            </div>
            <p className="text-foreground font-medium mb-1">12 dias consecutivos</p>
            <p className="text-muted-foreground text-sm">
              Continue por mais 3 dias para ganhar um bônus!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardStats;