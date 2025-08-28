'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'audio';
  attachments?: {
    name: string;
    url: string;
    size: string;
    type: string;
  }[];
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface TypingIndicator {
  userId: string;
  userName: string;
  isTyping: boolean;
}

export interface WebSocketMessage {
  type: 'message' | 'typing' | 'read_receipt' | 'user_online' | 'user_offline';
  payload: any;
}

interface UseWebSocketChatProps {
  userId: string;
  conversationId: string;
  onMessage?: (message: Message) => void;
  onTyping?: (typing: TypingIndicator) => void;
  onUserStatusChange?: (userId: string, isOnline: boolean) => void;
  onError?: (error: Event) => void;
}

export const useWebSocketChat = ({
  userId,
  conversationId,
  onMessage,
  onTyping,
  onUserStatusChange,
  onError
}: UseWebSocketChatProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingIndicator[]>([]);
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const heartbeatIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const reconnectAttempts = useRef(0);
  const maxReconnectAttempts = 5;
  const baseReconnectDelay = 1000;

  // WebSocket URL - in production, this would be your actual WebSocket server
  const getWebSocketUrl = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_WS_HOST || 'ws://localhost:3001'
      : 'ws://localhost:3001';
    
    return `${protocol}//${host}/ws?userId=${userId}&conversationId=${conversationId}`;
  }, [userId, conversationId]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    setConnectionStatus('connecting');
    
    try {
      const wsUrl = getWebSocketUrl();
      wsRef.current = new WebSocket(wsUrl);

      wsRef.current.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionStatus('connected');
        reconnectAttempts.current = 0;

        // Send authentication message
        wsRef.current?.send(JSON.stringify({
          type: 'auth',
          payload: {
            userId,
            conversationId
          }
        }));

        // Start heartbeat
        heartbeatIntervalRef.current = setInterval(() => {
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ type: 'ping' }));
          }
        }, 30000);
      };

      wsRef.current.onmessage = (event) => {
        try {
          const data: WebSocketMessage = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        
        // Clear heartbeat
        if (heartbeatIntervalRef.current) {
          clearInterval(heartbeatIntervalRef.current);
          heartbeatIntervalRef.current = null;
        }

        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
          const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts.current);
          reconnectAttempts.current++;
          
          console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current})`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        }
      };

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionStatus('error');
        onError?.(error);
      };

    } catch (error) {
      console.error('Error creating WebSocket connection:', error);
      setConnectionStatus('error');
    }
  }, [userId, conversationId, getWebSocketUrl, onError]);

  const handleWebSocketMessage = useCallback((data: WebSocketMessage) => {
    switch (data.type) {
      case 'message':
        const message = data.payload as Message;
        setMessages(prev => [...prev, message]);
        onMessage?.(message);
        break;

      case 'typing':
        const typingData = data.payload as TypingIndicator;
        setTypingUsers(prev => {
          const filtered = prev.filter(user => user.userId !== typingData.userId);
          if (typingData.isTyping) {
            return [...filtered, typingData];
          }
          return filtered;
        });
        onTyping?.(typingData);
        break;

      case 'read_receipt':
        const { messageId, userId: readByUserId } = data.payload;
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        ));
        break;

      case 'user_online':
        onUserStatusChange?.(data.payload.userId, true);
        break;

      case 'user_offline':
        onUserStatusChange?.(data.payload.userId, false);
        break;

      default:
        console.log('Unknown message type:', data.type);
    }
  }, [onMessage, onTyping, onUserStatusChange]);

  const sendMessage = useCallback((content: string, type: Message['type'] = 'text', attachments?: Message['attachments']) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not connected');
      return false;
    }

    const message: Omit<Message, 'id' | 'timestamp' | 'status'> = {
      senderId: userId,
      senderName: '', // This would be filled by the server
      senderAvatar: '', // This would be filled by the server
      content,
      type,
      attachments
    };

    wsRef.current.send(JSON.stringify({
      type: 'send_message',
      payload: message
    }));

    return true;
  }, [userId]);

  const sendTypingIndicator = useCallback((isTyping: boolean) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'typing',
      payload: {
        userId,
        isTyping
      }
    }));

    // Auto-stop typing after 3 seconds
    if (isTyping) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        sendTypingIndicator(false);
      }, 3000);
    }
  }, [userId]);

  const markMessageAsRead = useCallback((messageId: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      return;
    }

    wsRef.current.send(JSON.stringify({
      type: 'mark_read',
      payload: {
        messageId,
        userId
      }
    }));
  }, [userId]);

  const disconnect = useCallback(() => {
    // Clear timeouts
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
    
    if (heartbeatIntervalRef.current) {
      clearInterval(heartbeatIntervalRef.current);
      heartbeatIntervalRef.current = null;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close(1000, 'User disconnect');
      wsRef.current = null;
    }

    setIsConnected(false);
    setConnectionStatus('disconnected');
  }, []);

  // Load message history
  const loadMessageHistory = useCallback(async (limit: number = 50, before?: string) => {
    try {
      const params = new URLSearchParams({
        conversationId,
        limit: limit.toString(),
        ...(before && { before })
      });

      const response = await fetch(`/api/messages/history?${params}`);
      if (!response.ok) {
        throw new Error('Failed to load message history');
      }

      const data = await response.json();
      if (data.success) {
        setMessages(prev => before ? [...data.messages, ...prev] : data.messages);
        return data.messages;
      }
    } catch (error) {
      console.error('Error loading message history:', error);
      return [];
    }
  }, [conversationId]);

  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // Reconnect when conversation changes
  useEffect(() => {
    if (wsRef.current) {
      disconnect();
      setTimeout(() => {
        connect();
      }, 100);
    }
  }, [conversationId, connect, disconnect]);

  return {
    isConnected,
    connectionStatus,
    messages,
    typingUsers,
    sendMessage,
    sendTypingIndicator,
    markMessageAsRead,
    loadMessageHistory,
    connect,
    disconnect
  };
};