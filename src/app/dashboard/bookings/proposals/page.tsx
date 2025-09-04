'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Euro, 
  FileText, 
  Eye,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingProposalsPage() {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      eventName: 'Festival Verão',
      venue: 'Parque dos Artistas',
      location: 'São Paulo, SP',
      date: '2024-08-15',
      time: '20:00',
      fee: 5000,
      status: 'pending',
      promoter: 'Produções Verão Ltda',
      contact: 'maria.silva@verao.com',
      phone: '(11) 99999-9999'
    },
    {
      id: 2,
      eventName: 'Show Acústico',
      venue: 'Clube da Esquina',
      location: 'Rio de Janeiro, RJ',
      date: '2024-07-22',
      time: '21:00',
      fee: 2500,
      status: 'accepted',
      promoter: 'Clube da Esquina',
      contact: 'joao.santos@clube.com',
      phone: '(21) 98888-8888'
    },
    {
      id: 3,
      eventName: 'Festa Universitária',
      venue: 'Universidade Federal',
      location: 'Belo Horizonte, MG',
      date: '2024-09-05',
      time: '22:00',
      fee: 3500,
      status: 'rejected',
      promoter: 'Associação Estudantil',
      contact: 'carlos.mendes@universidade.com',
      phone: '(31) 97777-7777'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'accepted': return 'Aceita';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitada';
      default: return status;
    }
  };

  const handleAccept = (id: number) => {
    setProposals(proposals.map(proposal => 
      proposal.id === id ? { ...proposal, status: 'accepted' } : proposal
    ));
  };

  const handleReject = (id: number) => {
    setProposals(proposals.map(proposal => 
      proposal.id === id ? { ...proposal, status: 'rejected' } : proposal
    ));
  };

  const filteredProposals = proposals.filter(proposal => {
    const matchesSearch = proposal.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || proposal.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Propostas Recebidas</h1>
          <p className="text-muted-foreground">Gerencie as propostas de shows e eventos</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Propostas
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Propostas</p>
              <p className="text-2xl font-bold mt-1">24</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aceitas</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejeitadas</p>
              <p className="text-2xl font-bold mt-1">4</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por evento, local ou promotor..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </Button>
          <Button 
            variant={filter === 'accepted' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('accepted')}
          >
            Aceitas
          </Button>
          <Button 
            variant={filter === 'rejected' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('rejected')}
          >
            Rejeitadas
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Proposals List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data/Hora</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Local</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Promotor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProposals.map((proposal) => (
                <tr key={proposal.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <div className="font-medium">{proposal.eventName}</div>
                    <div className="text-sm text-muted-foreground">{proposal.venue}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {proposal.date}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {proposal.time}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="max-w-xs truncate">{proposal.location}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">R$ {proposal.fee.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{proposal.promoter}</div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Mail className="h-4 w-4" />
                      {proposal.contact}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {proposal.status === 'pending' ? (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAccept(proposal.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Aceitar
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleReject(proposal.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Rejeitar
                          </Button>
                        </>
                      ) : (
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Detalhes
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Dicas para Avaliar Propostas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <h3 className="font-medium">Verifique os Detalhes</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Data e horário do evento</li>
              <li>• Local e capacidade do venue</li>
              <li>• Valor da cachê oferecida</li>
              <li>• Condições de pagamento</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Pesquise o Promotor</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Histórico de eventos</li>
              <li>• Reputação no mercado</li>
              <li>• Experiência com artistas</li>
              <li>• Confiabilidade nos pagamentos</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Documentação</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Contrato de apresentação</li>
              <li>• Termos de pagamento</li>
              <li>• Responsabilidades técnicas</li>
              <li>• Cláusulas de cancelamento</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}