'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight,
  Star,
  TrendingUp,
  Clock,
  Eye,
  Award
} from 'lucide-react';
import BlogCard from './BlogCard';

const FeaturedPosts = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock featured posts data
  const featuredPosts = [
    {
      id: '1',
      title: 'Como Produzir Música Eletrônica: Guia Completo 2024',
      excerpt: 'Aprenda os segredos da produção eletrônica desde o básico até técnicas avançadas. Tutorial completo com dicas práticas e ferramentas essenciais.',
      slug: 'como-produzir-musica-eletronica-guia-2024',
      category: 'Produção Musical',
      tags: ['produção', 'eletrônica', 'ableton', 'synthesizers'],
      author: {
        name: 'Carlos Silva',
        avatar: '/images/authors/carlos-silva.jpg',
        slug: 'carlos-silva'
      },
      publishedAt: '2024-01-15T10:00:00Z',
      readingTime: 12,
      image: '/images/blog/featured-1.jpg',
      views: 15000,
      likes: 890,
      comments: 156,
      featured: true
    },
    {
      id: '2',
      title: 'Streaming vs Vendas Digitais: Qual a Melhor Estratégia?',
      excerpt: 'Análise completa sobre as diferentes formas de monetização musical. Compare plataformas, royalties e descubra a estratégia ideal para seu perfil.',
      slug: 'streaming-vs-vendas-digitais-estrategia',
      category: 'Carreira Artística',
      tags: ['streaming', 'royalties', 'monetização', 'carreira'],
      author: {
        name: 'Marina Santos',
        avatar: '/images/authors/marina-santos.jpg',
        slug: 'marina-santos'
      },
      publishedAt: '2024-01-12T14:30:00Z',
      readingTime: 8,
      image: '/images/blog/featured-2.jpg',
      views: 12000,
      likes: 654,
      comments: 89,
      featured: true
    },
    {
      id: '3',
      title: 'IA na Música: Ferramenta ou Ameaça para Artistas?',
      excerpt: 'Exploramos o impacto da inteligência artificial na criação musical. Oportunidades, desafios e como se adaptar às novas tecnologias.',
      slug: 'ia-musica-ferramenta-ou-ameaca-artistas',
      category: 'Tecnologia',
      tags: ['ia', 'tecnologia', 'futuro', 'inovação'],
      author: {
        name: 'Roberto Tech',
        avatar: '/images/authors/roberto-tech.jpg',
        slug: 'roberto-tech'
      },
      publishedAt: '2024-01-10T09:15:00Z',
      readingTime: 10,
      image: '/images/blog/featured-3.jpg',
      views: 18000,
      likes: 1200,
      comments: 234,
      featured: true
    }
  ];

  const categories = [
    {
      id: 'trending',
      label: 'Em Alta',
      icon: TrendingUp,
      description: 'Mais lidos esta semana',
      count: 5
    },
    {
      id: 'featured',
      label: 'Destaques',
      icon: Star,
      description: 'Seleção da editoria',
      count: 3
    },
    {
      id: 'recent',
      label: 'Recentes',
      icon: Clock,
      description: 'Publicados hoje',
      count: 4
    },
    {
      id: 'popular',
      label: 'Populares',
      icon: Eye,
      description: 'Mais visualizados',
      count: 6
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-lg">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{category.label}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                        <p className="text-sm text-foreground/70">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Featured Posts Carousel */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Featured Post */}
                <div className="lg:col-span-2">
                  <BlogCard 
                    post={featuredPosts[currentSlide]} 
                    variant="featured"
                    showStats={true}
                  />
                </div>

                {/* Side Posts */}
                <div className="space-y-6">
                  {featuredPosts
                    .filter((_, index) => index !== currentSlide)
                    .slice(0, 2)
                    .map((post) => (
                      <BlogCard 
                        key={post.id}
                        post={post} 
                        variant="compact"
                        showStats={false}
                      />
                    ))
                  }
                </div>
              </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="w-12 h-12 p-0 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {featuredPosts.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 p-0 rounded-full ${
                    currentSlide === index ? 'bg-primary' : 'bg-secondary'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="w-12 h-12 p-0 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>


      </div>
    </section>
  );
};

export default FeaturedPosts;