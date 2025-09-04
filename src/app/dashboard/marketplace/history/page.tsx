'use client';

import React, { useState } from 'react';
import { 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  Package, 
  User, 
  Calendar,
  Filter,
  Download,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketplaceHistoryPage() {
  // This will be replaced with real data from user context/hooks
  const [transactions] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalTransactions: 0,
    totalRevenue: 'R$ 0,00',
    pendingTransactions: 0,
    completedTransactions: 0
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return 'Pendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Histórico de Transações</h1>
          <p className="text-muted-foreground">Acompanhe todas as transações do Marketplace</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Transações</p>
              <p className="text-2xl font-bold mt-1">{stats.totalTransactions}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">{stats.totalRevenue}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transações Pendentes</p>
              <p className="text-2xl font-bold mt-1">{stats.pendingTransactions}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Transações Concluídas</p>
              <p className="text-2xl font-bold mt-1">{stats.completedTransactions}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Transações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Comprador</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{transaction.product || 'Produto não especificado'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        {transaction.buyer || 'Comprador anônimo'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {transaction.date || '-'}
                      </div>
                    </td>
                    <td className="p-4 font-medium">{transaction.amount || 'R$ 0,00'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhuma transação registrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}