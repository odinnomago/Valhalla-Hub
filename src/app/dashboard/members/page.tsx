'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Crown, 
  Calendar, 
  Award, 
  Zap, 
  Lock, 
  CheckCircle,
  CreditCard,
  UserPlus
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MembersPage() {
  // This will be replaced with real data from user context/hooks
  const [membership] = useState({
    plan: 'FREE',
    renewalDate: '',
    status: 'inactive',
    benefits: []
  });

  // This will be replaced with real data from user context/hooks
  const [tiers] = useState([
    {
      id: 'free',
      name: 'FREE',
      price: 'R$ 0,00',
      period: 'mês',
      features: [
        'Acesso ao blog',
        'Comunidade básica',
        '5 downloads/mês',
        'Suporte padrão'
      ],
      popular: false
    },
    {
      id: 'basic',
      name: 'BÁSICO',
      price: 'R$ 29,90',
      period: 'mês',
      features: [
        'Todos os benefícios FREE',
        'Acesso a 3 cursos/mês',
        '20 downloads/mês',
        'Suporte prioritário',
        'Eventos exclusivos'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'PREMIUM',
      price: 'R$ 59,90',
      period: 'mês',
      features: [
        'Todos os benefícios BÁSICO',
        'Acesso ilimitado aos cursos',
        'Downloads ilimitados',
        'Conteúdo exclusivo',
        'Descontos no Marketplace',
        'Ingressos antecipados',
        'Suporte 24/7'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'ELITE',
      price: 'R$ 99,90',
      period: 'mês',
      features: [
        'Todos os benefícios PREMIUM',
        'Mentoria individual (2h/mês)',
        'Acesso antecipado a recursos',
        'Convites para eventos VIP',
        'Networking com artistas',
        'Consultoria estratégica'
      ],
      popular: false
    }
  ]);

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Portal de Membros</h1>
          <p className="text-muted-foreground">Gerencie sua assinatura e benefícios exclusivos</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Convidar Amigo
        </Button>
      </div>

      {/* Current Plan */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Plano {membership.plan}</h2>
                {membership.renewalDate && (
                  <p className="text-muted-foreground">Renovação em {membership.renewalDate}</p>
                )}
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                membership.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                <CheckCircle className="h-4 w-4 mr-1" />
                {membership.status === 'active' ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <CreditCard className="h-4 w-4 mr-2" />
              Gerenciar Pagamento
            </Button>
            <Button>
              Alterar Plano
            </Button>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-semibold mb-3">Seus Benefícios:</h3>
          {membership.benefits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {membership.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">Nenhum benefício disponível para o seu plano atual.</p>
          )}
        </div>
      </div>

      {/* Membership Tiers */}
      <div>
        <h2 className="text-xl font-bold mb-4">Planos Disponíveis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div 
              key={tier.id} 
              className={`bg-card border rounded-xl overflow-hidden ${
                tier.popular 
                  ? 'border-primary ring-2 ring-primary/20 relative' 
                  : 'border-border/50'
              }`}
            >
              {tier.popular && (
                <div className="bg-primary text-primary-foreground text-xs font-bold text-center py-1">
                  MAIS POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold">{tier.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">/{tier.period}</span>
                  </div>
                </div>
                
                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    tier.popular 
                      ? 'bg-primary hover:bg-primary/90' 
                      : 'border border-border'
                  }`}
                  variant={tier.popular ? 'default' : 'outline'}
                >
                  {membership.plan === tier.name ? 'Plano Atual' : 'Escolher Plano'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}