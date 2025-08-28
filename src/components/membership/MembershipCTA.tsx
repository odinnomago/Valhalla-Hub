'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice } from '@/lib/membership';

interface CountdownTimer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MembershipCTA: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isAnnual, setIsAnnual] = useState(false);
  const [countdown, setCountdown] = useState<CountdownTimer>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showUrgency, setShowUrgency] = useState(true);

  // Countdown to end of promotion (3 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(23, 59, 59, 999);

    const updateCountdown = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setShowUrgency(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const selectedPlanData = membershipPlans.find(plan => plan.id === selectedPlan);
  const annualPrice = selectedPlanData ? selectedPlanData.price * 10 : 0; // 16% discount
  const monthlyPrice = selectedPlanData?.price || 0;
  const savings = selectedPlanData ? (selectedPlanData.price * 12) - annualPrice : 0;

  const urgencyMessages = [
    "🔥 Oferta limitada: 7 dias grátis",
    "⏰ Últimas vagas para mentoria ELITE",
    "🎯 Garantia de satisfação de 7 dias",
    "💡 Sem taxas de cancelamento"
  ];

  const trustIndicators = [
    { icon: '🔒', text: 'Pagamento 100% seguro' },
    { icon: '✅', text: 'Sem compromisso de permanência' },
    { icon: '🎧', text: 'Suporte 24/7 especializado' },
    { icon: '📱', text: 'Acesso via web e mobile' }
  ];

  const getStarted = () => {
    // In a real implementation, this would redirect to checkout
    console.log('Starting checkout for plan:', selectedPlan, 'annual:', isAnnual);
    alert(`Redirecionando para checkout do plano ${selectedPlanData?.name} ${isAnnual ? 'anual' : 'mensal'}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-950 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgency Banner */}
        <AnimatePresence>
          {showUrgency && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 px-6 py-3 rounded-full">
                <span className="text-red-400 font-bold">🚨 OFERTA ESPECIAL</span>
                <div className="flex items-center gap-2 text-white">
                  <span>Termina em:</span>
                  <div className="flex gap-1">
                    <span className="bg-red-500 px-2 py-1 rounded text-xs font-bold">
                      {countdown.days.toString().padStart(2, '0')}d
                    </span>
                    <span className="bg-red-500 px-2 py-1 rounded text-xs font-bold">
                      {countdown.hours.toString().padStart(2, '0')}h
                    </span>
                    <span className="bg-red-500 px-2 py-1 rounded text-xs font-bold">
                      {countdown.minutes.toString().padStart(2, '0')}m
                    </span>
                    <span className="bg-red-500 px-2 py-1 rounded text-xs font-bold">
                      {countdown.seconds.toString().padStart(2, '0')}s
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main CTA Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pronto para{' '}
            <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
              transformar
            </span>
            <br />sua carreira musical?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Junte-se a mais de 15.000 membros que estão construindo suas carreiras 
            no maior ecossistema musical do Brasil
          </p>

          {/* Rotating Urgency Messages */}
          <motion.div
            key={urgencyMessages[Math.floor(Date.now() / 3000) % urgencyMessages.length]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block bg-primary-500/10 border border-primary-500/20 px-4 py-2 rounded-full text-primary-300 font-medium"
          >
            {urgencyMessages[Math.floor(Date.now() / 3000) % urgencyMessages.length]}
          </motion.div>
        </motion.div>

        {/* Plan Selection Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-3xl p-8 mb-12"
        >
          {/* Plan Selector */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-800 rounded-2xl p-2 flex gap-2">
              {membershipPlans.filter(plan => ['basic', 'pro', 'elite'].includes(plan.id)).map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`px-6 py-3 rounded-xl transition-all font-medium ${
                    selectedPlan === plan.id
                      ? 'bg-primary-500 text-black'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <span className={`text-sm ${!isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
              Mensal
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? 'bg-primary-500' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                isAnnual ? 'translate-x-8' : 'translate-x-1'
              }`}></div>
            </button>
            <span className={`text-sm ${isAnnual ? 'text-white font-medium' : 'text-gray-400'}`}>
              Anual
            </span>
            {isAnnual && (
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full font-medium">
                Economize 16%
              </span>
            )}
          </div>

          {/* Price Display */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              {isAnnual && monthlyPrice > 0 && (
                <span className="text-gray-500 line-through text-lg">
                  {formatPrice(monthlyPrice * 12)}
                </span>
              )}
              <span className="text-4xl md:text-5xl font-bold text-white">
                {isAnnual ? formatPrice(annualPrice) : formatPrice(monthlyPrice)}
              </span>
              <span className="text-gray-400">
                /{isAnnual ? 'ano' : 'mês'}
              </span>
            </div>
            {isAnnual && savings > 0 && (
              <p className="text-green-400 font-medium">
                Você economiza {formatPrice(savings)} por ano! 🎉
              </p>
            )}
            <p className="text-gray-400 text-sm mt-2">
              7 dias grátis • Cancele quando quiser
            </p>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-8">
            <motion.button
              onClick={getStarted}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-black px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
            >
              🚀 Começar Agora - 7 Dias Grátis
            </motion.button>
            <p className="text-gray-500 text-sm mt-3">
              Sem taxas de cancelamento • Suporte 24/7 incluído
            </p>
          </div>

          {/* Key Features for Selected Plan */}
          {selectedPlanData && (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(selectedPlanData.features).map(([key, value], index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-gray-300"
                >
                  <span className="text-primary-400">✅</span>
                  <span>
                    {key === 'badge' ? 'Badge: ' : 
                     key === 'consultingHours' ? 'Consulting Hours: ' : 
                     key === 'sampleLibrary' ? 'Sample Library: ' : 
                     key === 'reports' ? 'Reports: ' : 
                     key === 'events' ? 'Events: ' : 
                     `${key}: `}
                    {String(value)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {trustIndicators.map((indicator, index) => (
            <motion.div
              key={indicator.text}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-2xl mb-2">{indicator.icon}</div>
              <p className="text-gray-300 text-sm">{indicator.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm mb-6">
            <div className="flex items-center gap-2">
              <span>⭐⭐⭐⭐⭐</span>
              <span>4.9/5 (2.847 avaliações)</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <span>👥</span>
              <span>15.234 membros ativos</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <span>🏆</span>
              <span>98% de satisfação</span>
            </div>
          </div>

          <p className="text-gray-500 text-xs max-w-2xl mx-auto">
            Ao se inscrever, você concorda com nossos{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 underline">
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a href="#" className="text-primary-400 hover:text-primary-300 underline">
              Política de Privacidade
            </a>
            . Você pode cancelar sua assinatura a qualquer momento sem multas.
          </p>
        </motion.div>

        {/* Background Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-yellow-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default MembershipCTA;