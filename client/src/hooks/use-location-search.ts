
import { useState, useCallback } from 'react';

interface LocationSuggestion {
  name: string;
  address: string;
  placeId?: string;
}

export function useLocationSearch() {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const searchLocations = useCallback(async (query: string): Promise<LocationSuggestion[]> => {
    if (query.length < 3) {
      setSuggestions([]);
      return [];
    }

    setLoading(true);

    try {
      // In production, you would use Google Places API or similar
      // For now, using mock data
      const mockSuggestions: LocationSuggestion[] = [
        { name: `${query} Police Station`, address: `${query} Police Station, City Center` },
        { name: `${query} Fire Station`, address: `${query} Fire Station, Emergency District` },
        { name: `${query} Hospital`, address: `${query} General Hospital, Medical District` },
        { name: `${query} Medical Center`, address: `${query} Medical Center, Health Complex` },
        { name: `Central ${query}`, address: `Central ${query} Office, Downtown` },
      ].filter(suggestion => 
        suggestion.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

      setSuggestions(mockSuggestions);
      setLoading(false);
      return mockSuggestions;
    } catch (error) {
      console.error('Error searching locations:', error);
      setSuggestions([]);
      setLoading(false);
      return [];
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    loading,
    searchLocations,
    clearSuggestions
  };
}
