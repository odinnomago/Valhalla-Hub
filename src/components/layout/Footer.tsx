'use client';

import Link from 'next/link';
import { Music, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage, type Language } from '@/hooks/use-language';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const translations = {
    en: {
        rights: "All rights reserved.",
        platform: "Platform",
        support: "Support",
        resources: "Resources",
        legal: "Legal",
        newsletter: "Newsletter",
        newsletterDesc: "Subscribe to receive updates and news",
        emailPlaceholder: "Your email address",
        subscribe: "Subscribe",
        about: "About",
        aboutDesc: "The ultimate platform for music creators, connecting artists, producers, and fans in a vibrant ecosystem of creativity and collaboration.",
        contact: "Contact",
        address: "123 Music Street, Creative City",
        phone: "+1 (555) 123-4567",
        email: "info@valhallahub.com",
        quickLinks: "Quick Links",
        helpCenter: "Help Center",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        api: "API for Developers",
        blog: "Blog",
        community: "Community",
        sitemap: "Sitemap",
    },
    pt: {
        rights: "Todos os direitos reservados.",
        platform: "Plataforma",
        support: "Suporte",
        resources: "Recursos",
        legal: "Legal",
        newsletter: "Newsletter",
        newsletterDesc: "Inscreva-se para receber atualizações e notícias",
        emailPlaceholder: "Seu endereço de email",
        subscribe: "Inscrever",
        about: "Sobre",
        aboutDesc: "A plataforma definitiva para criadores de música, conectando artistas, produtores e fãs em um ecossistema vibrante de criatividade e colaboração.",
        contact: "Contato",
        address: "123 Rua da Música, Cidade Criativa",
        phone: "+55 (11) 1234-5678",
        email: "info@valhallahub.com.br",
        quickLinks: "Links Rápidos",
        helpCenter: "Central de Ajuda",
        privacy: "Política de Privacidade",
        terms: "Termos de Serviço",
        api: "API para Desenvolvedores",
        blog: "Blog",
        community: "Comunidade",
        sitemap: "Mapa do Site",
    },
    es: {
        rights: "Todos los derechos reservados.",
        platform: "Plataforma",
        support: "Soporte",
        resources: "Recursos",
        legal: "Legal",
        newsletter: "Boletín",
        newsletterDesc: "Suscríbase para recibir actualizaciones y noticias",
        emailPlaceholder: "Su dirección de correo electrónico",
        subscribe: "Suscribir",
        about: "Acerca de",
        aboutDesc: "La plataforma definitiva para creadores de música, conectando artistas, productores y fanáticos en un ecosistema vibrante de creatividad y colaboración.",
        contact: "Contacto",
        address: "123 Calle de la Música, Ciudad Creativa",
        phone: "+34 (91) 123 45 67",
        email: "info@valhallahub.es",
        quickLinks: "Enlaces Rápidos",
        helpCenter: "Centro de Ayuda",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio",
        api: "API para Desenvolvedores",
        blog: "Blog",
        community: "Comunidad",
        sitemap: "Mapa del Sitio",
    }
}

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  const footerSections = [
    {
      title: t.platform,
      links: [
        { name: 'Home', href: '/' },
        { name: 'Bookings', href: '/bookings' },
        { name: 'Gravadora', href: '/gravadora' },
        { name: 'Marketplace', href: '/marketplace' },
        { name: 'Academy', href: '/academy' },
        { name: 'Eventos', href: '/events' },
        { name: 'Blog', href: '/blog' },
        { name: 'Membros', href: '/membros' },
        { name: 'Connect', href: '/connect' },
      ],
    },
    {
      title: t.support,
      links: [
        { name: t.helpCenter, href: '/help' },
        { name: t.contact, href: '/contact' },
        { name: t.privacy, href: '/privacy' },
        { name: t.terms, href: '/terms' },
        { name: t.sitemap, href: '/sitemap' },
      ],
    },
    {
      title: t.resources,
      links: [
        { name: t.blog, href: '/blog' },
        { name: t.community, href: '/community' },
        { name: t.api, href: '/developers' },
      ],
    },
  ];

  return (
    <footer className="bg-gradient-to-t from-background to-card/30 border-t border-border/50">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Music className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Valhalla Hub
              </span>
            </div>
            <p className="text-foreground/70 max-w-md leading-relaxed mb-6">
              {t.aboutDesc}
            </p>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-3 text-foreground">{t.contact}</h3>
              <div className="space-y-2 text-foreground/70">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{t.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  <span>{t.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span>{t.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Twitter" className="group">
                <Twitter className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
              </Link>
              <Link href="#" aria-label="Instagram" className="group">
                <Instagram className="h-6 w-6 text-muted-foreground group-hover:text-accent transition-all duration-300 group-hover:scale-110" />
              </Link>
              <Link href="#" aria-label="YouTube" className="group">
                <Youtube className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-all duration-300 group-hover:scale-110" />
              </Link>
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">{t.platform}</h3>
            <ul className="space-y-2">
              <li><Link href="/bookings" className="text-foreground/70 hover:text-primary transition-colors duration-300">Bookings</Link></li>
              <li><Link href="/marketplace" className="text-foreground/70 hover:text-primary transition-colors duration-300">Marketplace</Link></li>
              <li><Link href="/academy" className="text-foreground/70 hover:text-primary transition-colors duration-300">Academy</Link></li>
              <li><Link href="/events" className="text-foreground/70 hover:text-primary transition-colors duration-300">Events</Link></li>
              <li><Link href="/gravadora" className="text-foreground/70 hover:text-primary transition-colors duration-300">Gravadora</Link></li>
              <li><Link href="/membros" className="text-foreground/70 hover:text-primary transition-colors duration-300">Membros</Link></li>
              <li><Link href="/connect" className="text-foreground/70 hover:text-primary transition-colors duration-300">Connect</Link></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">{t.support}</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-foreground/70 hover:text-primary transition-colors duration-300">{t.helpCenter}</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors duration-300">{t.contact}</Link></li>
              <li><Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors duration-300">{t.privacy}</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors duration-300">{t.terms}</Link></li>
              <li><Link href="/sitemap" className="text-foreground/70 hover:text-primary transition-colors duration-300">{t.sitemap}</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">{t.newsletter}</h3>
            <p className="text-foreground/70 mb-4">
              {t.newsletterDesc}
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder={t.emailPlaceholder} 
                className="bg-card/50 border-border/50 focus:border-primary"
              />
              <Button className="netflix-button bg-primary hover:bg-primary/90 whitespace-nowrap">
                {t.subscribe}
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/50 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Valhalla Hub. {t.rights}</p>
            <p className="text-sm text-muted-foreground/60">Built with passion for the music community</p>
          </div>
        </div>
      </div>
    </footer>
  );
};