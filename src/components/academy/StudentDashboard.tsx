'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastWatched: string;
  estimatedTimeLeft: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  nextLesson?: {
    title: string;
    duration: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  courses: string[];
  category: string;
}

interface ActivityItem {
  id: string;
  type: 'lesson_completed' | 'course_started' | 'achievement_unlocked' | 'project_submitted';
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

const StudentDashboard: React.FC = () => {
  const [activeView, setActiveView] = useState<'overview' | 'courses' | 'progress' | 'community'>('overview');

  // Mock user data
  const userStats = {
    coursesEnrolled: 12,
    coursesCompleted: 5,
    totalHoursWatched: 147,
    currentStreak: 15,
    certificatesEarned: 3,
    communityRank: 342,
    skillPoints: 2847
  };

  const enrolledCourses: Course[] = [
    {
      id: '1',
      title: 'Produção Musical Completa',
      instructor: 'DJ Marcus Silva',
      thumbnail: '/images/courses/production-complete.jpg',
      progress: 68,
      totalLessons: 45,
      completedLessons: 31,
      lastWatched: 'há 2 dias',
      estimatedTimeLeft: '4h 23min',
      category: 'Produção',
      difficulty: 'intermediate',
      nextLesson: {
        title: 'Mixagem Avançada - EQ e Compressão',
        duration: '18min'
      }
    },
    {
      id: '2',
      title: 'MasterClass: Performance & Presença de Palco',
      instructor: 'Anitta',
      thumbnail: '/images/courses/masterclass-performance.jpg',
      progress: 23,
      totalLessons: 12,
      completedLessons: 3,
      lastWatched: 'há 5 dias',
      estimatedTimeLeft: '2h 45min',
      category: 'Performance',
      difficulty: 'advanced',
      nextLesson: {
        title: 'Controlando a Respiração no Palco',
        duration: '12min'
      }
    },
    {
      id: '3',
      title: 'DJ Profissional - Técnicas Avançadas',
      instructor: 'Carlos Rhythm',
      thumbnail: '/images/courses/dj-advanced.jpg',
      progress: 89,
      totalLessons: 25,
      completedLessons: 22,
      lastWatched: 'ontem',
      estimatedTimeLeft: '45min',
      category: 'DJing',
      difficulty: 'advanced',
      nextLesson: {
        title: 'Projeto Final - Set de 1 Hora',
        duration: '30min'
      }
    }
  ];

  const recentAchievements: Achievement[] = [
    {
      id: '1',
      title: 'Primeira Semana Completa',
      description: 'Estudou por 7 dias consecutivos',
      icon: '🔥',
      unlockedAt: 'há 3 dias',
      rarity: 'common'
    },
    {
      id: '2',
      title: 'Beat Master',
      description: 'Completou o módulo de criação de beats',
      icon: '🥁',
      unlockedAt: 'há 1 semana',
      rarity: 'rare'
    },
    {
      id: '3',
      title: 'Networking Pro',
      description: 'Fez 10 conexões na comunidade',
      icon: '🤝',
      unlockedAt: 'há 2 semanas',
      rarity: 'epic'
    }
  ];

  const learningGoals: LearningGoal[] = [
    {
      id: '1',
      title: 'Dominar Produção Musical',
      description: 'Completar trilha completa de produção',
      targetDate: '2024-06-30',
      progress: 72,
      courses: ['Produção Musical Completa', 'Sound Design', 'Mixagem & Mastering'],
      category: 'Produção'
    },
    {
      id: '2',
      title: 'Lançar Primeiro EP',
      description: 'Criar e lançar 4 músicas autorais',
      targetDate: '2024-08-15',
      progress: 25,
      courses: ['Composição & Harmonia', 'Arranjo Musical', 'Marketing Musical'],
      category: 'Carreira'
    }
  ];

  const recentActivity: ActivityItem[] = [
    {
      id: '1',
      type: 'lesson_completed',
      title: 'Aula concluída',
      description: 'Sound Design - Criando Leads Únicos',
      timestamp: 'há 2 horas',
      icon: '📚'
    },
    {
      id: '2',
      type: 'achievement_unlocked',
      title: 'Conquista desbloqueada',
      description: 'Primeira Semana Completa',
      timestamp: 'há 3 dias',
      icon: '🏆'
    },
    {
      id: '3',
      type: 'project_submitted',
      title: 'Projeto enviado',
      description: 'Beat Trap Brasileiro - Projeto Final',
      timestamp: 'há 5 dias',
      icon: '🎵'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 bg-gray-400/10';
      case 'rare': return 'text-blue-400 bg-blue-400/10';
      case 'epic': return 'text-purple-400 bg-purple-400/10';
      case 'legendary': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Bem-vindo de volta, Lucas! 👋</h1>
        <p className="text-gray-300">Continue sua jornada musical e alcance seus objetivos.</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-orange-400">🔥</span>
            <span className="text-white font-semibold">{userStats.currentStreak} dias consecutivos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-400">⚡</span>
            <span className="text-white font-semibold">{userStats.skillPoints} pontos</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary-400">{userStats.coursesEnrolled}</div>
          <div className="text-gray-400 text-sm">Cursos Matriculados</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{userStats.coursesCompleted}</div>
          <div className="text-gray-400 text-sm">Cursos Concluídos</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{userStats.totalHoursWatched}h</div>
          <div className="text-gray-400 text-sm">Horas Estudadas</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{userStats.certificatesEarned}</div>
          <div className="text-gray-400 text-sm">Certificados</div>
        </div>
      </div>

      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Continue Aprendendo</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.slice(0, 3).map(course => (
            <div key={course.id} className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="relative h-32">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="bg-gray-900/80 rounded-full p-1">
                    <div 
                      className="bg-primary-500 h-1 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-white font-semibold mb-1 line-clamp-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{course.instructor}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{course.progress}% completo</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>

                {course.nextLesson && (
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-primary-400 text-sm font-medium">Próxima aula:</p>
                    <p className="text-gray-300 text-xs">{course.nextLesson.title}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Goals */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Metas de Aprendizado</h2>
        <div className="space-y-4">
          {learningGoals.map(goal => (
            <div key={goal.id} className="bg-gray-900 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white font-semibold mb-1">{goal.title}</h3>
                  <p className="text-gray-400 text-sm">{goal.description}</p>
                </div>
                <span className="text-primary-400 text-sm">
                  {new Date(goal.targetDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-300">Progresso</span>
                  <span className="text-white font-semibold">{goal.progress}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {goal.courses.map(courseName => (
                  <span key={courseName} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                    {courseName}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CoursesTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Meus Cursos</h2>
        <button className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors">
          Explorar Novos Cursos
        </button>
      </div>

      <div className="grid gap-6">
        {enrolledCourses.map(course => (
          <div key={course.id} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors">
            <div className="flex items-start gap-4">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-bold text-lg">{course.title}</h3>
                    <p className="text-gray-400">{course.instructor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(course.difficulty)}`}>
                    {course.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-400">Progresso:</span>
                    <span className="text-white font-semibold ml-2">{course.progress}%</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Aulas:</span>
                    <span className="text-white font-semibold ml-2">{course.completedLessons}/{course.totalLessons}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Tempo restante:</span>
                    <span className="text-white font-semibold ml-2">{course.estimatedTimeLeft}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Último acesso:</span>
                    <span className="text-white font-semibold ml-2">{course.lastWatched}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-primary-500 h-2 rounded-full transition-all"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                {course.nextLesson && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-primary-400 text-sm font-medium">Próxima aula:</p>
                      <p className="text-gray-300 text-sm">{course.nextLesson.title} • {course.nextLesson.duration}</p>
                    </div>
                    <button className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors">
                      Continuar
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProgressTab = () => (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Meu Progresso</h2>

      {/* Recent Activity */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Atividade Recente</h3>
        <div className="space-y-3">
          {recentActivity.map(activity => (
            <div key={activity.id} className="bg-gray-900 rounded-lg p-4 flex items-start gap-4">
              <span className="text-2xl">{activity.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">{activity.title}</h4>
                  <span className="text-gray-400 text-sm">{activity.timestamp}</span>
                </div>
                <p className="text-gray-400 text-sm">{activity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Conquistas Recentes</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentAchievements.map(achievement => (
            <div key={achievement.id} className="bg-gray-900 rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h4 className="text-white font-bold mb-2">{achievement.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded-full text-xs ${getRarityColor(achievement.rarity)}`}>
                  {achievement.rarity}
                </span>
                <span className="text-gray-500 text-xs">{achievement.unlockedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-700">
          {[
            { id: 'overview', name: 'Visão Geral', icon: '📊' },
            { id: 'courses', name: 'Meus Cursos', icon: '📚' },
            { id: 'progress', name: 'Progresso', icon: '📈' },
            { id: 'community', name: 'Comunidade', icon: '👥' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all ${
                activeView === tab.id
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
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeView === 'overview' && <OverviewTab />}
            {activeView === 'courses' && <CoursesTab />}
            {activeView === 'progress' && <ProgressTab />}
            {activeView === 'community' && (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold text-white mb-4">Comunidade</h2>
                <p className="text-gray-400 mb-8">Conecte-se com outros alunos e compartilhe seus projetos.</p>
                <button className="bg-primary-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-primary-400 transition-colors">
                  Em Breve
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudentDashboard;