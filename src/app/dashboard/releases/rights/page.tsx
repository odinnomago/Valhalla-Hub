'use client';

import React, { useState } from 'react';
import { 
  Copyright, 
  Shield, 
  FileText, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  User, 
  Building, 
  Globe,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RightsManagementPage() {
  const [rights, setRights] = useState([
    {
      id: 1,
      title: 'Summer Vibes',
      type: 'Composição',
      status: 'registered',
      registrationNumber: 'BR-2024-12345',
      registrationDate: '2024-06-15',
      owners: ['João Silva'],
      territories: ['Brasil', 'Portugal', 'Angola'],
      revenue: 875.50
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      type: 'Gravação',
      status: 'pending',
      registrationNumber: '',
      registrationDate: '',
      owners: ['João Silva', 'Maria Santos'],
      territories: ['Brasil'],
      revenue: 0
    },
    {
      id: 3,
      title: 'Urban Stories',
      type: 'Composição',
      status: 'registered',
      registrationNumber: 'BR-2024-67890',
      registrationDate: '2024-05-20',
      owners: ['João Silva', 'Carlos Mendes'],
      territories: ['Brasil', 'Portugal', 'Espanha', 'França'],
      revenue: 1092.00
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'registered': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'registered': return 'Registrado';
      case 'pending': return 'Pendente';
      case 'rejected': return 'Rejeitado';
      default: return status;
    }
  };

  const filteredRights = rights.filter(right => {
    const matchesSearch = right.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      right.owners.some(owner => owner.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = filter === 'all' || right.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Direitos Autorais</h1>
          <p className="text-muted-foreground">Gerencie os direitos das suas composições e gravações</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Registrar Novo Direito
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Direitos Registrados</p>
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
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">R$ 2.456,70</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Copyright className="h-6 w-6 text-primary" />
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
            placeholder="Buscar por título ou proprietário..."
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
            variant={filter === 'registered' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('registered')}
          >
            Registrados
          </Button>
          <Button 
            variant={filter === 'pending' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('pending')}
          >
            Pendentes
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Rights Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Obra</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Tipo</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Proprietários</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Territórios</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredRights.map((right) => (
                <tr key={right.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <div className="font-medium">{right.title}</div>
                    {right.registrationNumber && (
                      <div className="text-sm text-muted-foreground">
                        {right.registrationNumber}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {right.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(right.status)}`}>
                      {getStatusText(right.status)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {right.owners.map((owner, index) => (
                        <div 
                          key={index} 
                          className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary"
                          title={owner}
                        >
                          {owner.charAt(0)}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {right.territories.slice(0, 2).map((territory, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                          {territory}
                        </span>
                      ))}
                      {right.territories.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                          +{right.territories.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">
                      {right.revenue > 0 ? `R$ ${right.revenue.toFixed(2)}` : '-'}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
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
        <h2 className="text-xl font-semibold mb-4">Sobre Direitos Autorais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Proteção Legal</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              O registro de direitos autorais protege suas composições e gravações de uso não autorizado, 
              garantindo que você receba os royalties devidos.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Documentação</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Mantenha toda a documentação organizada e atualizada. Nossa plataforma ajuda você a 
              gerenciar contratos, licenças e distribuições de royalties.
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Dicas Importantes</h3>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Registre suas obras o quanto antes</li>
              <li>• Mantenha cópias de segurança</li>
              <li>• Monitore o uso de suas músicas</li>
              <li>• Atualize seus dados regularmente</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}