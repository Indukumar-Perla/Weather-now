import React from 'react';
import { Wind, Droplets, Thermometer } from 'lucide-react';
import { WeatherData, LocationData } from '../types/weather';
import { getWeatherCondition } from '../utils/weatherCodes';

interface WeatherCardProps {
  weatherData: WeatherData;
  location: LocationData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, location }) => {
  const { current } = weatherData;
  const condition = getWeatherCondition(current.weather_code);
  const IconComponent = condition.icon;

  const formatTemperature = (temp: number) => `${Math.round(temp)}°C`;
  const formatWindSpeed = (speed: number) => `${Math.round(speed)} km/h`;
  const formatHumidity = (humidity: number) => `${Math.round(humidity)}%`;

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 w-full max-w-md mx-auto border border-white/20">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">
          {location.name}
        </h2>
        <p className="text-gray-600">
          {location.admin1 && `${location.admin1}, `}
          {location.country}
        </p>
      </div>

      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
          <IconComponent className="h-10 w-10 text-blue-600" />
        </div>
        <div className="text-5xl font-bold text-gray-800 mb-2">
          {formatTemperature(current.temperature_2m)}
        </div>
        <p className="text-gray-600 text-lg capitalize">
          {condition.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-2">
            <Thermometer className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Feels like</p>
          <p className="font-semibold text-gray-800">
            {formatTemperature(current.apparent_temperature)}
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-2">
            <Droplets className="h-6 w-6 text-teal-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Humidity</p>
          <p className="font-semibold text-gray-800">
            {formatHumidity(current.relative_humidity_2m)}
          </p>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-2">
            <Wind className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-500 mb-1">Wind</p>
          <p className="font-semibold text-gray-800">
            {formatWindSpeed(current.wind_speed_10m)}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};