'use client';

import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Filter,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComparisonReportsPage() {
  // This will be replaced with real data from user context/hooks
  const [comparisonData] = useState([
    {
      id: 1,
      period: 'Janeiro 2024',
      revenue: 45000,
      streams: 2800000,
      downloads: 125000,
      growth: 12.5
    },
    {
      id: 2,
      period: 'Fevereiro 2024',
      revenue: 52000,
      streams: 3200000,
      downloads: 142000,
      growth: 15.6
    },
    {
      id: 3,
      period: 'Março 2024',
      revenue: 48500,
      streams: 2950000,
      downloads: 132000,
      growth: 8.2
    },
    {
      id: 4,
      period: 'Abril 2024',
      revenue: 55000,
      streams: 3500000,
      downloads: 158000,
      growth: 13.4
    }
  ]);

  const [timeRange, setTimeRange] = useState('6m');

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios Comparativos</h1>
          <p className="text-muted-foreground">Analise o desempenho em diferentes períodos</p>
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
        {['1m', '3m', '6m', '1y', 'all'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '1m' && '1 mês'}
            {range === '3m' && '3 meses'}
            {range === '6m' && '6 meses'}
            {range === '1y' && '1 ano'}
            {range === 'all' && 'Todo período'}
          </Button>
        ))}
      </div>

      {/* Comparison Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">R$ 200.500</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">+12.5% vs mês anterior</span>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Streams</p>
              <p className="text-2xl font-bold mt-1">12.450.000</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">+15.2% vs mês anterior</span>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Downloads</p>
              <p className="text-2xl font-bold mt-1">557.000</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Download className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">+8.7% vs mês anterior</span>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Crescimento</p>
              <p className="text-2xl font-bold mt-1">12.5%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-1 text-green-500">
            <ArrowUp className="h-4 w-4" />
            <span className="text-sm font-medium">+2.3% vs mês anterior</span>
          </div>
        </div>
      </div>

      {/* Period Comparison Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Comparação por Período</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Período</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Streams</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Downloads</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Crescimento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((period) => (
                <tr key={period.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">{period.period}</td>
                  <td className="p-4">R$ {period.revenue.toLocaleString()}</td>
                  <td className="p-4">{period.streams.toLocaleString()}</td>
                  <td className="p-4">{period.downloads.toLocaleString()}</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-1 ${period.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {period.growth > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      <span>{period.growth > 0 ? '+' : ''}{period.growth}%</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Growth Chart */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h3 className="font-semibold mb-4">Crescimento ao Longo do Tempo</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <p>Gráfico de crescimento comparativo</p>
        </div>
      </div>
    </div>
  );
}