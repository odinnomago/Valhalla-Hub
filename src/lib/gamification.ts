// Gamification system inspired by successful platforms like Patreon, Adobe Creative Cloud, and Discord Nitro

export interface UserPoints {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  lifetime: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'engagement' | 'learning' | 'community' | 'creation' | 'milestone';
  points: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: string;
    value: number;
    timeframe?: string;
  }[];
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  type: 'badge' | 'discount' | 'exclusive' | 'mentorship' | 'physical' | 'experience';
  cost: number;
  availability: 'limited' | 'unlimited';
  stock?: number;
  requiredTier?: 'free' | 'basic' | 'pro' | 'elite' | 'business';
  expiresAt?: Date;
  image?: string;
  value?: number; // For discounts
}

export interface UserProgress {
  level: number;
  experience: number;
  experienceToNextLevel: number;
  streak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };
  achievements: Achievement[];
  redeemedRewards: string[];
  points: UserPoints;
}

// Points system configuration
export const pointsConfig = {
  daily_login: 5,
  course_completion: 50,
  course_start: 10,
  blog_read: 3,
  blog_share: 10,
  event_attendance: 30,
  event_registration: 5,
  community_post: 15,
  community_reply: 8,
  community_like: 2,
  community_help: 20,
  demo_submission: 25,
  collaboration_started: 40,
  collaboration_completed: 80,
  profile_completion: 30,
  referral_signup: 100,
  referral_conversion: 200,
  first_purchase: 150,
  tier_upgrade: 300,
  content_creation: 60,
  newsletter_signup: 15,
  social_share: 5,
  review_submission: 25,
  feedback_given: 20,
  mentor_session: 100,
  challenge_participation: 35,
  contest_entry: 50,
  workshop_attendance: 45
};

// Level progression system (exponential growth)
export const levelRequirements = [
  0,     // Level 1
  100,   // Level 2
  250,   // Level 3
  450,   // Level 4
  700,   // Level 5
  1000,  // Level 6
  1350,  // Level 7
  1750,  // Level 8
  2200,  // Level 9
  2700,  // Level 10
  3250,  // Level 11
  3850,  // Level 12
  4500,  // Level 13
  5200,  // Level 14
  5950,  // Level 15
  6750,  // Level 16
  7600,  // Level 17
  8500,  // Level 18
  9450,  // Level 19
  10500, // Level 20
  12000, // Level 21+
  13500,
  15000,
  16500,
  18000,
  20000,
  22500,
  25000,
  27500,
  30000  // Level 30 (Master)
];

// Achievements configuration
export const achievements: Achievement[] = [
  // Engagement Achievements
  {
    id: 'first_login',
    name: 'Bem-vindo!',
    description: 'Fez seu primeiro login no Valhalla Hub',
    icon: '👋',
    category: 'engagement',
    points: 10,
    rarity: 'common',
    requirements: [
      { type: 'login_count', value: 1 }
    ]
  },
  {
    id: 'daily_warrior',
    name: 'Guerreiro Diário',
    description: 'Manteve uma sequência de 7 dias consecutivos',
    icon: '🔥',
    category: 'engagement',
    points: 50,
    rarity: 'uncommon',
    requirements: [
      { type: 'daily_streak', value: 7 }
    ]
  },
  {
    id: 'monthly_master',
    name: 'Mestre Mensal',
    description: 'Manteve uma sequência de 30 dias consecutivos',
    icon: '💎',
    category: 'engagement',
    points: 200,
    rarity: 'rare',
    requirements: [
      { type: 'daily_streak', value: 30 }
    ]
  },
  {
    id: 'legendary_streaker',
    name: 'Lenda da Constância',
    description: 'Manteve uma sequência de 100 dias consecutivos',
    icon: '👑',
    category: 'engagement',
    points: 1000,
    rarity: 'legendary',
    requirements: [
      { type: 'daily_streak', value: 100 }
    ]
  },

  // Learning Achievements
  {
    id: 'first_course',
    name: 'Primeiro Passo',
    description: 'Completou seu primeiro curso na Academy',
    icon: '🎓',
    category: 'learning',
    points: 50,
    rarity: 'common',
    requirements: [
      { type: 'courses_completed', value: 1 }
    ]
  },
  {
    id: 'knowledge_seeker',
    name: 'Buscador do Conhecimento',
    description: 'Completou 10 cursos na Academy',
    icon: '📚',
    category: 'learning',
    points: 300,
    rarity: 'uncommon',
    requirements: [
      { type: 'courses_completed', value: 10 }
    ]
  },
  {
    id: 'academy_master',
    name: 'Mestre da Academy',
    description: 'Completou 50 cursos na Academy',
    icon: '🧠',
    category: 'learning',
    points: 1000,
    rarity: 'rare',
    requirements: [
      { type: 'courses_completed', value: 50 }
    ]
  },
  {
    id: 'speed_learner',
    name: 'Aprendiz Veloz',
    description: 'Completou 5 cursos em uma semana',
    icon: '⚡',
    category: 'learning',
    points: 150,
    rarity: 'uncommon',
    requirements: [
      { type: 'courses_completed', value: 5, timeframe: 'week' }
    ]
  },

  // Community Achievements
  {
    id: 'first_post',
    name: 'Primeira Palavra',
    description: 'Fez sua primeira postagem na comunidade',
    icon: '💬',
    category: 'community',
    points: 20,
    rarity: 'common',
    requirements: [
      { type: 'community_posts', value: 1 }
    ]
  },
  {
    id: 'community_star',
    name: 'Estrela da Comunidade',
    description: 'Recebeu 100 likes em suas postagens',
    icon: '⭐',
    category: 'community',
    points: 200,
    rarity: 'uncommon',
    requirements: [
      { type: 'community_likes_received', value: 100 }
    ]
  },
  {
    id: 'helpful_member',
    name: 'Membro Prestativo',
    description: 'Ajudou 50 membros da comunidade',
    icon: '🤝',
    category: 'community',
    points: 300,
    rarity: 'rare',
    requirements: [
      { type: 'help_given', value: 50 }
    ]
  },
  {
    id: 'mentor_legend',
    name: 'Lenda Mentora',
    description: 'Participou de 20 sessões de mentoria',
    icon: '🧑‍🏫',
    category: 'community',
    points: 500,
    rarity: 'epic',
    requirements: [
      { type: 'mentor_sessions', value: 20 }
    ]
  },

  // Creation Achievements
  {
    id: 'first_demo',
    name: 'Primeira Demo',
    description: 'Enviou sua primeira demo para avaliação',
    icon: '🎵',
    category: 'creation',
    points: 75,
    rarity: 'common',
    requirements: [
      { type: 'demos_submitted', value: 1 }
    ]
  },
  {
    id: 'prolific_creator',
    name: 'Criador Prolífico',
    description: 'Enviou 10 demos para avaliação',
    icon: '🎼',
    category: 'creation',
    points: 400,
    rarity: 'uncommon',
    requirements: [
      { type: 'demos_submitted', value: 10 }
    ]
  },
  {
    id: 'collaboration_king',
    name: 'Rei da Colaboração',
    description: 'Participou de 25 colaborações musicais',
    icon: '👥',
    category: 'creation',
    points: 600,
    rarity: 'rare',
    requirements: [
      { type: 'collaborations', value: 25 }
    ]
  },
  {
    id: 'content_creator',
    name: 'Criador de Conteúdo',
    description: 'Publicou 5 artigos no blog da comunidade',
    icon: '✍️',
    category: 'creation',
    points: 250,
    rarity: 'uncommon',
    requirements: [
      { type: 'content_published', value: 5 }
    ]
  },

  // Milestone Achievements
  {
    id: 'first_month',
    name: 'Novato',
    description: 'Completou seu primeiro mês na plataforma',
    icon: '🌱',
    category: 'milestone',
    points: 100,
    rarity: 'common',
    requirements: [
      { type: 'days_since_signup', value: 30 }
    ]
  },
  {
    id: 'loyal_member',
    name: 'Membro Leal',
    description: 'Completou 1 ano na plataforma',
    icon: '🎂',
    category: 'milestone',
    points: 500,
    rarity: 'rare',
    requirements: [
      { type: 'days_since_signup', value: 365 }
    ]
  },
  {
    id: 'tier_climber',
    name: 'Escalador de Níveis',
    description: 'Fez upgrade para um plano pago',
    icon: '📈',
    category: 'milestone',
    points: 300,
    rarity: 'uncommon',
    requirements: [
      { type: 'tier_upgrades', value: 1 }
    ]
  },
  {
    id: 'elite_member',
    name: 'Membro Elite',
    description: 'Alcançou o plano Elite',
    icon: '💎',
    category: 'milestone',
    points: 1000,
    rarity: 'epic',
    requirements: [
      { type: 'current_tier', value: 'elite' as any }
    ]
  }
];

// Rewards store
export const rewards: Reward[] = [
  // Badges
  {
    id: 'early_bird_badge',
    name: 'Badge Early Bird',
    description: 'Badge exclusivo para primeiros membros',
    type: 'badge',
    cost: 100,
    availability: 'unlimited'
  },
  {
    id: 'community_champion_badge',
    name: 'Badge Campeão da Comunidade',
    description: 'Para membros ativos na comunidade',
    type: 'badge',
    cost: 250,
    availability: 'unlimited'
  },

  // Discounts
  {
    id: 'marketplace_10_discount',
    name: '10% Desconto Marketplace',
    description: 'Desconto de 10% em qualquer compra no Marketplace',
    type: 'discount',
    cost: 150,
    availability: 'unlimited',
    value: 10,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  },
  {
    id: 'event_20_discount',
    name: '20% Desconto Eventos',
    description: 'Desconto de 20% em ingressos de eventos',
    type: 'discount',
    cost: 200,
    availability: 'unlimited',
    value: 20,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000) // 60 days
  },

  // Exclusive Content
  {
    id: 'exclusive_sample_pack',
    name: 'Sample Pack Exclusivo',
    description: 'Pack de samples criado pelos artistas Valhalla',
    type: 'exclusive',
    cost: 300,
    availability: 'limited',
    stock: 100
  },
  {
    id: 'behind_scenes_access',
    name: 'Acesso Behind the Scenes',
    description: '30 dias de conteúdo exclusivo dos bastidores',
    type: 'exclusive',
    cost: 400,
    availability: 'unlimited',
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  },

  // Mentorship
  {
    id: 'mentorship_session_30min',
    name: 'Sessão de Mentoria (30min)',
    description: 'Sessão individual de 30 minutos com especialista',
    type: 'mentorship',
    cost: 500,
    availability: 'limited',
    stock: 20,
    requiredTier: 'basic'
  },
  {
    id: 'mentorship_session_60min',
    name: 'Sessão de Mentoria (60min)',
    description: 'Sessão individual de 60 minutos com especialista',
    type: 'mentorship',
    cost: 800,
    availability: 'limited',
    stock: 10,
    requiredTier: 'pro'
  },

  // Physical Rewards
  {
    id: 'valhalla_tshirt',
    name: 'Camiseta Valhalla Hub',
    description: 'Camiseta oficial edição limitada',
    type: 'physical',
    cost: 1000,
    availability: 'limited',
    stock: 50,
    requiredTier: 'basic'
  },
  {
    id: 'signed_vinyl',
    name: 'Vinil Autografado',
    description: 'Vinil autografado por artista Valhalla',
    type: 'physical',
    cost: 2000,
    availability: 'limited',
    stock: 25,
    requiredTier: 'pro'
  },

  // Experiences
  {
    id: 'studio_visit',
    name: 'Visita ao Estúdio',
    description: 'Tour exclusivo pelos estúdios Valhalla',
    type: 'experience',
    cost: 1500,
    availability: 'limited',
    stock: 12,
    requiredTier: 'pro'
  },
  {
    id: 'artist_meetup',
    name: 'Meet & Greet Exclusivo',
    description: 'Encontro exclusivo com artista Valhalla',
    type: 'experience',
    cost: 3000,
    availability: 'limited',
    stock: 8,
    requiredTier: 'elite'
  }
];

// Helper functions
export const calculateLevel = (experience: number): number => {
  for (let i = levelRequirements.length - 1; i >= 0; i--) {
    if (experience >= levelRequirements[i]) {
      return i + 1;
    }
  }
  return 1;
};

export const getExperienceForNextLevel = (currentExperience: number): number => {
  const currentLevel = calculateLevel(currentExperience);
  if (currentLevel >= levelRequirements.length) {
    return 0; // Max level reached
  }
  return levelRequirements[currentLevel] - currentExperience;
};

export const awardPoints = (userId: string, action: keyof typeof pointsConfig): number => {
  const points = pointsConfig[action] || 0;
  // Here you would update the user's points in the database
  console.log(`Awarded ${points} points to user ${userId} for action: ${action}`);
  return points;
};

