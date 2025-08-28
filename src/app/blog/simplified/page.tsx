import React from 'react';
import { Metadata } from 'next';
import {
  SimpleCategoryNav,
  SimplifiedBlogGrid,
  NewsletterCTA
} from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog | Valhalla Hub - Música, Tecnologia e Inovação',
  description: 'Descubra as últimas tendências em produção musical, carreira artística e tecnologia musical. Conteúdo especializado para músicos, produtores e profissionais da indústria.',
  keywords: 'blog música, produção musical, carreira artística, tecnologia musical, indústria musical, valhalla hub',
  openGraph: {
    title: 'Blog Valhalla Hub - Música, Tecnologia e Inovação',
    description: 'Conteúdo especializado para músicos, produtores e profissionais da indústria musical.',
    type: 'website',
    url: 'https://valhallahub.com.br/blog',
    images: [
      {
        url: '/images/blog-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Valhalla Hub',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Valhalla Hub',
    description: 'Conteúdo especializado para músicos, produtores e profissionais da indústria musical.',
    images: ['/images/blog-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://valhallahub.com.br/blog',
  },
};

export default function SimplifiedBlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        {/* Simplified Header */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-background to-card/20">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-headline">
              Blog Valhalla
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Música, Tecnologia e Inovação
            </p>
          </div>
        </section>

        {/* Category Navigation */}
        <SimpleCategoryNav />

        {/* Blog Grid */}
        <SimplifiedBlogGrid />

        {/* Newsletter CTA - Simple and Clean */}
        <section className="py-16 bg-card/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Receba as melhores dicas musicais
              </h3>
              <p className="text-muted-foreground mb-8 text-lg">
                Conteúdo exclusivo toda semana, direto na sua caixa de entrada.
              </p>
              <NewsletterCTA
                variant="simple"
                title=""
                description=""
                className="bg-transparent border-0 shadow-none"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}