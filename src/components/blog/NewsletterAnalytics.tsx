'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  Mail, 
  Target,
  Calendar,
  BarChart3
} from 'lucide-react';

interface NewsletterAnalytics {
  total_subscribers: number;
  active_subscribers: number;
  segments: Record<string, number>;
  recent_growth: number;
}

const NewsletterAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<NewsletterAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/newsletter/subscribe');
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
      } else {
        throw new Error(data.error || 'Falha ao carregar analytics');
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro inesperado');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-8 bg-muted rounded mb-2" />
              <div className="h-12 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <Card className="col-span-full">
        <CardContent className="p-6 text-center">
          <p className="text-red-500">❌ {error || 'Dados não disponíveis'}</p>
        </CardContent>
      </Card>
    );
  }

  const topSegments = Object.entries(analytics.segments)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Inscritos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.total_subscribers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {analytics.active_subscribers} ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento Recente</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              +{analytics.recent_growth}
            </div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Atividade</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analytics.total_subscribers > 0 
                ? Math.round((analytics.active_subscribers / analytics.total_subscribers) * 100) 
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Inscritos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Segmentos</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.keys(analytics.segments).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Segmentos ativos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top Segmentos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topSegments.length > 0 ? (
              topSegments.map(([segment, count]) => (
                <div key={segment} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {segment.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">
                    {count} usuários
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Nenhum segmento encontrado</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Insights de Crescimento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Crescimento mensal estimado:</span>
                <span className="font-medium text-green-600">
                  +{Math.round(analytics.recent_growth * 1.2)} usuários
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Melhor segmento:</span>
                <span className="font-medium">
                  {topSegments[0] ? 
                    topSegments[0][0].replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 
                    'N/A'
                  }
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Taxa de retenção:</span>
                <span className="font-medium">
                  {analytics.total_subscribers > 0 
                    ? Math.round((analytics.active_subscribers / analytics.total_subscribers) * 100) 
                    : 0}%
                </span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-xs text-muted-foreground">
                📊 Analytics atualizado em tempo real
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsletterAnalytics;