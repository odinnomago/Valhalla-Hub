
'use client';

import { useState, useEffect } from 'react';
import { supabase, isDemoMode } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { User, Session } from '@supabase/supabase-js';

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  emailVerified: boolean | null;
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    emailVerified: null,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      if (isDemoMode) {
        setAuthState({ 
          user: null, 
          session: null,
          loading: false, 
          emailVerified: null 
        });
        return;
      }
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        
        setAuthState({ 
          user: session?.user || null,
          session: session,
          loading: false, 
          emailVerified: session?.user?.email_confirmed_at ? true : null
        });
      } catch (error) {
        console.error('Auth initialization error:', error);
        setAuthState({ 
          user: null, 
          session: null,
          loading: false, 
          emailVerified: null 
        });
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setAuthState({ 
          user: session?.user || null,
          session: session,
          loading: false, 
          emailVerified: session?.user?.email_confirmed_at ? true : null
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return authState;
}

export function useRequireAuth(redirectUrl = '/auth/login') {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push(redirectUrl);
    }
  }, [user, loading, router, redirectUrl]);

  return { user, loading };
}
