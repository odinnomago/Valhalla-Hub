'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  MapPin, 
  Music, 
  ShoppingCart, 
  Users, 
  Store, 
  School, 
  FileText, 
  Calendar, 
  Ticket, 
  Megaphone,
  Check,
  X,
  Trash2,
  Eye,
  Archive,
  Filter,
  Search,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: number;
  unread: boolean;
  archived: boolean;
  platform?: string;
  title?: string;
  message?: string;
  time?: string;
}

export default function NotificationsPage() {
  // These will be replaced with real data from user context/hooks
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };

  const archiveNotification = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, archived: true } : notification
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && notification.unread) || 
      (filter === 'archived' && notification.archived) ||
      (filter === 'platform' && notification.platform?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSearch = searchQuery === '' || 
      notification.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.platform?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => n.unread).length;
  const archivedCount = notifications.filter(n => n.archived).length;

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Agência de Bookings': return <MapPin className="h-4 w-4" />;
      case 'Gravadora Digital': return <Music className="h-4 w-4" />;
      case 'Marketplace': return <ShoppingCart className="h-4 w-4" />;
      case 'Portal de Membros': return <Users className="h-4 w-4" />;
      case 'Academy': return <School className="h-4 w-4" />;
      case 'Blog': return <FileText className="h-4 w-4" />;
      case 'Produção de Eventos': return <Calendar className="h-4 w-4" />;
      case 'Ferramenta de Venda de Ingressos': return <Ticket className="h-4 w-4" />;
      case 'Agência de Marketing IA': return <Megaphone className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Agência de Bookings': return 'bg-green-100 text-green-800';
      case 'Gravadora Digital': return 'bg-blue-100 text-blue-800';
      case 'Marketplace': return 'bg-purple-100 text-purple-800';
      case 'Portal de Membros': return 'bg-yellow-100 text-yellow-800';
      case 'Academy': return 'bg-indigo-100 text-indigo-800';
      case 'Blog': return 'bg-pink-100 text-pink-800';
      case 'Produção de Eventos': return 'bg-red-100 text-red-800';
      case 'Ferramenta de Venda de Ingressos': return 'bg-orange-100 text-orange-800';
      case 'Agência de Marketing IA': return 'bg-teal-100 text-teal-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Notificações</h1>
          <p className="text-muted-foreground">Gerencie suas notificações e alertas</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="h-4 w-4 mr-2" />
            Marcar todas como lidas
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAll}
            disabled={notifications.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar notificações..."
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            Todas
          </Button>
          <Button 
            variant={filter === 'unread' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('unread')}
            disabled={unreadCount === 0}
          >
            Não lidas ({unreadCount})
          </Button>
          <Button 
            variant={filter === 'archived' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('archived')}
          >
            Arquivadas ({archivedCount})
          </Button>
          <Button 
            variant={filter === 'platform' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('platform')}
          >
            <Filter className="h-4 w-4 mr-2" />
            Por Plataforma
          </Button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma notificação</h3>
            <p className="text-muted-foreground">
              {filter === 'archived' 
                ? 'Você não tem notificações arquivadas.' 
                : 'Você está em dia com todas as notificações.'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-muted/50 ${
                  notification.unread ? 'bg-primary/5 border border-primary/20' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    notification.unread ? 'bg-primary' : 'bg-muted'
                  }`}></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {notification.platform && (
                        <div className={`p-1.5 rounded-md ${getPlatformColor(notification.platform)}`}>
                          {getPlatformIcon(notification.platform)}
                        </div>
                      )}
                      {notification.platform && (
                        <span className="text-sm font-medium">{notification.platform}</span>
                      )}
                      {notification.time && (
                        <>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {notification.time}
                          </span>
                        </>
                      )}
                    </div>
                    
                    {notification.title && (
                      <h3 className="font-medium">{notification.title}</h3>
                    )}
                    {notification.message && (
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    )}
                    
                    <div className="flex items-center gap-2 mt-3">
                      {notification.unread && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => markAsRead(notification.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Marcar como lida
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => archiveNotification(notification.id)}
                      >
                        <Archive className="h-4 w-4 mr-1" />
                        Arquivar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}