'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useGeolocation from '@/hooks/useGeolocation';
import { useRouter } from 'next/navigation';

interface NearbyProfessionalsProps {
  searchRadius?: number;
  autoStart?: boolean;
  showMap?: boolean;
  maxResults?: number;
}

const NearbyProfessionals: React.FC<NearbyProfessionalsProps> = ({
  searchRadius = 10,
  autoStart = false,
  showMap = true,
  maxResults = 10
}) => {
  const [selectedRadius, setSelectedRadius] = useState(searchRadius);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const router = useRouter();

  const {
    position,
    nearbyProfessionals,
    isLoading,
    error,
    isSupported,
    requestLocation,
    searchNearby,
    clearResults
  } = useGeolocation({
    autoSearch: true,
    searchRadius: selectedRadius,
    enableHighAccuracy: true
  });

  useEffect(() => {
    if (autoStart && isSupported && !position) {
      setShowPermissionModal(true);
    }
  }, [autoStart, isSupported, position]);

  const handleLocationRequest = () => {
    setShowPermissionModal(false);
    requestLocation();
  };

  const handleRadiusChange = (newRadius: number) => {
    setSelectedRadius(newRadius);
    if (position) {
      searchNearby(newRadius);
    }
  };

  const radiusOptions = [
    { value: 5, label: '5km' },
    { value: 10, label: '10km' },
    { value: 15, label: '15km' },
    { value: 25, label: '25km' },
    { value: 50, label: '50km' }
  ];

  const displayedProfessionals = nearbyProfessionals.slice(0, maxResults);

  if (!isSupported) {
    return (
      <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">📍</div>
        <h3 className="text-xl font-bold text-white mb-2">
          Geolocalização não suportada
        </h3>
        <p className="text-gray-400">
          Seu navegador não suporta geolocalização. Use a busca por endereço.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Permission Modal */}
      <AnimatePresence>
        {showPermissionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 max-w-md w-full"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Permitir Localização
                </h3>
                <p className="text-gray-300 mb-6">
                  Para encontrar profissionais próximos a você, precisamos acessar sua localização.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPermissionModal(false)}
                    className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Não Agora
                  </button>
                  <button
                    onClick={handleLocationRequest}
                    className="flex-1 bg-primary-500 text-black px-4 py-3 rounded-lg hover:bg-primary-400 transition-colors font-medium"
                  >
                    Permitir
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Profissionais Próximos
          </h2>
          <p className="text-gray-400">
            {position 
              ? `Encontre profissionais musicais em um raio de ${selectedRadius}km`
              : 'Ative a localização para encontrar profissionais próximos'
            }
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Radius Selector */}
          {position && (
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Raio:</span>
              <select
                value={selectedRadius}
                onChange={(e) => handleRadiusChange(Number(e.target.value))}
                className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary-500"
              >
                {radiusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Location Button */}
          {!position && (
            <button
              onClick={requestLocation}
              disabled={isLoading}
              className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Localizando...</span>
                </>
              ) : (
                <>
                  <span>📍</span>
                  <span>Usar Localização</span>
                </>
              )}
            </button>
          )}

          {/* Refresh Button */}
          {position && (
            <button
              onClick={() => searchNearby(selectedRadius)}
              disabled={isLoading}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              title="Atualizar busca"
            >
              {isLoading ? '🔄' : '↻'}
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3"
        >
          <span className="text-red-400 text-xl">⚠️</span>
          <div>
            <h4 className="text-red-400 font-medium">Erro de Localização</h4>
            <p className="text-red-300 text-sm">{error}</p>
          </div>
          <button
            onClick={requestLocation}
            className="ml-auto bg-red-500/20 text-red-400 px-3 py-1 rounded text-sm hover:bg-red-500/30 transition-colors"
          >
            Tentar Novamente
          </button>
        </motion.div>
      )}

      {/* Location Info */}
      {position && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="text-green-400 text-xl">📍</span>
            <div>
              <h4 className="text-green-400 font-medium">Localização Detectada</h4>
              <p className="text-green-300 text-sm">
                Precisão: {position.accuracy.toFixed(0)}m • {nearbyProfessionals.length} profissionais encontrados
              </p>
            </div>
          </div>
          <button
            onClick={clearResults}
            className="text-gray-400 hover:text-red-400 transition-colors"
            title="Limpar resultados"
          >
            ✕
          </button>
        </motion.div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Buscando profissionais próximos...</p>
        </div>
      )}

      {/* Professionals List */}
      {displayedProfessionals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">
              {displayedProfessionals.length} Profissionais Encontrados
            </h3>
            {nearbyProfessionals.length > maxResults && (
              <button
                onClick={() => router.push('/bookings/search')}
                className="text-primary hover:text-primary/80 text-sm"
              >
                Ver todos ({nearbyProfessionals.length}) →
              </button>
            )}
          </div>

          <div className="grid gap-4">
            {displayedProfessionals.map((professional, index) => (
              <motion.div
                key={professional.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-card/50 border border-border rounded-xl p-4 hover:border-border/70 transition-all group cursor-pointer"
                onClick={() => router.push(`/bookings/professional/${professional.id}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold overflow-hidden">
                      {professional.avatar ? (
                        <img 
                          src={professional.avatar} 
                          alt={professional.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        professional.name.charAt(0)
                      )}
                    </div>
                    {professional.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-foreground font-semibold group-hover:text-primary transition-colors">
                          {professional.name}
                        </h4>
                        <p className="text-muted-foreground text-sm">{professional.service}</p>
                        <p className="text-muted-foreground text-xs">{professional.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="text-accent">⭐</span>
                          <span className="text-foreground text-sm font-medium">{professional.rating}</span>
                        </div>
                        <p className="text-primary font-bold">R$ {professional.price.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-primary flex items-center gap-1">
                          📍 {professional.distance.toFixed(1)}km
                        </span>
                        <span className={`flex items-center gap-1 ${professional.isOnline ? 'text-primary' : 'text-muted-foreground'}`}>
                          <span className={`w-2 h-2 rounded-full ${professional.isOnline ? 'bg-primary' : 'bg-muted'}`}></span>
                          {professional.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                      
                      <button className="bg-primary/20 text-primary px-4 py-1 rounded-lg text-sm hover:bg-primary/30 transition-colors">
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {nearbyProfessionals.length > maxResults && (
            <div className="text-center pt-4">
              <button
                onClick={() => router.push('/bookings/search')}
                className="bg-card text-foreground px-6 py-3 rounded-lg hover:bg-card/80 transition-colors"
              >
                Ver Mais Profissionais ({nearbyProfessionals.length - maxResults} restantes)
              </button>
            </div>
          )}
        </motion.div>
      )}

      {/* Empty State */}
      {position && !isLoading && nearbyProfessionals.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Nenhum profissional encontrado
          </h3>
          <p className="text-muted-foreground mb-6">
            Não encontramos profissionais em um raio de {selectedRadius}km. 
            Tente aumentar o raio de busca.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => handleRadiusChange(selectedRadius * 2)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Expandir Busca ({selectedRadius * 2}km)
            </button>
            <button
              onClick={() => router.push('/bookings/search')}
              className="bg-card text-foreground px-6 py-3 rounded-lg hover:bg-card/80 transition-colors"
            >
              Buscar por Categoria
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyProfessionals;