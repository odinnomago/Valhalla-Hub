'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter,
  SortAsc,
  SortDesc,
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  Music,
  Mic,
  Settings,
  TrendingUp,
  Building,
  BookOpen,
  Users,
  X
} from 'lucide-react';


interface BlogFiltersProps {
  onSearchChange?: (query: string) => void;
  onCategoryChange?: (category: string) => void;
  onTagChange?: (tags: string[]) => void;
  onSortChange?: (sort: string) => void;
  className?: string;
}

const BlogFilters: React.FC<BlogFiltersProps> = ({
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onSortChange,
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('recent');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', label: 'Todas as Categorias', icon: BookOpen, count: 200 },
    { id: 'producao', label: 'Produção Musical', icon: Music, count: 75 },
    { id: 'carreira', label: 'Carreira Artística', icon: TrendingUp, count: 45 },
    { id: 'tecnologia', label: 'Tecnologia', icon: Settings, count: 35 },
    { id: 'eventos', label: 'Eventos', icon: Calendar, count: 25 },
    { id: 'negocios', label: 'Negócios', icon: Building, count: 20 },
    { id: 'tutoriais', label: 'Tutoriais', icon: Mic, count: 60 },
    { id: 'entrevistas', label: 'Entrevistas', icon: Users, count: 15 }
  ];

  const popularTags = [
    'ableton live', 'fl studio', 'logic pro', 'cubase', 'reaper',
    'mixing', 'mastering', 'synthesizers', 'drum programming',
    'vocal recording', 'music theory', 'songwriting', 'composition',
    'music business', 'copyright', 'royalties', 'streaming',
    'spotify', 'apple music', 'soundcloud', 'bandcamp',
    'live performance', 'recording techniques', 'home studio',
    'equipment reviews', 'plugin reviews', 'beats', 'samples'
  ];

  const sortOptions = [
    { id: 'recent', label: 'Mais Recentes', icon: Calendar },
    { id: 'popular', label: 'Mais Populares', icon: Eye },
    { id: 'liked', label: 'Mais Curtidos', icon: Heart },
    { id: 'commented', label: 'Mais Comentados', icon: MessageCircle }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange?.(searchQuery);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    
    setSelectedTags(newTags);
    onTagChange?.(newTags);
  };

  const handleSortChange = (sortId: string) => {
    setSortBy(sortId);
    onSortChange?.(sortId);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
    setSortBy('recent');
    onSearchChange?.('');
    onCategoryChange?.('all');
    onTagChange?.([]);
    onSortChange?.('recent');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) + 
    selectedTags.length + 
    (searchQuery ? 1 : 0);

  return (
    <section className={`py-20 bg-card/20 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar artigos, tutoriais, dicas..."
                    className="pl-12 pr-24 py-4 text-lg bg-background/50 border-border/50 focus:border-primary/50"
                  />
                  <Button 
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 netflix-button bg-primary hover:bg-primary/90"
                  >
                    Buscar
                  </Button>
                </div>
              </form>

              {/* Filter Toggle and Active Count */}
              <div className="flex items-center justify-between mb-6">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {activeFiltersCount > 0 && (
                    <Badge variant="destructive" className="ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>

                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Limpar Filtros
                  </Button>
                )}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Categorias
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`
                          flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300 text-left
                          ${isSelected 
                            ? 'border-primary/50 bg-primary/10 text-primary' 
                            : 'border-border/50 hover:border-primary/30 hover:bg-card/50'
                          }
                        `}
                      >
                        <Icon className="w-5 h-5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{category.label}</div>
                          <div className="text-xs text-muted-foreground">{category.count} artigos</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Advanced Filters - Collapsible */}
              {showFilters && (
                <div className="overflow-hidden">
                    {/* Sort Options */}
                    <div className="mb-6 pt-6 border-t border-border/50">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <SortAsc className="w-5 h-5 text-primary" />
                        Ordenar Por
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {sortOptions.map((option) => {
                          const Icon = option.icon;
                          const isSelected = sortBy === option.id;
                          
                          return (
                            <button
                              key={option.id}
                              onClick={() => handleSortChange(option.id)}
                              className={`
                                flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300
                                ${isSelected 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted hover:bg-muted/80'
                                }
                              `}
                            >
                              <Icon className="w-4 h-4" />
                              {option.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Popular Tags */}
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <Mic className="w-5 h-5 text-primary" />
                        Tags Populares
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {popularTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          
                          return (
                            <button
                              key={tag}
                              onClick={() => handleTagToggle(tag)}
                              className={`
                                px-3 py-1 text-sm rounded-full transition-all duration-300
                                ${isSelected 
                                  ? 'bg-primary/20 text-primary border-primary/50' 
                                  : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                                }
                              `}
                            >
                              #{tag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                </div>
              )}

              {/* Active Filters Display */}
              {(selectedTags.length > 0 || selectedCategory !== 'all' || searchQuery) && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-3">Filtros Ativos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {searchQuery && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        Busca: "{searchQuery}"
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => {
                            setSearchQuery('');
                            onSearchChange?.('');
                          }}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    {selectedCategory !== 'all' && (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        {categories.find(c => c.id === selectedCategory)?.label}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => handleCategorySelect('all')}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                    
                    {selectedTags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        #{tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => handleTagToggle(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogFilters;