'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Play, 
  Pause, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Mail,
  Smartphone,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketingAutomationPage() {
  // This will be replaced with real data from user context/hooks
  const [automations, setAutomations] = useState<any[]>([]);
  const [activeAutomation, setActiveAutomation] = useState<number | null>(null);

  const toggleAutomation = (id: number) => {
    if (activeAutomation === id) {
      setActiveAutomation(null);
    } else {
      setActiveAutomation(id);
    }
  };

  const handleDeleteAutomation = (id: number) => {
    setAutomations(prev => prev.filter(automation => automation.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Automação de Marketing</h1>
          <p className="text-muted-foreground">Configure sequências automatizadas para engajar sua audiência</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Automações Ativas</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Play className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contatos Envolvidos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">E-mails Enviados</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
              <p className="text-2xl font-bold mt-1">0%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Automation Workflows */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Fluxos de Automação</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Nome</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Gatilho</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Contatos</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {automations.length > 0 ? (
                automations.map((automation) => (
                  <tr key={automation.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{automation.name || 'Automação sem nome'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {automation.trigger || 'Gatilho não definido'}
                      </div>
                    </td>
                    <td className="p-4">{automation.contacts || 0}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {activeAutomation === automation.id ? (
                          <>
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-green-600">Ativa</span>
                          </>
                        ) : (
                          <>
                            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
                            <span className="text-gray-500">Inativa</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => toggleAutomation(automation.id)}
                        >
                          {activeAutomation === automation.id ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeleteAutomation(automation.id)}
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
                    Nenhuma automação configurada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Modelos de Automação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Sequência de Boas-vindas</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Envie uma série de e-mails para novos contatos
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Reengajamento</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Reative contatos inativos com mensagens especiais
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Pós-evento</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Envie follow-ups após eventos ou lançamentos
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}