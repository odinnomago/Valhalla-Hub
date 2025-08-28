import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  PostContent,
  PostSidebar,
  AuthorBox,
  RelatedPosts,
  ShareButtons,
  NewsletterCTA,
  SEOComponent
} from '@/components/blog';
import { seoManager } from '@/lib/seo';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Mock function to get post data - replace with actual CMS integration
async function getPost(slug: string) {
  // Mock post data
  const posts = {
    'como-produzir-musica-eletronica-guia-2024': {
      id: '1',
      title: 'Como Produzir Música Eletrônica: Guia Completo 2024',
      content: `
        <p>A produção de música eletrônica é uma arte que combina criatividade, técnica e tecnologia. Neste guia completo, vamos explorar desde os conceitos básicos até técnicas avançadas que todo produtor deveria conhecer.</p>
        
        <h2>1. Equipamentos Essenciais</h2>
        <p>Para começar na produção eletrônica, você vai precisar de:</p>
        <ul>
          <li>DAW (Digital Audio Workstation)</li>
          <li>Interface de áudio</li>
          <li>Monitor de referência ou fones profissionais</li>
          <li>Controlador MIDI</li>
          <li>Microfone (para gravações)</li>
        </ul>
        
        <h2>2. Escolhendo sua DAW</h2>
        <p>A escolha da DAW é fundamental. As principais opções incluem:</p>
        <ul>
          <li><strong>Ableton Live:</strong> Excelente para performance ao vivo e criação de loops</li>
          <li><strong>FL Studio:</strong> Interface amigável, ideal para iniciantes</li>
          <li><strong>Logic Pro:</strong> Completa biblioteca de instrumentos virtuais</li>
          <li><strong>Cubase:</strong> Recursos avançados para composição</li>
        </ul>
        
        <h2>3. Elementos da Música Eletrônica</h2>
        <p>Todo track eletrônico é construído com elementos fundamentais:</p>
        <ul>
          <li><strong>Kick:</strong> A base rítmica</li>
          <li><strong>Snare/Clap:</strong> Define o groove</li>
          <li><strong>Hi-hats:</strong> Adiciona movimento</li>
          <li><strong>Bass:</strong> Fornece a base harmônica</li>
          <li><strong>Lead:</strong> A melodia principal</li>
          <li><strong>Pads:</strong> Criam atmosfera</li>
        </ul>
        
        <h2>4. Técnicas de Produção</h2>
        <p>Algumas técnicas essenciais que todo produtor deve dominar:</p>
        
        <h3>4.1 Sidechain Compression</h3>
        <p>Uma das técnicas mais características da música eletrônica, criando o famoso "pumping" effect.</p>
        
        <h3>4.2 EQ e Filtering</h3>
        <p>Use filtros para criar builds, breakdowns e transições dinâmicas.</p>
        
        <h3>4.3 Layering</h3>
        <p>Combine múltiplos sons para criar texturas ricas e complexas.</p>
        
        <h2>5. Dicas para Iniciantes</h2>
        <ul>
          <li>Comece simples: foque em 4-8 elementos por vez</li>
          <li>Estude referências: analise tracks que você admira</li>
          <li>Pratique regularmente: dedique tempo diário à produção</li>
          <li>Experimente: não tenha medo de tentar coisas novas</li>
          <li>Termine suas tracks: é melhor ter 10 tracks completas que 100 incompletas</li>
        </ul>
        
        <h2>Conclusão</h2>
        <p>A produção de música eletrônica é uma jornada de constante aprendizado. Com dedicação, prática e as ferramentas certas, você pode criar tracks profissionais que se destacam no cenário musical atual.</p>
        
        <p>Lembre-se: a técnica é importante, mas a criatividade é o que realmente faz a diferença. Use este guia como base, mas sempre busque seu próprio som e estilo únicos.</p>
      `,
      excerpt: 'Aprenda os segredos da produção eletrônica desde o básico até técnicas avançadas. Tutorial completo com dicas práticas e ferramentas essenciais.',
      slug: 'como-produzir-musica-eletronica-guia-2024',
      category: 'Produção Musical',
      tags: ['produção', 'eletrônica', 'ableton', 'synthesizers', 'tutorial'],
      author: {
        name: 'Carlos Silva',
        avatar: '/images/authors/carlos-silva.jpg',
        slug: 'carlos-silva',
        bio: 'Produtor musical com mais de 10 anos de experiência. Especialista em música eletrônica e instrutor na Valhalla Academy.',
        social: {
          instagram: '@carlossilvamusic',
          twitter: '@csilvaproducer',
          youtube: 'CarlosSilvaMusic'
        }
      },
      publishedAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      readingTime: 12,
      image: '/images/blog/post-1.jpg',
      views: 15000,
      likes: 890,
      comments: 156,
      featured: true
    }
  };

  const post = posts[slug as keyof typeof posts];
  
  if (!post) {
    return null;
  }

  return post;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return seoManager.generatePostMetadata(post);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOComponent
        structuredData={seoManager.generatePostStructuredData(post)}
        breadcrumbData={seoManager.generateBreadcrumbStructuredData([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.category, url: `/blog/categoria/${encodeURIComponent(post.category.toLowerCase())}` },
          { name: post.title, url: `/blog/${post.slug}` }
        ])}
      />
      
      <main className="relative">
        {/* Share Buttons - Floating */}
        <ShareButtons 
          post={post}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
        />

        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <PostContent post={post} />
              
              {/* Author Box */}
              <AuthorBox author={post.author} className="mt-12" />
              
              {/* Contextual Newsletter */}
              <NewsletterCTA 
                variant="contextual"
                context={{
                  articleTitle: post.title,
                  category: post.category,
                  tags: post.tags,
                  userBehavior: {
                    scrollDepth: 100, // Assuming user read the full article
                    timeOnPage: post.readingTime * 60 * 1000, // Reading time in ms
                    isReturning: false
                  }
                }}
                className="mt-12"
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <PostSidebar post={post} />
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <RelatedPosts 
          currentPost={post}
          category={post.category}
          tags={post.tags}
        />
      </main>
    </div>
  );
}