import { useState, useCallback } from 'react';
import { WeatherData, LocationData } from '../types/weather';
import { getCurrentWeather, searchCities } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);

  const fetchWeather = useCallback(async (location: LocationData) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentWeather(location.latitude, location.longitude);
      setWeatherData(data);
      setCurrentLocation(location);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    weatherData,
    loading,
    error,
    currentLocation,
    fetchWeather,
    searchCities,
  };
};