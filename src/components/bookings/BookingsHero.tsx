'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
  id: string;
  title: string;
  category: string;
  icon: string;
  type: 'professional' | 'service' | 'location';
}

const BookingsHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const mockSuggestions: SearchSuggestion[] = [
    { id: '1', title: 'Guitarristas em São Paulo', category: 'Músicos', icon: '', type: 'service' },
    { id: '2', title: 'Marina Santos - Vocalista', category: 'Profissional', icon: '', type: 'professional' },
    { id: '3', title: 'Produtores de Hip Hop', category: 'Produtores', icon: '', type: 'service' },
    { id: '4', title: 'Técnicos de Som - Rio de Janeiro', category: 'Técnicos', icon: '', type: 'location' },
    { id: '5', title: 'DJs para Festas', category: 'DJs', icon: '', type: 'service' },
  ];

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      const filtered = mockSuggestions.filter(suggestion =>
        suggestion.title.toLowerCase().includes(value.toLowerCase()) ||
        suggestion.category.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    if (suggestion.type === 'professional') {
      router.push(`/bookings/professional/${suggestion.id}`);
    } else {
      router.push(`/bookings/search?q=${encodeURIComponent(suggestion.title)}`);
    }
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/bookings/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickFilters = [
    { label: 'Técnicos', category: 'technicians' },
    { label: 'Produtores', category: 'producers' },
    { label: 'Eventos', category: 'events' },
  ];

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 font-headline tracking-tight"
          >
            Encontre{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Profissionais
            </span>
            <br />
            para seu Projeto
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Conecte-se com artistas, técnicos, produtores e mais profissionais do ecossistema musical
          </motion.p>


        </div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Search Bar */}
          <div className="relative mb-6">
            <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-2xl p-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    placeholder="Buscar serviços ou profissionais..."
                    className="w-full bg-input border border-border text-foreground placeholder-muted-foreground rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-primary transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  
                  {/* Search Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors text-left"
                        >
                          <div className="flex-1">
                            <p className="text-foreground font-medium">{suggestion.title}</p>
                            <p className="text-muted-foreground text-sm">{suggestion.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleSearch}
                  className="netflix-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3">
            {quickFilters.map((filter, index) => (
              <motion.button
                key={filter.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                onClick={() => router.push(`/bookings/search?category=${filter.category}`)}
                className="bg-card/50 backdrop-blur-sm border border-border text-foreground px-6 py-3 rounded-xl hover:bg-card hover:border-primary/50 transition-all flex items-center gap-2"
              >
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default BookingsHero;