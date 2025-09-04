import { WeatherData, LocationData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

export const searchCities = async (query: string): Promise<LocationData[]> => {
  if (query.length < 2) return [];
  
  try {
    const response = await fetch(
      `${GEOCODING_URL}/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search cities');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
};

export const getCurrentWeather = async (
  latitude: number,
  longitude: number
): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};