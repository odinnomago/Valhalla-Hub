'use client';

import { useState, useEffect, useCallback } from 'react';

interface NewsletterHookState {
  hasBeenShown: boolean;
  hasSubscribed: boolean;
  lastShownDate: string | null;
}

interface UseSmartNewsletterReturn {
  shouldShow: boolean;
  markAsShown: () => void;
  markAsSubscribed: () => void;
  reset: () => void;
}

const STORAGE_KEY = 'valhalla_newsletter_state';
const SHOW_AGAIN_DAYS = 7; // Show again after 7 days if not subscribed

export const useSmartNewsletter = (): UseSmartNewsletterReturn => {
  const [state, setState] = useState<NewsletterHookState>({
    hasBeenShown: false,
    hasSubscribed: false,
    lastShownDate: null
  });

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedState = localStorage.getItem(STORAGE_KEY);
      if (savedState) {
        const parsedState: NewsletterHookState = JSON.parse(savedState);
        
        // Check if enough time has passed to show again
        if (parsedState.lastShownDate && !parsedState.hasSubscribed) {
          const lastShown = new Date(parsedState.lastShownDate);
          const daysSinceShown = Math.floor(
            (Date.now() - lastShown.getTime()) / (1000 * 60 * 60 * 24)
          );
          
          if (daysSinceShown >= SHOW_AGAIN_DAYS) {
            setState({
              ...parsedState,
              hasBeenShown: false // Reset to allow showing again
            });
          } else {
            setState(parsedState);
          }
        } else {
          setState(parsedState);
        }
      }
    } catch (error) {
      console.error('Error loading newsletter state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving newsletter state:', error);
    }
  }, [state]);

  const shouldShow = !state.hasBeenShown && !state.hasSubscribed;

  const markAsShown = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasBeenShown: true,
      lastShownDate: new Date().toISOString()
    }));
  }, []);

  const markAsSubscribed = useCallback(() => {
    setState(prev => ({
      ...prev,
      hasBeenShown: true,
      hasSubscribed: true,
      lastShownDate: new Date().toISOString()
    }));
  }, []);

  const reset = useCallback(() => {
    setState({
      hasBeenShown: false,
      hasSubscribed: false,
      lastShownDate: null
    });
  }, []);

  return {
    shouldShow,
    markAsShown,
    markAsSubscribed,
    reset
  };
};