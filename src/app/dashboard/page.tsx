'use client';

import React from 'react';
// Removed Metadata import since we can't use it with "use client"
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';
import DashboardRecentActivity from '@/components/dashboard/DashboardRecentActivity';
import DashboardOpportunities from '@/components/dashboard/DashboardOpportunities';
import DashboardProgress from '@/components/dashboard/DashboardProgress';
import DashboardCommunity from '@/components/dashboard/DashboardCommunity';
import DashboardUpgrade from '@/components/dashboard/DashboardUpgrade';

// Removed metadata export since it's not allowed with "use client"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative">
        {/* Header with welcome message and tier info */}
        <DashboardHeader />
        
        {/* Stats overview */}
        <DashboardStats />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <DashboardQuickActions />
              
              {/* Recent Activity */}
              <DashboardRecentActivity />
              
              {/* Learning Progress */}
              <DashboardProgress />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* New Opportunities */}
              <DashboardOpportunities />
              
              {/* Community Activity */}
              <DashboardCommunity />
              
              {/* Upgrade Suggestions */}
              <DashboardUpgrade />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}