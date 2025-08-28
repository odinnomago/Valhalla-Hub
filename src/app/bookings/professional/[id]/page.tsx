import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfessionalProfile from '@/components/bookings/ProfessionalProfile';

interface Props {
  params: {
    id: string;
  };
}

// Mock function to get professional data
async function getProfessional(id: string) {
  // In a real implementation, this would fetch from your database
  const professionals = {
    '1': {
      id: '1',
      name: 'Marina Santos',
      title: 'Vocalista e Compositora',
      description: 'Especialista em Pop e R&B, com mais de 10 anos de experiência em estúdio e palco. Trabalhou com artistas renomados e possui técnica vocal refinada. Formada em Música pela UNIRIO, com especialização em técnica vocal e performance. Já participou de festivais nacionais e internacionais, sempre buscando a excelência artística.',
      avatar: '/images/professionals/marina.jpg',
      coverImage: '/images/professionals/marina-cover.jpg',
      rating: 4.9,
      reviewCount: 127,
      location: 'São Paulo, SP',
      basePrice: 800,
      availability: 'available' as const,
      verified: true,
      responseTime: '1 hora',
      completedProjects: 156,
      joinDate: '2022-01-15',
      lastSeen: '1 hora atrás',
      specialties: ['Lead Vocal', 'Backing Vocals', 'Composição', 'Harmonia', 'Direção Vocal'],
      genres: ['Pop', 'R&B', 'Soul', 'Jazz', 'MPB'],
      languages: ['Português', 'Inglês', 'Espanhol'],
      equipment: ['Microfone Neumann U87', 'Interface Focusrite', 'Pro Tools', 'Logic Pro'],
      portfolio: [
        { id: '1', title: 'Demo Pop 2024', image: '/images/portfolio/demo1.jpg', type: 'audio' as const, description: 'Demo original com influências de Dua Lipa' },
        { id: '2', title: 'Show Acústico', image: '/images/portfolio/show1.jpg', type: 'video' as const, description: 'Performance acústica no Teatro Municipal' },
        { id: '3', title: 'Sessão Studio', image: '/images/portfolio/studio1.jpg', type: 'image' as const, description: 'Gravação no Estúdio Nas Nuvens' },
        { id: '4', title: 'Composição Original', image: '/images/portfolio/comp1.jpg', type: 'audio' as const, description: 'Música autoral com pegada R&B' }
      ],
      services: [
        { 
          id: '1',
          name: 'Gravação Lead Vocal', 
          price: 800, 
          duration: '2-3 horas',
          description: 'Gravação de vocal principal com direção artística e correções incluídas. Entrega em até 48h.',
          includes: ['Gravação', 'Edição básica', 'Backup', 'Revisões (até 2)']
        },
        { 
          id: '2',
          name: 'Backing Vocals', 
          price: 500, 
          duration: '1-2 horas',
          description: 'Gravação de vocals de apoio, harmonias e coros. Arranjo vocal incluído.',
          includes: ['Arranjo vocal', 'Gravação', 'Edição', 'Mix básico']
        },
        { 
          id: '3',
          name: 'Composição + Vocal', 
          price: 1500, 
          duration: '1 dia',
          description: 'Criação de letra e melodia + gravação completa. Ideal para projetos autorais.',
          includes: ['Composição', 'Arranjo', 'Gravação', 'Demo', 'Direitos compartilhados']
        }
      ],
      badges: ['Top Rated', 'Quick Response', 'Professional'],
      tier: 'elite' as const,
      socialMedia: {
        instagram: '@marinasantosmusic',
        youtube: 'Marina Santos Music',
        spotify: 'Marina Santos'
      },
      reviews: [
        {
          id: '1',
          clientName: 'João Producer',
          rating: 5,
          comment: 'Marina é uma profissional excepcional! Entregou exatamente o que eu precisava, com uma qualidade vocal impressionante. Super recomendo!',
          date: '2024-01-15',
          project: 'Gravação Lead Vocal',
          verified: true
        },
        {
          id: '2',
          clientName: 'Ana Beatriz',
          rating: 5,
          comment: 'Trabalho impecável, prazo cumprido e muita atenção aos detalhes. Marina conseguiu captar exatamente a emoção que eu queria transmitir.',
          date: '2024-01-10',
          project: 'Composição + Vocal',
          verified: true
        }
      ]
    }
  };

  return professionals[id as keyof typeof professionals] || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const professional = await getProfessional(params.id);
  
  if (!professional) {
    return {
      title: 'Profissional não encontrado | Valhalla Hub'
    };
  }

  return {
    title: `${professional.name} - ${professional.title} | Valhalla Hub`,
    description: professional.description,
    openGraph: {
      title: `${professional.name} - ${professional.title}`,
      description: professional.description,
      images: [
        {
          url: professional.coverImage,
          width: 1200,
          height: 630,
          alt: professional.name
        }
      ]
    }
  };
}

export default async function ProfessionalPage({ params }: Props) {
  const professional = await getProfessional(params.id);

  if (!professional) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <ProfessionalProfile professional={professional} />
    </main>
  );
}