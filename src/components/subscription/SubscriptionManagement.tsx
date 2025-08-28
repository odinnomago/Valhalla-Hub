'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice } from '@/lib/membership';
import SubscriptionManager from '@/lib/subscription';

interface SubscriptionData {
  id: string;
  planId: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date | null;
}

const SubscriptionManagement: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionData | null>({
    id: 'sub_1234567890',
    planId: 'pro',
    status: 'active',
    currentPeriodEnd: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false,
    trialEnd: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<string>('');

  const currentPlan = membershipPlans.find(plan => plan.id === subscription?.planId);
  const isTrialing = subscription?.status === 'trialing';
  const isPastDue = subscription?.status === 'past_due';
  const isCanceled = subscription?.status === 'canceled' || subscription?.cancelAtPeriodEnd;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'trialing': return 'text-blue-400 bg-blue-500/20';
      case 'past_due': return 'text-yellow-400 bg-yellow-500/20';
      case 'canceled': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'trialing': return 'Período Teste';
      case 'past_due': return 'Pagamento Pendente';
      case 'canceled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const handleCancelSubscription = async () => {
    if (!subscription) return;

    setLoading(true);
    try {
      await SubscriptionManager.cancelSubscription(subscription.id);
      setSubscription(prev => prev ? { ...prev, cancelAtPeriodEnd: true } : null);
      setShowCancelModal(false);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Erro ao cancelar assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleReactivateSubscription = async () => {
    if (!subscription) return;

    setLoading(true);
    try {
      await SubscriptionManager.reactivateSubscription(subscription.id);
      setSubscription(prev => prev ? { ...prev, cancelAtPeriodEnd: false } : null);
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      alert('Erro ao reativar assinatura. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (newPlanId: string) => {
    if (!subscription) return;

    setLoading(true);
    try {
      // In a real implementation, you would need to get the price ID for the new plan
      // and call the change subscription API
      console.log('Upgrading to plan:', newPlanId);
      setSubscription(prev => prev ? { ...prev, planId: newPlanId } : null);
      setShowUpgradeModal(false);
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      alert('Erro ao alterar plano. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const openCustomerPortal = async () => {
    setLoading(true);
    try {
      const result = await SubscriptionManager.createCustomerPortalSession(
        'cus_1234567890', // In real implementation, get from user data
        window.location.href
      );
      if (result.success && result.url) {
        window.open(result.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      alert('Erro ao abrir portal do cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getUpgradeOptions = () => {
    if (!currentPlan) return [];
    
    const currentIndex = membershipPlans.findIndex(plan => plan.id === currentPlan.id);
    return membershipPlans.slice(currentIndex + 1);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  if (!subscription) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📱</div>
          <h3 className="text-white font-bold mb-2">Nenhuma assinatura ativa</h3>
          <p className="text-gray-400 text-sm mb-4">
            Escolha um plano para começar a aproveitar todos os benefícios
          </p>
          <button className="bg-primary-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-primary-400 transition-colors">
            Ver Planos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">
            Gerenciar Assinatura
          </h2>
          <p className="text-gray-400 text-sm">
            Controle sua assinatura e pagamentos
          </p>
        </div>
        <button
          onClick={openCustomerPortal}
          disabled={loading}
          className="text-gray-400 hover:text-primary-400 transition-colors text-sm disabled:opacity-50"
        >
          Portal Completo →
        </button>
      </div>

      {/* Current Plan Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 rounded-xl p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-white font-bold text-lg">{currentPlan?.name}</h3>
            <p className="text-gray-400 text-sm">{currentPlan?.description}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-white">
              {formatPrice(currentPlan?.price || 0)}<span className="text-sm text-gray-400">/mês</span>
            </p>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
              {getStatusLabel(subscription.status)}
            </span>
          </div>
        </div>

        {/* Status Messages */}
        {isTrialing && subscription.trialEnd && (
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-blue-400">🎉</span>
              <div>
                <p className="text-blue-300 text-sm font-medium">Período de teste ativo</p>
                <p className="text-blue-200 text-xs">
                  Seu teste termina em {formatDate(subscription.trialEnd)}
                </p>
              </div>
            </div>
          </div>
        )}

        {isCanceled && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-red-400">⚠️</span>
              <div>
                <p className="text-red-300 text-sm font-medium">
                  {subscription.status === 'canceled' ? 'Assinatura cancelada' : 'Cancelamento agendado'}
                </p>
                <p className="text-red-200 text-xs">
                  Acesso até {formatDate(subscription.currentPeriodEnd)}
                </p>
              </div>
            </div>
          </div>
        )}

        {isPastDue && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">💳</span>
              <div>
                <p className="text-yellow-300 text-sm font-medium">Pagamento pendente</p>
                <p className="text-yellow-200 text-xs">
                  Atualize seus dados de pagamento para continuar
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Next billing */}
        {subscription.status === 'active' && !isCanceled && (
          <div className="text-center text-sm text-gray-400">
            Próxima cobrança em {formatDate(subscription.currentPeriodEnd)}
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Upgrade */}
        {getUpgradeOptions().length > 0 && !isCanceled && (
          <button
            onClick={() => setShowUpgradeModal(true)}
            disabled={loading}
            className="bg-primary-500 text-black py-3 rounded-xl font-medium hover:bg-primary-400 transition-colors disabled:opacity-50"
          >
            🚀 Fazer Upgrade
          </button>
        )}

        {/* Reactivate */}
        {isCanceled && subscription.status !== 'canceled' && (
          <button
            onClick={handleReactivateSubscription}
            disabled={loading}
            className="bg-green-500 text-black py-3 rounded-xl font-medium hover:bg-green-400 transition-colors disabled:opacity-50"
          >
            ✅ Reativar
          </button>
        )}

        {/* Manage Payment */}
        <button
          onClick={openCustomerPortal}
          disabled={loading}
          className="bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors disabled:opacity-50"
        >
          💳 Gerenciar Pagamento
        </button>

        {/* Cancel */}
        {!isCanceled && (
          <button
            onClick={() => setShowCancelModal(true)}
            disabled={loading}
            className="bg-red-500/20 border border-red-500/30 text-red-400 py-3 rounded-xl font-medium hover:bg-red-500/30 transition-colors disabled:opacity-50"
          >
            ❌ Cancelar
          </button>
        )}
      </div>

      {/* Cancel Modal */}
      <AnimatePresence>
        {showCancelModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowCancelModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Cancelar Assinatura
              </h3>
              <p className="text-gray-300 mb-6">
                Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos benefícios 
                no final do período atual ({formatDate(subscription.currentPeriodEnd)}).
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  Manter Assinatura
                </button>
                <button
                  onClick={handleCancelSubscription}
                  disabled={loading}
                  className="flex-1 bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-400 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Cancelando...' : 'Confirmar Cancelamento'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUpgradeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Fazer Upgrade
              </h3>
              <p className="text-gray-300 mb-6">
                Escolha seu novo plano. A cobrança será ajustada proporcionalmente.
              </p>
              
              <div className="space-y-3 mb-6">
                {getUpgradeOptions().map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedUpgradePlan(plan.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedUpgradePlan === plan.id
                        ? 'border-primary-500 bg-primary-500/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{plan.name}</h4>
                        <p className="text-gray-400 text-sm">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{formatPrice(plan.price)}/mês</p>
                        <p className="text-green-400 text-xs">
                          +{formatPrice(plan.price - (currentPlan?.price || 0))}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => selectedUpgradePlan && handleUpgrade(selectedUpgradePlan)}
                  disabled={!selectedUpgradePlan || loading}
                  className="flex-1 bg-primary-500 text-black py-3 rounded-xl font-medium hover:bg-primary-400 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Atualizando...' : 'Confirmar Upgrade'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SubscriptionManagement;