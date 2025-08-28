'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar,
  ExternalLink,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  Github,
  Linkedin,
  Music,
  Award,
  Settings,
  Users,
  Verified
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthorProfileProps {
  author: {
    name: string;
    slug: string;
    avatar: string;
    bio: string;
    location: string;
    joinedAt: string;
    website?: string;
    social?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
      github?: string;
      linkedin?: string;
      spotify?: string;
    };
    specialties: string[];
    stats: {
      postsCount: number;
      totalViews: number;
      totalLikes: number;
      followers: number;
    };
    achievements: string[];
    equipment: string[];
    featured: boolean;
  };
  className?: string;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ author, className = '' }) => {
  const getSocialIcon = (platform: string) => {
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      youtube: Youtube,
      github: Github,
      linkedin: Linkedin,
      spotify: Music,
      website: Globe
    };
    return icons[platform as keyof typeof icons] || ExternalLink;
  };

  const getSocialUrl = (platform: string, handle: string) => {
    const baseUrls = {
      instagram: 'https://instagram.com/',
      twitter: 'https://twitter.com/',
      youtube: 'https://youtube.com/@',
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/in/',
      spotify: 'https://open.spotify.com/artist/',
      website: ''
    };
    
    const baseUrl = baseUrls[platform as keyof typeof baseUrls];
    if (platform === 'website') return handle;
    
    return baseUrl + handle.replace('@', '');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className={className}>
      {/* Breadcrumb */}
      <motion.nav 
        className="mb-8 text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/blog" className="hover:text-primary transition-colors">
          Blog
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog/autores" className="hover:text-primary transition-colors">
          Autores
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{author.name}</span>
      </motion.nav>

      {/* Main Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Card className="bg-gradient-to-br from-card/80 via-card/60 to-card/80 backdrop-blur-lg border-border/50 overflow-hidden">
          <CardContent className="p-0">
            {/* Header Background */}
            <div className="relative h-48 md:h-64 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Featured Badge */}
              {author.featured && (
                <motion.div
                  className="absolute top-6 right-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Badge className="bg-accent/90 text-accent-foreground flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Autor Destaque
                  </Badge>
                </motion.div>
              )}
              
              {/* Profile Image */}
              <motion.div
                className="absolute -bottom-16 left-8"
                initial={{ scale: 0, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative">
                  <div className="relative w-32 h-32 md:w-40 md:h-40">
                    <Image
                      src={author.avatar}
                      alt={author.name}
                      fill
                      className="object-cover rounded-2xl border-4 border-card shadow-2xl"
                    />
                  </div>
                  {/* Verified Badge */}
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-full border-4 border-card flex items-center justify-center shadow-lg">
                    <Verified className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Profile Content */}
            <div className="pt-20 p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-headline">
                          {author.name}
                        </h1>
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{author.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>Membro desde {formatDate(author.joinedAt)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{formatNumber(author.stats.followers)} seguidores</span>
                          </div>
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {author.specialties.map((specialty) => (
                            <motion.div
                              key={specialty}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Badge 
                                variant="secondary" 
                                className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                              >
                                {specialty}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col gap-3">
                        <Button className="netflix-button bg-primary hover:bg-primary/90">
                          <Users className="w-4 h-4 mr-2" />
                          Seguir Autor
                        </Button>
                        {author.website && (
                          <Button variant="outline" asChild>
                            <a href={author.website} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Website
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="prose prose-lg max-w-none dark:prose-invert prose-p:text-foreground/90 mb-8">
                      <p className="text-foreground/90 leading-relaxed text-lg">
                        {author.bio}
                      </p>
                    </div>

                    {/* Social Links */}
                    {author.social && (
                      <div className="mb-8">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-primary" />
                          Redes Sociais
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {Object.entries(author.social).map(([platform, handle]) => {
                            const Icon = getSocialIcon(platform);
                            const url = getSocialUrl(platform, handle);
                            
                            return (
                              <motion.a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-card/50 rounded-lg hover:bg-card/80 transition-colors text-muted-foreground hover:text-foreground border border-border/50 hover:border-primary/50"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{handle}</span>
                              </motion.a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Achievements */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-4 flex items-center gap-2">
                          <Award className="w-5 h-5 text-primary" />
                          Conquistas
                        </h3>
                        <div className="space-y-3">
                          {author.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20"
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-sm text-foreground/90">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Equipment */}
                  {author.equipment.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                        <CardContent className="p-6">
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Settings className="w-5 h-5 text-primary" />
                            Setup & Equipamentos
                          </h3>
                          <div className="space-y-2">
                            {author.equipment.map((item, index) => (
                              <motion.div
                                key={index}
                                className="flex items-center gap-2 text-sm text-foreground/80"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
                              >
                                <div className="w-1 h-1 bg-accent rounded-full" />
                                {item}
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthorProfile;