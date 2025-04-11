
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Calendar, ChevronLeft, ChevronRight, Droplets, Thermometer, Wind } from 'lucide-react';

const Forecast = () => {
  const [selectedDay, setSelectedDay] = useState(0);
  
  const days = [
    { day: 'Today', date: 'April 11', high: 72, low: 58, condition: 'Sunny', precip: 0, wind: 5, humidity: 45 },
    { day: 'Friday', date: 'April 12', high: 68, low: 56, condition: 'Partly Cloudy', precip: 10, wind: 8, humidity: 50 },
    { day: 'Saturday', date: 'April 13', high: 65, low: 54, condition: 'Cloudy', precip: 30, wind: 10, humidity: 60 },
    { day: 'Sunday', date: 'April 14', high: 63, low: 52, condition: 'Rain', precip: 70, wind: 15, humidity: 75 },
    { day: 'Monday', date: 'April 15', high: 60, low: 50, condition: 'Thunderstorms', precip: 80, wind: 20, humidity: 85 },
    { day: 'Tuesday', date: 'April 16', high: 64, low: 52, condition: 'Cloudy', precip: 40, wind: 12, humidity: 65 },
    { day: 'Wednesday', date: 'April 17', high: 68, low: 56, condition: 'Partly Cloudy', precip: 20, wind: 8, humidity: 55 }
  ];
  
  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`,
    temp: Math.round(days[selectedDay].low + (Math.sin(i / 24 * Math.PI) * (days[selectedDay].high - days[selectedDay].low))),
    precip: Math.round(days[selectedDay].precip * (1 + Math.sin(i / 12 * Math.PI) * 0.5))
  }));

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return '☀️';
      case 'Partly Cloudy': return '⛅';
      case 'Cloudy': return '☁️';
      case 'Rain': return '🌧️';
      case 'Thunderstorms': return '⛈️';
      default: return '☀️';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-orbitron bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta bg-clip-text text-transparent animate-pulse-slow">
          Weather Forecast
        </h1>
        
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-cosmic-cyan" />
          <span className="text-sm">7-Day Forecast</span>
        </div>
      </div>
      
      {/* 7-Day Forecast Carousel */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {days.map((day, index) => (
            <GlassCard 
              key={index}
              className={`snap-start p-4 min-w-[160px] transition-all duration-300 ${selectedDay === index ? 'border-cosmic-cyan shadow-neon-cyan scale-105' : 'opacity-80'}`}
              onClick={() => setSelectedDay(index)}
              hoverEffect
            >
              <div className="flex flex-col items-center">
                <div className="text-lg font-medium">{day.day}</div>
                <div className="text-xs opacity-70">{day.date}</div>
                <div className="text-4xl my-3">{getWeatherIcon(day.condition)}</div>
                <div className="flex gap-2 justify-center">
                  <span className="text-cosmic-cyan">{day.high}°</span>
                  <span className="opacity-60">{day.low}°</span>
                </div>
                <div className="text-xs mt-2 opacity-70">{day.condition}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      {/* Selected Day Detail */}
      <GlassCard className="p-6 relative overflow-hidden animate-tilt">
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/5 to-cosmic-magenta/5 opacity-30"></div>
        
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-medium">{days[selectedDay].day}</h2>
            <p className="text-sm opacity-70">{days[selectedDay].date}, 2025</p>
          </div>
          <div className="text-5xl">{getWeatherIcon(days[selectedDay].condition)}</div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <Thermometer size={24} className="text-cosmic-cyan mb-2" />
            <div className="text-sm opacity-70">Temperature</div>
            <div className="text-lg">
              <span className="text-cosmic-cyan">{days[selectedDay].high}°</span> / <span className="opacity-80">{days[selectedDay].low}°</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Droplets size={24} className="text-cosmic-magenta mb-2" />
            <div className="text-sm opacity-70">Precipitation</div>
            <div className="text-lg">{days[selectedDay].precip}%</div>
          </div>
          
          <div className="flex flex-col items-center">
            <Wind size={24} className="text-yellow-400 mb-2" />
            <div className="text-sm opacity-70">Wind Speed</div>
            <div className="text-lg">{days[selectedDay].wind} mph</div>
          </div>
          
          <div className="flex flex-col items-center">
            <Droplets size={24} className="text-blue-400 mb-2" />
            <div className="text-sm opacity-70">Humidity</div>
            <div className="text-lg">{days[selectedDay].humidity}%</div>
          </div>
        </div>
      </GlassCard>
      
      {/* Hourly Forecast */}
      <div>
        <h3 className="font-medium mb-3 text-cosmic-cyan">Hourly Forecast</h3>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-3 min-w-max">
            {hours.map((hour, index) => (
              <GlassCard key={index} className="p-3 w-20 flex flex-col items-center animate-tilt-slow">
                <div className="text-xs font-medium">{hour.hour}</div>
                <div className="text-lg my-1">{hour.temp}°</div>
                <div className="text-xs text-cosmic-magenta">{hour.precip}%</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
      
      {/* Extended Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-4 animate-tilt">
          <h3 className="font-medium mb-3 text-cosmic-cyan">Temperature Trends</h3>
          <div className="h-48 relative">
            {/* Simple temperature visualization */}
            <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end">
              {hours.map((hour, index) => (
                <div 
                  key={index} 
                  className="flex-1 bg-gradient-to-t from-cosmic-cyan to-cosmic-magenta opacity-60 mx-0.5 rounded-t transition-all duration-500"
                  style={{ height: `${(hour.temp - days[selectedDay].low) / (days[selectedDay].high - days[selectedDay].low) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 animate-tilt">
          <h3 className="font-medium mb-3 text-cosmic-magenta">Precipitation Probability</h3>
          <div className="h-48 relative">
            {/* Simple precipitation visualization */}
            <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end">
              {hours.map((hour, index) => (
                <div 
                  key={index} 
                  className="flex-1 bg-cosmic-magenta opacity-60 mx-0.5 rounded-t transition-all duration-500"
                  style={{ height: `${hour.precip}%` }}
                ></div>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Forecast;
