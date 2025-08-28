'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    genre: string;
    image: string;
    verified: boolean;
  };
  stats: {
    streams: string;
    growth: string;
  };
  featured?: boolean;
}

const ArtistTestimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      content: "A Valhalla mudou minha carreira completamente. Não apenas distribuíram minha música, mas me deram suporte completo para crescer como artista. A transparência nos royalties e o suporte da equipe me deram segurança para focar no que mais importa: criar música.",
      author: {
        name: 'Luna Sinclair',
        role: 'Artista Valhalla',
        genre: 'Pop Eletrônico',
        image: '/images/artists/luna-sinclair.jpg',
        verified: true
      },
      stats: {
        streams: '2.5M',
        growth: '+340%'
      },
      featured: true
    },
    {
      id: '2',
      content: "O que mais me impressiona na Valhalla é como eles entendem que cada artista é único. Eles não têm uma fórmula pronta, mas criam estratégias personalizadas. Meu crescimento nas plataformas digitais foi exponencial desde que comecei a trabalhar com eles.",
      author: {
        name: 'Marcus Silva',
        role: 'Rapper e Produtor',
        genre: 'Hip Hop',
        image: '/images/artists/marcus-silva.jpg',
        verified: true
      },
      stats: {
        streams: '1.8M',
        growth: '+280%'
      }
    },
    {
      id: '3',
      content: "A equipe da Valhalla é incrivelmente profissional e apaixonada por música. Eles me ajudaram não só com distribuição, mas com desenvolvimento artístico, marketing e até mesmo coaching de carreira. É como ter um time completo trabalhando pelo seu sucesso.",
      author: {
        name: 'Aurora Dreams',
        role: 'Cantora e Compositora',
        genre: 'Indie Rock',
        image: '/images/artists/aurora-dreams.jpg',
        verified: true
      },
      stats: {
        streams: '3.2M',
        growth: '+450%'
      }
    },
    {
      id: '4',
      content: "Como DJ, preciso estar sempre conectado com as tendências e ter suporte técnico de primeira. A Valhalla oferece exatamente isso: tecnologia de ponta, análises detalhadas e uma rede de contatos que abriu portas que eu nem imaginava que existiam.",
      author: {
        name: 'DJ Phoenix',
        role: 'DJ e Produtor',
        genre: 'House Music',
        image: '/images/artists/dj-phoenix.jpg',
        verified: true
      },
      stats: {
        streams: '4.1M',
        growth: '+520%'
      },
      featured: true
    }
  ];

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
            O Que Nossos{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Artistas
            </span>{' '}
            Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Histórias reais de transformação e crescimento na indústria musical
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${
                testimonial.featured 
                  ? 'bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10' 
                  : 'bg-card/50'
              } backdrop-blur-sm border border-border rounded-2xl p-8 hover:bg-card/70 transition-all duration-300`}
            >
              {testimonial.featured && (
                <div className="absolute -top-3 left-6 bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Destaque
                </div>
              )}

              {/* Quote Icon */}
              <div className="text-4xl text-primary/30 mb-4">"</div>

              {/* Testimonial Content */}
              <p className="text-lg text-foreground/90 leading-relaxed mb-8 italic">
                {testimonial.content}
              </p>

              {/* Author Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Author Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🎤</span>
                    </div>
                    {testimonial.author.verified && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-primary-foreground text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Author Details */}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-foreground">
                        {testimonial.author.name}
                      </h4>
                      {testimonial.author.verified && (
                        <span className="text-primary text-sm">✓</span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.author.role}
                    </p>
                    <p className="text-accent text-sm font-medium">
                      {testimonial.author.genre}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    {testimonial.stats.streams}
                  </div>
                  <div className="text-muted-foreground text-sm">streams</div>
                  <div className="text-accent font-bold text-sm">
                    {testimonial.stats.growth}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>



        {/* Video Testimonials CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Veja Mais Depoimentos
            </h3>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
              Assista aos vídeos exclusivos dos nossos artistas contando suas histórias 
              de transformação e crescimento com a Valhalla Records.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="netflix-button bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all">
                Ver Vídeos
              </button>
              <button className="netflix-button bg-transparent border-2 border-accent text-accent px-8 py-4 rounded-xl font-bold text-lg hover:bg-accent hover:text-accent-foreground transition-all">
                Casos de Sucesso
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtistTestimonials;