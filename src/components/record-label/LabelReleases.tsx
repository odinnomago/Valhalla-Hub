'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ExternalLink } from 'lucide-react';

interface Release {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  releaseDate: string;
  type: 'Single' | 'EP' | 'Album';
  streams: string;
  description: string;
  bandcampUrl: string;
  spotifyUrl?: string;
  tracks: string[];
}

const LabelReleases: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const releases: Release[] = [
    {
      id: '1',
      title: 'Valhalla Tales Vol.1',
      artist: 'Various Artists',
      coverUrl: '/images/releases/valhalla-tales-vol1.jpg',
      releaseDate: '2024-01-01',
      type: 'Album',
      streams: '1.2M',
      description: 'A compilation of the best tracks from our talented roster of artists, showcasing the diversity and creativity of the Valhalla Records collective.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/valhalla-tales-vol-1',
      tracks: [
        'Odin\'s Call - Intro',
        'Raven\'s Flight',
        'Thor\'s Hammer',
        'Loki\'s Trick',
        'Freya\'s Tears',
        'Balder\'s Light',
        'Fenrir\'s Howl',
        'Yggdrasil\'s Roots'
      ]
    },
    {
      id: '2',
      title: 'Climate Echoes',
      artist: 'Various Artists',
      coverUrl: '/images/releases/climate-echoes.jpg',
      releaseDate: '2024-02-01',
      type: 'Album',
      streams: '980K',
      description: 'An exploration of our changing world through sound, featuring experimental electronic compositions that reflect environmental themes.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/climate-echoes',
      tracks: [
        'Melting Ice',
        'Rising Tides',
        'Desert Winds',
        'Forest Fire',
        'Urban Heat',
        'Seasonal Shift',
        'Renewable Dreams',
        'Carbon Footprint'
      ]
    },
    {
      id: '3',
      title: 'Cosmic Lotus',
      artist: 'Various Artists',
      coverUrl: '/images/releases/cosmic-lotus.jpg',
      releaseDate: '2024-03-01',
      type: 'Album',
      streams: '1.5M',
      description: 'A journey through space and consciousness, blending ambient soundscapes with rhythmic electronic elements for a transcendent listening experience.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/cosmic-lotus',
      tracks: [
        'Big Bang Birth',
        'Stellar Nurseries',
        'Black Hole Meditation',
        'Nebula Dreams',
        'Planetary Alignment',
        'Cosmic Dance',
        'Supernova Finale',
        'Lotus Bloom'
      ]
    },
    {
      id: '4',
      title: 'Alien Connect',
      artist: 'VAJRAPANI',
      coverUrl: '/images/releases/alien-connect.jpg',
      releaseDate: '2024-04-01',
      type: 'Album',
      streams: '870K',
      description: 'VAJRAPANI\'s debut album explores themes of extraterrestrial communication and the unknown, featuring hypnotic rhythms and otherworldly sound design.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/alien-connect',
      tracks: [
        'First Contact',
        'Transmission Received',
        'Galactic Highway',
        'Zero Gravity',
        'Alien Embassy',
        'Mind Meld',
        'Interdimensional Portal',
        'Return Journey'
      ]
    },
    {
      id: '5',
      title: 'Xenoglossic Ressonance',
      artist: 'SONNORUM',
      coverUrl: '/images/releases/xenoglossic-ressonance.jpg',
      releaseDate: '2024-05-01',
      type: 'Album',
      streams: '750K',
      description: 'SONNORUM\'s sophomore album delves into the concept of unknown languages and their musical expressions, creating a unique sonic vocabulary.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/xenoglossic-ressonance',
      tracks: [
        'Proto-Language',
        'Syllabic Patterns',
        'Grammatical Structures',
        'Semantic Fields',
        'Pragmatic Usage',
        'Discourse Analysis',
        'Language Evolution',
        'Post-Linguistic'
      ]
    },
    {
      id: '6',
      title: 'Yule',
      artist: 'ANNEXED DATA',
      coverUrl: '/images/releases/yule.jpg',
      releaseDate: '2024-06-01',
      type: 'Album',
      streams: '620K',
      description: 'A dark electronic celebration of the winter solstice, featuring atmospheric compositions that capture the mystery and magic of the season.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/yule',
      tracks: [
        'Winter\'s Embrace',
        'Solstice Night',
        'Evergreen Spirits',
        'Yule Log',
        'Mistletoe Dreams',
        'Santa\'s Workshop',
        'New Year\'s Dawn',
        'Return of the Light'
      ]
    },
    {
      id: '7',
      title: 'Soundtrack for a Hi-tech Script',
      artist: 'ANNEXED DATA',
      coverUrl: '/images/releases/hi-tech-script.jpg',
      releaseDate: '2024-07-01',
      type: 'Album',
      streams: '580K',
      description: 'A cinematic exploration of technology and human interaction, featuring compositions that blend organic and synthetic elements.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/soundtrack-for-a-hi-tech-script',
      tracks: [
        'Opening Sequence',
        'Digital Dawn',
        'Human Interface',
        'System Error',
        'Cyber Security',
        'Virtual Reality',
        'Artificial Intelligence',
        'Closing Credits'
      ]
    },
    {
      id: '8',
      title: 'INSIGHT',
      artist: 'KROMATIK',
      coverUrl: '/images/releases/insight.jpg',
      releaseDate: '2024-08-01',
      type: 'Album',
      streams: '720K',
      description: 'KROMATIK\'s debut album offers a kaleidoscopic journey through electronic soundscapes, with each track revealing new layers of sonic detail.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/insight',
      tracks: [
        'Prism Entry',
        'Spectrum Analysis',
        'Color Theory',
        'Light Refraction',
        'Chromatic Aberration',
        'Rainbow Reflection',
        'White Light',
        'Afterimage'
      ]
    },
    {
      id: '9',
      title: 'PSAWCHEDELIC',
      artist: 'CURUJA',
      coverUrl: '/images/releases/psawchedelic.jpg',
      releaseDate: '2024-09-01',
      type: 'Album',
      streams: '650K',
      description: 'A psychedelic journey through sound and consciousness, featuring mind-bending compositions that challenge perception and reality.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/psawchedelic',
      tracks: [
        'Trip Initiation',
        'Sensory Overload',
        'Temporal Distortion',
        'Reality Warp',
        'Mind Expansion',
        'Cosmic Consciousness',
        'Universal Connection',
        'Return to Normal'
      ]
    },
    {
      id: '10',
      title: 'REALMS SLAYER',
      artist: 'FREAK FREQZ',
      coverUrl: '/images/releases/realms-slayer.jpg',
      releaseDate: '2024-10-01',
      type: 'Album',
      streams: '810K',
      description: 'FREAK FREQZ\'s powerful debut explores themes of conquest and transcendence, with aggressive rhythms and epic soundscapes.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/realms-slayer',
      tracks: [
        'Realm Conquest',
        'Battle Cry',
        'Warrior\'s Path',
        'Dragon Slayer',
        'Kingdom Fall',
        'Victory March',
        'Throne Claim',
        'Empire Rise'
      ]
    },
    {
      id: '11',
      title: 'A GLAZY INTO ABYSS',
      artist: 'SURTUR',
      coverUrl: '/images/releases/glazy-abyss.jpg',
      releaseDate: '2024-11-01',
      type: 'Album',
      streams: '590K',
      description: 'SURTUR\'s dark exploration of the depths, featuring heavy, atmospheric compositions that evoke the mystery of the unknown.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/a-glazy-into-abyss',
      tracks: [
        'Descent Begins',
        'Dark Waters',
        'Pressure Build',
        'Ocean Floor',
        'Deep Sea Creatures',
        'Thermal Vents',
        'Abyssal Plain',
        'Return to Surface'
      ]
    },
    {
      id: '12',
      title: 'OPROEP VAN DIE TOWENAAR',
      artist: 'Amonati',
      coverUrl: '/images/releases/oproep-towenaar.jpg',
      releaseDate: '2024-12-01',
      type: 'Album',
      streams: '480K',
      description: 'Amonati\'s mystical journey through ancient sounds and modern production, creating a bridge between past and future.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/oproep-van-die-towenaar',
      tracks: [
        'Ancient Calling',
        'Mystic Ritual',
        'Shaman\'s Dance',
        'Spirit Journey',
        'Oracle\'s Message',
        'Tribal Gathering',
        'Sacred Fire',
        'Modern Return'
      ]
    },
    {
      id: '13',
      title: 'WARRIORS GATHERING',
      artist: 'TOWENAAR',
      coverUrl: '/images/releases/warriors-gathering.jpg',
      releaseDate: '2024-12-15',
      type: 'Album',
      streams: '520K',
      description: 'TOWENAAR\'s powerful finale to the year brings together epic battle themes and heroic anthems in a celebration of strength and unity.',
      bandcampUrl: 'https://valhallarec0rds.bandcamp.com/album/warriors-gathering',
      tracks: [
        'Horn of Gathering',
        'Warrior Assembly',
        'Shield Wall',
        'Sword Dance',
        'Battle Hymn',
        'Victory Feast',
        'Hero\'s Farewell',
        'Legends Remembered'
      ]
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
                    <p className="text-sm text-foreground/80 mb-3 line-clamp-2">{release.description}</p>

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

                    {/* Bandcamp Link */}
                    <a 
                      href={release.bandcampUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-2"
                    >
                      <span>Listen on Bandcamp</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
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