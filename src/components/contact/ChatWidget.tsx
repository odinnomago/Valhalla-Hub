'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Clock,
  Bot,
  User,
  Headphones,
  Building,
  Music,
  Star,
  CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'system';
  content: string;
  timestamp: Date;
  options?: { label: string; value: string }[];
}

interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  currentStep: string;
  userInfo: {
    name?: string;
    email?: string;
    type?: string;
  };
}

const ChatWidget = () => {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    isMinimized: false,
    messages: [],
    currentStep: 'greeting',
    userInfo: {}
  });
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOnline, setIsOnline] = useState(false); // Start with false to avoid hydration mismatch
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check online status after component mounts to avoid hydration mismatch
  useEffect(() => {
    const checkOnlineStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
      setIsOnline(isWeekday && hour >= 9 && hour <= 18);
    };
    
    // Set initial status
    checkOnlineStatus();
    
    // Update every minute to keep status current
    const interval = setInterval(checkOnlineStatus, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (chatState.isOpen && !chatState.isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [chatState.isOpen, chatState.isMinimized]);

  const quickReplies = {
    greeting: [
      { label: '🎵 Sou Artista', value: 'artist' },
      { label: '🤝 Parceria', value: 'partnership' },
      { label: '🎧 Suporte', value: 'support' },
      { label: '📰 Imprensa', value: 'press' }
    ],
    artist: [
      { label: 'Enviar Demo', value: 'demo' },
      { label: 'Processo Seletivo', value: 'process' },
      { label: 'Benefícios', value: 'benefits' },
      { label: 'Falar com A&R', value: 'ar_contact' }
    ],
    partnership: [
      { label: 'Patrocínio de Eventos', value: 'event_sponsor' },
      { label: 'Parceria Tecnológica', value: 'tech_partner' },
      { label: 'Co-branding', value: 'cobranding' },
      { label: 'Investimento', value: 'investment' }
    ],
    support: [
      { label: 'Problema Técnico', value: 'tech_issue' },
      { label: 'Conta/Login', value: 'account' },
      { label: 'Pagamentos', value: 'payments' },
      { label: 'Outro', value: 'other' }
    ]
  };

  const botResponses = {
    greeting: "👋 Olá! Bem-vindo à Valhalla Hub! Sou a Vila, sua assistente virtual. Como posso ajudar você hoje?",
    artist: "🎵 Que incrível! Adoramos conhecer novos talentos. Você gostaria de saber sobre nosso processo para artistas ou já tem uma pergunta específica?",
    partnership: "🤝 Excelente! Temos várias oportunidades de parceria. Que tipo de colaboração você tem em mente?",
    support: "🎧 Claro! Estou aqui para ajudar. Sobre o que você precisa de suporte?",
    press: "📰 Oi! Para questões de imprensa, temos materiais específicos. Posso te direcionar para nossa sala de imprensa ou você tem uma solicitação específica?",
    demo: "🎯 Para enviar seu demo, você pode usar nosso formulário especializado em: artistas@valhallahub.com.br. Nossa equipe de A&R analisa todo material em até 7 dias!",
    process: "📋 Nosso processo é simples: 1) Envie seu material 2) Análise da equipe A&R 3) Feedback em até 7 dias 4) Se aprovado, conversa com nosso time!",
    benefits: "⭐ Artistas Valhalla têm: distribuição em todas as plataformas, mentoria especializada, acesso a eventos exclusivos, suporte de marketing e muito mais!",
    ar_contact: "👥 Vou conectar você com nossa equipe de A&R! Por favor, me informe seu nome e email para que possamos fazer o contato.",
    event_sponsor: "🎪 Temos diversos eventos durante o ano! Shows, festivais, workshops... Que tipo de evento te interessa patrocinar?",
    tech_partner: "💻 Sempre buscamos inovação! Conte-me mais sobre sua tecnologia e como pode agregar ao nosso ecossistema.",
    cobranding: "🎨 Parcerias de marca são uma especialidade nossa! Vamos conversar sobre como unir nossas forças.",
    investment: "📈 Oportunidades de investimento são tratadas diretamente com nossa equipe executiva. Posso agendar uma conversa?",
    tech_issue: "🔧 Vou te conectar com nosso suporte técnico! Qual problema você está enfrentando especificamente?",
    account: "👤 Problemas com conta são resolvidos rapidamente! Você está tentando fazer login ou tem outro problema?",
    payments: "💳 Para questões de pagamento, nossa equipe financeira pode ajudar. Vou transferir você para um especialista!",
    offline: `🌙 No momento estamos offline (atendemos de segunda a sexta, 9h às 18h). 

Mas não se preocupe! Deixe sua mensagem que retornamos assim que possível. 

Para urgências:
📧 contato@valhallahub.com.br
📱 WhatsApp: (11) 99999-9999`
  };

  const addMessage = (type: 'user' | 'bot' | 'system', content: string, options?: { label: string; value: string }[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      options
    };
    
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    if (type === 'bot' && !chatState.isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  const simulateTyping = (callback: () => void, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, delay);
  };

  const handleOptionClick = (value: string) => {
    const option = Object.values(quickReplies).flat().find(opt => opt.value === value);
    if (option) {
      addMessage('user', option.label);
      
      simulateTyping(() => {
        if (botResponses[value as keyof typeof botResponses]) {
          addMessage('bot', botResponses[value as keyof typeof botResponses]);
          
          if (quickReplies[value as keyof typeof quickReplies]) {
            setTimeout(() => {
              addMessage('bot', "Como posso ajudar mais?", quickReplies[value as keyof typeof quickReplies]);
            }, 500);
          }
        }
        
        setChatState(prev => ({ ...prev, currentStep: value }));
      });
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    setInputValue('');

    simulateTyping(() => {
      if (!isOnline) {
        addMessage('bot', botResponses.offline);
        return;
      }

      // Simple auto-responses based on content
      const message = inputValue.toLowerCase();
      
      if (message.includes('demo') || message.includes('música')) {
        addMessage('bot', botResponses.demo);
      } else if (message.includes('parceria') || message.includes('colabora')) {
        addMessage('bot', botResponses.partnership);
      } else if (message.includes('suporte') || message.includes('ajuda') || message.includes('problema')) {
        addMessage('bot', botResponses.support);
      } else {
        addMessage('bot', "Entendi! Vou conectar você com um de nossos especialistas. Eles entrarão em contato em breve!");
      }
    });
  };

  const openChat = () => {
    setChatState(prev => ({ ...prev, isOpen: true, isMinimized: false }));
    setUnreadCount(0);
    
    if (chatState.messages.length === 0) {
      setTimeout(() => {
        addMessage('bot', botResponses.greeting, quickReplies.greeting);
      }, 500);
    }
  };

  const closeChat = () => {
    setChatState(prev => ({ ...prev, isOpen: false }));
  };

  const toggleMinimize = () => {
    setChatState(prev => ({ ...prev, isMinimized: !prev.isMinimized }));
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!chatState.isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                onClick={openChat}
                className="relative w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/25"
              >
                <MessageCircle className="w-8 h-8" />
                
                {/* Online/Offline indicator */}
                <motion.div
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    isOnline ? 'bg-green-400' : 'bg-yellow-400'
                  }`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Unread count */}
                {unreadCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -left-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    {unreadCount}
                  </motion.div>
                )}
              </Button>
            </motion.div>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-card text-foreground px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
            >
              💬 Precisa de ajuda? Clique aqui!
              <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-card rotate-45" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="bg-card/95 backdrop-blur-lg border-border/50 shadow-2xl">
              {/* Header */}
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-primary" />
                      </div>
                      <motion.div
                        className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${
                          isOnline ? 'bg-green-400' : 'bg-yellow-400'
                        }`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Vila - Assistente Valhalla</CardTitle>
                      <div className="flex items-center gap-2 text-xs">
                        <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-yellow-400'}`} />
                        <span className="text-muted-foreground">
                          {isOnline ? 'Online agora' : 'Offline - Resposta em até 24h'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleMinimize}
                      className="w-8 h-8 p-0"
                    >
                      {chatState.isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={closeChat}
                      className="w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Content */}
              <AnimatePresence>
                {!chatState.isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="space-y-4">
                      {/* Messages */}
                      <ScrollArea className="h-80">
                        <div className="space-y-4 pr-4">
                          {chatState.messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                              <div className={`
                                max-w-[80%] rounded-lg p-3 ${
                                  message.type === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : message.type === 'bot'
                                    ? 'bg-muted'
                                    : 'bg-accent/20 text-accent-foreground'
                                }
                              `}>
                                <div className="flex items-center gap-2 mb-1">
                                  {message.type === 'bot' ? (
                                    <Bot className="w-4 h-4 text-primary" />
                                  ) : message.type === 'user' ? (
                                    <User className="w-4 h-4" />
                                  ) : (
                                    <CheckCircle className="w-4 h-4" />
                                  )}
                                  <span className="text-xs opacity-70">
                                    {message.timestamp.toLocaleTimeString('pt-BR', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                                
                                <p className="text-sm whitespace-pre-line">{message.content}</p>
                                
                                {/* Quick reply options */}
                                {message.options && (
                                  <div className="grid grid-cols-1 gap-2 mt-3">
                                    {message.options.map((option) => (
                                      <Button
                                        key={option.value}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleOptionClick(option.value)}
                                        className="text-left justify-start h-auto py-2 px-3 text-xs"
                                      >
                                        {option.label}
                                      </Button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                          
                          {/* Typing indicator */}
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex justify-start"
                            >
                              <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                                <Bot className="w-4 h-4 text-primary" />
                                <div className="flex gap-1">
                                  {[0, 1, 2].map((i) => (
                                    <motion.div
                                      key={i}
                                      className="w-2 h-2 bg-primary rounded-full"
                                      animate={{ scale: [1, 1.5, 1] }}
                                      transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                      }}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground">Vila está digitando...</span>
                              </div>
                            </motion.div>
                          )}
                          
                          <div ref={messagesEndRef} />
                        </div>
                      </ScrollArea>

                      {/* Input */}
                      <div className="flex gap-2">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          placeholder="Digite sua mensagem..."
                          className="flex-1"
                          disabled={isTyping}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isTyping}
                          className="netflix-button bg-primary hover:bg-primary/90"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Footer */}
                      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
                        Powered by Valhalla Hub IA • {isOnline ? 'Resposta imediata' : 'Resposta em até 24h'}
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;