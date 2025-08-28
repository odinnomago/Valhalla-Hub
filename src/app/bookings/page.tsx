import { Metadata } from 'next';
import BookingsHero from '@/components/bookings/BookingsHero';
import ProfessionalsList from '@/components/bookings/ProfessionalsList';
import BookingsFilters from '@/components/bookings/BookingsFilters';

export const metadata: Metadata = {
  title: 'Bookings - Conecte-se com Profissionais Musicais | Valhalla Hub',
  description: 'Seu universo musical conectado. Encontre e contrate músicos, produtores, técnicos e outros profissionais do ecossistema musical. Plataforma segura com avaliações verificadas e pagamentos protegidos.',
  keywords: [
    'booking musical',
    'contratar músicos',
    'produtores musicais',
    'técnicos de som',
    'DJs profissionais',
    'serviços musicais',
    'freelancers música',
    'profissionais música',
    'valhalla hub',
    'plataforma musical'
  ],
  openGraph: {
    title: 'Bookings - Conecte-se com Profissionais Musicais | Valhalla Hub',
    description: 'Seu universo musical conectado. Encontre os melhores profissionais da música para seus projetos.',
    images: [
      {
        url: '/images/og/bookings.jpg',
        width: 1200,
        height: 630,
        alt: 'Valhalla Hub Bookings - Seu Universo Musical'
      }
    ],
    siteName: 'Valhalla Hub',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bookings - Profissionais Musicais | Valhalla Hub',
    description: 'Conecte-se com os melhores profissionais da música em uma só plataforma'
  },
  alternates: {
    canonical: '/bookings'
  }
};

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* SEO Components */}
      <div className="sr-only">
        <h1>Bookings - Contrate Profissionais Musicais | Valhalla Hub</h1>
        <p>Conecte-se com os melhores profissionais da música. Artistas, produtores, técnicos e mais.</p>
      </div>
      
      <main className="relative">
        {/* Hero Section with Search */}
        <section className="relative netflix-gradient">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/90" />
          <div className="relative">
            <BookingsHero />
          </div>
        </section>

        {/* Professionals Section */}
        <section className="py-20 bg-gradient-to-b from-background to-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
              {/* Filters Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <BookingsFilters />
                </div>
              </aside>

              {/* Professionals List */}
              <div className="min-w-0">
                <ProfessionalsList />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}