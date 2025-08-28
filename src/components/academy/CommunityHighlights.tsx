'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ProjectFile {
  type: 'audio' | 'video' | 'image';
  url: string;
  thumbnail?: string;
}

interface Student {
  id: string;
  name: string;
  avatar: string;
  level: string;
  location: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  student: Student;
  course: string;
  files: ProjectFile[];
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  featured: boolean;
  category: 'production' | 'performance' | 'composition' | 'mix';
}

interface Discussion {
  id: string;
  title: string;
  excerpt: string;
  author: Student;
  category: string;
  replies: number;
  lastActivity: string;
  tags: string[];
}

const CommunityHighlights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'discussions'>('projects');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const projectCategories = [
    { id: 'all', name: 'Todos', icon: '🎯' },
    { id: 'production', name: 'Produções', icon: '🎵' },
    { id: 'performance', name: 'Performances', icon: '🎤' },
    { id: 'composition', name: 'Composições', icon: '✍️' },
    { id: 'mix', name: 'Mixagens', icon: '🎚️' }
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'Trap Brasileiro - Projeto Final',
      description: 'Minha primeira produção completa após concluir o curso de Produção Musical. Usei técnicas de layering e side-chain compression.',
      student: {
        id: 's1',
        name: 'Lucas Santos',
        avatar: '/images/students/lucas.jpg',
        level: 'Intermediário',
        location: 'São Paulo, SP'
      },
      course: 'Produção Musical Completa',
      files: [
        { type: 'audio', url: '/audio/lucas-trap.mp3', thumbnail: '/images/projects/lucas-trap.jpg' },
        { type: 'image', url: '/images/projects/lucas-studio.jpg' }
      ],
      tags: ['trap', 'brasileiro', 'beats', 'projeto-final'],
      likes: 234,
      comments: 45,
      createdAt: '2024-01-15',
      featured: true,
      category: 'production'
    },
    {
      id: '2',
      title: 'Performance Acústica - Bossa Nova',
      description: 'Interpretação de "Garota de Ipanema" aplicando técnicas de respiração e presença de palco aprendidas no curso.',
      student: {
        id: 's2',
        name: 'Maria Silva',
        avatar: '/images/students/maria.jpg',
        level: 'Avançado',
        location: 'Rio de Janeiro, RJ'
      },
      course: 'Performance & Presença de Palco',
      files: [
        { type: 'video', url: '/video/maria-bossa.mp4', thumbnail: '/images/projects/maria-performance.jpg' }
      ],
      tags: ['bossa-nova', 'acústico', 'vocal', 'performance'],
      likes: 189,
      comments: 32,
      createdAt: '2024-01-12',
      featured: true,
      category: 'performance'
    },
    {
      id: '3',
      title: 'Remix Eletrônico - House Music',
      description: 'Remix de música clássica brasileira usando técnicas de house music. Experimentei com vocal chops e synths analógicos.',
      student: {
        id: 's3',
        name: 'Pedro Costa',
        avatar: '/images/students/pedro.jpg',
        level: 'Intermediário',
        location: 'Belo Horizonte, MG'
      },
      course: 'Produção Eletrônica Avançada',
      files: [
        { type: 'audio', url: '/audio/pedro-house.mp3', thumbnail: '/images/projects/pedro-remix.jpg' }
      ],
      tags: ['house', 'remix', 'eletrônico', 'vocal-chops'],
      likes: 156,
      comments: 28,
      createdAt: '2024-01-10',
      featured: false,
      category: 'production'
    },
    {
      id: '4',
      title: 'Composição Original - Sertanejo Universitário',
      description: 'Minha primeira composição completa, incluindo letra e melodia. Inspirada nas aulas de harmonia funcional.',
      student: {
        id: 's4',
        name: 'Ana Oliveira',
        avatar: '/images/students/ana.jpg',
        level: 'Iniciante',
        location: 'Goiânia, GO'
      },
      course: 'Composição & Harmonia',
      files: [
        { type: 'audio', url: '/audio/ana-sertanejo.mp3', thumbnail: '/images/projects/ana-composition.jpg' },
        { type: 'image', url: '/images/projects/ana-lyrics.jpg' }
      ],
      tags: ['sertanejo', 'composição', 'harmonia', 'original'],
      likes: 98,
      comments: 15,
      createdAt: '2024-01-08',
      featured: false,
      category: 'composition'
    }
  ];

  const discussions: Discussion[] = [
    {
      id: '1',
      title: 'Dicas para mixagem de vocal em trap',
      excerpt: 'Estou com dificuldades para fazer o vocal se destacar no mix sem perder a pegada do beat...',
      author: {
        id: 's5',
        name: 'Carlos Drummer',
        avatar: '/images/students/carlos.jpg',
        level: 'Intermediário',
        location: 'Salvador, BA'
      },
      category: 'Produção Musical',
      replies: 23,
      lastActivity: '2 horas atrás',
      tags: ['vocal', 'trap', 'mixagem']
    },
    {
      id: '2',
      title: 'Como lidar com o nervosismo no palco?',
      excerpt: 'Mesmo após as aulas de presença de palco, ainda fico nervoso em apresentações. Alguém tem dicas práticas?',
      author: {
        id: 's6',
        name: 'Juliana Vocal',
        avatar: '/images/students/juliana.jpg',
        level: 'Iniciante',
        location: 'Recife, PE'
      },
      category: 'Performance',
      replies: 18,
      lastActivity: '4 horas atrás',
      tags: ['nervosismo', 'palco', 'performance']
    },
    {
      id: '3',
      title: 'Equipamentos para home studio iniciante',
      excerpt: 'Montando meu primeiro home studio com orçamento limitado. Quais equipamentos vocês recomendam?',
      author: {
        id: 's7',
        name: 'Roberto Mix',
        avatar: '/images/students/roberto.jpg',
        level: 'Iniciante',
        location: 'Curitiba, PR'
      },
      category: 'Equipamentos',
      replies: 31,
      lastActivity: '6 horas atrás',
      tags: ['home-studio', 'equipamentos', 'orçamento']
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({ project, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors z-10"
          >
            ✕
          </button>
          
          <div className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <Image
                src={project.student.avatar}
                alt={project.student.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="font-medium">{project.student.name}</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">{project.student.level}</span>
                  <span className="text-sm">•</span>
                  <span className="text-sm">{project.student.location}</span>
                </div>
                <p className="text-primary-400 text-sm mt-1">{project.course}</p>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{project.description}</p>

            <div className="space-y-4 mb-6">
              {project.files.map((file, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  {file.type === 'image' && (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={file.url}
                        alt={`${project.title} - Imagem ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  {file.type === 'audio' && (
                    <div className="flex items-center gap-4">
                      {file.thumbnail && (
                        <Image
                          src={file.thumbnail}
                          alt="Audio thumbnail"
                          width={80}
                          height={80}
                          className="rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="text-white font-medium mb-2">🎵 Audio Track</p>
                        <audio controls className="w-full">
                          <source src={file.url} type="audio/mpeg" />
                          Seu navegador não suporta o elemento de áudio.
                        </audio>
                      </div>
                    </div>
                  )}
                  {file.type === 'video' && (
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                      <video controls className="w-full h-full">
                        <source src={file.url} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-700 pt-4">
              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors">
                  <span>❤️</span>
                  <span>{project.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                  <span>💬</span>
                  <span>{project.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-300 hover:text-green-400 transition-colors">
                  <span>🔗</span>
                  <span>Compartilhar</span>
                </button>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(project.createdAt).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="py-16 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Comunidade <span className="text-primary-400">Criativa</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Conheça os projetos incríveis dos nossos alunos e participe de discussões que vão acelerar seu aprendizado.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'projects'
                  ? 'bg-primary-500 text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              🎨 Projetos dos Alunos
            </button>
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'discussions'
                  ? 'bg-primary-500 text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              💬 Discussões
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'projects' ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Project Categories */}
              <div className="flex flex-wrap justify-center gap-4">
                {projectCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${
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

              {/* Projects Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative h-48">
                      <Image
                        src={project.files[0]?.thumbnail || '/images/default-project.jpg'}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      {project.featured && (
                        <div className="absolute top-3 left-3 bg-primary-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                          Destaque
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded-full text-white text-xs">
                        {project.files.length} arquivo{project.files.length > 1 ? 's' : ''}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={project.student.avatar}
                          alt={project.student.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-white text-sm font-medium">{project.student.name}</p>
                          <p className="text-gray-400 text-xs">{project.student.level}</p>
                        </div>
                      </div>

                      <h3 className="text-white font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <span>❤️</span>
                            <span>{project.likes}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>💬</span>
                            <span>{project.comments}</span>
                          </span>
                        </div>
                        <span className="text-primary-400 text-xs">
                          {new Date(project.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="discussions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {discussions.map((discussion, index) => (
                <motion.div
                  key={discussion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={discussion.author.avatar}
                      alt={discussion.author.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-white font-bold">{discussion.title}</h3>
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                          {discussion.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-300 mb-3">{discussion.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{discussion.author.name}</span>
                          <span>•</span>
                          <span>{discussion.author.location}</span>
                          <span>•</span>
                          <span>{discussion.replies} respostas</span>
                        </div>
                        <span className="text-gray-400 text-sm">{discussion.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="text-center mt-8">
                <button className="bg-primary-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-primary-400 transition-colors">
                  Ver Todas as Discussões
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CommunityHighlights;