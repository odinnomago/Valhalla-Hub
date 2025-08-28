'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ProfessionalCard from './ProfessionalCard';

interface Professional {
  id: string;
  name: string;
  title: string;
  description: string;
  avatar: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  location: string;
  basePrice: number;
  availability: 'available' | 'busy' | 'unavailable';
  verified: boolean;
  responseTime: string;
  completedProjects: number;
  specialties: string[];
  genres: string[];
  portfolio: {
    id: string;
    title: string;
    image: string;
    type: 'audio' | 'video' | 'image';
  }[];
  services: {
    name: string;
    price: number;
    duration: string;
  }[];
  badges: string[];
  tier: 'new' | 'rising' | 'pro' | 'elite';
}

const ProfessionalsList: React.FC = () => {
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'price' | 'reviews'>('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  // Mock data - in real implementation, this would come from API
  const professionals: Professional[] = [
    {
      id: '1',
      name: 'Marina Santos',
      title: 'Vocalista e Compositora',
      description: 'Especialista em Pop e R&B, com mais de 10 anos de experiência em estúdio e palco. Trabalhou com artistas renomados e possui técnica vocal refinada.',
      avatar: '/images/professionals/marina.jpg',
      coverImage: '/images/professionals/marina-cover.jpg',
      rating: 4.9,
      reviewCount: 127,
      location: 'São Paulo, SP',
      basePrice: 800,
      availability: 'available',
      verified: true,
      responseTime: '1 hora',
      completedProjects: 156,
      specialties: ['Lead Vocal', 'Backing Vocals', 'Composição', 'Harmonia'],
      genres: ['Pop', 'R&B', 'Soul', 'Jazz'],
      portfolio: [
        { id: '1', title: 'Demo Pop 2024', image: '/images/portfolio/demo1.jpg', type: 'audio' },
        { id: '2', title: 'Show Acústico', image: '/images/portfolio/show1.jpg', type: 'video' },
        { id: '3', title: 'Sessão Studio', image: '/images/portfolio/studio1.jpg', type: 'image' }
      ],
      services: [
        { name: 'Gravação Lead Vocal', price: 800, duration: '2-3 horas' },
        { name: 'Backing Vocals', price: 500, duration: '1-2 horas' },
        { name: 'Composição + Vocal', price: 1500, duration: '1 dia' }
      ],
      badges: ['Top Rated', 'Quick Response'],
      tier: 'elite'
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      title: 'Produtor Musical e Beatmaker',
      description: 'Especializado em Hip Hop, Trap e R&B. Produziu beats para vários artistas independentes e possui estúdio próprio equipado.',
      avatar: '/images/professionals/carlos.jpg',
      coverImage: '/images/professionals/carlos-cover.jpg',
      rating: 4.8,
      reviewCount: 89,
      location: 'Rio de Janeiro, RJ',
      basePrice: 600,
      availability: 'available',
      verified: true,
      responseTime: '30 min',
      completedProjects: 234,
      specialties: ['Beatmaking', 'Mixagem', 'Produção', 'Arranjos'],
      genres: ['Hip Hop', 'Trap', 'R&B', 'Lo-fi'],
      portfolio: [
        { id: '1', title: 'Beat Pack Trap', image: '/images/portfolio/beats1.jpg', type: 'audio' },
        { id: '2', title: 'Studio Session', image: '/images/portfolio/studio2.jpg', type: 'video' },
        { id: '3', title: 'Mixing Board', image: '/images/portfolio/mix1.jpg', type: 'image' }
      ],
      services: [
        { name: 'Beat Personalizado', price: 600, duration: '2-3 dias' },
        { name: 'Mixagem', price: 400, duration: '1-2 dias' },
        { name: 'Produção Completa', price: 1200, duration: '1 semana' }
      ],
      badges: ['Fast Delivery', 'Studio Owner'],
      tier: 'pro'
    },
    {
      id: '3',
      name: 'Ana Silva',
      title: 'Guitarrista Session',
      description: 'Guitarrista versátil com formação clássica e experiência em diversos gêneros. Especialista em gravações de estúdio e performances ao vivo.',
      avatar: '/images/professionals/ana.jpg',
      coverImage: '/images/professionals/ana-cover.jpg',
      rating: 4.7,
      reviewCount: 203,
      location: 'Belo Horizonte, MG',
      basePrice: 500,
      availability: 'busy',
      verified: true,
      responseTime: '2 horas',
      completedProjects: 198,
      specialties: ['Guitarra Elétrica', 'Acústica', 'Solo', 'Base'],
      genres: ['Rock', 'Blues', 'Jazz', 'Pop', 'Country'],
      portfolio: [
        { id: '1', title: 'Solo Performance', image: '/images/portfolio/guitar1.jpg', type: 'video' },
        { id: '2', title: 'Studio Recording', image: '/images/portfolio/recording1.jpg', type: 'image' },
        { id: '3', title: 'Live Show', image: '/images/portfolio/live1.jpg', type: 'image' }
      ],
      services: [
        { name: 'Gravação Guitarra', price: 500, duration: '2 horas' },
        { name: 'Arranjo Guitarra', price: 300, duration: '1 dia' },
        { name: 'Acompanhamento Live', price: 800, duration: 'Por show' }
      ],
      badges: ['Session Pro', 'Multi-Genre'],
      tier: 'pro'
    },
    {
      id: '4',
      name: 'DJ Pedro Lima',
      title: 'DJ e Produtor Eletrônico',
      description: 'DJ especializado em música eletrônica e eventos corporativos. Equipamentos próprios e vasta experiência em festas e casamentos.',
      avatar: '/images/professionals/pedro.jpg',
      coverImage: '/images/professionals/pedro-cover.jpg',
      rating: 4.6,
      reviewCount: 156,
      location: 'São Paulo, SP',
      basePrice: 1200,
      availability: 'available',
      verified: true,
      responseTime: '1 hora',
      completedProjects: 89,
      specialties: ['DJ Sets', 'Produção', 'Remixes', 'Sound Design'],
      genres: ['House', 'Techno', 'Progressive', 'Deep House'],
      portfolio: [
        { id: '1', title: 'Wedding Set', image: '/images/portfolio/dj1.jpg', type: 'video' },
        { id: '2', title: 'Club Night', image: '/images/portfolio/club1.jpg', type: 'image' },
        { id: '3', title: 'Original Track', image: '/images/portfolio/track1.jpg', type: 'audio' }
      ],
      services: [
        { name: 'DJ para Eventos', price: 1200, duration: 'Por evento' },
        { name: 'Remix', price: 800, duration: '3-5 dias' },
        { name: 'Mix Personalizado', price: 400, duration: '1-2 dias' }
      ],
      badges: ['Event Specialist', 'Own Equipment'],
      tier: 'rising'
    },
    {
      id: '5',
      name: 'Lucas Moura',
      title: 'Técnico de Som',
      description: 'Técnico de som experiente com especialização em shows ao vivo e gravações. Trabalha com equipamentos de ponta e tem vasta experiência.',
      avatar: '/images/professionals/lucas.jpg',
      coverImage: '/images/professionals/lucas-cover.jpg',
      rating: 4.8,
      reviewCount: 74,
      location: 'Porto Alegre, RS',
      basePrice: 400,
      availability: 'available',
      verified: true,
      responseTime: '45 min',
      completedProjects: 112,
      specialties: ['PA System', 'Monitores', 'Gravação', 'Setup'],
      genres: ['Todos os gêneros'],
      portfolio: [
        { id: '1', title: 'Concert Setup', image: '/images/portfolio/sound1.jpg', type: 'image' },
        { id: '2', title: 'Studio Work', image: '/images/portfolio/tech1.jpg', type: 'video' },
        { id: '3', title: 'Live Mixing', image: '/images/portfolio/live2.jpg', type: 'image' }
      ],
      services: [
        { name: 'Sonorização Evento', price: 800, duration: 'Por evento' },
        { name: 'Setup Estúdio', price: 400, duration: '2-4 horas' },
        { name: 'Consultoria Técnica', price: 200, duration: '1 hora' }
      ],
      badges: ['Technical Expert', 'Reliable'],
      tier: 'pro'
    }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Relevância' },
    { value: 'rating', label: 'Melhor Avaliação' },
    { value: 'price', label: 'Menor Preço' },
    { value: 'reviews', label: 'Mais Avaliações' }
  ];

  const sortedProfessionals = [...professionals].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'price':
        return a.basePrice - b.basePrice;
      case 'reviews':
        return b.reviewCount - a.reviewCount;
      default:
        return 0; // relevance - would be based on search algorithm
    }
  });

  return (
    <div>
      {/* Header with sorting and view options */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Profissionais Disponíveis
          </h2>
          <p className="text-muted-foreground">
            {professionals.length} profissionais encontrados
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-card border border-border text-foreground rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {/* View Mode Toggle */}
          <div className="flex bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-sm ${
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ⊞ Grade
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm ${
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              ☰ Lista
            </button>
          </div>
        </div>
      </div>

      {/* Professionals Grid/List */}
      <div className={
        viewMode === 'grid'
          ? 'grid md:grid-cols-2 gap-6'
          : 'space-y-6'
      }>
        {sortedProfessionals.map((professional, index) => (
          <motion.div
            key={professional.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ProfessionalCard
              professional={professional}
              viewMode={viewMode}
              onClick={() => router.push(`/bookings/professional/${professional.id}`)}
            />
          </motion.div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="bg-card border border-border text-foreground px-8 py-3 rounded-xl hover:bg-card/80 hover:border-border/70 transition-colors">
          Carregar Mais Profissionais
        </button>
      </div>


    </div>
  );
};

export default ProfessionalsList;