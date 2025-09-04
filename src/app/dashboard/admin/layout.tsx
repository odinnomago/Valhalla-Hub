'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/admin');
      toast({
        title: 'Access Denied',
        description: 'Please log in as an administrator to access this page.',
        variant: 'destructive',
      });
    }
    // In a real implementation, you would also check if the user has admin privileges
    // For now, we're just checking if they're logged in
  }, [user, loading, router, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // In a real implementation, you would also check admin privileges here
  return <>{children}</>;
}