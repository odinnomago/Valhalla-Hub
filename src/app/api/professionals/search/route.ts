import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Search parameters validation schema
const searchParamsSchema = z.object({
  q: z.string().optional(), // Search query
  category: z.enum(['musicians', 'technicians', 'producers', 'djs', 'creatives', 'events']).optional(),
  genres: z.string().optional(), // Comma-separated genres
  location: z.string().optional(),
  minPrice: z.string().transform(Number).optional(),
  maxPrice: z.string().transform(Number).optional(),
  availability: z.enum(['today', 'week', 'month', 'flexible']).optional(),
  rating: z.string().transform(Number).optional(),
  experience: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  verified: z.string().transform(Boolean).optional(),
  sortBy: z.enum(['relevance', 'rating', 'price', 'reviews']).optional(),
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
});

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
  joinDate: string;
  lastSeen: string;
  specialties: string[];
  genres: string[];
  languages: string[];
  equipment: string[];
  category: string;
  tier: 'new' | 'rising' | 'pro' | 'elite';
  badges: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

// Mock professionals database
const mockProfessionals: Professional[] = [
  {
    id: '1',
    name: 'Marina Santos',
    title: 'Vocalista e Compositora',
    description: 'Especialista em Pop e R&B, com mais de 10 anos de experiência em estúdio e palco.',
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
    joinDate: '2022-01-15',
    lastSeen: '1 hora atrás',
    specialties: ['Lead Vocal', 'Backing Vocals', 'Composição', 'Harmonia'],
    genres: ['Pop', 'R&B', 'Soul', 'Jazz'],
    languages: ['Português', 'Inglês', 'Espanhol'],
    equipment: ['Microfone Neumann U87', 'Interface Focusrite', 'Pro Tools'],
    category: 'musicians',
    tier: 'elite',
    badges: ['Top Rated', 'Quick Response'],
    experienceLevel: 'expert'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    title: 'Produtor Musical e Beatmaker',
    description: 'Especializado em Hip Hop, Trap e R&B. Produziu beats para vários artistas independentes.',
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
    joinDate: '2021-08-20',
    lastSeen: '30 min atrás',
    specialties: ['Beatmaking', 'Mixagem', 'Produção', 'Arranjos'],
    genres: ['Hip Hop', 'Trap', 'R&B', 'Lo-fi'],
    languages: ['Português', 'Inglês'],
    equipment: ['Ableton Live', 'Native Instruments', 'Studio Monitors'],
    category: 'producers',
    tier: 'pro',
    badges: ['Fast Delivery', 'Studio Owner'],
    experienceLevel: 'advanced'
  },
  {
    id: '3',
    name: 'Ana Silva',
    title: 'Guitarrista Session',
    description: 'Guitarrista versátil com formação clássica e experiência em diversos gêneros.',
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
    joinDate: '2020-03-10',
    lastSeen: '2 horas atrás',
    specialties: ['Guitarra Elétrica', 'Acústica', 'Solo', 'Base'],
    genres: ['Rock', 'Blues', 'Jazz', 'Pop', 'Country'],
    languages: ['Português'],
    equipment: ['Fender Stratocaster', 'Marshall Amp', 'Logic Pro'],
    category: 'musicians',
    tier: 'pro',
    badges: ['Session Pro', 'Multi-Genre'],
    experienceLevel: 'expert'
  },
  {
    id: '4',
    name: 'DJ Pedro Lima',
    title: 'DJ e Produtor Eletrônico',
    description: 'DJ especializado em música eletrônica e eventos corporativos.',
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
    joinDate: '2023-01-05',
    lastSeen: '1 hora atrás',
    specialties: ['DJ Sets', 'Produção', 'Remixes', 'Sound Design'],
    genres: ['House', 'Techno', 'Progressive', 'Deep House'],
    languages: ['Português', 'Inglês'],
    equipment: ['Pioneer CDJ', 'Serato DJ', 'Own Sound System'],
    category: 'djs',
    tier: 'rising',
    badges: ['Event Specialist', 'Own Equipment'],
    experienceLevel: 'advanced'
  },
  {
    id: '5',
    name: 'Lucas Moura',
    title: 'Técnico de Som',
    description: 'Técnico de som experiente com especialização em shows ao vivo.',
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
    joinDate: '2021-11-12',
    lastSeen: '45 min atrás',
    specialties: ['PA System', 'Monitores', 'Gravação', 'Setup'],
    genres: ['Todos os gêneros'],
    languages: ['Português'],
    equipment: ['Behringer X32', 'Shure Microphones', 'QSC Speakers'],
    category: 'technicians',
    tier: 'pro',
    badges: ['Technical Expert', 'Reliable'],
    experienceLevel: 'expert'
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Convert URLSearchParams to object for validation
    const params = Object.fromEntries(searchParams.entries());
    
    // Validate search parameters
    const validationResult = searchParamsSchema.safeParse(params);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid search parameters',
          details: validationResult.error.errors 
        },
        { status: 400 }
      );
    }

    const {
      q,
      category,
      genres,
      location,
      minPrice,
      maxPrice,
      availability,
      rating,
      experience,
      verified,
      sortBy = 'relevance',
      page = 1,
      limit = 20
    } = validationResult.data;

    // Start with all professionals
    let filteredProfessionals = [...mockProfessionals];

    // Apply filters
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredProfessionals = filteredProfessionals.filter(prof =>
        prof.name.toLowerCase().includes(searchTerm) ||
        prof.title.toLowerCase().includes(searchTerm) ||
        prof.description.toLowerCase().includes(searchTerm) ||
        prof.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm)) ||
        prof.genres.some(genre => genre.toLowerCase().includes(searchTerm))
      );
    }

    if (category) {
      filteredProfessionals = filteredProfessionals.filter(prof => prof.category === category);
    }

    if (genres) {
      const genreList = genres.split(',').map(g => g.trim().toLowerCase());
      filteredProfessionals = filteredProfessionals.filter(prof =>
        prof.genres.some(genre => genreList.includes(genre.toLowerCase()))
      );
    }

    if (location) {
      filteredProfessionals = filteredProfessionals.filter(prof =>
        prof.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filteredProfessionals = filteredProfessionals.filter(prof => {
        if (minPrice !== undefined && prof.basePrice < minPrice) return false;
        if (maxPrice !== undefined && prof.basePrice > maxPrice) return false;
        return true;
      });
    }

    if (availability) {
      // In a real implementation, this would check actual availability
      // For now, we'll filter based on the availability status
      if (availability !== 'flexible') {
        filteredProfessionals = filteredProfessionals.filter(prof => prof.availability === 'available');
      }
    }

    if (rating !== undefined) {
      filteredProfessionals = filteredProfessionals.filter(prof => prof.rating >= rating);
    }

    if (experience) {
      filteredProfessionals = filteredProfessionals.filter(prof => prof.experienceLevel === experience);
    }

    if (verified !== undefined) {
      filteredProfessionals = filteredProfessionals.filter(prof => prof.verified === verified);
    }

    // Apply sorting
    filteredProfessionals.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.basePrice - b.basePrice;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'relevance':
        default:
          // For relevance, we could implement a more sophisticated scoring algorithm
          // For now, we'll sort by a combination of rating and review count
          const scoreA = a.rating * Math.log(a.reviewCount + 1);
          const scoreB = b.rating * Math.log(b.reviewCount + 1);
          return scoreB - scoreA;
      }
    });

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = filteredProfessionals.slice(startIndex, endIndex);

    // Calculate facets for refined search
    const facets = calculateFacets(filteredProfessionals);

    return NextResponse.json({
      success: true,
      professionals: paginatedResults,
      pagination: {
        page,
        limit,
        total: filteredProfessionals.length,
        totalPages: Math.ceil(filteredProfessionals.length / limit),
        hasNext: endIndex < filteredProfessionals.length,
        hasPrev: page > 1
      },
      facets,
      searchInfo: {
        query: q,
        filters: {
          category,
          genres,
          location,
          priceRange: { min: minPrice, max: maxPrice },
          availability,
          rating,
          experience,
          verified
        }
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

function calculateFacets(professionals: Professional[]) {
  const facets = {
    categories: {} as Record<string, number>,
    genres: {} as Record<string, number>,
    locations: {} as Record<string, number>,
    priceRanges: {
      '0-500': 0,
      '500-1000': 0,
      '1000-1500': 0,
      '1500+': 0
    },
    ratings: {
      '5': 0,
      '4+': 0,
      '3+': 0,
      '2+': 0
    },
    tiers: {} as Record<string, number>
  };

  professionals.forEach(prof => {
    // Categories
    facets.categories[prof.category] = (facets.categories[prof.category] || 0) + 1;

    // Genres
    prof.genres.forEach(genre => {
      facets.genres[genre] = (facets.genres[genre] || 0) + 1;
    });

    // Locations (city)
    const city = prof.location.split(',')[0];
    facets.locations[city] = (facets.locations[city] || 0) + 1;

    // Price ranges
    if (prof.basePrice < 500) {
      facets.priceRanges['0-500']++;
    } else if (prof.basePrice < 1000) {
      facets.priceRanges['500-1000']++;
    } else if (prof.basePrice < 1500) {
      facets.priceRanges['1000-1500']++;
    } else {
      facets.priceRanges['1500+']++;
    }

    // Ratings
    if (prof.rating >= 5) facets.ratings['5']++;
    if (prof.rating >= 4) facets.ratings['4+']++;
    if (prof.rating >= 3) facets.ratings['3+']++;
    if (prof.rating >= 2) facets.ratings['2+']++;

    // Tiers
    facets.tiers[prof.tier] = (facets.tiers[prof.tier] || 0) + 1;
  });

  return facets;
}