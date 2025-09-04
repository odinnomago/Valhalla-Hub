'use client';

import React, { useState } from 'react';
import { 
  MessageCircle, 
  User, 
  Calendar, 
  CheckCircle,
  XCircle,
  Eye,
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export default function BlogCommentsPage() {
  // This will be replaced with real data from user context/hooks
  const [comments] = useState<any[]>([]);
  const [replyContent, setReplyContent] = useState('');

  const handleApproveComment = (id: number) => {
    // This will be replaced with actual comment approval functionality
    console.log('Approving comment:', id);
  };

  const handleRejectComment = (id: number) => {
    // This will be replaced with actual comment rejection functionality
    console.log('Rejecting comment:', id);
  };

  const handleReplyToComment = (id: number) => {
    // This will be replaced with actual comment reply functionality
    console.log('Replying to comment:', id, replyContent);
  };

  const handleViewPost = (postId: number) => {
    // This will be replaced with actual post view functionality
    console.log('Viewing post:', postId);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Comentários</h1>
          <p className="text-muted-foreground">Gerencie os comentários nos seus posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Filtrar por Status</Button>
          <Button variant="outline">Ordenar por Data</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Comentários</p>
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
              <p className="text-sm text-muted-foreground">Comentários Pendentes</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Comentários Aprovados</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Comentários Rejeitados</p>
              <p className="text-2xl font-bold mt-1">0</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <XCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Comentários Recentes</h2>
        </div>
        <div className="divide-y divide-border/50">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="p-5 hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{comment.user || 'Usuário anônimo'}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">
                            {comment.date || 'Data não especificada'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleViewPost(comment.postId)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ver Post
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleApproveComment(comment.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Aprovar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => handleRejectComment(comment.id)}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      {comment.content || 'Conteúdo do comentário não disponível'}
                    </p>
                    
                    {comment.status === 'approved' && (
                      <div className="mt-4">
                        <Textarea
                          placeholder="Escreva sua resposta..."
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          className="min-h-[80px] mb-2"
                        />
                        <Button 
                          size="sm" 
                          onClick={() => handleReplyToComment(comment.id)}
                        >
                          <Reply className="h-4 w-4 mr-1" />
                          Responder
                        </Button>
                      </div>
                    )}
                    
                    {comment.reply && (
                      <div className="mt-3 pl-4 border-l-2 border-primary/20">
                        <p className="text-sm">
                          <span className="font-medium">Sua resposta:</span> {comment.reply}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Nenhum comentário encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  );
}