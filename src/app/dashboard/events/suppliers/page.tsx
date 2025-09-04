'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  MapPin, 
  Phone, 
  Mail,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function EventSuppliersPage() {
  // This will be replaced with real data from user context/hooks
  const [suppliers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddSupplier = () => {
    // This will be replaced with actual supplier addition functionality
    console.log('Adding supplier');
  };

  const handleContactSupplier = (id: number) => {
    // This will be replaced with actual supplier contact functionality
    console.log('Contacting supplier:', id);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Fornecedores</h1>
          <p className="text-muted-foreground">Gerencie seus fornecedores de eventos</p>
        </div>
        <Button onClick={handleAddSupplier}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Fornecedor
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar fornecedores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Fornecedores</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold mt-1">0.0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Star className="h-6 w-6 text-primary fill-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contatos Feitos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Suppliers List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Fornecedores Cadastrados</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Fornecedor</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Serviços</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Localização</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Avaliação</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier) => (
                  <tr key={supplier.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4">
                      <div className="font-medium">{supplier.name || 'Fornecedor sem nome'}</div>
                      <div className="text-sm text-muted-foreground">{supplier.category || 'Categoria não especificada'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">{supplier.services || 'Serviços não especificados'}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {supplier.location || 'Localização não especificada'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{supplier.rating || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleContactSupplier(supplier.id)}
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          Contatar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhum fornecedor cadastrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Suppliers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Fornecedores Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border/50 rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.8</span>
              </div>
            </div>
            <h3 className="font-semibold">Sound Production Ltda</h3>
            <p className="text-sm text-muted-foreground mt-1">Equipamentos de áudio profissionais</p>
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              São Paulo, SP
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3">
              Ver Perfil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}