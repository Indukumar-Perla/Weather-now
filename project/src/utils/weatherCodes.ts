import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Sun, Zap } from 'lucide-react';

export const getWeatherCondition = (code: number) => {
  const conditions = {
    0: { description: 'Clear sky', icon: Sun },
    1: { description: 'Mainly clear', icon: Sun },
    2: { description: 'Partly cloudy', icon: Cloud },
    3: { description: 'Overcast', icon: Cloud },
    45: { description: 'Foggy', icon: Cloud },
    48: { description: 'Depositing rime fog', icon: Cloud },
    51: { description: 'Light drizzle', icon: CloudDrizzle },
    53: { description: 'Moderate drizzle', icon: CloudDrizzle },
    55: { description: 'Dense drizzle', icon: CloudDrizzle },
    61: { description: 'Slight rain', icon: CloudRain },
    63: { description: 'Moderate rain', icon: CloudRain },
    65: { description: 'Heavy rain', icon: CloudRain },
    71: { description: 'Slight snow fall', icon: CloudSnow },
    73: { description: 'Moderate snow fall', icon: CloudSnow },
    75: { description: 'Heavy snow fall', icon: CloudSnow },
    80: { description: 'Slight rain showers', icon: CloudRain },
    81: { description: 'Moderate rain showers', icon: CloudRain },
    82: { description: 'Violent rain showers', icon: CloudRain },
    95: { description: 'Thunderstorm', icon: Zap },
    96: { description: 'Thunderstorm with hail', icon: Zap },
    99: { description: 'Thunderstorm with heavy hail', icon: Zap },
  };

  return conditions[code as keyof typeof conditions] || { description: 'Unknown', icon: Cloud };
};