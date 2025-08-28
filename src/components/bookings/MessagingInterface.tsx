'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
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

interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: 'client' | 'professional';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  projectTitle?: string;
  bookingId?: string;
}

interface MessagingInterfaceProps {
  currentUserId: string;
  currentUserName: string;
  currentUserAvatar: string;
  conversationId?: string;
  onConversationSelect?: (conversationId: string) => void;
}

const MessagingInterface: React.FC<MessagingInterfaceProps> = ({
  currentUserId,
  currentUserName,
  currentUserAvatar,
  conversationId,
  onConversationSelect
}) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data - in real implementation, this would come from API/WebSocket
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        participantId: 'marina_santos',
        participantName: 'Marina Santos',
        participantAvatar: '/images/professionals/marina.jpg',
        participantRole: 'professional',
        lastMessage: 'Obrigada pelo interesse! Vamos agendar uma reunião?',
        lastMessageTime: '2024-01-15T10:30:00Z',
        unreadCount: 2,
        isOnline: true,
        projectTitle: 'Gravação de Vocal Pop',
        bookingId: 'booking_123'
      },
      {
        id: '2',
        participantId: 'carlos_mendes',
        participantName: 'Carlos Mendes',
        participantAvatar: '/images/professionals/carlos.jpg',
        participantRole: 'professional',
        lastMessage: 'Posso enviar algumas referências do meu trabalho',
        lastMessageTime: '2024-01-15T09:15:00Z',
        unreadCount: 0,
        isOnline: false,
        projectTitle: 'Produção de Beat Trap',
        bookingId: 'booking_124'
      },
      {
        id: '3',
        participantId: 'ana_silva',
        participantName: 'Ana Silva',
        participantAvatar: '/images/professionals/ana.jpg',
        participantRole: 'professional',
        lastMessage: 'Que legal! Podemos conversar melhor sobre o projeto',
        lastMessageTime: '2024-01-14T16:45:00Z',
        unreadCount: 1,
        isOnline: true,
        projectTitle: 'Gravação de Guitarra',
        bookingId: 'booking_125'
      }
    ];

    const mockMessages: Message[] = [
      {
        id: '1',
        senderId: currentUserId,
        senderName: currentUserName,
        senderAvatar: currentUserAvatar,
        content: 'Olá Marina! Vi seu perfil e fiquei muito interessado no seu trabalho. Preciso de uma vocalista para um projeto de pop.',
        timestamp: '2024-01-15T10:15:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '2',
        senderId: 'marina_santos',
        senderName: 'Marina Santos',
        senderAvatar: '/images/professionals/marina.jpg',
        content: 'Olá! Muito obrigada pelo interesse! Pode me contar mais detalhes sobre o projeto? Qual é o estilo musical e prazo?',
        timestamp: '2024-01-15T10:20:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '3',
        senderId: currentUserId,
        senderName: currentUserName,
        senderAvatar: currentUserAvatar,
        content: 'É um single de pop com influências de R&B. Tenho a base pronta e preciso do vocal principal. O prazo seria de 2 semanas.',
        timestamp: '2024-01-15T10:25:00Z',
        type: 'text',
        status: 'read'
      },
      {
        id: '4',
        senderId: 'marina_santos',
        senderName: 'Marina Santos',
        senderAvatar: '/images/professionals/marina.jpg',
        content: 'Perfeito! Adoro esse estilo. Você poderia me enviar a base para eu dar uma escutada? E vamos agendar uma reunião para conversarmos melhor?',
        timestamp: '2024-01-15T10:30:00Z',
        type: 'text',
        status: 'delivered'
      }
    ];

    setConversations(mockConversations);
    setMessages(mockMessages);
    if (conversationId) {
      setActiveConversation(conversationId);
    } else if (mockConversations.length > 0) {
      setActiveConversation(mockConversations[0].id);
    }
  }, [conversationId, currentUserId, currentUserName, currentUserAvatar]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: currentUserAvatar,
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      );
    }, 1000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      senderName: currentUserName,
      senderAvatar: currentUserAvatar,
      content: `Arquivo enviado: ${file.name}`,
      timestamp: new Date().toISOString(),
      type: 'file',
      attachments: [{
        name: file.name,
        url: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
        type: file.type
      }],
      status: 'sending'
    };

    setMessages(prev => [...prev, message]);
  };

  const getActiveConversationData = () => {
    return conversations.find(conv => conv.id === activeConversation);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const activeConversationData = getActiveConversationData();

  return (
    <div className="flex h-screen bg-gray-950">
      {/* Conversations Sidebar */}
      <div className="w-80 bg-gray-900 border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white mb-4">Mensagens</h2>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar conversas..."
              className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pl-10 focus:outline-none focus:border-primary-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => {
                setActiveConversation(conversation.id);
                onConversationSelect?.(conversation.id);
              }}
              className={`p-4 border-b border-gray-800 cursor-pointer transition-all hover:bg-gray-800/50 ${
                activeConversation === conversation.id ? 'bg-gray-800/70' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold overflow-hidden">
                    {conversation.participantAvatar ? (
                      <img 
                        src={conversation.participantAvatar} 
                        alt={conversation.participantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      conversation.participantName.charAt(0)
                    )}
                  </div>
                  {conversation.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-white font-medium truncate">
                      {conversation.participantName}
                    </h3>
                    <span className="text-gray-400 text-xs">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  
                  {conversation.projectTitle && (
                    <p className="text-primary-400 text-xs mb-1">
                      {conversation.projectTitle}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <p className="text-gray-300 text-sm truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary-500 text-black text-xs px-2 py-1 rounded-full font-bold min-w-[20px] text-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeConversationData ? (
          <>
            {/* Chat Header */}
            <div className="bg-gray-900 border-b border-gray-800 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold overflow-hidden">
                      {activeConversationData.participantAvatar ? (
                        <img 
                          src={activeConversationData.participantAvatar} 
                          alt={activeConversationData.participantName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        activeConversationData.participantName.charAt(0)
                      )}
                    </div>
                    {activeConversationData.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-white font-semibold">
                      {activeConversationData.participantName}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {activeConversationData.isOnline ? 'Online' : 'Offline'} • {activeConversationData.projectTitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="text-gray-400 hover:text-white transition-colors p-2">
                    📞
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors p-2">
                    🎥
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors p-2">
                    ⚙️
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => {
                const isOwnMessage = message.senderId === currentUserId;
                const showDate = index === 0 || 
                  formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="text-center my-4">
                        <span className="bg-gray-800 text-gray-400 text-xs px-3 py-1 rounded-full">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : ''}`}
                    >
                      {!isOwnMessage && (
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-sm font-bold overflow-hidden flex-shrink-0">
                          {message.senderAvatar ? (
                            <img 
                              src={message.senderAvatar} 
                              alt={message.senderName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            message.senderName.charAt(0)
                          )}
                        </div>
                      )}

                      <div className={`max-w-md ${isOwnMessage ? 'text-right' : ''}`}>
                        <div className={`inline-block p-3 rounded-2xl ${
                          isOwnMessage 
                            ? 'bg-primary-500 text-black' 
                            : 'bg-gray-800 text-white'
                        }`}>
                          {message.type === 'file' && message.attachments && (
                            <div className="mb-2">
                              {message.attachments.map((attachment, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-700/50 rounded-lg">
                                  <span className="text-lg">📎</span>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{attachment.name}</p>
                                    <p className="text-xs opacity-70">{attachment.size}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        
                        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-400 ${
                          isOwnMessage ? 'justify-end' : ''
                        }`}>
                          <span>{formatTime(message.timestamp)}</span>
                          {isOwnMessage && (
                            <span>
                              {message.status === 'sending' && '⏳'}
                              {message.status === 'sent' && '✓'}
                              {message.status === 'delivered' && '✓✓'}
                              {message.status === 'read' && '✓✓'}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black text-sm font-bold overflow-hidden">
                    {activeConversationData.participantAvatar ? (
                      <img 
                        src={activeConversationData.participantAvatar} 
                        alt={activeConversationData.participantName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      activeConversationData.participantName.charAt(0)
                    )}
                  </div>
                  <div className="bg-gray-800 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="bg-gray-900 border-t border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  📎
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Digite sua mensagem..."
                    className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-primary-500"
                  />
                  <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    😊
                  </button>
                </div>

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-primary-500 text-black p-3 rounded-xl hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ➤
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="*/*"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Selecione uma conversa
              </h3>
              <p className="text-gray-400">
                Escolha uma conversa na barra lateral para começar a conversar
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingInterface;