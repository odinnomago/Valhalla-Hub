'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OnboardingWizard from '@/components/onboarding/OnboardingWizard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Music, LogIn } from 'lucide-react';

export default function OnboardingPage() {
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const handleComplete = () => {
    setCompleted(true);
    // In a real app, you would save onboarding progress
    // and redirect to dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary w-8 h-8 rounded-lg flex items-center justify-center">
              <Music className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Valhalla Hub</span>
          </div>
          <Button 
            variant="outline" 
            onClick={() => router.push('/login')}
            className="flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            Login
          </Button>
        </div>
        
        <Card className="border-0 shadow-lg">
          <CardContent className="p-0">
            <OnboardingWizard />
          </CardContent>
        </Card>
        
        {completed && (
          <div className="mt-6 text-center text-muted-foreground">
            <p>Redirecionando para o dashboard...</p>
          </div>
        )}
      </div>
    </div>
  );
}