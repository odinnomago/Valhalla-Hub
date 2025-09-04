'use client';

import React, { useState } from 'react';
import { 
  Wand2, 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign,
  FileText,
  Plus,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EventProductionPage() {
  // This will be replaced with real data from user context/hooks
  const [productionRequests] = useState<any[]>([]);

  const handleRequestProduction = () => {
    // This will be replaced with actual production request functionality
    console.log('Requesting production');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Solicitar Produção</h1>
          <p className="text-muted-foreground">Peça serviços de produção para seus eventos</p>
        </div>
        <Button onClick={handleRequestProduction}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Solicitação
        </Button>
      </div>

      {/* Services */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Serviços de Produção</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Wand2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Produção Completa</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Serviço completo de produção para seu evento
            </p>
            <Button variant="outline" size="sm">Solicitar</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Equipe Técnica</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contratação de equipe técnica especializada
            </p>
            <Button variant="outline" size="sm">Solicitar</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Locação de Equipamentos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Aluguel de equipamentos para seu evento
            </p>
            <Button variant="outline" size="sm">Solicitar</Button>
          </div>
        </div>
      </div>

      {/* Active Requests */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Solicitações Ativas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Serviço</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data da Solicitação</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {productionRequests.length > 0 ? (
                productionRequests.map((request) => (
                  <tr key={request.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{request.event || 'Evento não especificado'}</td>
                    <td className="p-4">{request.service || 'Serviço não especificado'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {request.date || 'Data não especificada'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        {request.status || 'Pendente'}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhuma solicitação de produção ativa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Como Funciona</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">1</span>
            </div>
            <h3 className="font-medium mb-1">Solicite</h3>
            <p className="text-sm text-muted-foreground">Envie sua solicitação de produção</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">2</span>
            </div>
            <h3 className="font-medium mb-1">Orçamento</h3>
            <p className="text-sm text-muted-foreground">Receba um orçamento personalizado</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">3</span>
            </div>
            <h3 className="font-medium mb-1">Aprovação</h3>
            <p className="text-sm text-muted-foreground">Aprove o orçamento e detalhes</p>
          </div>
          
          <div className="text-center">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <span className="font-bold text-primary">4</span>
            </div>
            <h3 className="font-medium mb-1">Execução</h3>
            <p className="text-sm text-muted-foreground">Nossa equipe produz seu evento</p>
          </div>
        </div>
      </div>
    </div>
  );
}