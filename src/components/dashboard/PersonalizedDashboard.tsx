'use client';

import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Users, 
  Calendar, 
  BarChart3, 
  Play, 
  ShoppingCart,
  Ticket,
  BookOpen,
  Megaphone,
  Store,
  School,
  Globe,
  MapPin,
  FileText,
  Heart,
  Gift,
  CreditCard,
  Database,
  Wand2,
  SmartphoneIcon,
  Album,
  MessageCircle,
  Copyright,
  Mail,
  UserCheck,
  Receipt,
  DollarSign,
  HelpCircle,
  Settings,
  Bell,
  User,
  ChevronDown,
  Plus,
  Check,
  Download as DownloadIcon,
  TrendingUp,
  AlertCircle,
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
  type: 'artist' | 'fan' | 'professional';
  interests: string[];
  behavior: Record<string, number>;
}

interface DashboardWidget {
  id: string;
  title: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

const PersonalizedDashboard = ({ userProfile }: { userProfile: UserProfile }) => {
  const [widgets, setWidgets] = useState<DashboardWidget[]>([]);
  
  // Generate layout based on user profile
  const generateLayout = () => {
    const layoutMap: Record<string, DashboardWidget[]> = {
      artist: [
        {
          id: 'releases',
          title: 'Meus Lançamentos',
          icon: <Album className="h-5 w-5" />,
          component: <ArtistReleasesWidget />
        },
        {
          id: 'analytics',
          title: 'Análise de Desempenho',
          icon: <BarChart3 className="h-5 w-5" />,
          component: <AnalyticsWidget />
        },
        {
          id: 'bookings',
          title: 'Próximos Shows',
          icon: <Calendar className="h-5 w-5" />,
          component: <BookingsWidget />
        },
        {
          id: 'fans',
          title: 'Engajamento do Fã',
          icon: <Heart className="h-5 w-5" />,
          component: <FanEngagementWidget />
        }
      ],
      fan: [
        {
          id: 'content',
          title: 'Novo Conteúdo',
          icon: <Play className="h-5 w-5" />,
          component: <NewContentWidget />
        },
        {
          id: 'events',
          title: 'Próximos Eventos',
          icon: <Calendar className="h-5 w-5" />,
          component: <EventsWidget />
        },
        {
          id: 'recommendations',
          title: 'Recomendações',
          icon: <Wand2 className="h-5 w-5" />,
          component: <RecommendationsWidget />
        },
        {
          id: 'community',
          title: 'Comunidade Ativa',
          icon: <Users className="h-5 w-5" />,
          component: <CommunityWidget />
        }
      ],
      professional: [
        {
          id: 'tools',
          title: 'Ferramentas',
          icon: <Settings className="h-5 w-5" />,
          component: <ToolsWidget />
        },
        {
          id: 'reports',
          title: 'Relatórios',
          icon: <BarChart3 className="h-5 w-5" />,
          component: <ReportsWidget />
        },
        {
          id: 'team',
          title: 'Gerenciamento de Equipe',
          icon: <Users className="h-5 w-5" />,
          component: <TeamManagementWidget />
        },
        {
          id: 'opportunities',
          title: 'Oportunidades',
          icon: <TrendingUp className="h-5 w-5" />,
          component: <OpportunitiesWidget />
        }
      ]
    };
    
    return layoutMap[userProfile.type] || layoutMap.fan;
  };
  
  useEffect(() => {
    setWidgets(generateLayout());
  }, [userProfile]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {widgets.map((widget) => (
        <Card key={widget.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{widget.title}</CardTitle>
            <div className="bg-primary/10 p-2 rounded-lg">
              {widget.icon}
            </div>
          </CardHeader>
          <CardContent>
            {widget.component}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Widget components
const ArtistReleasesWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
          <Music className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Summer Vibes</p>
          <p className="text-sm text-muted-foreground">Lançado há 2 dias</p>
        </div>
      </div>
      <Button size="sm">Ver</Button>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
          <Music className="h-6 w-6 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">Midnight Dreams</p>
          <p className="text-sm text-muted-foreground">Em aprovação</p>
        </div>
      </div>
      <Button size="sm" variant="outline">Editar</Button>
    </div>
    <Button className="w-full mt-2" variant="outline">
      <Plus className="h-4 w-4 mr-2" />
      Novo Lançamento
    </Button>
  </div>
);

const AnalyticsWidget = () => (
  <div className="space-y-4">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Streams</p>
        <p className="text-2xl font-bold">125.4K</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">+12.5%</p>
        <p className="text-xs text-green-500">vs mês anterior</p>
      </div>
    </div>
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Receita</p>
        <p className="text-2xl font-bold">R$ 8.2K</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-muted-foreground">+8.3%</p>
        <p className="text-xs text-green-500">vs mês anterior</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" className="w-full">
        Ver Relatório Completo
      </Button>
    </div>
  </div>
);

const BookingsWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Festival de Verão</p>
        <p className="text-sm text-muted-foreground">Praia do Forte, BA</p>
        <p className="text-sm">15 Jun 2024</p>
      </div>
      <Button size="sm">Confirmar</Button>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Show Acústico</p>
        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
        <p className="text-sm">22 Mai 2024</p>
      </div>
      <Button size="sm" variant="outline">Detalhes</Button>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        <Calendar className="h-4 w-4 mr-2" />
        Ver Todos
      </Button>
    </div>
  </div>
);

const FanEngagementWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <User className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">+24 novos seguidores</p>
        <p className="text-sm text-muted-foreground">Nas últimas 24h</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <Heart className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">1.2K curtidas</p>
        <p className="text-sm text-muted-foreground">Em seus comentários</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Ver Engajamento
      </Button>
    </div>
  </div>
);

const NewContentWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <Play className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Nova música de Sunset Band</p>
        <p className="text-sm text-muted-foreground">Lançada hoje</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <Play className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="flex-1">
        <p className="font-medium">Playlist Verão 2024</p>
        <p className="text-sm text-muted-foreground">Atualizada ontem</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Explorar Conteúdo
      </Button>
    </div>
  </div>
);

const EventsWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Festival de Verão</p>
        <p className="text-sm text-muted-foreground">Praia do Forte, BA</p>
        <p className="text-sm">15 Jun 2024</p>
      </div>
      <Button size="sm">Comprar</Button>
    </div>
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">Show Acústico</p>
        <p className="text-sm text-muted-foreground">São Paulo, SP</p>
        <p className="text-sm">22 Mai 2024</p>
      </div>
      <Button size="sm" variant="outline">Detalhes</Button>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Ver Todos os Eventos
      </Button>
    </div>
  </div>
);

const RecommendationsWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <Music className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Artistas similares</p>
        <p className="text-sm text-muted-foreground">Baseado no seu gosto</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <BookOpen className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Cursos recomendados</p>
        <p className="text-sm text-muted-foreground">Para iniciantes</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Ver Recomendações
      </Button>
    </div>
  </div>
);

const CommunityWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <MessageCircle className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">+12 novas mensagens</p>
        <p className="text-sm text-muted-foreground">No grupo Rock Lovers</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <Users className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">3 novos membros</p>
        <p className="text-sm text-muted-foreground">Na comunidade</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Acessar Comunidade
      </Button>
    </div>
  </div>
);

const ToolsWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <BarChart3 className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Análise de Mercado</p>
        <p className="text-sm text-muted-foreground">Relatórios atualizados</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <Settings className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Ferramentas de Gestão</p>
        <p className="text-sm text-muted-foreground">Para sua equipe</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Acessar Ferramentas
      </Button>
    </div>
  </div>
);

const ReportsWidget = () => (
  <div className="space-y-4">
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Receita Total</p>
        <p className="text-xl font-bold">R$ 45.2K</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-green-500">+12.5%</p>
      </div>
    </div>
    <div className="flex justify-between">
      <div>
        <p className="text-sm text-muted-foreground">Novos Clientes</p>
        <p className="text-xl font-bold">142</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-green-500">+8.3%</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" className="w-full">
        Ver Relatórios
      </Button>
    </div>
  </div>
);

const TeamManagementWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <User className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">+3 tarefas atribuídas</p>
        <p className="text-sm text-muted-foreground">Para você</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-full w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">8 tarefas concluídas</p>
        <p className="text-sm text-muted-foreground">Hoje</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Gerenciar Equipe
      </Button>
    </div>
  </div>
);

const OpportunitiesWidget = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <TrendingUp className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Novas parcerias</p>
        <p className="text-sm text-muted-foreground">3 oportunidades</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="bg-muted rounded-lg w-12 h-12 flex items-center justify-center">
        <DollarSign className="h-6 w-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-medium">Investimentos</p>
        <p className="text-sm text-muted-foreground">2 propostas</p>
      </div>
    </div>
    <div className="pt-2">
      <Button size="sm" variant="outline" className="w-full">
        Explorar Oportunidades
      </Button>
    </div>
  </div>
);

export default PersonalizedDashboard;