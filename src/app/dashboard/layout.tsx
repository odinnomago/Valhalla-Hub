'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRequireAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Loader2, 
  Package, 
  Wand2, 
  Album, 
  ShoppingCart, 
  School, 
  Shield, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  HelpCircle, 
  Settings,
  Search,
  Bell,
  User,
  ChevronDown,
  Music,
  Ticket,
  Users,
  Store,
  BookOpen,
  Megaphone,
  MapPin,
  FileText,
  Copyright,
  MessageCircle,
  CreditCard,
  FileBarChart,
  Lock,
  Globe,
  Smartphone,
  Palette,
  Key,
  Mail,
  Phone,
  SmartphoneIcon,
  Monitor,
  Database,
  AlertCircle,
  Play,
  Receipt,
  TrendingUp,
  UserCheck,
  Heart,
  LogOut,
  Plus,
  Gift,
  Check,
  Download as DownloadIcon
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useRequireAuth();
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Check if user is admin (in a real implementation, this would be more robust)
  const isAdmin = user?.email?.endsWith('@valhallarecords.com') || 
                 user?.email === 'admin@valhallahub.com' ||
                 user?.email === 'admin@valhallarecords.com';

  const toggleMenu = (menuName: string) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const userNavItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { 
      label: 'Minhas Plataformas', 
      icon: Globe,
      subItems: [
        { 
          label: 'Gravadora Digital', 
          icon: Music,
          subItems: [
            { href: '/dashboard/releases', label: 'Meus Lançamentos', icon: Album },
            { href: '/dashboard/releases/new', label: 'Enviar Nova Música', icon: Plus },
            { href: '/dashboard/releases/reports', label: 'Relatórios de Streaming', icon: BarChart3 },
            { href: '/dashboard/releases/rights', label: 'Direitos Autorais', icon: Copyright },
            { href: '/dashboard/releases/contact', label: 'Contato com A&R', icon: MessageCircle }
          ]
        },
        { 
          label: 'Agência de Bookings', 
          icon: MapPin,
          subItems: [
            { href: '/dashboard/bookings', label: 'Meus Shows', icon: Calendar },
            { href: '/dashboard/bookings/proposals', label: 'Propostas Recebidas', icon: Mail },
            { href: '/dashboard/bookings/calendar', label: 'Calendário de Eventos', icon: Calendar },
            { href: '/dashboard/bookings/contracts', label: 'Contratos', icon: FileText },
            { href: '/dashboard/bookings/agency', label: 'Solicitar Agenciamento', icon: UserCheck }
          ]
        },
        { 
          label: 'Agência de Marketing IA', 
          icon: Megaphone,
          subItems: [
            { href: '/dashboard/marketing', label: 'Campanhas Ativas', icon: Play },
            { href: '/dashboard/marketing/analytics', label: 'Análise de Desempenho', icon: BarChart3 },
            { href: '/dashboard/marketing/ai-content', label: 'Conteúdo Gerado por IA', icon: Wand2 },
            { href: '/dashboard/marketing/social', label: 'Gestão de Redes Sociais', icon: SmartphoneIcon },
            { href: '/dashboard/marketing/automation', label: 'Configurar Automação', icon: Settings }
          ]
        },
        { 
          label: 'Marketplace Colaborativo', 
          icon: Store,
          subItems: [
            { href: '/dashboard/marketplace', label: 'Meus Produtos', icon: Package },
            { href: '/dashboard/marketplace/sales', label: 'Minhas Vendas', icon: ShoppingCart },
            { href: '/dashboard/marketplace/new', label: 'Cadastrar Novo Produto', icon: Plus },
            { href: '/dashboard/marketplace/reviews', label: 'Avaliações', icon: Heart },
            { href: '/dashboard/marketplace/history', label: 'Histórico de Transações', icon: Receipt }
          ]
        },
        { 
          label: 'Portal de Membros', 
          icon: Users,
          subItems: [
            { href: '/dashboard/members', label: 'Meu Plano', icon: User },
            { href: '/dashboard/members/content', label: 'Conteúdo Exclusivo', icon: Lock },
            { href: '/dashboard/members/community', label: 'Comunidade', icon: Users },
            { href: '/dashboard/members/benefits', label: 'Benefícios', icon: Gift },
            { href: '/dashboard/members/subscription', label: 'Gerenciar Assinatura', icon: CreditCard }
          ]
        },
        { 
          label: 'Academy', 
          icon: School,
          subItems: [
            { href: '/dashboard/courses', label: 'Meus Cursos', icon: Play },
            { href: '/dashboard/courses/certificates', label: 'Certificados', icon: FileText },
            { href: '/dashboard/courses/upcoming', label: 'Próximas Aulas', icon: Calendar },
            { href: '/dashboard/courses/resources', label: 'Biblioteca de Recursos', icon: Database },
            { href: '/dashboard/courses/support', label: 'Solicitar Suporte', icon: HelpCircle }
          ]
        },
        { 
          label: 'Blog Integrado', 
          icon: FileText,
          subItems: [
            { href: '/dashboard/blog', label: 'Meus Posts', icon: FileText },
            { href: '/dashboard/blog/drafts', label: 'Rascunhos', icon: FileBarChart },
            { href: '/dashboard/blog/stats', label: 'Estatísticas', icon: BarChart3 },
            { href: '/dashboard/blog/comments', label: 'Comentários', icon: MessageCircle },
            { href: '/dashboard/blog/new', label: 'Novo Post', icon: Plus }
          ]
        },
        { 
          label: 'Produção de Eventos', 
          icon: Calendar,
          subItems: [
            { href: '/dashboard/events', label: 'Meus Eventos', icon: Calendar },
            { href: '/dashboard/events/production', label: 'Solicitar Produção', icon: Wand2 },
            { href: '/dashboard/events/budgets', label: 'Orçamentos', icon: Receipt },
            { href: '/dashboard/events/suppliers', label: 'Fornecedores', icon: Users },
            { href: '/dashboard/events/checklists', label: 'Checklists de Produção', icon: FileBarChart }
          ]
        },
        { 
          label: 'Ferramenta de Venda de Ingressos', 
          icon: Ticket,
          subItems: [
            { href: '/dashboard/tickets', label: 'Meus Ingressos', icon: Ticket },
            { href: '/dashboard/tickets/events', label: 'Eventos Cadastrados', icon: Calendar },
            { href: '/dashboard/tickets/reports', label: 'Relatórios de Vendas', icon: BarChart3 },
            { href: '/dashboard/tickets/validator', label: 'Validador de Ingressos', icon: Check },
            { href: '/dashboard/tickets/payments', label: 'Configurar Pagamentos', icon: CreditCard }
          ]
        }
      ]
    },
    { 
      label: 'Calendário', 
      icon: Calendar,
      href: '/dashboard/calendar'
    },
    { 
      label: 'Financeiro', 
      icon: DollarSign,
      subItems: [
        { href: '/dashboard/finance', label: 'Extrato', icon: Receipt },
        { href: '/dashboard/finance/invoices', label: 'Faturas', icon: FileText },
        { href: '/dashboard/finance/methods', label: 'Métodos de Pagamento', icon: CreditCard },
        { href: '/dashboard/finance/reports', label: 'Relatórios Financeiros', icon: BarChart3 },
        { href: '/dashboard/finance/taxes', label: 'Configurar Impostos', icon: Settings }
      ]
    },
    { 
      label: 'Relatórios', 
      icon: FileBarChart,
      subItems: [
        { href: '/dashboard/reports', label: 'Visão Geral', icon: BarChart3 },
        { href: '/dashboard/reports/platform', label: 'Por Plataforma', icon: Globe },
        { href: '/dashboard/reports/comparison', label: 'Comparativo', icon: TrendingUp },
        { href: '/dashboard/reports/export', label: 'Exportar Dados', icon: DownloadIcon },
        { href: '/dashboard/reports/alerts', label: 'Configurar Alertas', icon: AlertCircle }
      ]
    },
    { 
      label: 'Central de Ajuda', 
      icon: HelpCircle,
      subItems: [
        { href: '/dashboard/help', label: 'Tutoriais', icon: Play },
        { href: '/dashboard/help/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/dashboard/help/contact', label: 'Contato', icon: MessageCircle },
        { href: '/dashboard/help/status', label: 'Status do Sistema', icon: Monitor },
        { href: '/dashboard/help/support', label: 'Solicitar Suporte', icon: UserCheck }
      ]
    },
    { 
      label: 'Configurações', 
      icon: Settings,
      subItems: [
        { href: '/dashboard/profile', label: 'Perfil', icon: User },
        { href: '/dashboard/settings/account', label: 'Conta', icon: Key },
        { href: '/dashboard/settings/privacy', label: 'Privacidade', icon: Lock },
        { href: '/dashboard/settings/notifications', label: 'Notificações', icon: Bell },
        { href: '/dashboard/settings/integrations', label: 'Integrações', icon: Smartphone },
        { href: '/dashboard/settings/security', label: 'Segurança', icon: Shield }
      ]
    }
  ];

  const adminNavItems = [
    { href: '/dashboard/admin', label: 'Admin Dashboard', icon: Shield },
    { href: '/dashboard/admin/users', label: 'Manage Users', icon: Users },
    { href: '/dashboard/admin/releases', label: 'Manage Releases', icon: Album },
    { href: '/dashboard/admin/products', label: 'Manage Products', icon: Package },
    { href: '/dashboard/admin/orders', label: 'Manage Orders', icon: ShoppingCart },
    { href: '/dashboard/admin/settings', label: 'Site Settings', icon: Settings }
  ];

  const navItems = isAdmin ? [...userNavItems, ...adminNavItems] : userNavItems;

  // Function to render navigation items recursively
  const renderNavItems = (items: any[], level = 0) => {
    return items.map((item, index) => (
      <div key={index}>
        {item.subItems ? (
          <>
            <button
              onClick={() => toggleMenu(item.label)}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md w-full text-left ${
                level === 0 ? 'mt-1' : 'pl-' + (level * 4)
              } hover:bg-muted`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              <ChevronDown 
                className={`ml-auto h-4 w-4 transition-transform ${
                  openMenus[item.label] ? 'rotate-180' : ''
                }`} 
              />
            </button>
            {openMenus[item.label] && (
              <div className={`ml-4 mt-1 space-y-1`}>
                {renderNavItems(item.subItems, level + 1)}
              </div>
            )}
          </>
        ) : (
          <Button
            key={item.href}
            variant={pathname === item.href ? 'secondary' : 'ghost'}
            className={`w-full justify-start ${
              level > 0 ? 'pl-' + (level * 4) : ''
            }`}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        )}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
              <div className="bg-primary w-8 h-8 rounded-lg"></div>
              <span>Valhalla Hub</span>
            </Link>
          </div>
          
          <div className="flex flex-1 items-center gap-4 md:ml-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Busca Global..."
                className="w-full rounded-md bg-muted pl-8 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              className="relative p-2 rounded-full hover:bg-muted"
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </button>
            
            <div className="relative" ref={profileRef}>
              <button 
                className="flex items-center gap-2 rounded-full hover:bg-muted p-1"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="bg-gradient-to-br from-primary to-accent w-8 h-8 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                  {user.email?.charAt(0).toUpperCase() || 'U'}
                </div>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <Link href="/dashboard/profile" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Ver Perfil
                    </Link>
                    <Link href="/dashboard/settings/account" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Configurações da Conta
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Minhas Plataformas
                    </Link>
                    <Link href="/dashboard/help" className="block px-4 py-2 text-sm hover:bg-muted rounded-md">
                      Central de Ajuda
                    </Link>
                    <hr className="my-1 border-border" />
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-muted rounded-md text-red-500"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 border-r border-border/50 bg-background/95 backdrop-blur p-4 overflow-y-auto">
          <nav className="flex flex-col gap-1">
            {renderNavItems(navItems)}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}