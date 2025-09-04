'use client';

import React, { useState } from 'react';
import { Bell, Mail, Smartphone, Globe, CheckCircle, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function NotificationsSettingsPage() {
  // This will be replaced with real data from user context/hooks
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    newsletter: true,
    productUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    communityNotifications: true,
    eventReminders: true,
    newMessages: true,
    friendRequests: true,
    comments: true,
    mentions: true
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSave = () => {
    // This will be replaced with actual save functionality
    console.log('Saving notification preferences:', preferences);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Configurações de Notificações</h1>
        <p className="text-muted-foreground">Gerencie como você deseja ser notificado</p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Preferências de Notificação</h2>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>

        <div className="space-y-6">
          <div className="border-b border-border/50 pb-6">
            <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Notificações por E-mail
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newsletter" className="font-medium">Newsletter</Label>
                  <p className="text-sm text-muted-foreground">Receba atualizações e novidades da plataforma</p>
                </div>
                <Switch
                  id="newsletter"
                  checked={preferences.newsletter}
                  onCheckedChange={() => handleToggle('newsletter')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="productUpdates" className="font-medium">Atualizações de Produtos</Label>
                  <p className="text-sm text-muted-foreground">Novas funcionalidades e melhorias</p>
                </div>
                <Switch
                  id="productUpdates"
                  checked={preferences.productUpdates}
                  onCheckedChange={() => handleToggle('productUpdates')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketingEmails" className="font-medium">E-mails de Marketing</Label>
                  <p className="text-sm text-muted-foreground">Ofertas especiais e promoções</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={() => handleToggle('marketingEmails')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="securityAlerts" className="font-medium">Alertas de Segurança</Label>
                  <p className="text-sm text-muted-foreground">Notificações importantes sobre segurança</p>
                </div>
                <Switch
                  id="securityAlerts"
                  checked={preferences.securityAlerts}
                  onCheckedChange={() => handleToggle('securityAlerts')}
                />
              </div>
            </div>
          </div>
          
          <div className="border-b border-border/50 pb-6">
            <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Notificações Push
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="newMessages" className="font-medium">Novas Mensagens</Label>
                  <p className="text-sm text-muted-foreground">Quando você receber uma nova mensagem</p>
                </div>
                <Switch
                  id="newMessages"
                  checked={preferences.newMessages}
                  onCheckedChange={() => handleToggle('newMessages')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="friendRequests" className="font-medium">Solicitações de Amizade</Label>
                  <p className="text-sm text-muted-foreground">Quando alguém enviar uma solicitação de amizade</p>
                </div>
                <Switch
                  id="friendRequests"
                  checked={preferences.friendRequests}
                  onCheckedChange={() => handleToggle('friendRequests')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="comments" className="font-medium">Comentários</Label>
                  <p className="text-sm text-muted-foreground">Quando alguém comentar em sua postagem</p>
                </div>
                <Switch
                  id="comments"
                  checked={preferences.comments}
                  onCheckedChange={() => handleToggle('comments')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mentions" className="font-medium">Menções</Label>
                  <p className="text-sm text-muted-foreground">Quando você for mencionado em uma postagem</p>
                </div>
                <Switch
                  id="mentions"
                  checked={preferences.mentions}
                  onCheckedChange={() => handleToggle('mentions')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="eventReminders" className="font-medium">Lembretes de Eventos</Label>
                  <p className="text-sm text-muted-foreground">Lembretes para eventos importantes</p>
                </div>
                <Switch
                  id="eventReminders"
                  checked={preferences.eventReminders}
                  onCheckedChange={() => handleToggle('eventReminders')}
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Notificações da Comunidade
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="communityNotifications" className="font-medium">Atividades da Comunidade</Label>
                  <p className="text-sm text-muted-foreground">Novas postagens e atividades na comunidade</p>
                </div>
                <Switch
                  id="communityNotifications"
                  checked={preferences.communityNotifications}
                  onCheckedChange={() => handleToggle('communityNotifications')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Frequência de Notificações</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Imediato</h3>
            <p className="text-sm text-muted-foreground">Receba notificações assim que acontecerem</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4 bg-primary/5 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">Diário</h3>
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Resumo diário das notificações importantes</p>
          </div>
          <div className="border border-border/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">Semanal</h3>
            <p className="text-sm text-muted-foreground">Resumo semanal das atividades</p>
          </div>
        </div>
      </div>
    </div>
  );
}