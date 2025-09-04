'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  Pause,
  Play,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SubscriptionManagementPage() {
  // This will be replaced with real data from user context/hooks
  const [subscription] = useState({
    plan: 'FREE',
    status: 'active',
    renewalDate: '',
    amount: 'R$ 0,00',
    paymentMethod: 'N/A',
    nextBilling: ''
  });

  const handleCancelSubscription = () => {
    // This will be replaced with actual subscription cancellation functionality
    console.log('Cancelling subscription');
  };

  const handleChangePlan = () => {
    // This will be replaced with actual plan change functionality
    console.log('Changing plan');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Gerenciar Assinatura</h1>
        <p className="text-muted-foreground">Gerencie seu plano de assinatura e forma de pagamento</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Plano {subscription.plan}</h2>
                <p className="text-muted-foreground">
                  {subscription.nextBilling 
                    ? `Próxima cobrança: ${subscription.nextBilling}` 
                    : 'Sem data de renovação'}
                </p>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                subscription.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : subscription.status === 'cancelled'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {subscription.status === 'active' && <CheckCircle className="h-4 w-4 mr-1" />}
                {subscription.status === 'cancelled' && <XCircle className="h-4 w-4 mr-1" />}
                {subscription.status === 'pending' && <AlertTriangle className="h-4 w-4 mr-1" />}
                {subscription.status === 'active' ? 'Ativo' : 
                 subscription.status === 'cancelled' ? 'Cancelado' : 'Pendente'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleChangePlan}>
              <Play className="h-4 w-4 mr-2" />
              Alterar Plano
            </Button>
            {subscription.status === 'active' ? (
              <Button variant="outline" onClick={handleCancelSubscription}>
                <Pause className="h-4 w-4 mr-2" />
                Pausar Assinatura
              </Button>
            ) : (
              <Button>
                <Play className="h-4 w-4 mr-2" />
                Reativar Assinatura
              </Button>
            )}
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-border/50 rounded-lg p-4">
            <h3 className="font-medium mb-1">Valor</h3>
            <p className="text-2xl font-bold">{subscription.amount}</p>
            <p className="text-sm text-muted-foreground">por mês</p>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <h3 className="font-medium mb-1">Método de Pagamento</h3>
            <p className="font-medium">{subscription.paymentMethod}</p>
            <Button variant="link" className="p-0 h-auto text-primary text-sm">
              Alterar método
            </Button>
          </div>
          
          <div className="border border-border/50 rounded-lg p-4">
            <h3 className="font-medium mb-1">Data de Renovação</h3>
            <p className="font-medium">
              {subscription.renewalDate || 'N/A'}
            </p>
            <Button variant="link" className="p-0 h-auto text-primary text-sm">
              Alterar data
            </Button>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Histórico de Pagamentos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Descrição</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground">
                  Nenhum pagamento registrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-red-500/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-red-500 mb-4">Zona de Perigo</h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="font-medium">Cancelar Assinatura Permanentemente</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Esta ação cancelará sua assinatura e removerá o acesso a todos os benefícios.
            </p>
          </div>
          <Button variant="destructive" onClick={handleCancelSubscription}>
            <Trash2 className="h-4 w-4 mr-2" />
            Cancelar Assinatura
          </Button>
        </div>
      </div>
    </div>
  );
}