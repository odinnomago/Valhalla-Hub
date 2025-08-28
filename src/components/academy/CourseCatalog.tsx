'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Users, 
  Play,
  Bookmark,
  TrendingUp,
  Award,
  ChevronDown
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessons: number;
  students: number;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  featured: boolean;
  bestseller: boolean;
  new: boolean;
  tags: string[];
}

const CourseCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Mock course data - replace with actual API
  const courses: Course[] = [
    {
      id: '1',
      title: 'Produção Musical Profissional com Ableton Live',
      description: 'Aprenda a produzir música eletrônica profissional do zero usando Ableton Live. Curso completo com projetos práticos.',
      instructor: {
        name: 'Carlos Silva',
        avatar: '/images/instructors/carlos-silva.jpg',
        verified: true
      },
      thumbnail: '/images/courses/ableton-production.jpg',
      category: 'Produção Musical',
      level: 'intermediate',
      duration: '12h 30min',
      lessons: 45,
      students: 2847,
      rating: 4.9,
      reviews: 423,
      price: 197,
      originalPrice: 297,
      featured: true,
      bestseller: true,
      new: false,
      tags: ['Ableton Live', 'Eletrônica', 'Produção', 'DAW']
    },
    {
      id: '2',
      title: 'Marketing Musical Digital: Do Zero ao Sucesso',
      description: 'Estratégias completas de marketing digital para músicos independentes. Construa sua base de fãs e monetize sua música.',
      instructor: {
        name: 'Marina Santos',
        avatar: '/images/instructors/marina-santos.jpg',
        verified: true
      },
      thumbnail: '/images/courses/digital-marketing.jpg',
      category: 'Carreira Artística',
      level: 'beginner',
      duration: '8h 45min',
      lessons: 32,
      students: 1923,
      rating: 4.8,
      reviews: 287,
      price: 147,
      originalPrice: 197,
      featured: false,
      bestseller: false,
      new: true,
      tags: ['Marketing', 'Redes Sociais', 'Streaming', 'Carreira']
    },
    {
      id: '3',
      title: 'Mixing e Mastering Profissional',
      description: 'Domine as técnicas de mixing e mastering usadas nos maiores estúdios do mundo. Transforme suas produções.',
      instructor: {
        name: 'Roberto Audio',
        avatar: '/images/instructors/roberto-audio.jpg',
        verified: true
      },
      thumbnail: '/images/courses/mixing-mastering.jpg',
      category: 'Produção Musical',
      level: 'advanced',
      duration: '15h 20min',
      lessons: 58,
      students: 1456,
      rating: 4.9,
      reviews: 198,
      price: 247,
      featured: false,
      bestseller: true,
      new: false,
      tags: ['Mixing', 'Mastering', 'Audio Engineering', 'Profissional']
    },
    {
      id: '4',
      title: 'Performance Musical e Presença de Palco',
      description: 'Desenvolva sua presença de palco e técnicas de performance para se conectar com o público.',
      instructor: {
        name: 'Lucas Performer',
        avatar: '/images/instructors/lucas-performer.jpg',
        verified: false
      },
      thumbnail: '/images/courses/performance.jpg',
      category: 'Performance',
      level: 'intermediate',
      duration: '6h 15min',
      lessons: 24,
      students: 892,
      rating: 4.7,
      reviews: 134,
      price: 97,
      featured: false,
      bestseller: false,
      new: false,
      tags: ['Performance', 'Palco', 'Presença', 'Live']
    },
    {
      id: '5',
      title: 'Teoria Musical para Produtores',
      description: 'Base sólida de teoria musical aplicada à produção moderna. Componha melodias e harmonias marcantes.',
      instructor: {
        name: 'Ana Teorica',
        avatar: '/images/instructors/ana-teorica.jpg',
        verified: true
      },
      thumbnail: '/images/courses/music-theory.jpg',
      category: 'Teoria Musical',
      level: 'beginner',
      duration: '10h 30min',
      lessons: 38,
      students: 1634,
      rating: 4.6,
      reviews: 245,
      price: 127,
      featured: false,
      bestseller: false,
      new: false,
      tags: ['Teoria', 'Harmonia', 'Melodia', 'Composição']
    },
    {
      id: '6',
      title: 'Podcast Musical: Criação e Monetização',
      description: 'Aprenda a criar, produzir e monetizar seu podcast sobre música. Do conceito ao sucesso.',
      instructor: {
        name: 'Pedro Cast',
        avatar: '/images/instructors/pedro-cast.jpg',
        verified: true
      },
      thumbnail: '/images/courses/podcast.jpg',
      category: 'Mídia Digital',
      level: 'beginner',
      duration: '5h 45min',
      lessons: 22,
      students: 567,
      rating: 4.5,
      reviews: 89,
      price: 87,
      featured: false,
      bestseller: false,
      new: true,
      tags: ['Podcast', 'Mídia', 'Monetização', 'Audio']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todos os Cursos', count: courses.length },
    { id: 'producao', name: 'Produção Musical', count: courses.filter(c => c.category === 'Produção Musical').length },
    { id: 'carreira', name: 'Carreira Artística', count: courses.filter(c => c.category === 'Carreira Artística').length },
    { id: 'performance', name: 'Performance', count: courses.filter(c => c.category === 'Performance').length },
    { id: 'teoria', name: 'Teoria Musical', count: courses.filter(c => c.category === 'Teoria Musical').length },
    { id: 'midia', name: 'Mídia Digital', count: courses.filter(c => c.category === 'Mídia Digital').length }
  ];

  const levels = [
    { id: 'all', name: 'Todos os Níveis' },
    { id: 'beginner', name: 'Iniciante' },
    { id: 'intermediate', name: 'Intermediário' },
    { id: 'advanced', name: 'Avançado' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Mais Populares' },
    { id: 'newest', name: 'Mais Recentes' },
    { id: 'rating', name: 'Melhor Avaliados' },
    { id: 'price-low', name: 'Menor Preço' },
    { id: 'price-high', name: 'Maior Preço' }
  ];

  // Filter and sort courses
  const filteredCourses = useMemo(() => {
    let filtered = courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || 
        course.category.toLowerCase().includes(selectedCategory);
      
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      
      return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.new ? 1 : -1;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'popular':
        default:
          return b.students - a.students;
      }
    });

    return filtered;
  }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-0">
          {/* Course Image */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {course.bestseller && (
                <Badge className="bg-orange-500 text-white border-0">
                  <Award className="w-3 h-3 mr-1" />
                  Bestseller
                </Badge>
              )}
              {course.new && (
                <Badge className="bg-green-500 text-white border-0">
                  Novo
                </Badge>
              )}
              {course.featured && (
                <Badge className="bg-primary text-primary-foreground border-0">
                  Destaque
                </Badge>
              )}
            </div>

            {/* Bookmark */}
            <button className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Bookmark className="w-4 h-4 text-white" />
            </button>

            {/* Preview on Hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" className="bg-white text-black hover:bg-white/90">
                <Play className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>

          {/* Course Content */}
          <div className="p-6">
            <div className="space-y-3">
              {/* Title */}
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                <Link href={`/academy/courses/${course.id}`}>
                  {course.title}
                </Link>
              </h3>

              {/* Instructor */}
              <div className="flex items-center gap-2">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
                <span className="text-sm text-muted-foreground">{course.instructor.name}</span>
                {course.instructor.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  <span>{course.lessons} aulas</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                    />
                  ))}
                </div>
                <span className="font-medium">{course.rating}</span>
                <span className="text-sm text-muted-foreground">({course.reviews})</span>
              </div>

              {/* Level Badge */}
              <Badge variant="secondary" className="w-fit">
                {course.level === 'beginner' ? 'Iniciante' : 
                 course.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </Badge>

              {/* Price */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {formatPrice(course.price)}
                  </span>
                  {course.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Ver Curso
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 font-headline">
            Catálogo de Cursos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Mais de 150 cursos criados por profissionais da indústria musical. 
            Encontre o curso perfeito para seu nível e objetivos.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos, instrutores ou tópicos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Advanced Filters */}
              <div className="flex flex-wrap items-center gap-4">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-md"
                >
                  {levels.map((level) => (
                    <option key={level.id} value={level.id}>
                      {level.name}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-md"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                <div className="text-sm text-muted-foreground">
                  {filteredCourses.length} cursos encontrados
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Courses Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${selectedLevel}-${sortBy}-${searchQuery}`}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Nenhum curso encontrado</h3>
            <p className="text-muted-foreground">
              Tente ajustar os filtros ou termos de busca
            </p>
          </motion.div>
        )}

        {/* Load More */}
        {filteredCourses.length > 12 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button variant="outline" size="lg" className="px-8">
              Carregar Mais Cursos
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CourseCatalog;