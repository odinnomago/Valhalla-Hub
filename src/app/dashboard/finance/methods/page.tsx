'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Banknote, 
  QrCode, 
  Smartphone,
  Plus,
  Edit,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FinanceMethodsPage() {
  // This will be replaced with real data from user context/hooks
  const [paymentMethods] = useState<any[]>([]);
  const [activeMethod, setActiveMethod] = useState<number | null>(null);

  const handleAddPaymentMethod = () => {
    // This will be replaced with actual payment method addition functionality
    console.log('Adding payment method');
  };

  const handleEditPaymentMethod = (id: number) => {
    // This will be replaced with actual payment method edit functionality
    console.log('Editing payment method:', id);
  };

  const handleDeletePaymentMethod = (id: number) => {
    // This will be replaced with actual payment method deletion functionality
    console.log('Deleting payment method:', id);
  };

  const handleActivatePaymentMethod = (id: number) => {
    setActiveMethod(id);
    // This will be replaced with actual payment method activation functionality
    console.log('Activating payment method:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Métodos de Pagamento</h1>
          <p className="text-muted-foreground">Gerencie as formas de pagamento aceitas</p>
        </div>
        <Button onClick={handleAddPaymentMethod}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Método
        </Button>
      </div>

      {/* Supported Payment Methods */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Métodos de Pagamento Suportados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Cartão de Crédito</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aceite pagamentos com cartão de crédito
            </p>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Banknote className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Transferência Bancária</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Receba pagamentos via transferência
            </p>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <QrCode className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">PIX</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pagamentos instantâneos via PIX
            </p>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Carteira Digital</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Pagamentos via carteiras digitais
            </p>
            <Button variant="outline" size="sm">Configurar</Button>
          </div>
        </div>
      </div>

      {/* Configured Payment Methods */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Métodos Configurados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Método</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Taxas</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ativo</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <tr key={method.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          {method.type === 'credit' && <CreditCard className="h-5 w-5 text-primary" />}
                          {method.type === 'bank' && <Banknote className="h-5 w-5 text-primary" />}
                          {method.type === 'pix' && <QrCode className="h-5 w-5 text-primary" />}
                          {method.type === 'digital' && <Smartphone className="h-5 w-5 text-primary" />}
                        </div>
                        <div>
                          <div className="font-medium">{method.name || 'Método sem nome'}</div>
                          <div className="text-sm text-muted-foreground">{method.description || 'Descrição não disponível'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {method.status || 'Ativo'}
                      </span>
                    </td>
                    <td className="p-4">{method.fees || 'N/A'}</td>
                    <td className="p-4">
                      <Button 
                        size="sm" 
                        variant={activeMethod === method.id ? "default" : "outline"}
                        onClick={() => handleActivatePaymentMethod(method.id)}
                      >
                        {activeMethod === method.id ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Ativo
                          </>
                        ) : (
                          'Ativar'
                        )}
                      </Button>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleEditPaymentMethod(method.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeletePaymentMethod(method.id)}
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
                    Nenhum método de pagamento configurado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Configurações de Pagamento</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Taxas e Comissões</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa padrão por transação</span>
                <span>3.99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa para cartão de crédito</span>
                <span>4.99%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxa para PIX</span>
                <span>0.99%</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Prazos de Recebimento</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cartão de crédito</span>
                <span>30 dias</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PIX</span>
                <span>Imediato</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Transferência bancária</span>
                <span>2 dias úteis</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-border/50">
          <Button>Salvar Configurações</Button>
        </div>
      </div>
    </div>
  );
}