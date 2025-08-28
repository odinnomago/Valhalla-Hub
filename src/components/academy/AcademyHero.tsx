'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Star, 
  Users, 
  Award, 
  TrendingUp,
  Music,
  Headphones,
  Mic,
  Radio
} from 'lucide-react';

const AcademyHero: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);

  // Sample featured courses for hero rotation
  const featuredCourses = [
    {
      id: 1,
      title: 'Produção Musical Profissional',
      instructor: 'Carlos Silva',
      image: '/images/academy/hero-production.jpg',
      video: '/videos/academy/production-preview.mp4',
      badge: 'Mais Popular'
    },
    {
      id: 2,
      title: 'Marketing Musical Digital',
      instructor: 'Marina Santos',
      image: '/images/academy/hero-marketing.jpg',
      video: '/videos/academy/marketing-preview.mp4',
      badge: 'Novo'
    },
    {
      id: 3,
      title: 'Performance ao Vivo',
      instructor: 'Lucas Performer',
      image: '/images/academy/hero-performance.jpg',
      video: '/videos/academy/performance-preview.mp4',
      badge: 'Em Alta'
    }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Auto-rotate featured courses
    const interval = setInterval(() => {
      setCurrentVideo(prev => (prev + 1) % featuredCourses.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredCourses.length]);

  if (!mounted) return null;

  const currentCourse = featuredCourses[currentVideo];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-card/20 to-primary/5">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={currentCourse.image}
          alt={currentCourse.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 font-headline leading-tight">
                Transforme sua
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                  Paixão em Profissão
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Descubra seu universo musical com os melhores profissionais da indústria. 
                Cursos práticos, certificações reconhecidas e uma comunidade 
                que impulsiona sua carreira.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="netflix-button bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                <Play className="w-5 h-5 mr-2" />
                Começar Agora Grátis
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4 border-primary/30 hover:bg-primary/10"
                asChild
              >
                <Link href="/academy/courses">
                  Explorar Cursos
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Featured Course Preview */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative bg-card/50 backdrop-blur-lg rounded-2xl p-6 border border-border/50 shadow-2xl">
              {/* Course Badge */}
              <div className="absolute -top-3 left-6 z-10">
                <Badge className="bg-accent text-accent-foreground px-3 py-1">
                  {currentCourse.badge}
                </Badge>
              </div>

              {/* Video/Image Preview */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 group cursor-pointer">
                <Image
                  src={currentCourse.image}
                  alt={currentCourse.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <motion.div
                    className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Play className="w-6 h-6 text-white ml-1" />
                  </motion.div>
                </div>
                
                {/* Preview Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-black/50 text-white border-0">
                    Preview Gratuito
                  </Badge>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-foreground">{currentCourse.title}</h3>
                <p className="text-muted-foreground">Com {currentCourse.instructor}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">4.9 (1.2k avaliações)</span>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Ver Curso
                  </Button>
                </div>
              </div>
            </div>

            {/* Course Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-6">
              {featuredCourses.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentVideo(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentVideo ? 'bg-primary' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default AcademyHero;