import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { LocationData } from '../types/weather';

interface SearchInputProps {
  onLocationSelect: (location: LocationData) => void;
  onSearch: (query: string) => Promise<LocationData[]>;
  recentSearches: LocationData[];
}

export const SearchInput: React.FC<SearchInputProps> = ({
  onLocationSelect,
  onSearch,
  recentSearches,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const searchDebounced = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchResults = await onSearch(query);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(searchDebounced, 300);
    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleLocationClick = (location: LocationData) => {
    setQuery(`${location.name}, ${location.country}`);
    setIsOpen(false);
    onLocationSelect(location);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const displayResults = query.length >= 2 ? results : recentSearches.slice(0, 5);

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800 bg-white/80 backdrop-blur-sm"
        />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto z-50"
        >
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2">Searching...</p>
            </div>
          ) : displayResults.length > 0 ? (
            <div className="py-2">
              {query.length < 2 && recentSearches.length > 0 && (
                <div className="px-4 py-2 text-sm text-gray-500 border-b border-gray-100 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Recent searches
                </div>
              )}
              {displayResults.map((location) => (
                <button
                  key={`${location.id}-${location.latitude}-${location.longitude}`}
                  onClick={() => handleLocationClick(location)}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-150 flex items-center gap-3 group"
                >
                  <MapPin className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
                  <div className="flex-1">
                    <div className="text-gray-800 font-medium">
                      {location.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {location.admin1 && `${location.admin1}, `}
                      {location.country}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              No cities found for "{query}"
            </div>
          ) : recentSearches.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Start typing to search for a city
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};