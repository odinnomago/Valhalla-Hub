'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice } from '@/lib/membership';

interface UpgradeSuggestion {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  fromTier: string;
  toTier: string;
  savings: string;
  urgency: 'low' | 'medium' | 'high';
  trigger: string;
  cta: string;
}

const DashboardUpgrade: React.FC = () => {
  const [currentTier] = useState('basic'); // This would come from user context
  const [userBehavior] = useState({
    coursesCompleted: 8,
    hoursSpent: 45,
    communityActive: true,
    opportunitiesApplied: 3,
    mentorshipRequested: true,
    collaborationsJoined: 2
  });

  const [currentSuggestion, setCurrentSuggestion] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(true);

  const getUpgradeSuggestions = (): UpgradeSuggestion[] => {
    const suggestions: UpgradeSuggestion[] = [];

    // Logic for basic -> pro upgrade
    if (currentTier === 'basic') {
      if (userBehavior.coursesCompleted >= 5) {
        suggestions.push({
          id: 'courses_limit',
          title: 'Desbloqueie Acesso Ilimitado',
          description: 'Você já completou 8 cursos! No plano PRO você tem acesso ilimitado a todos os cursos.',
          benefits: ['Cursos ilimitados', 'Consultoria mensal', '20% desconto no Marketplace'],
          fromTier: 'basic',
          toTier: 'pro',
          savings: 'R$ 200/mês em valor',
          urgency: 'high',
          trigger: 'Limite de cursos atingido',
          cta: 'Fazer Upgrade para PRO'
        });
      }

      if (userBehavior.mentorshipRequested) {
        suggestions.push({
          id: 'mentorship_access',
          title: 'Mentoria Especializada',
          description: 'Você solicitou mentoria! No plano PRO você tem 1 hora mensal de consultoria incluída.',
          benefits: ['1h de mentoria/mês', 'Acesso prioritário', 'Feedback personalizado'],
          fromTier: 'basic',
          toTier: 'pro',
          savings: 'R$ 300 valor da mentoria',
          urgency: 'medium',
          trigger: 'Interesse em mentoria',
          cta: 'Incluir Mentoria'
        });
      }

      if (userBehavior.opportunitiesApplied >= 3) {
        suggestions.push({
          id: 'opportunities_priority',
          title: 'Prioridade em Oportunidades',
          description: 'Você está ativo nas oportunidades! No PRO você tem acesso prioritário e exclusivo.',
          benefits: ['Oportunidades exclusivas', 'Aplicação prioritária', 'Suporte dedicado'],
          fromTier: 'basic',
          toTier: 'pro',
          savings: 'Mais oportunidades = mais receita',
          urgency: 'high',
          trigger: 'Alto engajamento em oportunidades',
          cta: 'Garantir Prioridade'
        });
      }
    }

    // Logic for pro -> elite upgrade
    if (currentTier === 'pro') {
      suggestions.push({
        id: 'elite_benefits',
        title: 'Acelere sua Carreira',
        description: 'Você está pronto para o próximo nível! O plano ELITE oferece recursos avançados.',
        benefits: ['3h de mentoria/mês', 'Acesso Inner Circle', 'Oportunidades VIP'],
        fromTier: 'pro',
        toTier: 'elite',
        savings: 'R$ 500 em valor agregado',
        urgency: 'medium',
        trigger: 'Progresso consistente',
        cta: 'Evoluir para ELITE'
      });
    }

    return suggestions;
  };

  const upgradeSuggestions = getUpgradeSuggestions();

  useEffect(() => {
    if (upgradeSuggestions.length > 1) {
      const interval = setInterval(() => {
        setCurrentSuggestion((prev) => (prev + 1) % upgradeSuggestions.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [upgradeSuggestions.length]);

  const getCurrentPlan = () => {
    return membershipPlans.find(plan => plan.id === currentTier);
  };

  const getTargetPlan = (targetTier: string) => {
    return membershipPlans.find(plan => plan.id === targetTier);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500/30 bg-red-500/5';
      case 'medium': return 'border-yellow-500/30 bg-yellow-500/5';
      case 'low': return 'border-blue-500/30 bg-blue-500/5';
      default: return 'border-gray-500/30 bg-gray-500/5';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return '🚨';
      case 'medium': return '⚡';
      case 'low': return '💡';
      default: return '📈';
    }
  };

  if (!showUpgrade || upgradeSuggestions.length === 0) {
    return (
      <div className="bg-card border border-border/50 rounded-2xl p-6">
        <div class="text-center py-8">
          <div className="text-4xl mb-3">🎉</div>
          <h3 class="text-foreground font-bold mb-2">Você está no plano perfeito!</h3>
          <p class="text-muted-foreground text-sm">
            Continue aproveitando todos os benefícios do seu plano atual.
          </p>
        </div>
      </div>
    );
  }

  const currentSuggestionData = upgradeSuggestions[currentSuggestion];
  const currentPlan = getCurrentPlan();
  const targetPlan = getTargetPlan(currentSuggestionData.toTier);

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-bold text-foreground mb-1">
            Sugestão de Upgrade
          </h2>
          <p class="text-muted-foreground text-sm">
            Baseado no seu uso
          </p>
        </div>
        <button 
          onClick={() => setShowUpgrade(false)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSuggestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className={`${getUrgencyColor(currentSuggestionData.urgency)} border rounded-xl p-4 mb-4`}
        >
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">
              {getUrgencyIcon(currentSuggestionData.urgency)}
            </span>
            <div className="flex-1">
              <h3 class="text-foreground font-bold mb-1">
                {currentSuggestionData.title}
              </h3>
              <p class="text-muted-foreground text-sm leading-relaxed">
                {currentSuggestionData.description}
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <h4 class="text-foreground font-semibold mb-2 text-sm">
              🎯 Benefícios Inclusos:
            </h4>
            <div className="space-y-1">
              {currentSuggestionData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-green-400">✅</span>
                  <span class="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div class="bg-card rounded-lg p-3 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p class="text-muted-foreground text-xs">Plano Atual</p>
                <p class="text-foreground font-semibold">
                  {currentPlan?.name} - {formatPrice(currentPlan?.price || 0)}/mês
                </p>
              </div>
              <span className="text-primary-400">→</span>
              <div className="text-right">
                <p class="text-muted-foreground text-xs">Upgrade para</p>
                <p className="text-primary-400 font-semibold">
                  {targetPlan?.name} - {formatPrice(targetPlan?.price || 0)}/mês
                </p>
              </div>
            </div>
            <div className="mt-2 text-center">
              <p className="text-green-400 text-sm font-medium">
                {currentSuggestionData.savings}
              </p>
            </div>
          </div>

          {/* CTA */}
          <button className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-black py-3 rounded-lg font-bold hover:scale-105 transition-transform">
            {currentSuggestionData.cta}
          </button>

          {/* Trigger Info */}
          <div className="mt-3 text-center">
            <p class="text-muted-foreground text-xs">
              💡 {currentSuggestionData.trigger}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation dots */}
      {upgradeSuggestions.length > 1 && (
        <div className="flex justify-center gap-2 mb-4">
          {upgradeSuggestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSuggestion(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSuggestion 
                  ? 'bg-primary-500 w-6' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      )}

      {/* Additional Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="border-t border-border/50 pt-4"
      >
        <div className="grid grid-cols-2 gap-4 text-center text-sm">
          <div>
            <p class="text-foreground font-semibold mb-1">7 dias</p>
            <p class="text-muted-foreground text-xs">Teste grátis</p>
          </div>
          <div>
            <p class="text-foreground font-semibold mb-1">0%</p>
            <p class="text-muted-foreground text-xs">Taxa cancelamento</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardUpgrade;