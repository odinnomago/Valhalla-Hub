'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { membershipPlans } from '@/lib/membership';
import { getUserLevel, getNextLevelProgress } from '@/lib/gamification';

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
  const [userData, setUserData] = useState<UserData>({
    name: 'Marina Santos',
    avatar: '/images/users/marina.jpg',
    tier: 'pro',
    joinDate: '2024-01-15',
    points: 2450,
    streak: 12,
    lastLogin: new Date().toISOString()
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
      free: 'text-gray-400',
      basic: 'text-blue-400',
      pro: 'text-purple-400',
      elite: 'text-yellow-400',
      business: 'text-green-400'
    };
    return colors[tier as keyof typeof colors] || 'text-gray-400';
  };

  const getTierBadgeColor = (tier: string) => {
    const colors = {
      free: 'bg-gray-500/20 border-gray-500/30',
      basic: 'bg-blue-500/20 border-blue-500/30',
      pro: 'bg-purple-500/20 border-purple-500/30',
      elite: 'bg-yellow-500/20 border-yellow-500/30',
      business: 'bg-green-500/20 border-green-500/30'
    };
    return colors[tier as keyof typeof colors] || 'bg-gray-500/20 border-gray-500/30';
  };

  return (
    <section className="bg-gradient-to-br from-gray-950 via-black to-gray-950 border-b border-gray-800">
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
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-xl font-bold">
                {userData.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {getGreeting()}, {userData.name.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-400">
                  Bem-vindo de volta ao seu painel Valhalla Hub
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-primary-400">🔥</span>
                <span className="text-gray-300">
                  <strong className="text-white">{userData.streak}</strong> dias consecutivos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-secondary-400">⭐</span>
                <span className="text-gray-300">
                  <strong className="text-white">{userData.points.toLocaleString()}</strong> pontos
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">🏆</span>
                <span className="text-gray-300">
                  Nível <strong className="text-white">{userLevel.level}</strong> - {userLevel.title}
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
            <div className={`${getTierBadgeColor(userData.tier)} border rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Plano Atual</span>
                <span className={`text-sm font-bold ${getTierColor(userData.tier)}`}>
                  {tierData?.name || 'FREE'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">
                  {tierData?.name || 'Membro Free'}
                </span>
                {userData.tier !== 'free' && (
                  <span className="bg-primary-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                    ATIVO
                  </span>
                )}
              </div>
            </div>

            {/* Level Progress */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Próximo Nível</span>
                <span className="text-sm text-gray-300">
                  {nextLevelProgress.current}/{nextLevelProgress.required}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                <div
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${nextLevelProgress.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {nextLevelProgress.pointsNeeded} pontos para o próximo nível
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <button className="flex-1 bg-primary-500 text-black px-3 py-2 rounded-lg text-sm font-medium hover:bg-primary-400 transition-colors">
                🎯 Objetivos
              </button>
              <button className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                ⚙️ Perfil
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
            {/* New Course Available */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">📚</span>
                <div className="flex-1 min-w-0">
                  <p className="text-blue-300 text-sm font-medium truncate">
                    Novo curso disponível
                  </p>
                  <p className="text-blue-200 text-xs">
                    "Produção Musical com IA"
                  </p>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-xs">
                  Ver →
                </button>
              </div>
            </div>

            {/* Community Activity */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-green-400">💬</span>
                <div className="flex-1 min-w-0">
                  <p className="text-green-300 text-sm font-medium truncate">
                    Menção na comunidade
                  </p>
                  <p className="text-green-200 text-xs">
                    Carlos comentou seu projeto
                  </p>
                </div>
                <button className="text-green-400 hover:text-green-300 text-xs">
                  Ver →
                </button>
              </div>
            </div>

            {/* Opportunity Alert */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⚡</span>
                <div className="flex-1 min-w-0">
                  <p className="text-yellow-300 text-sm font-medium truncate">
                    Nova oportunidade
                  </p>
                  <p className="text-yellow-200 text-xs">
                    Show em São Paulo
                  </p>
                </div>
                <button className="text-yellow-400 hover:text-yellow-300 text-xs">
                  Ver →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardHeader;