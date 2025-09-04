'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FinanceInvoicesPage() {
  // This will be replaced with real data from user context/hooks
  const [invoices] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalInvoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    overdueInvoices: 0
  });

  const handleCreateInvoice = () => {
    // This will be replaced with actual invoice creation functionality
    console.log('Creating invoice');
  };

  const handleDownloadInvoice = (id: number) => {
    // This will be replaced with actual invoice download functionality
    console.log('Downloading invoice:', id);
  };

  const handleSendInvoice = (id: number) => {
    // This will be replaced with actual invoice sending functionality
    console.log('Sending invoice:', id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'overdue':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Pago';
      case 'pending':
        return 'Pendente';
      case 'overdue':
        return 'Atrasado';
      default:
        return 'Pendente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
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
          <h1 className="text-2xl md:text-3xl font-bold">Faturas</h1>
          <p className="text-muted-foreground">Gerencie suas faturas e recibos</p>
        </div>
        <Button onClick={handleCreateInvoice}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Fatura
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Faturas</p>
              <p className="text-2xl font-bold mt-1">{stats.totalInvoices}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faturas Pagas</p>
              <p className="text-2xl font-bold mt-1">{stats.paidInvoices}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faturas Pendentes</p>
              <p className="text-2xl font-bold mt-1">{stats.pendingInvoices}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Faturas Atrasadas</p>
              <p className="text-2xl font-bold mt-1">{stats.overdueInvoices}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Faturas Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Fatura</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Cliente</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data de Vencimento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Valor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">#{invoice.number || 'N/A'}</td>
                    <td className="p-4">{invoice.client || 'Cliente não especificado'}</td>
                    <td className="p-4">{invoice.dueDate || 'Data não especificada'}</td>
                    <td className="p-4 font-medium">{invoice.amount || 'R$ 0,00'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(invoice.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusText(invoice.status)}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Baixar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleSendInvoice(invoice.id)}
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Enviar
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhuma fatura encontrada
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