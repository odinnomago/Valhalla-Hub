'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Globe, 
  Music, 
  Camera, 
  Video, 
  Share2, 
  Link, 
  Trash2, 
  Plus,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function IntegrationsSettingsPage() {
  // This will be replaced with real data from user context/hooks
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Spotify', icon: Music, connected: true, description: 'Sincronize seus lançamentos com o Spotify' },
    { id: 2, name: 'Instagram', icon: Camera, connected: true, description: 'Publique automaticamente no Instagram' },
    { id: 3, name: 'YouTube', icon: Video, connected: false, description: 'Sincronize vídeos e lançamentos' },
    { id: 4, name: 'TikTok', icon: Share2, connected: false, description: 'Compartilhe conteúdo no TikTok' },
    { id: 5, name: 'Apple Music', icon: Music, connected: false, description: 'Distribua para Apple Music' },
    { id: 6, name: 'Deezer', icon: Music, connected: false, description: 'Distribua para Deezer' },
    { id: 7, name: 'SoundCloud', icon: Music, connected: false, description: 'Sincronize com SoundCloud' },
    { id: 8, name: 'Bandcamp', icon: Music, connected: true, description: 'Sincronize seus lançamentos' }
  ]);

  const toggleIntegration = (id: number) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, connected: !integration.connected } 
          : integration
      )
    );
  };

  const removeIntegration = (id: number) => {
    setIntegrations(prev => prev.filter(integration => integration.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Integrações</h1>
        <p className="text-muted-foreground">Conecte suas contas de outras plataformas</p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Plataformas Conectadas</h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Integração
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration) => {
            const Icon = integration.icon;
            return (
              <div 
                key={integration.id} 
                className="border border-border/50 rounded-lg p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{integration.name}</h3>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {integration.connected ? (
                    <>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Desconectar
                      </Button>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Conectado
                      </div>
                    </>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => toggleIntegration(integration.id)}
                    >
                      <Link className="h-4 w-4 mr-1" />
                      Conectar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">API e Webhooks</h2>
        <div className="space-y-4">
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Chave de API</h3>
                <p className="text-sm text-muted-foreground">Use para integrar com sistemas externos</p>
              </div>
              <Button variant="outline">Gerar Nova Chave</Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value="sk_valhallahub_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" 
                className="flex-1 bg-muted px-3 py-2 rounded-md text-sm"
              />
              <Button variant="outline">Copiar</Button>
            </div>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Webhooks</h3>
                <p className="text-sm text-muted-foreground">Receba notificações em tempo real de eventos</p>
              </div>
              <Button variant="outline">Configurar Webhook</Button>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Nenhum webhook configurado</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Aplicativos de Terceiros</h2>
        <div className="space-y-4">
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Permissões de Aplicativos</h3>
                <p className="text-sm text-muted-foreground">Gerencie o acesso de aplicativos de terceiros</p>
              </div>
              <Button variant="outline">Ver Todos</Button>
            </div>
            <div className="mt-3">
              <p className="text-sm text-muted-foreground">Nenhum aplicativo de terceiro autorizado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}