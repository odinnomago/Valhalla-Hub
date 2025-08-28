'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Professional {
  id: string;
  name: string;
  service: string;
  rating: number;
  distance: number;
  address: string;
  lat: number;
  lng: number;
  avatar: string;
  price: number;
  isOnline: boolean;
}

interface LocationSearchProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  onProfessionalsFound?: (professionals: Professional[]) => void;
  searchRadius?: number; // in kilometers
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  onProfessionalsFound,
  searchRadius = 10
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [searchLocation, setSearchLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [nearbyProfessionals, setNearbyProfessionals] = useState<Professional[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const autocompleteRef = useRef<google.maps.places.AutocompleteService | null>(null);
  const placesServiceRef = useRef<google.maps.places.PlacesService | null>(null);

  // Mock professionals data - in real implementation, this would come from API
  const mockProfessionals: Professional[] = [
    {
      id: '1',
      name: 'Marina Santos',
      service: 'Vocalista Pop',
      rating: 4.9,
      distance: 2.3,
      address: 'Rua Augusta, 123 - Vila Madalena, São Paulo',
      lat: -23.5505,
      lng: -46.6333,
      avatar: '/images/professionals/marina.jpg',
      price: 800,
      isOnline: true
    },
    {
      id: '2',
      name: 'Carlos Mendes',
      service: 'Produtor Hip Hop',
      rating: 4.8,
      distance: 4.7,
      address: 'Av. Paulista, 456 - Bela Vista, São Paulo',
      lat: -23.5614,
      lng: -46.6558,
      avatar: '/images/professionals/carlos.jpg',
      price: 600,
      isOnline: false
    },
    {
      id: '3',
      name: 'Ana Silva',
      service: 'Guitarrista',
      rating: 4.7,
      distance: 6.1,
      address: 'Rua da Consolação, 789 - Consolação, São Paulo',
      lat: -23.5434,
      lng: -46.6516,
      avatar: '/images/professionals/ana.jpg',
      price: 450,
      isOnline: true
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      if (typeof google !== 'undefined') {
        setIsLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  // Initialize map and services
  useEffect(() => {
    if (isLoaded && mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = new google.maps.Map(mapRef.current, {
        center: { lat: -23.5505, lng: -46.6333 }, // São Paulo default
        zoom: 12,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: 'hsl(var(--card))' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [{ color: 'hsl(var(--card))' }]
          },
          {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [{ color: 'hsl(var(--muted-foreground))' }]
          }
        ]
      });

      // Initialize services
      autocompleteRef.current = new google.maps.places.AutocompleteService();
      placesServiceRef.current = new google.maps.places.PlacesService(mapInstanceRef.current);

      // Get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setUserLocation(userPos);
            mapInstanceRef.current?.setCenter(userPos);
            
            // Add user location marker
            new google.maps.Marker({
              position: userPos,
              map: mapInstanceRef.current,
              title: 'Sua Localização',
              icon: {
                url: '/images/icons/user-location.png',
                scaledSize: new google.maps.Size(30, 30)
              }
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    }
  }, [isLoaded]);

  // Handle location search suggestions
  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    
    if (value.length > 2 && autocompleteRef.current) {
      autocompleteRef.current.getPlacePredictions(
        {
          input: value,
          componentRestrictions: { country: 'BR' },
          types: ['establishment', 'geocode']
        },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSuggestions(predictions.slice(0, 5));
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle location selection
  const handleLocationSelect = (placeId: string, description: string) => {
    if (placesServiceRef.current) {
      placesServiceRef.current.getDetails(
        { placeId: placeId, fields: ['geometry', 'formatted_address'] },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && place?.geometry?.location) {
            const location = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              address: place.formatted_address || description
            };

            setSearchLocation(location);
            setSearchQuery(description);
            setSuggestions([]);
            
            // Update map center
            mapInstanceRef.current?.setCenter(location);
            
            // Clear previous markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            // Add search location marker
            const searchMarker = new google.maps.Marker({
              position: location,
              map: mapInstanceRef.current,
              title: 'Local de Busca',
              icon: {
                url: '/images/icons/search-location.png',
                scaledSize: new google.maps.Size(25, 25)
              }
            });
            markersRef.current.push(searchMarker);

            onLocationSelect?.(location);
            searchNearbyProfessionals(location);
          }
        }
      );
    }
  };

  // Search for nearby professionals
  const searchNearbyProfessionals = async (location: { lat: number; lng: number }) => {
    setIsSearching(true);

    try {
      // Simulate API call for nearby professionals
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Filter professionals by distance (mock calculation)
      const professionalsWithDistance = mockProfessionals.map(prof => ({
        ...prof,
        distance: calculateDistance(location.lat, location.lng, prof.lat, prof.lng)
      }));

      const nearbyProfs = professionalsWithDistance
        .filter(prof => prof.distance <= searchRadius)
        .sort((a, b) => a.distance - b.distance);

      setNearbyProfessionals(nearbyProfs);
      onProfessionalsFound?.(nearbyProfs);

      // Add professional markers to map
      nearbyProfs.forEach(prof => {
        const marker = new google.maps.Marker({
          position: { lat: prof.lat, lng: prof.lng },
          map: mapInstanceRef.current,
          title: prof.name,
          icon: {
            url: '/images/icons/professional-marker.png',
            scaledSize: new google.maps.Size(20, 20)
          }
        });

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="color: hsl(var(--foreground)); padding: 8px;">
              <h3>${prof.name}</h3>
              <p>${prof.service}</p>
              <p>⭐ ${prof.rating} • ${prof.distance.toFixed(1)}km</p>
              <p>R$ ${prof.price.toLocaleString()}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(mapInstanceRef.current, marker);
        });

        markersRef.current.push(marker);
      });

    } catch (error) {
      console.error('Error searching professionals:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const useCurrentLocation = () => {
    if (userLocation) {
      const location = {
        ...userLocation,
        address: 'Sua localização atual'
      };
      setSearchLocation(location);
      setSearchQuery('Sua localização atual');
      onLocationSelect?.(location);
      searchNearbyProfessionals(userLocation);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-400">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Location Search */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white">Buscar por Localização</h3>
        
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchInput(e.target.value)}
            placeholder="Digite um endereço, bairro ou ponto de referência..."
            className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-primary-500"
          />
          <button
            onClick={useCurrentLocation}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-400 transition-colors"
            title="Usar localização atual"
          >
            📍
          </button>

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.place_id}
                  onClick={() => handleLocationSelect(suggestion.place_id, suggestion.description)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors text-white"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400">📍</span>
                    <span>{suggestion.description}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Status */}
        {isSearching && (
          <div className="flex items-center gap-2 text-primary-400">
            <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Buscando profissionais próximos...</span>
          </div>
        )}

        {searchLocation && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Local de Busca</h4>
                <p className="text-gray-400 text-sm">{searchLocation.address}</p>
                <p className="text-primary-400 text-sm">
                  Raio de busca: {searchRadius}km • {nearbyProfessionals.length} profissionais encontrados
                </p>
              </div>
              <button
                onClick={() => {
                  setSearchLocation(null);
                  setSearchQuery('');
                  setNearbyProfessionals([]);
                  markersRef.current.forEach(marker => marker.setMap(null));
                  markersRef.current = [];
                }}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div ref={mapRef} className="w-full h-96" />
      </div>

      {/* Nearby Professionals List */}
      {nearbyProfessionals.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-lg font-bold text-white">
            Profissionais Próximos ({nearbyProfessionals.length})
          </h4>
          
          <div className="grid gap-4">
            {nearbyProfessionals.map((prof, index) => (
              <motion.div
                key={prof.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-black font-bold overflow-hidden">
                    {prof.avatar ? (
                      <img src={prof.avatar} alt={prof.name} className="w-full h-full object-cover" />
                    ) : (
                      prof.name.charAt(0)
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-white font-semibold">{prof.name}</h5>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${prof.isOnline ? 'bg-green-400' : 'bg-gray-500'}`}></span>
                        <span className="text-gray-400 text-sm">
                          {prof.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-2">{prof.service}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-yellow-400">⭐ {prof.rating}</span>
                        <span className="text-gray-400">📍 {prof.distance.toFixed(1)}km</span>
                        <span className="text-primary-400 font-bold">R$ {prof.price.toLocaleString()}</span>
                      </div>
                      
                      <button className="bg-primary-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-primary-400 transition-colors">
                        Ver Perfil
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;