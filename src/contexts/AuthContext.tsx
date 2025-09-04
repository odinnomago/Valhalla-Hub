'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  uid: string; // Added for compatibility
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (in a real app, this would check for a valid token)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure the user object has both id and uid properties
      const userWithUid = {
        ...parsedUser,
        uid: parsedUser.uid || parsedUser.id
      };
      setUser(userWithUid);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setLoading(true);
    
    // In a real app, this would be an actual API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'user-123',
          uid: 'user-123', // Added for compatibility
          name: 'Alexandre Silva',
          email: email,
          avatar: email.charAt(0).toUpperCase()
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setLoading(false);
        resolve();
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const requireAuth = () => {
    // In a real app, this would check for authentication and redirect if needed
    return !!user;
  };

  const value = {
    user,
    loading,
    login,
    logout,
    requireAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}