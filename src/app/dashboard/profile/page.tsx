'use client';

import React, { useState } from 'react';
import { 
  User, 
  Key, 
  Lock, 
  Bell, 
  Smartphone, 
  Palette, 
  Globe, 
  Monitor,
  Camera,
  X,
  Check,
  Shield,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Upload,
  Languages,
  Clock,
  CreditCard,
  SmartphoneIcon,
  Wand2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [connectedAccounts, setConnectedAccounts] = useState([
    { id: 1, name: 'Spotify', connected: false, icon: MusicIcon },
    { id: 2, name: 'YouTube', connected: false, icon: MusicIcon },
    { id: 3, name: 'Instagram', connected: false, icon: SmartphoneIcon },
    { id: 4, name: 'Twitter', connected: false, icon: SmartphoneIcon },
    { id: 5, name: 'Ableton Live', connected: false, icon: Wand2 },
    { id: 6, name: 'Stripe', connected: false, icon: CreditCard },
  ]);

  const tabs = [
    { id: 'personal', label: 'Informações Pessoais', icon: User },
    { id: 'account', label: 'Conta', icon: Key },
    { id: 'preferences', label: 'Preferências', icon: Palette },
    { id: 'integrations', label: 'Integrações', icon: Smartphone },
  ];

  const toggleAccountConnection = (id: number) => {
    setConnectedAccounts(connectedAccounts.map(account => 
      account.id === id 
        ? { ...account, connected: !account.connected } 
        : account
    ));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Configurações do Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        {activeTab === 'personal' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Informações Pessoais</h2>
              <p className="text-muted-foreground mb-6">
                Atualize suas informações pessoais e detalhes de contato
              </p>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-accent w-20 h-20 rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {/* User's initial will be displayed here */}
                </div>
                <button className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                  <Camera className="h-4 w-4 text-primary-foreground" />
                </button>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Alterar
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remover
                </Button>
              </div>
            </div>

            {/* Personal Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nome Completo</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nome Artístico</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Seu nome artístico"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Biografia</label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Conte um pouco sobre você"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Data de Nascimento</label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gênero</label>
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Selecione seu gênero</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                  <option>Não-binário</option>
                  <option>Outro</option>
                  <option>Prefiro não dizer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CPF/CNPJ</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="000.000.000-00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefone</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="tel"
                    className="w-full rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Localização</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    className="w-full rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Sua cidade, estado"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Site</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="url"
                    className="w-full rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="https://www.seusite.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Idioma Principal</label>
                <div className="relative">
                  <Languages className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <select className="w-full rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Português (BR)</option>
                    <option>English (US)</option>
                    <option>Español (ES)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Fuso Horário</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <select className="w-full rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>(GMT-3) São Paulo</option>
                    <option>(GMT-2) Noronha</option>
                    <option>(GMT-4) Manaus</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button>Salvar Alterações</Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Configurações de Conta</h2>
              <p className="text-muted-foreground mb-6">
                Gerencie sua conta, segurança e dispositivos conectados
              </p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="flex gap-3">
                <input
                  type="email"
                  className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="seu@email.com"
                />
                <Button variant="outline">Verificar</Button>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                  />
                  <button 
                    className="absolute right-3 top-2.5 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <Button variant="outline">Alterar</Button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                  <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                </div>
                <Button variant="outline">Ativar</Button>
              </div>
            </div>

            {/* Connected Devices */}
            <div>
              <h3 className="font-medium mb-3">Dispositivos Conectados</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">Nenhum dispositivo conectado</p>
              </div>
            </div>

            {/* Login History */}
            <div>
              <h3 className="font-medium mb-3">Histórico de Login</h3>
              <div className="space-y-3">
                <p className="text-muted-foreground text-sm">Nenhum login registrado</p>
              </div>
            </div>

            {/* Delete Account */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-500">Excluir Conta</h3>
                  <p className="text-sm text-muted-foreground">Esta ação não pode ser desfeita</p>
                </div>
                <Button variant="destructive">Excluir Permanentemente</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Preferências</h2>
              <p className="text-muted-foreground mb-6">
                Personalize sua experiência na plataforma
              </p>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium mb-2">Idioma</label>
              <select className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Português (BR)</option>
                <option>English (US)</option>
                <option>Español (ES)</option>
              </select>
            </div>

            {/* Timezone */}
            <div>
              <label className="block text-sm font-medium mb-2">Fuso Horário</label>
              <select className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>(GMT-3) São Paulo</option>
                <option>(GMT-2) Noronha</option>
                <option>(GMT-4) Manaus</option>
              </select>
            </div>

            {/* Date Format */}
            <div>
              <label className="block text-sm font-medium mb-2">Formato de Data</label>
              <select className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>DD/MM/AAAA</option>
                <option>MM/DD/AAAA</option>
                <option>AAAA-MM-DD</option>
              </select>
            </div>

            {/* Currency */}
            <div>
              <label className="block text-sm font-medium mb-2">Formato de Moeda</label>
              <select className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>R$ (BRL)</option>
                <option>$ (USD)</option>
                <option>€ (EUR)</option>
              </select>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="font-medium mb-3">Notificações</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">Receba notificações por email</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push</p>
                    <p className="text-sm text-muted-foreground">Notificações push no dispositivo</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS</p>
                    <p className="text-sm text-muted-foreground">Receba notificações por SMS</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
              </div>
            </div>

            {/* Report Frequency */}
            <div>
              <label className="block text-sm font-medium mb-2">Frequência de Relatórios</label>
              <select className="w-full max-w-xs rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Diário</option>
                <option>Semanal</option>
                <option>Mensal</option>
              </select>
            </div>

            {/* Privacy */}
            <div>
              <h3 className="font-medium mb-3">Privacidade</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Perfil público</p>
                    <p className="text-sm text-muted-foreground">Seu perfil é visível para outros usuários</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar estatísticas</p>
                    <p className="text-sm text-muted-foreground">Exibir suas estatísticas publicamente</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Permitir mensagens</p>
                    <p className="text-sm text-muted-foreground">Permitir que outros usuários enviem mensagens</p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
              </div>
            </div>

            {/* Theme */}
            <div>
              <h3 className="font-medium mb-3">Tema</h3>
              <div className="flex gap-3">
                <Button variant="outline">Claro</Button>
                <Button className="bg-primary text-primary-foreground">Escuro</Button>
                <Button variant="outline">Automático</Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Integrações</h2>
              <p className="text-muted-foreground mb-6">
                Conecte suas contas e ferramentas externas
              </p>
            </div>

            {/* Streaming Platforms */}
            <div>
              <h3 className="font-medium mb-3">Plataformas de Streaming</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {connectedAccounts.filter(a => ['Spotify', 'YouTube', 'Apple Music', 'Deezer'].includes(a.name)).map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <account.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.connected ? 'Conectado' : 'Não conectado'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={account.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleAccountConnection(account.id)}
                    >
                      {account.connected ? 'Gerenciar' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Networks */}
            <div>
              <h3 className="font-medium mb-3">Redes Sociais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {connectedAccounts.filter(a => ['Instagram', 'Twitter', 'TikTok', 'Facebook'].includes(a.name)).map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <account.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.connected ? 'Conectado' : 'Não conectado'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={account.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleAccountConnection(account.id)}
                    >
                      {account.connected ? 'Gerenciar' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Production Tools */}
            <div>
              <h3 className="font-medium mb-3">Ferramentas de Produção</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {connectedAccounts.filter(a => ['Ableton Live', 'Pro Tools', 'Logic Pro', 'FL Studio'].includes(a.name)).map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <account.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.connected ? 'Conectado' : 'Não conectado'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={account.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleAccountConnection(account.id)}
                    >
                      {account.connected ? 'Gerenciar' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Services */}
            <div>
              <h3 className="font-medium mb-3">Serviços de Pagamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {connectedAccounts.filter(a => ['Stripe', 'PayPal', 'Mercado Pago'].includes(a.name)).map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <account.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{account.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {account.connected ? 'Conectado' : 'Não conectado'}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant={account.connected ? "outline" : "default"}
                      size="sm"
                      onClick={() => toggleAccountConnection(account.id)}
                    >
                      {account.connected ? 'Gerenciar' : 'Conectar'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper components for icons not imported
const MusicIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
const Wand2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.828 14.828a4 4 0 0 1-5.656 0M8 12h2m4 0h2m-2-2v2m0-6v2m8 8h-2m-4 0h-4m-8-8h2m4 0h4M8 8h.01M16 16h.01"></path></svg>;
const CreditCardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>;