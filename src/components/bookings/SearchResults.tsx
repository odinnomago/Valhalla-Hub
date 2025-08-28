'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import BookingsFilters from './BookingsFilters';
import ProfessionalsList from './ProfessionalsList';

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    // Get search parameters
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    
    setSearchQuery(query);
    setSelectedCategory(category);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      setResultsCount(Math.floor(Math.random() * 100) + 50); // Mock results count
    }, 1000);
  }, [searchParams]);

  const getCategoryLabel = (category: string) => {
    const categories = {
      musicians: 'Músicos',
      technicians: 'Técnicos',
      producers: 'Produtores',
      djs: 'DJs',
      creatives: 'Criativos',
      events: 'Eventos'
    };
    return categories[category as keyof typeof categories] || category;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Buscando profissionais...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => window.history.back()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Voltar
          </button>
          <div className="h-6 w-px bg-border"></div>
          <nav className="text-sm text-muted-foreground">
            <span>Bookings</span>
            <span className="mx-2">›</span>
            <span className="text-foreground">
              {selectedCategory ? getCategoryLabel(selectedCategory) : 'Busca'}
            </span>
          </nav>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {searchQuery ? (
            <>Resultados para "<span className="text-primary-400">{searchQuery}</span>"</>
          ) : selectedCategory ? (
            <>Profissionais em <span className="text-primary-400">{getCategoryLabel(selectedCategory)}</span></>
          ) : (
            'Buscar Profissionais'
          )}
        </h1>

        <div className="flex items-center gap-6 text-gray-400">
          <span>{resultsCount} profissionais encontrados</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
            <span>{Math.floor(resultsCount * 0.3)} disponíveis agora</span>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Refinar busca..."
              className="flex-1 bg-gray-800/50 border border-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button className="bg-primary-500 text-black px-6 py-3 rounded-xl font-medium hover:bg-primary-400 transition-colors">
              Buscar
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <aside className="w-80 flex-shrink-0 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <BookingsFilters />
          </motion.div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ProfessionalsList />
          </motion.div>
        </div>
      </div>

      {/* Mobile Filters Toggle */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button className="bg-primary-500 text-black w-14 h-14 rounded-full shadow-lg hover:bg-primary-400 transition-colors flex items-center justify-center">
          <span className="text-xl">⚙️</span>
        </button>
      </div>
    </div>
  );
};

export default SearchResults;