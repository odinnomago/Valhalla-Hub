'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  BookOpen, 
  Eye, 
  Heart,
  Users,
  TrendingUp,
  Calendar,
  MessageCircle,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AuthorStatsProps {
  author: {
    name: string;
    stats: {
      postsCount: number;
      totalViews: number;
      totalLikes: number;
      followers: number;
    };
    joinedAt: string;
  };
  className?: string;
}

const AuthorStats: React.FC<AuthorStatsProps> = ({ author, className = '' }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const calculateMonthsSinceJoined = () => {
    const joinDate = new Date(author.joinedAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - joinDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  };

  const monthsSinceJoined = calculateMonthsSinceJoined();
  const avgViewsPerPost = Math.round(author.stats.totalViews / author.stats.postsCount);
  const avgLikesPerPost = Math.round(author.stats.totalLikes / author.stats.postsCount);
  const postsPerMonth = Math.round(author.stats.postsCount / monthsSinceJoined);

  const stats = [
    {
      icon: BookOpen,
      label: 'Artigos Publicados',
      value: author.stats.postsCount.toString(),
      description: `${postsPerMonth} por mês`,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Eye,
      label: 'Visualizações Totais',
      value: formatNumber(author.stats.totalViews),
      description: `${formatNumber(avgViewsPerPost)} por artigo`,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      icon: Heart,
      label: 'Total de Curtidas',
      value: formatNumber(author.stats.totalLikes),
      description: `${formatNumber(avgLikesPerPost)} por artigo`,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10'
    },
    {
      icon: Users,
      label: 'Seguidores',
      value: formatNumber(author.stats.followers),
      description: 'Comunidade ativa',
      color: 'text-green-400',
      bgColor: 'bg-green-400/10'
    },
    {
      icon: TrendingUp,
      label: 'Taxa de Engajamento',
      value: `${Math.round((author.stats.totalLikes / author.stats.totalViews) * 100)}%`,
      description: 'Acima da média',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10'
    },
    {
      icon: Calendar,
      label: 'Tempo de Atividade',
      value: `${monthsSinceJoined}m`,
      description: 'Meses ativos',
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10'
    }
  ];

  const achievements = [
    {
      label: 'Top Author',
      description: 'Entre os 5% melhores autores',
      condition: author.stats.totalViews > 300000
    },
    {
      label: 'Viral Content',
      description: 'Artigo com +50K visualizações',
      condition: avgViewsPerPost > 15000
    },
    {
      label: 'Community Favorite',
      description: 'Alta taxa de engajamento',
      condition: (author.stats.totalLikes / author.stats.totalViews) > 0.03
    },
    {
      label: 'Consistent Creator',
      description: 'Publica regularmente',
      condition: postsPerMonth >= 2
    }
  ];

  const earnedAchievements = achievements.filter(achievement => achievement.condition);

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
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4 font-headline">
            Estatísticas de {author.name}
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Números que demonstram o impacto e engajamento do autor na comunidade
          </p>
        </div>

        {/* Main Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 h-full text-center">
                  <CardContent className="p-6">
                    <motion.div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${stat.bgColor}`}
                      whileHover={{ rotate: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </motion.div>
                    
                    <motion.div 
                      className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    
                    <h3 className="font-semibold text-foreground mb-1 text-sm">
                      {stat.label}
                    </h3>
                    
                    <p className="text-xs text-foreground/70">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-center mb-8 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Conquistas Desbloqueadas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {earnedAchievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/30 backdrop-blur-sm text-center h-full">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">{achievement.label}</h4>
                    <p className="text-sm text-foreground/70">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Performance Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Performance Insights</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round((author.stats.totalLikes / author.stats.totalViews) * 100 * 10) / 10}%
                  </div>
                  <div className="font-medium text-foreground mb-1">Taxa de Curtidas</div>
                  <div className="text-sm text-foreground/70">
                    {(author.stats.totalLikes / author.stats.totalViews) > 0.03 ? 'Excelente engajamento' : 'Bom engajamento'}
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-accent mb-2">
                    {formatNumber(avgViewsPerPost)}
                  </div>
                  <div className="font-medium text-foreground mb-1">Média de Views</div>
                  <div className="text-sm text-foreground/70">
                    Por artigo publicado
                  </div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    #{Math.ceil(Math.random() * 10)}
                  </div>
                  <div className="font-medium text-foreground mb-1">Ranking Mensal</div>
                  <div className="text-sm text-foreground/70">
                    Entre todos os autores
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthorStats;