'use client';

import React, { useState } from 'react';
import { 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Download,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EventBudgetsPage() {
  // This will be replaced with real data from user context/hooks
  const [budgets] = useState<any[]>([]);

  const handleDownloadBudget = (id: number) => {
    // This will be replaced with actual budget download functionality
    console.log('Downloading budget:', id);
  };

  const handleApproveBudget = (id: number) => {
    // This will be replaced with actual budget approval functionality
    console.log('Approving budget:', id);
  };

  const handleRejectBudget = (id: number) => {
    // This will be replaced with actual budget rejection functionality
    console.log('Rejecting budget:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Orçamentos</h1>
          <p className="text-muted-foreground">Gerencie os orçamentos dos seus eventos</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar Todos
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Orçamentos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Orçamentos Aprovados</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Valor Total</p>
              <p className="text-2xl font-bold mt-1">R$ 0,00</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Budgets List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Orçamentos Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {budgets.length > 0 ? (
                budgets.map((budget) => (
                  <tr key={budget.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{budget.event || 'Evento não especificado'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {budget.date || 'Data não especificada'}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{budget.amount || 'R$ 0,00'}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        budget.status === 'approved' 
                          ? 'bg-green-100 text-green-800' 
                          : budget.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {budget.status === 'approved' ? 'Aprovado' : 
                         budget.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDownloadBudget(budget.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleApproveBudget(budget.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectBudget(budget.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhum orçamento encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget Template */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Modelo de Orçamento</h2>
        <p className="text-muted-foreground mb-4">
          Use nosso modelo padrão para criar orçamentos profissionais
        </p>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Baixar Modelo
        </Button>
      </div>
    </div>
  );
}