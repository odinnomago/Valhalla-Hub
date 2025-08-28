'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  id: string;
  clientName: string;
  rating: number;
  comment: string;
  date: string;
  project: string;
  verified: boolean;
}

interface ReviewSystemProps {
  reviews: Review[];
  professionalId: string;
}

interface NewReview {
  rating: number;
  comment: string;
  categories: {
    punctuality: number;
    quality: number;
    communication: number;
    professionalism: number;
  };
  projectType: string;
  wouldRecommend: boolean;
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ reviews, professionalId }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [filterBy, setFilterBy] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [newReview, setNewReview] = useState<NewReview>({
    rating: 0,
    comment: '',
    categories: {
      punctuality: 0,
      quality: 0,
      communication: 0,
      professionalism: 0
    },
    projectType: '',
    wouldRecommend: true
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const ratingDistribution = {
    5: reviews.filter(r => r.rating === 5).length,
    4: reviews.filter(r => r.rating === 4).length,
    3: reviews.filter(r => r.rating === 3).length,
    2: reviews.filter(r => r.rating === 2).length,
    1: reviews.filter(r => r.rating === 1).length,
  };

  const getRatingPercentage = (rating: number) => {
    return Math.round((ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100);
  };

  const filteredReviews = reviews.filter(review => {
    if (filterBy === 'all') return true;
    return review.rating === parseInt(filterBy);
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'helpful':
        // In a real implementation, this would sort by helpfulness votes
        return 0;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleStarClick = (rating: number, category?: keyof NewReview['categories']) => {
    if (category) {
      setNewReview(prev => ({
        ...prev,
        categories: {
          ...prev.categories,
          [category]: rating
        }
      }));
    } else {
      setNewReview(prev => ({ ...prev, rating }));
    }
  };

  const handleSubmitReview = async () => {
    try {
      // In a real implementation, this would submit to your API
      console.log('Submitting review:', newReview);
      
      // Reset form and close
      setNewReview({
        rating: 0,
        comment: '',
        categories: {
          punctuality: 0,
          quality: 0,
          communication: 0,
          professionalism: 0
        },
        projectType: '',
        wouldRecommend: true
      });
      setShowReviewForm(false);
      
      alert('Avaliação enviada com sucesso!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Erro ao enviar avaliação. Tente novamente.');
    }
  };

  const StarRating: React.FC<{
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onStarClick?: (rating: number) => void;
  }> = ({ rating, size = 'md', interactive = false, onStarClick }) => {
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-xl'
    };

    return (
      <div className={`flex items-center gap-1 ${sizes[size]}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onStarClick && onStarClick(star)}
            className={`${
              star <= rating ? 'text-yellow-400' : 'text-gray-500'
            } ${interactive ? 'hover:text-yellow-300 cursor-pointer' : ''} transition-colors`}
            disabled={!interactive}
          >
            ⭐
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">
              {averageRating.toFixed(1)}
            </div>
            <StarRating rating={Math.round(averageRating)} size="lg" />
            <p className="text-gray-400 mt-2">{reviews.length} avaliações</p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-white text-sm w-8">{rating}★</span>
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${getRatingPercentage(rating)}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 text-sm w-12">
                  {getRatingPercentage(rating)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
          >
            <option value="recent">Mais Recentes</option>
            <option value="rating">Melhor Avaliação</option>
            <option value="helpful">Mais Úteis</option>
          </select>

          {/* Filter */}
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-primary-500"
          >
            <option value="all">Todas as Estrelas</option>
            <option value="5">5 Estrelas</option>
            <option value="4">4 Estrelas</option>
            <option value="3">3 Estrelas</option>
            <option value="2">2 Estrelas</option>
            <option value="1">1 Estrela</option>
          </select>
        </div>

        <button
          onClick={() => setShowReviewForm(true)}
          className="bg-primary-500 text-black px-6 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors"
        >
          Escrever Avaliação
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold">
                {review.clientName.charAt(0)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-white font-semibold">{review.clientName}</h4>
                  {review.verified && (
                    <span className="text-green-400 text-sm" title="Cliente Verificado">✓</span>
                  )}
                  <span className="text-gray-400 text-sm">•</span>
                  <span className="text-gray-400 text-sm">
                    {new Date(review.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mb-3">
                  <StarRating rating={review.rating} />
                  <span className="text-gray-400 text-sm">
                    Projeto: {review.project}
                  </span>
                </div>
                
                <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <button className="text-gray-400 hover:text-white transition-colors">
                    👍 Útil
                  </button>
                  <button className="text-gray-400 hover:text-white transition-colors">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Form Modal */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReviewForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Avaliar Profissional</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Overall Rating */}
                <div>
                  <label className="block text-white font-medium mb-3">Avaliação Geral</label>
                  <StarRating
                    rating={newReview.rating}
                    size="lg"
                    interactive
                    onStarClick={(rating) => handleStarClick(rating)}
                  />
                </div>

                {/* Category Ratings */}
                <div>
                  <label className="block text-white font-medium mb-4">Avalie aspectos específicos:</label>
                  <div className="space-y-4">
                    {[
                      { key: 'punctuality', label: 'Pontualidade' },
                      { key: 'quality', label: 'Qualidade' },
                      { key: 'communication', label: 'Comunicação' },
                      { key: 'professionalism', label: 'Profissionalismo' }
                    ].map((category) => (
                      <div key={category.key} className="flex items-center justify-between">
                        <span className="text-gray-300">{category.label}</span>
                        <StarRating
                          rating={newReview.categories[category.key as keyof NewReview['categories']]}
                          interactive
                          onStarClick={(rating) => handleStarClick(rating, category.key as keyof NewReview['categories'])}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-white font-medium mb-2">Tipo de Projeto</label>
                  <input
                    type="text"
                    value={newReview.projectType}
                    onChange={(e) => setNewReview(prev => ({ ...prev, projectType: e.target.value }))}
                    placeholder="Ex: Gravação de vocal, Produção de beat..."
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-white font-medium mb-2">Comentário</label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    placeholder="Conte sobre sua experiência..."
                    rows={5}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500"
                  />
                </div>

                {/* Recommendation */}
                <div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newReview.wouldRecommend}
                      onChange={(e) => setNewReview(prev => ({ ...prev, wouldRecommend: e.target.checked }))}
                      className="w-5 h-5 text-primary-500 bg-gray-800 border-gray-600 focus:ring-primary-500 rounded"
                    />
                    <span className="text-white">Recomendaria este profissional</span>
                  </label>
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 bg-gray-700 text-white py-3 rounded-xl font-medium hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSubmitReview}
                    disabled={newReview.rating === 0 || !newReview.comment.trim()}
                    className="flex-1 bg-primary-500 text-black py-3 rounded-xl font-bold hover:bg-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar Avaliação
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewSystem;