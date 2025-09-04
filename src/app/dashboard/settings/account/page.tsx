'use client';

import React, { useState } from 'react';
import { Key, Eye, EyeOff, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountSettingsPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change requested:', formData);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Configurações da Conta</h1>
        <p className="text-muted-foreground">Gerencie as configurações e preferências da sua conta</p>
      </div>

      {/* Change Password Section */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
        <p className="text-muted-foreground mb-6">
          Atualize sua senha regularmente para manter sua conta segura
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-2">Senha Atual</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showCurrentPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Nova Senha</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Digite sua nova senha"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Confirmar Nova Senha</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirme sua nova senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="mt-4">
            <Save className="h-4 w-4 mr-2" />
            Atualizar Senha
          </Button>
        </form>
      </div>

      {/* Account Management */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Gerenciamento da Conta</h2>
        <p className="text-muted-foreground mb-6">
          Configure opções avançadas da sua conta
        </p>
        
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-medium">Autenticação de Dois Fatores</h3>
              <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
            </div>
            <Button variant="outline" size="sm">
              Configurar
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-medium">Sessões Ativas</h3>
              <p className="text-sm text-muted-foreground">Gerencie dispositivos conectados</p>
            </div>
            <Button variant="outline" size="sm">
              Ver Todas
            </Button>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h3 className="font-medium">Exportar Dados</h3>
              <p className="text-sm text-muted-foreground">Baixe uma cópia dos seus dados</p>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}