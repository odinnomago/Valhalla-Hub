'use client';

import React, { useState } from 'react';
import { Lock, Eye, Save, Shield, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PrivacySettingsPage() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: true,
    showLocation: false,
    allowMessaging: true,
    shareActivity: 'friends',
    analytics: true
  });

  const handleToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof privacySettings]
    }));
  };

  const handleSelect = (setting: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle privacy settings update logic here
    console.log('Privacy settings updated:', privacySettings);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Privacidade</h1>
        <p className="text-muted-foreground">Controle quem pode ver suas informações e atividades</p>
      </div>

      {/* Privacy Controls */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Configurações de Privacidade</h2>
        <p className="text-muted-foreground mb-6">
          Gerencie sua privacidade e controle como suas informações são compartilhadas
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Visibility */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <label className="font-medium">Visibilidade do Perfil</label>
            </div>
            <p className="text-sm text-muted-foreground">
              Controle quem pode ver seu perfil e informações
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['public', 'friends', 'private'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect('profileVisibility', option)}
                  className={`px-4 py-2 text-sm rounded-lg border ${
                    privacySettings.profileVisibility === option
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border'
                  }`}
                >
                  {option === 'public' && 'Público'}
                  {option === 'friends' && 'Amigos'}
                  {option === 'private' && 'Privado'}
                </button>
              ))}
            </div>
          </div>

          {/* Email Visibility */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Mostrar E-mail</h3>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários vejam seu e-mail
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant={privacySettings.showEmail ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('showEmail')}
            >
              {privacySettings.showEmail ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          {/* Location Visibility */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Mostrar Localização</h3>
                <p className="text-sm text-muted-foreground">
                  Compartilhar sua localização com outros usuários
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant={privacySettings.showLocation ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('showLocation')}
            >
              {privacySettings.showLocation ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          {/* Messaging Permissions */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Permitir Mensagens</h3>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários enviem mensagens para você
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant={privacySettings.allowMessaging ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('allowMessaging')}
            >
              {privacySettings.allowMessaging ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          {/* Activity Sharing */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <label className="font-medium">Compartilhar Atividade</label>
            </div>
            <p className="text-sm text-muted-foreground">
              Controle quem pode ver sua atividade recente
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {['public', 'friends', 'private'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect('shareActivity', option)}
                  className={`px-4 py-2 text-sm rounded-lg border ${
                    privacySettings.shareActivity === option
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-muted border-border'
                  }`}
                >
                  {option === 'public' && 'Público'}
                  {option === 'friends' && 'Amigos'}
                  {option === 'private' && 'Privado'}
                </button>
              ))}
            </div>
          </div>

          {/* Analytics */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <h3 className="font-medium">Dados de Uso e Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Permitir coleta de dados para melhorar a experiência
                </p>
              </div>
            </div>
            <Button
              type="button"
              variant={privacySettings.analytics ? "default" : "outline"}
              size="sm"
              onClick={() => handleToggle('analytics')}
            >
              {privacySettings.analytics ? 'Ativado' : 'Desativado'}
            </Button>
          </div>

          <Button type="submit" className="mt-4">
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </form>
      </div>

      {/* Data Management */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Gerenciamento de Dados</h2>
        <p className="text-muted-foreground mb-6">
          Controle seus dados pessoais e solicite remoção
        </p>
        
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-medium">Baixar Dados</h3>
              <p className="text-sm text-muted-foreground">Obtenha uma cópia de todos os seus dados</p>
            </div>
            <Button variant="outline" size="sm">
              Solicitar
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-medium">Excluir Conta</h3>
              <p className="text-sm text-muted-foreground">Remover permanentemente sua conta</p>
            </div>
            <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
              Excluir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}