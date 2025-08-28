'use client';

import { useState, useEffect, useCallback } from 'react';

interface GeolocationPosition {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

interface Professional {
  id: string;
  name: string;
  service: string;
  rating: number;
  distance: number;
  lat: number;
  lng: number;
  avatar: string;
  price: number;
  isOnline: boolean;
  address: string;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  autoSearch?: boolean;
  searchRadius?: number;
}

interface UseGeolocationReturn {
  position: GeolocationPosition | null;
  nearbyProfessionals: Professional[];
  isLoading: boolean;
  error: string | null;
  isSupported: boolean;
  requestLocation: () => void;
  searchNearby: (radius?: number) => Promise<void>;
  clearResults: () => void;
}

const useGeolocation = (options: UseGeolocationOptions = {}): UseGeolocationReturn => {
  const {
    enableHighAccuracy = true,
    timeout = 10000,
    maximumAge = 300000, // 5 minutes
    autoSearch = true,
    searchRadius = 10
  } = options;

  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [nearbyProfessionals, setNearbyProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported] = useState(() => 'geolocation' in navigator);

  // Mock professionals data
  const mockProfessionals: Professional[] = [
    {
      id: '1',
      name: 'Marina Santos',
      service: 'Vocalista Pop',
      rating: 4.9,
      distance: 0,
      lat: -23.5505,
      lng: -46.6333,
      avatar: '/images/professionals/marina.jpg',
      price: 800,
      isOnline: true,
      address: 'Vila Madalena, São Paulo'
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      service: 'Produtor Hip Hop',
      rating: 4.8,
      distance: 0,
      lat: -23.5614,
      lng: -46.6558,
      avatar: '/images/professionals/carlos.jpg',
      price: 600,
      isOnline: false,
      address: 'Bela Vista, São Paulo'
    },
    {
      id: '3',
      name: 'Ana Silva',
      service: 'Guitarrista',
      rating: 4.7,
      distance: 0,
      lat: -23.5434,
      lng: -46.6516,
      avatar: '/images/professionals/ana.jpg',
      price: 450,
      isOnline: true,
      address: 'Consolação, São Paulo'
    },
    {
      id: '4',
      name: 'Roberto Lima',
      service: 'Técnico de Som',
      rating: 4.6,
      distance: 0,
      lat: -23.5329,
      lng: -46.6395,
      avatar: '/images/professionals/roberto.jpg',
      price: 350,
      isOnline: true,
      address: 'Centro, São Paulo'
    },
    {
      id: '5',
      name: 'Fernanda Costa',
      service: 'DJ',
      rating: 4.8,
      distance: 0,
      lat: -23.5489,
      lng: -46.6388,
      avatar: '/images/professionals/fernanda.jpg',
      price: 750,
      isOnline: true,
      address: 'Jardins, São Paulo'
    }
  ];

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }, []);

  // Search for nearby professionals
  const searchNearby = useCallback(async (radius = searchRadius) => {
    if (!position) return;

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Calculate distances and filter professionals
      const professionalsWithDistance = mockProfessionals.map(prof => ({
        ...prof,
        distance: calculateDistance(position.lat, position.lng, prof.lat, prof.lng)
      }));

      const nearbyProfs = professionalsWithDistance
        .filter(prof => prof.distance <= radius)
        .sort((a, b) => a.distance - b.distance);

      setNearbyProfessionals(nearbyProfs);

      // Store in localStorage for caching
      localStorage.setItem('nearbyProfessionals', JSON.stringify({
        professionals: nearbyProfs,
        position,
        timestamp: Date.now(),
        radius
      }));

    } catch (err) {
      setError('Erro ao buscar profissionais próximos');
      console.error('Search nearby error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [position, searchRadius, calculateDistance]);

  // Request user location
  const requestLocation = useCallback(() => {
    if (!isSupported) {
      setError('Geolocalização não é suportada neste navegador');
      return;
    }

    setIsLoading(true);
    setError(null);

    const successHandler = (pos: GeolocationPosition) => {
      const newPosition = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        timestamp: pos.timestamp
      };

      setPosition(newPosition);
      setIsLoading(false);

      // Auto search if enabled
      if (autoSearch) {
        // Small delay to allow state to update
        setTimeout(() => {
          searchNearby(searchRadius);
        }, 100);
      }

      // Store position in localStorage
      localStorage.setItem('userPosition', JSON.stringify(newPosition));
    };

    const errorHandler = (err: GeolocationPositionError) => {
      setIsLoading(false);
      
      switch (err.code) {
        case err.PERMISSION_DENIED:
          setError('Permissão de localização negada. Ative a localização nas configurações do navegador.');
          break;
        case err.POSITION_UNAVAILABLE:
          setError('Localização indisponível. Verifique sua conexão GPS.');
          break;
        case err.TIMEOUT:
          setError('Timeout ao obter localização. Tente novamente.');
          break;
        default:
          setError('Erro desconhecido ao obter localização.');
          break;
      }
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy,
      timeout,
      maximumAge
    });
  }, [isSupported, enableHighAccuracy, timeout, maximumAge, autoSearch, searchRadius, searchNearby]);

  // Clear results
  const clearResults = useCallback(() => {
    setNearbyProfessionals([]);
    localStorage.removeItem('nearbyProfessionals');
  }, []);

  // Load cached data on mount
  useEffect(() => {
    try {
      // Load cached position
      const cachedPosition = localStorage.getItem('userPosition');
      if (cachedPosition) {
        const parsedPosition = JSON.parse(cachedPosition);
        const age = Date.now() - parsedPosition.timestamp;
        
        // Use cached position if it's not too old (5 minutes)
        if (age < maximumAge) {
          setPosition(parsedPosition);
        }
      }

      // Load cached professionals
      const cachedProfessionals = localStorage.getItem('nearbyProfessionals');
      if (cachedProfessionals) {
        const parsedData = JSON.parse(cachedProfessionals);
        const age = Date.now() - parsedData.timestamp;
        
        // Use cached data if it's not too old (10 minutes)
        if (age < 600000) {
          setNearbyProfessionals(parsedData.professionals);
        }
      }
    } catch (err) {
      console.error('Error loading cached data:', err);
    }
  }, [maximumAge]);

  // Watch position changes
  useEffect(() => {
    if (!isSupported || !position) return;

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const newPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          timestamp: pos.timestamp
        };

        // Only update if position changed significantly (more than 100 meters)
        const distance = calculateDistance(
          position.lat,
          position.lng,
          newPosition.lat,
          newPosition.lng
        );

        if (distance > 0.1) {
          setPosition(newPosition);
          
          if (autoSearch) {
            searchNearby(searchRadius);
          }
        }
      },
      (err) => {
        console.error('Watch position error:', err);
      },
      {
        enableHighAccuracy: false, // Use less accurate but faster updates for watching
        timeout: 30000,
        maximumAge: 60000
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [isSupported, position, autoSearch, searchRadius, searchNearby, calculateDistance]);

  return {
    position,
    nearbyProfessionals,
    isLoading,
    error,
    isSupported,
    requestLocation,
    searchNearby,
    clearResults
  };
};

export default useGeolocation;