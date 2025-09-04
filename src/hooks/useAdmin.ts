'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export function useAdmin() {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      setIsAdmin(false);
      setAdminLoading(false);
      return;
    }

    // In a real implementation, this would check against the database
    // For now, we'll check if the user's email ends with @valhallarecords.com
    // or is a specific admin email
    const adminCheck = user.email?.endsWith('@valhallarecords.com') || 
                      user.email === 'admin@valhallahub.com' ||
                      user.email === 'admin@valhallarecords.com';
    
    setIsAdmin(adminCheck || false);
    setAdminLoading(false);
  }, [user, loading]);

  return { isAdmin, adminLoading };
}