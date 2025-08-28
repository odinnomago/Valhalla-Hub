import { Metadata } from 'next';
import Sitemap from '@/components/seo/Sitemap';

export const metadata: Metadata = {
  title: 'Mapa do Site - Valhalla Hub',
  description: 'Navegue por todas as seções da Valhalla Hub. Encontre tudo o que você precisa em um só lugar.',
};

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sitemap />
    </div>
  );
}