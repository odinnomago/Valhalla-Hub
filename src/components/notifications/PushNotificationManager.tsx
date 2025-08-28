'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PushNotificationPermission {
  permission: NotificationPermission;
  subscription: PushSubscription | null;
  isSupported: boolean;
  isLoading: boolean;
}

interface BookingNotification {
  id: string;
  type: 'booking_request' | 'booking_accepted' | 'booking_confirmed' | 'booking_cancelled' | 
        'booking_completed' | 'payment_received' | 'reminder';
  title: string;
  message: string;
  bookingId: string;
  timestamp: string;
  urgency: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    url: string;
  };
}

const PushNotificationManager: React.FC = () => {
  const [permission, setPermission] = useState<PushNotificationPermission>({
    permission: 'default',
    subscription: null,
    isSupported: false,
    isLoading: false
  });
  const [showSetup, setShowSetup] = useState(false);
  const [recentNotifications, setRecentNotifications] = useState<BookingNotification[]>([]);

  // Check if push notifications are supported
  useEffect(() => {
    const checkSupport = async () => {
      const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
      
      setPermission(prev => ({
        ...prev,
        isSupported,
        permission: isSupported ? Notification.permission : 'denied'
      }));

      if (isSupported && 'serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          const subscription = await registration.pushManager.getSubscription();
          
          setPermission(prev => ({
            ...prev,
            subscription
          }));
        } catch (error) {
          console.error('Error checking push subscription:', error);
        }
      }
    };

    checkSupport();
  }, []);

  // Request permission and setup push notifications
  const requestPermission = useCallback(async () => {
    if (!permission.isSupported) {
      alert('Push notifications não são suportadas neste navegador');
      return;
    }

    setPermission(prev => ({ ...prev, isLoading: true }));

    try {
      // Request notification permission
      const result = await Notification.requestPermission();
      
      if (result === 'granted') {
        // Register service worker
        const registration = await navigator.serviceWorker.register('/sw.js');
        await navigator.serviceWorker.ready;

        // Create push subscription
        const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa40HI2BbcQYLaS9gEhQRKdLf5Cp-9hMlDnlkMVOSgOhhR7f87TNVGg5I2rG7w';
        
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
        });

        // Send subscription to server
        await fetch('/api/notifications/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscription,
            userId: 'current_user_id' // This would come from auth context
          })
        });

        setPermission(prev => ({
          ...prev,
          permission: result,
          subscription,
          isLoading: false
        }));

        setShowSetup(false);
        showSuccessMessage();
      } else {
        setPermission(prev => ({ ...prev, permission: result, isLoading: false }));
      }
    } catch (error) {
      console.error('Error setting up push notifications:', error);
      setPermission(prev => ({ ...prev, isLoading: false }));
    }
  }, [permission.isSupported]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!permission.subscription) return;

    try {
      await permission.subscription.unsubscribe();
      
      // Remove subscription from server
      await fetch('/api/notifications/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current_user_id'
        })
      });

      setPermission(prev => ({
        ...prev,
        subscription: null
      }));
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
    }
  }, [permission.subscription]);

  // Convert VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // Show success message
  const showSuccessMessage = () => {
    const notification = new Notification('Notificações Ativadas! 🎉', {
      body: 'Você receberá notificações sobre seus bookings em tempo real.',
      icon: '/images/icons/notification-icon.png'
    });

    setTimeout(() => notification.close(), 5000);
  };

  // Test notification
  const sendTestNotification = useCallback(async () => {
    try {
      await fetch('/api/notifications/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current_user_id',
          type: 'test'
        })
      });
    } catch (error) {
      console.error('Error sending test notification:', error);
    }
  }, []);

  // Mock recent notifications for demo
  useEffect(() => {
    const mockNotifications: BookingNotification[] = [
      {
        id: '1',
        type: 'booking_request',
        title: 'Nova Solicitação de Booking',
        message: 'João Silva enviou uma solicitação para Gravação de Vocal',
        bookingId: 'booking_123',
        timestamp: new Date().toISOString(),
        urgency: 'high',
        action: {
          label: 'Ver Detalhes',
          url: '/bookings/booking/booking_123'
        }
      },
      {
        id: '2',
        type: 'booking_accepted',
        title: 'Booking Aceito',
        message: 'Marina Santos aceitou seu booking para Gravação de Vocal',
        bookingId: 'booking_124',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        urgency: 'medium',
        action: {
          label: 'Confirmar Pagamento',
          url: '/bookings/payment/booking_124'
        }
      },
      {
        id: '3',
        type: 'reminder',
        title: 'Lembrete de Booking',
        message: 'Seu booking com Carlos Mendes é em 2 horas',
        bookingId: 'booking_125',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        urgency: 'medium',
        action: {
          label: 'Ver Agenda',
          url: '/bookings/dashboard'
        }
      }
    ];

    setRecentNotifications(mockNotifications);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_request': return '📥';
      case 'booking_accepted': return '✅';
      case 'booking_confirmed': return '💳';
      case 'booking_cancelled': return '❌';
      case 'booking_completed': return '🎉';
      case 'payment_received': return '💰';
      case 'reminder': return '⏰';
      default: return '📱';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  if (!permission.isSupported) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-lg font-bold text-white mb-2">
            Push Notifications não suportadas
          </h3>
          <p className="text-gray-400 text-sm">
            Seu navegador não suporta notificações push. Use um navegador moderno para receber notificações em tempo real.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Setup Modal */}
      <AnimatePresence>
        {showSetup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔔</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Ativar Notificações Push
                </h3>
                <p className="text-gray-300 mb-6">
                  Receba notificações instantâneas sobre seus bookings, mensagens e atualizações importantes, mesmo quando não estiver usando o site.
                </p>
                
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">Você será notificado sobre:</h4>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Novas solicitações de booking</li>
                    <li>• Confirmações e cancelamentos</li>
                    <li>• Mensagens recebidas</li>
                    <li>• Lembretes de agendamentos</li>
                    <li>• Atualizações de pagamento</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowSetup(false)}
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Não Agora
                  </button>
                  <button
                    onClick={requestPermission}
                    disabled={permission.isLoading}
                    className="flex-1 bg-primary-500 text-black px-4 py-3 rounded-lg hover:bg-primary-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {permission.isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Ativando...</span>
                      </>
                    ) : (
                      'Ativar Notificações'
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notification Status */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Notificações Push</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            permission.permission === 'granted' && permission.subscription
              ? 'bg-green-500/20 text-green-400'
              : permission.permission === 'denied'
              ? 'bg-red-500/20 text-red-400'
              : 'bg-yellow-500/20 text-yellow-400'
          }`}>
            {permission.permission === 'granted' && permission.subscription
              ? 'Ativadas'
              : permission.permission === 'denied'
              ? 'Bloqueadas'
              : 'Não Configuradas'
            }
          </div>
        </div>

        <div className="space-y-4">
          {permission.permission === 'default' && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-blue-400 text-xl">💡</span>
                <div className="flex-1">
                  <p className="text-blue-300 text-sm">
                    Configure as notificações push para receber atualizações em tempo real sobre seus bookings.
                  </p>
                </div>
                <button
                  onClick={() => setShowSetup(true)}
                  className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-lg text-sm hover:bg-blue-500/30 transition-colors"
                >
                  Configurar
                </button>
              </div>
            </div>
          )}

          {permission.permission === 'denied' && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-red-400 text-xl">🚫</span>
                <div className="flex-1">
                  <p className="text-red-300 text-sm mb-2">
                    As notificações estão bloqueadas. Para ativar:
                  </p>
                  <ol className="text-red-300 text-xs space-y-1">
                    <li>1. Clique no ícone de cadeado na barra de endereços</li>
                    <li>2. Altere as notificações para "Permitir"</li>
                    <li>3. Recarregue a página</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {permission.permission === 'granted' && permission.subscription && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-xl">✅</span>
                  <div>
                    <p className="text-green-300 text-sm">
                      Notificações ativadas com sucesso! Você receberá atualizações em tempo real.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={sendTestNotification}
                    className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs hover:bg-green-500/30 transition-colors"
                  >
                    Testar
                  </button>
                  <button
                    onClick={unsubscribe}
                    className="bg-red-500/20 text-red-400 px-3 py-1 rounded text-xs hover:bg-red-500/30 transition-colors"
                  >
                    Desativar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Notifications */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Notificações Recentes</h3>
        
        <div className="space-y-3">
          {recentNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`border rounded-lg p-4 ${getUrgencyColor(notification.urgency)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                <div className="flex-1">
                  <h4 className="text-white font-medium mb-1">{notification.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-xs">
                      {new Date(notification.timestamp).toLocaleString('pt-BR')}
                    </span>
                    {notification.action && (
                      <button className="bg-primary-500/20 text-primary-400 px-3 py-1 rounded text-xs hover:bg-primary-500/30 transition-colors">
                        {notification.action.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PushNotificationManager;