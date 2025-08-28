import React from 'react';
import { Metadata } from 'next';
import MembershipHero from '@/components/membership/MembershipHero';
import MembershipComparison from '@/components/membership/MembershipComparison';
import MembershipBenefits from '@/components/membership/MembershipBenefits';
import MembershipTestimonials from '@/components/membership/MembershipTestimonials';
import MembershipFAQ from '@/components/membership/MembershipFAQ';
import MembershipCTA from '@/components/membership/MembershipCTA';

export const metadata: Metadata = {
  title: 'Portal de Membros - Valhalla Hub | Transforme sua Paixão em Profissão',
  description: 'Junte-se ao ecossistema completo da música brasileira. Acesso exclusivo a 9 plataformas integradas: Gravadora, Academy, Bookings, Marketing IA, Marketplace e muito mais. Planos a partir de R$ 19,90/mês.',
  keywords: 'portal membros valhalla hub, planos assinatura música, gravadora digital, academy música, booking artistas, marketing musical, marketplace',
  openGraph: {
    title: 'Portal de Membros - Valhalla Hub',
    description: 'Transforme sua paixão em profissão com acesso ao ecossistema completo da música brasileira.',
    type: 'website',
    url: 'https://valhallahub.com.br/membros',
    images: [
      {
        url: '/images/membership-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Portal de Membros Valhalla Hub - Ecossistema Musical Completo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portal de Membros - Valhalla Hub',
    description: 'Acesso ao ecossistema completo da música brasileira',
    images: ['/images/membership-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://valhallahub.com.br/membros',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MembershipPortalPage() {
  return (
    <div className="min-h-screen bg-black">
      <main className="relative">
        {/* Hero Section - Premium presentation like MasterClass */}
        <MembershipHero />
        
        {/* Plan Comparison - Netflix/Spotify inspired pricing table */}
        <MembershipComparison />
        
        {/* Platform Benefits - Showcase 9 integrated platforms */}
        <MembershipBenefits />
        
        {/* Success Stories - Social proof from members */}
        <MembershipTestimonials />
        
        {/* FAQ Section - Address common concerns */}
        <MembershipFAQ />
        
        {/* Final CTA - Conversion optimized */}
        <MembershipCTA />
      </main>
    </div>
  );
}