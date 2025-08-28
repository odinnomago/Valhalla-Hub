import { NextRequest, NextResponse } from 'next/server';
import { newsletterService } from '@/lib/newsletter';
import { z } from 'zod';

const subscribeSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().optional(),
  source: z.string().min(1, 'Source é obrigatório'),
  interests: z.array(z.string()).optional(),
  contentContext: z.object({
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    authorName: z.string().optional(),
    postId: z.string().optional(),
  }).optional(),
  metadata: z.object({
    user_agent: z.string().optional(),
    referrer: z.string().optional(),
    utm_source: z.string().optional(),
    utm_medium: z.string().optional(),
    utm_campaign: z.string().optional(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const validatedData = subscribeSchema.parse(body);
    
    // Extract metadata from request headers
    const metadata = {
      user_agent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
      ...validatedData.metadata,
    };

    // Subscribe user
    const result = await newsletterService.subscribe({
      ...validatedData,
      metadata,
    });

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Falha na inscrição' 
        },
        { status: 400 }
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Inscrição realizada com sucesso!',
      subscriber: {
        email: result.subscriber?.email,
        segments: result.subscriber?.segments,
        interests: result.subscriber?.interests,
      }
    });

  } catch (error) {
    console.error('Newsletter subscription API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Dados inválidos',
          details: error.errors 
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get analytics (only for authenticated admin users in production)
    const analytics = await newsletterService.getAnalytics();
    
    return NextResponse.json({
      success: true,
      analytics
    });

  } catch (error) {
    console.error('Newsletter analytics API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro ao buscar analytics' 
      },
      { status: 500 }
    );
  }
}