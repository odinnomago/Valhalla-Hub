'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Image, 
  Tag, 
  Package, 
  DollarSign, 
  FileText,
  Upload,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewProductPage() {
  // This will be replaced with real data from user context/hooks
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [] as string[]
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will be replaced with actual image upload functionality
    console.log('Uploading image');
  };

  const handleRemoveImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be replaced with actual product creation functionality
    console.log('Creating product:', product);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Cadastrar Novo Produto</h1>
        <p className="text-muted-foreground">Adicione um novo produto ao Marketplace Colaborativo</p>
      </div>

      {/* Product Form */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              placeholder="Digite o nome do produto"
              value={product.name}
              onChange={(e) => setProduct(prev => ({...prev, name: e.target.value}))}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva seu produto em detalhes"
              value={product.description}
              onChange={(e) => setProduct(prev => ({...prev, description: e.target.value}))}
              className="mt-1 min-h-[120px]"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="price"
                  type="number"
                  placeholder="0,00"
                  value={product.price}
                  onChange={(e) => setProduct(prev => ({...prev, price: e.target.value}))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="category">Categoria</Label>
              <div className="relative mt-1">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="category"
                  placeholder="Ex: Merchandise, Digital, Serviço"
                  value={product.category}
                  onChange={(e) => setProduct(prev => ({...prev, category: e.target.value}))}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <Label>Imagens do Produto</Label>
            <div className="mt-1">
              {product.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <div key={index} className="relative">
                      <div className="bg-muted aspect-square rounded-lg flex items-center justify-center">
                        <Image className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <button
                        type="button"
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
              
              <div className="mt-4">
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Adicionar Imagens</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancelar</Button>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Produto
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}