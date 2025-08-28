'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Student {
  id: string;
  name: string;
  avatar: string;
  location: string;
  profession: string;
  social?: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
  };
}

interface Success {
  id: string;
  student: Student;
  achievement: string;
  description: string;
  course: string;
  before: string;
  after: string;
  timeframe: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  image: string;
  featured: boolean;
  category: 'career' | 'skills' | 'income' | 'recognition';
}

interface Testimonial {
  id: string;
  student: Student;
  quote: string;
  course: string;
  rating: number;
  video?: string;
  featured: boolean;
}

const StudentSuccess: React.FC = () => {
  const [activeView, setActiveView] = useState<'success' | 'testimonials'>('success');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const successStories: Success[] = [
    {
      id: '1',
      student: {
        id: 's1',
        name: 'Bruno Martins',
        avatar: '/images/success/bruno.jpg',
        location: 'São Paulo, SP',
        profession: 'Producer & DJ',
        social: {
          instagram: '@brunomartinsmusic',
          spotify: 'bruno-martins'
        }
      },
      achievement: 'De Iniciante a DJ Profissional',
      description: 'Em apenas 6 meses, Bruno saiu do zero e hoje toca nos principais clubs de São Paulo.',
      course: 'DJ Profissional Completo',
      before: 'Nunca havia tocado em uma pick-up',
      after: 'DJ residente em 3 casas noturnas',
      timeframe: '6 meses',
      metrics: [
        { label: 'Shows/mês', value: '12+' },
        { label: 'Followers', value: '25K' },
        { label: 'Renda mensal', value: 'R$ 8.000' }
      ],
      image: '/images/success/bruno-dj.jpg',
      featured: true,
      category: 'career'
    },
    {
      id: '2',
      student: {
        id: 's2',
        name: 'Carla Ribeiro',
        avatar: '/images/success/carla.jpg',
        location: 'Rio de Janeiro, RJ',
        profession: 'Cantora & Compositora',
        social: {
          instagram: '@carlaribeiromusic',
          youtube: '@CarlaRibeiro'
        }
      },
      achievement: 'Primeiro EP Lançado',
      description: 'Carla lançou seu primeiro EP autoral e já acumula milhares de streams.',
      course: 'Artista Independente 360°',
      before: 'Cantava apenas no chuveiro',
      after: '50K streams no primeiro mês',
      timeframe: '8 meses',
      metrics: [
        { label: 'Streams', value: '250K+' },
        { label: 'Fãs', value: '15K' },
        { label: 'Músicas', value: '6' }
      ],
      image: '/images/success/carla-studio.jpg',
      featured: true,
      category: 'recognition'
    },
    {
      id: '3',
      student: {
        id: 's3',
        name: 'Rafael Santos',
        avatar: '/images/success/rafael.jpg',
        location: 'Belo Horizonte, MG',
        profession: 'Music Producer',
        social: {
          instagram: '@rafaelbeats'
        }
      },
      achievement: 'Primeiro Beat Vendido',
      description: 'Rafael vendeu seu primeiro beat por R$ 1.500 para um artista independente.',
      course: 'Produção Musical Completa',
      before: 'Fazia beats por hobby',
      after: 'Renda extra de R$ 3.000/mês',
      timeframe: '4 meses',
      metrics: [
        { label: 'Beats vendidos', value: '45+' },
        { label: 'Clientes', value: '12' },
        { label: 'Renda extra', value: 'R$ 3.000' }
      ],
      image: '/images/success/rafael-studio.jpg',
      featured: false,
      category: 'income'
    },
    {
      id: '4',
      student: {
        id: 's4',
        name: 'Juliana Costa',
        avatar: '/images/success/juliana.jpg',
        location: 'Recife, PE',
        profession: 'Vocal Coach',
        social: {
          instagram: '@julivocalcoach'
        }
      },
      achievement: 'Abriu Próprio Estúdio',
      description: 'Juliana abriu seu próprio estúdio de ensino vocal e já tem 30 alunos fixos.',
      course: 'Performance & Presença de Palco',
      before: 'Cantava em coral da igreja',
      after: 'Vocal coach com estúdio próprio',
      timeframe: '10 meses',
      metrics: [
        { label: 'Alunos', value: '30+' },
        { label: 'Renda mensal', value: 'R$ 6.500' },
        { label: 'Avaliação', value: '5.0★' }
      ],
      image: '/images/success/juliana-studio.jpg',
      featured: false,
      category: 'career'
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: '1',
      student: {
        id: 't1',
        name: 'Lucas Oliveira',
        avatar: '/images/testimonials/lucas.jpg',
        location: 'Brasília, DF',
        profession: 'Beatmaker'
      },
      quote: 'A Academy mudou minha vida! Em 3 meses aprendi mais do que em anos tentando sozinho. Os instrutores são incríveis e a comunidade é muito acolhedora.',
      course: 'Produção Musical Completa',
      rating: 5,
      featured: true
    },
    {
      id: '2',
      student: {
        id: 't2',
        name: 'Amanda Silva',
        avatar: '/images/testimonials/amanda.jpg',
        location: 'Fortaleza, CE',
        profession: 'Cantora'
      },
      quote: 'Nunca pensei que conseguiria superar meu medo de palco. As técnicas de respiração e presença que aprendi aqui foram fundamentais para minha evolução.',
      course: 'Performance & Presença de Palco',
      rating: 5,
      video: '/videos/testimonials/amanda.mp4',
      featured: true
    },
    {
      id: '3',
      student: {
        id: 't3',
        name: 'Diego Ferreira',
        avatar: '/images/testimonials/diego.jpg',
        location: 'Porto Alegre, RS',
        profession: 'Guitarrista'
      },
      quote: 'Os cursos são muito práticos e diretos ao ponto. Consegui aplicar tudo que aprendi imediatamente nos meus projetos. Recomendo 100%!',
      course: 'Composição & Harmonia',
      rating: 5,
      featured: false
    },
    {
      id: '4',
      student: {
        id: 't4',
        name: 'Priscila Rocha',
        avatar: '/images/testimonials/priscila.jpg',
        location: 'Salvador, BA',
        profession: 'Produtora Musical'
      },
      quote: 'A plataforma é incrível! Poder baixar as aulas e estudar offline foi perfeito para minha rotina. E os certificados realmente valem no mercado.',
      course: 'Produção Eletrônica Avançada',
      rating: 5,
      featured: false
    }
  ];

  // Auto-rotate success stories
  useEffect(() => {
    if (!autoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => 
        prev === successStories.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, successStories.length]);

  const currentSuccess = successStories[currentIndex];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'career': return '🚀';
      case 'skills': return '🎯';
      case 'income': return '💰';
      case 'recognition': return '🏆';
      default: return '⭐';
    }
  };

  const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="bg-card rounded-xl p-6 h-full border border-border">
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={testimonial.student.avatar}
          alt={testimonial.student.name}
          width={60}
          height={60}
          className="rounded-full"
        />
        <div>
          <h4 className="text-foreground font-semibold">{testimonial.student.name}</h4>
          <p className="text-muted-foreground text-sm">{testimonial.student.profession}</p>
          <p className="text-muted-foreground/70 text-xs">{testimonial.student.location}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400">⭐</span>
        ))}
      </div>

      <blockquote className="text-muted-foreground italic mb-4">
        "{testimonial.quote}"
      </blockquote>

      <div className="border-t border-border pt-3">
        <p className="text-primary text-sm font-medium">{testimonial.course}</p>
      </div>

      {testimonial.video && (
        <button className="mt-3 text-sm text-primary hover:text-primary/80 transition-colors">
          ▶️ Ver Depoimento em Vídeo
        </button>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Histórias de <span className="text-primary">Sucesso</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alunos que transformaram suas vidas através da música e se inspirem em suas jornadas.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-card rounded-full p-1">
            <button
              onClick={() => setActiveView('success')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'success'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              🌟 Histórias de Sucesso
            </button>
            <button
              onClick={() => setActiveView('testimonials')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeView === 'testimonials'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              💬 Depoimentos
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Featured Success Story */}
              <div className="relative bg-card rounded-2xl overflow-hidden border border-border">
                <div className="grid lg:grid-cols-2 gap-8 p-8">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getCategoryIcon(currentSuccess.category)}</span>
                      <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                        História em Destaque
                      </span>
                    </div>

                    <div>
                      <h3 className="text-3xl font-bold text-foreground mb-2">
                        {currentSuccess.achievement}
                      </h3>
                      <p className="text-muted-foreground text-lg">{currentSuccess.description}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <Image
                        src={currentSuccess.student.avatar}
                        alt={currentSuccess.student.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="text-foreground font-semibold text-lg">{currentSuccess.student.name}</h4>
                        <p className="text-muted-foreground">{currentSuccess.student.profession}</p>
                        <p className="text-muted-foreground/70 text-sm">{currentSuccess.student.location}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-muted-foreground text-sm mb-1">Antes</p>
                        <p className="text-foreground">{currentSuccess.before}</p>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-muted-foreground text-sm mb-1">Depois</p>
                        <p className="text-foreground">{currentSuccess.after}</p>
                      </div>
                    </div>

                    {currentSuccess.metrics && (
                      <div className="grid grid-cols-3 gap-4">
                        {currentSuccess.metrics.map((metric, index) => (
                          <div key={index} className="text-center">
                            <p className="text-2xl font-bold text-primary">{metric.value}</p>
                            <p className="text-muted-foreground text-sm">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground">Tempo:</span>
                      <span className="text-foreground font-semibold">{currentSuccess.timeframe}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-primary">{currentSuccess.course}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                      <Image
                        src={currentSuccess.image}
                        alt={currentSuccess.achievement}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {currentSuccess.student.social && (
                      <div className="absolute bottom-4 right-4 flex gap-2">
                        {currentSuccess.student.social.instagram && (
                          <a
                            href={`https://instagram.com/${currentSuccess.student.social.instagram}`}
                            className="w-10 h-10 bg-card/70 rounded-full flex items-center justify-center text-foreground hover:bg-card/90 transition-colors"
                          >
                            📷
                          </a>
                        )}
                        {currentSuccess.student.social.spotify && (
                          <a
                            href={`https://open.spotify.com/artist/${currentSuccess.student.social.spotify}`}
                            className="w-10 h-10 bg-card/70 rounded-full flex items-center justify-center text-foreground hover:bg-card/90 transition-colors"
                          >
                            🎵
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 pb-6">
                  {successStories.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentIndex(index);
                        setAutoPlay(false);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Other Success Stories */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories
                  .filter((_, index) => index !== currentIndex)
                  .slice(0, 3)
                  .map((story, index) => (
                    <motion.div
                      key={story.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-card rounded-xl p-6 cursor-pointer hover:bg-card/80 transition-colors border border-border"
                      onClick={() => setCurrentIndex(successStories.indexOf(story))}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xl">{getCategoryIcon(story.category)}</span>
                        <h4 className="text-foreground font-bold">{story.achievement}</h4>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={story.student.avatar}
                          alt={story.student.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-foreground text-sm font-medium">{story.student.name}</p>
                          <p className="text-muted-foreground text-xs">{story.student.location}</p>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm mb-3">{story.description}</p>
                      
                      <div className="text-xs text-muted-foreground">
                        <span>{story.timeframe}</span>
                        <span className="mx-2">•</span>
                        <span className="text-primary">{story.course}</span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mt-16 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-border"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Sua História de Sucesso Começa Aqui
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Junte-se a milhares de alunos que já transformaram suas vidas através da música. 
            Comece sua jornada hoje mesmo!
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors">
            Começar Agora
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default StudentSuccess;