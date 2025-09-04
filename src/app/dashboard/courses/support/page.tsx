'use client';

import React, { useState } from 'react';
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  Clock,
  CheckCircle,
  AlertCircle,
  UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CourseSupportPage() {
  // This will be replaced with real data from user context/hooks
  const [supportTickets] = useState<any[]>([]);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be replaced with actual ticket submission functionality
    console.log('Submitting support ticket:', newTicket);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Solicitar Suporte</h1>
        <p className="text-muted-foreground">Obtenha ajuda com seus cursos e materiais</p>
      </div>

      {/* Support Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Chat ao Vivo</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Obtenha ajuda imediata através do nosso chat
          </p>
          <Button className="w-full">Iniciar Chat</Button>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">E-mail</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Envie um e-mail para nossa equipe de suporte
          </p>
          <Button variant="outline" className="w-full">Enviar E-mail</Button>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
            <Phone className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold mb-2">Telefone</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Ligue para nossa central de suporte
          </p>
          <Button variant="outline" className="w-full">Ligar Agora</Button>
        </div>
      </div>

      {/* Create Support Ticket */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Criar Ticket de Suporte</h2>
        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div>
            <Label htmlFor="subject">Assunto</Label>
            <Input
              id="subject"
              placeholder="Descreva brevemente sua dúvida"
              value={newTicket.subject}
              onChange={(e) => setNewTicket(prev => ({...prev, subject: e.target.value}))}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="message">Mensagem</Label>
            <Textarea
              id="message"
              placeholder="Descreva detalhadamente sua dúvida ou problema"
              value={newTicket.message}
              onChange={(e) => setNewTicket(prev => ({...prev, message: e.target.value}))}
              className="mt-1 min-h-[120px]"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="priority">Prioridade</Label>
            <select
              id="priority"
              value={newTicket.priority}
              onChange={(e) => setNewTicket(prev => ({...prev, priority: e.target.value}))}
              className="w-full bg-muted border border-border rounded-md px-3 py-2 mt-1"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
          
          <Button type="submit">
            <HelpCircle className="h-4 w-4 mr-2" />
            Enviar Solicitação
          </Button>
        </form>
      </div>

      {/* Active Tickets */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Tickets Ativos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Assunto</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Prioridade</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.length > 0 ? (
                supportTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{ticket.subject || 'Sem assunto'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {ticket.date || 'Data não especificada'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.priority === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : ticket.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority === 'high' ? 'Alta' : 
                         ticket.priority === 'medium' ? 'Média' : 'Baixa'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {ticket.status === 'resolved' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : ticket.status === 'pending' ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-blue-500" />
                        )}
                        <span>
                          {ticket.status === 'resolved' ? 'Resolvido' : 
                           ticket.status === 'pending' ? 'Pendente' : 'Em andamento'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhum ticket de suporte ativo
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}