
import React, { useState, useEffect } from 'react';
import { Wind, Droplets, Thermometer, ArrowUpRight } from 'lucide-react';
import AnimatedIcon from '../ui/AnimatedIcon';
import GlassCard from '../ui/GlassCard';
import { cn } from '@/lib/utils';

interface Weather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  conditionIcon: any;
}

interface CurrentWeatherProps {
  location: string;
  className?: string;
}

// Mock weather data based on location
const getWeatherData = (location: string): Weather => {
  // In a real app, this would be an API call
  const weatherTypes: Record<string, any> = {
    'New York, USA': {
      temperature: 72,
      feelsLike: 75,
      humidity: 65,
      windSpeed: 8,
      condition: 'Partly Cloudy',
      conditionIcon: 'partly-cloudy-day'
    },
    'London, UK': {
      temperature: 64,
      feelsLike: 62,
      humidity: 80,
      windSpeed: 12,
      condition: 'Rain',
      conditionIcon: 'rain'
    },
    'Tokyo, Japan': {
      temperature: 82,
      feelsLike: 86,
      humidity: 70,
      windSpeed: 5,
      condition: 'Clear',
      conditionIcon: 'clear-day'
    },
    'Current Location': {
      temperature: 76,
      feelsLike: 78,
      humidity: 58,
      windSpeed: 10,
      condition: 'Clear',
      conditionIcon: 'clear-day'
    }
  };

  return weatherTypes[location] || {
    temperature: 75,
    feelsLike: 77,
    humidity: 60,
    windSpeed: 8,
    condition: 'Clear',
    conditionIcon: 'clear-day'
  };
};

const CurrentWeather = ({ location, className }: CurrentWeatherProps) => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [animatingTemp, setAnimatingTemp] = useState(false);
  
  useEffect(() => {
    setAnimatingTemp(true);
    const data = getWeatherData(location);
    setWeather(data);
    
    const timer = setTimeout(() => {
      setAnimatingTemp(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location]);

  if (!weather) return null;

  return (
    <GlassCard 
      className={cn("relative overflow-hidden", className)}
      hoverEffect={false}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0">
        <div 
          className={cn(
            "absolute inset-0 opacity-20 transition-opacity duration-1000",
            weather.conditionIcon === 'clear-day' && "bg-gradient-to-br from-yellow-500/40 to-orange-600/40",
            weather.conditionIcon === 'clear-night' && "bg-gradient-to-br from-cosmic-indigo/40 to-cosmic-violet/40",
            weather.conditionIcon === 'partly-cloudy-day' && "bg-gradient-to-br from-blue-400/40 to-gray-400/40",
            weather.conditionIcon === 'partly-cloudy-night' && "bg-gradient-to-br from-cosmic-indigo/40 to-gray-600/40",
            weather.conditionIcon === 'cloudy' && "bg-gradient-to-br from-gray-400/40 to-gray-600/40",
            weather.conditionIcon === 'rain' && "bg-gradient-to-br from-blue-500/40 to-blue-700/40",
            weather.conditionIcon === 'thunderstorm' && "bg-gradient-to-br from-gray-700/40 to-blue-900/40",
            weather.conditionIcon === 'snow' && "bg-gradient-to-br from-blue-100/40 to-blue-300/40",
          )}
        />
      </div>
      
      <div className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-orbitron">{location}</h2>
          <div className="text-sm text-white/70">Today</div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <AnimatedIcon type={weather.conditionIcon} size={80} className="mr-4" />
            <div className="text-4xl font-orbitron relative flex items-center">
              <div className={cn(
                "transition-all",
                animatingTemp ? "animate-number-change" : ""
              )}>
                {weather.temperature}°
              </div>
              <div className="text-lg font-normal text-white/70 ml-1">F</div>
            </div>
          </div>
          <div className="bg-white/10 px-4 py-2 rounded-full text-sm">
            {weather.condition}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-3 transition-all hover:bg-white/10">
            <Thermometer className="text-cosmic-magenta mb-2" size={20} />
            <div className="text-sm text-white/70">Feels Like</div>
            <div className="font-semibold">{weather.feelsLike}°</div>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-3 transition-all hover:bg-white/10">
            <Wind className="text-cosmic-cyan mb-2" size={20} />
            <div className="text-sm text-white/70">Wind</div>
            <div className="font-semibold">{weather.windSpeed} mph</div>
          </div>
          
          <div className="flex flex-col items-center bg-white/5 rounded-lg p-3 transition-all hover:bg-white/10">
            <Droplets className="text-blue-400 mb-2" size={20} />
            <div className="text-sm text-white/70">Humidity</div>
            <div className="font-semibold">{weather.humidity}%</div>
          </div>
        </div>
        
        <div className="mt-6 text-sm">
          <button className="flex items-center text-cosmic-cyan hover:text-cosmic-cyan/80 transition-colors">
            <span>View Detailed Forecast</span>
            <ArrowUpRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </GlassCard>
  );
};

export default CurrentWeather;
