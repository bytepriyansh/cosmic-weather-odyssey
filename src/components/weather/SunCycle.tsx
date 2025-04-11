
import React, { useEffect, useRef, useState } from 'react';
import GlassCard from '../ui/GlassCard';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SunCycleProps {
  sunrise: string;
  sunset: string;
  currentTime: string;
}

const SunCycle = ({ sunrise, sunset, currentTime }: SunCycleProps) => {
  const orbitRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(0);
  const [isDay, setIsDay] = useState(true);
  
  // Convert time string to minutes since midnight
  const timeToMinutes = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':').map(Number);
    return hour * 60 + minute;
  };
  
  useEffect(() => {
    // Calculate sun position based on current time relative to sunrise/sunset
    const calculatePosition = () => {
      const sunriseMinutes = timeToMinutes(sunrise);
      const sunsetMinutes = timeToMinutes(sunset);
      const currentMinutes = timeToMinutes(currentTime);
      
      let percentage;
      if (currentMinutes < sunriseMinutes) {
        // Before sunrise
        percentage = (currentMinutes + 1440 - sunsetMinutes) / 
                     ((1440 - sunsetMinutes) + sunriseMinutes);
        setIsDay(false);
      } else if (currentMinutes > sunsetMinutes) {
        // After sunset
        percentage = (currentMinutes - sunsetMinutes) / 
                     ((1440 - sunsetMinutes) + sunriseMinutes);
        setIsDay(false);
      } else {
        // During daylight
        percentage = (currentMinutes - sunriseMinutes) / 
                     (sunsetMinutes - sunriseMinutes);
        setIsDay(true);
      }
      
      setPosition(percentage);
    };
    
    calculatePosition();
  }, [sunrise, sunset, currentTime]);
  
  // Calculate the angle for the celestial body
  const angle = position * 180;
  
  // Calculate x, y coordinates for the celestial body along the orbit
  const orbitRadius = 90; // Percentage of the orbit's size
  const radians = (angle * Math.PI) / 180;
  
  // Calculate position along a semi-circle
  const x = 50 + orbitRadius * Math.sin(radians);
  const y = 100 - Math.abs(orbitRadius * Math.cos(radians));
  
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-orbitron">Sun Cycle</h3>
      </div>
      
      <div className="relative h-40 mb-4" ref={orbitRef}>
        {/* Orbit path */}
        <div className="absolute w-full h-[180px] top-full border-t-[1px] border-dashed border-white/20 rounded-t-full" />
        
        {/* Sunrise label */}
        <div className="absolute top-full mt-2 left-0 text-xs text-white/70">
          <div className="flex flex-col items-center">
            <Sun size={14} className="text-yellow-400" />
            <span>{sunrise}</span>
            <span>Sunrise</span>
          </div>
        </div>
        
        {/* Sunset label */}
        <div className="absolute top-full mt-2 right-0 text-xs text-white/70">
          <div className="flex flex-col items-center">
            <Sun size={14} className="text-orange-400" />
            <span>{sunset}</span>
            <span>Sunset</span>
          </div>
        </div>
        
        {/* Current time indicator */}
        <div className="absolute top-full transform -translate-x-1/2 mt-14 text-xs text-cosmic-cyan" style={{ left: `${position * 100}%` }}>
          <div className="h-10 w-[1px] bg-cosmic-cyan/50 absolute bottom-full left-1/2 transform -translate-x-1/2" />
          <span className="mt-1 inline-block">{currentTime}</span>
        </div>
        
        {/* Sun/Moon position indicator */}
        <div 
          className={cn(
            "absolute flex items-center justify-center w-10 h-10 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
            "animate-pulse-glow"
          )}
          style={{ 
            left: `${x}%`, 
            top: `${y}%`
          }}
        >
          {isDay ? (
            <div className="relative">
              <Sun className="text-yellow-400 z-10" size={24} />
              <div className="absolute inset-0 bg-yellow-400 blur-md opacity-50 rounded-full" />
            </div>
          ) : (
            <div className="relative">
              <Moon className="text-cosmic-cyan z-10" size={24} />
              <div className="absolute inset-0 bg-cosmic-cyan blur-md opacity-50 rounded-full" />
            </div>
          )}
        </div>
        
        {/* Day/Night gradient background */}
        <div 
          className={cn(
            "absolute inset-0 rounded-full opacity-10 transition-opacity duration-1000",
            isDay 
              ? "bg-gradient-to-b from-yellow-400 to-transparent" 
              : "bg-gradient-to-b from-cosmic-indigo to-transparent"
          )}
        />
      </div>
      
      {/* Current status */}
      <div className="text-center text-sm">
        <span className={isDay ? "text-yellow-400" : "text-cosmic-cyan"}>
          {isDay ? "Daylight" : "Nighttime"}
        </span>
        {" · "}
        <span className="text-white/70">
          {isDay 
            ? `${Math.floor((timeToMinutes(sunset) - timeToMinutes(currentTime)) / 60)}h until sunset` 
            : `${Math.floor((timeToMinutes("24:00") - timeToMinutes(currentTime) + timeToMinutes(sunrise)) / 60)}h until sunrise`
          }
        </span>
      </div>
    </GlassCard>
  );
};

export default SunCycle;
