'use client';

import React, { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Image,
  Smile,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function MembersCommunityPage() {
  // This will be replaced with real data from user context/hooks
  const [posts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');

  const handleCreatePost = () => {
    // This will be replaced with actual post creation functionality
    console.log('Creating post:', newPost);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Comunidade</h1>
          <p className="text-muted-foreground">Conecte-se com outros membros da comunidade</p>
        </div>
        <Button>
          <Users className="h-4 w-4 mr-2" />
          Encontrar Membros
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Membros Ativos</p>
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
              <p className="text-sm text-muted-foreground">Postagens</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Interações</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Post */}
      <div className="bg-card border border-border/50 rounded-xl p-5">
        <div className="flex gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <Textarea
              placeholder="Compartilhe algo com a comunidade..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Image className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={handleCreatePost}>
                <Send className="h-4 w-4 mr-2" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Community Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Atividade Recente</h2>
        
        {posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-card border border-border/50 rounded-xl p-5">
                <div className="flex gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{post.user || 'Membro'}</h3>
                        <p className="text-sm text-muted-foreground">{post.time || 'Agora mesmo'}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="mt-3">{post.content || 'Conteúdo da postagem'}</p>
                    <div className="flex gap-4 mt-4">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4 mr-1" />
                        Curtir
                      </Button>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Comentar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border/50 rounded-xl p-12 text-center">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Nenhuma atividade ainda</h3>
            <p className="text-muted-foreground mb-4">
              Seja o primeiro a compartilhar algo com a comunidade
            </p>
            <Button onClick={handleCreatePost}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Postagem
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}