import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Subscription schema
const subscriptionSchema = z.object({
  subscription: z.object({
    endpoint: z.string().url(),
    keys: z.object({
      p256dh: z.string(),
      auth: z.string()
    })
  }),
  userId: z.string().min(1)
});

// Mock database for storing subscriptions (use real database in production)
const subscriptions = new Map<string, any>();

// VAPID configuration (in production, store these securely)
const VAPID_SUBJECT = 'mailto:notifications@valhallahub.com';
const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY || 'BEl62iUYgUivxIkv69yViEuiBIa40HI2BbcQYLaS9gEhQRKdLf5Cp-9hMlDnlkMVOSgOhhR7f87TNVGg5I2rG7w';
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || 'aUiz4CvqJBhj3KW3OZ5R-1z4uD9RQONR9_-VgCxPE8g';

// Helper function to send push notification
async function sendPushNotification(subscription: any, payload: any) {
  try {
    // In production, use a proper push notification library like web-push
    console.log('Sending push notification:', { subscription, payload });
    
    // Mock implementation - in production, use web-push library:
    // const webpush = require('web-push');
    // webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    // await webpush.sendNotification(subscription, JSON.stringify(payload));
    
    return true;
  } catch (error) {
    console.error('Failed to send push notification:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'subscribe';
    const body = await request.json();

    switch (action) {
      case 'subscribe': {
        const validationResult = subscriptionSchema.safeParse(body);
        if (!validationResult.success) {
          return NextResponse.json({ 
            success: false, 
            error: 'Invalid subscription data',
            details: validationResult.error.errors 
          }, { status: 400 });
        }

        const { subscription, userId } = validationResult.data;
        
        // Store subscription
        subscriptions.set(userId, {
          ...subscription,
          userId,
          createdAt: new Date().toISOString(),
          isActive: true
        });

        console.log(`Push subscription created for user ${userId}`);

        // Send welcome notification
        await sendPushNotification(subscription, {
          title: 'Notificações Ativadas! 🎉',
          body: 'Você receberá atualizações em tempo real sobre seus bookings.',
          type: 'welcome',
          data: { url: '/bookings/dashboard' }
        });

        return NextResponse.json({ 
          success: true,
          message: 'Subscription created successfully'
        });
      }

      case 'unsubscribe': {
        const { userId } = body;
        
        if (!userId) {
          return NextResponse.json({ 
            success: false, 
            error: 'User ID required' 
          }, { status: 400 });
        }

        // Remove subscription
        const removed = subscriptions.delete(userId);

        return NextResponse.json({ 
          success: removed,
          message: removed ? 'Unsubscribed successfully' : 'Subscription not found'
        });
      }

      case 'send': {
        const { userId, notification } = body;
        
        if (!userId || !notification) {
          return NextResponse.json({ 
            success: false, 
            error: 'User ID and notification data required' 
          }, { status: 400 });
        }

        const subscription = subscriptions.get(userId);
        if (!subscription || !subscription.isActive) {
          return NextResponse.json({ 
            success: false, 
            error: 'No active subscription found for user' 
          }, { status: 404 });
        }

        const success = await sendPushNotification(subscription, notification);

        return NextResponse.json({ 
          success,
          message: success ? 'Notification sent' : 'Failed to send notification'
        });
      }

      case 'send_bulk': {
        const { userIds, notification } = body;
        
        if (!Array.isArray(userIds) || !notification) {
          return NextResponse.json({ 
            success: false, 
            error: 'User IDs array and notification data required' 
          }, { status: 400 });
        }

        const results = [];
        
        for (const userId of userIds) {
          const subscription = subscriptions.get(userId);
          if (subscription && subscription.isActive) {
            const success = await sendPushNotification(subscription, notification);
            results.push({ userId, success });
          } else {
            results.push({ userId, success: false, error: 'No active subscription' });
          }
        }

        const successCount = results.filter(r => r.success).length;

        return NextResponse.json({ 
          success: true,
          results,
          summary: {
            total: userIds.length,
            sent: successCount,
            failed: userIds.length - successCount
          }
        });
      }

      case 'test': {
        const { userId } = body;
        
        if (!userId) {
          return NextResponse.json({ 
            success: false, 
            error: 'User ID required' 
          }, { status: 400 });
        }

        const subscription = subscriptions.get(userId);
        if (!subscription || !subscription.isActive) {
          return NextResponse.json({ 
            success: false, 
            error: 'No active subscription found for user' 
          }, { status: 404 });
        }

        const testNotification = {
          title: 'Teste de Notificação 🧪',
          body: 'Se você está vendo isso, as notificações estão funcionando perfeitamente!',
          type: 'test',
          data: { url: '/bookings/dashboard' },
          icon: '/images/icons/test-notification.png'
        };

        const success = await sendPushNotification(subscription, testNotification);

        return NextResponse.json({ 
          success,
          message: success ? 'Test notification sent' : 'Failed to send test notification'
        });
      }

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Push notification API error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    switch (action) {
      case 'status': {
        if (!userId) {
          return NextResponse.json({ 
            success: false, 
            error: 'User ID required' 
          }, { status: 400 });
        }

        const subscription = subscriptions.get(userId);
        
        return NextResponse.json({
          success: true,
          isSubscribed: !!subscription?.isActive,
          subscription: subscription ? {
            createdAt: subscription.createdAt,
            isActive: subscription.isActive
          } : null
        });
      }

      case 'stats': {
        const totalSubscriptions = Array.from(subscriptions.values()).length;
        const activeSubscriptions = Array.from(subscriptions.values()).filter(s => s.isActive).length;
        
        return NextResponse.json({
          success: true,
          stats: {
            total: totalSubscriptions,
            active: activeSubscriptions,
            inactive: totalSubscriptions - activeSubscriptions
          }
        });
      }

      case 'vapid_key': {
        return NextResponse.json({
          success: true,
          publicKey: VAPID_PUBLIC_KEY
        });
      }

      default:
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid action' 
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Push notification GET error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

// Helper function to create booking notification
export function createBookingNotification(type: string, data: any) {
  const notifications = {
    booking_request: {
      title: 'Nova Solicitação de Booking',
      body: `${data.clientName} enviou uma solicitação para ${data.service}`,
      type: 'booking_request',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/booking/${data.bookingId}`
      },
      requireInteraction: true
    },
    
    booking_accepted: {
      title: 'Booking Aceito',
      body: `${data.professionalName} aceitou seu booking para ${data.service}`,
      type: 'booking_accepted',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/booking/${data.bookingId}`
      }
    },
    
    booking_confirmed: {
      title: 'Booking Confirmado',
      body: `Seu booking para ${data.service} foi confirmado para ${data.date}`,
      type: 'booking_confirmed',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/booking/${data.bookingId}`
      }
    },
    
    booking_cancelled: {
      title: 'Booking Cancelado',
      body: `O booking para ${data.service} foi cancelado`,
      type: 'booking_cancelled',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/dashboard`
      }
    },
    
    booking_completed: {
      title: 'Booking Concluído',
      body: `O booking para ${data.service} foi concluído com sucesso`,
      type: 'booking_completed',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/booking/${data.bookingId}`
      }
    },
    
    payment_received: {
      title: 'Pagamento Recebido',
      body: `Você recebeu R$ ${data.amount} pelo serviço ${data.service}`,
      type: 'payment_received',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/dashboard`
      }
    },
    
    reminder: {
      title: 'Lembrete de Booking',
      body: `Seu booking com ${data.contactName} é em ${data.timeRemaining}`,
      type: 'reminder',
      data: {
        bookingId: data.bookingId,
        url: `/bookings/booking/${data.bookingId}`
      },
      requireInteraction: true
    }
  };

  return notifications[type as keyof typeof notifications] || null;
}