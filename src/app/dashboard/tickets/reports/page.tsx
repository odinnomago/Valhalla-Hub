'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TicketReportsPage() {
  // This will be replaced with real data from user context/hooks
  const [reports] = useState({
    totalSales: 0,
    totalRevenue: 'R$ 0,00',
    avgTicketPrice: 'R$ 0,00',
    eventsCount: 0
  });

  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios de Vendas</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho das vendas de ingressos</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex flex-wrap gap-2">
        {['7d', '30d', '90d', '1y'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '7d' && '7 dias'}
            {range === '30d' && '30 dias'}
            {range === '90d' && '90 dias'}
            {range === '1y' && '1 ano'}
          </Button>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ingressos Vendidos</p>
              <p className="text-2xl font-bold mt-1">{reports.totalSales}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">{reports.totalRevenue}</p>
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
              <p className="text-2xl font-bold mt-1">{reports.avgTicketPrice}</p>
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
              <p className="text-2xl font-bold mt-1">{reports.eventsCount}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Vendas por Evento</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de vendas por evento</p>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Receita ao Longo do Tempo</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de receita ao longo do tempo</p>
          </div>
        </div>
      </div>

      {/* Detailed Report */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Relatório Detalhado</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ingressos Vendidos</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Taxa de Conversão</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  Nenhum dado disponível
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}