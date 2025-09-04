'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Mail,
  Bell,
  Shield,
  CreditCard,
  Users,
  Palette,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Valhalla Hub',
    siteDescription: 'A plataforma definitiva para artistas e criadores de conteúdo',
    adminEmail: 'admin@valhallahub.com',
    supportEmail: 'suporte@valhallahub.com',
    notifications: true,
    maintenanceMode: false,
    allowRegistrations: true,
    maxUploadSize: 100,
    defaultCommission: 15
  });

  const handleSaveSettings = () => {
    // This will be replaced with actual functionality
    console.log('Saving settings:', settings);
    alert('Configurações salvas com sucesso!');
  };

  const settingCategories = [
    {
      id: 'general',
      title: 'Configurações Gerais',
      icon: <Globe className="h-5 w-5" />,
      settings: [
        { id: 'siteName', label: 'Nome do Site', type: 'text' },
        { id: 'siteDescription', label: 'Descrição do Site', type: 'textarea' },
        { id: 'adminEmail', label: 'E-mail do Administrador', type: 'email' },
        { id: 'supportEmail', label: 'E-mail de Suporte', type: 'email' }
      ]
    },
    {
      id: 'features',
      title: 'Recursos do Sistema',
      icon: <Settings className="h-5 w-5" />,
      settings: [
        { id: 'notifications', label: 'Notificações do Sistema', type: 'switch' },
        { id: 'maintenanceMode', label: 'Modo de Manutenção', type: 'switch' },
        { id: 'allowRegistrations', label: 'Permitir Novos Registros', type: 'switch' }
      ]
    },
    {
      id: 'limits',
      title: 'Limites e Restrições',
      icon: <Shield className="h-5 w-5" />,
      settings: [
        { id: 'maxUploadSize', label: 'Tamanho Máximo de Upload (MB)', type: 'number' },
        { id: 'defaultCommission', label: 'Comissão Padrão (%)', type: 'number' }
      ]
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-muted-foreground">Gerencie as configurações globais da plataforma</p>
        </div>
        <Button onClick={handleSaveSettings} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Salvar Configurações
        </Button>
      </div>

      {/* Settings Categories */}
      <div className="space-y-6">
        {settingCategories.map((category) => (
          <div key={category.id} className="bg-card border border-border/50 rounded-xl overflow-hidden">
            <div className="p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
              </div>
            </div>
            <div className="p-5 space-y-4">
              {category.settings.map((setting) => (
                <div key={setting.id} className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="md:w-1/3">
                    <label className="text-sm font-medium">{setting.label}</label>
                  </div>
                  <div className="md:w-2/3">
                    {setting.type === 'switch' ? (
                      <Switch
                        checked={settings[setting.id as keyof typeof settings] as boolean}
                        onCheckedChange={(checked) => 
                          setSettings({...settings, [setting.id]: checked})
                        }
                      />
                    ) : setting.type === 'textarea' ? (
                      <Textarea
                        value={settings[setting.id as keyof typeof settings] as string}
                        onChange={(e) => 
                          setSettings({...settings, [setting.id]: e.target.value})
                        }
                        rows={3}
                      />
                    ) : (
                      <Input
                        type={setting.type}
                        value={settings[setting.id as keyof typeof settings] as string | number}
                        onChange={(e) => {
                          const value = setting.type === 'number' 
                            ? parseFloat(e.target.value) || 0 
                            : e.target.value;
                          setSettings({...settings, [setting.id]: value});
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* System Information */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Informações do Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Settings className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Versão da Plataforma</h3>
            </div>
            <p className="text-2xl font-bold">v2.1.4</p>
            <p className="text-sm text-muted-foreground mt-1">Última atualização: 15/04/2024</p>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-medium">Usuários Ativos</h3>
            </div>
            <p className="text-2xl font-bold">1,248</p>
            <p className="text-sm text-muted-foreground mt-1">+12% em relação ao mês anterior</p>
          </div>
        </div>
      </div>
    </div>
  );
}