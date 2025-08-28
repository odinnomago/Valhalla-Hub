// Service Worker for Push Notifications
const CACHE_NAME = 'valhalla-hub-notifications-v1';

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(self.clients.claim());
});

// Push event handler
self.addEventListener('push', (event) => {
  console.log('Push notification received', event);

  let notificationData = {
    title: 'Valhalla Hub',
    body: 'Você tem uma nova notificação',
    icon: '/images/icons/notification-icon.png',
    badge: '/images/icons/notification-badge.png',
    tag: 'default',
    data: {}
  };

  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        ...data
      };
    } catch (error) {
      console.error('Error parsing push data:', error);
    }
  }

  // Customize notification based on type
  if (notificationData.type) {
    switch (notificationData.type) {
      case 'booking_request':
        notificationData.icon = '/images/icons/booking-request.png';
        notificationData.requireInteraction = true;
        notificationData.actions = [
          {
            action: 'accept',
            title: 'Aceitar',
            icon: '/images/icons/accept.png'
          },
          {
            action: 'decline',
            title: 'Recusar',
            icon: '/images/icons/decline.png'
          }
        ];
        break;
      
      case 'booking_accepted':
        notificationData.icon = '/images/icons/booking-accepted.png';
        notificationData.actions = [
          {
            action: 'view',
            title: 'Ver Detalhes',
            icon: '/images/icons/view.png'
          },
          {
            action: 'pay',
            title: 'Pagar',
            icon: '/images/icons/payment.png'
          }
        ];
        break;
      
      case 'booking_confirmed':
        notificationData.icon = '/images/icons/booking-confirmed.png';
        notificationData.actions = [
          {
            action: 'view',
            title: 'Ver Agenda',
            icon: '/images/icons/calendar.png'
          }
        ];
        break;
      
      case 'message_received':
        notificationData.icon = '/images/icons/message.png';
        notificationData.actions = [
          {
            action: 'reply',
            title: 'Responder',
            icon: '/images/icons/reply.png'
          }
        ];
        break;
      
      case 'payment_received':
        notificationData.icon = '/images/icons/payment.png';
        notificationData.actions = [
          {
            action: 'view',
            title: 'Ver Detalhes',
            icon: '/images/icons/view.png'
          }
        ];
        break;
      
      case 'reminder':
        notificationData.icon = '/images/icons/reminder.png';
        notificationData.requireInteraction = true;
        notificationData.actions = [
          {
            action: 'view',
            title: 'Ver Booking',
            icon: '/images/icons/calendar.png'
          }
        ];
        break;
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon,
    badge: notificationData.badge,
    tag: notificationData.tag || notificationData.type || 'default',
    data: notificationData.data,
    requireInteraction: notificationData.requireInteraction || false,
    silent: notificationData.silent || false,
    actions: notificationData.actions || [],
    timestamp: Date.now(),
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// Notification click event handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked', event);
  
  event.notification.close();

  const action = event.action;
  const notificationData = event.notification.data;
  
  let url = '/';

  // Handle different actions
  switch (action) {
    case 'accept':
      url = `/bookings/booking/${notificationData.bookingId}?action=accept`;
      break;
    case 'decline':
      url = `/bookings/booking/${notificationData.bookingId}?action=decline`;
      break;
    case 'view':
      if (notificationData.bookingId) {
        url = `/bookings/booking/${notificationData.bookingId}`;
      } else if (notificationData.url) {
        url = notificationData.url;
      } else {
        url = '/bookings/dashboard';
      }
      break;
    case 'pay':
      url = `/bookings/payment/${notificationData.bookingId}`;
      break;
    case 'reply':
      url = `/bookings/messages/${notificationData.conversationId}`;
      break;
    default:
      // Default click behavior
      if (notificationData.url) {
        url = notificationData.url;
      } else if (notificationData.bookingId) {
        url = `/bookings/booking/${notificationData.bookingId}`;
      } else {
        url = '/bookings/dashboard';
      }
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window/tab open with the target URL
      for (const client of clientList) {
        if (client.url.includes(url.split('?')[0]) && 'focus' in client) {
          return client.focus();
        }
      }
      
      // If no existing window, open a new one
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});

// Notification close event handler
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed', event);
  
  // Track notification dismissals for analytics
  const notificationData = event.notification.data;
  
  if (notificationData.trackDismissal) {
    // Send analytics event
    fetch('/api/notifications/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event: 'notification_dismissed',
        notificationId: notificationData.id,
        type: notificationData.type,
        timestamp: Date.now()
      })
    }).catch(error => {
      console.error('Failed to track notification dismissal:', error);
    });
  }
});

// Background sync for offline notification actions
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered', event);
  
  if (event.tag === 'notification-action') {
    event.waitUntil(
      // Process any queued notification actions when back online
      processQueuedActions()
    );
  }
});

// Process queued notification actions
async function processQueuedActions() {
  try {
    // Retrieve queued actions from IndexedDB or cache
    const queuedActions = await getQueuedActions();
    
    for (const action of queuedActions) {
      try {
        await fetch('/api/notifications/action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(action)
        });
        
        // Remove from queue after successful processing
        await removeFromQueue(action.id);
      } catch (error) {
        console.error('Failed to process queued action:', error);
      }
    }
  } catch (error) {
    console.error('Error processing queued actions:', error);
  }
}

// Helper functions for queue management
async function getQueuedActions() {
  // Implementation would use IndexedDB to store offline actions
  return [];
}

async function removeFromQueue(actionId) {
  // Implementation would remove the action from IndexedDB
  console.log('Removing action from queue:', actionId);
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker received message:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

// Error handler
self.addEventListener('error', (event) => {
  console.error('Service Worker error:', event.error);
});

// Unhandled rejection handler
self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

// Periodic background sync for checking missed notifications
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-notifications') {
    event.waitUntil(checkForMissedNotifications());
  }
});

async function checkForMissedNotifications() {
  try {
    // Check for any missed notifications while offline
    const response = await fetch('/api/notifications/missed');
    const data = await response.json();
    
    if (data.success && data.notifications.length > 0) {
      // Show summary notification for missed items
      await self.registration.showNotification('Notificações Perdidas', {
        body: `Você tem ${data.notifications.length} notificações não lidas`,
        icon: '/images/icons/notification-icon.png',
        badge: '/images/icons/notification-badge.png',
        tag: 'missed-notifications',
        data: { url: '/bookings/dashboard' },
        actions: [
          {
            action: 'view',
            title: 'Ver Todas',
            icon: '/images/icons/view.png'
          }
        ]
      });
    }
  } catch (error) {
    console.error('Error checking missed notifications:', error);
  }
}