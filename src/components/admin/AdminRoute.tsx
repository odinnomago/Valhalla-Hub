'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/hooks/useAdmin';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAdmin, adminLoading } = useAdmin();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Wait for both auth and admin checks to complete
    if (authLoading || adminLoading) return;

    // If user is not logged in, redirect to admin login
    if (!user) {
      router.push('/auth/admin');
      return;
    }

    // If user is logged in but not admin, show error and redirect
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin panel.',
        variant: 'destructive',
      });
      router.push('/');
    }
  }, [user, isAdmin, authLoading, adminLoading, router, toast]);

  // Show loading state while checking
  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is admin, render children
  if (isAdmin) {
    return <>{children}</>;
  }

  // If not admin or not logged in, render nothing (redirect will happen)
  return null;
}