import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  AuthorProfile,
  AuthorPosts,
  AuthorStats,
  NewsletterCTA,
  SEOComponent
} from '@/components/blog';
import { seoManager } from '@/lib/seo';

interface AuthorPageProps {
  params: {
    slug: string;
  };
}

// Mock function to get author data - replace with actual CMS integration
async function getAuthor(slug: string) {
  // Mock author data
  const authors = {
    'carlos-silva': {
      name: 'Carlos Silva',
      slug: 'carlos-silva',
      avatar: '/images/authors/carlos-silva.jpg',
      bio: 'Produtor musical com mais de 10 anos de experiência no mercado. Especialista em música eletrônica, Carlos já trabalhou com artistas nacionais e internacionais, tendo suas produções tocadas em festivais ao redor do mundo. Atualmente é instrutor na Valhalla Academy e mentor de novos talentos.',
      location: 'São Paulo, Brasil',
      joinedAt: '2022-03-15',
      website: 'https://carlossilvamusic.com',
      social: {
        instagram: '@carlossilvamusic',
        twitter: '@csilvaproducer',
        youtube: 'CarlosSilvaMusic',
        spotify: 'Carlos Silva'
      },
      specialties: ['Produção Musical', 'Eletrônica', 'Mixing', 'Mastering', 'Ableton Live'],
      stats: {
        postsCount: 25,
        totalViews: 450000,
        totalLikes: 15600,
        followers: 8500
      },
      achievements: [
        'Top Producer Valhalla Hub 2023',
        'Certificado Ableton Live Expert',
        'Mentor do Ano 2022',
        'Mais de 1M de plays no Spotify'
      ],
      equipment: [
        'Ableton Live 12 Suite',
        'Native Instruments Komplete',
        'Yamaha HS8 Monitors',
        'Universal Audio Apollo',
        'Moog Subsequent 37'
      ],
      featured: true
    },
    'marina-santos': {
      name: 'Marina Santos',
      slug: 'marina-santos',
      avatar: '/images/authors/marina-santos.jpg',
      bio: 'Especialista em marketing musical e desenvolvimento de carreira artística. Marina possui MBA em Marketing Digital e já ajudou centenas de artistas independentes a alcançarem seus objetivos. Consultora oficial do Spotify for Artists e palestrante em eventos do setor.',
      location: 'Rio de Janeiro, Brasil',
      joinedAt: '2022-05-20',
      website: 'https://marinasantos.marketing',
      social: {
        instagram: '@marinasantosmarketing',
        twitter: '@marinamktmusical',
        linkedin: 'Marina Santos'
      },
      specialties: ['Marketing Musical', 'Streaming', 'Redes Sociais', 'Carreira Artística'],
      stats: {
        postsCount: 18,
        totalViews: 320000,
        totalLikes: 12400,
        followers: 6200
      },
      achievements: [
        'Consultora Oficial Spotify',
        'Top Marketing Expert 2023',
        'Palestrante Music Conference',
        '500+ artistas atendidos'
      ],
      equipment: [],
      featured: false
    },
    'roberto-tech': {
      name: 'Roberto Tech',
      slug: 'roberto-tech',
      avatar: '/images/authors/roberto-tech.jpg',
      bio: 'Desenvolvedor e entusiasta de tecnologia musical. Roberto é formado em Engenharia da Computação e especializado em desenvolvimento de plugins e ferramentas para produção musical. Criador de várias ferramentas open-source utilizadas pela comunidade.',
      location: 'Belo Horizonte, Brasil',
      joinedAt: '2022-07-10',
      website: 'https://robertotech.dev',
      social: {
        github: 'robertotech',
        twitter: '@robertotech_dev',
        youtube: 'Roberto Tech'
      },
      specialties: ['Tecnologia Musical', 'Plugins', 'IA', 'Desenvolvimento', 'Open Source'],
      stats: {
        postsCount: 15,
        totalViews: 280000,
        totalLikes: 9800,
        followers: 4500
      },
      achievements: [
        'Criador de 10+ plugins VST',
        'Contribuidor Open Source',
        'Speaker Tech Conference',
        'GitHub Star Developer'
      ],
      equipment: [
        'MacBook Pro M3',
        'JUCE Framework',
        'Steinberg VST SDK',
        'Reaper DAW',
        'Custom Controllers'
      ],
      featured: false
    }
  };

  const author = authors[slug as keyof typeof authors];
  
  if (!author) {
    return null;
  }

  return author;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const author = await getAuthor(params.slug);

  if (!author) {
    return {
      title: 'Autor não encontrado',
    };
  }

  return seoManager.generateAuthorMetadata(author);
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const author = await getAuthor(params.slug);

  if (!author) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOComponent
        structuredData={seoManager.generateAuthorStructuredData(author)}
        breadcrumbData={seoManager.generateBreadcrumbStructuredData([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: 'Autores', url: '/blog/autores' },
          { name: author.name, url: `/blog/autor/${author.slug}` }
        ])}
      />
      
      <main className="relative">
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          {/* Author Profile Section */}
          <AuthorProfile author={author} />
          
          {/* Author Statistics */}
          <AuthorStats author={author} className="mt-12" />
          
          {/* Author Posts */}
          <AuthorPosts author={author} className="mt-16" />
          
          {/* Newsletter CTA */}
          <NewsletterCTA 
            variant="contextual"
            context={{
              category: 'Autor',
              tags: author.specialties,
              userBehavior: {
                isReturning: false
              }
            }}
            title={`Siga ${author.name}`}
            description={`Receba notificações quando ${author.name} publicar novos artigos sobre ${author.specialties.slice(0, 2).join(' e ')}.`}
            className="mt-16"
          />
        </div>
      </main>
    </div>
  );
}