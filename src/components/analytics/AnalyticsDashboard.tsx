'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MembershipMetrics } from '@/app/api/analytics/route';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  description: string;
}

const AnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<MembershipMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Mock data for demonstration
  const mockMetrics: MembershipMetrics = {
    conversionRate: 15.4,
    upgradeRate: 23.8,
    churnRate: 4.2,
    ltv: 1850.0,
    arpu: 67.50,
    
    dailyActiveUsers: 1234,
    monthlyActiveUsers: 8567,
    sessionDuration: 1420, // seconds
    featuresUsed: ['Academy', 'Community', 'Opportunities', 'Mentorship', 'Marketplace'],
    
    mrr: 125000,
    arr: 1500000,
    revenueGrowth: 12.5,
    
    planDistribution: {
      free: 45,
      basic: 30,
      pro: 18,
      elite: 6,
      business: 1
    },
    planRevenue: {
      basic: 25000,
      pro: 65000,
      elite: 30000,
      business: 5000
    },
    
    period: '30d',
    generatedAt: new Date()
  };

  useEffect(() => {
    fetchMetrics();
  }, [selectedPeriod]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the API
      // const response = await fetch(`/api/analytics?type=metrics&period=${selectedPeriod}`);
      // const data = await response.json();
      // setMetrics(data);
      
      // For demo, use mock data
      setTimeout(() => {
        setMetrics(mockMetrics);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}min`;
  };

  const getMetricCards = (): MetricCard[] => {
    if (!metrics) return [];

    return [
      {
        title: 'Taxa de Conversão',
        value: `${metrics.conversionRate.toFixed(1)}%`,
        change: '+2.3%',
        changeType: 'positive',
        icon: '📈',
        description: 'Visitantes que se tornaram assinantes'
      },
      {
        title: 'Taxa de Upgrade',
        value: `${metrics.upgradeRate.toFixed(1)}%`,
        change: '+5.1%',
        changeType: 'positive',
        icon: '⬆️',
        description: 'Usuários que fizeram upgrade de plano'
      },
      {
        title: 'Taxa de Churn',
        value: `${metrics.churnRate.toFixed(1)}%`,
        change: '-1.2%',
        changeType: 'positive',
        icon: '📉',
        description: 'Usuários que cancelaram assinatura'
      },
      {
        title: 'LTV',
        value: formatCurrency(metrics.ltv),
        change: '+8.7%',
        changeType: 'positive',
        icon: '💎',
        description: 'Valor médio ao longo da vida do cliente'
      },
      {
        title: 'ARPU',
        value: formatCurrency(metrics.arpu),
        change: '+3.4%',
        changeType: 'positive',
        icon: '💰',
        description: 'Receita média por usuário'
      },
      {
        title: 'Usuários Ativos (DAU)',
        value: metrics.dailyActiveUsers.toLocaleString(),
        change: '+12%',
        changeType: 'positive',
        icon: '👥',
        description: 'Usuários ativos diariamente'
      },
      {
        title: 'MRR',
        value: formatCurrency(metrics.mrr),
        change: '+15.2%',
        changeType: 'positive',
        icon: '📊',
        description: 'Receita recorrente mensal'
      },
      {
        title: 'Sessão Média',
        value: formatDuration(metrics.sessionDuration),
        change: '+4.1%',
        changeType: 'positive',
        icon: '⏱️',
        description: 'Tempo médio de sessão'
      }
    ];
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

  const getPlanColor = (planId: string) => {
    const colors = {
      free: 'bg-gray-500',
      basic: 'bg-blue-500',
      pro: 'bg-purple-500',
      elite: 'bg-yellow-500',
      business: 'bg-green-500'
    };
    return colors[planId as keyof typeof colors] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded mb-4 w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Analytics & Métricas
          </h2>
          <p className="text-gray-400 text-sm">
            Performance do portal de membros
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
          {[
            { id: '7d', label: '7d' },
            { id: '30d', label: '30d' },
            { id: '90d', label: '90d' },
            { id: '1y', label: '1a' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-3 py-1 rounded text-sm transition-all ${
                selectedPeriod === period.id
                  ? 'bg-primary-500 text-black font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {getMetricCards().map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-all group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl group-hover:scale-110 transition-transform">
                {metric.icon}
              </span>
              <span className={`text-sm ${getChangeColor(metric.changeType)}`}>
                {getChangeIcon(metric.changeType)} {metric.change}
              </span>
            </div>
            <div className="mb-2">
              <h3 className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-sm text-gray-400">{metric.title}</p>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {metric.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Plan Distribution */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Plan Distribution Chart */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Distribuição por Plano
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics.planDistribution).map(([plan, percentage]) => (
                <div key={plan} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getPlanColor(plan)}`}></div>
                  <span className="text-white capitalize font-medium flex-1">
                    {plan === 'business' ? 'Business' : plan}
                  </span>
                  <span className="text-gray-400 text-sm">{percentage}%</span>
                  <div className="w-20 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getPlanColor(plan)}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue by Plan */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">
              Receita por Plano
            </h3>
            <div className="space-y-3">
              {Object.entries(metrics.planRevenue).map(([plan, revenue]) => (
                <div key={plan} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getPlanColor(plan)}`}></div>
                    <span className="text-white capitalize font-medium">
                      {plan === 'business' ? 'Business' : plan}
                    </span>
                  </div>
                  <span className="text-gray-300 font-semibold">
                    {formatCurrency(revenue)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold">Total MRR</span>
                <span className="text-primary-400 font-bold text-lg">
                  {formatCurrency(metrics.mrr)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Most Used Features */}
      {metrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-6 bg-gray-800/50 border border-gray-700 rounded-xl p-6"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Recursos Mais Utilizados
          </h3>
          <div className="flex flex-wrap gap-2">
            {metrics.featuresUsed.map((feature, index) => (
              <span
                key={feature}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  index === 0 
                    ? 'bg-primary-500/20 border-primary-500/30 text-primary-300' 
                    : 'bg-gray-700/50 border-gray-600 text-gray-300'
                }`}
              >
                {feature}
                {index === 0 && ' 👑'}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="mt-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">📊</span>
          <h3 className="text-lg font-bold text-white">Resumo do Período</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Performance Geral</p>
            <p className="text-green-400 font-semibold">📈 Crescimento positivo em todas as métricas</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Plano Mais Popular</p>
            <p className="text-blue-400 font-semibold">💎 Plano Basic (30% dos usuários)</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Oportunidade</p>
            <p className="text-yellow-400 font-semibold">🎯 Foco em upgrade para Pro</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsDashboard;