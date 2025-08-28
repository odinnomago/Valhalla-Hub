'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  MapPin, 
  Calendar,
  BookOpen,
  Heart,
  ExternalLink,
  Instagram,
  Twitter,
  Youtube,
  Globe
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthorBoxProps {
  author: {
    name: string;
    avatar: string;
    slug: string;
    bio?: string;
    social?: {
      twitter?: string;
      instagram?: string;
      youtube?: string;
      website?: string;
    };
    location?: string;
    joinedAt?: string;
    postsCount?: number;
    totalLikes?: number;
    specialties?: string[];
  };
  className?: string;
}

const AuthorBox: React.FC<AuthorBoxProps> = ({ author, className = '' }) => {
  const getSocialIcon = (platform: string) => {
    const icons = {
      twitter: Twitter,
      instagram: Instagram,
      youtube: Youtube,
      website: Globe
    };
    return icons[platform as keyof typeof icons] || ExternalLink;
  };

  const getSocialUrl = (platform: string, handle: string) => {
    const baseUrls = {
      twitter: 'https://twitter.com/',
      instagram: 'https://instagram.com/',
      youtube: 'https://youtube.com/@',
      website: ''
    };
    
    const baseUrl = baseUrls[platform as keyof typeof baseUrls];
    if (platform === 'website') return handle;
    
    return baseUrl + handle.replace('@', '');
  };

  // Mock author extended data
  const extendedAuthor = {
    ...author,
    location: author.location || 'São Paulo, Brasil',
    joinedAt: author.joinedAt || '2022-03-15',
    postsCount: author.postsCount || 25,
    totalLikes: author.totalLikes || 3500,
    specialties: author.specialties || ['Produção Musical', 'Eletrônica', 'Mixing']
  };

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Author Avatar */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="relative w-24 h-24 md:w-32 md:h-32">
                  <Image
                    src={extendedAuthor.avatar}
                    alt={extendedAuthor.name}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-card flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {extendedAuthor.name}
                  </h3>
                  
                  {/* Author Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{extendedAuthor.postsCount} artigos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{extendedAuthor.totalLikes.toLocaleString()} curtidas</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{extendedAuthor.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Desde {new Date(extendedAuthor.joinedAt).getFullYear()}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {extendedAuthor.specialties.map((specialty) => (
                      <Badge 
                        key={specialty} 
                        variant="secondary" 
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Bio */}
                  {extendedAuthor.bio && (
                    <p className="text-foreground/80 leading-relaxed mb-4">
                      {extendedAuthor.bio}
                    </p>
                  )}

                  {/* Social Links */}
                  {extendedAuthor.social && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {Object.entries(extendedAuthor.social).map(([platform, handle]) => {
                        const Icon = getSocialIcon(platform);
                        const url = getSocialUrl(platform, handle);
                        
                        return (
                          <motion.a
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg hover:bg-card/80 transition-colors text-sm text-muted-foreground hover:text-foreground"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{handle}</span>
                          </motion.a>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                  <Button 
                    asChild
                    className="netflix-button bg-primary hover:bg-primary/90"
                  >
                    <Link href={`/blog/autor/${extendedAuthor.slug}`}>
                      <User className="w-4 h-4 mr-2" />
                      Ver Perfil Completo
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="text-center md:text-left">
              <h4 className="font-semibold text-foreground mb-2">
                💡 Gostou do conteúdo do {extendedAuthor.name}?
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Siga para receber notificações sobre novos artigos e conteúdos exclusivos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" size="sm">
                  Seguir Autor
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/blog/autor/${extendedAuthor.slug}`}>
                    Ver Todos os Artigos
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthorBox;