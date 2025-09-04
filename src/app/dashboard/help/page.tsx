'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  Play, 
  FileText, 
  User, 
  MessageCircle, 
  Monitor,
  Search,
  BookOpen,
  Video,
  FileQuestion,
  Shield,
  Smartphone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todos', icon: HelpCircle },
    { id: 'getting-started', label: 'Primeiros Passos', icon: Play },
    { id: 'account', label: 'Conta e Perfil', icon: User },
    { id: 'payments', label: 'Pagamentos e Assinaturas', icon: FileText },
    { id: 'platforms', label: 'Uso das Plataformas', icon: Smartphone },
    { id: 'technical', label: 'Problemas Técnicos', icon: Monitor },
    { id: 'security', label: 'Segurança e Privacidade', icon: Shield },
  ];

  const tutorials = [
    { id: 1, title: 'Configurando seu perfil', duration: '5:20', category: 'getting-started' },
    { id: 2, title: 'Enviando música para a Gravadora', duration: '8:45', category: 'platforms' },
    { id: 3, title: 'Vendendo no Marketplace', duration: '6:30', category: 'platforms' },
    { id: 4, title: 'Configurando eventos', duration: '12:15', category: 'platforms' },
    { id: 5, title: 'Gerenciando assinaturas', duration: '4:10', category: 'payments' },
    { id: 6, title: 'Conectando redes sociais', duration: '3:55', category: 'account' },
  ];

  const faqItems = [
    {
      id: 1,
      question: 'Como faço para enviar minha música para a Gravadora Digital?',
      answer: 'Para enviar sua música, acesse a seção "Gravadora Digital" no menu lateral, clique em "Enviar Nova Música" e siga as instruções para upload e preenchimento dos metadados.',
      category: 'platforms'
    },
    {
      id: 2,
      question: 'Quanto tempo leva para meu álbum ser aprovado?',
      answer: 'O processo de aprovação geralmente leva de 3 a 5 dias úteis. Você receberá uma notificação assim que seu álbum for aprovado ou se houver necessidade de correções.',
      category: 'platforms'
    },
    {
      id: 3,
      question: 'Como funciona o pagamento das vendas no Marketplace?',
      answer: 'Os pagamentos são processados mensalmente através da plataforma Stripe. O valor líquido será depositado diretamente na sua conta bancária cadastrada.',
      category: 'payments'
    },
    {
      id: 4,
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento através da seção "Portal de Membros". O cancelamento é imediato, mas você continuará com acesso até o final do período pago.',
      category: 'payments'
    },
    {
      id: 5,
      question: 'Quais formatos de arquivo são aceitos para upload de músicas?',
      answer: 'Aceitamos arquivos WAV, AIFF e FLAC com qualidade de 24-bit/48kHz ou superior. Para a arte da capa, aceitamos JPG ou PNG com resolução mínima de 3000x3000 pixels.',
      category: 'technical'
    },
  ];

  const documentation = [
    { id: 1, title: 'Guia do Usuário', type: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'API Documentation', type: 'HTML', size: '1.8 MB' },
    { id: 3, title: 'Integrações de Terceiros', type: 'PDF', size: '1.2 MB' },
  ];

  const filteredTutorials = tutorials.filter(tutorial => 
    (activeCategory === 'all' || tutorial.category === activeCategory) &&
    tutorial.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaq = faqItems.filter(faq => 
    (activeCategory === 'all' || faq.category === activeCategory) &&
    (faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Central de Ajuda</h1>
        <p className="text-muted-foreground">Encontre respostas e recursos para ajudá-lo</p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Como podemos ajudar? Pesquise por palavras-chave..."
          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
          >
            <category.icon className="h-4 w-4 mr-2" />
            {category.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Tutorials and FAQ */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Tutorials */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tutoriais em Vídeo</h2>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTutorials.map((tutorial) => (
                <div key={tutorial.id} className="border border-border/50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-muted h-32 flex items-center justify-center">
                    <div className="bg-primary/10 rounded-full p-4">
                      <Play className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{tutorial.title}</h3>
                    <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                      <Video className="h-4 w-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Perguntas Frequentes</h2>
            
            <div className="space-y-4">
              {filteredFaq.map((faq) => (
                <div key={faq.id} className="border border-border/50 rounded-lg p-4">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="text-muted-foreground mt-2">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            {filteredFaq.length === 0 && (
              <div className="text-center py-8">
                <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhuma pergunta encontrada para sua pesquisa</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Resources and Support */}
        <div className="space-y-6">
          {/* Documentation */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Documentação</h2>
            
            <div className="space-y-3">
              {documentation.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Baixar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Support */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Contato Direto</h2>
            
            <div className="space-y-4">
              <Button className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat ao Vivo
              </Button>
              
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Abrir Chamado
              </Button>
              
              <Button variant="outline" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Enviar Email
              </Button>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-card border border-border/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Status do Sistema</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Operacional</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">API</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Operacional</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Streaming</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Operacional</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pagamentos</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-muted-foreground">Operacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper components for icons not imported
const Mail = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;