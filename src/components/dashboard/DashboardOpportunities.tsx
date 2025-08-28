'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Opportunity {
  id: string;
  title: string;
  type: 'show' | 'collaboration' | 'contest' | 'course' | 'mentorship';
  description: string;
  deadline: string;
  reward: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  color: string;
  bgColor: string;
  tags: string[];
  applicants?: number;
  maxApplicants?: number;
}

const DashboardOpportunities: React.FC = () => {
  const opportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Festival de Verão SP',
      type: 'show',
      description: 'Oportunidade de se apresentar no maior festival de música eletrônica de São Paulo',
      deadline: '15 dias',
      reward: 'R$ 2.500 + hospedagem',
      difficulty: 'intermediate',
      icon: '🎤',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      tags: ['Eletrônica', 'São Paulo', 'Festival'],
      applicants: 45,
      maxApplicants: 100
    },
    {
      id: '2',
      title: 'Collab: Hip Hop Track',
      type: 'collaboration',
      description: 'Rapper procura produtor para faixa de hip hop com pegada trap',
      deadline: '7 dias',
      reward: '50% dos royalties',
      difficulty: 'beginner',
      icon: '🤝',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      tags: ['Hip Hop', 'Trap', 'Produção'],
      applicants: 12,
      maxApplicants: 25
    },
    {
      id: '3',
      title: 'Mentoria Elite',
      type: 'mentorship',
      description: 'Sessão 1:1 com produtor Grammy Winner sobre mixagem avançada',
      deadline: '3 dias',
      reward: 'Sessão de 2h',
      difficulty: 'advanced',
      icon: '🎯',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      tags: ['Mixagem', 'Masterização', 'Elite'],
      applicants: 8,
      maxApplicants: 10
    },
    {
      id: '4',
      title: 'Concurso Remix',
      type: 'contest',
      description: 'Crie um remix oficial da faixa "Noites de Verão" e concorra a prêmios',
      deadline: '21 dias',
      reward: 'R$ 5.000 + contrato',
      difficulty: 'intermediate',
      icon: '🏆',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      tags: ['Remix', 'Concurso', 'EDM'],
      applicants: 89,
      maxApplicants: 200
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-500/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-500/20';
      case 'advanced': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'Iniciante';
      case 'intermediate': return 'Intermediário';
      case 'advanced': return 'Avançado';
      default: return 'N/A';
    }
  };

  const getUrgencyColor = (deadline: string) => {
    const days = parseInt(deadline);
    if (days <= 3) return 'text-red-400';
    if (days <= 7) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">
            Oportunidades
          </h2>
          <p className="text-gray-400 text-sm">
            Recomendadas para você
          </p>
        </div>
        <button className="text-gray-400 hover:text-primary-400 transition-colors text-sm">
          Ver Todas →
        </button>
      </div>

      <div className="space-y-4">
        {opportunities.map((opportunity, index) => (
          <motion.div
            key={opportunity.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={`${opportunity.bgColor} border border-gray-700/50 rounded-xl p-4 hover:border-gray-600 transition-all group`}
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-xl group-hover:scale-110 transition-transform">
                {opportunity.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className={`font-semibold ${opportunity.color} group-hover:text-opacity-80 transition-colors`}>
                    {opportunity.title}
                  </h3>
                  <span className={`text-xs font-medium ${getUrgencyColor(opportunity.deadline)}`}>
                    ⏰ {opportunity.deadline}
                  </span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-2">
                  {opportunity.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {opportunity.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-gray-700/50 text-gray-300 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-green-400">💰</span>
                  <span className="text-gray-400">{opportunity.reward}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(opportunity.difficulty)}`}>
                  {getDifficultyLabel(opportunity.difficulty)}
                </span>
              </div>
              
              {opportunity.applicants && opportunity.maxApplicants && (
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-xs">
                    {opportunity.applicants}/{opportunity.maxApplicants}
                  </span>
                  <div className="w-16 bg-gray-700 rounded-full h-1">
                    <div 
                      className="bg-primary-500 h-1 rounded-full"
                      style={{ 
                        width: `${(opportunity.applicants / opportunity.maxApplicants) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-3 pt-3 border-t border-gray-700/50">
              <button className={`w-full ${opportunity.bgColor} border border-gray-600 text-white py-2 rounded-lg text-sm font-medium hover:border-gray-500 transition-colors group-hover:bg-opacity-20`}>
                {opportunity.type === 'show' ? 'Candidatar-se' :
                 opportunity.type === 'collaboration' ? 'Colaborar' :
                 opportunity.type === 'contest' ? 'Participar' :
                 opportunity.type === 'mentorship' ? 'Agendar' :
                 'Saber Mais'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 pt-6 border-t border-gray-800"
      >
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-white mb-1">23</p>
            <p className="text-gray-400 text-xs">Disponíveis</p>
          </div>
          <div>
            <p className="text-lg font-bold text-white mb-1">5</p>
            <p className="text-gray-400 text-xs">Aplicadas</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOpportunities;