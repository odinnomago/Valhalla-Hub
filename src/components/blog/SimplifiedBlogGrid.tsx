'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import BlogCard from './BlogCard';

interface SimplifiedBlogGridProps {
  searchQuery?: string;
  activeCategory?: string;
  className?: string;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    slug: string;
  };
  publishedAt: string;
  readingTime: number;
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured?: boolean;
}

const SimplifiedBlogGrid: React.FC<SimplifiedBlogGridProps> = ({
  searchQuery = '',
  activeCategory = 'todos',
  className = ''
}) => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock blog posts data - replace with actual API call
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Guia Completo de Produção Musical com Ableton Live',
      excerpt: 'Aprenda as técnicas essenciais para produzir música eletrônica profissional usando Ableton Live, desde o básico até técnicas avançadas.',
      slug: 'guia-completo-producao-musical-ableton-live',
      category: 'Produção Musical',
      tags: ['Ableton Live', 'Produção', 'Eletrônica'],
      author: {
        name: 'Carlos Silva',
        avatar: '/images/authors/carlos-silva.jpg',
        slug: 'carlos-silva'
      },
      publishedAt: '2024-01-15',
      readingTime: 12,
      image: '/images/blog/ableton-guide.jpg',
      views: 15600,
      likes: 420,
      comments: 67,
      featured: true
    },
    {
      id: '2',
      title: 'Como Construir uma Carreira Musical Sustentável',
      excerpt: 'Descubra estratégias práticas para desenvolver uma carreira musical sólida no cenário atual da indústria.',
      slug: 'construir-carreira-musical-sustentavel',
      category: 'Carreira Artística',
      tags: ['Carreira', 'Marketing Musical', 'Negócios'],
      author: {
        name: 'Marina Santos',
        avatar: '/images/authors/marina-santos.jpg',
        slug: 'marina-santos'
      },
      publishedAt: '2024-01-12',
      readingTime: 8,
      image: '/images/blog/music-career.jpg',
      views: 12300,
      likes: 285,
      comments: 42,
      featured: false
    },
    {
      id: '3',
      title: 'IA na Produção Musical: Presente e Futuro',
      excerpt: 'Explore como a inteligência artificial está transformando a produção musical e o que esperar nos próximos anos.',
      slug: 'ia-producao-musical-presente-futuro',
      category: 'Tecnologia',
      tags: ['IA', 'Tecnologia', 'Inovação'],
      author: {
        name: 'Roberto Tech',
        avatar: '/images/authors/roberto-tech.jpg',
        slug: 'roberto-tech'
      },
      publishedAt: '2024-01-10',
      readingTime: 10,
      image: '/images/blog/ai-music.jpg',
      views: 9800,
      likes: 195,
      comments: 28,
      featured: false
    },
    {
      id: '4',
      title: 'Rock in Rio 2024: Cobertura Completa',
      excerpt: 'Tudo o que você precisa saber sobre o maior festival de música do Brasil, com bastidores exclusivos.',
      slug: 'rock-in-rio-2024-cobertura-completa',
      category: 'Eventos',
      tags: ['Festivais', 'Rock in Rio', 'Eventos'],
      author: {
        name: 'Ana Music',
        avatar: '/images/authors/ana-music.jpg',
        slug: 'ana-music'
      },
      publishedAt: '2024-01-08',
      readingTime: 6,
      image: '/images/blog/rock-in-rio.jpg',
      views: 18500,
      likes: 650,
      comments: 89,
      featured: true
    },
    {
      id: '5',
      title: 'Masterização: Segredos dos Profissionais',
      excerpt: 'Técnicas avançadas de masterização reveladas por engenheiros de renome internacional.',
      slug: 'masterizacao-segredos-profissionais',
      category: 'Produção Musical',
      tags: ['Mastering', 'Audio', 'Técnicas'],
      author: {
        name: 'Carlos Silva',
        avatar: '/images/authors/carlos-silva.jpg',
        slug: 'carlos-silva'
      },
      publishedAt: '2024-01-05',
      readingTime: 15,
      image: '/images/blog/mastering-secrets.jpg',
      views: 11200,
      likes: 340,
      comments: 56,
      featured: false
    },
    {
      id: '6',
      title: 'Marketing Digital para Músicos Independentes',
      excerpt: 'Estratégias eficazes de marketing digital para artistas que querem alcançar mais fãs.',
      slug: 'marketing-digital-musicos-independentes',
      category: 'Carreira Artística',
      tags: ['Marketing', 'Digital', 'Independente'],
      author: {
        name: 'Marina Santos',
        avatar: '/images/authors/marina-santos.jpg',
        slug: 'marina-santos'
      },
      publishedAt: '2024-01-03',
      readingTime: 9,
      image: '/images/blog/digital-marketing.jpg',
      views: 8900,
      likes: 210,
      comments: 34,
      featured: false
    }
  ];

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let filtered = mockPosts;

    // Category filter
    if (activeCategory && activeCategory !== 'todos') {
      const categoryMap: Record<string, string> = {
        'producao': 'Produção Musical',
        'carreira': 'Carreira Artística',
        'tecnologia': 'Tecnologia',
        'eventos': 'Eventos'
      };
      
      const categoryName = categoryMap[activeCategory];
      if (categoryName) {
        filtered = filtered.filter(post => post.category === categoryName);
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [mockPosts, activeCategory, searchQuery]);

  // Simulate loading when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  if (isLoading) {
    return (
      <div className={`py-20 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card/50 rounded-lg overflow-hidden">
                  <div className="h-48 bg-muted/50" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted/50 rounded w-3/4" />
                    <div className="h-4 bg-muted/50 rounded w-1/2" />
                    <div className="h-4 bg-muted/50 rounded w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className={`py-16 ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-6 bg-muted/20 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Nenhum artigo encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar sua busca ou explore outras categorias.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
            {activeCategory !== 'todos' && (
              <span className="ml-2 text-primary">
                em {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </span>
            )}
          </p>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <motion.h2
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Artigos em Destaque
            </motion.h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} variant="featured" />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts Grid */}
        <section>
          {featuredPosts.length > 0 && (
            <motion.h2
              className="text-2xl font-bold mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Todos os Artigos
            </motion.h2>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeCategory}-${searchQuery}`}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default SimplifiedBlogGrid;