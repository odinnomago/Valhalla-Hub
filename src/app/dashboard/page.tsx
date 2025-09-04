'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PersonalizedDashboard from '@/components/dashboard/PersonalizedDashboard';
import GamificationSystem from '@/components/gamification/GamificationSystem';
import MobileNavigation from '@/components/mobile/MobileNavigation';
import AccessibilitySettings from '@/components/accessibility/AccessibilitySettings';
import { LoadingIndicator } from '@/components/ui/loading-indicator';
import { 
  BarChart3, 
  Trophy, 
  User, 
  Calendar,
  Bell,
  Search,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock user profile - in a real app this would come from context or API
const mockUserProfile = {
  type: 'artist' as const,
  interests: ['releases', 'analytics', 'bookings'],
  behavior: {
    releases: 80,
    analytics: 90,
    bookings: 70,
    fans: 60
  }
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'gamification'>('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: 'Alexandre Silva',
    email: 'alexandre@valhallarecords.com',
    avatar: 'AS'
  });

  // Initialize performance tracking
  useEffect(() => {
    // In a real implementation, we would import and call these functions
    // trackPerformance();
    // manageCache();
    
    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      
      {!isLoading && (
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Bem-vindo de volta, {user.name}</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Link href="/ux-showcase">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Ver Melhorias UX
                </Button>
              </Link>
              
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-2 border border-border/50 rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
              </Button>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {user.avatar}
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50">
                    <div className="p-2">
                      <div className="px-4 py-2">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <hr className="my-1 border-border" />
                      <Button variant="ghost" className="w-full justify-start">
                        Perfil
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Configurações
                      </Button>
                      <hr className="my-1 border-border" />
                      <Button variant="ghost" className="w-full justify-start text-red-500">
                        Sair
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Streams</p>
                    <p className="text-xl font-bold">125.4K</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">+12.5% desde o mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Receita</p>
                    <p className="text-xl font-bold">R$ 8.2K</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-green-500 mt-2">+8.3% desde o mês passado</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Próximos Shows</p>
                    <p className="text-xl font-bold">4</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">2 confirmados</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pontos</p>
                    <p className="text-xl font-bold">1,250</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Nível 3 - Membro</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex border-b">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </Button>
            <Button
              variant={activeTab === 'gamification' ? 'default' : 'ghost'}
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              onClick={() => setActiveTab('gamification')}
            >
              Gamificação
            </Button>
          </div>
          
          {/* Tab Content */}
          <div>
            {activeTab === 'dashboard' ? (
              <PersonalizedDashboard userProfile={mockUserProfile} />
            ) : (
              <GamificationSystem />
            )}
          </div>
          
          {/* Mobile Navigation - only visible on mobile */}
          <MobileNavigation />
          
          {/* Accessibility Settings */}
          <AccessibilitySettings />
        </div>
      )}
    </>
  );
}