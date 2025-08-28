'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Music,
  Ticket
} from 'lucide-react';

const EventGrid = () => {
  // Mock data for events
  const events = [
    {
      id: '1',
      title: 'Festival Valhalla 2024',
      date: '2024-12-15',
      location: 'Parque das Águas, RJ',
      price: 120,
      image: '/images/events/festival1.jpg',
      category: 'festivals'
    },
    {
      id: '2',
      title: 'Show Alok - Rio de Janeiro',
      date: '2024-11-20',
      location: 'Marina da Glória, RJ',
      price: 150,
      image: '/images/events/alok1.jpg',
      category: 'shows'
    },
    {
      id: '3',
      title: 'Workshop de Produção Musical',
      date: '2024-10-05',
      location: 'Studio Valhalla, SP',
      price: 80,
      image: '/images/events/workshop1.jpg',
      category: 'workshops'
    },
    {
      id: '4',
      title: 'Masterclass de DJ',
      date: '2024-11-10',
      location: 'Online',
      price: 60,
      image: '/images/events/dj-class.jpg',
      category: 'online'
    },
    {
      id: '5',
      title: 'Rock in Rio - Dia 1',
      date: '2024-09-15',
      location: 'Parque dos Atletas, RJ',
      price: 200,
      image: '/images/events/rock-in-rio.jpg',
      category: 'festivals'
    },
    {
      id: '6',
      title: 'Show de Jazz no Teatro',
      date: '2024-10-25',
      location: 'Teatro Municipal, RJ',
      price: 90,
      image: '/images/events/jazz-show.jpg',
      category: 'shows'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <div 
          key={event.id} 
          className="bg-card/50 border border-border/50 rounded-xl overflow-hidden hover:bg-card/80 transition-all duration-300 group"
        >
          <div className="relative">
            <div className="h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute top-4 right-4 bg-primary text-black font-bold py-1 px-3 rounded-full text-sm">
              R$ {event.price}
            </div>
            <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground py-1 px-3 rounded-full text-sm font-medium">
              {formatDate(event.date)}
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-2">
              <Music className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary capitalize">
                {event.category === 'festivals' && 'Festival'}
                {event.category === 'shows' && 'Show'}
                {event.category === 'workshops' && 'Workshop'}
                {event.category === 'online' && 'Online'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-foreground/80">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{event.location}</span>
              </div>
            </div>
            
            <Button className="w-full netflix-button bg-primary hover:bg-primary/90">
              <Ticket className="w-4 h-4 mr-2" />
              Comprar Ingressos
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventGrid;
