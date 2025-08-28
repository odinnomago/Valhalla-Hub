import { NextRequest, NextResponse } from 'next/server';
import { newsletterService } from '@/lib/newsletter';
import { z } from 'zod';

const preferencesSchema = z.object({
  email: z.string().email('Email inválido'),
  preferences: z.object({
    frequency: z.enum(['weekly', 'biweekly', 'monthly']).optional(),
    content_types: z.array(z.string()).optional(),
    time_preference: z.enum(['morning', 'afternoon', 'evening']).optional(),
  }),
});

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request data
    const { email, preferences } = preferencesSchema.parse(body);
    
    // Update preferences
    const result = await newsletterService.updatePreferences(email, preferences);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || 'Falha ao atualizar preferências' 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Preferências atualizadas com sucesso!'
    });

  } catch (error) {
    console.error('Newsletter preferences API error:', error);

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