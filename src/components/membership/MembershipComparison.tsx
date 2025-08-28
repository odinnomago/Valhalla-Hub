'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice, calculateAnnualSavings, type MembershipPlan, type MembershipTier } from '@/lib/membership';

interface PricingToggle {
  monthly: boolean;
  annual: boolean;
}

const MembershipComparison: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<MembershipTier>('pro');
  const [hoveredPlan, setHoveredPlan] = useState<MembershipTier | null>(null);

  const handlePlanSelect = (planId: MembershipTier) => {
    setSelectedPlan(planId);
    // Here you would typically redirect to checkout or show plan details
    console.log(`Selected plan: ${planId} with ${billingPeriod} billing`);
  };

  const getPlanPrice = (plan: MembershipPlan) => {
    return billingPeriod === 'monthly' ? plan.price.monthly : plan.price.annually;
  };

  const getMonthlyEquivalent = (plan: MembershipPlan) => {
    return billingPeriod === 'annual' ? plan.price.annually / 12 : plan.price.monthly;
  };

  const getPlanRecommendation = (plan: MembershipPlan) => {
    if (plan.popular) return { text: 'Mais Popular', color: 'bg-primary-500', textColor: 'text-black' };
    if (plan.recommended) return { text: 'Recomendado', color: 'bg-gradient-to-r from-yellow-500 to-orange-500', textColor: 'text-black' };
    return null;
  };

  return (
    <section id="pricing-comparison" className="py-20 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Escolha seu{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              plano ideal
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Todos os planos incluem acesso às 9 plataformas integradas. 
            Escolha o nível de benefícios que se adapta aos seus objetivos musicais.
          </p>
        </motion.div>

        {/* Billing Period Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-900 p-1 rounded-2xl border border-gray-800">
            <div className="flex items-center">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mensal
              </button>
              <button
                onClick={() => setBillingPeriod('annual')}
                className={`px-6 py-3 rounded-xl font-medium transition-all relative ${
                  billingPeriod === 'annual'
                    ? 'bg-primary-500 text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Anual
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  -16%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-6 mb-16">
          {membershipPlans.map((plan, index) => {
            const price = getPlanPrice(plan);
            const monthlyEquivalent = getMonthlyEquivalent(plan);
            const recommendation = getPlanRecommendation(plan);
            const isHovered = hoveredPlan === plan.id;
            const isSelected = selectedPlan === plan.id;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                className={`relative bg-gray-900/50 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                  isSelected || isHovered
                    ? 'border-primary-500 scale-105 shadow-2xl shadow-primary-500/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {/* Recommendation Badge */}
                {recommendation && (
                  <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${recommendation.color} ${recommendation.textColor} px-4 py-1 rounded-full text-sm font-bold`}>
                    {recommendation.text}
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.title}</p>
                  
                  {/* Price Display */}
                  <div className="space-y-2">
                    {price === 0 ? (
                      <div className="text-4xl font-bold text-white">Grátis</div>
                    ) : (
                      <>
                        <div className="text-4xl font-bold text-white">
                          {formatPrice(billingPeriod === 'annual' ? monthlyEquivalent : price)}
                          <span className="text-lg text-gray-400 font-normal">/mês</span>
                        </div>
                        {billingPeriod === 'annual' && (
                          <div className="text-sm text-gray-500">
                            {formatPrice(price)} cobrado anualmente
                          </div>
                        )}
                        {billingPeriod === 'annual' && plan.savings > 0 && (
                          <div className="text-sm text-green-400 font-medium">
                            Economize {formatPrice(calculateAnnualSavings(plan))} por ano
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Key Features */}
                <div className="space-y-3 mb-6">
                  {plan.benefits.slice(0, 4).map((benefit) => (
                    <div key={benefit.id} className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{benefit.icon}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{benefit.title}</p>
                        <p className="text-gray-400 text-xs">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                  {plan.benefits.length > 4 && (
                    <div className="text-center">
                      <span className="text-primary-400 text-sm">+{plan.benefits.length - 4} benefícios</span>
                    </div>
                  )}
                </div>

                {/* Target Audience */}
                <div className="mb-6">
                  <p className="text-gray-500 text-xs mb-2">Ideal para:</p>
                  <div className="flex flex-wrap gap-1">
                    {plan.target.slice(0, 2).map((target, idx) => (
                      <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                        {target}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-bold transition-all ${
                    plan.id === 'free'
                      ? 'bg-gray-700 text-white hover:bg-gray-600'
                      : isSelected || plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-black hover:shadow-lg'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {plan.id === 'free' ? 'Começar Grátis' : 'Escolher Plano'}
                </motion.button>

                {/* Free Trial Note */}
                {plan.id !== 'free' && (
                  <p className="text-center text-xs text-gray-500 mt-3">
                    7 dias grátis • Cancele quando quiser
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Comparação Detalhada de Recursos
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-4 text-gray-300 font-medium">Recursos</th>
                  {membershipPlans.map(plan => (
                    <th key={plan.id} className="text-center py-4 text-white font-bold min-w-[120px]">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm">
                {/* Academy Access */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Cursos Academy por mês</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white">
                      {plan.platformAccess.academy.coursesPerMonth === 'unlimited' 
                        ? '∞' 
                        : plan.platformAccess.academy.coursesPerMonth}
                    </td>
                  ))}
                </tr>

                {/* Marketplace Discount */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Desconto Marketplace</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white">
                      {plan.platformAccess.marketplace.discount > 0 
                        ? `${plan.platformAccess.marketplace.discount}%` 
                        : '—'}
                    </td>
                  ))}
                </tr>

                {/* Demo Evaluations */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Avaliações de Demo</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white">
                      {plan.platformAccess.gravadora.demoEvaluations === 'unlimited'
                        ? '∞'
                        : plan.platformAccess.gravadora.demoEvaluations}
                    </td>
                  ))}
                </tr>

                {/* Consultation Hours */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Consultoria mensal</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white">
                      {plan.features.consultingHours > 0 
                        ? `${plan.features.consultingHours}h` 
                        : plan.id === 'business' ? 'Ilimitado' : '—'}
                    </td>
                  ))}
                </tr>

                {/* Community Access */}
                <tr className="border-b border-gray-800">
                  <td className="py-4 text-gray-300">Acesso à Comunidade</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white capitalize">
                      {plan.platformAccess.community.access}
                    </td>
                  ))}
                </tr>

                {/* Storage */}
                <tr>
                  <td className="py-4 text-gray-300">Armazenamento</td>
                  {membershipPlans.map(plan => (
                    <td key={plan.id} className="text-center py-4 text-white">
                      {plan.limits?.storageGB ? `${plan.limits.storageGB}GB` : '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            Ainda com dúvidas? Todos os planos incluem <strong className="text-white">7 dias grátis</strong> para você testar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-primary-500 to-secondary-500 text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
              Começar Teste Grátis
            </button>
            <button className="border border-gray-600 text-white px-8 py-3 rounded-xl font-medium hover:border-primary-500 transition-all">
              Falar com Consultor
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipComparison;