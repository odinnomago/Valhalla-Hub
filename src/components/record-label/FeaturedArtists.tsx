'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Artist {
  id: string;
  name: string;
  genre: string;
  streams: string;
  albums: number;
  image: string;
  verified: boolean;
  spotlight?: boolean;
}

const FeaturedArtists: React.FC = () => {
  const router = useRouter();

  const artists: Artist[] = [
    {
      id: '1',
      name: 'Luna Sinclair',
      genre: 'Pop Eletrônico',
      streams: '2.5M',
      albums: 3,
      image: '/images/artists/luna-sinclair.jpg',
      verified: true,
      spotlight: true
    },
    {
      id: '2',
      name: 'Marcus Silva',
      genre: 'Hip Hop',
      streams: '1.8M',
      albums: 2,
      image: '/images/artists/marcus-silva.jpg',
      verified: true
    },
    {
      id: '3',
      name: 'Aurora Dreams',
      genre: 'Indie Rock',
      streams: '3.2M',
      albums: 4,
      image: '/images/artists/aurora-dreams.jpg',
      verified: true
    },
    {
      id: '4',
      name: 'DJ Phoenix',
      genre: 'House',
      streams: '4.1M',
      albums: 5,
      image: '/images/artists/dj-phoenix.jpg',
      verified: true,
      spotlight: true
    },
    {
      id: '5',
      name: 'Violeta Campos',
      genre: 'MPB Contemporânea',
      streams: '1.3M',
      albums: 2,
      image: '/images/artists/violeta-campos.jpg',
      verified: true
    },
    {
      id: '6',
      name: 'Neon Collective',
      genre: 'Synthwave',
      streams: '2.9M',
      albums: 3,
      image: '/images/artists/neon-collective.jpg',
      verified: true
    }
  ];

  const handleArtistClick = (artistId: string) => {
    router.push(`/gravadora/artistas/${artistId}`);
  };

  const handleViewCatalog = () => {
    router.push('/gravadora/artistas');
  };

  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-headline">
            Artistas que Moldam o{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Futuro
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça os talentos que escolheram a Valhalla para transformar suas carreiras
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {artists.map((artist, index) => (
            <div
              key={artist.id}
              className={`group relative ${
                artist.spotlight 
                  ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10' 
                  : 'bg-card/50'
              } backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:bg-card/70 transition-all duration-300 hover:scale-105 cursor-pointer`}
              onClick={() => handleArtistClick(artist.id)}
            >
              {artist.spotlight && (
                <div className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                  Em Destaque
                </div>
              )}

              {/* Artist Image */}
              <div className="relative aspect-square overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-card/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <span className="text-6xl">🎤</span>
                  </div>
                </div>
                
                {artist.verified && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm">✓</span>
                  </div>
                )}
              </div>

              {/* Artist Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {artist.name}
                  </h3>
                  {artist.verified && (
                    <span className="text-primary text-sm">✓</span>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-4">{artist.genre}</p>

                {/* Artist Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">🔥</span>
                    <span className="text-foreground font-semibold">{artist.streams} streams</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">💿</span>
                    <span className="text-foreground font-semibold">{artist.albums} álbuns</span>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full netflix-button bg-transparent border border-primary text-primary px-4 py-2 rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>



        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Faça Parte do Nosso Catálogo
            </h3>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
              Junte-se aos artistas que escolheram a Valhalla para transformar suas carreiras. 
              Veja todos os artistas do nosso catálogo e descubra as oportunidades que esperam por você.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewCatalog}
                className="netflix-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all"
              >
                Catálogo Completo
              </button>
              <button
                onClick={() => router.push('/gravadora/demo')}
                className="netflix-button bg-transparent border-2 border-accent text-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Envie Sua Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedArtists;