'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  MessageCircle, 
  Share2, 
  Heart, 
  TrendingUp, 
  Calendar,
  Plus,
  Search,
  Filter,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  // This will be replaced with real data from user context/hooks
  const [posts] = useState([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalPosts: 0,
    totalReads: 0,
    totalLikes: 0,
    totalComments: 0
  });

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Blog Integrado</h1>
          <p className="text-muted-foreground">Compartilhe conhecimento com a comunidade</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Novo Post
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Posts</p>
              <p className="text-2xl font-bold mt-1">{stats.totalPosts}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Leituras</p>
              <p className="text-2xl font-bold mt-1">{stats.totalReads.toLocaleString()}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Curtidas</p>
              <p className="text-2xl font-bold mt-1">{stats.totalLikes}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Comentários</p>
              <p className="text-2xl font-bold mt-1">{stats.totalComments}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary" />
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
            placeholder="Buscar posts..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </Button>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="bg-card border border-border/50 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title || 'Post sem título'}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {post.excerpt || 'Nenhum resumo disponível'}
                    </p>
                  </div>
                  {post.featured && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">
                      Destaque
                    </span>
                  )}
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{post.author || 'Autor desconhecido'}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {post.date || 'Data não especificada'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {post.reads || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {post.likes || 0}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments || 0}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    Editar
                  </Button>
                  <Button size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhum post encontrado</h3>
            <p className="text-muted-foreground mb-4">Você ainda não publicou nenhum post</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Criar Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}