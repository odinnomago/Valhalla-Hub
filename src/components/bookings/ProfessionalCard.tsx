'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

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

interface ProfessionalCardProps {
  professional: Professional;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  professional,
  viewMode,
  onClick
}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-primary bg-primary/20';
      case 'busy': return 'text-accent bg-accent/20';
      case 'unavailable': return 'text-destructive bg-destructive/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getAvailabilityLabel = (availability: string) => {
    switch (availability) {
      case 'available': return 'Disponível';
      case 'busy': return 'Ocupado';
      case 'unavailable': return 'Indisponível';
      default: return 'Desconhecido';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'elite': return 'text-accent bg-accent/20 border-accent/30';
      case 'pro': return 'text-primary bg-primary/20 border-primary/30';
      case 'rising': return 'text-secondary bg-secondary/20 border-secondary/30';
      case 'new': return 'text-muted-foreground bg-muted/20 border-border';
      default: return 'text-muted-foreground bg-muted/20 border-border';
    }
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case 'elite': return 'ELITE';
      case 'pro': return 'PRO';
      case 'rising': return 'RISING';
      case 'new': return 'NEW';
      default: return 'MEMBER';
    }
  };

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:border-border/70 hover:bg-card/70 transition-all cursor-pointer group"
      >
        <div className="flex gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold overflow-hidden">
                {professional.avatar ? (
                  <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
                ) : (
                  professional.name.charAt(0)
                )}
              </div>
              <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-card ${getAvailabilityColor(professional.availability)}`}></div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {professional.name}
                  </h3>
                  {professional.verified && (
                    <span className="text-primary" title="Verificado">✓</span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full border ${getTierColor(professional.tier)}`}>
                    {getTierLabel(professional.tier)}
                  </span>
                </div>
                <p className="text-foreground/80 font-medium mb-1">{professional.title}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <span>⭐</span>
                    <span>{professional.rating}</span>
                    <span>({professional.reviewCount} avaliações)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span>📍</span>
                    <span>{professional.location}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getAvailabilityColor(professional.availability)}`}>
                    {getAvailabilityLabel(professional.availability)}
                  </span>
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {showFullDescription 
                    ? professional.description 
                    : truncateDescription(professional.description, 120)
                  }
                  {professional.description.length > 120 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullDescription(!showFullDescription);
                      }}
                      className="text-primary hover:text-primary/80 ml-1 text-sm"
                    >
                      {showFullDescription ? 'Ver menos' : 'Ver mais'}
                    </button>
                  )}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-2xl font-bold text-foreground mb-1">
                  R$ {professional.basePrice}
                </p>
                <p className="text-muted-foreground text-sm">A partir de</p>
              </div>
            </div>

            {/* Skills and Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {professional.specialties.slice(0, 3).map((specialty, idx) => (
                <span key={idx} className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                  {specialty}
                </span>
              ))}
              {professional.genres.slice(0, 2).map((genre, idx) => (
                <span key={idx} className="bg-muted/50 text-foreground/70 text-xs px-2 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle contact action
                }}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Entrar em Contato
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Handle portfolio action
                }}
                className="bg-card text-foreground px-4 py-2 rounded-lg font-medium hover:bg-card/80 transition-colors"
              >
                Ver Portfólio
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>⚡</span>
                <span>Responde em {professional.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div
      onClick={onClick}
      className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-border/70 hover:bg-card/70 transition-all cursor-pointer group"
    >
      {/* Cover Image */}
      <div className="relative h-32 bg-gradient-to-r from-primary/20 to-secondary/20">
        {professional.coverImage && (
          <img 
            src={professional.coverImage} 
            alt={`${professional.name} cover`}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {professional.badges.slice(0, 2).map((badge, idx) => (
            <span key={idx} className="bg-background/80 text-foreground text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          ))}
        </div>

        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs px-2 py-1 rounded-full border ${getTierColor(professional.tier)}`}>
            {getTierLabel(professional.tier)}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground text-lg font-bold overflow-hidden">
              {professional.avatar ? (
                <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
              ) : (
                professional.name.charAt(0)
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-card ${getAvailabilityColor(professional.availability)}`}></div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">
                {professional.name}
              </h3>
              {professional.verified && (
                <span className="text-primary" title="Verificado">✓</span>
              )}
            </div>
            <p className="text-foreground/80 font-medium text-sm mb-2 truncate">{professional.title}</p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <span>⭐</span>
                <span>{professional.rating}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>📍</span>
                <span>{professional.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
          {professional.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {professional.specialties.slice(0, 2).map((specialty, idx) => (
            <span key={idx} className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
              {specialty}
            </span>
          ))}
          {professional.genres.slice(0, 2).map((genre, idx) => (
            <span key={idx} className="bg-muted/50 text-foreground/70 text-xs px-2 py-1 rounded-full">
              {genre}
            </span>
          ))}
        </div>

        {/* Portfolio Preview */}
        <div className="mb-4">
          <h4 className="text-foreground font-semibold text-sm mb-2">Portfólio</h4>
          <div className="grid grid-cols-3 gap-2">
            {professional.portfolio.slice(0, 3).map((item) => (
              <div key={item.id} className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span>{professional.reviewCount} avaliações</span>
          <span>{professional.completedProjects} projetos</span>
          <span className={`px-2 py-1 rounded-full ${getAvailabilityColor(professional.availability)}`}>
            {getAvailabilityLabel(professional.availability)}
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-foreground">R$ {professional.basePrice}</p>
            <p className="text-muted-foreground text-xs">A partir de</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Handle contact action
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Contatar
          </button>
        </div>

        {/* Response Time */}
        <div className="mt-3 text-center">
          <p className="text-muted-foreground text-xs">
            ⚡ Responde em {professional.responseTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;