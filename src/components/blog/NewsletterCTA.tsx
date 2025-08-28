'use client';

import React from 'react';

import NewsletterForm from './NewsletterForm';

interface NewsletterCTAProps {
  variant?: 'main' | 'contextual' | 'sidebar' | 'footer';
  context?: {
    articleTitle?: string;
    category?: string;
    tags?: string[];
    userBehavior?: {
      scrollDepth?: number;
      timeOnPage?: number;
      isReturning?: boolean;
    };
  };
  className?: string;
}

const NewsletterCTA: React.FC<NewsletterCTAProps> = ({ 
  variant = 'main',
  context,
  className = ''
}) => {
  const getVariantContent = () => {
    switch (variant) {
      case 'main':
        return {
          title: 'Receba o Melhor Conteúdo Musical na Sua Caixa de Entrada',
          description: 'Junte-se a 50.000+ assinantes e receba insights exclusivos, tutoriais e oportunidades no ecossistema Valhalla Hub.',
          containerClass: 'pt-8 pb-20 md:pt-12 md:pb-32'
        };
      case 'contextual':
        return {
          title: context?.category ? `Mais sobre ${context.category}` : 'Conteúdo Personalizado',
          description: context?.category 
            ? `Receba mais artigos e tutoriais sobre ${context.category.toLowerCase()} diretamente no seu email.`
            : 'Personalize sua experiência e receba conteúdo baseado nos seus interesses.',
          containerClass: 'py-16 md:py-20'
        };
      case 'sidebar':
        return {
          title: 'Newsletter Semanal',
          description: 'Receba os melhores artigos da semana',
          containerClass: 'py-8'
        };
      case 'footer':
        return {
          title: 'Fique Conectado',
          description: 'Newsletter + atualizações do ecossistema',
          containerClass: 'py-12'
        };
      default:
        return {
          title: 'Newsletter Valhalla',
          description: 'Conteúdo exclusivo para você',
          containerClass: 'py-16'
        };
    }
  };

  const variantContent = getVariantContent();

  if (variant === 'sidebar') {
    return (
      <div className={`sticky top-8 ${className}`}>
        <NewsletterForm
          variant="contextual"
          context={context}
          title={variantContent.title}
          description={variantContent.description}
        />
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <section className={`bg-gradient-to-b from-card/30 to-background ${variantContent.containerClass} ${className}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <NewsletterForm
              variant="default"
              context={context}
              title={variantContent.title}
              description={variantContent.description}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`bg-gradient-to-b from-background to-card/30 ${variantContent.containerClass} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div>
            <NewsletterForm
              variant="default"
              context={context}
              title={variantContent.title}
              description={variantContent.description}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterCTA;