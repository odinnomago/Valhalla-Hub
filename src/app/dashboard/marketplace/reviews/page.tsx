'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Star, 
  User, 
  Calendar,
  Filter,
  Reply
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketplaceReviewsPage() {
  // This will be replaced with real data from user context/hooks
  const [reviews] = useState<any[]>([]);
  
  // This will be replaced with real data from user context/hooks
  const [stats] = useState({
    totalReviews: 0,
    averageRating: 0,
    positiveReviews: 0,
    responseRate: 0
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Avaliações</h1>
          <p className="text-muted-foreground">Gerencie as avaliações dos seus produtos</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtrar
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Avaliações</p>
              <p className="text-2xl font-bold mt-1">{stats.totalReviews}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold mt-1">{stats.averageRating.toFixed(1)}</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Star className="h-6 w-6 text-primary fill-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avaliações Positivas</p>
              <p className="text-2xl font-bold mt-1">{stats.positiveReviews}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border/50 rounded-xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Taxa de Resposta</p>
              <p className="text-2xl font-bold mt-1">{stats.responseRate}%</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Reply className="h-6 w-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-card border border-border/50 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-border/50">
          <h2 className="text-xl font-semibold">Avaliações Recentes</h2>
        </div>
        <div className="divide-y divide-border/50">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="p-5 hover:bg-muted/50 transition-colors">
                <div className="flex gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{review.user || 'Usuário anônimo'}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {renderStars(review.rating || 0)}
                          <span className="text-sm text-muted-foreground">
                            {review.date || 'Data não especificada'}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Responder
                      </Button>
                    </div>
                    <p className="mt-3 text-muted-foreground">
                      {review.comment || 'Nenhum comentário fornecido'}
                    </p>
                    {review.response && (
                      <div className="mt-3 pl-4 border-l-2 border-primary/20">
                        <p className="text-sm">
                          <span className="font-medium">Sua resposta:</span> {review.response}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Nenhuma avaliação recebida
            </div>
          )}
        </div>
      </div>
    </div>
  );
}