'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Clock, 
  TrendingUp,
  BookOpen,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import NewsletterCTA from './NewsletterCTA';

interface PostSidebarProps {
  post: {
    id: string;
    title: string;
    category: string;
    tags: string[];
    author: {
      name: string;
      avatar: string;
      slug: string;
      bio?: string;
      social?: {
        twitter?: string;
        instagram?: string;
        youtube?: string;
      };
    };
    readingTime: number;
  };
  className?: string;
}

const PostSidebar: React.FC<PostSidebarProps> = ({ post, className = '' }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Track reading progress
  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', updateReadingProgress);
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  // Mock related posts
  const relatedPosts = [
    {
      id: '2',
      title: 'Mixagem para Iniciantes: 10 Dicas Essenciais',
      slug: 'mixagem-iniciantes-dicas-essenciais',
      image: '/images/blog/related-1.jpg',
      readingTime: 8,
      category: 'Produção Musical'
    },
    {
      id: '3',
      title: 'Escolhendo o Monitor de Referência Ideal',
      slug: 'monitor-referencia-ideal',
      image: '/images/blog/related-2.jpg',
      readingTime: 6,
      category: 'Produção Musical'
    },
    {
      id: '4',
      title: 'Plugins VST Gratuitos que Todo Produtor Deveria Conhecer',
      slug: 'plugins-vst-gratuitos',
      image: '/images/blog/related-3.jpg',
      readingTime: 12,
      category: 'Produção Musical'
    }
  ];

  // Popular posts
  const popularPosts = [
    {
      id: '5',
      title: 'Como Ganhar Dinheiro com Música em 2024',
      slug: 'ganhar-dinheiro-musica-2024',
      views: 25000
    },
    {
      id: '6',
      title: 'Marketing Musical: Guia Definitivo',
      slug: 'marketing-musical-guia',
      views: 18000
    },
    {
      id: '7',
      title: 'Home Studio: Setup Completo por R$ 2.000',
      slug: 'home-studio-setup-2000',
      views: 15000
    }
  ];

  const shareUrl = `https://valhallahub.com.br/blog/${post.id}`;
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Reading Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-8">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Progresso de Leitura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={readingProgress} className="h-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{Math.round(readingProgress)}% concluído</span>
                <span>{post.readingTime} min restantes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Share */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Share2 className="w-5 h-5 text-primary" />
              Compartilhar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('facebook')}
                className="justify-start"
              >
                <Facebook className="w-4 h-4 mr-2 text-blue-600" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter')}
                className="justify-start"
              >
                <Twitter className="w-4 h-4 mr-2 text-blue-400" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin')}
                className="justify-start"
              >
                <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="justify-start"
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 mr-2" />
                )}
                {copied ? 'Copiado!' : 'Copiar Link'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Newsletter Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <NewsletterCTA
          variant="sidebar"
          context={{
            articleTitle: post.title,
            category: post.category,
            tags: post.tags
          }}
        />
      </motion.div>

      {/* Related Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Artigos Relacionados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block group"
                >
                  <div className="flex gap-3 p-3 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{relatedPost.readingTime} min</span>
                        <Badge variant="outline" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Popular Posts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Mais Lidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularPosts.map((popularPost, index) => (
                <Link
                  key={popularPost.id}
                  href={`/blog/${popularPost.slug}`}
                  className="block group"
                >
                  <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-card/50 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                        {popularPost.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(popularPost.views / 1000).toFixed(1)}K visualizações
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Author Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Sobre o Autor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-4">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h4 className="font-semibold mb-2">{post.author.name}</h4>
              {post.author.bio && (
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {post.author.bio}
                </p>
              )}
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Link href={`/blog/autor/${post.author.slug}`}>
                  Ver Perfil Completo
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PostSidebar;