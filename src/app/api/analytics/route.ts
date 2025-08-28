import { NextRequest, NextResponse } from 'next/server';

export interface AnalyticsEvent {
  id: string;
  userId: string;
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId?: string;
  userAgent?: string;
  ip?: string;
}

export interface MembershipMetrics {
  // Conversion Metrics
  conversionRate: number;
  upgradeRate: number;
  churnRate: number;
  ltv: number; // Lifetime Value
  arpu: number; // Average Revenue Per User
  
  // Engagement Metrics
  dailyActiveUsers: number;
  monthlyActiveUsers: number;
  sessionDuration: number;
  featuresUsed: string[];
  
  // Financial Metrics
  mrr: number; // Monthly Recurring Revenue
  arr: number; // Annual Recurring Revenue
  revenueGrowth: number;
  
  // By Plan
  planDistribution: Record<string, number>;
  planRevenue: Record<string, number>;
  
  // Time period
  period: string;
  generatedAt: Date;
}

class AnalyticsService {
  private events: AnalyticsEvent[] = [];
  
  // Track user events
  async trackEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp'>) {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      id: this.generateId(),
      timestamp: new Date(),
    };
    
    this.events.push(analyticsEvent);
    
    // In a real implementation, this would send to analytics service
    console.log('Analytics Event:', analyticsEvent);
    
    // Store in database or send to external service
    await this.storeEvent(analyticsEvent);
    
    return analyticsEvent;
  }
  
  // Generate membership metrics
  async generateMetrics(period: string = '30d'): Promise<MembershipMetrics> {
    const endDate = new Date();
    const startDate = new Date();
    
    // Calculate date range
    switch (period) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }
    
    // Filter events for the period
    const periodEvents = this.events.filter(
      event => event.timestamp >= startDate && event.timestamp <= endDate
    );
    
    // Calculate metrics
    const metrics: MembershipMetrics = {
      // Conversion metrics
      conversionRate: this.calculateConversionRate(periodEvents),
      upgradeRate: this.calculateUpgradeRate(periodEvents),
      churnRate: this.calculateChurnRate(periodEvents),
      ltv: this.calculateLTV(periodEvents),
      arpu: this.calculateARPU(periodEvents),
      
      // Engagement metrics
      dailyActiveUsers: this.calculateDAU(periodEvents),
      monthlyActiveUsers: this.calculateMAU(periodEvents),
      sessionDuration: this.calculateAvgSessionDuration(periodEvents),
      featuresUsed: this.getMostUsedFeatures(periodEvents),
      
      // Financial metrics
      mrr: this.calculateMRR(periodEvents),
      arr: this.calculateARR(periodEvents),
      revenueGrowth: this.calculateRevenueGrowth(periodEvents),
      
      // Plan distribution
      planDistribution: this.calculatePlanDistribution(periodEvents),
      planRevenue: this.calculatePlanRevenue(periodEvents),
      
      period,
      generatedAt: new Date(),
    };
    
    return metrics;
  }
  
  private calculateConversionRate(events: AnalyticsEvent[]): number {
    const signups = events.filter(e => e.event === 'user_signup').length;
    const subscriptions = events.filter(e => e.event === 'subscription_created').length;
    
    return signups > 0 ? (subscriptions / signups) * 100 : 0;
  }
  
  private calculateUpgradeRate(events: AnalyticsEvent[]): number {
    const upgrades = events.filter(e => e.event === 'subscription_upgraded').length;
    const activeSubscriptions = events.filter(e => e.event === 'subscription_active').length;
    
    return activeSubscriptions > 0 ? (upgrades / activeSubscriptions) * 100 : 0;
  }
  
  private calculateChurnRate(events: AnalyticsEvent[]): number {
    const cancellations = events.filter(e => e.event === 'subscription_canceled').length;
    const activeSubscriptions = events.filter(e => e.event === 'subscription_active').length;
    
    return activeSubscriptions > 0 ? (cancellations / activeSubscriptions) * 100 : 0;
  }
  
  private calculateLTV(events: AnalyticsEvent[]): number {
    // Simplified LTV calculation
    const avgMonthlyRevenue = this.calculateARPU(events);
    const avgLifetimeMonths = 24; // Assume 24 months average
    
    return avgMonthlyRevenue * avgLifetimeMonths;
  }
  
  private calculateARPU(events: AnalyticsEvent[]): number {
    const revenueEvents = events.filter(e => e.event === 'payment_succeeded');
    const totalRevenue = revenueEvents.reduce((sum, event) => {
      return sum + (event.properties.amount || 0);
    }, 0);
    
    const uniqueUsers = new Set(revenueEvents.map(e => e.userId)).size;
    
    return uniqueUsers > 0 ? totalRevenue / uniqueUsers : 0;
  }
  
  private calculateDAU(events: AnalyticsEvent[]): number {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    
    const todayEvents = events.filter(e => e.timestamp >= startOfDay);
    const uniqueUsers = new Set(todayEvents.map(e => e.userId));
    
    return uniqueUsers.size;
  }
  
  private calculateMAU(events: AnalyticsEvent[]): number {
    const uniqueUsers = new Set(events.map(e => e.userId));
    return uniqueUsers.size;
  }
  
  private calculateAvgSessionDuration(events: AnalyticsEvent[]): number {
    const sessionEvents = events.filter(e => e.event === 'session_end');
    const totalDuration = sessionEvents.reduce((sum, event) => {
      return sum + (event.properties.duration || 0);
    }, 0);
    
    return sessionEvents.length > 0 ? totalDuration / sessionEvents.length : 0;
  }
  
  private getMostUsedFeatures(events: AnalyticsEvent[]): string[] {
    const featureEvents = events.filter(e => e.event === 'feature_used');
    const featureCounts: Record<string, number> = {};
    
    featureEvents.forEach(event => {
      const feature = event.properties.feature;
      featureCounts[feature] = (featureCounts[feature] || 0) + 1;
    });
    
    return Object.entries(featureCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([feature]) => feature);
  }
  
  private calculateMRR(events: AnalyticsEvent[]): number {
    const subscriptionEvents = events.filter(e => e.event === 'subscription_created');
    const monthlyRevenue = subscriptionEvents.reduce((sum, event) => {
      const amount = event.properties.amount || 0;
      const isAnnual = event.properties.isAnnual || false;
      
      return sum + (isAnnual ? amount / 12 : amount);
    }, 0);
    
    return monthlyRevenue;
  }
  
  private calculateARR(events: AnalyticsEvent[]): number {
    return this.calculateMRR(events) * 12;
  }
  
  private calculateRevenueGrowth(events: AnalyticsEvent[]): number {
    // Simplified revenue growth calculation
    const currentMRR = this.calculateMRR(events);
    const previousMRR = currentMRR * 0.9; // Assume 10% growth for demo
    
    return previousMRR > 0 ? ((currentMRR - previousMRR) / previousMRR) * 100 : 0;
  }
  
  private calculatePlanDistribution(events: AnalyticsEvent[]): Record<string, number> {
    const subscriptionEvents = events.filter(e => e.event === 'subscription_created');
    const planCounts: Record<string, number> = {};
    
    subscriptionEvents.forEach(event => {
      const plan = event.properties.planId;
      planCounts[plan] = (planCounts[plan] || 0) + 1;
    });
    
    return planCounts;
  }
  
  private calculatePlanRevenue(events: AnalyticsEvent[]): Record<string, number> {
    const revenueEvents = events.filter(e => e.event === 'payment_succeeded');
    const planRevenue: Record<string, number> = {};
    
    revenueEvents.forEach(event => {
      const plan = event.properties.planId;
      const amount = event.properties.amount || 0;
      planRevenue[plan] = (planRevenue[plan] || 0) + amount;
    });
    
    return planRevenue;
  }
  
  private async storeEvent(event: AnalyticsEvent) {
    // In a real implementation, store in database
    console.log('Storing event:', event.event, event.properties);
  }
  
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
  
  // Get conversion funnel data
  async getConversionFunnel(period: string = '30d') {
    const metrics = await this.generateMetrics(period);
    
    return {
      visitors: 10000, // Would come from website analytics
      signups: 1500,
      trials: 850,
      subscriptions: 340,
      upgrades: 68,
      
      // Conversion rates
      visitorToSignup: 15.0,
      signupToTrial: 56.7,
      trialToSubscription: 40.0,
      subscriptionToUpgrade: 20.0,
    };
  }
  
  // Get cohort analysis
  async getCohortAnalysis() {
    return {
      cohorts: [
        { month: 'Jan 2024', users: 150, retention: { month1: 85, month2: 72, month3: 68 } },
        { month: 'Feb 2024', users: 200, retention: { month1: 88, month2: 75, month3: 70 } },
        { month: 'Mar 2024', users: 250, retention: { month1: 90, month2: 78, month3: 72 } },
      ],
    };
  }
}

// API Routes for analytics
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') || '30d';
  const type = searchParams.get('type') || 'metrics';
  
  const analytics = new AnalyticsService();
  
  try {
    switch (type) {
      case 'metrics':
        const metrics = await analytics.generateMetrics(period);
        return NextResponse.json(metrics);
        
      case 'funnel':
        const funnel = await analytics.getConversionFunnel(period);
        return NextResponse.json(funnel);
        
      case 'cohort':
        const cohort = await analytics.getCohortAnalysis();
        return NextResponse.json(cohort);
        
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to generate analytics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, userId, properties, sessionId } = body;
    
    if (!event || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const analytics = new AnalyticsService();
    const trackedEvent = await analytics.trackEvent({
      event,
      userId,
      properties: properties || {},
      sessionId,
      userAgent: request.headers.get('user-agent') || undefined,
      ip: request.headers.get('x-forwarded-for') || undefined,
    });
    
    return NextResponse.json({ success: true, eventId: trackedEvent.id });
    
  } catch (error) {
    console.error('Event tracking error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export { AnalyticsService };