import React from 'react';
import { Metadata } from 'next';
import AcademyHero from '@/components/academy/AcademyHero';
import CourseCatalog from '@/components/academy/CourseCatalog';
import FeaturedInstructors from '@/components/academy/FeaturedInstructors';
import PricingPlans from '@/components/academy/PricingPlans';

export const metadata: Metadata = {
  title: 'Academy - Valhalla Hub | Your Music Universe',
  description: 'Transforme sua paixão em profissão. Aprenda música com os melhores profissionais da indústria. Cursos de produção musical, carreira artística, tecnologia musical e muito mais.',
  keywords: 'cursos música online, produção musical, carreira artística, academy valhalla hub, educação musical, certificações música, your music universe',
  openGraph: {
    title: 'Academy - Valhalla Hub | Your Music Universe',
    description: 'Transforme sua paixão em profissão. Cursos com artistas renomados, certificações reconhecidas e comunidade ativa no seu universo musical.',
    type: 'website',
    url: 'https://valhallahub.com.br/academy',
    images: [
      {
        url: '/images/academy-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Academy Valhalla Hub - Your Music Universe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Academy - Valhalla Hub | Your Music Universe',
    description: 'Transforme sua paixão em profissão. Educação musical online com artistas renomados.',
    images: ['/images/academy-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://valhallahub.com.br/academy',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {/* Hero Section - Inspired by MasterClass premium experience */}
        <AcademyHero />
        
        {/* Featured Courses - Inspired by Udemy's marketplace approach */}
        <CourseCatalog />
        
        {/* Featured Instructors - Inspired by MasterClass celebrity approach */}
        <FeaturedInstructors />
        
        {/* Pricing Plans - Inspired by Skillshare's subscription model */}
        <PricingPlans />
      </main>
    </div>
  );
}