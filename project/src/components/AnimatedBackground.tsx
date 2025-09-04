import React from 'react';
import { WeatherData } from '../types/weather';

interface AnimatedBackgroundProps {
  weatherData?: WeatherData;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ weatherData }) => {
  if (!weatherData) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-1/3 -left-20 w-60 h-60 bg-white/5 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
        </div>
      </div>
    );
  }

  const temp = weatherData.current.temperature_2m;
  const weatherCode = weatherData.current.weather_code;
  const windSpeed = weatherData.current.wind_speed_10m;
  const humidity = weatherData.current.relative_humidity_2m;

  // Weather condition checks
  const isRainy = [51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode);
  const isSnowy = [71, 73, 75].includes(weatherCode);
  const isStormy = [95, 96, 99].includes(weatherCode);
  const isCloudy = [2, 3, 45, 48].includes(weatherCode);
  const isClear = [0, 1].includes(weatherCode);
  const isFoggy = [45, 48].includes(weatherCode);

  // Dynamic background based on weather and temperature
  const getBackgroundStyle = () => {
    if (isStormy) {
      return 'from-gray-800 via-gray-700 to-slate-900';
    } else if (isSnowy) {
      return 'from-blue-100 via-slate-200 to-blue-200';
    } else if (isRainy) {
      return 'from-gray-600 via-slate-500 to-blue-700';
    } else if (isFoggy) {
      return 'from-gray-400 via-gray-300 to-slate-400';
    } else if (isCloudy) {
      if (temp <= 10) {
        return 'from-gray-500 via-slate-400 to-blue-500';
      } else {
        return 'from-gray-400 via-slate-300 to-blue-400';
      }
    } else if (isClear) {
      if (temp <= 0) {
        return 'from-blue-200 via-cyan-100 to-blue-300'; // Clear but cold
      } else if (temp <= 10) {
        return 'from-blue-300 via-sky-200 to-blue-400'; // Clear and cool
      } else if (temp <= 20) {
        return 'from-sky-400 via-blue-300 to-cyan-500'; // Pleasant clear
      } else if (temp <= 30) {
        return 'from-yellow-300 via-orange-200 to-yellow-400'; // Warm and sunny
      } else {
        return 'from-orange-400 via-red-300 to-yellow-500'; // Hot and sunny
      }
    } else {
      // Default based on temperature
      if (temp <= 0) {
        return 'from-blue-900 via-indigo-800 to-purple-900';
      } else if (temp <= 10) {
        return 'from-blue-600 via-cyan-500 to-blue-700';
      } else if (temp <= 20) {
        return 'from-blue-400 via-sky-400 to-blue-500';
      } else if (temp <= 30) {
        return 'from-orange-300 via-yellow-400 to-orange-400';
      } else {
        return 'from-red-400 via-orange-400 to-yellow-500';
      }
    }
  };

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${getBackgroundStyle()} transition-all duration-1000`}>
      {/* Base floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-1/3 -left-20 w-60 h-60 bg-white/5 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 bg-white/10 rounded-full animate-float-slow"></div>
      </div>

      {/* Rain animation */}
      {isRainy && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`rain-${i}`}
              className="absolute w-0.5 bg-blue-200/60 animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 30 + 15}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 0.5 + 0.8}s`,
              }}
            />
          ))}
          {/* Rain puddle effect */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-blue-300/20 animate-pulse"></div>
        </div>
      )}

      {/* Snow animation */}
      {isSnowy && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute w-2 h-2 bg-white/90 rounded-full animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
              }}
            />
          ))}
          {/* Snow accumulation effect */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-white/30 animate-pulse"></div>
        </div>
      )}

      {/* Storm animation */}
      {isStormy && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-yellow-200/10 animate-lightning"></div>
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={`storm-rain-${i}`}
              className="absolute w-1 bg-blue-100/70 animate-storm-rain"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${Math.random() * 40 + 20}px`,
                animationDelay: `${Math.random() * 1}s`,
                animationDuration: `${Math.random() * 0.2 + 0.4}s`,
              }}
            />
          ))}
          {/* Thunder clouds */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gray-900/30 animate-cloud-movement"></div>
        </div>
      )}

      {/* Fog animation */}
      {isFoggy && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`fog-${i}`}
              className="absolute bg-white/20 rounded-full animate-fog-drift"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 60 + 30}px`,
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 15 + 20}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cloud animation */}
      {isCloudy && !isFoggy && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`cloud-${i}`}
              className="absolute bg-white/25 rounded-full animate-cloud-drift"
              style={{
                width: `${Math.random() * 120 + 60}px`,
                height: `${Math.random() * 50 + 25}px`,
                top: `${Math.random() * 60 + 10}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 15 + 20}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun animation for clear weather */}
      {isClear && temp > 15 && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-16 right-16 w-32 h-32 animate-sun-pulse">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`ray-${i}`}
                className="absolute w-1 bg-yellow-200/40 origin-bottom animate-sun-rays"
                style={{
                  height: `${Math.random() * 30 + 40}px`,
                  transform: `rotate(${i * 30}deg)`,
                  transformOrigin: '50% 100%',
                  animationDelay: `${i * 0.1}s`,
                  left: '50%',
                  bottom: '50%',
                }}
              />
            ))}
            <div className="absolute inset-6 bg-yellow-200/50 rounded-full animate-sun-glow"></div>
          </div>
          {/* Warm air shimmer effect */}
          {temp > 25 && (
            <div className="absolute inset-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={`shimmer-${i}`}
                  className="absolute w-1 h-8 bg-yellow-100/20 animate-heat-shimmer"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: '0%',
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 2 + 2}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wind effect */}
      {windSpeed > 15 && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={`wind-${i}`}
              className="absolute h-0.5 bg-white/25 animate-wind"
              style={{
                width: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: '-10%',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 1.5 + 1}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* High humidity mist effect */}
      {humidity > 80 && !isRainy && !isSnowy && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`mist-${i}`}
              className="absolute bg-white/15 rounded-full animate-mist-float"
              style={{
                width: `${Math.random() * 150 + 80}px`,
                height: `${Math.random() * 40 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 8 + 12}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Cold breath effect for very cold weather */}
      {temp < 0 && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`breath-${i}`}
              className="absolute bg-white/30 rounded-full animate-cold-breath"
              style={{
                width: `${Math.random() * 60 + 30}px`,
                height: `${Math.random() * 20 + 10}px`,
                bottom: `${Math.random() * 40 + 20}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${Math.random() * 3 + 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Particle effects for extreme weather */}
      {(temp > 35 || temp < -10) && (
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className={`absolute w-1 h-1 rounded-full animate-particle-float ${
                temp > 35 ? 'bg-orange-200/40' : 'bg-blue-100/60'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 4 + 6}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};