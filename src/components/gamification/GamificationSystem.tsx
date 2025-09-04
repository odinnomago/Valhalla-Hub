'use client';

import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Target, 
  Award, 
  Zap, 
  Gift,
  Music,
  Users,
  Calendar,
  BookOpen,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Badge {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  earned: boolean;
  earnedDate?: string;
}

interface Level {
  id: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  deadline?: string;
}

const GamificationSystem = () => {
  const [points, setPoints] = useState(1250);
  const [level, setLevel] = useState(3);
  const [badges, setBadges] = useState<Badge[]>([
    { 
      id: 'first-upload', 
      name: 'Primeira Música', 
      icon: <Music className="h-5 w-5" />, 
      description: 'Envie sua primeira música', 
      earned: true, 
      earnedDate: '2024-04-15' 
    },
    { 
      id: 'community', 
      name: 'Comunidade', 
      icon: <Users className="h-5 w-5" />, 
      description: 'Participe da comunidade', 
      earned: true, 
      earnedDate: '2024-04-18' 
    },
    { 
      id: 'events', 
      name: 'Eventos', 
      icon: <Calendar className="h-5 w-5" />, 
      description: 'Participe de 5 eventos', 
      earned: false 
    },
    { 
      id: 'learner', 
      name: 'Aprendiz', 
      icon: <BookOpen className="h-5 w-5" />, 
      description: 'Complete 3 cursos', 
      earned: false 
    },
    { 
      id: 'contributor', 
      name: 'Contribuidor', 
      icon: <Gift className="h-5 w-5" />, 
      description: 'Compartilhe 10 vezes', 
      earned: false 
    }
  ]);
  
  const [challenges, setChallenges] = useState<Challenge[]>([
    { 
      id: 'upload-week', 
      title: 'Semana Criativa', 
      description: 'Envie 3 músicas esta semana', 
      points: 150, 
      completed: false 
    },
    { 
      id: 'community-week', 
      title: 'Social', 
      description: 'Comente em 5 posts da comunidade', 
      points: 75, 
      completed: true 
    },
    { 
      id: 'event-month', 
      title: 'Explorador de Eventos', 
      description: 'Participe de 2 eventos este mês', 
      points: 100, 
      completed: false 
    },
    { 
      id: 'course-week', 
      title: 'Aprendiz', 
      description: 'Complete 1 curso esta semana', 
      points: 200, 
      completed: false 
    }
  ]);

  const levels: Level[] = [
    { id: 1, name: 'Iniciante', minPoints: 0, maxPoints: 500, benefits: ['Acesso básico', '5 uploads mensais'] },
    { id: 2, name: 'Explorador', minPoints: 501, maxPoints: 1500, benefits: ['Acesso intermediário', '15 uploads mensais', 'Suporte prioritário'] },
    { id: 3, name: 'Membro', minPoints: 1501, maxPoints: 3500, benefits: ['Acesso completo', 'Uploads ilimitados', 'Suporte 24/7', 'Destaque no perfil'] },
    { id: 4, name: 'Expert', minPoints: 3501, maxPoints: 7500, benefits: ['Todos os benefícios anteriores', 'Taxa reduzida', 'Destaque em eventos'] },
    { id: 5, name: 'Mestre', minPoints: 7501, maxPoints: Infinity, benefits: ['Todos os benefícios Expert', 'Acesso à funcionalidades beta', 'Consultoria personalizada'] }
  ];

  const currentLevel = levels.find(l => level === l.id) || levels[0];
  const nextLevel = levels.find(l => l.id === level + 1);
  const progressToNextLevel = nextLevel 
    ? Math.min(100, Math.max(0, ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100))
    : 100;

  const handleCompleteChallenge = (challengeId: string) => {
    setChallenges(prev => 
      prev.map(challenge => 
        challenge.id === challengeId 
          ? { ...challenge, completed: true } 
          : challenge
      )
    );
    
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setPoints(prev => prev + challenge.points);
    }
  };

  return (
    <div className="space-y-6">
      {/* Points and Level Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seus Pontos</p>
                <p className="text-2xl font-bold">{points.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Seu Nível</p>
                <p className="text-2xl font-bold">{currentLevel.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Conquistas</p>
                <p className="text-2xl font-bold">{badges.filter(b => b.earned).length}/{badges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Progresso para {nextLevel ? nextLevel.name : 'Nível Máximo'}</CardTitle>
          <CardDescription>
            {nextLevel 
              ? `Você precisa de mais ${(nextLevel.minPoints - points).toLocaleString()} pontos`
              : 'Parabéns! Você atingiu o nível máximo.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>{currentLevel.name} ({currentLevel.minPoints} pts)</span>
              {nextLevel && <span>{nextLevel.name} ({nextLevel.minPoints} pts)</span>}
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressToNextLevel}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              {points.toLocaleString()} / {nextLevel ? nextLevel.minPoints.toLocaleString() : currentLevel.maxPoints.toLocaleString()} pontos
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Desafios Semanais</CardTitle>
          <CardDescription>Ganhe pontos completando desafios</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {challenges.map((challenge) => (
              <Card 
                key={challenge.id} 
                className={challenge.completed ? 'border-green-500' : ''}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2">
                        {challenge.title}
                        {challenge.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </h4>
                      <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                    </div>
                    <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">
                      +{challenge.points} pts
                    </div>
                  </div>
                  <div className="mt-4">
                    {challenge.completed ? (
                      <Button disabled size="sm" className="w-full">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Concluído
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        className="w-full"
                        onClick={() => handleCompleteChallenge(challenge.id)}
                      >
                        Completar
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Conquistas</CardTitle>
          <CardDescription>Suas conquistas na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badges.map((badge) => (
              <Card 
                key={badge.id} 
                className={`text-center ${badge.earned ? 'border-primary' : 'opacity-50'}`}
              >
                <CardContent className="p-4">
                  <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    badge.earned ? 'bg-primary/10 text-primary' : 'bg-muted'
                  }`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
                  {badge.earned && badge.earnedDate && (
                    <p className="text-xs text-green-500">Ganho em {badge.earnedDate}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Level Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefícios do Nível {currentLevel.name}</CardTitle>
          <CardDescription>O que você desbloqueou com seu progresso</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {currentLevel.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <Star className="h-4 w-4 text-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamificationSystem;