'use client';

import { useState, useEffect } from 'react';

interface UserProgress {
  points: number;
  level: number;
  badges: string[];
  challenges: string[];
}

export const useUserProgress = (userId: string) => {
  const [progress, setProgress] = useState<UserProgress>({
    points: 0,
    level: 1,
    badges: [],
    challenges: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user progress
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user-progress?userId=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProgress();
    }
  }, [userId]);

  // Update user progress
  const updateProgress = async (action: string, points: number, additionalData?: any) => {
    try {
      const response = await fetch('/api/user-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          action,
          points,
          ...additionalData
        }),
      });
      
      if (!response.ok) throw new Error('Failed to update progress');
      const data = await response.json();
      setProgress(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    }
  };

  // Complete a challenge
  const completeChallenge = async (challengeId: string, points: number) => {
    return updateProgress('completeChallenge', points, { challengeId });
  };

  // Earn a badge
  const earnBadge = async (badgeId: string) => {
    return updateProgress('earnBadge', 0, { badgeId });
  };

  return {
    progress,
    loading,
    error,
    updateProgress,
    completeChallenge,
    earnBadge
  };
};