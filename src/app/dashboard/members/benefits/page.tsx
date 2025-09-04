'use client';

import React, { useState } from 'react';
import { 
  Gift, 
  Ticket, 
  Percent, 
  Star, 
  Calendar,
  Clock,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MembersBenefitsPage() {
  // This will be replaced with real data from user context/hooks
  const [benefits] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalBenefits: 0,
    claimedBenefits: 0,
    expiringSoon: 0,
    nextRenewal: ''
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Benefícios Exclusivos</h1>
        <p className="text-muted-foreground">Aproveite os benefícios exclusivos do seu plano de assinatura</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Benefícios</p>
              <p className="text-2xl font-bold mt-1">{stats.totalBenefits}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Gift className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Benefícios Resgatados</p>
              <p className="text-2xl font-bold mt-1">{stats.claimedBenefits}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Expirando em Breve</p>
              <p className="text-2xl font-bold mt-1">{stats.expiringSoon}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Próxima Renovação</p>
              <p className="text-2xl font-bold mt-1">{stats.nextRenewal || 'N/A'}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Seus Benefícios</h2>
        
        {benefits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.id} className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      {benefit.type === 'discount' && <Percent className="h-5 w-5 text-primary" />}
                      {benefit.type === 'ticket' && <Ticket className="h-5 w-5 text-primary" />}
                      {benefit.type === 'exclusive' && <Star className="h-5 w-5 text-primary" />}
                      {!benefit.type && <Gift className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{benefit.title || 'Benefício sem título'}</h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description || 'Descrição não disponível'}
                      </p>
                    </div>
                  </div>
                  {benefit.claimed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Button size="sm">
                      Resgatar
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
                
                {benefit.expiryDate && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Expira em: {benefit.expiryDate}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum benefício disponível</h3>
            <p className="text-muted-foreground mb-4">
              Benefícios exclusivos estarão disponíveis com base no seu plano de assinatura
            </p>
            <Button>Ver Planos de Assinatura</Button>
          </div>
        )}
      </div>

      {/* Redeem Code */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-4">Resgatar Código</h2>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Digite seu código de benefício"
              className="w-full bg-muted px-3 py-2 rounded-md text-sm"
            />
          </div>
          <Button>
            <Gift className="h-4 w-4 mr-2" />
            Resgatar
          </Button>
        </div>
      </div>
    </div>
  );
}