'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface UserSkills {
  production: number; // 0-100
  performance: number;
  mixing: number;
  composition: number;
  marketing: number;
  business: number;
}

interface CompletedCourse {
  id: string;
  title: string;
  category: string;
  completedAt: string;
  certificate: boolean;
  grade: number;
}

interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: 'job' | 'collaboration' | 'gig' | 'contest' | 'partnership';
  description: string;
  requirements: string[];
  skills: string[];
  location: string;
  remote: boolean;
  salary?: string;
  deadline?: string;
  matchPercentage: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'production' | 'performance' | 'business' | 'technical';
  image: string;
  badge?: string;
  urgent?: boolean;
  featured?: boolean;
  ecosystem: 'gravadora' | 'bookings' | 'distribuicao' | 'marketing' | 'producao' | 'externa';
}

interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  level: number;
  completedCourses: CompletedCourse[];
  skills: UserSkills;
  interests: string[];
  location: string;
  portfolio: string[];
  availability: 'full-time' | 'part-time' | 'freelance' | 'not-available';
}

interface OpportunityMatcherProps {
  userProfile: UserProfile;
  onApply?: (opportunityId: string) => void;
  onSaveOpportunity?: (opportunityId: string) => void;
}

const OpportunityMatcher: React.FC<OpportunityMatcherProps> = ({
  userProfile,
  onApply,
  onSaveOpportunity
}) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Opportunity[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock opportunities based on Valhalla Hub ecosystem
  const mockOpportunities: Opportunity[] = [
    {
      id: '1',
      title: 'Produtor Musical para Álbum de Trap',
      company: 'Valhalla Records',
      type: 'job',
      description: 'Buscamos um produtor experiente em trap nacional para trabalhar em um álbum de um artista emergente. Oportunidade de fazer parte do casting da nossa gravadora.',
      requirements: [
        'Portfólio com pelo menos 5 produções de trap',
        'Conhecimento avançado em Logic Pro ou Ableton',
        'Curso de Produção Musical completado',
        'Disponibilidade para trabalhar presencialmente em SP'
      ],
      skills: ['production', 'mixing', 'beats'],
      location: 'São Paulo, SP',
      remote: false,
      salary: 'R$ 8.000 - R$ 15.000',
      deadline: '2024-02-15',
      matchPercentage: 92,
      difficulty: 'advanced',
      category: 'production',
      image: '/images/opportunities/valhalla-records.jpg',
      badge: 'Valhalla Exclusive',
      featured: true,
      ecosystem: 'gravadora'
    },
    {
      id: '2',
      title: 'Vocalista para Tour Nacional',
      company: 'Valhalla Bookings',
      type: 'gig',
      description: 'Tour de 20 cidades com artista consolidado no cenário sertanejo. Procuramos backing vocal com experiência em apresentações ao vivo.',
      requirements: [
        'Experiência comprovada em shows ao vivo',
        'Repertório sertanejo',
        'MasterClass de Performance completada',
        'Disponibilidade para viagens'
      ],
      skills: ['performance', 'vocal', 'stage-presence'],
      location: 'Tour Nacional',
      remote: false,
      salary: 'R$ 3.000/show',
      deadline: '2024-01-30',
      matchPercentage: 78,
      difficulty: 'intermediate',
      category: 'performance',
      image: '/images/opportunities/tour-nacional.jpg',
      urgent: true,
      ecosystem: 'bookings'
    },
    {
      id: '3',
      title: 'Marketing Digital para Artistas',
      company: 'Valhalla Marketing',
      type: 'collaboration',
      description: 'Oportunidade de freelance para gerenciar redes sociais e campanhas digitais de artistas emergentes do nosso casting.',
      requirements: [
        'Curso de Marketing Musical completado',
        'Portfolio com cases de sucesso',
        'Conhecimento em Meta Ads e TikTok',
        'Experiência com artistas musicais'
      ],
      skills: ['marketing', 'social-media', 'strategy'],
      location: 'São Paulo, SP',
      remote: true,
      salary: 'R$ 2.500 - R$ 5.000/mês',
      matchPercentage: 85,
      difficulty: 'intermediate',
      category: 'business',
      image: '/images/opportunities/marketing-digital.jpg',
      ecosystem: 'marketing'
    },
    {
      id: '4',
      title: 'Mixagem de EP Indie Rock',
      company: 'Estúdio Independente',
      type: 'collaboration',
      description: 'Banda independente busca engenheiro de mixagem para EP de 6 faixas. Projeto com orçamento definido e cronograma flexível.',
      requirements: [
        'Curso de Mixagem & Mastering completado',
        'Portfolio com trabalhos em rock/indie',
        'Setup profissional de home studio',
        'Prazo de entrega: 30 dias'
      ],
      skills: ['mixing', 'mastering', 'rock'],
      location: 'Remoto',
      remote: true,
      salary: 'R$ 3.500 (projeto)',
      matchPercentage: 67,
      difficulty: 'intermediate',
      category: 'technical',
      image: '/images/opportunities/mixagem-indie.jpg',
      ecosystem: 'externa'
    },
    {
      id: '5',
      title: 'DJ Residente - Valhalla Club',
      company: 'Valhalla Entertainment',
      type: 'job',
      description: 'Vaga para DJ residente em nova casa noturna do grupo Valhalla. Foco em música eletrônica e crossover com música brasileira.',
      requirements: [
        'Curso de DJ Profissional completado',
        'Experiência mínima de 2 anos em casas noturnas',
        'Repertório diversificado',
        'Equipamentos próprios (controladora/mixer)'
      ],
      skills: ['djing', 'electronic', 'crowd-reading'],
      location: 'São Paulo, SP',
      remote: false,
      salary: 'R$ 4.500/mês + % da bilheteria',
      matchPercentage: 71,
      difficulty: 'intermediate',
      category: 'performance',
      image: '/images/opportunities/dj-residente.jpg',
      ecosystem: 'bookings'
    },
    {
      id: '6',
      title: 'Concurso de Composição - Tema: Brasil',
      company: 'Valhalla Music Contest',
      type: 'contest',
      description: 'Concurso nacional de composição com tema livre sobre a cultura brasileira. Prêmios em dinheiro e contrato de distribuição.',
      requirements: [
        'Composição original inédita',
        'Duração entre 3-5 minutos',
        'Temática brasileira',
        'Inscrição até 28/02/2024'
      ],
      skills: ['composition', 'creativity', 'brazilian-music'],
      location: 'Nacional',
      remote: true,
      salary: '1º lugar: R$ 10.000 + contrato',
      deadline: '2024-02-28',
      matchPercentage: 56,
      difficulty: 'beginner',
      category: 'composition',
      image: '/images/opportunities/concurso-composicao.jpg',
      badge: 'Concurso Nacional',
      ecosystem: 'gravadora'
    }
  ];

  useEffect(() => {
    // Simulate loading and opportunity matching
    setLoading(true);
    setTimeout(() => {
      const matched = mockOpportunities.map(opp => ({
        ...opp,
        matchPercentage: calculateMatchPercentage(opp, userProfile)
      })).sort((a, b) => b.matchPercentage - a.matchPercentage);
      
      setOpportunities(matched);
      setFilteredOpportunities(matched);
      setLoading(false);
    }, 1500);
  }, [userProfile]);

  const calculateMatchPercentage = (opportunity: Opportunity, profile: UserProfile): number => {
    let score = 0;
    let maxScore = 0;

    // Skills match (40% weight)
    const skillMapping: { [key: string]: keyof UserSkills } = {
      'production': 'production',
      'performance': 'performance',
      'mixing': 'mixing',
      'composition': 'composition',
      'marketing': 'marketing',
      'business': 'business'
    };

    opportunity.skills.forEach(skill => {
      maxScore += 40;
      if (skillMapping[skill]) {
        score += (profile.skills[skillMapping[skill]] / 100) * 40;
      }
    });

    // Course completion match (30% weight)
    const relevantCourses = profile.completedCourses.filter(course => 
      opportunity.requirements.some(req => 
        course.title.toLowerCase().includes(req.toLowerCase().split(' ')[0]) ||
        req.toLowerCase().includes(course.category.toLowerCase())
      )
    );
    maxScore += 30;
    score += (relevantCourses.length / Math.max(opportunity.requirements.length, 1)) * 30;

    // Level match (20% weight)
    const levelMapping = { 'beginner': 3, 'intermediate': 6, 'advanced': 9 };
    maxScore += 20;
    if (profile.level >= levelMapping[opportunity.difficulty]) {
      score += 20;
    } else {
      score += (profile.level / levelMapping[opportunity.difficulty]) * 20;
    }

    // Location preference (10% weight)
    maxScore += 10;
    if (opportunity.remote || opportunity.location.includes(profile.location)) {
      score += 10;
    }

    return Math.min(Math.round((score / maxScore) * 100), 100);
  };

  const filterOpportunities = (filter: string) => {
    setActiveFilter(filter);
    if (filter === 'all') {
      setFilteredOpportunities(opportunities);
    } else if (filter === 'ecosystem') {
      setFilteredOpportunities(opportunities.filter(opp => opp.ecosystem !== 'externa'));
    } else if (filter === 'high-match') {
      setFilteredOpportunities(opportunities.filter(opp => opp.matchPercentage >= 70));
    } else {
      setFilteredOpportunities(opportunities.filter(opp => opp.type === filter));
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400 bg-green-400/10';
    if (percentage >= 60) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const getEcosystemBadge = (ecosystem: string) => {
    const badges = {
      'gravadora': { text: 'Valhalla Records', color: 'bg-purple-500' },
      'bookings': { text: 'Valhalla Bookings', color: 'bg-blue-500' },
      'distribuicao': { text: 'Valhalla Distribution', color: 'bg-green-500' },
      'marketing': { text: 'Valhalla Marketing', color: 'bg-orange-500' },
      'producao': { text: 'Valhalla Studios', color: 'bg-red-500' },
      'externa': { text: 'Parceiro Externo', color: 'bg-gray-500' }
    };
    return badges[ecosystem] || badges['externa'];
  };

  const OpportunityCard: React.FC<{ opportunity: Opportunity; index: number }> = ({ opportunity, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedOpportunity(opportunity)}
    >
      <div className="relative h-48">
        <Image
          src={opportunity.image}
          alt={opportunity.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {opportunity.featured && (
              <span className="px-2 py-1 bg-primary-500 text-black rounded-full text-xs font-bold">
                ⭐ Destaque
              </span>
            )}
            {opportunity.urgent && (
              <span className="px-2 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                🚨 Urgente
              </span>
            )}
            <span className={`px-2 py-1 ${getEcosystemBadge(opportunity.ecosystem).color} text-white rounded-full text-xs font-bold`}>
              {getEcosystemBadge(opportunity.ecosystem).text}
            </span>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-bold ${getMatchColor(opportunity.matchPercentage)}`}>
            {opportunity.matchPercentage}% match
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg mb-1">{opportunity.title}</h3>
          <p className="text-gray-300 text-sm">{opportunity.company}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
            {opportunity.type === 'job' ? '💼 Vaga' :
             opportunity.type === 'gig' ? '🎤 Show' :
             opportunity.type === 'collaboration' ? '🤝 Colaboração' :
             opportunity.type === 'contest' ? '🏆 Concurso' : '🔗 Parceria'}
          </span>
          <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
            {opportunity.difficulty}
          </span>
          {!opportunity.remote && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
              📍 {opportunity.location}
            </span>
          )}
          {opportunity.remote && (
            <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs">
              🌐 Remoto
            </span>
          )}
        </div>

        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{opportunity.description}</p>

        <div className="flex items-center justify-between">
          <div>
            {opportunity.salary && (
              <p className="text-primary-400 font-bold">{opportunity.salary}</p>
            )}
            {opportunity.deadline && (
              <p className="text-gray-400 text-xs">Prazo: {new Date(opportunity.deadline).toLocaleDateString('pt-BR')}</p>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSaveOpportunity?.(opportunity.id);
            }}
            className="text-gray-400 hover:text-primary-400 transition-colors"
          >
            🔖
          </button>
        </div>
      </div>
    </motion.div>
  );

  const OpportunityModal: React.FC<{ opportunity: Opportunity; onClose: () => void }> = ({ opportunity, onClose }) => (
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
        <div className="relative h-64">
          <Image
            src={opportunity.image}
            alt={opportunity.title}
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
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 ${getEcosystemBadge(opportunity.ecosystem).color} text-white rounded-full text-sm font-bold`}>
                {getEcosystemBadge(opportunity.ecosystem).text}
              </span>
              <div className={`px-4 py-2 rounded-full font-bold ${getMatchColor(opportunity.matchPercentage)}`}>
                {opportunity.matchPercentage}% Compatibilidade
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{opportunity.title}</h2>
            <p className="text-xl text-primary-400">{opportunity.company}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <section>
                <h3 className="text-xl font-bold text-white mb-4">Descrição</h3>
                <p className="text-gray-300 leading-relaxed">{opportunity.description}</p>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Requisitos</h3>
                <ul className="space-y-2">
                  {opportunity.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-white mb-4">Habilidades Necessárias</h3>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skills.map(skill => (
                    <span key={skill} className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4">Detalhes</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tipo:</span>
                    <span className="text-white">
                      {opportunity.type === 'job' ? 'Vaga' :
                       opportunity.type === 'gig' ? 'Show' :
                       opportunity.type === 'collaboration' ? 'Colaboração' :
                       opportunity.type === 'contest' ? 'Concurso' : 'Parceria'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Nível:</span>
                    <span className="text-white capitalize">{opportunity.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Local:</span>
                    <span className="text-white">{opportunity.remote ? 'Remoto' : opportunity.location}</span>
                  </div>
                  {opportunity.salary && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Valor:</span>
                      <span className="text-primary-400 font-bold">{opportunity.salary}</span>
                    </div>
                  )}
                  {opportunity.deadline && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Prazo:</span>
                      <span className="text-white">{new Date(opportunity.deadline).toLocaleDateString('pt-BR')}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onApply?.(opportunity.id)}
                  className="w-full bg-primary-500 text-black font-bold py-3 rounded-lg hover:bg-primary-400 transition-colors"
                >
                  Candidatar-se
                </button>
                <button
                  onClick={() => onSaveOpportunity?.(opportunity.id)}
                  className="w-full border border-gray-600 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Salvar para Depois
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-4">
                <h5 className="text-white font-semibold mb-3">Por que é um bom match?</h5>
                <div className="space-y-2 text-sm text-gray-300">
                  {opportunity.matchPercentage >= 80 && (
                    <p>✅ Suas habilidades se alinham perfeitamente</p>
                  )}
                  {userProfile.completedCourses.some(course => 
                    opportunity.requirements.some(req => req.toLowerCase().includes(course.category.toLowerCase()))
                  ) && (
                    <p>✅ Você tem os cursos necessários</p>
                  )}
                  {opportunity.ecosystem !== 'externa' && (
                    <p>✅ Oportunidade exclusiva do ecossistema Valhalla</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Analisando suas habilidades e encontrando oportunidades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Oportunidades <span className="text-primary-400">Personalizadas</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Baseado no seu perfil e cursos concluídos, encontramos estas oportunidades especiais para você.
          </p>
        </div>

        {/* User Stats */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-400">{userProfile.completedCourses.length}</div>
              <div className="text-gray-400 text-sm">Cursos Concluídos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">Nv. {userProfile.level}</div>
              <div className="text-gray-400 text-sm">Nível Atual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{opportunities.filter(o => o.matchPercentage >= 70).length}</div>
              <div className="text-gray-400 text-sm">Matches Altos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{opportunities.filter(o => o.ecosystem !== 'externa').length}</div>
              <div className="text-gray-400 text-sm">Valhalla Exclusivas</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'all', name: 'Todas', icon: '🎯' },
            { id: 'high-match', name: 'Alta Compatibilidade', icon: '⭐' },
            { id: 'ecosystem', name: 'Valhalla Exclusivas', icon: '🏢' },
            { id: 'job', name: 'Vagas', icon: '💼' },
            { id: 'gig', name: 'Shows', icon: '🎤' },
            { id: 'collaboration', name: 'Colaborações', icon: '🤝' },
            { id: 'contest', name: 'Concursos', icon: '🏆' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => filterOpportunities(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary-500 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span>{filter.icon}</span>
              <span>{filter.name}</span>
            </button>
          ))}
        </div>

        {/* Opportunities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opportunity, index) => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} index={index} />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">Nenhuma oportunidade encontrada</h3>
            <p className="text-gray-400">Tente ajustar os filtros ou complete mais cursos para desbloquear novas oportunidades.</p>
          </div>
        )}

        {/* Opportunity Modal */}
        <AnimatePresence>
          {selectedOpportunity && (
            <OpportunityModal 
              opportunity={selectedOpportunity} 
              onClose={() => setSelectedOpportunity(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OpportunityMatcher;