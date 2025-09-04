'use client';

import React, { useState } from 'react';
import { 
  Lock, 
  Play, 
  FileText, 
  Download, 
  Eye, 
  Clock,
  Calendar,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MembersContentPage() {
  // This will be replaced with real data from user context/hooks
  const [content] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalContent: 0,
    watchedHours: 0,
    downloadedItems: 0,
    lastAccess: ''
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Conteúdo Exclusivo</h1>
        <p className="text-muted-foreground">Acesse materiais exclusivos para membros</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Conteúdos</p>
              <p className="text-2xl font-bold mt-1">{stats.totalContent}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Horas Assistidas</p>
              <p className="text-2xl font-bold mt-1">{stats.watchedHours}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Itens Baixados</p>
              <p className="text-2xl font-bold mt-1">{stats.downloadedItems}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Download className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Último Acesso</p>
              <p className="text-2xl font-bold mt-1">{stats.lastAccess || 'N/A'}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Library */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Biblioteca de Conteúdo</h2>
        
        {content.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => (
              <div key={item.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-muted aspect-video flex items-center justify-center">
                  {item.type === 'video' ? (
                    <Play className="h-12 w-12 text-muted-foreground" />
                  ) : (
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.title || 'Conteúdo sem título'}</h3>
                    {item.locked && (
                      <Lock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description || 'Nenhuma descrição disponível'}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {item.date || 'Data não especificada'}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Baixar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum conteúdo disponível</h3>
            <p className="text-muted-foreground mb-4">
              Torne-se um membro para acessar conteúdos exclusivos
            </p>
            <Button>Ver Planos de Assinatura</Button>
          </div>
        )}
      </div>
    </div>
  );
}