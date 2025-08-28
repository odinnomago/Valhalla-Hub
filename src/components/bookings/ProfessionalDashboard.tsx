'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  clientName: string;
  clientAvatar: string;
  projectTitle: string;
  service: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  price: number;
  urgency: 'low' | 'medium' | 'high';
  clientRating?: number;
}

interface ProfessionalStats {
  pendingRequests: number;
  activeProjects: number;
  totalEarnings: number;
  averageRating: number;
}

const ProfessionalDashboard: React.FC = () => {
  const [stats, setStats] = useState<ProfessionalStats>({
    pendingRequests: 3,
    activeProjects: 2,
    totalEarnings: 4500,
    averageRating: 4.8
  });
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'services'>('overview');
  const [loading, setLoading] = useState(false);

  const mockBookings = [
    {
      id: '1',
      clientName: 'João Silva',
      clientAvatar: '/images/clients/joao.jpg',
      projectTitle: 'Single Pop Romântico',
      service: 'Gravação de Vocal',
      status: 'pending' as const,
      startDate: '2024-01-25T14:00:00Z',
      price: 800,
      urgency: 'medium' as const
    },
    {
      id: '2',
      clientName: 'Maria Santos',
      clientAvatar: '/images/clients/maria.jpg',
      projectTitle: 'EP Indie Rock',
      service: 'Vocal + Harmonias',
      status: 'in-progress' as const,
      startDate: '2024-01-20T10:00:00Z',
      price: 1500,
      urgency: 'high' as const
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-accent bg-accent/10';
      case 'in-progress': return 'text-primary bg-primary/10';
      case 'completed': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Dashboard Profissional
          </h1>
          <p className="text-muted-foreground">
            Gerencie seus serviços e bookings
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mb-8">
          {[
            { key: 'overview', label: 'Visão Geral' },
            { key: 'bookings', label: 'Bookings' },
            { key: 'services', label: 'Serviços' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-muted-foreground text-sm">Pendentes</h3>
              <span className="text-2xl">⏳</span>
            </div>
            <p className="text-2xl font-bold text-accent">{stats.pendingRequests}</p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-muted-foreground text-sm">Ativos</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-2xl font-bold text-primary">{stats.activeProjects}</p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-muted-foreground text-sm">Faturamento</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-primary">
              R$ {stats.totalEarnings.toLocaleString()}
            </p>
          </div>

          <div className="bg-card/50 border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-muted-foreground text-sm">Avaliação</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-2xl font-bold text-accent">{stats.averageRating}</p>
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-bold text-foreground mb-6">Solicitações Recentes</h3>
              
              <div className="space-y-4">
                {mockBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-card/30 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {booking.clientName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-foreground font-medium">{booking.projectTitle}</h4>
                        <p className="text-muted-foreground text-sm">{booking.clientName} • {booking.service}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status === 'pending' ? 'Pendente' : 'Em Andamento'}
                      </span>
                      <span className="text-foreground font-bold">R$ {booking.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'bookings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {mockBookings.map((booking) => (
                <div key={booking.id} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                        {booking.clientName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-foreground font-semibold">{booking.clientName}</h3>
                        <p className="text-muted-foreground text-sm">{booking.service}</p>
                        <p className="text-primary font-medium">R$ {booking.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-2">{booking.projectTitle}</h4>
                      <p className="text-muted-foreground text-sm mb-3">Data: {formatDate(booking.startDate)}</p>
                      
                      <div className="flex gap-2">
                        {booking.status === 'pending' && (
                          <>
                            <button className="bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/30 transition-colors">
                              Aceitar
                            </button>
                            <button className="bg-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm hover:bg-destructive/30 transition-colors">
                              Recusar
                            </button>
                          </>
                        )}
                        <button className="bg-card/50 text-foreground px-4 py-2 rounded-lg text-sm hover:bg-card transition-colors">
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'services' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">Meus Serviços</h3>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                  + Novo Serviço
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card/30 rounded-xl p-6">
                  <h4 className="text-foreground font-semibold mb-2">Gravação de Vocal Principal</h4>
                  <p className="text-muted-foreground text-sm mb-4">Gravação profissional de vocal principal</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">R$ 800</span>
                    <span className="text-primary text-sm">Ativo</span>
                  </div>
                </div>

                <div className="bg-card/30 rounded-xl p-6">
                  <h4 className="text-foreground font-semibold mb-2">Harmonias Vocais</h4>
                  <p className="text-muted-foreground text-sm mb-4">Criação e gravação de harmonias</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">R$ 500</span>
                    <span className="text-primary text-sm">Ativo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;