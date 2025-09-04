'use client';

import React, { useState } from 'react';
import { 
  Megaphone, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  Heart, 
  Share2, 
  Play,
  Calendar,
  Plus,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingPage() {
  // This will be replaced with real data from user context/hooks
  const [campaigns] = useState([]);
  
  // This will be replaced with real data from user context/hooks
  const [analytics] = useState({
    totalReach: '0',
    totalEngagement: '0',
    avgCTR: '0%',
    totalSpent: 'R$ 0,00'
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativa';
      case 'planned': return 'Planejada';
      case 'completed': return 'Concluída';
      default: return status;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Agência de Marketing IA</h1>
          <p className="text-muted-foreground">Automatize e otimize suas campanhas de marketing</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Nova Campanha
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alcance Total</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalReach}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engajamento</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalEngagement}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">CTR Médio</p>
              <p className="text-2xl font-bold mt-1">{analytics.avgCTR}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Investido</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalSpent}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Target className="h-5 w-5 mb-2" />
            <span className="text-xs">Campanha IA</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Play className="h-5 w-5 mb-2" />
            <span className="text-xs">Anúncio de Vídeo</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Share2 className="h-5 w-5 mb-2" />
            <span className="text-xs">Promoção Social</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Megaphone className="h-5 w-5 mb-2" />
            <span className="text-xs">Influenciadores</span>
          </Button>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-lg font-semibold">Campanhas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Campanha</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plataforma</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Período</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Orçamento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Alcance</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.length > 0 ? (
                campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-medium">{campaign.name || 'Campanha sem nome'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-md">
                          <Play className="h-4 w-4 text-primary" />
                        </div>
                        {campaign.platform || 'Plataforma não definida'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {campaign.startDate && campaign.endDate 
                          ? `${campaign.startDate} - ${campaign.endDate}`
                          : 'Período não definido'}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{campaign.budget || 'R$ 0,00'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {campaign.reach || '0'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                        {getStatusText(campaign.status)}
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
                    Nenhuma campanha cadastrada
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