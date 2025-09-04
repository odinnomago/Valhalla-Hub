'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Image, 
  Tag, 
  Eye, 
  Calendar,
  Save,
  Upload,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function NewBlogPostPage() {
  // This will be replaced with real data from user context/hooks
  const [post, setPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: '',
    featuredImage: null as string | null
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // This will be replaced with actual image upload functionality
    console.log('Uploading image');
  };

  const handleRemoveImage = () => {
    setPost(prev => ({...prev, featuredImage: null}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will be replaced with actual post creation functionality
    console.log('Creating post:', post);
  };

  const handlePreview = () => {
    // This will be replaced with actual preview functionality
    console.log('Previewing post');
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Novo Post</h1>
          <p className="text-muted-foreground">Crie um novo post para o seu blog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Pré-visualizar
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </div>

      {/* Post Form */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title">Título do Post</Label>
            <Input
              id="title"
              placeholder="Digite o título do seu post"
              value={post.title}
              onChange={(e) => setPost(prev => ({...prev, title: e.target.value}))}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="excerpt">Resumo</Label>
            <Textarea
              id="excerpt"
              placeholder="Escreva um breve resumo do seu post"
              value={post.excerpt}
              onChange={(e) => setPost(prev => ({...prev, excerpt: e.target.value}))}
              className="mt-1 min-h-[80px]"
            />
          </div>
          
          <div>
            <Label htmlFor="content">Conteúdo</Label>
            <Textarea
              id="content"
              placeholder="Escreva o conteúdo do seu post..."
              value={post.content}
              onChange={(e) => setPost(prev => ({...prev, content: e.target.value}))}
              className="mt-1 min-h-[300px]"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Adicione tags separadas por vírgula"
              value={post.tags}
              onChange={(e) => setPost(prev => ({...prev, tags: e.target.value}))}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label>Imagem em Destaque</Label>
            <div className="mt-1">
              {post.featuredImage ? (
                <div className="relative">
                  <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                    <Image className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                    onClick={handleRemoveImage}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Adicionar Imagem</span>
                  <span className="text-xs text-muted-foreground mt-1">PNG, JPG até 5MB</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <Button variant="outline">Salvar Rascunho</Button>
            <Button type="submit">
              <FileText className="h-4 w-4 mr-2" />
              Publicar Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}