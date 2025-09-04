'use client';

import React, { useState } from 'react';
import { 
  Ticket, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  User, 
  QrCode,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TicketsPage() {
  // This will be replaced with real data from user context/hooks
  const [tickets] = useState([]);
  
  // This will be replaced with real data from user context/hooks
  const [analytics] = useState({
    totalSales: 0,
    totalRevenue: 'R$ 0,00',
    avgTicketPrice: 'R$ 0,00',
    eventsCount: 0
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Ferramenta de Venda de Ingressos</h1>
          <p className="text-muted-foreground">Crie e venda ingressos para seus eventos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Ingresso
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ingressos Vendidos</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalSales}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Ticket className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalRevenue}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Preço Médio</p>
              <p className="text-2xl font-bold mt-1">{analytics.avgTicketPrice}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Eventos</p>
              <p className="text-2xl font-bold mt-1">{analytics.eventsCount}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Ticket className="h-5 w-5 mb-2" />
            <span className="text-xs">Criar Ingresso</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <QrCode className="h-5 w-5 mb-2" />
            <span className="text-xs">Validar Ingressos</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <ShoppingCart className="h-5 w-5 mb-2" />
            <span className="text-xs">Relatório de Vendas</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <User className="h-5 w-5 mb-2" />
            <span className="text-xs">Lista de Convidados</span>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar ingressos..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Tickets Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Preço</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Vendidos</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{ticket.event || 'Evento não especificado'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {ticket.date || '-'}
                      </div>
                    </td>
                    <td className="p-4">{ticket.price || 'R$ 0,00'}</td>
                    <td className="p-4">{ticket.sold || 0}</td>
                    <td className="p-4 font-medium">{ticket.revenue || 'R$ 0,00'}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    Nenhum ingresso cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}