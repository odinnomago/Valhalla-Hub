'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { membershipPlans } from '@/lib/membership';
import { getUserLevel, getNextLevelProgress } from '@/lib/gamification';
import { useAuth } from '@/hooks/useAuth';

interface UserData {
  name: string;
  avatar: string;
  tier: string;
  joinDate: string;
  points: number;
  streak: number;
  lastLogin: string;
}

const DashboardHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user, loading } = useAuth();
  const [userData, setUserData] = useState<UserData>({
    name: 'Visitante',
    avatar: '/images/users/default.jpg',
    tier: 'free',
    joinDate: new Date().toISOString(),
    points: 0,
    streak: 0,
    lastLogin: new Date().toISOString()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Update user data when auth state changes
  useEffect(() => {
    if (user && !loading) {
      // Extract user data from the auth user object
      const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Usuário';
      
      // In a real implementation, these values would come from the database
      // For now, we're setting default values of 0 to indicate no data
      // In a production environment, this would be replaced with an actual API call
      setUserData({
        name: name,
        avatar: user.user_metadata?.avatar_url || '/images/users/default.jpg',
        tier: user.email?.includes('pro') ? 'pro' : user.email?.includes('elite') ? 'elite' : 'free',
        joinDate: user.created_at || new Date().toISOString(),
        points: 0, // Would come from database in a real implementation
        streak: 0, // Would come from database in a real implementation
        lastLogin: user.last_sign_in_at || new Date().toISOString()
      });
    } else if (!user && !loading) {
      // Reset to default state when user logs out
      setUserData({
        name: 'Visitante',
        avatar: '/images/users/default.jpg',
        tier: 'free',
        joinDate: new Date().toISOString(),
        points: 0,
        streak: 0,
        lastLogin: new Date().toISOString()
      });
    }
  }, [user, loading]);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const getUserTierData = () => {
    return membershipPlans.find(plan => plan.id === userData.tier);
  };

  const userLevel = getUserLevel(userData.points);
  const nextLevelProgress = getNextLevelProgress(userData.points);
  const tierData = getUserTierData();

  const getTierColor = (tier: string) => {
    const colors = {
      free: 'text-foreground/70',
      basic: 'text-blue-400',
      pro: 'text-purple-400',
      elite: 'text-yellow-400',
      business: 'text-green-400'
    };
    return colors[tier as keyof typeof colors] || 'text-foreground/70';
  };

  const getTierBadgeColor = (tier: string) => {
    const colors = {
      free: 'bg-card/50 border border-border/50',
      basic: 'bg-blue-900/20 border border-blue-800/50',
      pro: 'bg-purple-900/20 border border-purple-800/50',
      elite: 'bg-yellow-900/20 border border-yellow-800/50',
      business: 'bg-green-900/20 border border-green-800/50'
    };
    return colors[tier as keyof typeof colors] || 'bg-card/50 border border-border/50';
  };

  // Show loading state while auth is initializing
  if (loading) {
    return (
      <section className="bg-background border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-muted rounded-full animate-pulse"></div>
                <div>
                  <div className="h-8 w-48 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-4 w-64 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {/* Left - Welcome Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold">
                {userData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground font-headline">
                  {getGreeting()}, {userData.name.split(' ')[0]}! 
                  <span className="ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </span>
                </h1>
                <p className="text-foreground/70">
                  Bem-vindo de volta ao seu painel Valhalla Hub
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v10"/>
                    <path d="M18 6v6"/>
                    <path d="M6 6v6"/>
                    <path d="M3 12h18"/>
                    <path d="M3 18h18"/>
                  </svg>
                </span>
                <span className="text-foreground/70">
                  <strong className="text-foreground">{userData.streak}</strong> dias consecutivos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </span>
                <span className="text-foreground/70">
                  <strong className="text-foreground">{userData.points.toLocaleString()}</strong> pontos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/>
                  </svg>
                </span>
                <span className="text-foreground/70">
                  Nível <strong className="text-foreground">{userLevel.level}</strong> - {userLevel.title}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right - Tier Information & Progress */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Membership Tier */}
            <div className={`${getTierBadgeColor(userData.tier)} rounded-xl p-4 transition-all duration-300 hover:border-border/80`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/70">Plano Atual</span>
                <span className={`text-sm font-bold ${getTierColor(userData.tier)}`}>
                  {tierData?.name || 'FREE'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-foreground font-semibold">
                  {tierData?.name || 'Membro Free'}
                </span>
                {userData.tier !== 'free' && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
                    ATIVO
                  </span>
                )}
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-card/50 border border-border/50 rounded-xl p-4 transition-all duration-300 hover:border-border/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-foreground/70">Próximo Nível</span>
                <span className="text-sm text-foreground/70">
                  {nextLevelProgress.current}/{nextLevelProgress.required}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500"
                  style={{ width: `${nextLevelProgress.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-foreground/50">
                {nextLevelProgress.pointsNeeded} pontos para o próximo nível
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 netflix-button bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <circle cx="12" cy="12" r="6"/>
                    <circle cx="12" cy="12" r="2"/>
                  </svg>
                </span>
                Objetivos
              </button>
              <button className="flex-1 netflix-button-outline bg-card hover:bg-card/80 text-foreground px-3 py-2 rounded-lg text-sm font-medium border border-border hover:border-border/80">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                  </svg>
                </span>
                Perfil
              </button>
            </div>
          </motion.div>
        </div>

        {/* Active Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Notification 1 */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-3 transition-all duration-300 hover:border-border/80">
              <div className="flex items-center gap-2">
                <span className="text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="16" x2="12" y2="12"/>
                    <line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">
                    Bem-vindo ao Valhalla Hub
                  </p>
                  <p className="text-foreground/70 text-xs">
                    Explore as funcionalidades da plataforma
                  </p>
                </div>
              </div>
            </div>

            {/* Notification 2 */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-3 transition-all duration-300 hover:border-border/80">
              <div className="flex items-center gap-2">
                <span className="text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">
                    Perfil atualizado
                  </p>
                  <p className="text-foreground/70 text-xs">
                    Complete seu perfil para mais benefícios
                  </p>
                </div>
              </div>
            </div>

            {/* Notification 3 */}
            <div className="bg-card/50 border border-border/50 rounded-lg p-3 transition-all duration-300 hover:border-border/80">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm font-medium truncate">
                    Dica do dia
                  </p>
                  <p className="text-foreground/70 text-xs">
                    Confira os novos cursos na Academia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardHeader;