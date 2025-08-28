'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Instructor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  bio: string;
  avatar: string;
  coverImage: string;
  achievements: string[];
  stats: {
    students: number;
    courses: number;
    rating: number;
    experience: string;
  };
  social: {
    instagram?: string;
    youtube?: string;
    spotify?: string;
    website?: string;
  };
  featured: boolean;
  masterclass?: boolean;
  courses: Array<{
    id: string;
    title: string;
    price: number;
    students: number;
    rating: number;
  }>;
  quotes: string[];
}

const FeaturedInstructors: React.FC = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos', icon: '🌟' },
    { id: 'production', name: 'Produção', icon: '🎵' },
    { id: 'performance', name: 'Performance', icon: '🎤' },
    { id: 'business', name: 'Negócios', icon: '💼' },
    { id: 'composition', name: 'Composição', icon: '✍️' }
  ];

  const instructors: Instructor[] = [
    {
      id: '1',
      name: 'Alok',
      title: 'DJ & Producer Internacional',
      specialty: 'production',
      bio: 'DJ brasileiro mais reconhecido internacionalmente, com bilhões de plays e shows nos maiores festivais do mundo.',
      avatar: '/images/instructors/alok.jpg',
      coverImage: '/images/instructors/alok-cover.jpg',
      achievements: [
        'Top 5 DJ Mag',
        'Bilhões de streams',
        'Tomorrowland Headliner',
        'Grammy Latino Indicado'
      ],
      stats: {
        students: 12547,
        courses: 3,
        rating: 4.9,
        experience: '15+ anos'
      },
      social: {
        instagram: '@alok',
        youtube: '@AlokOficial',
        spotify: 'alok'
      },
      featured: true,
      masterclass: true,
      courses: [
        {
          id: 'c1',
          title: 'MasterClass: Produção de Music Eletrônica',
          price: 497,
          students: 8934,
          rating: 4.9
        },
        {
          id: 'c2',
          title: 'Performance & Stage Presence',
          price: 297,
          students: 5612,
          rating: 4.8
        }
      ],
      quotes: [
        'A música eletrônica brasileira tem um som único que precisa ser valorizado.',
        'Sempre busco conectar a cultura brasileira com sonoridades globais.'
      ]
    },
    {
      id: '2',
      name: 'Anitta',
      title: 'Artista Internacional',
      specialty: 'performance',
      bio: 'Maior estrela pop do Brasil, primeira brasileira no top 10 global do Spotify e conquista internacional.',
      avatar: '/images/instructors/anitta.jpg',
      coverImage: '/images/instructors/anitta-cover.jpg',
      achievements: [
        'Billboard Hot 100',
        'Coachella Headliner',
        'Grammy Nominee',
        '50M+ followers'
      ],
      stats: {
        students: 15623,
        courses: 4,
        rating: 4.8,
        experience: '12+ anos'
      },
      social: {
        instagram: '@anitta',
        youtube: '@Anitta'
      },
      featured: true,
      masterclass: true,
      courses: [
        {
          id: 'c3',
          title: 'MasterClass: Performance & Presença de Palco',
          price: 597,
          students: 11234,
          rating: 4.9
        },
        {
          id: 'c4',
          title: 'Construindo uma Carreira Internacional',
          price: 397,
          students: 7891,
          rating: 4.7
        }
      ],
      quotes: [
        'A autenticidade é o que faz a diferença na música.',
        'Nunca pare de sonhar, mas trabalhe para que os sonhos se tornem realidade.'
      ]
    },
    {
      id: '3',
      name: 'Gusttavo Lima',
      title: 'Embaixador do Sertanejo',
      specialty: 'business',
      bio: 'Um dos maiores nomes do sertanejo atual, empresário bem-sucedido e referência em inovação musical.',
      avatar: '/images/instructors/gusttavo.jpg',
      coverImage: '/images/instructors/gusttavo-cover.jpg',
      achievements: [
        'Bilhões de views',
        'Empresário musical',
        'Shows em estádios',
        'Marca própria'
      ],
      stats: {
        students: 9876,
        courses: 2,
        rating: 4.7,
        experience: '18+ anos'
      },
      social: {
        instagram: '@gusttavolima',
        youtube: '@GusttavoLima'
      },
      featured: true,
      courses: [
        {
          id: 'c5',
          title: 'Negócios da Música: Do Artista ao Empresário',
          price: 397,
          students: 5432,
          rating: 4.8
        },
        {
          id: 'c6',
          title: 'Sertanejo Moderno: Evolução Musical',
          price: 297,
          students: 4444,
          rating: 4.6
        }
      ],
      quotes: [
        'A música é negócio, mas nunca esqueça da paixão.',
        'Inovação é fundamental para se manter relevante.'
      ]
    },
    {
      id: '4',
      name: 'Criolo',
      title: 'Compositor & Rapper',
      specialty: 'composition',
      bio: 'Um dos maiores nomes do rap nacional, poeta urbano e compositor de letras que marcaram uma geração.',
      avatar: '/images/instructors/criolo.jpg',
      coverImage: '/images/instructors/criolo-cover.jpg',
      achievements: [
        'Prêmio da Música Brasileira',
        'Reconhecimento crítico',
        'Influência cultural',
        'Ativismo social'
      ],
      stats: {
        students: 6789,
        courses: 3,
        rating: 4.9,
        experience: '20+ anos'
      },
      social: {
        instagram: '@criolo',
        youtube: '@CrioloOficial'
      },
      featured: true,
      courses: [
        {
          id: 'c7',
          title: 'Composição: Da Poesia à Música',
          price: 347,
          students: 3456,
          rating: 4.9
        },
        {
          id: 'c8',
          title: 'Rap Nacional: História e Técnicas',
          price: 247,
          students: 2789,
          rating: 4.8
        }
      ],
      quotes: [
        'A música tem o poder de transformar realidades.',
        'Cada verso é uma oportunidade de contar uma história real.'
      ]
    }
  ];

  const filteredInstructors = activeCategory === 'all' 
    ? instructors 
    : instructors.filter(instructor => instructor.specialty === activeCategory);

  const InstructorModal: React.FC<{ instructor: Instructor; onClose: () => void }> = ({ instructor, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-border"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-80">
          <Image
            src={instructor.coverImage}
            alt={instructor.name}
            fill
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-12 h-12 bg-background/50 rounded-full flex items-center justify-center text-foreground hover:bg-background/70 transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-8 left-8 flex items-end gap-6">
            <Image
              src={instructor.avatar}
              alt={instructor.name}
              width={120}
              height={120}
              className="rounded-2xl border-4 border-white"
            />
            <div className="pb-4">
              <h2 className="text-4xl font-bold text-foreground mb-2">{instructor.name}</h2>
              <p className="text-xl text-primary-400 font-medium">{instructor.title}</p>
              <div className="flex items-center gap-4 mt-3 text-muted-foreground">
                <span>⭐ {instructor.stats.rating}</span>
                <span>👥 {instructor.stats.students.toLocaleString()} alunos</span>
                <span>🎓 {instructor.stats.courses} cursos</span>
                <span>📅 {instructor.stats.experience}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section>
                <h3 className="text-2xl font-bold text-foreground mb-4">Sobre {instructor.name}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{instructor.bio}</p>
              </section>

              <section>
                <h3 className="text-2xl font-bold text-foreground mb-4">Conquistas</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {instructor.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <span className="text-primary-400 text-xl">🏆</span>
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
                </div>
              </section>

              {instructor.quotes && instructor.quotes.length > 0 && (
                <section>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Filosofia</h3>
                  <div className="space-y-4">
                    {instructor.quotes.map((quote, index) => (
                      <blockquote key={index} className="border-l-4 border-primary-400 pl-6 py-2">
                        <p className="text-muted-foreground italic text-lg">"{quote}"</p>
                      </blockquote>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-2xl font-bold text-foreground mb-4">Cursos</h3>
                <div className="space-y-4">
                  {instructor.courses.map(course => (
                    <div key={course.id} className="bg-muted rounded-xl p-6 hover:bg-muted/80 transition-colors">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-foreground mb-2">{course.title}</h4>
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span>⭐ {course.rating}</span>
                            <span>👥 {course.students.toLocaleString()} alunos</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-foreground">R$ {course.price}</p>
                          <p className="text-muted-foreground">12x de R$ {Math.round(course.price / 12)}</p>
                        </div>
                      </div>
                      <button className="w-full bg-primary-500 text-black font-bold py-3 rounded-lg hover:bg-primary-400 transition-colors">
                        Ver Curso
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-muted rounded-xl p-6">
                <h4 className="text-foreground font-semibold mb-4">Conecte-se</h4>
                <div className="space-y-3">
                  {instructor.social.instagram && (
                    <a href={`https://instagram.com/${instructor.social.instagram}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <span className="text-xl">📷</span>
                      <span>Instagram</span>
                    </a>
                  )}
                  {instructor.social.youtube && (
                    <a href={`https://youtube.com/${instructor.social.youtube}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <span className="text-xl">📺</span>
                      <span>YouTube</span>
                    </a>
                  )}
                  {instructor.social.spotify && (
                    <a href={`https://open.spotify.com/artist/${instructor.social.spotify}`} className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                      <span className="text-xl">🎵</span>
                      <span>Spotify</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="bg-muted rounded-xl p-6">
                <h4 className="text-foreground font-semibold mb-4">Estatísticas</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Total de Alunos</p>
                    <p className="text-2xl font-bold text-foreground">{instructor.stats.students.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Avaliação Média</p>
                    <p className="text-2xl font-bold text-foreground">{instructor.stats.rating} ⭐</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Experiência</p>
                    <p className="text-2xl font-bold text-foreground">{instructor.stats.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Instrutores <span className="text-primary">Renomados</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Aprenda com os maiores nomes da música brasileira. 
            MasterClasses exclusivas com artistas que moldaram a indústria.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Instructors Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredInstructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setSelectedInstructor(instructor)}
            >
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {instructor.masterclass && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      MASTERCLASS
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {instructor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{instructor.title}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>⭐ {instructor.stats.rating}</span>
                      <span>{instructor.stats.students.toLocaleString()} alunos</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {instructor.achievements.slice(0, 2).map((achievement, idx) => (
                      <span key={idx} className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                        {achievement}
                      </span>
                    ))}
                    {instructor.achievements.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
                        +{instructor.achievements.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instructor Detail Modal */}
        <AnimatePresence>
          {selectedInstructor && (
            <InstructorModal 
              instructor={selectedInstructor} 
              onClose={() => setSelectedInstructor(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedInstructors;