'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'contract' | 'financial' | 'technical';
}

const LabelFAQ: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'Quais gêneros musicais vocês trabalham?',
      answer: 'Trabalhamos com todos os gêneros musicais. Nossa equipe é diversificada e tem experiência em pop, rock, hip-hop, eletrônica, MPB, indie, R&B, reggae e muito mais. O que importa para nós é a qualidade musical, originalidade e potencial comercial, independentemente do gênero.',
      category: 'general'
    },
    {
      id: '2',
      question: 'Como funciona o pagamento dos royalties?',
      answer: 'Os royalties são pagos mensalmente com relatórios detalhados e transparentes. Você tem acesso a um painel em tempo real para acompanhar seus ganhos, streams, downloads e performance em todas as plataformas. Os pagamentos são feitos via PIX, transferência bancária ou PayPal, conforme sua preferência.',
      category: 'financial'
    },
    {
      id: '3',
      question: 'Quais custos estão envolvidos?',
      answer: 'Nossa estrutura é flexível e focada no sucesso mútuo. Trabalhamos com modelo de parceria onde investimos no seu desenvolvimento e compartilhamos os resultados. Não cobramos taxas iniciais ou custos de entrada. Os detalhes financeiros são discutidos durante o processo de avaliação e são sempre transparentes.',
      category: 'financial'
    },
    {
      id: '4',
      question: 'Posso manter meus direitos autorais?',
      answer: 'Sim, você mantém 100% dos direitos autorais das suas composições. Nossa parceria é focada em distribuição, promoção e desenvolvimento de carreira. Trabalhamos como uma extensão da sua equipe, não como proprietários do seu trabalho criativo.',
      category: 'contract'
    },
    {
      id: '5',
      question: 'Quanto tempo demora o processo de avaliação?',
      answer: 'O processo de avaliação leva entre 7 a 14 dias úteis. Nossa equipe analisa cuidadosamente cada submission, avaliando qualidade musical, potencial comercial, originalidade e alinhamento com nossa visão. Enviamos feedback detalhado independentemente da decisão final.',
      category: 'general'
    },
    {
      id: '6',
      question: 'Em quantas plataformas minha música será distribuída?',
      answer: 'Distribuímos em mais de 150 plataformas globais, incluindo Spotify, Apple Music, YouTube Music, Amazon Music, Deezer, TikTok, Instagram, Beatport, Bandcamp e muitas outras. Também incluímos lojas regionais específicas para maximizar seu alcance.',
      category: 'technical'
    },
    {
      id: '7',
      question: 'Vocês oferecem suporte para marketing e promoção?',
      answer: 'Sim, oferecemos suporte completo de marketing e promoção. Isso inclui estratégias de redes sociais, campanhas de advertising, parcerias com influenciadores, playlist pitching, assessoria de imprensa e desenvolvimento de campanhas personalizadas baseadas no seu perfil artístico.',
      category: 'general'
    },
    {
      id: '8',
      question: 'Qual é a duração dos contratos?',
      answer: 'Oferecemos contratos flexíveis que variam de 1 a 3 anos, dependendo do tipo de parceria e dos objetivos do artista. Todos os contratos incluem cláusulas de renovação e podem ser renegociados conforme o crescimento da carreira. Sempre priorizamos termos justos e transparentes.',
      category: 'contract'
    },
    {
      id: '9',
      question: 'Preciso ter equipamento profissional de gravação?',
      answer: 'Não é obrigatório. Temos uma rede de estúdios parceiros e oferecemos acesso a equipamentos profissionais quando necessário. O importante é que sua demo tenha qualidade suficiente para demonstrar seu potencial artístico. Podemos ajudar com a produção após a aprovação.',
      category: 'technical'
    },
    {
      id: '10',
      question: 'Vocês trabalham com artistas de outros países?',
      answer: 'Sim, trabalhamos com artistas de todo o mundo. Nossa plataforma suporta distribuição global e temos experiência com diferentes mercados internacionais. Oferecemos suporte em português, inglês e espanhol, e adaptamos nossas estratégias para mercados específicos.',
      category: 'general'
    }
  ];

  const categories = [
    { id: 'all', label: 'Todas', count: faqItems.length },
    { id: 'general', label: 'Geral', count: faqItems.filter(item => item.category === 'general').length },
    { id: 'contract', label: 'Contratos', count: faqItems.filter(item => item.category === 'contract').length },
    { id: 'financial', label: 'Financeiro', count: faqItems.filter(item => item.category === 'financial').length },
    { id: 'technical', label: 'Técnico', count: faqItems.filter(item => item.category === 'technical').length }
  ];

  const filteredItems = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-headline">
            Perguntas{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre nossos serviços
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-6"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-foreground hover:bg-card border border-border hover:border-primary/50'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-card/30 border border-border rounded-lg overflow-hidden hover:bg-card/50 transition-all"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-card/20 transition-all"
              >
                <h3 className="text-base font-semibold text-foreground pr-4">
                  {item.question}
                </h3>
                <motion.div
                  animate={{ rotate: activeItem === item.id ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-primary text-lg font-bold">+</span>
                </motion.div>
              </button>

              <AnimatePresence>
                {activeItem === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4">
                      <div className="border-t border-border/50 pt-3">
                        <p className="text-sm text-foreground/80 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  );
};

export default LabelFAQ;