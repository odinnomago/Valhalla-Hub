'use client';

import React, { useState } from 'react';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  Mail,
  Phone,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BookingsAgencyPage() {
  // This will be replaced with real data from user context/hooks
  const [agencyRequests] = useState([
    {
      id: 1,
      eventName: 'Festival de Verão',
      location: 'Praia do Forte, BA',
      date: '2024-06-15',
      status: 'pending',
      agency: 'Agência Premium Shows',
      contact: 'Carlos Silva',
      value: 15000
    },
    {
      id: 2,
      eventName: 'Show Acústico',
      location: 'São Paulo, SP',
      date: '2024-05-22',
      status: 'approved',
      agency: 'Evento Música',
      contact: 'Ana Costa',
      value: 8500
    },
    {
      id: 3,
      eventName: 'Festa Universitária',
      location: 'Belo Horizonte, MG',
      date: '2024-07-10',
      status: 'rejected',
      agency: 'Shows BH',
      contact: 'Roberto Almeida',
      value: 5200
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovado';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNewRequest = () => {
    // This will be replaced with actual functionality
    console.log('Creating new agency request');
  };

  const handleViewRequest = (id: number) => {
    // This will be replaced with actual functionality
    console.log('Viewing request:', id);
  };

  const filteredRequests = agencyRequests.filter(request => 
    request.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.contact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Solicitar Agenciamento</h1>
          <p className="text-muted-foreground">Encontre agências para seus eventos e shows</p>
        </div>
        <Button onClick={handleNewRequest} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Solicitação
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Solicitações</p>
              <p className="text-2xl font-bold mt-1">12</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <UserCheck className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Aprovadas</p>
              <p className="text-2xl font-bold mt-1">8</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold mt-1">3</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejeitadas</p>
              <p className="text-2xl font-bold mt-1">1</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar solicitações..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Agency Requests */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Solicitações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Agência</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Local</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{request.eventName}</td>
                    <td className="p-4">
                      <div>{request.agency}</div>
                      <div className="text-sm text-muted-foreground">{request.contact}</div>
                    </td>
                    <td className="p-4">{new Date(request.date).toLocaleDateString('pt-BR')}</td>
                    <td className="p-4">{request.location}</td>
                    <td className="p-4 font-medium">R$ {request.value.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {getStatusText(request.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewRequest(request.id)}>
                        Ver Detalhes
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Nenhuma solicitação encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Agencies */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agências Recomendadas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Agência Premium Shows</h3>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Especializada em grandes eventos e festivais. Mais de 10 anos de experiência.
            </p>
            <div className="flex items-center gap-2 text-sm mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>São Paulo, SP</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>(11) 99999-9999</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Solicitar Orçamento
            </Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Evento Música</h3>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground ml-1">(4.2)</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Foco em shows acústicos e eventos íntimos. Atendimento personalizado.
            </p>
            <div className="flex items-center gap-2 text-sm mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Rio de Janeiro, RJ</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>(21) 98888-8888</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Solicitar Orçamento
            </Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Shows BH</h3>
                <div className="flex items-center gap-1">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Especialistas em eventos universitários e festas regionais. Preços acessíveis.
            </p>
            <div className="flex items-center gap-2 text-sm mb-3">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Belo Horizonte, MG</span>
            </div>
            <div className="flex items-center gap-2 text-sm mb-4">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>(31) 97777-7777</span>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Solicitar Orçamento
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}