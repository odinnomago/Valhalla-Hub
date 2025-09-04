'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown,
  Mail,
  MessageCircle,
  BookOpen,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HelpFAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqCategories = [
    {
      id: 1,
      title: 'Primeiros Passos',
      icon: <Play className="h-5 w-5" />,
      questions: [
        {
          id: 1,
          question: 'Como faço para criar minha primeira conta?',
          answer: 'Para criar sua conta, clique no botão "Cadastre-se" no canto superior direito da página inicial. Preencha seus dados pessoais e verifique seu e-mail para ativar a conta.'
        },
        {
          id: 2,
          question: 'Quais são os planos disponíveis?',
          answer: 'Oferecemos três planos: Básico (gratuito), Profissional (R$ 49,90/mês) e Empresarial (R$ 99,90/mês). Cada plano oferece diferentes funcionalidades e limites de uso.'
        },
        {
          id: 3,
          question: 'Como faço para atualizar meu plano?',
          answer: 'Você pode atualizar seu plano a qualquer momento acessando "Configurações" > "Assinatura" e selecionando o plano desejado.'
        }
      ]
    },
    {
      id: 2,
      title: 'Plataformas',
      icon: <BookOpen className="h-5 w-5" />,
      questions: [
        {
          id: 4,
          question: 'Como faço para enviar uma música para as plataformas?',
          answer: 'Acesse "Minhas Plataformas" > "Gravadora Digital" > "Enviar Nova Música". Preencha os metadados da música e faça o upload dos arquivos necessários.'
        },
        {
          id: 5,
          question: 'Quanto tempo leva para minha música ser distribuída?',
          answer: 'O processo de distribuição geralmente leva de 3 a 5 dias úteis após a aprovação. O tempo pode variar dependendo da plataforma.'
        },
        {
          id: 6,
          question: 'Como acompanho as estatísticas das minhas músicas?',
          answer: 'Acesse "Minhas Plataformas" > "Gravadora Digital" > "Relatórios de Streaming" para ver estatísticas detalhadas de cada plataforma.'
        }
      ]
    },
    {
      id: 3,
      title: 'Pagamentos',
      icon: <HelpCircle className="h-5 w-5" />,
      questions: [
        {
          id: 7,
          question: 'Como recebo os pagamentos das minhas músicas?',
          answer: 'Os pagamentos são feitos mensalmente através dos métodos configurados na seção "Financeiro". O valor recebido é baseado nas royalties geradas pelas suas músicas.'
        },
        {
          id: 8,
          question: 'Quais são as taxas da plataforma?',
          answer: 'Cobramos uma taxa de 15% sobre os royalties recebidos. Esta taxa é descontada antes da distribuição para as plataformas.'
        },
        {
          id: 9,
          question: 'Como configuro meus métodos de pagamento?',
          answer: 'Acesse "Financeiro" > "Métodos de Pagamento" para adicionar e configurar suas formas de recebimento.'
        }
      ]
    }
  ];

  const toggleQuestion = (id: number) => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Perguntas Frequentes</h1>
        <p className="text-muted-foreground">Encontre respostas para as dúvidas mais comuns</p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por perguntas ou tópicos..."
          className="pl-10 py-6"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* FAQ Categories */}
      <div className="space-y-6">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id} className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="p-5 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {category.icon}
                  </div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                </div>
              </div>
              <div className="divide-y divide-border/50">
                {category.questions.map((question) => (
                  <div key={question.id} className="p-5">
                    <button
                      className="flex items-center justify-between w-full text-left"
                      onClick={() => toggleQuestion(question.id)}
                    >
                      <h3 className="font-medium text-lg">{question.question}</h3>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform ${
                          openQuestion === question.id ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    {openQuestion === question.id && (
                      <div className="mt-4 text-muted-foreground">
                        <p>{question.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma pergunta encontrada</h3>
            <p className="text-muted-foreground mb-4">
              Não encontramos perguntas que correspondam à sua busca
            </p>
            <Button onClick={() => setSearchQuery('')}>Limpar Busca</Button>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Ainda precisa de ajuda?</h3>
            <p className="text-muted-foreground">
              Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida específica.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Enviar E-mail
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat ao Vivo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}