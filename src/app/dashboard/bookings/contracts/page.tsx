'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Download, 
  Eye, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Calendar,
  User,
  Building,
  Signature
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BookingContractsPage() {
  const [contracts, setContracts] = useState([
    {
      id: 1,
      eventName: 'Festival Verão',
      venue: 'Parque dos Artistas',
      date: '2024-08-15',
      promoter: 'Produções Verão Ltda',
      value: 5000,
      status: 'signed',
      signedDate: '2024-07-10',
      expirationDate: '2024-08-20'
    },
    {
      id: 2,
      eventName: 'Show Acústico',
      venue: 'Clube da Esquina',
      date: '2024-07-22',
      promoter: 'Clube da Esquina',
      value: 2500,
      status: 'pending',
      signedDate: '',
      expirationDate: '2024-07-25'
    },
    {
      id: 3,
      eventName: 'Festa Universitária',
      venue: 'Universidade Federal',
      date: '2024-09-05',
      promoter: 'Associação Estudantil',
      value: 3500,
      status: 'draft',
      signedDate: '',
      expirationDate: '2024-09-10'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'signed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'signed': return 'Assinado';
      case 'pending': return 'Pendente';
      case 'draft': return 'Rascunho';
      case 'expired': return 'Expirado';
      default: return status;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contract.promoter.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filter === 'all' || contract.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Contratos</h1>
          <p className="text-muted-foreground">Gerencie seus contratos de apresentação</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Contratos</p>
              <p className="text-2xl font-bold mt-1">18</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Assinados</p>
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
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold mt-1">4</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rascunhos</p>
              <p className="text-2xl font-bold mt-1">2</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Edit className="h-6 w-6 text-primary" />
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
            Todos
          </Button>
          <Button 
            variant={filter === 'signed' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('signed')}
          >
            Assinados
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </Button>
          <Button 
            variant={filter === 'draft' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('draft')}
          >
            Rascunhos
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Contracts List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Promotor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Validade</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr key={contract.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <div className="font-medium">{contract.eventName}</div>
                    <div className="text-sm text-muted-foreground">{contract.venue}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {contract.date}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {contract.promoter}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">R$ {contract.value.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                      {getStatusText(contract.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="text-sm">
                      {contract.expirationDate ? contract.expirationDate : '-'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Templates Section */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Modelos de Contrato</h2>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Novo Modelo
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border/50 rounded-lg p-4 hover:bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Contrato Padrão</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Modelo básico para apresentações em venues
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4 hover:bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <Signature className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Contrato com Direitos</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Modelo com cláusulas de direitos autorais
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4 hover:bg-muted/50">
            <div className="flex items-center gap-2 mb-3">
              <Building className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Contrato Corporativo</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Modelo para eventos corporativos e privados
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Visualizar
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Baixar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}