'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin,
  Clock,
  User,
  HelpCircle,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function HelpContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: 'E-mail',
      description: 'Envie-nos um e-mail e responderemos em até 24 horas',
      value: 'suporte@valhallahub.com',
      action: 'Enviar E-mail'
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: 'Telefone',
      description: 'Ligue para nossa central de atendimento',
      value: '+55 (11) 99999-9999',
      action: 'Ligar Agora'
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: 'Chat ao Vivo',
      description: 'Converse com nosso suporte em tempo real',
      value: 'Disponível das 9h às 18h',
      action: 'Iniciar Chat'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be replaced with actual form submission functionality
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Responderemos em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Entre em Contato</h1>
        <p className="text-muted-foreground">Estamos aqui para ajudar você com qualquer dúvida</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-4">
          {contactMethods.map((method, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-5">
              <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                {method.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
              <p className="text-muted-foreground mb-3">{method.description}</p>
              <p className="font-medium mb-3">{method.value}</p>
              <Button className="w-full">{method.action}</Button>
            </div>
          ))}

          {/* Office Address */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Nosso Escritório</h3>
            <p className="text-muted-foreground mb-3">
              Av. Paulista, 1000<br />
              São Paulo, SP<br />
              CEP: 01310-100
            </p>
            <Button variant="outline" className="w-full">Ver no Mapa</Button>
          </div>

          {/* Business Hours */}
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Horário de Atendimento</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Segunda a Sexta</span>
                <span>9h - 18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sábado</span>
                <span>10h - 14h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Domingo</span>
                <span>Fechado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border/50 rounded-xl p-5">
            <h2 className="text-xl font-semibold mb-4">Enviar Mensagem</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Seu nome"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Assunto</label>
                <div className="relative">
                  <HelpCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Sobre o que você precisa de ajuda?"
                    className="pl-10"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Mensagem</label>
                <Textarea
                  placeholder="Descreva sua dúvida ou problema em detalhes..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                />
              </div>
              
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Enviar Mensagem
              </Button>
            </form>
          </div>

          {/* Additional Support */}
          <div className="bg-card border border-border/50 rounded-xl p-5 mt-6">
            <h3 className="text-lg font-semibold mb-3">Precisa de ajuda imediata?</h3>
            <p className="text-muted-foreground mb-4">
              Para problemas urgentes, você também pode entrar em contato através do nosso chat ao vivo 
              ou ligar diretamente para nossa central de atendimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat ao Vivo
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Ligar Agora
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}