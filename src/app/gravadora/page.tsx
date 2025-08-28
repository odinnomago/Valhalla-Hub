import { Metadata } from 'next';
import RecordLabelHero from '@/components/record-label/RecordLabelHero';
import LabelReleases from '@/components/record-label/LabelReleases';
import FeaturedArtists from '@/components/record-label/FeaturedArtists';
// AdhesionProcess component removed
import LabelFAQ from '@/components/record-label/LabelFAQ';
import DemoSubmissionCTA from '@/components/record-label/DemoSubmissionCTA';

export const metadata: Metadata = {
  title: 'Gravadora Valhalla - Onde Talentos se Transformam em Lendas | Valhalla Hub',
  description: 'Distribuição global, desenvolvimento artístico e oportunidades reais. A Gravadora Valhalla oferece serviços completos para artistas: produção, marketing, gestão de direitos e muito mais.',
  keywords: [
    'gravadora digital',
    'distribuição musical',
    'selo musical',
    'contratos musicais',
    'artistas independentes',
    'produção musical',
    'marketing musical',
    'direitos autorais',
    'royalties',
    'streaming musical',
    'valhalla records',
    'gravadora independente'
  ],
  openGraph: {
    title: 'Gravadora Valhalla - Transforme Seu Talento em Carreira',
    description: 'Serviços completos para artistas: distribuição global, produção, marketing e gestão de direitos. Envie sua demo e faça parte do futuro da música.',
    images: [
      {
        url: '/images/og/record-label.jpg',
        width: 1200,
        height: 630,
        alt: 'Gravadora Valhalla - Onde Talentos se Transformam em Lendas'
      }
    ],
    siteName: 'Valhalla Hub',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gravadora Valhalla - Desenvolvimento Artístico Completo',
    description: 'Distribuição global, produção profissional e marketing estratégico para artistas independentes.'
  },
  alternates: {
    canonical: '/gravadora'
  }
};

export default function RecordLabelPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Components */}
      <div className="sr-only">
        <h1>Gravadora Valhalla - Serviços Completos para Artistas | Valhalla Hub</h1>
        <p>Transforme seu talento em carreira com distribuição global, produção profissional e marketing estratégico.</p>
      </div>
      
      <main className="relative">
        {/* Hero Section */}
        <section className="relative netflix-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/90" />
          <div className="relative">
            <RecordLabelHero />
          </div>
        </section>

        {/* Releases Section */}
        <section className="py-16 bg-gradient-to-b from-card/30 to-background">
          <LabelReleases />
        </section>

        {/* Featured Artists Section */}
        <section className="py-16 bg-gradient-to-b from-card/30 to-background">
          <FeaturedArtists />
        </section>

        {/* Process Section removed */}

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <LabelFAQ />
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
          <DemoSubmissionCTA />
        </section>
      </main>
    </div>
  );
}