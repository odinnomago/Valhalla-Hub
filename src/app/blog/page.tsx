import React from 'react';
import { Metadata } from 'next';
import {
  BlogFilters,
  BlogGrid,
  FeaturedPosts,
  NewsletterCTA,
  SEOComponent
} from '@/components/blog';
import { seoManager } from '@/lib/seo';

export const metadata: Metadata = seoManager.generateBlogHomeMetadata();

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <SEOComponent
        websiteData={seoManager.generateWebsiteStructuredData()}
        breadcrumbData={seoManager.generateBreadcrumbStructuredData([
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' }
        ])}
      />
      
      <main className="relative">
        {/* Featured Posts */}
        <FeaturedPosts />
        
        {/* Filters and Search */}
        <BlogFilters />
        
        {/* Main Blog Grid */}
        <BlogGrid />
        
        {/* Newsletter CTA */}
        <NewsletterCTA variant="main" />
      </main>
    </div>
  );
}