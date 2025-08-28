'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Music,
  MessageCircle,
  Users,
  ExternalLink,
  Play,
  Heart,
  Share2,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SocialNetworks = () => {
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState<Record<string, number>>({});

  const socialNetworks = [
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@valhallahub',
      followers: 500000,
      icon: Instagram,
      color: 'text-pink-400',
      bgColor: 'bg-pink-400/10',
      description: 'Bastidores, lançamentos, artistas, eventos',
      cta: 'Siga no Instagram',
      url: 'https://instagram.com/valhallahub',
      stats: {
        posts: 1247,
        engagement: '8.5%',
        growth: '+12%'
      },
      recentPosts: [
        { type: 'image', content: 'Novo lançamento hoje! 🎵', likes: 15420 },
        { type: 'video', content: 'Bastidores do estúdio', likes: 23150 },
        { type: 'carousel', content: 'Artistas da semana', likes: 18790 }
      ]
    },
    {
      id: 'youtube',
      name: 'YouTube',
      handle: 'Valhalla Hub Oficial',
      followers: 200000,
      icon: Youtube,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      description: 'Documentários, tutoriais, performances',
      cta: 'Inscreva-se',
      url: 'https://youtube.com/@valhallahub',
      stats: {
        videos: 324,
        views: '15M',
        avgViews: '50K'
      },
      recentPosts: [
        { type: 'video', content: 'Como produzir beats profissionais', views: 125000 },
        { type: 'live', content: 'Live Session com DJ Mars', views: 89000 },
        { type: 'video', content: 'Documentário: O Futuro da Música', views: 234000 }
      ]
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@valhallahub',
      followers: 300000,
      icon: Music,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10',
      description: 'Trends musicais, desafios, dicas rápidas',
      cta: 'Siga no TikTok',
      url: 'https://tiktok.com/@valhallahub',
      stats: {
        videos: 567,
        likes: '2.1M',
        shares: '450K'
      },
      recentPosts: [
        { type: 'video', content: '#BeatChallenge viral! 🔥', likes: 89000 },
        { type: 'video', content: 'Dica rápida de produção', likes: 45600 },
        { type: 'video', content: 'Reação ao novo hit', likes: 67800 }
      ]
    },
    {
      id: 'twitter',
      name: 'Twitter',
      handle: '@valhallahub',
      followers: 100000,
      icon: Twitter,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      description: 'Notícias, atualizações, interação',
      cta: 'Siga no Twitter',
      url: 'https://twitter.com/valhallahub',
      stats: {
        tweets: 3456,
        engagement: '6.2%',
        mentions: '2.3K'
      },
      recentPosts: [
        { type: 'tweet', content: 'Nova parceria anunciada! 🎉', retweets: 234 },
        { type: 'thread', content: 'Thread sobre o futuro da música...', retweets: 456 },
        { type: 'poll', content: 'Qual gênero vocês querem ver mais?', votes: 1250 }
      ]
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      handle: 'Valhalla Hub',
      followers: 50000,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
      description: 'Carreiras, oportunidades, negócios',
      cta: 'Conecte-se',
      url: 'https://linkedin.com/company/valhallahub',
      stats: {
        posts: 245,
        connections: '15K',
        pageViews: '25K'
      },
      recentPosts: [
        { type: 'article', content: 'Oportunidades na indústria musical', reactions: 89 },
        { type: 'job', content: 'Vagas abertas: Produtor Musical', reactions: 134 },
        { type: 'update', content: 'Crescimento de 200% este ano', reactions: 267 }
      ]
    },
    {
      id: 'spotify',
      name: 'Spotify',
      handle: 'Valhalla Hub Playlists',
      followers: 1000000,
      icon: Music,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      description: 'Playlists curadas, novos lançamentos',
      cta: 'Ouça no Spotify',
      url: 'https://open.spotify.com/user/valhallahub',
      stats: {
        playlists: 45,
        streams: '50M',
        monthlyListeners: '2.5M'
      },
      recentPosts: [
        { type: 'playlist', content: 'Hip Hop Underground Brasil', streams: 1200000 },
        { type: 'album', content: 'Novos Talentos 2024', streams: 890000 },
        { type: 'playlist', content: 'Eletrônica Brasileira', streams: 2100000 }
      ]
    }
  ];

  // Animate follower counts
  useEffect(() => {
    socialNetworks.forEach(network => {
      let start = 0;
      const end = network.followers;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setAnimatedCounts(prev => ({ ...prev, [network.id]: Math.floor(start) }));
      }, 16);
    });
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return num.toString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const
      }
    }
  };

  return (
    <section id="redes-sociais" className="py-20 bg-gradient-to-b from-card/30 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline">
            Siga a Revolução Musical
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Conecte-se conosco nas redes sociais e fique por dentro de tudo que acontece no ecossistema Valhalla.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {socialNetworks.map((network) => {
            const Icon = network.icon;
            const isSelected = selectedNetwork === network.id;
            const animatedCount = animatedCounts[network.id] || 0;
            
            return (
              <motion.div
                key={network.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                onClick={() => setSelectedNetwork(isSelected ? null : network.id)}
                className="cursor-pointer"
              >
                <Card className={`
                  group h-full overflow-hidden transition-all duration-500
                  ${isSelected 
                    ? 'bg-card/90 border-primary/50 shadow-2xl shadow-primary/20 scale-105' 
                    : 'bg-card/50 border-border/50 hover:bg-card/80 hover:border-primary/30 hover:shadow-xl'
                  }
                  backdrop-blur-sm
                `}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`
                        p-4 rounded-2xl ${network.bgColor} 
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <Icon className={`w-8 h-8 ${network.color}`} />
                      </div>
                      <Badge 
                        variant="secondary" 
                        className="bg-primary/20 text-primary-foreground text-xs"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {network.stats.growth || '+5%'}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300">
                          {network.name}
                        </h3>
                        <p className="text-foreground/60 text-sm">{network.handle}</p>
                      </div>

                      <div className="text-center py-4">
                        <motion.div 
                          className="text-3xl font-bold text-primary"
                          key={animatedCount}
                        >
                          {formatNumber(animatedCount)}
                        </motion.div>
                        <p className="text-sm text-muted-foreground">seguidores</p>
                      </div>

                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {network.description}
                      </p>

                      {/* Stats Preview */}
                      <div className="grid grid-cols-3 gap-2 text-center">
                        {Object.entries(network.stats).slice(0, 3).map(([key, value]) => (
                          <div key={key} className="p-2 bg-muted/20 rounded-lg">
                            <div className="text-sm font-medium">{value}</div>
                            <div className="text-xs text-muted-foreground capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Recent Posts Preview */}
                      {isSelected && (
                        <AnimatePresence>
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3 border-t border-border/50 pt-4"
                          >
                            <h4 className="font-medium text-foreground">Posts Recentes:</h4>
                            <div className="space-y-2">
                              {network.recentPosts.slice(0, 3).map((post, index) => (
                                <div key={index} className="p-2 bg-muted/10 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-foreground/70 flex-1 truncate">
                                      {post.content}
                                    </p>
                                    <div className="flex items-center gap-1 text-xs text-accent">
                                      <Heart className="w-3 h-3" />
                                      {formatNumber(
                                        (post as any).likes || 
                                        (post as any).views || 
                                        (post as any).retweets || 
                                        (post as any).reactions || 
                                        0
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>
                      )}

                      <Button 
                        className="w-full netflix-button bg-primary hover:bg-primary/90 group"
                        asChild
                      >
                        <a href={network.url} target="_blank" rel="noopener noreferrer">
                          {network.cta}
                          <motion.div
                            className="ml-2"
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.div>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Discord Community Card */}
        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/30">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-6">
                  <div className="p-4 bg-primary/20 rounded-2xl">
                    <MessageCircle className="w-12 h-12 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4">Comunidade Valhalla</h3>
                <p className="text-xl text-foreground/80 mb-6">
                  Junte-se a mais de 10K membros no Discord para chat, eventos exclusivos e networking
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="netflix-button bg-primary hover:bg-primary/90">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Entrar no Discord
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary/50 hover:border-primary">
                    <Users className="mr-2 h-5 w-5" />
                    Saiba Mais
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialNetworks;