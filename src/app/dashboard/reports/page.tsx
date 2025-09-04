'use client';

import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  FileBarChart, 
  Globe, 
  Download,
  Calendar,
  AlertCircle,
  Play,
  Music,
  MapPin,
  ShoppingCart,
  Users,
  Megaphone,
  CalendarIcon,
  Ticket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('overview');
  const [period, setPeriod] = useState('monthly');

  const reportTypes = [
    { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
    { id: 'platform', label: 'Por Plataforma', icon: Globe },
    { id: 'comparison', label: 'Comparativo', icon: TrendingUp },
  ];

  const periods = [
    { id: 'daily', label: 'Diário' },
    { id: 'weekly', label: 'Semanal' },
    { id: 'monthly', label: 'Mensal' },
    { id: 'yearly', label: 'Anual' },
  ];

  const platformMetrics = [
    { platform: 'Gravadora Digital', icon: Music, value: '12.5K', change: '+12%', color: 'bg-blue-500' },
    { platform: 'Agência de Bookings', icon: MapPin, value: '45', change: '+8%', color: 'bg-green-500' },
    { platform: 'Agência de Marketing IA', icon: Megaphone, value: '2.3K', change: '+25%', color: 'bg-purple-500' },
    { platform: 'Marketplace', icon: ShoppingCart, value: 'R$ 8.7K', change: '+15%', color: 'bg-orange-500' },
    { platform: 'Portal de Membros', icon: Users, value: '1.2K', change: '+5%', color: 'bg-teal-500' },
    { platform: 'Academy', icon: Play, value: '320', change: '+18%', color: 'bg-yellow-500' },
    { platform: 'Blog', icon: FileBarChart, value: '45.2K', change: '+32%', color: 'bg-pink-500' },
    { platform: 'Eventos', icon: CalendarIcon, value: '18', change: '+3%', color: 'bg-indigo-500' },
    { platform: 'Ingressos', icon: Ticket, value: '2.1K', change: '+22%', color: 'bg-red-500' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Relatórios</h1>
          <p className="text-muted-foreground">Analise seu desempenho e métricas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="border-b border-border">
        <nav className="-mb-px flex space-x-8">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                reportType === type.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <type.icon className="h-4 w-4" />
              {type.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-2">Período</label>
          <div className="flex gap-2">
            {periods.map((p) => (
              <Button
                key={p.id}
                variant={period === p.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPeriod(p.id)}
              >
                {p.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Data Personalizada</label>
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="De"
                className="rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Até"
                className="rounded-lg border border-border bg-background pl-10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                onFocus={(e) => e.target.type = 'date'}
                onBlur={(e) => e.target.type = 'text'}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platformMetrics.map((metric, index) => (
          <div key={index} className="bg-card border border-border/50 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${metric.color} bg-opacity-20`}>
                  <metric.icon className={`h-5 w-5 ${metric.color.replace('bg-', 'text-')}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{metric.platform}</p>
                  <p className="text-xl font-bold mt-1">{metric.value}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-green-500 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {metric.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Placeholder */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Desempenho por Plataforma</h2>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </div>
        
        <div className="h-80 flex items-center justify-center bg-muted/50 rounded-lg">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Gráfico de barras será exibido aqui</p>
            <p className="text-sm text-muted-foreground mt-1">Mostrando dados de receita por plataforma</p>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Métricas Disponíveis</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Receita Total</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>Streaming</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Vendas</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span>Engajamento</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span>Eventos</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
            <div className="flex items-center justify-between p-3 hover:bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Crescimento</span>
              </div>
              <Button variant="outline" size="sm">✓</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Configurar Alertas</h2>
            <Button>
              <AlertCircle className="h-4 w-4 mr-2" />
              Criar Novo Alerta
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Receita Mensal</h3>
                  <p className="text-sm text-muted-foreground">Alertar quando ultrapassar R$ 10.000</p>
                </div>
                <Button variant="outline" size="sm">Ativado</Button>
              </div>
            </div>
            
            <div className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Novos Seguidores</h3>
                  <p className="text-sm text-muted-foreground">Alertar quando ganhar 100 seguidores</p>
                </div>
                <Button variant="outline" size="sm">Ativado</Button>
              </div>
            </div>
            
            <div className="p-4 border border-border/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Vendas no Marketplace</h3>
                  <p className="text-sm text-muted-foreground">Alertar quando vender 5 produtos</p>
                </div>
                <Button variant="outline" size="sm">Desativado</Button>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              <AlertCircle className="h-4 w-4 mr-2" />
              Gerenciar Alertas
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}