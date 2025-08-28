import { NextRequest, NextResponse } from 'next/server';
import { newsletterService } from '@/lib/newsletter';
import { z } from 'zod';

const unsubscribeSchema = z.object({
  email: z.string().email('Email inválido'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const { email } = unsubscribeSchema.parse(body);
    
    // Unsubscribe user
    const result = await newsletterService.unsubscribe(email);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Falha ao cancelar inscrição' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inscrição cancelada com sucesso.'
    });

  } catch (error) {
    console.error('Newsletter unsubscribe API error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email inválido',
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