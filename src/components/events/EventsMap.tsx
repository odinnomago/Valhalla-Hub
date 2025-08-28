'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  Calendar,
  Music,
  TentTree,
  Mic,
  Monitor
} from 'lucide-react';

const EventsMap = () => {
  const [radius, setRadius] = useState(10);
  
  const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'shows', label: 'Shows' },
    { id: 'festivals', label: 'Festivais' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'online', label: 'Online' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-4">
        {/* Map */}
        <div className="lg:col-span-3 h-96 lg:h-[500px] bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg font-medium">Mapa de Eventos</p>
              <p className="text-muted-foreground">Integração com Google Maps</p>
            </div>
          </div>
        </div>
        
        {/* Filters Sidebar */}
        <div className="p-6 border-t lg:border-t-0 lg:border-l border-border/50">
          <h3 className="text-xl font-bold mb-6">Filtros</h3>
          
          {/* Radius Filter */}
          <div className="mb-6">
            <Label className="mb-3 block">Raio</Label>
            <div className="space-y-3">
              <Input
                type="range"
                min="1"
                max="100"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-foreground/70">
                <span>1 km</span>
                <span className="font-medium">{radius} km</span>
                <span>100 km</span>
              </div>
            </div>
          </div>
          
          {/* Category Filter */}
          <div className="mb-6">
            <Label className="mb-3 block">Categoria</Label>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? 'default' : 'outline'}
                  className={`w-full justify-start ${
                    activeCategory === category.id 
                      ? 'netflix-button bg-primary hover:bg-primary/90' 
                      : 'border-border/50 hover:border-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Date Filter */}
          <div className="mb-6">
            <Label className="mb-3 block">Data</Label>
            <Input
              type="date"
              className="w-full"
            />
          </div>
          
          {/* Apply Button */}
          <Button className="w-full netflix-button bg-primary hover:bg-primary/90">
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventsMap;