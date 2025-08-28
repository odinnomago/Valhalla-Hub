'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  User, 
  Eye, 
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  ArrowRight
} from 'lucide-react';


interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    slug: string;
  };
  publishedAt: string;
  readingTime: number;
  image: string;
  views: number;
  likes: number;
  comments: number;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
  showStats?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ 
  post, 
  variant = 'default',
  showStats = true,
  className = ''
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Produção Musical': 'bg-primary/20 text-primary',
      'Carreira Artística': 'bg-accent/20 text-accent',
      'Tecnologia': 'bg-blue-500/20 text-blue-400',
      'Eventos': 'bg-green-500/20 text-green-400',
      'Negócios': 'bg-purple-500/20 text-purple-400',
      'Tutoriais': 'bg-orange-500/20 text-orange-400',
      'Entrevistas': 'bg-pink-500/20 text-pink-400',
    };
    return colors[category as keyof typeof colors] || 'bg-muted/20 text-muted-foreground';
  };



  if (variant === 'compact') {
    return (
      <div className={`group ${className}`}>
        <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-20 h-20 flex-shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Badge className={`text-xs mb-2 ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
                <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readingTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const cardSize = variant === 'featured' ? 'md:col-span-2 lg:col-span-2' : '';

  return (
    <div className={`group ${cardSize} ${className}`}>
      <Card className="overflow-hidden h-full bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500">
        {/* Image */}
        <div className={`relative ${variant === 'featured' ? 'h-64 md:h-80' : 'h-48'} overflow-hidden`}>
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(post.category)} backdrop-blur-sm`}>
              {post.category}
            </Badge>
          </div>

          {/* Featured badge */}
          {post.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-accent/90 text-accent-foreground">
                Destaque
              </Badge>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Share button on hover */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100">
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30"
            >
              <Share2 className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        <CardContent className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs hover:bg-primary/10 hover:border-primary/50 cursor-pointer transition-colors"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors duration-300 ${
            variant === 'featured' ? 'text-xl md:text-2xl' : 'text-lg'
          }`}>
            <Link href={`/blog/${post.slug}`} className="line-clamp-2">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-foreground/70 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta information */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link 
                href={`/blog/autor/${post.author.slug}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <div className="relative w-8 h-8">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <span className="text-sm font-medium">{post.author.name}</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min</span>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>

          {/* Stats and CTA */}
          <div className="flex items-center justify-between">
            {showStats && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{formatNumber(post.views)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{formatNumber(post.likes)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{formatNumber(post.comments)}</span>
                </div>
              </div>
            )}

            <Button 
              asChild
              variant="ghost"
              className="text-primary hover:text-primary/80 hover:bg-primary/10 group/button"
            >
              <Link href={`/blog/${post.slug}`}>
                Ler mais
                <div className="ml-1">
                  <ArrowRight className="w-4 h-4 group-hover/button:scale-110 transition-transform" />
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogCard;