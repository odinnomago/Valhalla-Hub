'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Course {
  id: string;
  title: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  completed?: boolean;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  students: number;
  rating: number;
  thumbnail: string;
  instructor: {
    name: string;
    avatar: string;
    role: string;
  };
  courses: Course[];
  skills: string[];
  certification: boolean;
  price: number;
  originalPrice?: number;
  featured?: boolean;
}

const LearningPaths: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  const categories = [
    { id: 'all', name: 'Todos os Caminhos', icon: '🎯' },
    { id: 'production', name: 'Produção Musical', icon: '🎵' },
    { id: 'performance', name: 'Performance', icon: '🎤' },
    { id: 'business', name: 'Música & Negócios', icon: '💼' },
    { id: 'technology', name: 'Tecnologia Musical', icon: '🔧' },
    { id: 'composition', name: 'Composição', icon: '✍️' }
  ];

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Produtor Musical Completo',
      description: 'Do zero ao profissional: aprenda todas as técnicas de produção musical moderna',
      category: 'production',
      difficulty: 'beginner',
      duration: '12 semanas',
      students: 2547,
      rating: 4.9,
      thumbnail: '/images/academy/path-producer.jpg',
      instructor: {
        name: 'DJ Marcus Silva',
        avatar: '/images/instructors/marcus.jpg',
        role: 'Grammy-winning Producer'
      },
      courses: [
        { id: 'c1', title: 'Fundamentos da Produção', duration: '3 semanas', level: 'beginner' },
        { id: 'c2', title: 'Mixing & Mastering', duration: '4 semanas', level: 'intermediate' },
        { id: 'c3', title: 'Sound Design Avançado', duration: '3 semanas', level: 'advanced' },
        { id: 'c4', title: 'Projeto Final: Seu EP', duration: '2 semanas', level: 'advanced' }
      ],
      skills: ['Logic Pro X', 'Ableton Live', 'Sound Design', 'Mixing', 'Mastering'],
      certification: true,
      price: 497,
      originalPrice: 697,
      featured: true
    },
    {
      id: '2',
      title: 'Artista Independente 360°',
      description: 'Construa sua carreira musical do zero: música, marketing, distribuição e monetização',
      category: 'business',
      difficulty: 'intermediate',
      duration: '16 semanas',
      students: 1834,
      rating: 4.8,
      thumbnail: '/images/academy/path-independent.jpg',
      instructor: {
        name: 'Ana Beatriz Costa',
        avatar: '/images/instructors/ana.jpg',
        role: 'Independent Artist & Consultant'
      },
      courses: [
        { id: 'c5', title: 'Identidade Musical', duration: '2 semanas', level: 'beginner' },
        { id: 'c6', title: 'Produção de Conteúdo', duration: '4 semanas', level: 'intermediate' },
        { id: 'c7', title: 'Marketing Digital Musical', duration: '5 semanas', level: 'intermediate' },
        { id: 'c8', title: 'Distribuição & Monetização', duration: '3 semanas', level: 'advanced' },
        { id: 'c9', title: 'Planejamento de Carreira', duration: '2 semanas', level: 'advanced' }
      ],
      skills: ['Brand Building', 'Social Media', 'Music Distribution', 'Revenue Streams', 'Career Planning'],
      certification: true,
      price: 597,
      originalPrice: 897
    },
    {
      id: '3',
      title: 'DJ Profissional',
      description: 'Domine as técnicas de DJing e construa uma carreira sólida na música eletrônica',
      category: 'performance',
      difficulty: 'beginner',
      duration: '10 semanas',
      students: 3201,
      rating: 4.7,
      thumbnail: '/images/academy/path-dj.jpg',
      instructor: {
        name: 'Carlos Rhythm',
        avatar: '/images/instructors/carlos.jpg',
        role: 'International DJ & Producer'
      },
      courses: [
        { id: 'c10', title: 'Fundamentos do DJing', duration: '3 semanas', level: 'beginner' },
        { id: 'c11', title: 'Técnicas Avançadas', duration: '3 semanas', level: 'intermediate' },
        { id: 'c12', title: 'Produção para DJs', duration: '2 semanas', level: 'intermediate' },
        { id: 'c13', title: 'Performance & Marketing', duration: '2 semanas', level: 'advanced' }
      ],
      skills: ['Beatmatching', 'Scratching', 'Live Remixing', 'Equipment Mastery', 'Stage Presence'],
      certification: true,
      price: 397,
      originalPrice: 597
    }
  ];

  const filteredPaths = selectedCategory === 'all' 
    ? learningPaths 
    : learningPaths.filter(path => path.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const PathModal: React.FC<{ path: LearningPath; onClose: () => void }> = ({ path, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative h-64">
          <Image
            src={path.thumbnail}
            alt={path.title}
            fill
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
          >
            ✕
          </button>
          <div className="absolute bottom-6 left-6">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={path.instructor.avatar}
                alt={path.instructor.name}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-white font-medium">{path.instructor.name}</p>
                <p className="text-gray-300 text-sm">{path.instructor.role}</p>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{path.title}</h2>
            <div className="flex items-center gap-4 text-gray-300">
              <span>⭐ {path.rating}</span>
              <span>👥 {path.students.toLocaleString()} alunos</span>
              <span>⏱️ {path.duration}</span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">Sobre este Caminho</h3>
              <p className="text-gray-300 mb-6">{path.description}</p>

              <h4 className="text-lg font-semibold text-white mb-4">Cursos Inclusos</h4>
              <div className="space-y-3">
                {path.courses.map((course, index) => (
                  <div key={course.id} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-black font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="text-white font-medium">{course.title}</h5>
                      <p className="text-gray-400 text-sm">{course.duration}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.level)}`}>
                      {course.level}
                    </span>
                    {course.completed && (
                      <span className="text-green-400">✓</span>
                    )}
                  </div>
                ))}
              </div>

              <h4 className="text-lg font-semibold text-white mb-4 mt-6">Habilidades que Você Desenvolverá</h4>
              <div className="flex flex-wrap gap-2">
                {path.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="text-center mb-4">
                  {path.originalPrice && (
                    <p className="text-gray-400 line-through text-lg">R$ {path.originalPrice}</p>
                  )}
                  <p className="text-3xl font-bold text-white">R$ {path.price}</p>
                  <p className="text-gray-400">ou 12x de R$ {Math.round(path.price / 12)}</p>
                </div>
                
                <button className="w-full bg-primary-500 text-black font-bold py-3 rounded-lg hover:bg-primary-400 transition-colors mb-3">
                  Iniciar Jornada
                </button>
                
                <button className="w-full border border-gray-600 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Adicionar ao Carrinho
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6">
                <h5 className="text-white font-semibold mb-3">Incluso</h5>
                <div className="space-y-2 text-gray-300 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Acesso vitalício</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Downloads para offline</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Certificado de conclusão</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Suporte da comunidade</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Projetos práticos</span>
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
    <section className="py-20 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Trilhas de <span className="text-primary-400">Aprendizado</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Jornadas estruturadas e curadas para acelerar seu desenvolvimento musical.
            Inspiradas nas melhores práticas educacionais do mundo.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Learning Paths Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPaths.map((path, index) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedPath(path)}
            >
              <div className="relative h-48">
                <Image
                  src={path.thumbnail}
                  alt={path.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                {path.featured && (
                  <div className="absolute top-4 left-4 bg-primary-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    Destaque
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Image
                      src={path.instructor.avatar}
                      alt={path.instructor.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-white text-sm">{path.instructor.name}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty}
                  </span>
                  <span className="text-gray-400 text-sm">{path.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {path.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {path.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>⭐ {path.rating}</span>
                    <span>👥 {path.students.toLocaleString()}</span>
                  </div>
                  {path.certification && (
                    <span className="text-primary-400 text-sm">🏆 Certificado</span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    {path.originalPrice && (
                      <span className="text-gray-400 line-through text-sm">R$ {path.originalPrice}</span>
                    )}
                    <span className="text-white font-bold text-lg ml-2">R$ {path.price}</span>
                  </div>
                  <span className="text-primary-400 text-sm">{path.courses.length} cursos</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Path Detail Modal */}
        {selectedPath && (
          <PathModal path={selectedPath} onClose={() => setSelectedPath(null)} />
        )}
      </div>
    </section>
  );
};

export default LearningPaths;