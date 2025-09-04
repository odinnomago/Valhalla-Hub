'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="bg-primary/10 p-6 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
          <Search className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Voltar ao Dashboard
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Página Inicial</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}