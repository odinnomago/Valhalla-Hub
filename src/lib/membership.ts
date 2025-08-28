// Membership tier types and configurations inspired by Patreon, Spotify, Netflix, MasterClass, and Adobe Creative Cloud

export type MembershipTier = 'free' | 'basic' | 'pro' | 'elite' | 'business';

export interface PlatformAccess {
  gravadora: {
    demoEvaluations: number | 'unlimited';
    feedbackIncluded: boolean;
    priority: 'standard' | 'high' | 'highest';
  };
  bookings: {
    commissionDiscount: number;
    priority: 'standard' | 'high' | 'highest';
    dedicatedManager: boolean;
  };
  marketingIA: {
    profileAnalysis: number | 'unlimited';
    strategiesIncluded: boolean;
    consultingIncluded: boolean;
    apiAccess: boolean;
  };
  marketplace: {
    discount: number;
    featured: boolean;
    storefront: boolean;
    reducedFees: boolean;
  };
  academy: {
    coursesPerMonth: number | 'unlimited';
    certificates: boolean;
    accounts: number;
    reports: boolean;
  };
  blog: {
    contentLevel: 'general' | 'exclusive' | 'premium' | 'vip' | 'b2b';
    webinars: boolean;
    exclusiveColumns: boolean;
    interviews: boolean;
  };
  eventProduction: {
    ticketDiscount: number;
    earlyAccess: boolean;
    vipPackages: boolean;
    corporatePackages: boolean;
  };
  ticketSales: {
    discount: number;
    earlyAccess: boolean;
    vipAccess: boolean;
    reducedFees: boolean;
  };
  community: {
    access: 'public' | 'basic' | 'pro' | 'elite' | 'business';
    mentorship: 'none' | 'group' | 'individual';
    networking: 'basic' | 'advanced' | 'executive';
  };
}

export interface MembershipBenefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'access' | 'discount' | 'exclusive' | 'support';
  highlight?: boolean;
}

export interface MembershipPlan {
  id: MembershipTier;
  name: string;
  title: string;
  description: string;
  price: {
    monthly: number;
    annually: number;
    currency: string;
  };
  savings: number; // Annual savings percentage
  target: string[];
  popular?: boolean;
  recommended?: boolean;
  color: string;
  gradient: string;
  benefits: MembershipBenefit[];
  platformAccess: PlatformAccess;
  features: {
    badge: string;
    consultingHours: number;
    sampleLibrary: 'none' | 'basic' | 'premium' | 'exclusive';
    reports: 'none' | 'basic' | 'detailed' | 'strategic';
    events: 'public' | 'priority' | 'vip' | 'closed';
  };
  limits: {
    maxProjects?: number;
    storageGB?: number;
    teamMembers?: number;
    apiCalls?: number;
  };
}

