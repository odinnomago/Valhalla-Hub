'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const PromotionPlans = () => {
  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 299,
      period: 'por mês',
      features: [
        'Destaque na página inicial',
        'Newsletter para assinantes',
        'Banner em categorias',
        'Relatório básico de métricas'
      ]
    },
    {
      id: 'professional',
      name: 'Profissional',
      price: 599,
      period: 'por mês',
      features: [
        'Tudo do plano Básico',
        'Destaque em newsletters',
        'Destaque em busca',
        'Relatório avançado',
        'Campanhas de mídia social'
      ],
      featured: true
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999,
      period: 'por mês',
      features: [
        'Tudo do plano Profissional',
        'Destaque em todos os canais',
        'Marketing dedicado',
        'Relatório completo',
        'Consultoria de marketing',
        'Campanhas patrocinadas'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`
            overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-500
            ${plan.featured 
              ? 'relative border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10' 
              : 'hover:bg-card/80'
            }
          `}
        >
          {plan.featured && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Badge className="bg-secondary text-secondary-foreground px-4 py-2 text-sm font-bold">
                <Star className="w-4 h-4 mr-1 fill-current" />
                Mais Popular
              </Badge>
            </div>
          )}
          
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-1">
                <span className="text-4xl font-bold text-primary">R$ {plan.price}</span>
              </div>
              <p className="text-muted-foreground">{plan.period}</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <Button 
              className={`
                w-full text-lg py-6 transition-all duration-300
                ${plan.featured 
                  ? 'netflix-button bg-primary hover:bg-primary/90' 
                  : 'border-2 border-primary/50 hover:border-primary hover:bg-primary/10'
                }
              `}
            >
              Escolher Plano
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PromotionPlans;