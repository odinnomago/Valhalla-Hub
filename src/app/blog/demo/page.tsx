import React from 'react';
import { Metadata } from 'next';
import { ConnectedBlogPage } from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog Demo | Valhalla Hub - UX Simplificada',
  description: 'Demonstração da nova experiência de usuário simplificada do blog, inspirada em referências como Pitchfork, Rolling Stone e Music Tech.',
  keywords: 'blog música, ux simplificada, design minimalista, valhalla hub',
  robots: 'noindex, nofollow', // Demo page shouldn't be indexed
};

export default function BlogDemoPage() {
  return <ConnectedBlogPage />;
}