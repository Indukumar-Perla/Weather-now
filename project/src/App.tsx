import React from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SearchInput } from './components/SearchInput';
import { WeatherCard } from './components/WeatherCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { useWeather } from './hooks/useWeather';
import { useLocalStorage } from './hooks/useLocalStorage';
import { LocationData } from './types/weather';

function App() {
  const { weatherData, loading, error, currentLocation, fetchWeather, searchCities } = useWeather();
  const [recentSearches, setRecentSearches] = useLocalStorage<LocationData[]>('weather-recent-searches', []);

  const handleLocationSelect = async (location: LocationData) => {
    await fetchWeather(location);
    
    // Add to recent searches if not already present
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item.id !== location.id);
      return [location, ...filtered].slice(0, 5);
    });
  };

  const retryLastSearch = () => {
    if (currentLocation) {
      fetchWeather(currentLocation);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatedBackground weatherData={weatherData} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <SearchInput
              onLocationSelect={handleLocationSelect}
              onSearch={searchCities}
              recentSearches={recentSearches}
            />
          </div>

          <div className="mb-8">
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage message={error} onRetry={retryLastSearch} />
            ) : weatherData && currentLocation ? (
              <WeatherCard weatherData={weatherData} location={currentLocation} />
            ) : (
              <WelcomeScreen />
            )}
          </div>

          <footer className="text-center text-white/80 text-sm">
            <p>Powered by Open-Meteo API • Built for outdoor enthusiasts</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;