'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  User, 
  Building, 
  MapPin, 
  Clock, 
  Send,
  FileText,
  Music,
  Headphones,
  Mic,
  Calendar,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContactAandRPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    attachment: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Ana Carolina',
      role: 'Diretora A&R',
      email: 'ana.carolina@valhallarecords.com',
      phone: '(11) 99999-9999',
      specialties: ['Pop', 'Rock Alternativo', 'Indie']
    },
    {
      id: 2,
      name: 'Roberto Mendes',
      role: 'Coordenador A&R',
      email: 'roberto.mendes@valhallarecords.com',
      phone: '(11) 98888-8888',
      specialties: ['Hip-Hop', 'R&B', 'Eletrônica']
    },
    {
      id: 3,
      name: 'Juliana Costa',
      role: 'Assistente A&R',
      email: 'juliana.costa@valhallarecords.com',
      phone: '(11) 97777-7777',
      specialties: ['Folk', 'MPB', 'Jazz']
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData(prev => ({ ...prev, attachment: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        attachment: null
      });
    }, 2000);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Contato com A&R</h1>
        <p className="text-muted-foreground">Entre em contato com nossa equipe de A&R para oportunidades e parcerias</p>
      </div>

      {isSubmitted ? (
        <div className="bg-card border border-border/50 rounded-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Mensagem Enviada!</h2>
          <p className="text-muted-foreground mb-6">
            Sua mensagem foi enviada com sucesso para nossa equipe de A&R. 
            Retornaremos em até 3 dias úteis.
          </p>
          <Button onClick={() => setIsSubmitted(false)}>
            Enviar Outra Mensagem
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Envie sua Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nome *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="seu.email@exemplo.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Assunto *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Qual o motivo do contato?"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Mensagem *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Descreva sua proposta, oportunidade ou dúvida..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Anexos</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arraste e solte seus arquivos aqui ou clique para selecionar
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                      Formatos suportados: MP3, WAV, PDF, DOC (máx. 10MB)
                    </p>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        multiple
                      />
                      <Button variant="outline" type="button">
                        Selecionar Arquivos
                      </Button>
                    </label>
                    {formData.attachment && (
                      <div className="mt-3 text-sm">
                        <p className="font-medium">Arquivo selecionado:</p>
                        <p>{formData.attachment.name}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Team Information */}
          <div className="space-y-6">
            {/* Team Members */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Nossa Equipe A&R</h2>
              
              <div className="space-y-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border border-border/50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{member.name}</h3>
                        <p className="text-sm text-muted-foreground">{member.role}</p>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <p className="text-xs text-muted-foreground mb-1">Especialidades:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.map((specialty, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Informações de Contato</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Endereço</h3>
                    <p className="text-sm text-muted-foreground">
                      Rua das Indústrias, 123<br />
                      Vila Olímpia, São Paulo - SP<br />
                      CEP: 04567-890
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Horário de Atendimento</h3>
                    <p className="text-sm text-muted-foreground">
                      Segunda a Sexta: 9h às 18h<br />
                      Sábado: 10h às 14h
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Music className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Processo de Avaliação</h3>
                    <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                      <li>• Envio de material</li>
                      <li>• Análise preliminar (3-5 dias)</li>
                      <li>• Feedback detalhado</li>
                      <li>• Proposta de parceria</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}