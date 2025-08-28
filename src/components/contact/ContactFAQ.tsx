'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

const ContactFAQ: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpful, setHelpful] = useState<{ [key: string]: boolean }>({});
  const searchInputRef = useRef<HTMLInputElement>(null);

  const categories: FAQCategory[] = [
    {
      id: 'all',
      name: 'Todas',
      icon: '🔍',
      description: 'Ver todas as perguntas',
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'artistas',
      name: 'Para Artistas',
      icon: '🎤',
      description: 'Demos, contratos, carreiras',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'fas',
      name: 'Para Fãs',
      icon: '❤️',
      description: 'Memberships, eventos, produtos',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'parcerias',
      name: 'Parcerias',
      icon: '🤝',
      description: 'Colaborações e negócios',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'suporte',
      name: 'Suporte Técnico',
      icon: '⚙️',
      description: 'Problemas técnicos e bugs',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const faqItems: FAQItem[] = [
    // Para Artistas
    {
      id: 'demo-submission',
      question: 'Como faço para enviar minha demo?',
      answer: 'Envie seu material para artistas@valhallahub.com.br com seu portfólio completo, incluindo 3-5 músicas no formato MP3 ou WAV, biografia artística, fotos promocionais e links para suas redes sociais. Nossa equipe A&R avalia todos os materiais recebidos e retorna em até 15 dias úteis.',
      category: 'artistas',
      tags: ['demo', 'música', 'artista', 'envio']
    },
    {
      id: 'artist-requirements',
      question: 'Quais são os requisitos para ser um artista Valhalla?',
      answer: 'Buscamos talentos com perfil inovador, alinhados aos nossos valores de autenticidade e qualidade musical. Valorizamos artistas com propostas originais, independente do gênero musical, que demonstrem profissionalismo, dedicação e potencial de crescimento no mercado.',
      category: 'artistas',
      tags: ['requisitos', 'artista', 'perfil', 'contrato']
    },
    {
      id: 'contract-terms',
      question: 'Como funcionam os contratos artisticos?',
      answer: 'Nossos contratos são flexíveis e adaptados ao perfil de cada artista. Oferecemos diferentes modalidades: desde parcerias de distribuição até contratos 360° completos. Sempre priorizamos transparência e termos justos que beneficiem tanto o artista quanto a gravadora.',
      category: 'artistas',
      tags: ['contrato', '360', 'distribuição', 'termos']
    },

    // Para Fãs
    {
      id: 'membership-benefits',
      question: 'Como me tornar um membro e quais os benefícios?',
      answer: 'Cadastre-se gratuitamente em nosso site e escolha um plano premium para acessar benefícios exclusivos como: acesso antecipado a lançamentos, descontos em produtos oficiais, meet & greets virtuais, conteúdo exclusivo dos artistas e prioridade na compra de ingressos.',
      category: 'fas',
      tags: ['membership', 'benefícios', 'planos', 'exclusivo']
    },
    {
      id: 'event-tickets',
      question: 'Como comprar ingressos para eventos?',
      answer: 'Os ingressos são vendidos através de nossa plataforma oficial e parceiros autorizados. Membros premium têm acesso a pré-vendas exclusivas. Siga nossos artistas nas redes sociais e ative as notificações para não perder nenhum anúncio.',
      category: 'fas',
      tags: ['ingressos', 'eventos', 'shows', 'pré-venda']
    },
    {
      id: 'merchandise',
      question: 'Onde posso comprar produtos oficiais?',
      answer: 'Nossa loja oficial está disponível em valhallahub.com.br/loja. Oferecemos produtos exclusivos de nossos artistas, com entrega para todo o Brasil. Membros premium recebem desconto de 15% em todas as compras.',
      category: 'fas',
      tags: ['loja', 'produtos', 'merchandise', 'oficial']
    },

    // Parcerias
    {
      id: 'partnership-types',
      question: 'Que tipos de parcerias vocês fazem?',
      answer: 'Fazemos parcerias estratégicas com marcas, empresas, outras gravadoras, festivais, casas de show e plataformas digitais. Buscamos colaborações que agreguem valor aos nossos artistas e fortaleçam o ecossistema musical brasileiro.',
      category: 'parcerias',
      tags: ['parcerias', 'marcas', 'colaboração', 'negócios']
    },
    {
      id: 'partnership-process',
      question: 'Como propor uma parceria?',
      answer: 'Envie sua proposta detalhada para parcerias@valhallahub.com.br incluindo: objetivos da parceria, benefícios mútuos, cronograma, investimento necessário e cases de sucesso anteriores. Nossa equipe de negócios avaliará e retornará em até 7 dias úteis.',
      category: 'parcerias',
      tags: ['proposta', 'processo', 'negociação', 'parceria']
    },

    // Suporte Técnico
    {
      id: 'streaming-problems',
      question: 'Estou com problemas para ouvir música na plataforma',
      answer: 'Primeiro, verifique sua conexão com a internet e tente atualizar a página. Se o problema persistir, limpe o cache do navegador ou tente usar outro navegador. Para problemas mais complexos, entre em contato com nosso suporte técnico.',
      category: 'suporte',
      tags: ['streaming', 'problemas', 'técnico', 'música']
    },
    {
      id: 'account-access',
      question: 'Não consigo acessar minha conta',
      answer: 'Use a opção "Esqueci minha senha" na página de login. Se não funcionar, verifique se está usando o email correto de cadastro. Caso continue com problemas, nossa equipe pode ajudar a recuperar sua conta através do chat ou email.',
      category: 'suporte',
      tags: ['conta', 'acesso', 'senha', 'login']
    }
  ];

  const filteredFAQs = faqItems.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleFAQToggle = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const handleHelpful = (faqId: string, isHelpful: boolean) => {
    setHelpful(prev => ({ ...prev, [faqId]: isHelpful }));
    // Here you would typically send this feedback to your analytics
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <section className="py-20 bg-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Encontre respostas{' '}
            <span className="text-primary-400">rápidas</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Resolva suas dúvidas imediatamente com nossa central de ajuda inteligente
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar ajuda... (⌘/)"
              className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r text-black shadow-lg shadow-primary-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              style={{
                background: activeCategory === category.id 
                  ? `linear-gradient(135deg, var(--tw-gradient-stops))` 
                  : undefined
              }}
            >
              <span className="text-lg">{category.icon}</span>
              <div className="text-left">
                <div className="text-sm font-semibold">{category.name}</div>
                <div className="text-xs opacity-75">{category.description}</div>
              </div>
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => handleFAQToggle(faq.id)}
                  className="w-full text-left p-6 hover:bg-gray-800/50 transition-all duration-200 flex items-center justify-between group"
                >
                  <h3 className="text-white font-semibold pr-4 group-hover:text-primary-400 transition-colors">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400 text-xl flex-shrink-0"
                  >
                    ⌄
                  </motion.div>
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
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-800 pt-4">
                          <p className="text-gray-300 leading-relaxed mb-4">
                            {faq.answer}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {faq.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>

                          {/* Helpful Feedback */}
                          <div className="flex items-center gap-4 pt-4 border-t border-gray-800">
                            <span className="text-sm text-gray-400">Esta resposta foi útil?</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleHelpful(faq.id, true)}
                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                  helpful[faq.id] === true
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                              >
                                👍 Sim
                              </button>
                              <button
                                onClick={() => handleHelpful(faq.id, false)}
                                className={`px-3 py-1 rounded-full text-sm transition-all ${
                                  helpful[faq.id] === false
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                              >
                                👎 Não
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-xl font-bold text-white mb-2">Nenhuma resposta encontrada</h3>
              <p className="text-gray-400 mb-6">
                Não encontramos nada para "{searchQuery}". Tente outros termos ou entre em contato conosco.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="bg-primary-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors"
              >
                Ver Todas as Perguntas
              </button>
            </motion.div>
          )}
        </div>

        {/* Still Need Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Ainda precisa de ajuda?
          </h3>
          <p className="text-gray-400 mb-6">
            Nossa equipe está pronta para resolver questões mais específicas
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-black px-6 py-3 rounded-lg font-medium hover:bg-primary-400 transition-colors">
              💬 Iniciar Chat
            </button>
            <a
              href="mailto:contato@valhallahub.com.br"
              className="bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              📧 Enviar Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactFAQ;