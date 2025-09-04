'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  Smartphone, 
  Mail, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  EyeOff,
  RotateCcw,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function SecuritySettingsPage() {
  // This will be replaced with real data from user context/hooks
  const [showPassword, setShowPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be replaced with actual password change functionality
    console.log('Changing password:', passwordForm);
  };

  const handleEnable2FA = () => {
    // This will be replaced with actual 2FA enable functionality
    console.log('Enabling 2FA');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Segurança da Conta</h1>
        <p className="text-muted-foreground">Gerencie a segurança e proteção da sua conta</p>
      </div>

      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Autenticação de Dois Fatores</h2>
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="font-medium mb-2">Autenticação por Aplicativo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Use um aplicativo de autenticação como Google Authenticator ou Authy para gerar códigos de verificação.
            </p>
            <Button onClick={handleEnable2FA}>
              <Shield className="h-4 w-4 mr-2" />
              Ativar 2FA
            </Button>
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium mb-2">Mensagens de Texto (SMS)</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba códigos de verificação por SMS no seu telefone.
            </p>
            <Button variant="outline" disabled>
              <Smartphone className="h-4 w-4 mr-2" />
              Configurar SMS
            </Button>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Alterar Senha</h2>
        
        <form onSubmit={handleSubmitPassword} className="space-y-4 max-w-md">
          <div>
            <Label htmlFor="currentPassword">Senha Atual</Label>
            <div className="relative mt-1">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? "text" : "password"}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          
          <div>
            <Label htmlFor="newPassword">Nova Senha</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1"
              required
            />
          </div>
          
          <Button type="submit">
            <RotateCcw className="h-4 w-4 mr-2" />
            Atualizar Senha
          </Button>
        </form>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Dispositivos Conectados</h2>
        
        <div className="space-y-4">
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">iPhone 13 Pro</h3>
                  <p className="text-sm text-muted-foreground">Último acesso: Hoje, 14:30</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Ativo
                </span>
                <Button variant="outline" size="sm">Desconectar</Button>
              </div>
            </div>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">MacBook Pro</h3>
                  <p className="text-sm text-muted-foreground">Último acesso: Ontem, 09:15</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  Ativo
                </span>
                <Button variant="outline" size="sm">Desconectar</Button>
              </div>
            </div>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Windows PC</h3>
                  <p className="text-sm text-muted-foreground">Último acesso: 15/03/2024</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Desconectar</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Histórico de Atividades</h2>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
              <CheckCircle className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Login realizado</p>
              <p className="text-sm text-muted-foreground">iPhone 13 Pro • Hoje, 14:30 • São Paulo, BR</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
              <Key className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Senha alterada</p>
              <p className="text-sm text-muted-foreground">MacBook Pro • Ontem, 16:45 • São Paulo, BR</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-1.5 rounded-full mt-0.5">
              <AlertTriangle className="h-4 w-4 text-yellow-800" />
            </div>
            <div>
              <p className="font-medium">Tentativa de login falhou</p>
              <p className="text-sm text-muted-foreground">Dispositivo desconhecido • 12/03/2024, 03:22 • Moscou, RUS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}