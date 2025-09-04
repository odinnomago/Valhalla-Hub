'use client';

import React, { useState } from 'react';
import { 
  Monitor, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  Clock,
  RefreshCw,
  Server,
  Database,
  Globe,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HelpStatusPage() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // This will be replaced with real data from an API
  const [systemStatus] = useState({
    overall: 'operational',
    lastIncident: '2024-04-15T10:30:00Z',
    uptime: 99.98
  });

  const services = [
    {
      id: 1,
      name: 'Plataforma Principal',
      status: 'operational',
      description: 'Interface principal do dashboard',
      responseTime: '42ms'
    },
    {
      id: 2,
      name: 'API de Dados',
      status: 'operational',
      description: 'API para acesso aos dados',
      responseTime: '87ms'
    },
    {
      id: 3,
      name: 'Serviço de Streaming',
      status: 'operational',
      description: 'Processamento de streams em tempo real',
      responseTime: '124ms'
    },
    {
      id: 4,
      name: 'Banco de Dados',
      status: 'operational',
      description: 'Armazenamento de dados',
      responseTime: '28ms'
    },
    {
      id: 5,
      name: 'Autenticação',
      status: 'operational',
      description: 'Sistema de login e segurança',
      responseTime: '65ms'
    },
    {
      id: 6,
      name: 'Notificações',
      status: 'partial-outage',
      description: 'Sistema de notificações push',
      responseTime: 'N/A'
    },
    {
      id: 7,
      name: 'Relatórios',
      status: 'operational',
      description: 'Geração de relatórios',
      responseTime: '156ms'
    },
    {
      id: 8,
      name: 'Backup',
      status: 'operational',
      description: 'Sistema de backup automático',
      responseTime: 'N/A'
    }
  ];

  const incidents = [
    {
      id: 1,
      title: 'Interrupção no serviço de notificações',
      status: 'resolved',
      severity: 'minor',
      startedAt: '2024-04-15T08:15:00Z',
      resolvedAt: '2024-04-15T10:30:00Z',
      description: 'Usuários relataram problemas ao receber notificações push. O problema foi identificado e resolvido.'
    },
    {
      id: 2,
      title: 'Atraso na atualização de estatísticas',
      status: 'resolved',
      severity: 'minor',
      startedAt: '2024-04-10T14:22:00Z',
      resolvedAt: '2024-04-10T16:45:00Z',
      description: 'As estatísticas de streaming estavam com atraso na atualização. O serviço foi restaurado.'
    },
    {
      id: 3,
      title: 'Manutenção programada',
      status: 'scheduled',
      severity: 'maintenance',
      startedAt: '2024-04-20T02:00:00Z',
      resolvedAt: '2024-04-20T06:00:00Z',
      description: 'Manutenção programada para melhorias de infraestrutura.'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'partial-outage':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'major-outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-blue-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational':
        return 'Operacional';
      case 'partial-outage':
        return 'Interrupção Parcial';
      case 'major-outage':
        return 'Interrupção Maior';
      case 'scheduled':
        return 'Programado';
      case 'resolved':
        return 'Resolvido';
      case 'maintenance':
        return 'Manutenção';
      default:
        return 'Operacional';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'partial-outage':
        return 'bg-yellow-100 text-yellow-800';
      case 'major-outage':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const refreshStatus = () => {
    setLastUpdated(new Date());
    // In a real implementation, this would fetch updated status data
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Status do Sistema</h1>
          <p className="text-muted-foreground">Verifique a disponibilidade dos nossos serviços</p>
        </div>
        <Button onClick={refreshStatus} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>

      {/* Overall Status */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-lg">
              {systemStatus.overall === 'operational' ? (
                <CheckCircle className="h-8 w-8 text-green-500" />
              ) : (
                <AlertTriangle className="h-8 w-8 text-yellow-500" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                {systemStatus.overall === 'operational' ? 'Todos os Sistemas Operacionais' : 'Problemas Detectados'}
              </h2>
              <p className="text-muted-foreground">
                Última atualização: {lastUpdated.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">Uptime (30 dias)</span>
              <span className="text-sm font-medium">{systemStatus.uptime}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${systemStatus.uptime}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Status */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Status dos Serviços</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Serviço</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Tempo de Resposta</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        {service.id === 1 && <Monitor className="h-5 w-5 text-primary" />}
                        {service.id === 2 && <Server className="h-5 w-5 text-primary" />}
                        {service.id === 3 && <Globe className="h-5 w-5 text-primary" />}
                        {service.id === 4 && <Database className="h-5 w-5 text-primary" />}
                        {service.id === 5 && <Shield className="h-5 w-5 text-primary" />}
                        {service.id === 6 && <MessageCircle className="h-5 w-5 text-primary" />}
                        {service.id === 7 && <BarChart3 className="h-5 w-5 text-primary" />}
                        {service.id === 8 && <RefreshCw className="h-5 w-5 text-primary" />}
                      </div>
                      {service.name}
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{service.description}</td>
                  <td className="p-4">{service.responseTime}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                        {getStatusText(service.status)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Incidents */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Incidentes Recentes</h2>
        </div>
        <div className="divide-y divide-border/50">
          {incidents.map((incident) => (
            <div key={incident.id} className="p-5">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(incident.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.severity)}`}>
                    {getStatusText(incident.severity)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{incident.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {new Date(incident.startedAt).toLocaleString('pt-BR')} - 
                        {incident.resolvedAt ? new Date(incident.resolvedAt).toLocaleString('pt-BR') : ' Em andamento'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                    {getStatusText(incident.status)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe to Updates */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">Receba Atualizações</h3>
            <p className="text-muted-foreground">
              Inscreva-se para receber notificações sobre incidentes e manutenções programadas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Inscrever por E-mail
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Inscrever por SMS
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}