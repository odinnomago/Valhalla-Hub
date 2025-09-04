'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick, 
  Share2, 
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingAnalyticsPage() {
  // This will be replaced with real data from user context/hooks
  const [analytics] = useState({
    totalReach: 0,
    engagementRate: 0,
    clicks: 0,
    shares: 0,
    impressions: 0,
    conversionRate: 0
  });

  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Análise de Desempenho</h1>
          <p className="text-muted-foreground">Acompanhe o desempenho das suas campanhas de marketing</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alcance Total</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalReach.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
              <p className="text-2xl font-bold mt-1">{analytics.engagementRate}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Cliques</p>
              <p className="text-2xl font-bold mt-1">{analytics.clicks.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <MousePointerClick className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compartilhamentos</p>
              <p className="text-2xl font-bold mt-1">{analytics.shares.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Impressões</p>
              <p className="text-2xl font-bold mt-1">{analytics.impressions.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
              <p className="text-2xl font-bold mt-1">{analytics.conversionRate}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Desempenho por Plataforma</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de desempenho por plataforma</p>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h3 className="font-semibold mb-4">Engajamento ao Longo do Tempo</h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <p>Gráfico de engajamento ao longo do tempo</p>
          </div>
        </div>
      </div>

      {/* Campaign Performance */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Desempenho das Campanhas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Campanha</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plataforma</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Alcance</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Engajamento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Conversões</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="p-8 text-center text-muted-foreground">
                  Nenhuma campanha encontrada
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}