// Membership plans configuration
export const membershipPlans: MembershipPlan[] = [
  {
    id: 'free',
    name: 'Free',
    title: 'Acesso Inicial',
    description: 'Para fãs curiosos e artistas iniciantes que querem explorar o ecossistema Valhalla',
    price: {
      monthly: 0,
      annually: 0,
      currency: 'BRL'
    },
    savings: 0,
    target: ['Fãs curiosos', 'Artistas iniciantes', 'Estudantes'],
    color: 'gray',
    gradient: 'from-gray-600 to-gray-700',
    benefits: [
      {
        id: 'free_blog',
        title: 'Blog Completo',
        description: 'Acesso a todos os artigos gerais',
        icon: '📰',
        category: 'access'
      },
      {
        id: 'free_course',
        title: '1 Curso Grátis/Mês',
        description: 'Acesso mensal a curso na Academy',
        icon: '🎓',
        category: 'access'
      },
      {
        id: 'free_events',
        title: 'Eventos Gratuitos',
        description: 'Participação em eventos abertos',
        icon: '🎪',
        category: 'access'
      },
      {
        id: 'free_community',
        title: 'Fóruns Públicos',
        description: 'Acesso a discussões gerais',
        icon: '💬',
        category: 'access'
      }
    ],
    platformAccess: {
      gravadora: {
        demoEvaluations: 1,
        feedbackIncluded: false,
        priority: 'standard'
      },
      bookings: {
        commissionDiscount: 0,
        priority: 'standard',
        dedicatedManager: false
      },
      marketingIA: {
        profileAnalysis: 0,
        strategiesIncluded: false,
        consultingIncluded: false,
        apiAccess: false
      },
      marketplace: {
        discount: 0,
        featured: false,
        storefront: false,
        reducedFees: false
      },
      academy: {
        coursesPerMonth: 1,
        certificates: false,
        accounts: 1,
        reports: false
      },
      blog: {
        contentLevel: 'general',
        webinars: false,
        exclusiveColumns: false,
        interviews: false
      },
      eventProduction: {
        ticketDiscount: 0,
        earlyAccess: false,
        vipPackages: false,
        corporatePackages: false
      },
      ticketSales: {
        discount: 0,
        earlyAccess: false,
        vipAccess: false,
        reducedFees: false
      },
      community: {
        access: 'public',
        mentorship: 'none',
        networking: 'basic'
      }
    },
    features: {
      badge: 'Membro Free',
      consultingHours: 0,
      sampleLibrary: 'none',
      reports: 'none',
      events: 'public'
    },
    limits: {
      maxProjects: 1,
      storageGB: 1
    }
  },
  {
    id: 'basic',
    name: 'Basic',
    title: 'Membro Emergente',
    description: 'Para artistas iniciantes e fãs engajados que querem mais acesso e oportunidades',
    price: {
      monthly: 19.90,
      annually: 199,
      currency: 'BRL'
    },
    savings: 16,
    target: ['Artistas iniciantes', 'Fãs engajados', 'Estudantes de música'],
    color: 'blue',
    gradient: 'from-blue-500 to-cyan-500',
    benefits: [
      {
        id: 'basic_courses',
        title: '3 Cursos/Mês',
        description: 'Acesso ampliado à Academy',
        icon: '🎓',
        category: 'access'
      },
      {
        id: 'basic_exclusive',
        title: 'Conteúdo Exclusivo',
        description: 'Blog com artigos exclusivos',
        icon: '⭐',
        category: 'exclusive'
      },
      {
        id: 'basic_early',
        title: 'Early Access',
        description: 'Lançamentos 7 dias antes',
        icon: '🚀',
        category: 'exclusive'
      },
      {
        id: 'basic_discord',
        title: 'Discord Exclusivo',
        description: 'Grupos fechados para membros',
        icon: '💬',
        category: 'access'
      },
      {
        id: 'basic_qna',
        title: 'Q&A com Artistas',
        description: 'Sessões mensais interativas',
        icon: '🎤',
        category: 'exclusive'
      },
      {
        id: 'basic_discount',
        title: '10% Desconto',
        description: 'Marketplace e eventos',
        icon: '💰',
        category: 'discount'
      }
    ],
    platformAccess: {
      gravadora: {
        demoEvaluations: 2,
        feedbackIncluded: false,
        priority: 'standard'
      },
      bookings: {
        commissionDiscount: 10,
        priority: 'standard',
        dedicatedManager: false
      },
      marketingIA: {
        profileAnalysis: 1,
        strategiesIncluded: false,
        consultingIncluded: false,
        apiAccess: false
      },
      marketplace: {
        discount: 10,
        featured: false,
        storefront: false,
        reducedFees: false
      },
      academy: {
        coursesPerMonth: 3,
        certificates: false,
        accounts: 1,
        reports: false
      },
      blog: {
        contentLevel: 'exclusive',
        webinars: false,
        exclusiveColumns: false,
        interviews: false
      },
      eventProduction: {
        ticketDiscount: 10,
        earlyAccess: false,
        vipPackages: false,
        corporatePackages: false
      },
      ticketSales: {
        discount: 10,
        earlyAccess: false,
        vipAccess: false,
        reducedFees: false
      },
      community: {
        access: 'basic',
        mentorship: 'group',
        networking: 'basic'
      }
    },
    features: {
      badge: 'Membro Basic',
      consultingHours: 0,
      sampleLibrary: 'basic',
      reports: 'basic',
      events: 'priority'
    },
    limits: {
      maxProjects: 3,
      storageGB: 5
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    title: 'Membro Premium',
    description: 'Para artistas em desenvolvimento e produtores que querem acelerar sua carreira',
    price: {
      monthly: 49.90,
      annually: 499,
      currency: 'BRL'
    },
    savings: 16,
    target: ['Artistas em desenvolvimento', 'Produtores', 'Profissionais da música'],
    popular: true,
    color: 'primary',
    gradient: 'from-primary-500 to-secondary-500',
    benefits: [
      {
        id: 'pro_unlimited',
        title: 'Academy Ilimitada',
        description: 'Todos os cursos sem restrição',
        icon: '🎓',
        category: 'access',
        highlight: true
      },
      {
        id: 'pro_gravadora',
        title: 'Gravadora Digital',
        description: 'Conteúdo exclusivo e análises',
        icon: '🎵',
        category: 'exclusive'
      },
      {
        id: 'pro_early_14',
        title: 'Early Access 14 dias',
        description: 'Acesso antecipado estendido',
        icon: '🚀',
        category: 'exclusive'
      },
      {
        id: 'pro_vip',
        title: 'Comunidade VIP',
        description: 'Networking com profissionais',
        icon: '👥',
        category: 'exclusive'
      },
      {
        id: 'pro_mentorship',
        title: 'Mentoria Coletiva',
        description: 'Sessões mensais em grupo',
        icon: '🧠',
        category: 'support'
      },
      {
        id: 'pro_portfolio',
        title: 'Análise de Portfólio',
        description: 'Review pela equipe Valhalla',
        icon: '📊',
        category: 'support'
      },
      {
        id: 'pro_consultation',
        title: '1h Consultoria/Mês',
        description: 'Sessão individual mensal',
        icon: '⏰',
        category: 'support',
        highlight: true
      },
      {
        id: 'pro_discount',
        title: '20% Desconto',
        description: 'Marketplace e booking priority',
        icon: '💰',
        category: 'discount'
      }
    ],
    platformAccess: {
      gravadora: {
        demoEvaluations: 4,
        feedbackIncluded: true,
        priority: 'high'
      },
      bookings: {
        commissionDiscount: 20,
        priority: 'high',
        dedicatedManager: false
      },
      marketingIA: {
        profileAnalysis: 3,
        strategiesIncluded: true,
        consultingIncluded: false,
        apiAccess: false
      },
      marketplace: {
        discount: 20,
        featured: true,
        storefront: false,
        reducedFees: false
      },
      academy: {
        coursesPerMonth: 'unlimited',
        certificates: false,
        accounts: 1,
        reports: false
      },
      blog: {
        contentLevel: 'premium',
        webinars: true,
        exclusiveColumns: false,
        interviews: false
      },
      eventProduction: {
        ticketDiscount: 20,
        earlyAccess: true,
        vipPackages: false,
        corporatePackages: false
      },
      ticketSales: {
        discount: 20,
        earlyAccess: true,
        vipAccess: false,
        reducedFees: false
      },
      community: {
        access: 'pro',
        mentorship: 'group',
        networking: 'advanced'
      }
    },
    features: {
      badge: 'Membro PRO',
      consultingHours: 1,
      sampleLibrary: 'premium',
      reports: 'detailed',
      events: 'vip'
    },
    limits: {
      maxProjects: 10,
      storageGB: 25
    }
  },
  {
    id: 'elite',
    name: 'Elite',
    title: 'Membro Elite',
    description: 'Para artistas estabelecidos e produtores profissionais que buscam o topo',
    price: {
      monthly: 99.90,
      annually: 999,
      currency: 'BRL'
    },
    savings: 16,
    target: ['Artistas estabelecidos', 'Produtores profissionais', 'Empresários musicais'],
    recommended: true,
    color: 'gold',
    gradient: 'from-yellow-500 to-orange-500',
    benefits: [
      {
        id: 'elite_all_access',
        title: 'Acesso Total',
        description: 'Todos os recursos da Gravadora Digital',
        icon: '🎵',
        category: 'access',
        highlight: true
      },
      {
        id: 'elite_event_production',
        title: 'Produção de Eventos',
        description: 'Conteúdo exclusivo e ferramentas',
        icon: '🎪',
        category: 'exclusive'
      },
      {
        id: 'elite_inner_circle',
        title: 'Inner Circle',
        description: 'Comunidade exclusiva Elite',
        icon: '👑',
        category: 'exclusive'
      },
      {
        id: 'elite_individual',
        title: 'Mentoria Individual',
        description: 'Sessões trimestrais 1:1',
        icon: '🧠',
        category: 'support'
      },
      {
        id: 'elite_executive',
        title: 'Networking Executivo',
        description: 'Acesso a executivos da indústria',
        icon: '👥',
        category: 'exclusive'
      },
      {
        id: 'elite_partnerships',
        title: 'Oportunidades Exclusivas',
        description: 'Parcerias com Valhalla Hub',
        icon: '🤝',
        category: 'exclusive'
      },
      {
        id: 'elite_investors',
        title: 'Acesso a Investidores',
        description: 'Rede de investidores e patrocinadores',
        icon: '💎',
        category: 'exclusive',
        highlight: true
      },
      {
        id: 'elite_consultation',
        title: '3h Consultoria/Mês',
        description: 'Sessões com especialistas',
        icon: '⏰',
        category: 'support',
        highlight: true
      },
      {
        id: 'elite_discount',
        title: '30% Desconto',
        description: 'Máximo desconto em tudo',
        icon: '💰',
        category: 'discount'
      }
    ],
    platformAccess: {
      gravadora: {
        demoEvaluations: 'unlimited',
        feedbackIncluded: true,
        priority: 'highest'
      },
      bookings: {
        commissionDiscount: 30,
        priority: 'highest',
        dedicatedManager: true
      },
      marketingIA: {
        profileAnalysis: 'unlimited',
        strategiesIncluded: true,
        consultingIncluded: true,
        apiAccess: false
      },
      marketplace: {
        discount: 30,
        featured: true,
        storefront: true,
        reducedFees: false
      },
      academy: {
        coursesPerMonth: 'unlimited',
        certificates: true,
        accounts: 1,
        reports: false
      },
      blog: {
        contentLevel: 'vip',
        webinars: true,
        exclusiveColumns: true,
        interviews: true
      },
      eventProduction: {
        ticketDiscount: 30,
        earlyAccess: true,
        vipPackages: true,
        corporatePackages: false
      },
      ticketSales: {
        discount: 30,
        earlyAccess: true,
        vipAccess: true,
        reducedFees: false
      },
      community: {
        access: 'elite',
        mentorship: 'individual',
        networking: 'executive'
      }
    },
    features: {
      badge: 'Membro Elite',
      consultingHours: 3,
      sampleLibrary: 'exclusive',
      reports: 'strategic',
      events: 'closed'
    },
    limits: {
      maxProjects: 'unlimited' as any,
      storageGB: 100
    }
  },
  {
    id: 'business',
    name: 'Business',
    title: 'Solução Corporativa',
    description: 'Para estúdios, gravadoras, escolas e empresas do setor musical',
    price: {
      monthly: 299.90,
      annually: 2999,
      currency: 'BRL'
    },
    savings: 16,
    target: ['Estúdios', 'Gravadoras', 'Escolas de música', 'Empresas de eventos'],
    color: 'purple',
    gradient: 'from-purple-500 to-indigo-500',
    benefits: [
      {
        id: 'business_team',
        title: '5 Contas PRO',
        description: 'Para sua equipe completa',
        icon: '👥',
        category: 'access',
        highlight: true
      },
      {
        id: 'business_all_platforms',
        title: 'Acesso Total',
        description: 'Todos os recursos das 9 plataformas',
        icon: '🌐',
        category: 'access'
      },
      {
        id: 'business_b2b',
        title: 'Conteúdo B2B',
        description: 'Materiais exclusivos empresariais',
        icon: '📊',
        category: 'exclusive'
      },
      {
        id: 'business_market_reports',
        title: 'Relatórios de Mercado',
        description: 'Análises e tendências da indústria',
        icon: '📈',
        category: 'exclusive'
      },
      {
        id: 'business_integration',
        title: 'Integração de Sistemas',
        description: 'APIs e conectores customizados',
        icon: '🔗',
        category: 'support'
      },
      {
        id: 'business_collaboration',
        title: 'Ferramentas Colaborativas',
        description: 'Gestão de equipe e projetos',
        icon: '🤝',
        category: 'support'
      },
      {
        id: 'business_partnerships',
        title: 'Parcerias Estratégicas',
        description: 'Oportunidades corporativas exclusivas',
        icon: '💼',
        category: 'exclusive'
      },
      {
        id: 'business_account_manager',
        title: 'Gerente Dedicado',
        description: 'Suporte personalizado para sua empresa',
        icon: '👨‍💼',
        category: 'support',
        highlight: true
      },
      {
        id: 'business_training',
        title: 'Treinamento de Equipe',
        description: 'Capacitação personalizada',
        icon: '🎯',
        category: 'support'
      }
    ],
    platformAccess: {
      gravadora: {
        demoEvaluations: 10,
        feedbackIncluded: true,
        priority: 'highest'
      },
      bookings: {
        commissionDiscount: 25,
        priority: 'highest',
        dedicatedManager: true
      },
      marketingIA: {
        profileAnalysis: 'unlimited',
        strategiesIncluded: true,
        consultingIncluded: true,
        apiAccess: true
      },
      marketplace: {
        discount: 15,
        featured: true,
        storefront: true,
        reducedFees: true
      },
      academy: {
        coursesPerMonth: 'unlimited',
        certificates: true,
        accounts: 10,
        reports: true
      },
      blog: {
        contentLevel: 'b2b',
        webinars: true,
        exclusiveColumns: true,
        interviews: true
      },
      eventProduction: {
        ticketDiscount: 0,
        earlyAccess: true,
        vipPackages: true,
        corporatePackages: true
      },
      ticketSales: {
        discount: 0,
        earlyAccess: true,
        vipAccess: true,
        reducedFees: true
      },
      community: {
        access: 'business',
        mentorship: 'individual',
        networking: 'executive'
      }
    },
    features: {
      badge: 'Parceiro Business',
      consultingHours: 0, // Unlimited via account manager
      sampleLibrary: 'exclusive',
      reports: 'strategic',
      events: 'closed'
    },
    limits: {
      maxProjects: 'unlimited' as any,
      storageGB: 500,
      teamMembers: 10,
      apiCalls: 100000
    }
  }
];

// Helper functions
export const getMembershipPlan = (tier: MembershipTier): MembershipPlan | undefined => {
  return membershipPlans.find(plan => plan.id === tier);
};

export const getPlanFeatures = (tier: MembershipTier) => {
  const plan = getMembershipPlan(tier);
  return plan?.features;
};

export const getPlatformAccess = (tier: MembershipTier) => {
  const plan = getMembershipPlan(tier);
  return plan?.platformAccess;
};

export const canAccessFeature = (userTier: MembershipTier, requiredTier: MembershipTier): boolean => {
  const tierOrder: MembershipTier[] = ['free', 'basic', 'pro', 'elite', 'business'];
  const userIndex = tierOrder.indexOf(userTier);
  const requiredIndex = tierOrder.indexOf(requiredTier);
  return userIndex >= requiredIndex;
};

export const getUpgradeRecommendation = (currentTier: MembershipTier): MembershipTier | null => {
  const tierOrder: MembershipTier[] = ['free', 'basic', 'pro', 'elite', 'business'];
  const currentIndex = tierOrder.indexOf(currentTier);
  
  if (currentIndex < tierOrder.length - 1) {
    return tierOrder[currentIndex + 1];
  }
  
  return null;
};

export const calculateAnnualSavings = (plan: MembershipPlan): number => {
  if (plan.price.monthly === 0) return 0;
  const monthlyTotal = plan.price.monthly * 12;
  return monthlyTotal - plan.price.annually;
};

export const formatPrice = (price: number, currency: string = 'BRL'): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(price);
};