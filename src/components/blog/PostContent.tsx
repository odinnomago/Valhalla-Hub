'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';

interface PostContentProps {
  post: {
    id: string;
    title: string;
    content: string;
    excerpt: string;
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
  };
  className?: string;
}

const PostContent: React.FC<PostContentProps> = ({ post, className = '' }) => {
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article className={`max-w-none ${className}`}>
      {/* Post Header */}
      <motion.header 
        className="mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/blog/categoria/${post.category.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors">
            {post.category}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title}</span>
        </nav>

        {/* Category */}
        <div className="mb-4">
          <Badge className={`${getCategoryColor(post.category)} text-sm px-3 py-1`}>
            {post.category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline leading-tight">
          {post.title}
        </h1>

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Link 
              href={`/blog/autor/${post.author.slug}`}
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <span className="font-medium">{post.author.name}</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readingTime} min de leitura</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{formatNumber(post.views)} visualizações</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{formatNumber(post.likes)} curtidas</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{formatNumber(post.comments)} comentários</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Curtir
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Salvar
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartilhar
          </Button>
        </div>
      </motion.header>

      {/* Post Content */}
      <motion.div 
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-li:text-foreground/90 prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:text-foreground/80 prose-blockquote:border-primary/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <motion.div 
        className="mt-12 pt-8 border-t border-border/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 className="font-semibold mb-4">Tags:</h3>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog/tag/${tag}`}>
              <Badge 
                variant="outline" 
                className="hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
              >
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Back to top button */}
      <motion.div 
        className="fixed bottom-8 right-8 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 1 }}
      >
        <Button
          onClick={scrollToTop}
          size="sm"
          className="w-12 h-12 rounded-full shadow-lg bg-primary hover:bg-primary/90"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>
    </article>
  );
};

export default PostContent;