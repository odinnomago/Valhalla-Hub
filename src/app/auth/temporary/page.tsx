'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { enableTemporaryLogin } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Shield, AlertTriangle } from 'lucide-react';

export default function TemporaryLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleTemporaryLogin = () => {
    setIsLoading(true);
    try {
      enableTemporaryLogin();
      toast({
        title: 'Success',
        description: 'Temporary login enabled. Redirecting to dashboard...',
      });
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to enable temporary login.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Music className="h-6 w-6 text-primary" />
              <span className="font-headline">Valhalla Hub</span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl font-headline">Temporary Access</CardTitle>
          </div>
          <CardDescription>
            Get temporary access to the dashboard for testing purposes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Warning:</strong> This is a temporary access method for testing only. 
                  It bypasses normal authentication and should not be used in production.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-lg bg-muted p-4">
              <h3 className="font-medium mb-2">Temporary Access Features:</h3>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access to dashboard and all user features</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>No real data will be saved</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All changes are temporary and will be lost on logout</span>
                </li>
              </ul>
            </div>

            <Button 
              onClick={handleTemporaryLogin}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Enabling Access...
                </>
              ) : (
                'Enable Temporary Access'
              )}
            </Button>

            <div className="text-center text-sm">
              <Link href="/auth/login" className="underline">
                Back to regular login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}