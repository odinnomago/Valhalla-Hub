'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Music, 
  Headphones, 
  Mic, 
  Radio,
  TrendingUp,
  BookOpen,
  Play
} from 'lucide-react';
import { motion } from 'framer-motion';

const BlogHero = () => {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [musicNotes, setMusicNotes] = useState<Array<{ x: number; y: number; delay: number; icon: any }>>([]);

  useEffect(() => {
    setMounted(true);
    // Generate random positions for music note particles
    const icons = [Music, Headphones, Mic, Radio, Play];
    setMusicNotes(
      Array.from({ length: 15 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        icon: icons[Math.floor(Math.random() * icons.length)]
      }))
    );
  }, []);

  const popularTags = [
    'Produção Musical',
    'Carreira Artística', 
    'Tecnologia',
    'Ableton Live',
    'Marketing Musical',
    'Streaming',
    'Beats',
    'Mixagem'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dynamic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/90 z-10" />
        
        {/* Animated music note particles */}
        {mounted && (
          <div className="absolute inset-0 opacity-20">
            {musicNotes.map((note, i) => {
              const IconComponent = note.icon;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${note.x}%`, top: `${note.y}%` }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 0.3, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 360]
                  }}
                  transition={{
                    duration: 4 + (i % 3),
                    repeat: Infinity,
                    delay: note.delay,
                    ease: "easeInOut"
                  }}
                >
                  <IconComponent className="w-8 h-8 text-primary" />
                </motion.div>
              );
            })}
          </div>
        )}
        
        {/* Gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Hero content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center">
        <motion.div 
          className="max-w-5xl mx-auto space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Title and Subtitle */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="font-medium">Blog Valhalla Hub</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-headline">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Onde a Música
              </span>
              <br />
              <span className="text-foreground">
                Encontra Tecnologia
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent">
                e Inovação
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/80 max-w-4xl mx-auto leading-relaxed">
              Descubra insights exclusivos, tutoriais práticos e oportunidades únicas 
              para transformar sua carreira musical no ecossistema digital.
            </p>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar artigos, tutoriais, dicas..."
                  className="pl-14 pr-32 py-6 text-lg bg-card/50 backdrop-blur-sm border-border/50 focus:border-primary/50 rounded-2xl"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 netflix-button bg-primary hover:bg-primary/90 px-6 py-3"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </form>
            
            {/* Popular Tags */}
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <p className="text-sm text-foreground/60 mb-3">Tags populares:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {popularTags.map((tag, index) => (
                  <motion.div
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="cursor-pointer hover:bg-primary/20 hover:text-primary transition-colors duration-300 px-4 py-2"
                    >
                      #{tag.toLowerCase().replace(' ', '')}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
          

        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-foreground/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Explore o conteúdo</span>
          <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogHero;