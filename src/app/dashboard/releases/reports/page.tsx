'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Play, 
  Users, 
  Heart, 
  Share2, 
  Download, 
  Globe,
  Calendar,
  Filter,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReleaseReportsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [sortBy, setSortBy] = useState('streams');

  const releases = [
    {
      id: 1,
      title: 'Summer Vibes',
      artist: 'João Silva',
      streams: 12500,
      downloads: 850,
      likes: 2450,
      shares: 320,
      revenue: 875.50,
      growth: 15.2
    },
    {
      id: 2,
      title: 'Midnight Dreams',
      artist: 'João Silva',
      streams: 8900,
      downloads: 620,
      likes: 1890,
      shares: 150,
      revenue: 623.00,
      growth: 8.7
    },
    {
      id: 3,
      title: 'Urban Stories',
      artist: 'João Silva',
      streams: 15600,
      downloads: 1200,
      likes: 3200,
      shares: 480,
      revenue: 1092.00,
      growth: 22.5
    },
    {
      id: 4,
      title: 'Ocean Waves',
      artist: 'João Silva',
      streams: 5400,
      downloads: 380,
      likes: 980,
      shares: 95,
      revenue: 378.00,
      growth: -2.3
    }
  ];

  const timeRanges = [
    { id: '7d', label: '7 dias' },
    { id: '30d', label: '30 dias' },
    { id: '90d', label: '90 dias' },
    { id: '1y', label: '1 ano' }
  ];

  const sortedReleases = [...releases].sort((a, b) => {
    if (sortBy === 'streams') return b.streams - a.streams;
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'growth') return b.growth - a.growth;
    return 0;
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios de Streaming</h1>
          <p className="text-muted-foreground">Analise o desempenho das suas músicas</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex flex-wrap gap-2">
          {timeRanges.map((range) => (
            <Button
              key={range.id}
              variant={timeRange === range.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeRange(range.id)}
            >
              {range.label}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Streams</p>
              <p className="text-2xl font-bold mt-1">42.4K</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm mt-2 flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            +18.5% este mês
          </p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">R$ 2.968,50</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm mt-2 flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            +12.3% este mês
          </p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ouvintes Únicos</p>
              <p className="text-2xl font-bold mt-1">18.7K</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm mt-2 flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            +9.7% este mês
          </p>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
              <p className="text-2xl font-bold mt-1">12.4%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm mt-2 flex items-center text-green-500">
            <ArrowUp className="h-4 w-4 mr-1" />
            +3.2% este mês
          </p>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Desempenho ao Longo do Tempo</h2>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </div>
        
        <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Gráfico de desempenho será exibido aqui</p>
            <p className="text-sm text-muted-foreground mt-1">Mostrando dados de streams por dia</p>
          </div>
        </div>
      </div>

      {/* Releases Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-lg font-semibold">Desempenho por Música</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Música</th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  <button 
                    className="flex items-center gap-1 hover:text-foreground"
                    onClick={() => setSortBy('streams')}
                  >
                    Streams
                    {sortBy === 'streams' && <ArrowUpDown className="h-4 w-4" />}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">Downloads</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Curtidas</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Compartilhamentos</th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  <button 
                    className="flex items-center gap-1 hover:text-foreground"
                    onClick={() => setSortBy('revenue')}
                  >
                    Receita
                    {sortBy === 'revenue' && <ArrowUpDown className="h-4 w-4" />}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">
                  <button 
                    className="flex items-center gap-1 hover:text-foreground"
                    onClick={() => setSortBy('growth')}
                  >
                    Crescimento
                    {sortBy === 'growth' && <ArrowUpDown className="h-4 w-4" />}
                  </button>
                </th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {sortedReleases.map((release) => (
                <tr key={release.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <div className="font-medium">{release.title}</div>
                    <div className="text-sm text-muted-foreground">{release.artist}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{release.streams.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{release.downloads.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{release.likes.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">{release.shares.toLocaleString()}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium">R$ {release.revenue.toFixed(2)}</div>
                  </td>
                  <td className="p-4">
                    <div className={`font-medium flex items-center gap-1 ${
                      release.growth >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {release.growth >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {Math.abs(release.growth)}%
                    </div>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}