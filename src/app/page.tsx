import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Star, 
  BookOpen, 
  Music, 
  Users, 
  Ticket, 
  ShoppingCart, 
  GraduationCap, 
  Mic, 
  Store, 
  Globe,
  Clock
} from 'lucide-react';
import { artists, events, posts, courses, products, testimonials } from '@/lib/mock-data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Valhalla Hub - Ecossistema Completo para Artistas e Fãs",
  description: "Descubra, crie, conecte-se e monetize sua paixão pela música com nossas 9 plataformas integradas: Gravadora, Bookings, Marketing IA, Marketplace, Portal de Membros, Academy, Blog, Produção de Eventos e Venda de Ingressos.",
  keywords: "música, artistas, gravadora, bookings, eventos, academy, marketplace, comunidade, criadores, fãs, indústria musical",
  openGraph: {
    title: "Valhalla Hub - Ecossistema Completo para Artistas e Fãs",
    description: "Descubra, crie, conecte-se e monetize sua paixão pela música com nossas 9 plataformas integradas: Gravadora, Bookings, Marketing IA, Marketplace, Portal de Membros, Academy, Blog, Produção de Eventos e Venda de Ingressos.",
    type: "website",
    url: "https://valhallahub.com.br",
    images: [
      {
        url: "/images/valhalla-hub-og.jpg",
        width: 1200,
        height: 630,
        alt: "Valhalla Hub - Your Music Universe",
      },
    ],
    locale: "pt_BR",
    siteName: "Valhalla Hub",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valhalla Hub - Ecossistema Completo para Artistas e Fãs",
    description: "Descubra, crie, conecte-se e monetize sua paixão pela música com nossas 9 plataformas integradas: Gravadora, Bookings, Marketing IA, Marketplace, Portal de Membros, Academy, Blog, Produção de Eventos e Venda de Ingressos.",
    images: ["/images/valhalla-hub-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://valhallahub.com.br",
  },
};

// Define the platform sections with icons and descriptions
const platforms = [
  {
    id: 'bookings',
    title: 'Bookings',
    description: 'Conecte-se com profissionais da música',
    icon: Mic,
    href: '/bookings',
    color: 'from-primary to-accent'
  },
  {
    id: 'events',
    title: 'Eventos',
    description: 'Descubra e participe de eventos musicais',
    icon: Ticket,
    href: '/events',
    color: 'from-accent to-primary'
  },
  {
    id: 'marketplace',
    title: 'Marketplace',
    description: 'Compre e venda beats, merch e cursos',
    icon: Store,
    href: '/marketplace',
    color: 'from-primary to-accent'
  },
  {
    id: 'academy',
    title: 'Academy',
    description: 'Aprenda com os melhores da indústria',
    icon: GraduationCap,
    href: '/academy',
    color: 'from-accent to-primary'
  },
  {
    id: 'gravadora',
    title: 'Gravadora',
    description: 'Distribua sua música globalmente',
    icon: Music,
    href: '/gravadora',
    color: 'from-primary to-accent'
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Fique por dentro das novidades',
    icon: BookOpen,
    href: '/blog',
    color: 'from-accent to-primary'
  },
  {
    id: 'membros',
    title: 'Membros',
    description: 'Comunidade exclusiva para artistas',
    icon: Users,
    href: '/membros',
    color: 'from-primary to-accent'
  },
  {
    id: 'connect',
    title: 'Connect',
    description: 'Networking e colaborações',
    icon: Globe,
    href: '/connect',
    color: 'from-accent to-primary'
  },
];

// Highlights data for the carousel
const highlights = [
  {
    id: 'events',
    title: 'Próximos Eventos',
    items: events.slice(0, 4),
    cta: 'Ver Todos os Eventos',
    ctaLink: '/events'
  },
  {
    id: 'courses',
    title: 'Cursos em Destaque',
    items: courses.slice(0, 4),
    cta: 'Explorar Academy',
    ctaLink: '/academy'
  },
  {
    id: 'products',
    title: 'Produtos Populares',
    items: products.slice(0, 4),
    cta: 'Explorar Marketplace',
    ctaLink: '/marketplace'
  }
];

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="loading mx-auto mb-4"></div>
        <p className="text-muted-foreground">Redirecionando para o dashboard...</p>
      </div>
    </div>
  );
}
