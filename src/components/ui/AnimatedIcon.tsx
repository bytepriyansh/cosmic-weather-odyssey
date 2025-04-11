
import React from 'react';
import { Cloud, CloudDrizzle, CloudLightning, CloudRain, CloudSnow, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

type WeatherType = 'clear-day' | 'clear-night' | 'partly-cloudy-day' | 'partly-cloudy-night' | 
                  'cloudy' | 'rain' | 'drizzle' | 'snow' | 'thunderstorm';

interface AnimatedIconProps {
  type: WeatherType;
  size?: number;
  className?: string;
}

const AnimatedIcon = ({ type, size = 24, className }: AnimatedIconProps) => {
  const renderIcon = () => {
    switch (type) {
      case 'clear-day':
        return (
          <div className="relative">
            <Sun size={size} className="text-yellow-400 animate-pulse-glow" />
            {/* Sun rays */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md animate-pulse-glow" />
          </div>
        );
      
      case 'clear-night':
        return (
          <div className="relative">
            <Moon size={size} className="text-cosmic-cyan animate-pulse-glow" />
            <div className="absolute inset-0 bg-cosmic-cyan/20 rounded-full blur-md animate-pulse-glow" />
          </div>
        );
      
      case 'partly-cloudy-day':
        return (
          <div className="relative">
            <Sun size={size} className="text-yellow-400 absolute -left-1 -top-1 animate-pulse-glow" />
            <Cloud size={size} className="text-gray-300 relative animate-float" />
          </div>
        );
      
      case 'partly-cloudy-night':
        return (
          <div className="relative">
            <Moon size={size} className="text-cosmic-cyan absolute -left-1 -top-1 animate-pulse-glow" />
            <Cloud size={size} className="text-gray-300 relative animate-float" />
          </div>
        );
      
      case 'cloudy':
        return (
          <div className="relative">
            <Cloud size={size} className="text-gray-300 animate-float" />
          </div>
        );
      
      case 'rain':
        return (
          <div className="relative">
            <CloudRain size={size} className="text-gray-300" />
            {/* Animated rain drops */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-cosmic-cyan w-0.5 h-2 rounded-full animate-rain"
                style={{
                  top: '60%',
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      
      case 'drizzle':
        return (
          <div className="relative">
            <CloudDrizzle size={size} className="text-gray-300" />
            {/* Animated drizzle drops */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-cosmic-cyan/70 w-0.5 h-1 rounded-full animate-rain"
                style={{
                  top: '60%',
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      
      case 'snow':
        return (
          <div className="relative">
            <CloudSnow size={size} className="text-gray-300" />
            {/* Animated snowflakes */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute bg-white w-1 h-1 rounded-full animate-rain"
                style={{
                  top: '60%',
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        );
      
      case 'thunderstorm':
        return (
          <div className="relative">
            <CloudLightning size={size} className="text-gray-300" />
            {/* Lightning flash effect */}
            <div 
              className="absolute inset-0 bg-yellow-400/0 animate-pulse-glow"
              style={{ animationDuration: '0.8s' }}
            />
          </div>
        );
      
      default:
        return <Sun size={size} className="text-yellow-400" />;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {renderIcon()}
    </div>
  );
};

export default AnimatedIcon;
