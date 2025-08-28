'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Music,
  TrendingUp,
  Settings,
  Calendar,
  Building,
  BookOpen,
  Users,
  Mic
} from 'lucide-react';

interface SimpleCategoryNavProps {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  className?: string;
}

const SimpleCategoryNav: React.FC<SimpleCategoryNavProps> = ({
  onSearchChange,
  onCategoryChange,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');

  // Simplified categories based on UX analysis - maximum 5-6 items
  const categories = [
    { id: 'todos', label: 'Todos', icon: BookOpen },
    { id: 'producao', label: 'Produção', icon: Music },
    { id: 'carreira', label: 'Carreira', icon: TrendingUp },
    { id: 'tecnologia', label: 'Tecnologia', icon: Settings },
    { id: 'eventos', label: 'Eventos', icon: Calendar }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(searchQuery);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <section className={`py-16 bg-background ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Search Bar - Clean and Prominent */}
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar artigos..."
              className="w-full pl-12 pr-4 py-3 text-lg bg-card/50 border-border/50 focus:border-primary/50 rounded-lg"
            />
          </form>
        </motion.div>

        {/* Category Navigation - Inspired by Rolling Stone */}
        <motion.nav
          className="category-nav"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : 'bg-card/50 text-foreground hover:bg-card hover:text-primary border border-border/50 hover:border-primary/50'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </section>
  );
};

export default SimpleCategoryNav;