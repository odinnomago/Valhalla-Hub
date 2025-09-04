'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Edit, 
  Trash2, 
  ToggleLeft,
  ToggleRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function AlertsReportsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'Receita Mensal',
      description: 'Alerta quando a receita mensal ultrapassar R$ 50.000',
      active: true,
      condition: 'revenue > 50000',
      frequency: 'monthly'
    },
    {
      id: 2,
      name: 'Queda de Streams',
      description: 'Alerta quando houver uma queda de 20% nos streams em 24h',
      active: true,
      condition: 'streams_decrease > 20%',
      frequency: 'daily'
    },
    {
      id: 3,
      name: 'Novo Lançamento',
      description: 'Notificação quando um novo lançamento for aprovado',
      active: false,
      condition: 'new_release_approved',
      frequency: 'realtime'
    }
  ]);

  const [newAlert, setNewAlert] = useState({
    name: '',
    description: '',
    condition: '',
    frequency: 'daily'
  });

  const [editingAlert, setEditingAlert] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleCreateAlert = () => {
    if (newAlert.name && newAlert.description && newAlert.condition) {
      const alert = {
        id: alerts.length + 1,
        ...newAlert,
        active: true
      };
      setAlerts([...alerts, alert]);
      setNewAlert({ name: '', description: '', condition: '', frequency: 'daily' });
      setShowForm(false);
    }
  };

  const handleUpdateAlert = () => {
    if (editingAlert !== null && newAlert.name && newAlert.description && newAlert.condition) {
      setAlerts(alerts.map(alert => 
        alert.id === editingAlert 
          ? { ...alert, ...newAlert }
          : alert
      ));
      setEditingAlert(null);
      setNewAlert({ name: '', description: '', condition: '', frequency: 'daily' });
      setShowForm(false);
    }
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const toggleAlertStatus = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id 
        ? { ...alert, active: !alert.active }
        : alert
    ));
  };

  const startEditing = (id: number) => {
    const alert = alerts.find(a => a.id === id);
    if (alert) {
      setNewAlert({
        name: alert.name,
        description: alert.description,
        condition: alert.condition,
        frequency: alert.frequency
      });
      setEditingAlert(id);
      setShowForm(true);
    }
  };

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diário';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensal';
      case 'realtime': return 'Tempo Real';
      default: return frequency;
    }
  };

  const getStatusIcon = (active: boolean) => {
    return active ? 
      <CheckCircle className="h-5 w-5 text-green-500" /> : 
      <XCircle className="h-5 w-5 text-red-500" />;
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Configurar Alertas</h1>
          <p className="text-muted-foreground">Defina notificações para eventos importantes</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Alerta
        </Button>
      </div>

      {/* Alert Form */}
      {showForm && (
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <h2 className="text-xl font-semibold mb-4">
            {editingAlert ? 'Editar Alerta' : 'Criar Novo Alerta'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Nome do Alerta</label>
              <Input
                value={newAlert.name}
                onChange={(e) => setNewAlert({...newAlert, name: e.target.value})}
                placeholder="Ex: Receita Mensal"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Frequência</label>
              <select
                className="w-full border border-border/50 rounded-md p-2 bg-background"
                value={newAlert.frequency}
                onChange={(e) => setNewAlert({...newAlert, frequency: e.target.value})}
              >
                <option value="realtime">Tempo Real</option>
                <option value="daily">Diário</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensal</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Descrição</label>
              <Textarea
                value={newAlert.description}
                onChange={(e) => setNewAlert({...newAlert, description: e.target.value})}
                placeholder="Descreva quando este alerta deve ser acionado"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 block">Condição</label>
              <Input
                value={newAlert.condition}
                onChange={(e) => setNewAlert({...newAlert, condition: e.target.value})}
                placeholder="Ex: revenue > 50000 OU streams_decrease > 20%"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use expressões como: revenue &gt; valor, streams_decrease &gt; porcentagem, etc.
              </p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {editingAlert ? (
              <Button onClick={handleUpdateAlert}>Atualizar Alerta</Button>
            ) : (
              <Button onClick={handleCreateAlert}>Criar Alerta</Button>
            )}
            <Button 
              variant="outline" 
              onClick={() => {
                setShowForm(false);
                setEditingAlert(null);
                setNewAlert({ name: '', description: '', condition: '', frequency: 'daily' });
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {/* Active Alerts */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Alertas Configurados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Alerta</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Condição</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Frequência</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {alerts.length > 0 ? (
                alerts.map((alert) => (
                  <tr key={alert.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{alert.name}</div>
                        <div className="text-sm text-muted-foreground">{alert.description}</div>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-sm">{alert.condition}</td>
                    <td className="p-4">
                      <span className="bg-muted px-2 py-1 rounded-full text-xs">
                        {getFrequencyLabel(alert.frequency)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(alert.active)}
                        <span>{alert.active ? 'Ativo' : 'Inativo'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => toggleAlertStatus(alert.id)}
                        >
                          {alert.active ? (
                            <ToggleLeft className="h-4 w-4 mr-1" />
                          ) : (
                            <ToggleRight className="h-4 w-4 mr-1" />
                          )}
                          {alert.active ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => startEditing(alert.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteAlert(alert.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhum alerta configurado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Alert Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Modelos de Alertas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <AlertTriangle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Receita Alta</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Notificação quando a receita mensal ultrapassar um valor específico
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setNewAlert({
                  name: 'Receita Alta',
                  description: 'Notificação quando a receita mensal ultrapassar R$ 50.000',
                  condition: 'revenue > 50000',
                  frequency: 'monthly'
                });
                setShowForm(true);
              }}
            >
              Usar Modelo
            </Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Queda de Desempenho</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Alerta quando houver uma queda significativa em métricas importantes
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setNewAlert({
                  name: 'Queda de Desempenho',
                  description: 'Alerta quando houver uma queda de 20% nos streams em 24h',
                  condition: 'streams_decrease > 20%',
                  frequency: 'daily'
                });
                setShowForm(true);
              }}
            >
              Usar Modelo
            </Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Novo Lançamento</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Notificação quando um novo lançamento for aprovado ou publicado
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setNewAlert({
                  name: 'Novo Lançamento',
                  description: 'Notificação quando um novo lançamento for aprovado',
                  condition: 'new_release_approved',
                  frequency: 'realtime'
                });
                setShowForm(true);
              }}
            >
              Usar Modelo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}