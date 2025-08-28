import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const preferencesSchema = z.object({
  userId: z.string().min(1),
  pushNotifications: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  categories: z.object({
    booking: z.boolean(),
    message: z.boolean(),
    payment: z.boolean(),
    system: z.boolean(),
    reminder: z.boolean(),
    marketing: z.boolean()
  }),
  quietHours: z.object({
    enabled: z.boolean(),
    start: z.string(),
    end: z.string(),
    timezone: z.string()
  }),
  frequency: z.enum(['immediate', 'hourly', 'daily', 'weekly']),
  priority: z.object({
    low: z.boolean(),
    medium: z.boolean(),
    high: z.boolean(),
    urgent: z.boolean()
  }),
  devices: z.object({
    desktop: z.boolean(),
    mobile: z.boolean(),
    tablet: z.boolean()
  }),
  sound: z.object({
    enabled: z.boolean(),
    volume: z.number().min(0).max(100),
    customSound: z.string()
  })
});

// Mock storage for preferences (use database in production)
const userPreferences = new Map<string, any>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = preferencesSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid preferences data',
        details: validationResult.error.errors 
      }, { status: 400 });
    }

    const preferences = validationResult.data;
    
    // Store preferences
    userPreferences.set(preferences.userId, {
      ...preferences,
      updatedAt: new Date().toISOString()
    });

    console.log(`Preferences updated for user ${preferences.userId}`);

    return NextResponse.json({ 
      success: true,
      message: 'Preferences saved successfully'
    });

  } catch (error) {
    console.error('Preferences save error:', error);
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

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

    const preferences = userPreferences.get(userId);
    
    if (!preferences) {
      // Return default preferences
      const defaultPreferences = {
        userId,
        pushNotifications: true,
        emailNotifications: true,
        smsNotifications: false,
        categories: {
          booking: true,
          message: true,
          payment: true,
          system: true,
          reminder: true,
          marketing: false
        },
        quietHours: {
          enabled: false,
          start: '22:00',
          end: '08:00',
          timezone: 'America/Sao_Paulo'
        },
        frequency: 'immediate',
        priority: {
          low: false,
          medium: true,
          high: true,
          urgent: true
        },
        devices: {
          desktop: true,
          mobile: true,
          tablet: true
        },
        sound: {
          enabled: true,
          volume: 70,
          customSound: 'default'
        }
      };

      return NextResponse.json({
        success: true,
        preferences: defaultPreferences,
        isDefault: true
      });
    }

    return NextResponse.json({
      success: true,
      preferences,
      isDefault: false
    });

  } catch (error) {
    console.error('Preferences fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ 
        success: false, 
        error: 'User ID required' 
      }, { status: 400 });
    }

    const deleted = userPreferences.delete(userId);

    return NextResponse.json({ 
      success: deleted,
      message: deleted ? 'Preferences reset to default' : 'No preferences found'
    });

  } catch (error) {
    console.error('Preferences delete error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Server error' 
    }, { status: 500 });
  }
}