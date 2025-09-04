'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Plus,
  Edit,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TicketEventsPage() {
  // This will be replaced with real data from user context/hooks
  const [events] = useState<any[]>([]);

  const handleCreateEvent = () => {
    // This will be replaced with actual event creation functionality
    console.log('Creating event');
  };

  const handleEditEvent = (id: number) => {
    // This will be replaced with actual event edit functionality
    console.log('Editing event:', id);
  };

  const handleViewEvent = (id: number) => {
    // This will be replaced with actual event view functionality
    console.log('Viewing event:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Eventos Cadastrados</h1>
          <p className="text-muted-foreground">Gerencie os eventos para os quais você vende ingressos</p>
        </div>
        <Button onClick={handleCreateEvent}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Evento
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Eventos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Eventos Ativos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ingressos Vendidos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Seus Eventos</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Evento</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Local</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ingressos</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 font-medium">{event.name || 'Evento sem nome'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {event.date || 'Data não especificada'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {event.location || 'Local não especificado'}
                      </div>
                    </td>
                    <td className="p-4">{event.tickets || 0}</td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        {event.status || 'Ativo'}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewEvent(event.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleEditEvent(event.id)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    Nenhum evento cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Templates */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Modelos de Eventos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Show ao Vivo</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modelo para shows e apresentações ao vivo
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Workshop</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modelo para workshops e treinamentos
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
          
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Evento Online</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Modelo para eventos virtuais e webinars
            </p>
            <Button variant="outline" size="sm">Usar Modelo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}