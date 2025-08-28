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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pt-24 md:pt-28">
        {/* Hero Section - Netflix-inspired with earthy gradient */}
        <section className="relative w-full min-h-[calc(100vh-6rem)] md:min-h-[calc(100vh-7rem)] flex items-center justify-center overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-card/90" />
          
          {/* Hero content */}
          <div className="relative z-20 container mx-auto px-4 md:px-6 text-center pt-16">
            <div className="max-w-4xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent font-headline">
                Valhalla - Sociedade Alternártistica
              </h1>
              <p className="text-xl md:text-2xl text-foreground/90 max-w-2xl mx-auto leading-relaxed">
                Descubra, crie, conecte-se e monetize sua paixão pela música em um só lugar
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Button asChild size="lg" className="netflix-button bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-md">
                  <Link href="#plataformas">Explore as Plataformas</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-primary/50 hover:border-primary text-lg px-8 py-6 rounded-md">
                  <Link href="#destaques">Veja Destaques</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700" />
          </div>
        </section>

        {/* Platforms Section - Core of the ecosystem */}
        <section id="plataformas" className="w-full py-20 bg-gradient-to-b from-background to-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-headline">
                Nossas 9 Plataformas Integradas
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Todas as ferramentas que você precisa em um só ecossistema
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {platforms.map((platform) => (
                <Link key={platform.id} href={platform.href}>
                  <Card className="netflix-card flex flex-col items-center p-6 text-center transition-all duration-300 hover:scale-105">
                    <platform.icon className={`h-12 w-12 mb-4 text-primary`} />
                    <h3 className="text-2xl font-semibold mb-2 font-headline">{platform.title}</h3>
                    <p className="text-muted-foreground">{platform.description}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-headline">
                Artistas em Destaque
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                Conheça os talentos que fazem parte da nossa comunidade
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artists.map((artist) => (
                <Card key={artist.id} className="netflix-card flex flex-col items-center p-6 text-center transition-all duration-300 hover:scale-105">
                  <Avatar className="h-24 w-24 mb-4 border-4 border-primary/50">
                    <AvatarImage src={artist.avatar} alt={artist.name} />
                    <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-2xl font-semibold mb-2 font-headline">{artist.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{artist.genre}</p>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < artist.rating ? 'text-yellow-400' : 'text-muted-foreground/30'}`} fill="currentColor" />
                    ))}
                  </div>
                  <Button variant="outline" className="mt-4 border-primary/50 hover:border-primary" asChild>
                    <Link href={`/artists/${artist.id}`}>Ver Perfil</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
            




        {/* Highlights Section */}
        <section id="destaques" className="w-full py-20 bg-gradient-to-b from-background to-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-12">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-headline">
                Destaques do Ecossistema
              </h2>
              <p className="text-xl text-foreground/70 max-w-2xl">
                Descubra o que há de mais recente em nossa plataforma
              </p>
            </div>
            
            {/* Events Highlights */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Próximos Eventos</h3>
                <Link href="/events" className="text-primary hover:underline flex items-center">
                  Ver Todos os Eventos <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.slice(0, 4).map((event) => (
                  <Card key={event.id} className="group overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/20">
                    <Link href={`/events/${event.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          width={400}
                          height={400}
                          className="object-cover w-full h-48 md:h-56 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                          {event.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {event.description}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Courses Highlights */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Cursos em Destaque</h3>
                <Link href="/academy" className="text-primary hover:underline flex items-center">
                  Explorar Academy <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.slice(0, 4).map((course) => (
                  <Card key={course.id} className="group overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/20">
                    <Link href={`/academy/${course.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={course.imageUrl}
                          alt={course.title}
                          width={400}
                          height={400}
                          className="object-cover w-full h-48 md:h-56 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                          {course.level}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors duration-300 line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {course.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center text-xs">
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Products Highlights */}
            <div className="mb-16">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Produtos Populares</h3>
                <Link href="/marketplace" className="text-primary hover:underline flex items-center">
                  Explorar Marketplace <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                  <Card key={product.id} className="group overflow-hidden bg-card/50 border-border/50 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:bg-card/80 hover:shadow-2xl hover:shadow-primary/20">
                    <Link href={`/marketplace/${product.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="object-cover w-full h-48 md:h-56 transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                          {product.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-lg group-hover:text-primary transition-colors duration-300 line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="flex items-center text-xs">
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {product.seller}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-lg text-primary">${product.price.toFixed(2)}</span>
                          <Button size="sm" variant="outline" className="text-xs py-1 px-2 border-primary/50 hover:bg-primary/10">
                            Comprar
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="w-full py-20 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline">
              Pronto para Conectar?
            </h2>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed mb-8">
                Junte-se ao Valhalla Hub e descubra como podemos transformar sua paixão musical em realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 transition-colors duration-300">
                <Link href="/auth/register">Junte-se ao Valhalla</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10 text-lg px-8 py-4 transition-colors duration-300">
                <Link href="/contato">Fale Conosco</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}