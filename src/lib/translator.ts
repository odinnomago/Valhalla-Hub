
'use server';

import type { Language } from "@/hooks/use-language";

// For server components, we don't have access to the context.
// We will simulate getting the language, but in a real app, this could come
// from cookies, headers, or URL path. For now, we'll default to 'en'.

const translations = {
  en: {
    'hero': 'Your Music Universe. All in one place.',
    'nav': {
        'connect': 'Bookings',
        'events': 'Events',
        'marketplace': 'Marketplace',
        'academy': 'Academy',
        'blog': 'Blog'
    },
    'Featured Artists': 'Featured Artists',
    'Discover talented artists pushing the boundaries of music.': 'Discover talented artists pushing the boundaries of music.',
    'View All Artists': 'View All Artists',
    'From the Marketplace': 'From the Marketplace',
    'Beats, merch, sound kits, and courses from your favorite artists.': 'Beats, merch, sound kits, and courses from your favorite artists.',
    'Explore Marketplace': 'Explore Marketplace',
    'Valhalla Academy': 'Valhalla Academy',
    'Learn from the best. Masterclasses and courses from industry experts.': 'Learn from the best. Masterclasses and courses from industry experts.',
    'Browse All Courses': 'Browse All Courses',
    'Upcoming Events': 'Upcoming Events',
    'Experience the vibrant music scene with our curated list of events.': 'Experience the vibrant music scene with our curated list of events.',
    'Browse All Events': 'Browse All Events',
    'From Our Blog': 'From Our Blog',
    'Get the latest news, interviews, and insights from the music industry.': 'Get the latest news, interviews, and insights from the music industry.',
    'Read More Posts': 'Read More Posts',
    'Book Artist': 'Book Artist',
    'About': 'About',
    'Music': 'Music',
    'Events': 'Events',
    'Booking Info': 'Booking Info',
    'Discography': 'Discography',
    'Play': 'Play',
    'No upcoming events.': 'No upcoming events.',
    'Booking Information': 'Booking Information',
    'For booking inquiries, please contact our agency.': 'For booking inquiries, please contact our agency.',
    'Contact for Booking': 'Contact for Booking',
    'Technical Rider & Press Kit': 'Technical Rider & Press Kit',
    'Download Press Kit': 'Download Press Kit',
  },
  pt: {
    'hero': 'Seu Universo Musical. Tudo em um só lugar.',
     'nav': {
        'connect': 'Reservas',
        'events': 'Eventos',
        'marketplace': 'Mercado',
        'academy': 'Academia',
        'blog': 'Blog'
    },
    'Featured Artists': 'Artistas em Destaque',
    'Discover talented artists pushing the boundaries of music.': 'Descubra artistas talentosos que estão expandindo as fronteiras da música.',
    'View All Artists': 'Ver Todos os Artistas',
    'From the Marketplace': 'Do Mercado',
    'Beats, merch, sound kits, and courses from your favorite artists.': 'Beats, merch, kits de som e cursos dos seus artistas favoritos.',
    'Explore Marketplace': 'Explorar o Mercado',
    'Valhalla Academy': 'Academia Valhalla',
    'Learn from the best. Masterclasses and courses from industry experts.': 'Aprenda com os melhores. Masterclasses e cursos de especialistas da indústria.',
    'Browse All Courses': 'Ver Todos os Cursos',
    'Upcoming Events': 'Próximos Eventos',
    'Experience the vibrant music scene with our curated list of events.': 'Experimente a vibrante cena musical com nossa lista de eventos selecionados.',
    'Browse All Events': 'Ver Todos os Eventos',
    'From Our Blog': 'Do Nosso Blog',
    'Get the latest news, interviews, and insights from the music industry.': 'Receba as últimas notícias, entrevistas e insights da indústria musical.',
    'Read More Posts': 'Ler Mais Posts',
    'Book Artist': 'Contratar Artista',
    'About': 'Sobre',
    'Music': 'Música',
    'Events': 'Eventos',
    'Booking Info': 'Informações de Contato',
    'Discography': 'Discografia',
    'Play': 'Tocar',
    'No upcoming events.': 'Nenhum evento próximo.',
    'Booking Information': 'Informações para Contratação',
    'For booking inquiries, please contact our agency.': 'Para consultas de agendamento, entre em contato com nossa agência.',
    'Contact for Booking': 'Contato para Agendamento',
    'Technical Rider & Press Kit': 'Rider Técnico & Kit de Imprensa',
    'Download Press Kit': 'Baixar Kit de Imprensa',
  },
  es: {
    'hero': 'Tu Universo Musical. Todo en un solo lugar.',
     'nav': {
        'connect': 'Reservas',
        'events': 'Eventos',
        'marketplace': 'Mercado',
        'academy': 'Academia',
        'blog': 'Blog'
    },
    'Featured Artists': 'Artistas Destacados',
    'Discover talented artists pushing the boundaries of music.': 'Descubre artistas talentosos que están ampliando las fronteras de la música.',
    'View All Artists': 'Ver Todos los Artistas',
    'From the Marketplace': 'Del Mercado',
    'Beats, merch, sound kits, and courses from your favorite artists.': 'Beats, merch, kits de sonido y cursos de tus artistas favoritos.',
    'Explore Marketplace': 'Explorar el Mercado',
    'Valhalla Academy': 'Academia Valhalla',
    'Learn from the best. Masterclasses and courses from industry experts.': 'Aprende de los mejores. Masterclasses y cursos de expertos de la industria.',
    'Browse All Courses': 'Ver Todos los Cursos',
    'Upcoming Events': 'Próximos Eventos',
    'Experience the vibrant music scene with our curated list of events.': 'Experimenta la vibrante escena musical con nuestra lista de eventos seleccionados.',
    'Browse All Events': 'Ver Todos los Eventos',
    'From Our Blog': 'De Nuestro Blog',
    'Get the latest news, interviews, and insights from the music industry.': 'Recibe las últimas noticias, entrevistas e insights de la industria musical.',
    'Read More Posts': 'Leer Más Posts',
    'Book Artist': 'Contratar Artista',
    'About': 'Sobre',
    'Music': 'Música',
    'Events': 'Eventos',
    'Booking Info': 'Información de Contratación',
    'Discography': 'Discografía',
    'Play': 'Reproducir',
    'No upcoming events.': 'No hay eventos próximos.',
    'Booking Information': 'Información de Contratación',
    'For booking inquiries, please contact our agency.': 'Para consultas de contratación, por favor contacte a nuestra agencia.',
    'Contact for Booking': 'Contactar para Contratación',
    'Technical Rider & Press Kit': 'Rider Técnico & Kit de Prensa',
    'Download Press Kit': 'Descargar Kit de Prensa',
  },
};


// This is a proxy object to handle translation lookups.
function createTranslator(language: Language) {
  return new Proxy(translations[language], {
    get(target, prop: string) {
      if (prop in target) {
        // @ts-ignore
        return target[prop];
      }
      // If the key is not in the current language, return the key itself
      // or the english version as a fallback.
      return translations['en'][prop as keyof typeof translations['en']] || prop;
    },
  });
}

// In a real app, you would determine the language from request headers, cookies, or URL.
// For this prototype, we'll just default to 'en', but this function provides
// the structure to support multiple languages on the server.
export async function getTranslator(lang: Language = 'en') {
  const language: Language = ['en', 'pt', 'es'].includes(lang) ? lang : 'en';
  const t = createTranslator(language);
  return { ...t, language };
}
