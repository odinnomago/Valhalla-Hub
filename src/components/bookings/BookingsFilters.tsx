'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterState {
  serviceType: string;
  genres: string[];
  priceRange: [number, number];
  availability: string[];
  rating: number;
  location: string;
  experience: string;
  verification: boolean;
}

const BookingsFilters: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    serviceType: '',
    genres: [],
    priceRange: [0, 1000],
    availability: [],
    rating: 0,
    location: '',
    experience: '',
    verification: false
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([
    'serviceType', 'genres', 'priceRange'
  ]);

  const serviceTypes = [
    { id: 'musicians', label: 'Músicos' },
    { id: 'technicians', label: 'Técnicos' },
    { id: 'producers', label: 'Produtores' },
    { id: 'djs', label: 'DJs' },
    { id: 'creatives', label: 'Criativos' },
    { id: 'events', label: 'Eventos' }
  ];

  const genres = [
    'Rock', 'Pop', 'Jazz', 'Blues', 'Electronic', 'Hip Hop', 
    'R&B', 'Country', 'Classical', 'Reggae', 'Funk', 'Samba',
    'MPB', 'Forró', 'Sertanejo', 'Trap', 'Gospel', 'Metal'
  ];

  const availabilityOptions = [
    { id: 'today', label: 'Hoje' },
    { id: 'week', label: 'Esta semana' },
    { id: 'month', label: 'Este mês' },
    { id: 'flexible', label: 'Flexível' }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Iniciante (0-2 anos)' },
    { id: 'intermediate', label: 'Intermediário (2-5 anos)' },
    { id: 'advanced', label: 'Avançado (5-10 anos)' },
    { id: 'expert', label: 'Expert (10+ anos)' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleGenreChange = (genre: string) => {
    setFilters(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleAvailabilityChange = (availability: string) => {
    setFilters(prev => ({
      ...prev,
      availability: prev.availability.includes(availability)
        ? prev.availability.filter(a => a !== availability)
        : [...prev.availability, availability]
    }));
  };

  const clearFilters = () => {
    setFilters({
      serviceType: '',
      genres: [],
      priceRange: [0, 1000],
      availability: [],
      rating: 0,
      location: '',
      experience: '',
      verification: false
    });
  };

  const applyFilters = () => {
    // In a real implementation, this would trigger a search with the current filters
    console.log('Applying filters:', filters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.serviceType) count++;
    if (filters.genres.length > 0) count++;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) count++;
    if (filters.availability.length > 0) count++;
    if (filters.rating > 0) count++;
    if (filters.location) count++;
    if (filters.experience) count++;
    if (filters.verification) count++;
    return count;
  };

  const FilterSection: React.FC<{
    title: string;
    section: string;
    children: React.ReactNode;
  }> = ({ title, section, children }) => (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-foreground font-medium">{title}</span>
        <span className={`text-muted-foreground transition-transform ${
          expandedSections.includes(section) ? 'rotate-180' : ''
        }`}>
          ▼
        </span>
      </button>
      <AnimatePresence>
        {expandedSections.includes(section) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden pb-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-foreground">Filtros</h3>
        {getActiveFiltersCount() > 0 && (
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-bold">
              {getActiveFiltersCount()}
            </span>
            <button
              onClick={clearFilters}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Limpar
            </button>
          </div>
        )}
      </div>

      <div className="space-y-0">
        {/* Service Type */}
        <FilterSection title="Tipo de Serviço" section="serviceType">
          <div className="space-y-2">
            {serviceTypes.map((service) => (
              <label key={service.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="serviceType"
                  value={service.id}
                  checked={filters.serviceType === service.id}
                  onChange={(e) => setFilters(prev => ({ ...prev, serviceType: e.target.value }))}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary"
                />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                  {service.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Genres */}
        <FilterSection title="Gêneros Musicais" section="genres">
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {genres.map((genre) => (
              <label key={genre} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary rounded"
                />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                  {genre}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Faixa de Preço" section="priceRange">
          <div className="space-y-4">
            <div className="px-2">
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={filters.priceRange[1]}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  priceRange: [prev.priceRange[0], parseInt(e.target.value)]
                }))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider-primary"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">R$ {filters.priceRange[0]}</span>
              <span className="text-foreground font-medium">
                R$ {filters.priceRange[1] === 1000 ? '1000+' : filters.priceRange[1]}
              </span>
            </div>
          </div>
        </FilterSection>

        {/* Availability */}
        <FilterSection title="Disponibilidade" section="availability">
          <div className="space-y-2">
            {availabilityOptions.map((option) => (
              <label key={option.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(option.id)}
                  onChange={() => handleAvailabilityChange(option.id)}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary rounded"
                />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Avaliação Mínima" section="rating">
          <div className="space-y-2">
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  {'⭐'.repeat(rating)}
                  <span className="text-muted-foreground text-sm ml-1">
                    {rating}+ estrelas
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Experience */}
        <FilterSection title="Experiência" section="experience">
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <label key={level.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="experience"
                  value={level.id}
                  checked={filters.experience === level.id}
                  onChange={(e) => setFilters(prev => ({ ...prev, experience: e.target.value }))}
                  className="w-4 h-4 text-primary bg-input border-border focus:ring-primary"
                />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                  {level.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Verification */}
        <FilterSection title="Verificação" section="verification">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.verification}
              onChange={(e) => setFilters(prev => ({ ...prev, verification: e.target.checked }))}
              className="w-4 h-4 text-primary bg-input border-border focus:ring-primary rounded"
            />
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground/80 group-hover:text-foreground transition-colors text-sm">
                Apenas Verificados
              </span>
            </div>
          </label>
        </FilterSection>
      </div>

      {/* Apply Button */}
      <div className="mt-6 pt-6 border-t border-border">
        <button
          onClick={applyFilters}
          className="w-full netflix-button bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default BookingsFilters;