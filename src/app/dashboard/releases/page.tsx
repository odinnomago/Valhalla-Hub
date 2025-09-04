'use client';

import React, { useState } from 'react';
import { 
  Album, 
  Plus, 
  BarChart3, 
  Copyright, 
  MessageCircle, 
  Search,
  Filter,
  Play,
  Pause,
  Download,
  Share2,
  MoreVertical,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReleasesPage() {
  // This will be replaced with real data from user context/hooks
  const [releases] = useState([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'pending': return 'Em análise';
      case 'draft': return 'Rascunho';
      default: return status;
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gravadora Digital</h1>
          <p className="text-muted-foreground">Gerencie seus lançamentos musicais</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Enviar Nova Música
        </Button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          <button className="flex items-center gap-2 py-4 px-1 border-b-2 border-primary text-primary font-medium text-sm">
            <Album className="h-4 w-4" />
            Meus Lançamentos
          </button>
          <button className="flex items-center gap-2 py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border font-medium text-sm">
            <BarChart3 className="h-4 w-4" />
            Relatórios de Streaming
          </button>
          <button className="flex items-center gap-2 py-4 px-1 border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:border-border font-medium text-sm">
            <Copyright className="h-4 w-4" />
            Direitos Autorais
          </button>
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar lançamentos..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Releases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {releases.length > 0 ? (
          releases.map((release) => (
            <div key={release.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <div className="bg-muted h-48 flex items-center justify-center">
                  <Album className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="secondary" size="sm" className="rounded-full p-2">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(release.status)}`}>
                    {getStatusText(release.status)}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{release.title || 'Sem título'}</h3>
                    <p className="text-sm text-muted-foreground">{release.artist || 'Artista desconhecido'}</p>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {release.type || 'Tipo desconhecido'}
                  </span>
                </div>
                
                {release.status === 'published' ? (
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Streams</span>
                      <span className="font-medium">{release.streams?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Receita</span>
                      <span className="font-medium">R$ {release.revenue ? release.revenue.toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lançamento</span>
                      <span>{release.releaseDate || '-'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 text-sm text-muted-foreground">
                    {release.status === 'pending' ? (
                      <p>Em análise pela equipe Valhalla. Normalmente leva 3-5 dias úteis.</p>
                    ) : (
                      <p>Rascunho salvo. Continue trabalhando em seu lançamento.</p>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex gap-2">
                  {release.status === 'published' ? (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Play
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      {release.status === 'pending' ? 'Ver Detalhes' : 'Continuar Edição'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Album className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum lançamento encontrado</h3>
            <p className="text-muted-foreground mb-4">Você ainda não enviou nenhuma música</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Enviar Nova Música
            </Button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Plus className="h-5 w-5 mb-2" />
            <span className="text-xs">Enviar Música</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <BarChart3 className="h-5 w-5 mb-2" />
            <span className="text-xs">Relatórios</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <Copyright className="h-5 w-5 mb-2" />
            <span className="text-xs">Direitos Autorais</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-auto p-4">
            <MessageCircle className="h-5 w-5 mb-2" />
            <span className="text-xs">Contatar A&R</span>
          </Button>
        </div>
      </div>
    </div>
  );
}