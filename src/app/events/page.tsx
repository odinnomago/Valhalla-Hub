'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Music, 
  TentTree, 
  Mic, 
  Monitor,
  MapPin,
  Calendar,
  Search
} from 'lucide-react';
import EventFilters from '@/components/events/EventFilters';
import FeaturedEvents from '@/components/events/FeaturedEvents';
import EventGrid from '@/components/events/EventGrid';
import EventsMap from '@/components/events/EventsMap';
// PromotionPlans component removed

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 font-headline">
              Valhalla{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Org
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-10 max-w-3xl mx-auto">
              Descubra, participe e crie experiências musicais inesquecíveis
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="netflix-button bg-primary hover:bg-primary/90 text-black font-bold py-6 px-8 text-lg">
                Criar Evento
              </Button>
              <Button variant="outline" className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 py-6 px-8 text-lg">
                Explorar Eventos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <EventFilters />
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Eventos em Destaque</h2>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Ver Todos
            </Button>
          </div>
          <FeaturedEvents />
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:bg-card/80 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Shows</h3>
              <p className="text-muted-foreground">Apresentações ao vivo</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:bg-card/80 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <TentTree className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Festivais</h3>
              <p className="text-muted-foreground">Grandes eventos</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:bg-card/80 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Mic className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Workshops</h3>
              <p className="text-muted-foreground">Aprenda com profissionais</p>
            </div>
            
            <div className="bg-card/50 border border-border/50 rounded-xl p-6 text-center hover:bg-card/80 transition-all duration-300 cursor-pointer group">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/30 transition-colors">
                <Monitor className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Online</h3>
              <p className="text-muted-foreground">Eventos virtuais</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Todos os Eventos</h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <MapPin className="w-4 h-4 mr-2" />
                Mapa
              </Button>
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Calendário
              </Button>
            </div>
          </div>
          <EventGrid />
        </div>
      </section>

      {/* Events Map */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Eventos ao Redor do Mundo</h2>
          <EventsMap />
        </div>
      </section>

      {/* Promotion Plans section removed */}
    </div>
  );
}