'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search,
  Filter,
  Calendar,
  Clock,
  Eye,
  Heart,
  ArrowUpDown,
  Grid3x3,
  List
} from 'lucide-react';
import BlogCard from './BlogCard';

interface AuthorPostsProps {
  author: {
    name: string;
    slug: string;
    stats: {
      postsCount: number;
      totalViews: number;
      totalLikes: number;
    };
  };
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
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  image: string;
}

const AuthorPosts: React.FC<AuthorPostsProps> = ({ author, className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'views' | 'likes'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Mock posts data - replace with actual API call based on author
  const mockPosts: BlogPost[] = [
    {
      id: '1',
      title: 'Guia Completo de Produção Musical com Ableton Live',
      excerpt: 'Aprenda as técnicas essenciais para produzir música eletrônica profissional usando Ableton Live, desde o básico até técnicas avançadas.',
      slug: 'guia-completo-producao-musical-ableton-live',
      category: 'Produção Musical',
      tags: ['Ableton Live', 'Produção', 'Eletrônica', 'Tutorial'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2024-01-15',
      readingTime: 12,
      views: 15600,
      likes: 420,
      comments: 67,
      featured: true,
      image: '/images/blog/ableton-guide.jpg'
    },
    {
      id: '2',
      title: 'As Melhores Técnicas de Mixing para EDM',
      excerpt: 'Descubra os segredos por trás de um mix profissional de música eletrônica que fará suas tracks soarem como as dos grandes festivais.',
      slug: 'melhores-tecnicas-mixing-edm',
      category: 'Mixing',
      tags: ['Mixing', 'EDM', 'Técnicas', 'Audio'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2024-01-10',
      readingTime: 8,
      views: 12300,
      likes: 285,
      comments: 42,
      featured: false,
      image: '/images/blog/edm-mixing.jpg'
    },
    {
      id: '3',
      title: 'Masterização: Do Iniciante ao Profissional',
      excerpt: 'Um guia abrangente sobre masterização que te levará do básico até técnicas profissionais usadas nos maiores estúdios do mundo.',
      slug: 'masterizacao-iniciante-profissional',
      category: 'Mastering',
      tags: ['Mastering', 'Audio', 'Técnicas', 'Profissional'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2024-01-05',
      readingTime: 15,
      views: 9800,
      likes: 195,
      comments: 28,
      featured: false,
      image: '/images/blog/mastering-guide.jpg'
    },
    {
      id: '4',
      title: 'Criando Beats Únicos: Técnicas Criativas',
      excerpt: 'Explore métodos inovadores para criar beats únicos que se destacam na multidão, usando ferramentas criativas e técnicas não convencionais.',
      slug: 'criando-beats-unicos-tecnicas-criativas',
      category: 'Beat Making',
      tags: ['Beats', 'Criatividade', 'Produção', 'Hip Hop'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2023-12-28',
      readingTime: 10,
      views: 8500,
      likes: 165,
      comments: 31,
      featured: false,
      image: '/images/blog/beat-making.jpg'
    },
    {
      id: '5',
      title: 'Plugins VST Essenciais para Produtores',
      excerpt: 'Uma seleção curada dos plugins VST mais importantes que todo produtor musical deveria ter em seu arsenal, com dicas de uso prático.',
      slug: 'plugins-vst-essenciais-produtores',
      category: 'Ferramentas',
      tags: ['VST', 'Plugins', 'Ferramentas', 'Produção'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2023-12-20',
      readingTime: 7,
      views: 11200,
      likes: 290,
      comments: 54,
      featured: false,
      image: '/images/blog/vst-plugins.jpg'
    },
    {
      id: '6',
      title: 'Sound Design: Criando Seus Próprios Sounds',
      excerpt: 'Aprenda a criar sons únicos e personalizados do zero, explorando síntese, sampling e processamento de áudio avançado.',
      slug: 'sound-design-criando-proprios-sounds',
      category: 'Sound Design',
      tags: ['Sound Design', 'Síntese', 'Sampling', 'Criatividade'],
      author: {
        name: author.name,
        avatar: '/images/authors/carlos-silva.jpg',
        slug: author.slug
      },
      publishedAt: '2023-12-15',
      readingTime: 13,
      views: 7800,
      likes: 185,
      comments: 19,
      featured: false,
      image: '/images/blog/sound-design.jpg'
    }
  ];

  // Get unique categories
  const categories = Array.from(new Set(mockPosts.map(post => post.category)));

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = mockPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'views':
          aValue = a.views;
          bValue = b.views;
          break;
        case 'likes':
          aValue = a.likes;
          bValue = b.likes;
          break;
        case 'date':
        default:
          aValue = new Date(a.publishedAt).getTime();
          bValue = new Date(b.publishedAt).getTime();
          break;
      }
      
      return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [mockPosts, searchQuery, selectedCategory, sortBy, sortOrder]);

  // Paginate posts
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className={className}>
      {/* Section Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-headline">
          Artigos de {author.name}
        </h2>
        <p className="text-muted-foreground text-lg">
          {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
        </p>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar artigos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-foreground"
                >
                  <option value="">Todas as categorias</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'views' | 'likes')}
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
                >
                  <option value="date">Data</option>
                  <option value="views">Visualizações</option>
                  <option value="likes">Curtidas</option>
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSortToggle}
                  className="px-3"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="flex-1"
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="flex-1"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts Grid/List */}
      {paginatedPosts.length > 0 ? (
        <motion.div
          className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {paginatedPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <BlogCard 
                post={post} 
                variant={viewMode === 'list' ? 'compact' : 'default'}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Nenhum artigo encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div
          className="flex justify-center items-center gap-2 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'default' : 'outline'}
                onClick={() => setCurrentPage(page)}
                className="w-10 h-10 p-0"
              >
                {page}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default AuthorPosts;