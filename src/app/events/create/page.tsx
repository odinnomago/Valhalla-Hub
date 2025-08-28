'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Music, 
  TentTree, 
  Mic, 
  Monitor,
  Plus,
  X
} from 'lucide-react';

export default function CreateEventPage() {
  const [ticketTypes, setTicketTypes] = useState([
    { id: 1, name: 'Inteira', price: '' }
  ]);
  
  const [images, setImages] = useState<File[]>([]);
  
  const categories = [
    { id: 'shows', label: 'Shows', icon: Music },
    { id: 'festivals', label: 'Festivais', icon: TentTree },
    { id: 'workshops', label: 'Workshops', icon: Mic },
    { id: 'online', label: 'Online', icon: Monitor }
  ];

  const addTicketType = () => {
    setTicketTypes([
      ...ticketTypes,
      { id: Date.now(), name: '', price: '' }
    ]);
  };

  const removeTicketType = (id: number) => {
    if (ticketTypes.length > 1) {
      setTicketTypes(ticketTypes.filter(ticket => ticket.id !== id));
    }
  };

  const updateTicketType = (id: number, field: 'name' | 'price', value: string) => {
    setTicketTypes(
      ticketTypes.map(ticket => 
        ticket.id === id ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4 font-headline">
              Criar Evento
            </h1>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Promova seu evento e alcance milhares de pessoas
            </p>
          </section>

          {/* Form */}
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Informações Básicas</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Nome do Evento *</Label>
                      <Input
                        id="title"
                        placeholder="Nome do seu evento"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria *</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {categories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <label 
                              key={category.id}
                              className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-muted transition-colors"
                            >
                              <input
                                type="radio"
                                name="category"
                                value={category.id}
                                className="w-4 h-4"
                              />
                              <Icon className="w-5 h-5" />
                              <span>{category.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="description">Descrição *</Label>
                      <Textarea
                        id="description"
                        placeholder="Descreva seu evento em detalhes"
                        rows={5}
                      />
                    </div>
                  </div>
                </div>

                {/* Date and Location */}
                <div className="space-y-6 pt-6 border-t border-border/50">
                  <h2 className="text-2xl font-bold">Data e Local</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="date">Data *</Label>
                      <Input
                        id="date"
                        type="date"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Horário *</Label>
                      <Input
                        id="time"
                        type="time"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Local *</Label>
                      <Input
                        id="location"
                        placeholder="Nome do local"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Endereço *</Label>
                      <Input
                        id="address"
                        placeholder="Endereço completo"
                      />
                    </div>
                  </div>
                </div>

                {/* Tickets */}
                <div className="space-y-6 pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Ingressos</h2>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addTicketType}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar Tipo
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {ticketTypes.map((ticket) => (
                      <div key={ticket.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end p-4 border rounded-lg bg-muted/20">
                        <div className="md:col-span-5 space-y-2">
                          <Label>Nome do Ingresso</Label>
                          <Input
                            value={ticket.name}
                            onChange={(e) => updateTicketType(ticket.id, 'name', e.target.value)}
                            placeholder="Ex: Inteira, VIP, Camarote"
                          />
                        </div>
                        
                        <div className="md:col-span-5 space-y-2">
                          <Label>Preço (R$)</Label>
                          <Input
                            type="number"
                            value={ticket.price}
                            onChange={(e) => updateTicketType(ticket.id, 'price', e.target.value)}
                            placeholder="0.00"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => removeTicketType(ticket.id)}
                            className="w-full"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Photos */}
                <div className="space-y-6 pt-6 border-t border-border/50">
                  <h2 className="text-2xl font-bold">Fotos</h2>
                  
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center">
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="images"
                      />
                      <Label htmlFor="images" className="cursor-pointer">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <Plus className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Arraste fotos ou clique para enviar</p>
                            <p className="text-sm text-muted-foreground">
                              PNG, JPG até 10MB
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Upload ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50">
                  <Button type="button" variant="outline" className="flex-1">
                    Salvar Rascunho
                  </Button>
                  <Button type="submit" className="flex-1 netflix-button bg-primary hover:bg-primary/90">
                    Criar Evento
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}