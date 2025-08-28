'use client';

import { useState } from 'react';

interface NewsletterSubscribeOptions {
  email: string;
  name?: string;
  source: string;
  interests?: string[];
  contentContext?: {
    category?: string;
    tags?: string[];
    authorName?: string;
    postId?: string;
  };
}

interface NewsletterState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

export const useNewsletter = () => {
  const [state, setState] = useState<NewsletterState>({
    isLoading: false,
    isSuccess: false,
    error: null
  });

  const subscribe = async (options: NewsletterSubscribeOptions) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...options,
          metadata: {
            referrer: typeof window !== 'undefined' ? window.location.href : '',
            utm_source: 'blog',
            utm_medium: 'form',
            utm_campaign: 'newsletter'
          }
        })
      });

      const data = await response.json();

      if (data.success) {
        setState({ isLoading: false, isSuccess: true, error: null });
        return { success: true, subscriber: data.subscriber };
      } else {
        throw new Error(data.error || 'Falha na inscrição');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado';
      setState({ isLoading: false, isSuccess: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const unsubscribe = async (email: string) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.success) {
        setState({ isLoading: false, isSuccess: true, error: null });
        return { success: true };
      } else {
        throw new Error(data.error || 'Falha ao cancelar inscrição');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado';
      setState({ isLoading: false, isSuccess: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const updatePreferences = async (email: string, preferences: {
    frequency?: 'weekly' | 'biweekly' | 'monthly';
    content_types?: string[];
    time_preference?: 'morning' | 'afternoon' | 'evening';
  }) => {
    setState({ isLoading: true, isSuccess: false, error: null });

    try {
      const response = await fetch('/api/newsletter/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, preferences })
      });

      const data = await response.json();

      if (data.success) {
        setState({ isLoading: false, isSuccess: true, error: null });
        return { success: true };
      } else {
        throw new Error(data.error || 'Falha ao atualizar preferências');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro inesperado';
      setState({ isLoading: false, isSuccess: false, error: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const reset = () => {
    setState({ isLoading: false, isSuccess: false, error: null });
  };

  return {
    ...state,
    subscribe,
    unsubscribe,
    updatePreferences,
    reset
  };
};