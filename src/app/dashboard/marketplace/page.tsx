'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Star,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketplacePage() {
  // This will be replaced with real data from user context/hooks
  const [products] = useState([]);
  
  // This will be replaced with real data from user context/hooks
  const [analytics] = useState({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 'R$ 0,00',
    avgRating: 0.0
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Marketplace Colaborativo</h1>
          <p className="text-muted-foreground">Venda seus produtos e serviços para a comunidade</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Produto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Produtos</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalProducts}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Vendas Totais</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalSales}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold mt-1">{analytics.totalRevenue}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold mt-1">{analytics.avgRating}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Star className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar produtos..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{product.name || 'Produto sem nome'}</h3>
                    <p className="text-sm text-muted-foreground">{product.category || 'Categoria não definida'}</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded">
                    {product.price || 'Preço não definido'}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating?.toFixed(1) || '0.0'}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews || 0})</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.sales || 0} vendas
                  </div>
                </div>
                
                <div className="mt-3 text-sm">
                  <span className="font-medium">Receita:</span> {product.revenue || 'R$ 0,00'}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button size="sm" className="flex-1">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-muted-foreground mb-4">Você ainda não cadastrou nenhum produto</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}