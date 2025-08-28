import React from 'react';
import { Metadata } from 'next';
import ContactMethods from '@/components/contact/ContactMethods';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contato - Estamos Aqui Para Ajudar | Valhalla Hub',
  description: 'Entre em contato conosco através de chat, telefone ou email. Nossa equipe está pronta para ajudar artistas, fãs e parceiros a transformar suas ideias em realidade musical.',
  keywords: 'contato valhalla hub, suporte musical, chat online, telefone, email, artistas, gravadora, booking, música, estúdio',
  openGraph: {
    title: 'Contato - Estamos Aqui Para Ajudar | Valhalla Hub',
    description: 'Estamos aqui para ajudar. Escolha a melhor forma de conversar conosco e transformar suas ideias musicais em realidade.',
    type: 'website',
    url: 'https://valhallahub.com.br/contato',
    images: [
      {
        url: '/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Contato Valhalla Hub - Your Music Universe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contato - Estamos Aqui Para Ajudar | Valhalla Hub',
    description: 'Estamos aqui para ajudar. Escolha a melhor forma de conversar conosco.',
    images: ['/images/contact-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://valhallahub.com.br/contato',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        {/* Primary Contact Methods - Visual grid inspired by Apple */}
        <ContactMethods />
        
        {/* Simplified Contact Form - Minimal friction like Stripe */}
        <ContactForm />
      </main>
    </div>
  );
}