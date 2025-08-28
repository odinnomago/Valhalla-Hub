import { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '@/components/bookings/SearchResults';

export const metadata: Metadata = {
  title: 'Buscar Profissionais - Bookings | Valhalla Hub',
  description: 'Encontre profissionais musicais por categoria, localização, preço e mais filtros avançados.',
  robots: 'index, follow'
};

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <Suspense fallback={<div>Carregando...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}