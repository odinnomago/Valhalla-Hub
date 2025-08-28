'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Calendar, 
  Camera, 
  User
} from 'lucide-react';

export default function EventsGalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedPhotographer, setSelectedPhotographer] = useState('all');

  // Mock data for events
  const events = [
    { id: '1', name: 'Festival Valhalla 2024' },
    { id: '2', name: 'Show Alok - Rio de Janeiro' },
    { id: '3', name: 'Workshop de Produção Musical' },
  ];

  // Mock data for photographers
  const photographers = [
    { id: '1', name: 'João Silva' },
    { id: '2', name: 'Maria Santos' },
    { id: '3', name: 'Pedro Costa' },
  ];

  // Mock data for photos
  const photos = [
    { id: '1', eventId: '1', photographerId: '1', title: 'Festival Valhalla 2024', date: '2024-12-15', url: '/images/events/festival1.jpg' },
    { id: '2', eventId: '1', photographerId: '1', title: 'Festival Valhalla 2024', date: '2024-12-15', url: '/images/events/festival2.jpg' },
    { id: '3', eventId: '1', photographerId: '2', title: 'Festival Valhalla 2024', date: '2024-12-15', url: '/images/events/festival3.jpg' },
    { id: '4', eventId: '2', photographerId: '3', title: 'Show Alok - Rio de Janeiro', date: '2024-11-20', url: '/images/events/alok1.jpg' },
    { id: '5', eventId: '2', photographerId: '3', title: 'Show Alok - Rio de Janeiro', date: '2024-11-20', url: '/images/events/alok2.jpg' },
    { id: '6', eventId: '3', photographerId: '1', title: 'Workshop de Produção Musical', date: '2024-10-05', url: '/images/events/workshop1.jpg' },
    { id: '7', eventId: '3', photographerId: '2', title: 'Workshop de Produção Musical', date: '2024-10-05', url: '/images/events/workshop2.jpg' },
    { id: '8', eventId: '1', photographerId: '3', title: 'Festival Valhalla 2024', date: '2024-12-15', url: '/images/events/festival4.jpg' },
  ];

  const filteredPhotos = photos.filter(photo => {
    if (selectedEvent !== 'all' && photo.eventId !== selectedEvent) return false;
    if (selectedDate && photo.date !== selectedDate) return false;
    if (selectedPhotographer !== 'all' && photo.photographerId !== selectedPhotographer) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        {/* Header */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-headline">
            Galeria de Eventos
          </h1>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Fotos dos melhores momentos dos eventos Valhalla
          </p>
        </section>

        {/* Filters */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="event">Evento</Label>
              <select
                id="event"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
                className="w-full p-3 bg-background border border-border rounded-md"
              >
                <option value="all">Todos</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>{event.name}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="photographer">Fotógrafo</Label>
              <select
                id="photographer"
                value={selectedPhotographer}
                onChange={(e) => setSelectedPhotographer(e.target.value)}
                className="w-full p-3 bg-background border border-border rounded-md"
              >
                <option value="all">Todos</option>
                {photographers.map(photographer => (
                  <option key={photographer.id} value={photographer.id}>{photographer.name}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section>
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nenhuma foto encontrada</h3>
              <p className="text-muted-foreground">
                Tente ajustar seus filtros para encontrar mais fotos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredPhotos.map(photo => (
                <div key={photo.id} className="group relative overflow-hidden rounded-xl bg-card/50 border border-border/50">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={photo.url} 
                      alt={photo.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="font-bold text-lg">{photo.title}</h3>
                    <div className="flex items-center text-sm text-foreground/80 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(photo.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center text-sm text-foreground/80 mt-1">
                      <User className="w-4 h-4 mr-1" />
                      <span>{
                        photographers.find(p => p.id === photo.photographerId)?.name || 'Desconhecido'
                      }</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}