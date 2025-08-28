'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Car, 
  Train,
  Navigation,
  Building,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

const LocationSection = () => {
  const [selectedDay, setSelectedDay] = useState<string>('today');

  const workingHours = [
    { day: 'Segunda a Sexta', hours: '9h às 18h', isToday: true },
    { day: 'Sábado', hours: '10h às 16h', isToday: false },
    { day: 'Domingo', hours: 'Fechado', isToday: false, closed: true }
  ];

  const contactInfo = {
    address: {
      street: 'Rua do Futuro, 123 - Vila Musical',
      city: 'São Paulo - SP',
      zipCode: '01234-567',
      country: 'Brasil'
    },
    contact: {
      phone: '+55 11 99999-9999',
      email: 'contato@valhallahub.com.br'
    }
  };

  const transportOptions = [
    {
      icon: Train,
      title: 'Metrô',
      description: 'Estação Vila Madalena (Linha 2-Verde)',
      distance: '5 min a pé',
      color: 'text-green-400'
    },
    {
      icon: Car,
      title: 'Carro',
      description: 'Estacionamento gratuito no local',
      distance: '20 vagas',
      color: 'text-blue-400'
    }
  ];

  const nearbyLandmarks = [
    'Beco do Batman - 3 min',
    'Centro Cultural - 5 min',
    'Mercado de Pulgas - 8 min',
    'Parque Villa-Lobos - 10 min'
  ];

  return (
    <section id="localizacao" className="py-20 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6 font-headline">
            Onde a Música Acontece
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Nossa sede está no coração da cena musical paulistana. Visite-nos!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50">
              <div className="relative h-80 bg-gradient-to-br from-primary/20 to-accent/20">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-primary mx-auto" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Mapa Interativo</h3>
                      <p className="text-sm text-foreground/70">Localização em tempo real</p>
                      <Badge className="bg-primary/20 text-primary-foreground">
                        Vila Madalena, São Paulo
                      </Badge>
                    </div>
                  </div>
                </div>
                
                {/* Map overlay with custom marker */}
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur">
                    <Navigation className="w-4 h-4 mr-2" />
                    Rotas
                  </Button>
                </div>
                
                {/* Pulsing marker animation */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    className="w-6 h-6 bg-primary rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium mb-1">Valhalla Hub Headquarters</h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {contactInfo.address.street}<br />
                        {contactInfo.address.city}, {contactInfo.address.zipCode}<br />
                        {contactInfo.address.country}
                      </p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border/50">
                    <h5 className="font-medium mb-3">Pontos de Referência</h5>
                    <div className="grid grid-cols-2 gap-2">
                      {nearbyLandmarks.map((landmark, index) => (
                        <div key={index} className="text-sm text-foreground/70 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          {landmark}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Working Hours */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Horário de Funcionamento</h3>
                </div>
                
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <motion.div
                      key={index}
                      className={`
                        flex items-center justify-between p-3 rounded-lg transition-colors
                        ${schedule.isToday 
                          ? 'bg-primary/10 border border-primary/30' 
                          : 'bg-muted/20'
                        }
                        ${schedule.closed ? 'opacity-60' : ''}
                      `}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className={`font-medium ${schedule.isToday ? 'text-primary' : ''}`}>
                        {schedule.day}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${schedule.closed ? 'text-muted-foreground' : ''}`}>
                          {schedule.hours}
                        </span>
                        {schedule.isToday && (
                          <Badge variant="secondary" className="text-xs bg-primary/20">
                            Hoje
                          </Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent font-medium flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Agendamentos: contato@valhallahub.com.br
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Direct Contact */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Contato Direto</h3>
                
                <div className="space-y-4">
                  <motion.a
                    href={`tel:${contactInfo.contact.phone}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-primary/10 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium group-hover:text-primary transition-colors">
                        {contactInfo.contact.phone}
                      </p>
                      <p className="text-sm text-muted-foreground">Clique para ligar</p>
                    </div>
                  </motion.a>
                  
                  <motion.a
                    href={`mailto:${contactInfo.contact.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-accent/10 transition-colors group"
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium group-hover:text-accent transition-colors">
                        {contactInfo.contact.email}
                      </p>
                      <p className="text-sm text-muted-foreground">Envie um email</p>
                    </div>
                  </motion.a>
                </div>
              </CardContent>
            </Card>

            {/* Transportation */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Como Chegar</h3>
                
                <div className="space-y-4">
                  {transportOptions.map((transport, index) => {
                    const Icon = transport.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-card transition-colors"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="p-2 rounded-lg bg-background/50">
                          <Icon className={`w-5 h-5 ${transport.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{transport.title}</p>
                          <p className="text-sm text-muted-foreground">{transport.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {transport.distance}
                        </Badge>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="mt-4">
                  <Button className="w-full netflix-button bg-primary hover:bg-primary/90" asChild>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        `${contactInfo.address.street}, ${contactInfo.address.city}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Ver no Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;