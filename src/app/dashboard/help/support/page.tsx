'use client';

import React, { useState } from 'react';
import { 
  UserCheck, 
  MessageCircle, 
  FileText, 
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function HelpSupportPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // This will be replaced with real data from user context/hooks
  const [tickets] = useState([
    {
      id: 1,
      subject: 'Problema com distribuição de música',
      status: 'open',
      priority: 'high',
      createdAt: '2024-04-15T10:30:00Z',
      updatedAt: '2024-04-15T14:22:00Z',
      category: 'Distribuição'
    },
    {
      id: 2,
      subject: 'Dúvida sobre relatórios de streaming',
      status: 'in-progress',
      priority: 'medium',
      createdAt: '2024-04-14T09:15:00Z',
      updatedAt: '2024-04-15T11:45:00Z',
      category: 'Relatórios'
    },
    {
      id: 3,
      subject: 'Erro ao fazer upload de arte',
      status: 'resolved',
      priority: 'medium',
      createdAt: '2024-04-12T16:45:00Z',
      updatedAt: '2024-04-13T10:30:00Z',
      category: 'Upload'
    },
    {
      id: 4,
      subject: 'Configuração de métodos de pagamento',
      status: 'open',
      priority: 'low',
      createdAt: '2024-04-10T11:20:00Z',
      updatedAt: '2024-04-10T11:20:00Z',
      category: 'Financeiro'
    }
  ]);

  const supportCategories = [
    { id: 'distribution', name: 'Distribuição', icon: <FileText className="h-5 w-5" /> },
    { id: 'reports', name: 'Relatórios', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'finance', name: 'Financeiro', icon: <DollarSign className="h-5 w-5" /> },
    { id: 'account', name: 'Conta', icon: <User className="h-5 w-5" /> },
    { id: 'technical', name: 'Técnico', icon: <Settings className="h-5 w-5" /> },
    { id: 'other', name: 'Outros', icon: <HelpCircle className="h-5 w-5" /> }
  ];

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto';
      case 'in-progress':
        return 'Em Andamento';
      case 'resolved':
        return 'Resolvido';
      case 'closed':
        return 'Fechado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'Baixa';
      case 'medium':
        return 'Média';
      case 'high':
        return 'Alta';
      default:
        return priority;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Solicitar Suporte</h1>
          <p className="text-muted-foreground">Abra um ticket para obter ajuda de nossa equipe</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tickets Abertos</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Em Andamento</p>
              <p className="text-2xl font-bold mt-1">1</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Resolvidos</p>
              <p className="text-2xl font-bold mt-1">1</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tempo Médio</p>
              <p className="text-2xl font-bold mt-1">2h 15m</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar tickets..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <select
            className="pl-10 pr-8 py-2 border border-border/50 rounded-md bg-background appearance-none"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Todos os Status</option>
            <option value="open">Aberto</option>
            <option value="in-progress">Em Andamento</option>
            <option value="resolved">Resolvido</option>
            <option value="closed">Fechado</option>
          </select>
        </div>
      </div>

      {/* Support Categories */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Categorias de Suporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportCategories.map((category) => (
            <div key={category.id} className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {category.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
              <p className="text-muted-foreground text-sm">
                Obtenha ajuda com questões relacionadas a {category.name.toLowerCase()}
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Abrir Ticket
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tickets */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Tickets Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Ticket</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Assunto</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Prioridade</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Última Atualização</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-mono text-sm">#{ticket.id.toString().padStart(5, '0')}</td>
                    <td className="p-4 font-medium max-w-xs">{ticket.subject}</td>
                    <td className="p-4">
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(ticket.updatedAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Nenhum ticket encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Support Hours */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Horário de Suporte</h3>
            <p className="text-muted-foreground">
              Nossa equipe de suporte está disponível para ajudar você:
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Segunda a Sexta</span>
                <span>9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sábado</span>
                <span>10h - 14h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domingo</span>
                <span>Fechado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Feriados</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat ao Vivo
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Agendar Atendimento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}