'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  category: 'learning' | 'social' | 'dedication' | 'mastery' | 'special';
  unlocked: boolean;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
  condition: string;
}

interface UserLevel {
  level: number;
  title: string;
  currentXP: number;
  nextLevelXP: number;
  totalXP: number;
  perks: string[];
}

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  level: number;
  points: number;
  rank: number;
  streak: number;
  specialization: string;
}

interface UserProgress {
  dailyStreak: number;
  totalHoursStudied: number;
  coursesCompleted: number;
  lessonsWatched: number;
  projectsSubmitted: number;
  communityContributions: number;
  certificatesEarned: number;
}

interface GamificationSystemProps {
  userId: string;
  userProgress: UserProgress;
  onLevelUp?: (newLevel: number) => void;
  onAchievementUnlocked?: (achievement: Achievement) => void;
}

const GamificationSystem: React.FC<GamificationSystemProps> = ({
  userId,
  userProgress,
  onLevelUp,
  onAchievementUnlocked
}) => {
  const [userLevel, setUserLevel] = useState<UserLevel>({
    level: 5,
    title: 'Estudante Dedicado',
    currentXP: 2847,
    nextLevelXP: 3500,
    totalXP: 2847,
    perks: ['Download offline', 'Comunidade VIP', 'Badge especial']
  });

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      title: 'Primeiros Passos',
      description: 'Complete sua primeira aula',
      icon: '👶',
      rarity: 'common',
      points: 50,
      category: 'learning',
      unlocked: true,
      unlockedAt: '2024-01-10',
      condition: 'Completar 1 aula'
    },
    {
      id: '2',
      title: 'Sede de Conhecimento',
      description: 'Assista 10 horas de conteúdo',
      icon: '🧠',
      rarity: 'rare',
      points: 200,
      category: 'dedication',
      unlocked: true,
      unlockedAt: '2024-01-15',
      condition: 'Assistir 10 horas'
    },
    {
      id: '3',
      title: 'Sequência Imparável',
      description: 'Estude por 7 dias consecutivos',
      icon: '🔥',
      rarity: 'epic',
      points: 300,
      category: 'dedication',
      unlocked: true,
      unlockedAt: '2024-01-20',
      condition: 'Streak de 7 dias'
    },
    {
      id: '4',
      title: 'Maestro da Produção',
      description: 'Complete a trilha de Produção Musical',
      icon: '🎹',
      rarity: 'legendary',
      points: 1000,
      category: 'mastery',
      unlocked: false,
      progress: 3,
      maxProgress: 5,
      condition: 'Completar trilha de Produção'
    },
    {
      id: '5',
      title: 'Mentor da Comunidade',
      description: 'Ajude 50 outros alunos',
      icon: '🤝',
      rarity: 'epic',
      points: 500,
      category: 'social',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      condition: 'Ajudar 50 alunos'
    },
    {
      id: '6',
      title: 'Maratonista Musical',
      description: 'Estude por 100 horas',
      icon: '🏃‍♂️',
      rarity: 'rare',
      points: 400,
      category: 'dedication',
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      condition: 'Estudar 100 horas'
    }
  ]);

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      name: 'Carlos Producer',
      avatar: '/images/students/carlos.jpg',
      level: 8,
      points: 5420,
      rank: 1,
      streak: 23,
      specialization: 'Produção Musical'
    },
    {
      id: '2',
      name: 'Maria Vocalist',
      avatar: '/images/students/maria.jpg',
      level: 7,
      points: 4890,
      rank: 2,
      streak: 18,
      specialization: 'Performance'
    },
    {
      id: '3',
      name: 'Pedro DJ',
      avatar: '/images/students/pedro.jpg',
      level: 6,
      points: 3654,
      rank: 3,
      streak: 15,
      specialization: 'DJing'
    },
    {
      id: userId,
      name: 'Você',
      avatar: '/images/students/user.jpg',
      level: userLevel.level,
      points: userLevel.totalXP,
      rank: 12,
      streak: userProgress.dailyStreak,
      specialization: 'Multi-instrumentista'
    },
    {
      id: '4',
      name: 'Ana Composer',
      avatar: '/images/students/ana.jpg',
      level: 5,
      points: 2234,
      rank: 15,
      streak: 8,
      specialization: 'Composição'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'leaderboard'>('overview');

  const getLevelData = (xp: number) => {
    const baseXP = 1000;
    const level = Math.floor(xp / baseXP) + 1;
    const currentLevelXP = xp % baseXP;
    const nextLevelXP = baseXP;
    
    const titles = [
      'Iniciante Curioso',
      'Estudante Engajado',
      'Aprendiz Dedicado',
      'Estudante Avançado',
      'Estudante Dedicado',
      'Músico em Formação',
      'Artista Emergente',
      'Profissional Talentoso',
      'Mestre Musical',
      'Lenda da Academia'
    ];

    return {
      level,
      title: titles[Math.min(level - 1, titles.length - 1)],
      currentXP: currentLevelXP,
      nextLevelXP,
      totalXP: xp
    };
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
      case 'rare': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'epic': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'legendary': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚';
      case 'social': return '👥';
      case 'dedication': return '💪';
      case 'mastery': return '🏆';
      case 'special': return '⭐';
      default: return '🎯';
    }
  };

  const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`p-4 rounded-xl border-2 ${getRarityColor(achievement.rarity)} ${
        achievement.unlocked ? 'opacity-100' : 'opacity-50'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{achievement.icon}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-white font-bold">{achievement.title}</h3>
            <span className="text-xs">{getCategoryIcon(achievement.category)}</span>
          </div>
          <p className="text-gray-300 text-sm mb-2">{achievement.description}</p>
          
          {!achievement.unlocked && achievement.progress !== undefined && achievement.maxProgress && (
            <div className="mb-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-400">Progresso</span>
                <span className="text-white">{achievement.progress}/{achievement.maxProgress}</span>
              </div>
              <div className="bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-primary-500 h-2 rounded-full transition-all"
                  style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              achievement.rarity === 'legendary' ? 'text-yellow-400' :
              achievement.rarity === 'epic' ? 'text-purple-400' :
              achievement.rarity === 'rare' ? 'text-blue-400' : 'text-gray-400'
            }`}>
              {achievement.rarity.toUpperCase()}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-primary-400 font-bold">{achievement.points}</span>
              <span className="text-gray-400 text-xs">XP</span>
            </div>
          </div>

          {achievement.unlocked && achievement.unlockedAt && (
            <p className="text-green-400 text-xs mt-2">
              ✓ Desbloqueado em {new Date(achievement.unlockedAt).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* User Level */}
      <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-black font-bold text-xl">
            {userLevel.level}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{userLevel.title}</h2>
            <p className="text-gray-300">Nível {userLevel.level}</p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-300">Progresso para o próximo nível</span>
            <span className="text-white font-semibold">
              {userLevel.currentXP} / {userLevel.nextLevelXP} XP
            </span>
          </div>
          <div className="bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full transition-all"
              style={{ width: `${(userLevel.currentXP / userLevel.nextLevelXP) * 100}%` }}
            />
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-2">Benefícios do seu nível:</h3>
          <div className="flex flex-wrap gap-2">
            {userLevel.perks.map((perk, index) => (
              <span key={index} className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm">
                {perk}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-orange-400">{userProgress.dailyStreak}</div>
          <div className="text-gray-400 text-sm">Dias Consecutivos</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">⏱️</div>
          <div className="text-2xl font-bold text-blue-400">{userProgress.totalHoursStudied}h</div>
          <div className="text-gray-400 text-sm">Horas Estudadas</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🎓</div>
          <div className="text-2xl font-bold text-green-400">{userProgress.coursesCompleted}</div>
          <div className="text-gray-400 text-sm">Cursos Concluídos</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-yellow-400">{userProgress.certificatesEarned}</div>
          <div className="text-gray-400 text-sm">Certificados</div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Conquistas Recentes</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.filter(a => a.unlocked).slice(0, 4).map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Next Achievements */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Próximas Conquistas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {achievements.filter(a => !a.unlocked).slice(0, 2).map(achievement => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>
    </div>
  );

  const AchievementsTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Todas as Conquistas</h2>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-300">
            {achievements.filter(a => a.unlocked).length} / {achievements.length} desbloqueadas
          </span>
          <div className="bg-gray-700 rounded-full h-2 w-32">
            <div 
              className="bg-primary-500 h-2 rounded-full"
              style={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        {['all', 'learning', 'social', 'dedication', 'mastery', 'special'].map(category => (
          <button
            key={category}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {getCategoryIcon(category)} {category === 'all' ? 'Todas' : category}
          </button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {achievements.map(achievement => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </div>
  );

  const LeaderboardTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Ranking Semanal</h2>
        <select className="bg-gray-800 text-white px-4 py-2 rounded-lg">
          <option>Esta Semana</option>
          <option>Este Mês</option>
          <option>Todos os Tempos</option>
        </select>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl ${
              entry.id === userId ? 'bg-primary-500/20 border-2 border-primary-500' : 'bg-gray-900'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                entry.rank === 1 ? 'bg-yellow-500 text-black' :
                entry.rank === 2 ? 'bg-gray-400 text-black' :
                entry.rank === 3 ? 'bg-orange-500 text-black' : 'bg-gray-700 text-white'
              }`}>
                {entry.rank <= 3 ? (entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉') : entry.rank}
              </div>

              <img
                src={entry.avatar}
                alt={entry.name}
                className="w-12 h-12 rounded-full"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-bold">{entry.name}</h3>
                  {entry.id === userId && (
                    <span className="px-2 py-1 bg-primary-500 text-black rounded-full text-xs font-bold">
                      VOCÊ
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm">{entry.specialization}</p>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="text-white font-bold">Nv. {entry.level}</div>
                    <div className="text-gray-400 text-sm">{entry.points} XP</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-orange-400">🔥</span>
                      <span className="text-white font-bold">{entry.streak}</span>
                    </div>
                    <div className="text-gray-400 text-xs">dias</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Challenge */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">🏆 Desafio da Semana</h3>
        <div className="mb-4">
          <h4 className="text-white font-semibold">Maratona Musical</h4>
          <p className="text-gray-300 text-sm">Estude por 10 horas esta semana e ganhe 500 XP extras!</p>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-300">Progresso</span>
            <span className="text-white">6.5 / 10 horas</span>
          </div>
          <div className="bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '65%' }} />
          </div>
        </div>
        <p className="text-purple-400 text-sm">🎁 Recompensa: Badge especial + 500 XP</p>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          {[
            { id: 'overview', name: 'Visão Geral', icon: '📊' },
            { id: 'achievements', name: 'Conquistas', icon: '🏆' },
            { id: 'leaderboard', name: 'Ranking', icon: '👑' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'text-primary-400 border-b-2 border-primary-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'achievements' && <AchievementsTab />}
            {activeTab === 'leaderboard' && <LeaderboardTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GamificationSystem;