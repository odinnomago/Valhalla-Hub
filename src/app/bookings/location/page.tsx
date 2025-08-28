import { Metadata } from 'next';
import LocationSearch from '@/components/bookings/LocationSearch';

export const metadata: Metadata = {
  title: 'Busca por Localização - Encontre Profissionais Próximos | Valhalla Hub',
  description: 'Encontre profissionais musicais próximos à sua localização. Busque por região, bairro ou endereço específico.',
  keywords: [
    'profissionais próximos',
    'busca por localização',
    'músicos locais',
    'serviços musicais proximidade',
    'mapa profissionais'
  ],
};

export default function LocationSearchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Buscar por Localização
          </h1>
          <p className="text-gray-400">
            Encontre profissionais musicais próximos à sua região
          </p>
        </div>

        {/* Location Search Component */}
        <LocationSearch 
          searchRadius={15}
        />
      </div>
    </div>
  );
}