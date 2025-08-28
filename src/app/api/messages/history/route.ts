import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const messageHistorySchema = z.object({
  conversationId: z.string().min(1),
  limit: z.string().transform(Number).optional(),
  before: z.string().optional(),
});

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file';
  status: 'sent' | 'delivered' | 'read';
}

const mockMessages: Message[] = [
  {
    id: 'msg_1',
    conversationId: '1',
    senderId: 'client_user',
    senderName: 'João Silva',
    content: 'Olá Marina! Preciso de uma vocalista para projeto pop.',
    timestamp: '2024-01-15T10:15:00Z',
    type: 'text',
    status: 'read'
  },
  {
    id: 'msg_2',
    conversationId: '1',
    senderId: 'marina_santos',
    senderName: 'Marina Santos',
    content: 'Olá! Pode me contar mais detalhes sobre o projeto?',
    timestamp: '2024-01-15T10:20:00Z',
    type: 'text',
    status: 'read'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());
    
    const validationResult = messageHistorySchema.safeParse(params);
    if (!validationResult.success) {
      return NextResponse.json({ success: false, error: 'Invalid parameters' }, { status: 400 });
    }

    const { conversationId, limit = 50 } = validationResult.data;

    let messages = mockMessages.filter(msg => msg.conversationId === conversationId);
    messages = messages.slice(0, limit);

    return NextResponse.json({
      success: true,
      messages,
      pagination: { hasMore: false, count: messages.length }
    });

  } catch (error) {
    console.error('Message history error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      conversationId: body.conversationId,
      senderId: body.senderId,
      senderName: body.senderName,
      content: body.content,
      timestamp: new Date().toISOString(),
      type: body.type || 'text',
      status: 'sent'
    };

    mockMessages.push(newMessage);

    return NextResponse.json({
      success: true,
      message: newMessage
    });

  } catch (error) {
    console.error('Message save error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}