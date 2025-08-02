import { useState, useEffect } from 'react';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // For demo purposes, using a mock address
        // In production, you would use a reverse geocoding service
        const mockAddress = "123 Main Street, City Center";
        
        setLocation({
          lat: latitude,
          lng: longitude,
          address: mockAddress
        });
        setLoading(false);
      },
      (err) => {
        setError(`Location error: ${err.message}`);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, loading, error, getCurrentLocation };
}
