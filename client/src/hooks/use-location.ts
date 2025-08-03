import { useState, useEffect } from 'react';

interface LocationData {
  lat: number;
  lng: number;
  address: string;
}

export function useLocation() {
  const [location, setLocation] = useState<LocationData | null>(() => {
    // Load last known location from localStorage
    const saved = localStorage.getItem('lastKnownLocation');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if location is less than 5 minutes old
      if (Date.now() - parsed.timestamp < 5 * 60 * 1000) {
        return {
          lat: parsed.lat,
          lng: parsed.lng,
          address: "Current Location"
        };
      }
    }
    return null;
  });
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
        
        const locationData = {
          lat: latitude,
          lng: longitude,
          address: "Current Location"
        };
        
        // Save location to localStorage
        localStorage.setItem('lastKnownLocation', JSON.stringify({
          lat: latitude,
          lng: longitude,
          timestamp: Date.now()
        }));
        
        setLocation(locationData);
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
    // Only get location if permission was granted and we don't have recent location
    if (localStorage.getItem('locationPermissionGranted') === 'true' && !location) {
      getCurrentLocation();
    }
  }, [location]);

  return { location, loading, error, getCurrentLocation };
}
