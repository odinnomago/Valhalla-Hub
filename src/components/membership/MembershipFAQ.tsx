'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { membershipPlans, formatPrice } from '@/lib/membership';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'plans' | 'payment' | 'features' | 'support';
  tier?: string;
  popular?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const MembershipFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'plans' | 'payment' | 'features' | 'support'>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories: FAQCategory[] = [
    { id: 'all', name: 'Todas', icon: '📋', color: 'bg-gray-700' },
    { id: 'general', name: 'Geral', icon: '❓', color: 'bg-blue-500' },
    { id: 'plans', name: 'Planos', icon: '💳', color: 'bg-green-500' },
    { id: 'payment', name: 'Pagamento', icon: '💰', color: 'bg-yellow-500' },
    { id: 'features', name: 'Recursos', icon: '⚡', color: 'bg-purple-500' },
    { id: 'support', name: 'Suporte', icon: '🎧', color: 'bg-red-500' }
  ];

  const faqs: FAQ[] = [
    // General
    {
      id: '1',
      question: 'O que é o Portal de Membros Valhalla Hub?',
      answer: 'O Portal de Membros é um ecossistema completo que integra 9 plataformas diferentes: Gravadora Digital, Academy, Agência de Bookings, Marketing IA, Marketplace, Blog, Produção de Eventos, Venda de Ingressos e Comunidade. Cada plano oferece diferentes níveis de acesso a essas plataformas.',
      category: 'general',
      popular: true
    },
    {
      id: '2',
      question: 'Quais são os benefícios de ser membro?',
      answer: 'Os membros têm acesso exclusivo a conteúdo premium, cursos da Academy, oportunidades de networking, descontos no Marketplace, prioridade em eventos, consultoria especializada e muito mais. Os benefícios aumentam conforme o plano escolhido.',
      category: 'general',
      popular: true
    },
    {
      id: '3',
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento sem multas ou taxas de cancelamento. Você continuará tendo acesso aos benefícios até o final do período já pago.',
      category: 'general',
      popular: true
    },

    // Plans
    {
      id: '4',
      question: 'Qual a diferença entre os planos?',
      answer: `Os planos oferecem diferentes níveis de acesso:\n\n• FREE: Acesso básico ao blog e 1 curso por mês\n• BASIC (${formatPrice(19.90)}/mês): 3 cursos, conteúdo exclusivo, 10% desconto\n• PRO (${formatPrice(49.90)}/mês): Acesso ilimitado, consultoria, 20% desconto\n• ELITE (${formatPrice(99.90)}/mês): Todos recursos + mentoria individual\n• BUSINESS (${formatPrice(299.90)}/mês): Soluções corporativas para equipes`,
      category: 'plans',
      popular: true
    },
    {
      id: '5',
      question: 'Posso fazer upgrade do meu plano?',
      answer: 'Sim! Você pode fazer upgrade a qualquer momento. A diferença de valor será calculada proporcionalmente e cobrada na próxima fatura. O acesso aos novos benefícios é imediato.',
      category: 'plans'
    },
    {
      id: '6',
      question: 'Existe desconto para planos anuais?',
      answer: 'Sim! Todos os planos anuais têm 16% de desconto. Por exemplo, o plano PRO anual custa R$ 499 (ao invés de R$ 598,80 se pago mensalmente).',
      category: 'plans'
    },
    {
      id: '7',
      question: 'O plano FREE tem limitações?',
      answer: 'O plano FREE oferece acesso básico ao blog, 1 curso gratuito por mês na Academy, participação em eventos gratuitos e acesso à comunidade pública. É uma excelente forma de conhecer o ecossistema antes de fazer upgrade.',
      category: 'plans'
    },

    // Payment
    {
      id: '8',
      question: 'Quais formas de pagamento são aceitas?',
      answer: 'Aceitamos cartões de crédito (Visa, Mastercard, Elo), cartões de débito, PIX, boleto bancário e PayPal. Para planos anuais, também aceitamos transferência bancária.',
      category: 'payment',
      popular: true
    },
    {
      id: '9',
      question: 'É seguro fornecer meus dados de pagamento?',
      answer: 'Absolutamente! Utilizamos criptografia SSL de 256 bits e nossa integração de pagamento é certificada PCI DSS. Seus dados são processados pelos maiores processadores de pagamento do mundo (Stripe e Mercado Pago).',
      category: 'payment'
    },
    {
      id: '10',
      question: 'Posso pedir reembolso?',
      answer: 'Oferecemos garantia de 7 dias para todos os planos pagos. Se não ficar satisfeito, pode solicitar reembolso total dentro deste período. Após 7 dias, não oferecemos reembolsos, mas você pode cancelar a qualquer momento.',
      category: 'payment'
    },

    // Features
    {
      id: '11',
      question: 'Como funciona o acesso às 9 plataformas?',
      answer: 'Cada plano oferece diferentes níveis de acesso às plataformas. Por exemplo, no plano PRO você tem acesso ilimitado à Academy, prioridade na Agência de Bookings, 20% desconto no Marketplace, e acesso a conteúdo premium do Blog.',
      category: 'features',
      popular: true
    },
    {
      id: '12',
      question: 'O que está incluído na Academy?',
      answer: 'A Academy oferece mais de 200 cursos sobre produção musical, marketing, gestão de carreira, teoria musical e muito mais. Membros PRO+ têm acesso ilimitado, enquanto outros planos têm cotas mensais.',
      category: 'features'
    },
    {
      id: '13',
      question: 'Como funciona a comunidade exclusiva?',
      answer: 'Cada plano de acesso a comunidades específicas no Discord. Membros BASIC+ participam de grupos fechados, membros PRO+ têm acesso a mentoria coletiva, e membros ELITE+ participam do "Inner Circle" com networking exclusivo.',
      category: 'features'
    },
    {
      id: '14',
      question: 'Posso usar os benefícios offline?',
      answer: 'Sim! Membros PRO+ podem baixar cursos da Academy para acesso offline, recebem materiais em PDF, e têm acesso a biblioteca de samples que pode ser baixada.',
      category: 'features'
    },

    // Support
    {
      id: '15',
      question: 'Como posso entrar em contato com o suporte?',
      answer: 'Oferecemos suporte via chat online (24/7), email (resposta em até 24h), e telefone durante horário comercial. Membros ELITE+ têm linha direta prioritária.',
      category: 'support',
      popular: true
    },
    {
      id: '16',
      question: 'Existe suporte técnico para as plataformas?',
      answer: 'Sim! Nossa equipe técnica oferece suporte para todas as 9 plataformas integradas. Membros PRO+ têm acesso a tutoriais exclusivos e suporte prioritário.',
      category: 'support'
    },
    {
      id: '17',
      question: 'Como funciona a consultoria especializada?',
      answer: 'Membros PRO recebem 1 hora de consultoria mensal, membros ELITE recebem 3 horas, e membros BUSINESS têm gerente de conta dedicado. As consultorias cobrem estratégia musical, marketing, e desenvolvimento de carreira.',
      category: 'support'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularFAQs = faqs.filter(faq => faq.popular);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full mb-6">
            <span className="text-blue-400">❓</span>
            <span className="text-blue-300 text-sm font-medium">Dúvidas Frequentes</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tire suas{' '}
            <span className="text-primary-400">dúvidas</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Encontre respostas para as perguntas mais comuns sobre nossos planos de membership
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar perguntas... (Ex: preço, cancelar, suporte)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900/50 border border-gray-700 rounded-2xl px-6 py-4 pl-12 text-white placeholder-gray-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id as any);
                setExpandedFAQ(null);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                activeCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </motion.div>

        {/* Popular Questions (when no search) */}
        {!searchQuery && activeCategory === 'all' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              🔥 Perguntas Mais Populares
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.slice(0, 4).map((faq, index) => (
                <motion.button
                  key={faq.id}
                  onClick={() => toggleFAQ(faq.id)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-left bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-xl p-4 hover:border-primary-500/40 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{faq.question}</span>
                    <span className="text-primary-400 ml-2">
                      {expandedFAQ === faq.id ? '−' : '+'}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma pergunta encontrada</h3>
              <p className="text-gray-400">
                Tente buscar com outros termos ou{' '}
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="text-primary-400 hover:text-primary-300 underline"
                >
                  ver todas as perguntas
                </button>
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 transition-all"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                      {faq.popular && (
                        <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-1 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 capitalize">{faq.category}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      expandedFAQ === faq.id ? 'bg-primary-500 rotate-180' : 'bg-gray-700'
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </button>

                <AnimatePresence>
                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-800">
                        <div className="pt-6">
                          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          
                          {/* Helpful Actions */}
                          <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-800">
                            <span className="text-sm text-gray-500">Esta resposta foi útil?</span>
                            <button className="text-green-400 hover:text-green-300 transition-colors">
                              👍 Sim
                            </button>
                            <button className="text-red-400 hover:text-red-300 transition-colors">
                              👎 Não
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Não encontrou sua resposta?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida específica 
              sobre os planos ou recursos do Valhalla Hub.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-primary-400 transition-colors">
                💬 Chat Online
              </button>
              <button className="border border-gray-600 text-white px-6 py-3 rounded-xl font-bold hover:border-primary-500 hover:bg-primary-500/10 transition-all">
                📧 Enviar Email
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Respondemos em até 24 horas • Suporte em português
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MembershipFAQ;