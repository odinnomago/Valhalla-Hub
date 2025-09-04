'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useRequireAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
    setLoading(false);
  }, [router]);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return { user, loading, logout };
}

// For backward compatibility, also export useAuth
export function useAuth() {
  const { user, loading, logout } = useRequireAuth();
  return { user, loading, logout };
}