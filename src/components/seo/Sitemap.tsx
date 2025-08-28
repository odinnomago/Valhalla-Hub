'use client';

import Link from 'next/link';
import { Music } from 'lucide-react';

const Sitemap = () => {
  const sections = [
    {
      title: 'Plataformas',
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
      title: 'Recursos',
      links: [
        { name: 'Cursos', href: '/academy/courses' },
        { name: 'Produtos', href: '/marketplace/products' },
        { name: 'Eventos', href: '/events/all' },
        { name: 'Comunidade', href: '/community' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Central de Ajuda', href: '/help' },
        { name: 'Contato', href: '/contact' },
        { name: 'Política de Privacidade', href: '/privacy' },
        { name: 'Termos de Serviço', href: '/terms' },
        { name: 'API para Desenvolvedores', href: '/developers' },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Music className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Mapa do Site</h1>
          <p className="text-muted-foreground">
            Navegue por todas as seções da Valhalla Hub
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-card/50 p-6 rounded-xl border border-border/50">
              <h2 className="text-xl font-bold mb-4 text-foreground">{section.title}</h2>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href} 
                      className="text-foreground/70 hover:text-primary transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Valhalla Hub. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;