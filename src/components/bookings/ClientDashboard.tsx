'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Booking {
  id: string;
  professionalId: string;
  professionalName: string;
  professionalAvatar: string;
  professionalRole: string;
  projectTitle: string;
  service: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  price: number;
  location: string;
  description: string;
  createdAt: string;
  rating?: number;
  review?: string;
  payment: {
    status: 'pending' | 'paid' | 'refunded';
    method: string;
    amount: number;
  };
}

interface DashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalSpent: number;
  averageRating: number;
}

const ClientDashboard: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    activeBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
    averageRating: 0
  });
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: 'booking_001',
        professionalId: 'marina_santos',
        professionalName: 'Marina Santos',
        professionalAvatar: '/images/professionals/marina.jpg',
        professionalRole: 'Vocalista Pop',
        projectTitle: 'Gravação Single Pop',
        service: 'Gravação de Vocal Principal',
        status: 'in-progress',
        startDate: '2024-01-20T14:00:00Z',
        endDate: '2024-01-20T18:00:00Z',
        price: 800,
        location: 'Estúdio Central - São Paulo',
        description: 'Gravação de vocal principal para single de pop com influências de R&B.',
        createdAt: '2024-01-15T10:30:00Z',
        payment: {
          status: 'paid',
          method: 'Cartão de Crédito',
          amount: 800
        }
      },
      {
        id: 'booking_002',
        professionalId: 'carlos_mendes',
        professionalName: 'Carlos Mendes',
        professionalAvatar: '/images/professionals/carlos.jpg',
        professionalRole: 'Produtor Hip Hop',
        projectTitle: 'Beat Trap Personalizado',
        service: 'Produção de Beat',
        status: 'completed',
        startDate: '2024-01-10T10:00:00Z',
        endDate: '2024-01-12T18:00:00Z',
        price: 600,
        location: 'Remoto',
        description: 'Produção de beat trap personalizado com elementos únicos.',
        createdAt: '2024-01-08T15:20:00Z',
        rating: 5,
        review: 'Trabalho excepcional! Beat ficou exatamente como eu imaginava.',
        payment: {
          status: 'paid',
          method: 'PIX',
          amount: 600
        }
      },
      {
        id: 'booking_003',
        professionalId: 'ana_silva',
        professionalName: 'Ana Silva',
        professionalAvatar: '/images/professionals/ana.jpg',
        professionalRole: 'Guitarrista',
        projectTitle: 'Solo de Guitarra Rock',
        service: 'Gravação de Guitarra',
        status: 'pending',
        startDate: '2024-01-25T16:00:00Z',
        endDate: '2024-01-25T20:00:00Z',
        price: 450,
        location: 'Estúdio Rock House - Rio de Janeiro',
        description: 'Gravação de solo de guitarra para música rock autoral.',
        createdAt: '2024-01-18T09:45:00Z',
        payment: {
          status: 'pending',
          method: 'Cartão de Crédito',
          amount: 450
        }
      }
    ];

    setBookings(mockBookings);
    
    // Calculate stats
    const totalBookings = mockBookings.length;
    const activeBookings = mockBookings.filter(b => ['pending', 'confirmed', 'in-progress'].includes(b.status)).length;
    const completedBookings = mockBookings.filter(b => b.status === 'completed').length;
    const totalSpent = mockBookings.filter(b => b.payment.status === 'paid').reduce((sum, b) => sum + b.price, 0);
    const ratingsSum = mockBookings.filter(b => b.rating).reduce((sum, b) => sum + (b.rating || 0), 0);
    const ratedBookings = mockBookings.filter(b => b.rating).length;
    const averageRating = ratedBookings > 0 ? ratingsSum / ratedBookings : 0;

    setStats({
      totalBookings,
      activeBookings,
      completedBookings,
      totalSpent,
      averageRating
    });

    setLoading(false);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'confirmed': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'in-progress': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
      case 'cancelled': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmado';
      case 'in-progress': return 'Em Andamento';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['pending', 'confirmed', 'in-progress'].includes(booking.status);
    if (activeTab === 'completed') return booking.status === 'completed';
    if (activeTab === 'cancelled') return booking.status === 'cancelled';
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Meus Bookings
          </h1>
          <p className="text-muted-foreground">
            Gerencie todos os seus projetos e contratações
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-muted-foreground text-sm">Total de Bookings</h3>
              <span className="text-2xl">📊</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stats.totalBookings}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Projetos Ativos</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <p className="text-2xl font-bold text-green-400">{stats.activeBookings}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Concluídos</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-2xl font-bold text-emerald-400">{stats.completedBookings}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Total Investido</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-2xl font-bold text-primary-400">
              R$ {stats.totalSpent.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm">Avaliação Média</h3>
              <span className="text-2xl">⭐</span>
            </div>
            <p className="text-2xl font-bold text-accent">
              {stats.averageRating.toFixed(1)}
            </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { key: 'all', label: 'Todos', count: bookings.length },
              { key: 'active', label: 'Ativos', count: stats.activeBookings },
              { key: 'completed', label: 'Concluídos', count: stats.completedBookings },
              { key: 'cancelled', label: 'Cancelados', count: bookings.filter(b => b.status === 'cancelled').length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex bg-card/50 border border-border rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Lista
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  viewMode === 'calendar'
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Calendário
              </button>
            </div>

            <button
              onClick={() => router.push('/bookings')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              + Novo Booking
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-border/70 transition-colors"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Professional Info */}
                  <div className="flex items-center gap-4 lg:w-80">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold overflow-hidden flex-shrink-0">
                      {booking.professionalAvatar ? (
                        <img 
                          src={booking.professionalAvatar} 
                          alt={booking.professionalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        booking.professionalName.charAt(0)
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-foreground font-semibold truncate">
                        {booking.professionalName}
                      </h3>
                      <p className="text-muted-foreground text-sm">{booking.professionalRole}</p>
                      <p className="text-primary text-sm font-medium">
                        {booking.service}
                      </p>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="flex-1">
                    <div className="mb-3">
                      <h4 className="text-foreground font-medium mb-1">{booking.projectTitle}</h4>
                      <p className="text-muted-foreground text-sm line-clamp-2">{booking.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Data</p>
                        <p className="text-foreground">{formatDate(booking.startDate)}</p>
                        <p className="text-muted-foreground">{formatTime(booking.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Local</p>
                        <p className="text-foreground">{booking.location}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Valor</p>
                        <p className="text-foreground font-bold">R$ {booking.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Pagamento</p>
                        <p className={`text-sm px-2 py-1 rounded-full text-center ${
                          booking.payment.status === 'paid' 
                            ? 'text-primary bg-primary/10' 
                            : 'text-accent bg-accent/10'
                        }`}>
                          {booking.payment.status === 'paid' ? 'Pago' : 'Pendente'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="lg:w-48 flex flex-col justify-between">
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    {booking.rating && (
                      <div className="mb-4">
                        <div className="flex items-center gap-1 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < booking.rating! ? 'text-accent' : 'text-muted-foreground'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <p className="text-muted-foreground text-xs">{booking.review}</p>
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => router.push(`/bookings/booking/${booking.id}`)}
                        className="bg-card/50 text-foreground px-4 py-2 rounded-lg text-sm hover:bg-card transition-colors"
                      >
                        Ver Detalhes
                      </button>
                      
                      {booking.status === 'completed' && !booking.rating && (
                        <button className="bg-primary/20 text-primary px-4 py-2 rounded-lg text-sm hover:bg-primary/30 transition-colors">
                          Avaliar
                        </button>
                      )}
                      
                      {['pending', 'confirmed'].includes(booking.status) && (
                        <button className="bg-destructive/20 text-destructive px-4 py-2 rounded-lg text-sm hover:bg-destructive/30 transition-colors">
                          Cancelar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Nenhum booking encontrado
              </h3>
              <p className="text-muted-foreground mb-6">
                {activeTab === 'all' 
                  ? 'Você ainda não fez nenhum booking'
                  : `Não há bookings ${activeTab === 'active' ? 'ativos' : activeTab === 'completed' ? 'concluídos' : 'cancelados'}`
                }
              </p>
              <button
                onClick={() => router.push('/bookings')}
                className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Contratar Profissional
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;