import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const bookingStatusSchema = z.object({
  bookingId: z.string().min(1),
  status: z.enum(['pending', 'accepted', 'confirmed', 'in-progress', 'completed', 'cancelled', 'disputed']),
  userId: z.string().min(1),
  userRole: z.enum(['client', 'professional']),
  message: z.string().optional(),
  cancellationReason: z.string().optional(),
  completionNotes: z.string().optional(),
});

interface BookingWorkflow {
  status: string;
  allowedNextStates: string[];
  requiredRole: 'client' | 'professional' | 'both';
  autoActions?: string[];
}

const bookingWorkflow: Record<string, BookingWorkflow> = {
  pending: {
    status: 'pending',
    allowedNextStates: ['accepted', 'cancelled'],
    requiredRole: 'professional',
    autoActions: ['send_notification_to_professional']
  },
  accepted: {
    status: 'accepted',
    allowedNextStates: ['confirmed', 'cancelled'],
    requiredRole: 'client',
    autoActions: ['request_payment', 'send_confirmation_to_client']
  },
  confirmed: {
    status: 'confirmed',
    allowedNextStates: ['in-progress', 'cancelled'],
    requiredRole: 'both',
    autoActions: ['schedule_reminder', 'prepare_workspace']
  },
  'in-progress': {
    status: 'in-progress',
    allowedNextStates: ['completed', 'disputed', 'cancelled'],
    requiredRole: 'professional',
    autoActions: ['start_timer', 'enable_real_time_updates']
  },
  completed: {
    status: 'completed',
    allowedNextStates: ['disputed'],
    requiredRole: 'professional',
    autoActions: ['release_payment', 'request_review', 'generate_invoice']
  },
  cancelled: {
    status: 'cancelled',
    allowedNextStates: [],
    requiredRole: 'both',
    autoActions: ['process_refund', 'notify_cancellation', 'update_availability']
  },
  disputed: {
    status: 'disputed',
    allowedNextStates: ['completed', 'cancelled'],
    requiredRole: 'both',
    autoActions: ['hold_payment', 'notify_support', 'start_mediation']
  }
};

interface StatusUpdateResult {
  success: boolean;
  booking?: any;
  notifications?: string[];
  error?: string;
}

async function updateBookingStatus(
  bookingId: string,
  newStatus: string,
  userId: string,
  userRole: 'client' | 'professional',
  metadata?: any
): Promise<StatusUpdateResult> {
  try {
    // Simulate fetching current booking
    const currentBooking = {
      id: bookingId,
      status: 'pending',
      clientId: 'client_123',
      professionalId: 'prof_456',
      service: 'Vocal Recording',
      price: 800,
      startDate: '2024-01-25T14:00:00Z'
    };

    const currentWorkflow = bookingWorkflow[currentBooking.status];
    const targetWorkflow = bookingWorkflow[newStatus];

    if (!currentWorkflow || !targetWorkflow) {
      return { success: false, error: 'Invalid booking status' };
    }

    // Check if transition is allowed
    if (!currentWorkflow.allowedNextStates.includes(newStatus)) {
      return { 
        success: false, 
        error: `Cannot transition from ${currentBooking.status} to ${newStatus}` 
      };
    }

    // Check user permissions
    if (targetWorkflow.requiredRole !== 'both' && targetWorkflow.requiredRole !== userRole) {
      return { 
        success: false, 
        error: `Only ${targetWorkflow.requiredRole} can perform this action` 
      };
    }

    // Update booking status
    const updatedBooking = {
      ...currentBooking,
      status: newStatus,
      updatedAt: new Date().toISOString(),
      statusHistory: [
        {
          status: newStatus,
          updatedBy: userId,
          updatedAt: new Date().toISOString(),
          metadata
        }
      ]
    };

    // Execute auto actions
    const notifications: string[] = [];
    if (targetWorkflow.autoActions) {
      for (const action of targetWorkflow.autoActions) {
        await executeAutoAction(action, updatedBooking, notifications);
      }
    }

    return {
      success: true,
      booking: updatedBooking,
      notifications
    };

  } catch (error) {
    console.error('Status update error:', error);
    return { success: false, error: 'Failed to update booking status' };
  }
}

async function executeAutoAction(action: string, booking: any, notifications: string[]) {
  switch (action) {
    case 'send_notification_to_professional':
      notifications.push(`Professional notified about new booking request`);
      // Implement push notification logic
      break;
    
    case 'request_payment':
      notifications.push(`Payment request sent to client`);
      // Implement payment processing
      break;
    
    case 'send_confirmation_to_client':
      notifications.push(`Booking confirmation sent to client`);
      break;
    
    case 'schedule_reminder':
      notifications.push(`Reminder scheduled for ${booking.startDate}`);
      // Implement scheduling logic
      break;
    
    case 'start_timer':
      notifications.push(`Project timer started`);
      // Implement time tracking
      break;
    
    case 'release_payment':
      notifications.push(`Payment released to professional`);
      // Implement payment release
      break;
    
    case 'request_review':
      notifications.push(`Review request sent to client`);
      break;
    
    case 'process_refund':
      notifications.push(`Refund processed`);
      // Implement refund logic
      break;
    
    case 'notify_support':
      notifications.push(`Support team notified about dispute`);
      break;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = bookingStatusSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request data',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    const { bookingId, status, userId, userRole, message, cancellationReason, completionNotes } = validationResult.data;

    const metadata = {
      message,
      cancellationReason,
      completionNotes,
      timestamp: new Date().toISOString()
    };

    const result = await updateBookingStatus(bookingId, status, userId, userRole, metadata);

    if (!result.success) {
      return NextResponse.json({ 
        success: false, 
        error: result.error 
      }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      booking: result.booking,
      notifications: result.notifications,
      nextAllowedStates: bookingWorkflow[status]?.allowedNextStates || []
    });

  } catch (error) {
    console.error('Booking status update error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('bookingId');

    if (!bookingId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Booking ID required' 
      }, { status: 400 });
    }

    // Simulate fetching booking with status history
    const booking = {
      id: bookingId,
      status: 'in-progress',
      statusHistory: [
        {
          status: 'pending',
          updatedBy: 'client_123',
          updatedAt: '2024-01-20T10:00:00Z',
          metadata: { message: 'Initial booking request' }
        },
        {
          status: 'accepted',
          updatedBy: 'prof_456',
          updatedAt: '2024-01-20T11:30:00Z',
          metadata: { message: 'Booking accepted by professional' }
        },
        {
          status: 'confirmed',
          updatedBy: 'client_123',
          updatedAt: '2024-01-20T12:00:00Z',
          metadata: { message: 'Payment confirmed' }
        },
        {
          status: 'in-progress',
          updatedBy: 'prof_456',
          updatedAt: '2024-01-25T14:00:00Z',
          metadata: { message: 'Project started' }
        }
      ]
    };

    const currentWorkflow = bookingWorkflow[booking.status];

    return NextResponse.json({
      success: true,
      booking,
      workflow: {
        currentStatus: booking.status,
        allowedNextStates: currentWorkflow?.allowedNextStates || [],
        requiredRole: currentWorkflow?.requiredRole
      }
    });

  } catch (error) {
    console.error('Booking status fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}