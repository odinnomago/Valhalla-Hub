'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  currentPost: {
    id: string;
    category: string;
    tags: string[];
  };
  category: string;
  tags: string[];
  className?: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ 
  currentPost, 
  category, 
  tags, 
  className = '' 
}) => {
  // Mock related posts - in a real app, this would come from your CMS/API
  const allPosts = [
    {
      id: '2',
      title: 'Mixagem para Iniciantes: 10 Dicas Essenciais',
      excerpt: 'Aprenda as técnicas fundamentais de mixagem que todo produtor deveria conhecer. Guia prático com dicas profissionais.',
      slug: 'mixagem-iniciantes-dicas-essenciais',
      category: 'Produção Musical',
      tags: ['mixagem', 'produção', 'tutorial', 'iniciantes'],
      author: {
        name: 'Ana Producer',
        avatar: '/images/authors/ana-producer.jpg',
        slug: 'ana-producer'
      },
      publishedAt: '2024-01-14T15:30:00Z',
      readingTime: 8,
      image: '/images/blog/related-1.jpg',
      views: 8500,
      likes: 423,
      comments: 67
    },
    {
      id: '3',
      title: 'Escolhendo o Monitor de Referência Ideal',
      excerpt: 'Guia completo para escolher monitores de referência que se encaixem no seu orçamento e necessidades de produção.',
      slug: 'monitor-referencia-ideal',
      category: 'Produção Musical',
      tags: ['equipamentos', 'home studio', 'monitores', 'referência'],
      author: {
        name: 'Pedro Master',
        avatar: '/images/authors/pedro-master.jpg',
        slug: 'pedro-master'
      },
      publishedAt: '2024-01-13T11:45:00Z',
      readingTime: 6,
      image: '/images/blog/related-2.jpg',
      views: 6200,
      likes: 298,
      comments: 45
    },
    {
      id: '4',
      title: 'Plugins VST Gratuitos que Todo Produtor Deveria Conhecer',
      excerpt: 'Lista curada dos melhores plugins gratuitos para produção musical. Economize dinheiro sem comprometer a qualidade.',
      slug: 'plugins-vst-gratuitos',
      category: 'Produção Musical',
      tags: ['plugins', 'vst', 'gratuitos', 'produção', 'ferramentas'],
      author: {
        name: 'Carlos Silva',
        avatar: '/images/authors/carlos-silva.jpg',
        slug: 'carlos-silva'
      },
      publishedAt: '2024-01-12T09:20:00Z',
      readingTime: 12,
      image: '/images/blog/related-3.jpg',
      views: 12000,
      likes: 654,
      comments: 89
    },
    {
      id: '5',
      title: 'Como Ganhar Dinheiro com Música em 2024',
      excerpt: 'Estratégias práticas para monetizar sua música. Do streaming aos shows ao vivo, explore todas as possibilidades.',
      slug: 'ganhar-dinheiro-musica-2024',
      category: 'Carreira Artística',
      tags: ['monetização', 'streaming', 'carreira', 'renda'],
      author: {
        name: 'Marina Santos',
        avatar: '/images/authors/marina-santos.jpg',
        slug: 'marina-santos'
      },
      publishedAt: '2024-01-11T14:15:00Z',
      readingTime: 10,
      image: '/images/blog/related-4.jpg',
      views: 15000,
      likes: 789,
      comments: 123
    },
    {
      id: '6',
      title: 'IA na Criação Musical: Ferramentas e Possibilidades',
      excerpt: 'Explore como a inteligência artificial está revolucionando a criação musical e quais ferramentas você pode usar hoje.',
      slug: 'ia-criacao-musical-ferramentas',
      category: 'Tecnologia',
      tags: ['ia', 'tecnologia', 'ferramentas', 'futuro', 'criação'],
      author: {
        name: 'Roberto Tech',
        avatar: '/images/authors/roberto-tech.jpg',
        slug: 'roberto-tech'
      },
      publishedAt: '2024-01-10T16:00:00Z',
      readingTime: 9,
      image: '/images/blog/related-5.jpg',
      views: 9800,
      likes: 445,
      comments: 78
    }
  ];

  // Filter and score related posts
  const getRelatedPosts = () => {
    return allPosts
      .filter(post => post.id !== currentPost.id) // Exclude current post
      .map(post => {
        let score = 0;
        
        // Same category gets higher score
        if (post.category === category) {
          score += 10;
        }
        
        // Common tags get points
        const commonTags = post.tags.filter(tag => tags.includes(tag));
        score += commonTags.length * 5;
        
        // More recent posts get slight bonus
        const daysOld = Math.floor((Date.now() - new Date(post.publishedAt).getTime()) / (1000 * 60 * 60 * 24));
        score += Math.max(0, 30 - daysOld);
        
        return { ...post, score };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // Get top 3 related posts
  };

  const relatedPosts = getRelatedPosts();

  // Get popular posts if we don't have enough related posts
  const popularPosts = allPosts
    .filter(post => post.id !== currentPost.id && !relatedPosts.find(rp => rp.id === post.id))
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section className={`py-16 md:py-20 bg-gradient-to-b from-background to-card/30 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full mb-6">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Leitura Recomendada</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 font-headline">
                Artigos Relacionados
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Continue explorando temas similares com nossa seleção personalizada
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {relatedPosts.map((post) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  variant="default"
                  showStats={true}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Popular Posts Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-medium">Mais Populares</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 font-headline">
              Em Alta no Blog
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Os artigos mais lidos e comentados pela nossa comunidade
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {popularPosts.map((post) => (
              <BlogCard 
                key={post.id} 
                post={post} 
                variant="default"
                showStats={true}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                Explore Mais Conteúdo
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Nosso blog possui centenas de artigos sobre produção musical, carreira artística e tecnologia. 
                Descubra tudo o que você precisa para evoluir na música.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="netflix-button bg-primary hover:bg-primary/90"
                >
                  <a href="/blog">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Ver Todos os Artigos
                  </a>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border-primary/50 hover:border-primary hover:bg-primary/10"
                >
                  <a href={`/blog/categoria/${category.toLowerCase().replace(' ', '-')}`}>
                    Mais sobre {category}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedPosts;