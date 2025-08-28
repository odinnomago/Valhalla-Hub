import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Rate limiting (simple in-memory store - in production use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_MAX = 3; // 3 requests per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function getRateLimitKey(ip: string, email: string): string {
  return `${ip}:${email}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(key);

  if (!record || now > record.resetTime) {
    rateLimit.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

function validateFormData(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Name validation
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nome é obrigatório');
  } else if (data.name.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  } else if (data.name.trim().length > 100) {
    errors.push('Nome muito longo');
  }

  // Email validation
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email é obrigatório');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Email inválido');
    }
  }

  // Subject validation
  if (!data.subject || typeof data.subject !== 'string') {
    errors.push('Assunto é obrigatório');
  } else if (!['artistas', 'fas', 'parcerias', 'imprensa', 'suporte', 'outros'].includes(data.subject)) {
    errors.push('Assunto inválido');
  }

  // Message validation
  if (!data.message || typeof data.message !== 'string') {
    errors.push('Mensagem é obrigatória');
  } else if (data.message.trim().length < 10) {
    errors.push('Mensagem deve ter pelo menos 10 caracteres');
  } else if (data.message.trim().length > 1000) {
    errors.push('Mensagem muito longa (máximo 1000 caracteres)');
  }

  return { isValid: errors.length === 0, errors };
}

function getSubjectLabel(subject: string): string {
  const subjects = {
    artistas: 'Para Artistas - Demos e Contratos',
    fas: 'Para Fãs - Memberships e Eventos',
    parcerias: 'Parcerias Comerciais',
    imprensa: 'Imprensa e Mídia',
    suporte: 'Suporte Técnico',
    outros: 'Outros Assuntos'
  };
  return subjects[subject as keyof typeof subjects] || subject;
}

async function sendNotificationEmail(data: ContactFormData): Promise<boolean> {
  try {
    // In production, integrate with your email service (SendGrid, AWS SES, etc.)
    console.log('Sending notification email:', {
      to: 'contato@valhallahub.com.br',
      subject: `[Contato] ${getSubjectLabel(data.subject)}`,
      html: generateEmailHTML(data)
    });

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 500));
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

async function sendAutoReplyEmail(data: ContactFormData): Promise<boolean> {
  try {
    console.log('Sending auto-reply email:', {
      to: data.email,
      subject: 'Recebemos sua mensagem - Valhalla Hub',
      html: generateAutoReplyHTML(data)
    });

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 300));
    return true;
  } catch (error) {
    console.error('Error sending auto-reply:', error);
    return false;
  }
}

function generateEmailHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova mensagem de contato</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00F5FF 0%, #0099CC 100%); color: #000; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #555; }
        .value { margin-top: 5px; }
        .message { background: white; padding: 15px; border-left: 4px solid #00F5FF; border-radius: 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nova Mensagem de Contato</h1>
          <p>Recebida através do site valhallahub.com.br</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="label">Nome:</div>
            <div class="value">${data.name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${data.email}</div>
          </div>
          
          <div class="field">
            <div class="label">Assunto:</div>
            <div class="value">${getSubjectLabel(data.subject)}</div>
          </div>
          
          <div class="field">
            <div class="label">Mensagem:</div>
            <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Data:</div>
            <div class="value">${new Date().toLocaleString('pt-BR')}</div>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateAutoReplyHTML(data: ContactFormData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Recebemos sua mensagem</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00F5FF 0%, #0099CC 100%); color: #000; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 8px; }
        .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        .cta { background: #00F5FF; color: #000; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; margin: 15px 0; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Obrigado pelo contato!</h1>
          <p>Recebemos sua mensagem e responderemos em breve</p>
        </div>
        
        <div class="content">
          <p>Olá, <strong>${data.name}</strong>!</p>
          
          <p>Recebemos sua mensagem sobre "<strong>${getSubjectLabel(data.subject)}</strong>" e nossa equipe está analisando seu pedido.</p>
          
          <p><strong>⏰ Tempo de resposta:</strong> Responderemos em até 24 horas úteis.</p>
          
          <p>Enquanto isso, você pode:</p>
          <ul>
            <li>📱 Nos seguir nas redes sociais para novidades</li>
            <li>🎵 Conferir nossos lançamentos no Spotify</li>
            <li>❓ Acessar nossa central de ajuda para dúvidas rápidas</li>
          </ul>
          
          <div style="text-align: center;">
            <a href="https://valhallahub.com.br" class="cta">Visitar Site</a>
          </div>
          
          <p>Se sua dúvida for urgente, você também pode:</p>
          <ul>
            <li>📞 Ligar: +55 11 99999-9999</li>
            <li>💬 Usar nosso chat online</li>
            <li>📧 Responder este email</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>Valhalla Hub - Transformando a música brasileira</p>
          <p>Este é um email automático, não é necessário responder.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const forwardedFor = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0] || realIp || 'unknown';

    // Parse request body
    const body = await request.json();
    
    // Validate form data
    const { isValid, errors } = validateFormData(body);
    if (!isValid) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    const formData: ContactFormData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      subject: body.subject,
      message: body.message.trim()
    };

    // Check rate limit
    const rateLimitKey = getRateLimitKey(clientIp, formData.email);
    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Muitas tentativas. Tente novamente em 1 hora.',
          code: 'RATE_LIMIT_EXCEEDED'
        },
        { status: 429 }
      );
    }

    // Send emails
    const [notificationSent, autoReplySent] = await Promise.all([
      sendNotificationEmail(formData),
      sendAutoReplyEmail(formData)
    ]);

    // Log the contact for analytics
    console.log('Contact form submission:', {
      timestamp: new Date().toISOString(),
      ip: clientIp,
      subject: formData.subject,
      emailSent: notificationSent,
      autoReplySent
    });

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Mensagem enviada com sucesso! Responderemos em até 24 horas.',
      emailSent: notificationSent,
      autoReplySent
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Erro interno do servidor. Tente novamente ou use outro canal de contato.',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Método não permitido' },
    { status: 405 }
  );
}