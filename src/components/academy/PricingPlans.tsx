'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Feature {
  name: string;
  included: boolean;
  description?: string;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  originalPrice?: {
    monthly: number;
    yearly: number;
  };
  features: Feature[];
  badge?: string;
  popular?: boolean;
  cta: string;
}

const PricingPlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratuito',
      description: 'Ideal para começar e experimentar a plataforma',
      price: {
        monthly: 0,
        yearly: 0
      },
      features: [
        { name: 'Acesso a 3 cursos básicos', included: true },
        { name: 'Comunidade de alunos', included: true },
        { name: 'Certificados básicos', included: true },
        { name: 'Suporte por email', included: true },
        { name: 'Downloads offline', included: false },
        { name: 'Cursos premium', included: false },
        { name: 'MasterClasses', included: false },
        { name: 'Mentorias 1:1', included: false },
        { name: 'Projetos avançados', included: false }
      ],
      cta: 'Começar Grátis'
    },
    {
      id: 'basic',
      name: 'Básico',
      description: 'Para quem quer aprender de forma consistente',
      price: {
        monthly: 39.90,
        yearly: 29.90
      },
      originalPrice: {
        monthly: 49.90,
        yearly: 39.90
      },
      features: [
        { name: 'Todos os cursos básicos e intermediários', included: true },
        { name: 'Downloads para estudo offline', included: true },
        { name: 'Comunidade exclusiva', included: true },
        { name: 'Certificados reconhecidos', included: true },
        { name: 'Suporte prioritário', included: true },
        { name: 'Cursos premium', included: false },
        { name: 'MasterClasses', included: false },
        { name: 'Mentorias 1:1', included: false },
        { name: 'Projetos com feedback', included: false }
      ],
      cta: 'Escolher Básico'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'A escolha completa para profissionais sérios',
      price: {
        monthly: 79.90,
        yearly: 59.90
      },
      originalPrice: {
        monthly: 99.90,
        yearly: 79.90
      },
      features: [
        { name: 'Acesso completo a todos os cursos', included: true },
        { name: 'Todas as MasterClasses', included: true },
        { name: 'Downloads ilimitados', included: true },
        { name: 'Projetos com feedback personalizado', included: true },
        { name: 'Comunidade VIP', included: true },
        { name: 'Certificados premium', included: true },
        { name: 'Suporte 24/7', included: true },
        { name: 'Mentorias 1:1', included: false },
        { name: 'Networking exclusivo', included: true }
      ],
      badge: 'Mais Popular',
      popular: true,
      cta: 'Começar Premium'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Para artistas que querem acelerar sua carreira',
      price: {
        monthly: 149.90,
        yearly: 119.90
      },
      originalPrice: {
        monthly: 199.90,
        yearly: 159.90
      },
      features: [
        { name: 'Tudo do Premium incluído', included: true },
        { name: '2 mentorias 1:1 por mês', included: true },
        { name: 'Acesso a eventos exclusivos', included: true },
        { name: 'Networking com artistas profissionais', included: true },
        { name: 'Oportunidades na Valhalla Hub', included: true },
        { name: 'Curso personalizado', included: true },
        { name: 'Early access a novos cursos', included: true },
        { name: 'Review de portfólio', included: true },
        { name: 'Conexão com gravadoras', included: true }
      ],
      badge: 'Para Profissionais',
      cta: 'Virar Pro'
    }
  ];

  const getPrice = (plan: Plan) => {
    return billingCycle === 'yearly' ? plan.price.yearly : plan.price.monthly;
  };

  const getOriginalPrice = (plan: Plan) => {
    if (!plan.originalPrice) return null;
    return billingCycle === 'yearly' ? plan.originalPrice.yearly : plan.originalPrice.monthly;
  };

  const getYearlySavings = (plan: Plan) => {
    if (plan.price.monthly === 0) return 0;
    const monthlyTotal = plan.price.monthly * 12;
    const yearlyTotal = plan.price.yearly * 12;
    return Math.round(((monthlyTotal - yearlyTotal) / monthlyTotal) * 100);
  };

  const PlanCard: React.FC<{ plan: Plan; index: number }> = ({ plan, index }) => {
    const price = getPrice(plan);
    const originalPrice = getOriginalPrice(plan);
    const savings = getYearlySavings(plan);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`relative bg-card rounded-2xl p-8 h-full flex flex-col border border-border ${
          plan.popular ? 'ring-2 ring-primary scale-105' : ''
        } hover:transform hover:scale-105 transition-all duration-300`}
      >
        {plan.badge && (
          <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full text-sm font-bold text-primary-foreground bg-gradient-to-r ${
            plan.popular ? 'from-primary to-accent' : 'from-accent to-primary'
          }`}>
            {plan.badge}
          </div>
        )}

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
          <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

          <div className="space-y-2">
            {originalPrice && originalPrice > 0 && (
              <p className="text-muted-foreground line-through text-lg">
                R$ {originalPrice.toFixed(2)}/{billingCycle === 'yearly' ? 'mês' : 'mês'}
              </p>
            )}
            
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-4xl font-bold text-foreground">
                {price === 0 ? 'Grátis' : `R$ ${price.toFixed(2)}`}
              </span>
              {price > 0 && (
                <span className="text-muted-foreground">
                  /{billingCycle === 'yearly' ? 'mês' : 'mês'}
                </span>
              )}
            </div>

            {billingCycle === 'yearly' && savings > 0 && (
              <p className="text-primary text-sm font-medium">
                Economize {savings}% no plano anual
              </p>
            )}

            {billingCycle === 'yearly' && price > 0 && (
              <p className="text-muted-foreground text-xs">
                Cobrado R$ {(price * 12).toFixed(2)} anualmente
              </p>
            )}
          </div>
        </div>

        <div className="flex-1 space-y-4 mb-8">
          {plan.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className={`mt-1 ${feature.included ? 'text-primary' : 'text-muted-foreground'}`}>
                {feature.included ? '✓' : '✗'}
              </span>
              <div className="flex-1">
                <span className={`${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {feature.name}
                </span>
                {feature.description && (
                  <p className="text-muted-foreground text-xs mt-1">{feature.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setSelectedPlan(plan.id)}
          className={`w-full py-4 rounded-xl font-bold transition-all ${
            plan.id === 'free'
              ? 'bg-muted text-muted-foreground hover:bg-muted/80'
              : plan.popular
              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
              : 'bg-muted text-foreground hover:bg-muted/80 border-2 border-border hover:border-border/80'
          }`}
        >
          {plan.cta}
        </button>
      </motion.div>
    );
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Escolha o Melhor <span className="text-primary">Plano</span> Para Você
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Investimento flexível que se adapta aos seus objetivos e orçamento. 
            Comece grátis e evolua conforme sua jornada musical.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-card rounded-full p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-muted text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                -25%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Features Comparison Table (Desktop) */}
        <div className="hidden lg:block mt-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Compare Todos os Recursos
          </h3>
          
          <div className="bg-card rounded-2xl overflow-hidden border border-border">
            <div className="grid grid-cols-5 gap-4 p-6 border-b border-border">
              <div className="font-bold text-foreground">Recursos</div>
              {plans.map(plan => (
                <div key={plan.id} className="text-center">
                  <div className="font-bold text-foreground">{plan.name}</div>
                  <div className="text-primary text-sm">
                    {plan.price[billingCycle] === 0 
                      ? 'Grátis' 
                      : `R$ ${plan.price[billingCycle]}/mês`
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* All unique features */}
            {[
              'Acesso a cursos básicos',
              'Downloads offline',
              'Comunidade de alunos',
              'Certificados',
              'Cursos intermediários',
              'Cursos premium e avançados',
              'MasterClasses exclusivas',
              'Projetos com feedback',
              'Mentorias 1:1',
              'Networking profissional',
              'Oportunidades Valhalla Hub',
              'Eventos exclusivos'
            ].map((featureName, idx) => (
              <div key={idx} className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-b-0">
                <div className="text-muted-foreground">{featureName}</div>
                {plans.map(plan => {
                  const feature = plan.features.find(f => 
                    f.name.toLowerCase().includes(featureName.toLowerCase()) ||
                    featureName.toLowerCase().includes(f.name.toLowerCase().split(' ')[0])
                  );
                  return (
                    <div key={plan.id} className="text-center">
                      <span className={feature?.included ? 'text-green-400' : 'text-muted-foreground'}>
                        {feature?.included ? '✓' : '✗'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8">Perguntas Frequentes</h3>
          
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="space-y-6">
              <div>
                <h4 className="text-foreground font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
                <p className="text-muted-foreground text-sm">
                  Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais. 
                  Continuará tendo acesso até o final do período pago.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold mb-2">Os certificados são reconhecidos?</h4>
                <p className="text-muted-foreground text-sm">
                  Nossos certificados são reconhecidos por estúdios, gravadoras e empresas do setor musical. 
                  Muitos alunos conseguiram oportunidades profissionais através deles.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-foreground font-semibold mb-2">Posso fazer upgrade do meu plano?</h4>
                <p className="text-muted-foreground text-sm">
                  Claro! Você pode fazer upgrade a qualquer momento e pagar apenas a diferença proporcional. 
                  O acesso aos novos recursos é imediato.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold mb-2">Há desconto para estudantes?</h4>
                <p className="text-muted-foreground text-sm">
                  Sim! Oferecemos 50% de desconto para estudantes com comprovação. 
                  Entre em contato conosco para mais informações.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center border border-border"
        >
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Garantia de 30 Dias</h3>
          <p className="text-muted-foreground">
            Não ficou satisfeito? Devolvemos 100% do seu dinheiro em até 30 dias. 
            Sem perguntas, sem complicações.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingPlans;