'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Calendar,
  Music,
  TentTree,
  Mic,
  Monitor
} from 'lucide-react';

const EventFilters = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', label: 'Todos', icon: null },
    { id: 'shows', label: 'Shows', icon: Music },
    { id: 'festivals', label: 'Festivais', icon: TentTree },
    { id: 'workshops', label: 'Workshops', icon: Mic },
    { id: 'online', label: 'Online', icon: Monitor }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Buscar eventos, artistas, locais..."
          className="pl-12 pr-4 py-6 text-lg rounded-full border-border/50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full netflix-button bg-primary hover:bg-primary/90">
          Buscar
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={`rounded-full px-6 py-2 ${
                activeCategory === category.id 
                  ? 'netflix-button bg-primary hover:bg-primary/90' 
                  : 'border-border/50 hover:border-primary hover:bg-primary/10'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {Icon && <Icon className="w-4 h-4 mr-2" />}
              {category.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default EventFilters;
