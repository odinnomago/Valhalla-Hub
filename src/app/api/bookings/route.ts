import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Booking request validation schema
const bookingRequestSchema = z.object({
  professionalId: z.string().min(1, 'Professional ID is required'),
  serviceId: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
  projectDetails: z.object({
    name: z.string().min(1, 'Project name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    requirements: z.string().optional(),
    budget: z.string().optional(),
  }),
  clientInfo: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    phone: z.string().min(10, 'Phone number is required'),
  }),
  paymentMethod: z.enum(['card', 'pix', 'bank_transfer']).optional(),
});

interface BookingData {
  id: string;
  professionalId: string;
  serviceId?: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  projectDetails: {
    name: string;
    description: string;
    requirements?: string;
    budget?: string;
  };
  clientInfo: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
  totalAmount?: number;
  paymentStatus?: 'pending' | 'paid' | 'refunded';
}

// Mock database operations (replace with real database in production)
const mockBookings: BookingData[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validationResult = bookingRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const bookingData = validationResult.data;

    // Check professional availability (mock check)
    const isAvailable = await checkProfessionalAvailability(
      bookingData.professionalId,
      bookingData.date,
      bookingData.time
    );

    if (!isAvailable) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Professional is not available at this time'
        },
        { status: 409 }
      );
    }

    // Create booking record
    const booking: BookingData = {
      id: generateId(),
      professionalId: bookingData.professionalId,
      serviceId: bookingData.serviceId,
      date: bookingData.date,
      time: bookingData.time,
      status: 'pending',
      projectDetails: bookingData.projectDetails,
      clientInfo: bookingData.clientInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to database (mock)
    mockBookings.push(booking);

    // Send notification to professional
    await sendBookingNotification(booking);

    // Send confirmation email to client
    await sendClientConfirmation(booking);

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        status: booking.status,
        date: booking.date,
        time: booking.time,
        professionalId: booking.professionalId
      }
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const professionalId = searchParams.get('professionalId');
    const clientEmail = searchParams.get('clientEmail');
    const status = searchParams.get('status');

    let filteredBookings = [...mockBookings];

    // Filter by professional
    if (professionalId) {
      filteredBookings = filteredBookings.filter(
        booking => booking.professionalId === professionalId
      );
    }

    // Filter by client
    if (clientEmail) {
      filteredBookings = filteredBookings.filter(
        booking => booking.clientInfo.email === clientEmail
      );
    }

    // Filter by status
    if (status) {
      filteredBookings = filteredBookings.filter(
        booking => booking.status === status
      );
    }

    return NextResponse.json({
      success: true,
      bookings: filteredBookings
    });

  } catch (error) {
    console.error('Booking fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// Helper functions
async function checkProfessionalAvailability(
  professionalId: string,
  date: string,
  time: string
): Promise<boolean> {
  // In a real implementation, this would check the professional's calendar
  // and existing bookings
  
  // Mock availability check
  const existingBooking = mockBookings.find(
    booking => 
      booking.professionalId === professionalId &&
      booking.date === date &&
      booking.time === time &&
      booking.status !== 'cancelled'
  );

  return !existingBooking;
}

async function sendBookingNotification(booking: BookingData) {
  // In a real implementation, this would send notifications via:
  // - Email
  // - Push notifications
  // - SMS
  // - In-app notifications
  
  console.log(`Booking notification sent to professional ${booking.professionalId}`);
  
  // Mock notification data
  const notification = {
    type: 'booking_request',
    professionalId: booking.professionalId,
    bookingId: booking.id,
    message: `Nova solicitação de booking de ${booking.clientInfo.name}`,
    data: {
      clientName: booking.clientInfo.name,
      projectName: booking.projectDetails.name,
      date: booking.date,
      time: booking.time
    }
  };

  // Here you would integrate with your notification service
  // await notificationService.send(notification);
}

async function sendClientConfirmation(booking: BookingData) {
  // In a real implementation, this would send a confirmation email
  console.log(`Confirmation email sent to ${booking.clientInfo.email}`);
  
  // Mock email data
  const emailData = {
    to: booking.clientInfo.email,
    subject: 'Solicitação de Booking Recebida - Valhalla Hub',
    template: 'booking_confirmation',
    data: {
      clientName: booking.clientInfo.name,
      bookingId: booking.id,
      projectName: booking.projectDetails.name,
      date: new Date(booking.date).toLocaleDateString('pt-BR'),
      time: booking.time,
      status: booking.status
    }
  };

  // Here you would integrate with your email service
  // await emailService.send(emailData);
}

function generateId(): string {
  return 'booking_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}