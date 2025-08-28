'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface Release {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  type: 'Single' | 'EP' | 'Album';
  streams: string;
  spotifyUrl?: string;
}

const LabelReleases: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const releases: Release[] = [
    {
      id: '1',
      title: 'Midnight Dreams',
      artist: 'Luna Sinclair',
      coverUrl: '/images/releases/midnight-dreams.jpg',
      releaseDate: '2024-01-15',
      type: 'Single',
      streams: '2.1M'
    },
    {
      id: '2',
      title: 'Urban Vibes',
      artist: 'Marcus Silva',
      coverUrl: '/images/releases/urban-vibes.jpg',
      releaseDate: '2024-01-20',
      type: 'EP',
      streams: '1.8M'
    },
    {
      id: '3',
      title: 'Electric Nights',
      artist: 'DJ Phoenix',
      coverUrl: '/images/releases/electric-nights.jpg',
      releaseDate: '2024-02-01',
      type: 'Album',
      streams: '3.2M'
    },
    {
      id: '4',
      title: 'Indie Soul',
      artist: 'Aurora Dreams',
      coverUrl: '/images/releases/indie-soul.jpg',
      releaseDate: '2024-02-10',
      type: 'Single',
      streams: '1.5M'
    },
    {
      id: '5',
      title: 'Raízes Modernas',
      artist: 'Violeta Campos',
      coverUrl: '/images/releases/raizes-modernas.jpg',
      releaseDate: '2024-02-15',
      type: 'EP',
      streams: '987K'
    },
    {
      id: '6',
      title: 'Neon Waves',
      artist: 'Neon Collective',
      coverUrl: '/images/releases/neon-waves.jpg',
      releaseDate: '2024-02-25',
      type: 'Album',
      streams: '2.4M'
    }
  ];

  const itemsPerView = 4;
  const maxIndex = Math.max(0, releases.length - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-headline">
              Últimos{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Lançamentos
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubra as novidades dos nossos artistas
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all ${
                currentIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary hover:border-primary hover:text-primary-foreground'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className={`w-12 h-12 rounded-full border border-border flex items-center justify-center transition-all ${
                currentIndex === maxIndex
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-primary hover:border-primary hover:text-primary-foreground'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Releases Carousel */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {releases.map((release, index) => (
              <div
                key={release.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <div className="group bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:bg-card/70 transition-all duration-300 hover:scale-105">
                  {/* Release Cover */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-card/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-5xl">🎵</span>
                      </div>
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 ml-1" fill="currentColor" />
                      </button>
                    </div>

                    {/* Release Type Badge */}
                    <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-bold">
                      {release.type}
                    </div>
                  </div>

                  {/* Release Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-muted-foreground mb-3">{release.artist}</p>

                    {/* Release Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground/70">
                        {formatDate(release.releaseDate)}
                      </span>
                      <div className="flex items-center gap-1 text-primary">
                        <span>🔥</span>
                        <span className="font-semibold">{release.streams}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? 'bg-primary w-6' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="netflix-button bg-transparent border-2 border-primary text-primary px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all">
            Ver Todos os Lançamentos
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LabelReleases;