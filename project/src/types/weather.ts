export interface WeatherData {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
  };
}

export interface LocationData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface WeatherCondition {
  description: string;
  icon: string;
}