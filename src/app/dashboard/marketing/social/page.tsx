'use client';

import React, { useState } from 'react';
import { 
  SmartphoneIcon, 
  Camera, 
  Video, 
  Calendar, 
  Play, 
  Pause, 
  Send,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function SocialMediaManagementPage() {
  // This will be replaced with real data from user context/hooks
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState({
    content: '',
    platform: 'instagram',
    scheduleDate: ''
  });

  const handleSchedulePost = () => {
    // This will be replaced with actual post scheduling
    console.log('Scheduling post:', newPost);
  };

  const handleDeletePost = (id: number) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Gestão de Redes Sociais</h1>
          <p className="text-muted-foreground">Agende e gerencie suas postagens nas redes sociais</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Postagem
        </Button>
      </div>

      {/* Post Composer */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Criar Nova Postagem</h2>
        <div className="space-y-4">
          <Textarea
            placeholder="O que você gostaria de compartilhar?"
            value={newPost.content}
            onChange={(e) => setNewPost(prev => ({...prev, content: e.target.value}))}
            className="min-h-[120px]"
          />
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Camera className="h-4 w-4 mr-2" />
              Foto
            </Button>
            <Button variant="outline">
              <Video className="h-4 w-4 mr-2" />
              Vídeo
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar
            </Button>
            <Button className="ml-auto" onClick={handleSchedulePost}>
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Scheduled Posts */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Postagens Agendadas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/50">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Conteúdo</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Plataforma</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Data de Publicação</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {scheduledPosts.length > 0 ? (
                scheduledPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border/50 last:border-0 hover:bg-muted/50">
                    <td className="p-4 max-w-xs">
                      <p className="line-clamp-2">{post.content}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 p-1.5 rounded-full">
                          <SmartphoneIcon className="h-4 w-4 text-primary" />
                        </div>
                        {post.platform}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {post.scheduleDate || 'Imediato'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                        Agendado
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    Nenhuma postagem agendada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Engajamento</p>
              <p className="text-2xl font-bold mt-1">0%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alcance</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compartilhamentos</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}