'use client';

import React, { useState } from 'react';
import { SimpleCategoryNav, SimplifiedBlogGrid, NewsletterProvider } from '@/components/blog';
import { useNewsletter } from '@/hooks/useNewsletter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ConnectedBlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [footerEmail, setFooterEmail] = useState('');
  const { subscribe, isLoading, isSuccess, error } = useNewsletter();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail || isLoading) return;

    const result = await subscribe({
      email: footerEmail,
      source: 'blog_footer',
      interests: activeCategory !== 'todos' ? [activeCategory] : [],
      contentContext: {
        category: activeCategory
      }
    });

    if (result.success) {
      setFooterEmail('');
    }
  };

  return (
    <NewsletterProvider contentCategory={activeCategory}>
      <div className="min-h-screen bg-background">
        <main>
          {/* Simplified Header - Inspired by Pitchfork's clean design */}
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

          {/* Category Navigation - Inspired by Rolling Stone's category nav */}
          <SimpleCategoryNav
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />

          {/* Blog Grid - Clean grid layout inspired by Music Tech */}
          <SimplifiedBlogGrid
            searchQuery={searchQuery}
            activeCategory={activeCategory}
          />

          {/* Newsletter CTA - Simple and focused like DIY Musician */}
          <section className="py-16 bg-card/20">
            <div className="container mx-auto px-4 md:px-6">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Receba as melhores dicas musicais
                </h3>
                <p className="text-muted-foreground mb-8 text-lg">
                  Conteúdo exclusivo toda semana, direto na sua caixa de entrada.
                </p>
                
                {/* Integrated newsletter form */}
                <form onSubmit={handleFooterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="Seu email"
                    className="flex-1"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !footerEmail}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isLoading ? 'Inscrevendo...' : 'Inscrever-se'}
                  </Button>
                </form>
                
                {/* Status messages */}
                {isSuccess && (
                  <p className="text-green-500 text-sm mt-2">✅ Inscrição realizada com sucesso!</p>
                )}
                {error && (
                  <p className="text-red-500 text-sm mt-2">❌ {error}</p>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </NewsletterProvider>
  );
};

export default ConnectedBlogPage;