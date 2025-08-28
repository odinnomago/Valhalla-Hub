'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Ticket,
  Star
} from 'lucide-react';

const FeaturedEvents = () => {
  // Mock data for featured events
  const featuredEvents = [
    {
      id: '1',
      title: 'Festival Valhalla 2024',
      date: '2024-12-15',
      location: 'Parque das Águas, RJ',
      price: 120,
      image: '/images/events/festival1.jpg',
      isMain: true
    },
    {
      id: '2',
      title: 'Show Alok - Rio de Janeiro',
      date: '2024-11-20',
      location: 'Marina da Glória, RJ',
      price: 150,
      image: '/images/events/alok1.jpg',
      isMain: false
    },
    {
      id: '3',
      title: 'Workshop de Produção Musical',
      date: '2024-10-05',
      location: 'Studio Valhalla, SP',
      price: 80,
      image: '/images/events/workshop1.jpg',
      isMain: false
    }
  ];

  const mainEvent = featuredEvents.find(event => event.isMain);
  const sideEvents = featuredEvents.filter(event => !event.isMain);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  if (!mainEvent) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Featured Event */}
      <div className="lg:col-span-2 bg-card/50 border border-border/50 rounded-xl overflow-hidden group">
        <div className="relative">
          <div className="h-80 overflow-hidden">
            <img 
              src={mainEvent.image} 
              alt={mainEvent.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="absolute top-6 left-6 bg-secondary text-secondary-foreground py-1 px-4 rounded-full text-sm font-bold flex items-center">
            <Star className="w-4 h-4 mr-1 fill-current" />
            Em Destaque
          </div>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-background/80 backdrop-blur-sm rounded-lg p-4">
              <h2 className="text-2xl font-bold mb-2">{mainEvent.title}</h2>
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center text-foreground/80">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{formatDate(mainEvent.date)}</span>
                </div>
                <div className="flex items-center text-foreground/80">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{mainEvent.location}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-primary">R$ {mainEvent.price}</div>
                <Button className="netflix-button bg-primary hover:bg-primary/90">
                  <Ticket className="w-4 h-4 mr-2" />
                  Comprar Ingressos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Side Featured Events */}
      <div className="space-y-6">
        {sideEvents.map((event) => (
          <div 
            key={event.id} 
            className="bg-card/50 border border-border/50 rounded-xl overflow-hidden flex group"
          >
            <div className="w-1/3">
              <div className="h-full overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="w-2/3 p-4">
              <h3 className="font-bold mb-2 line-clamp-2">{event.title}</h3>
              <div className="text-sm text-foreground/70 mb-3">
                {new Date(event.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short'
                })}
              </div>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-primary">R$ {event.price}</div>
                <Button size="sm" className="netflix-button bg-primary hover:bg-primary/90 text-xs">
                  Comprar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;