export const checkAchievements = (userProgress: UserProgress): Achievement[] => {
  const newAchievements: Achievement[] = [];
  
  achievements.forEach(achievement => {
    const alreadyUnlocked = userProgress.achievements.some(a => a.id === achievement.id);
    if (alreadyUnlocked) return;

    const requirementsMet = achievement.requirements.every(req => {
      // This would check against actual user data
      switch (req.type) {
        case 'login_count':
          return userProgress.points.total >= req.value; // Simplified check
        case 'courses_completed':
          return userProgress.achievements.filter(a => a.category === 'learning').length >= req.value;
        // Add more requirement checks as needed
        default:
          return false;
      }
    });

    if (requirementsMet) {
      newAchievements.push({
        ...achievement,
        unlockedAt: new Date()
      });
    }
  });

  return newAchievements;
};

export const canRedeemReward = (
  userPoints: number, 
  userTier: string, 
  reward: Reward
): boolean => {
  if (userPoints < reward.cost) return false;
  if (reward.requiredTier && !canAccessTier(userTier, reward.requiredTier)) return false;
  if (reward.availability === 'limited' && reward.stock && reward.stock <= 0) return false;
  if (reward.expiresAt && reward.expiresAt < new Date()) return false;
  
  return true;
};

export const canAccessTier = (userTier: string, requiredTier: string): boolean => {
  const tierOrder = ['free', 'basic', 'pro', 'elite', 'business'];
  const userIndex = tierOrder.indexOf(userTier);
  const requiredIndex = tierOrder.indexOf(requiredTier);
  return userIndex >= requiredIndex;
};

export const getRewardsByType = (type: Reward['type']): Reward[] => {
  return rewards.filter(reward => reward.type === type);
};

export const getAchievementsByCategory = (category: Achievement['category']): Achievement[] => {
  return achievements.filter(achievement => achievement.category === category);
};

export const calculateStreakBonus = (streakDays: number): number => {
  if (streakDays >= 30) return 3; // 3x multiplier for 30+ days
  if (streakDays >= 14) return 2; // 2x multiplier for 14+ days
  if (streakDays >= 7) return 1.5; // 1.5x multiplier for 7+ days
  return 1; // Base multiplier
};

export const getUserLevel = (experience: number) => {
  const level = calculateLevel(experience);
  
  // Level titles based on experience
  const titles = [
    'Novato',
    'Aprendiz',
    'Estudante',
    'Praticante',
    'Habilidoso',
    'Proficiente',
    'Avançado',
    'Especialista',
    'Mestre',
    'Lenda'
  ];
  
  const title = level <= titles.length ? titles[level - 1] : 'Lenda';
  
  return {
    level,
    title,
    experience
  };
};

export const getNextLevelProgress = (currentExperience: number) => {
  const currentLevel = calculateLevel(currentExperience);
  const nextLevel = currentLevel + 1;
  
  // If already at max level
  if (currentLevel >= levelRequirements.length) {
    return {
      current: 0,
      required: 0,
      percentage: 100,
      pointsNeeded: 0
    };
  }
  
  const currentLevelStartXP = levelRequirements[currentLevel - 1] || 0;
  const nextLevelStartXP = levelRequirements[currentLevel];
  
  const progressInCurrentLevel = currentExperience - currentLevelStartXP;
  const xpNeededForNextLevel = nextLevelStartXP - currentLevelStartXP;
  const percentage = Math.min((progressInCurrentLevel / xpNeededForNextLevel) * 100, 100);
  
  return {
    current: progressInCurrentLevel,
    required: xpNeededForNextLevel,
    percentage: Math.round(percentage),
    pointsNeeded: nextLevelStartXP - currentExperience
  };
};

export const getDailyMissions = (): Array<{
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
}> => {
  return [
    {
      id: 'daily_login',
      title: 'Login Diário',
      description: 'Faça login na plataforma',
      points: 5,
      progress: 0,
      maxProgress: 1,
      completed: false
    },
    {
      id: 'read_article',
      title: 'Leitor Ativo',
      description: 'Leia 1 artigo do blog',
      points: 10,
      progress: 0,
      maxProgress: 1,
      completed: false
    },
    {
      id: 'community_interaction',
      title: 'Participação Social',
      description: 'Interaja na comunidade (post, like ou comentário)',
      points: 15,
      progress: 0,
      maxProgress: 1,
      completed: false
    }
  ];
};