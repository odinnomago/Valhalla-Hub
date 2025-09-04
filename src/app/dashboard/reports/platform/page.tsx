'use client';

import React, { useState } from 'react';
import { 
  Globe, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointerClick,
  Filter,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsByPlatformPage() {
  // This will be replaced with real data from user context/hooks
  const [platformData] = useState([
    {
      id: 1,
      name: 'Spotify',
      icon: '🎵',
      users: 12500,
      revenue: 35000,
      growth: 12.5,
      streams: 2500000
    },
    {
      id: 2,
      name: 'Apple Music',
      icon: '📱',
      users: 8900,
      revenue: 28000,
      growth: 8.3,
      streams: 1800000
    },
    {
      id: 3,
      name: 'YouTube Music',
      icon: '▶️',
      users: 15200,
      revenue: 22000,
      growth: 15.7,
      streams: 3200000
    },
    {
      id: 4,
      name: 'Amazon Music',
      icon: '🛒',
      users: 6700,
      revenue: 18000,
      growth: 5.2,
      streams: 1200000
    }
  ]);

  const [timeRange, setTimeRange] = useState('30d');

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios por Plataforma</h1>
          <p className="text-muted-foreground">Compare o desempenho entre diferentes plataformas</p>
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

      {/* Platform Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformData.map((platform) => (
          <div key={platform.id} className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl">{platform.icon}</div>
              <div className="bg-primary/10 p-2 rounded-lg">
                <Globe className="h-5 w-5 text-primary" />
              </div>
            </div>
            <h3 className="font-semibold text-lg mb-2">{platform.name}</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Usuários</span>
                <span className="font-medium">{platform.users.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Receita</span>
                <span className="font-medium">R$ {platform.revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Crescimento</span>
                <span className={`font-medium ${platform.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {platform.growth > 0 ? '+' : ''}{platform.growth}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-sm">Streams</span>
                <span className="font-medium">{platform.streams.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Platform Comparison */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Comparação Detalhada</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Plataforma</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Usuários</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Receita</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Crescimento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Streams</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {platformData.map((platform) => (
                <tr key={platform.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{platform.icon}</div>
                      <span className="font-medium">{platform.name}</span>
                    </div>
                  </td>
                  <td className="p-4">{platform.users.toLocaleString()}</td>
                  <td className="p-4 font-medium">R$ {platform.revenue.toLocaleString()}</td>
                  <td className="p-4">
                    <div className={`flex items-center gap-1 ${platform.growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      <TrendingUp className="h-4 w-4" />
                      <span>{platform.growth > 0 ? '+' : ''}{platform.growth}%</span>
                    </div>
                  </td>
                  <td className="p-4">{platform.streams.toLocaleString()}</td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">Ver Detalhes</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Platform Performance Chart */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h3 className="font-semibold mb-4">Desempenho ao Longo do Tempo</h3>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          <p>Gráfico de desempenho por plataforma ao longo do tempo</p>
        </div>
      </div>
    </div>
  );
}