'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressItem {
  id: string;
  title: string;
  current: number;
  total: number;
  unit: string;
  color: string;
  icon: string;
  description: string;
}

const DashboardProgress: React.FC = () => {
  const progressItems: ProgressItem[] = [
    {
      id: 'courses',
      title: 'Cursos Academy',
      current: 12,
      total: 20,
      unit: 'cursos',
      color: 'from-blue-500 to-blue-600',
      icon: '🎓',
      description: 'Meta mensal de cursos'
    },
    {
      id: 'projects',
      title: 'Projetos Musicais',
      current: 8,
      total: 12,
      unit: 'projetos',
      color: 'from-purple-500 to-purple-600',
      icon: '🎵',
      description: 'Criações e demos'
    },
    {
      id: 'networking',
      title: 'Networking',
      current: 34,
      total: 50,
      unit: 'conexões',
      color: 'from-green-500 to-green-600',
      icon: '🤝',
      description: 'Profissionais conectados'
    },
    {
      id: 'performance',
      title: 'Performance',
      current: 6,
      total: 10,
      unit: 'shows',
      color: 'from-orange-500 to-orange-600',
      icon: '🎤',
      description: 'Apresentações realizadas'
    }
  ];

  const getPercentage = (current: number, total: number) => {
    return Math.min((current / total) * 100, 100);
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Progresso de Carreira
          </h2>
          <p className="text-gray-400 text-sm">
            Acompanhe seu desenvolvimento profissional
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {progressItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-800/50 rounded-xl p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 text-sm">
                  {item.current} de {item.total} {item.unit}
                </span>
                <span className="text-white font-semibold">
                  {Math.round(getPercentage(item.current, item.total))}%
                </span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getPercentage(item.current, item.total)}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
                />
              </div>
            </div>

            <div className="text-xs text-gray-500">
              {item.total - item.current > 0 ? (
                `Faltam ${item.total - item.current} ${item.unit} para completar`
              ) : (
                '🎉 Meta atingida!'
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardProgress;