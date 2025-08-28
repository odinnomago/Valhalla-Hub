import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking_request' | 'booking_accepted' | 'booking_confirmed' | 'booking_cancelled' | 
        'booking_completed' | 'message_received' | 'payment_received' | 'review_received' |
        'system_announcement' | 'reminder';
  title: string;
  message: string;
  data?: Record<string, any>;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isRead: boolean;
  isActionable: boolean;
  actions?: NotificationAction[];
  createdAt: string;
  expiresAt?: string;
  category: 'booking' | 'message' | 'payment' | 'system' | 'reminder';
}

export interface NotificationAction {
  id: string;
  label: string;
  type: 'button' | 'link';
  url?: string;
  action?: string;
  style: 'primary' | 'secondary' | 'danger';
}

// Notification preferences
export interface NotificationPreferences {
  userId: string;
  pushNotifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    booking: boolean;
    message: boolean;
    payment: boolean;
    system: boolean;
    reminder: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  frequency: 'immediate' | 'hourly' | 'daily';
}

// In-memory storage for demo (use Redis/Database in production)
const notifications: Map<string, Notification[]> = new Map();
const userPreferences: Map<string, NotificationPreferences> = new Map();
const activeConnections: Map<string, Set<WebSocket>> = new Map();

// Notification templates
const notificationTemplates = {
  booking_request: (data: any) => ({
    title: 'Nova Solicitação de Booking',
    message: `${data.clientName} enviou uma solicitação para ${data.service}`,
    priority: 'high' as const,
    category: 'booking' as const,
    isActionable: true,
    actions: [
      {
        id: 'accept',
        label: 'Aceitar',
        type: 'button' as const,
        action: 'accept_booking',
        style: 'primary' as const
      },
      {
        id: 'decline',
        label: 'Recusar',
        type: 'button' as const,
        action: 'decline_booking',
        style: 'secondary' as const
      }
    ]
  }),
  
  booking_accepted: (data: any) => ({
    title: 'Booking Aceito',
    message: `${data.professionalName} aceitou seu booking para ${data.service}`,
    priority: 'medium' as const,
    category: 'booking' as const,
    isActionable: true,
    actions: [
      {
        id: 'confirm',
        label: 'Confirmar Pagamento',
        type: 'button' as const,
        action: 'confirm_payment',
        style: 'primary' as const
      }
    ]
  }),

  booking_confirmed: (data: any) => ({
    title: 'Booking Confirmado',
    message: `Seu booking para ${data.service} foi confirmado para ${data.date}`,
    priority: 'medium' as const,
    category: 'booking' as const,
    isActionable: false
  }),

  booking_cancelled: (data: any) => ({
    title: 'Booking Cancelado',
    message: `O booking para ${data.service} foi cancelado. Motivo: ${data.reason}`,
    priority: 'high' as const,
    category: 'booking' as const,
    isActionable: false
  }),

  message_received: (data: any) => ({
    title: 'Nova Mensagem',
    message: `${data.senderName}: ${data.preview}`,
    priority: 'medium' as const,
    category: 'message' as const,
    isActionable: true,
    actions: [
      {
        id: 'reply',
        label: 'Responder',
        type: 'link' as const,
        url: `/bookings/messages/${data.conversationId}`,
        style: 'primary' as const
      }
    ]
  }),

  payment_received: (data: any) => ({
    title: 'Pagamento Recebido',
    message: `Você recebeu R$ ${data.amount} pelo serviço ${data.service}`,
    priority: 'medium' as const,
    category: 'payment' as const,
    isActionable: false
  }),

  reminder: (data: any) => ({
    title: 'Lembrete de Booking',
    message: `Seu booking com ${data.contactName} está agendado para ${data.time}`,
    priority: 'medium' as const,
    category: 'reminder' as const,
    isActionable: true,
    actions: [
      {
        id: 'details',
        label: 'Ver Detalhes',
        type: 'link' as const,
        url: `/bookings/booking/${data.bookingId}`,
        style: 'primary' as const
      }
    ]
  })
};

class NotificationService {
  static createNotification(
    userId: string,
    type: keyof typeof notificationTemplates,
    data: any
  ): Notification {
    const template = notificationTemplates[type](data);
    
    const notification: Notification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type,
      ...template,
      data,
      isRead: false,
      createdAt: new Date().toISOString(),
      expiresAt: data.expiresAt
    };

    return notification;
  }

  static async sendNotification(notification: Notification): Promise<boolean> {
    try {
      // Store notification
      const userNotifications = notifications.get(notification.userId) || [];
      userNotifications.unshift(notification);
      
      // Keep only last 100 notifications per user
      if (userNotifications.length > 100) {
        userNotifications.splice(100);
      }
      
      notifications.set(notification.userId, userNotifications);

      // Send real-time notification via WebSocket
      const connections = activeConnections.get(notification.userId);
      if (connections) {
        const message = JSON.stringify({
          type: 'notification',
          data: notification
        });

        connections.forEach(ws => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(message);
          }
        });
      }

      // Check user preferences for additional delivery methods
      const preferences = userPreferences.get(notification.userId);
      if (preferences) {
        await this.deliverNotification(notification, preferences);
      }

      return true;
    } catch (error) {
      console.error('Failed to send notification:', error);
      return false;
    }
  }

  static async deliverNotification(
    notification: Notification,
    preferences: NotificationPreferences
  ) {
    // Check if category is enabled
    if (!preferences.categories[notification.category]) {
      return;
    }

    // Check quiet hours
    if (preferences.quietHours.enabled) {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      if (currentTime >= preferences.quietHours.start && 
          currentTime <= preferences.quietHours.end &&
          notification.priority !== 'urgent') {
        return;
      }
    }

    // Send push notification
    if (preferences.pushNotifications) {
      await this.sendPushNotification(notification);
    }

    // Send email notification
    if (preferences.emailNotifications && 
        (notification.priority === 'high' || notification.priority === 'urgent')) {
      await this.sendEmailNotification(notification);
    }

    // Send SMS notification (for urgent only)
    if (preferences.smsNotifications && notification.priority === 'urgent') {
      await this.sendSMSNotification(notification);
    }
  }

  static async sendPushNotification(notification: Notification) {
    // Implement push notification logic
    console.log('Sending push notification:', notification.title);
  }

  static async sendEmailNotification(notification: Notification) {
    // Implement email notification logic
    console.log('Sending email notification:', notification.title);
  }

  static async sendSMSNotification(notification: Notification) {
    // Implement SMS notification logic
    console.log('Sending SMS notification:', notification.title);
  }

  static getUserNotifications(userId: string, limit = 50): Notification[] {
    return notifications.get(userId)?.slice(0, limit) || [];
  }

  static markAsRead(userId: string, notificationId: string): boolean {
    const userNotifications = notifications.get(userId);
    if (!userNotifications) return false;

    const notification = userNotifications.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
      return true;
    }
    return false;
  }

  static markAllAsRead(userId: string): number {
    const userNotifications = notifications.get(userId);
    if (!userNotifications) return 0;

    let count = 0;
    userNotifications.forEach(notification => {
      if (!notification.isRead) {
        notification.isRead = true;
        count++;
      }
    });

    return count;
  }

  static deleteNotification(userId: string, notificationId: string): boolean {
    const userNotifications = notifications.get(userId);
    if (!userNotifications) return false;

    const index = userNotifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      userNotifications.splice(index, 1);
      return true;
    }
    return false;
  }

  static getUnreadCount(userId: string): number {
    const userNotifications = notifications.get(userId);
    if (!userNotifications) return 0;

    return userNotifications.filter(n => !n.isRead).length;
  }

  static addConnection(userId: string, ws: WebSocket) {
    if (!activeConnections.has(userId)) {
      activeConnections.set(userId, new Set());
    }
    activeConnections.get(userId)!.add(ws);

    ws.addEventListener('close', () => {
      activeConnections.get(userId)?.delete(ws);
      if (activeConnections.get(userId)?.size === 0) {
        activeConnections.delete(userId);
      }
    });
  }
}

// Schema for creating notifications
const createNotificationSchema = z.object({
  userId: z.string().min(1),
  type: z.enum(['booking_request', 'booking_accepted', 'booking_confirmed', 
                'booking_cancelled', 'booking_completed', 'message_received', 
                'payment_received', 'review_received', 'system_announcement', 'reminder']),
  data: z.record(z.any())
});

// Schema for notification actions
const notificationActionSchema = z.object({
  notificationId: z.string().min(1),
  action: z.string().min(1),
  data: z.record(z.any()).optional()
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    switch (action) {
      case 'create': {
        const validationResult = createNotificationSchema.safeParse(body);
        if (!validationResult.success) {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid request data' 
          }, { status: 400 });
        }

        const { userId, type, data } = validationResult.data;
        const notification = NotificationService.createNotification(userId, type, data);
        const success = await NotificationService.sendNotification(notification);

        return NextResponse.json({
          success,
          notification: success ? notification : null
        });
      }

      case 'mark_read': {
        const { userId, notificationId } = body;
        const success = NotificationService.markAsRead(userId, notificationId);
        
        return NextResponse.json({ success });
      }

      case 'mark_all_read': {
        const { userId } = body;
        const count = NotificationService.markAllAsRead(userId);
        
        return NextResponse.json({ success: true, count });
      }

      case 'delete': {
        const { userId, notificationId } = body;
        const success = NotificationService.deleteNotification(userId, notificationId);
        
        return NextResponse.json({ success });
      }

      case 'action': {
        const validationResult = notificationActionSchema.safeParse(body);
        if (!validationResult.success) {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid action data' 
          }, { status: 400 });
        }

        // Handle notification actions (accept booking, confirm payment, etc.)
        const { notificationId, action: actionType, data } = validationResult.data;
        
        // Process the action based on type
        console.log(`Processing action ${actionType} for notification ${notificationId}`);
        
        return NextResponse.json({ 
          success: true,
          message: `Action ${actionType} processed successfully`
        });
      }

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Notification API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

    switch (action) {
      case 'list': {
        const limit = parseInt(searchParams.get('limit') || '50');
        const notifications = NotificationService.getUserNotifications(userId, limit);
        
        return NextResponse.json({
          success: true,
          notifications,
          unreadCount: NotificationService.getUnreadCount(userId)
        });
      }

      case 'unread_count': {
        const count = NotificationService.getUnreadCount(userId);
        
        return NextResponse.json({
          success: true,
          count
        });
      }

      default: {
        // Default to listing notifications
        const notifications = NotificationService.getUserNotifications(userId);
        
        return NextResponse.json({
          success: true,
          notifications,
          unreadCount: NotificationService.getUnreadCount(userId)
        });
      }
    }
  } catch (error) {
    console.error('Notification fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

export { NotificationService };