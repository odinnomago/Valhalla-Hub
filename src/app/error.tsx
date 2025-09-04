'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md">
        <div className="bg-destructive/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Algo deu errado!</h1>
        <p className="text-muted-foreground mb-6">
          Desculpe, ocorreu um erro inesperado. Nossa equipe já foi notificada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={reset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Tentar novamente
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.push('/dashboard')}
          >
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}