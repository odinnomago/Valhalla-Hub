'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { events, artists as allArtists } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Share2, 
  Facebook, 
  Twitter, 
  Instagram,
  Star,
  Music,
  Users
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLanguage } from '@/hooks/use-language';

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage();
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    notFound();
  }

  const performingArtists = allArtists.filter(artist => event.artists.includes(artist.id));

  // Mock data for tickets and important info
  const tickets = [
    { id: '1', name: 'General', price: 120, description: 'General access' },
    { id: '2', name: 'VIP', price: 250, description: 'VIP access + Meet & Greet' },
    { id: '3', name: 'Camarote', price: 400, description: 'Exclusive area + open bar' },
  ];

  const importantInfo = [
    'Prohibited entry for minors under 18 years old',
    'Outside food and drinks prohibited',
    'Paid parking on site',
    'Professional cameras not allowed'
  ];

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Event Header */}
      <div className="relative">
        <div className="h-96 md:h-[500px] relative overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 md:pb-12">
            <div className="container mx-auto px-4 md:px-6">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                {event.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{event.location.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                {event.description}
              </p>
            </section>

            {/* Line-up */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Lineup
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {performingArtists.map(artist => (
                  <div key={artist.id} className="flex items-center gap-4 p-3 bg-card rounded-lg">
                    <Avatar>
                      <AvatarImage src={artist.imageUrl} alt={artist.name} />
                      <AvatarFallback>{artist.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{artist.name}</p>
                      <p className="text-sm text-muted-foreground">{artist.genres[language].join(' / ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Location</h2>
              <div className="bg-card/50 border border-border/50 rounded-xl overflow-hidden">
                <div className="h-64 bg-muted relative">
                  {/* Map placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{event.location.name}</h3>
                  <p className="text-foreground/80 mb-4">{event.location.address}</p>
                  <Button variant="outline">
                    Directions
                  </Button>
                </div>
              </div>
            </section>

            {/* Tickets */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Tickets</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="bg-card/50 border border-border/50 rounded-xl p-6 hover:bg-card/80 transition-all">
                    <h3 className="text-xl font-bold mb-2">{ticket.name}</h3>
                    <p className="text-foreground/70 mb-4">{ticket.description}</p>
                    <div className="text-2xl font-bold text-primary mb-4">R$ {ticket.price}</div>
                    <Button className="w-full netflix-button bg-primary hover:bg-primary/90">
                      Buy
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Date and Time */}
              <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Date and Time</h3>
                <p className="mb-2">{event.date}</p>
                <p>{event.time}</p>
              </div>

              {/* Organizer */}
              <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Organizer</h3>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <span className="font-medium">Valhalla Productions</span>
                </div>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>

              {/* Important Information */}
              <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Information</h3>
                <ul className="space-y-2">
                  {importantInfo.map((info, index) => (
                    <li key={index} className="flex items-start">
                      <Star className="w-4 h-4 text-primary mt-1 mr-2 flex-shrink-0" />
                      <span className="text-foreground/80">{info}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Share */}
              <div className="bg-card/50 border border-border/50 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Share</h3>
                <div className="flex gap-3">
                  <Button variant="outline" size="icon">
                    <Facebook className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Twitter className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Instagram className="w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}