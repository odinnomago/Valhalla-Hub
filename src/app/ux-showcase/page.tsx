'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Trophy, 
  Smartphone, 
  Eye, 
  Zap, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function UXShowcasePage() {
  const features = [
    {
      title: "Onboarding Inteligente",
      description: "Processo de integração otimizado com personalização baseada em IA",
      icon: <Sparkles className="h-6 w-6" />,
      link: "/onboarding"
    },
    {
      title: "Gamificação Completa",
      description: "Sistema de pontos, níveis e conquistas para engajamento contínuo",
      icon: <Trophy className="h-6 w-6" />,
      link: "/dashboard"
    },
    {
      title: "Design Mobile-First",
      description: "Interface otimizada para dispositivos móveis com navegação intuitiva",
      icon: <Smartphone className="h-6 w-6" />,
      link: "/"
    },
    {
      title: "Acessibilidade Total",
      description: "Compatível com WCAG 2.1 AA e opções de personalização para todos os usuários",
      icon: <Eye className="h-6 w-6" />,
      link: "/"
    },
    {
      title: "Performance Otimizada",
      description: "Carregamento rápido e experiência fluida em todas as interações",
      icon: <Zap className="h-6 w-6" />,
      link: "/"
    },
    {
      title: "Dashboard Personalizado",
      description: "Interface adaptativa baseada no perfil e comportamento do usuário",
      icon: <BarChart3 className="h-6 w-6" />,
      link: "/dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Experiência do Usuário Otimizada</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Implementação completa das melhores práticas de UX para 2025-2026 baseada em 
            pesquisa de mercado abrangente
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild>
                  <Link href={feature.link}>
                    Explorar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border/50 rounded-xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Resultados Esperados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Métricas de Performance</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>First Contentful Paint</span>
                  <span className="font-medium">&lt; 1.5s</span>
                </li>
                <li className="flex justify-between">
                  <span>Largest Contentful Paint</span>
                  <span className="font-medium">&lt; 2.5s</span>
                </li>
                <li className="flex justify-between">
                  <span>Time to Interactive</span>
                  <span className="font-medium">&lt; 3.5s</span>
                </li>
                <li className="flex justify-between">
                  <span>Cumulative Layout Shift</span>
                  <span className="font-medium">&lt; 0.1</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Melhorias de Engajamento</h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Redução de Abandono</span>
                  <span className="font-medium">40%</span>
                </li>
                <li className="flex justify-between">
                  <span>Aumento de Retenção</span>
                  <span className="font-medium">60%</span>
                </li>
                <li className="flex justify-between">
                  <span>Melhoria de Engajamento</span>
                  <span className="font-medium">65%</span>
                </li>
                <li className="flex justify-between">
                  <span>Satisfação do Usuário</span>
                  <span className="font-medium">+25%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Button size="lg" asChild>
            <Link href="/dashboard">
              Acessar Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}