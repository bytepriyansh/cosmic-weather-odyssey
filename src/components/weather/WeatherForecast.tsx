
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../ui/GlassCard';
import AnimatedIcon from '../ui/AnimatedIcon';
import { cn } from '@/lib/utils';

// Mock forecast data
const forecastData = [
  { day: 'MON', temp: 72, tempLow: 58, condition: 'clear-day', precipitation: 0 },
  { day: 'TUE', temp: 75, tempLow: 60, condition: 'partly-cloudy-day', precipitation: 10 },
  { day: 'WED', temp: 70, tempLow: 62, condition: 'rain', precipitation: 60 },
  { day: 'THU', temp: 68, tempLow: 57, condition: 'rain', precipitation: 80 },
  { day: 'FRI', temp: 65, tempLow: 55, condition: 'cloudy', precipitation: 30 },
  { day: 'SAT', temp: 70, tempLow: 58, condition: 'partly-cloudy-day', precipitation: 20 },
  { day: 'SUN', temp: 74, tempLow: 60, condition: 'clear-day', precipitation: 0 },
];

const WeatherForecast = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const maxVisible = 5;
  
  const handlePrev = () => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  };
  
  const handleNext = () => {
    setActiveIndex(Math.max(0, Math.min(activeIndex + 1, forecastData.length - maxVisible)));
  };
  
  return (
    <GlassCard className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-orbitron">7-Day Forecast</h3>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrev} 
            disabled={activeIndex === 0}
            className="cosmic-icon-button disabled:opacity-50"
          >
            <ChevronLeft size={18} />
          </button>
          <button 
            onClick={handleNext} 
            disabled={activeIndex >= forecastData.length - maxVisible}
            className="cosmic-icon-button disabled:opacity-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-2 overflow-hidden">
        {forecastData.slice(activeIndex, activeIndex + maxVisible).map((day, index) => (
          <div 
            key={day.day} 
            className="animate-scale-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ForecastDay day={day} />
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

interface ForecastDayProps {
  day: {
    day: string;
    temp: number;
    tempLow: number;
    condition: string;
    precipitation: number;
  };
}

const ForecastDay = ({ day }: ForecastDayProps) => {
  return (
    <div className="bg-white/5 rounded-lg p-3 transition-all hover:bg-white/10 hover:shadow-neon-cyan flex flex-col items-center">
      <div className="text-sm font-medium mb-2">{day.day}</div>
      <AnimatedIcon type={day.condition as any} size={30} className="mb-2" />
      
      <div className="flex items-center justify-center space-x-2 mb-2">
        <span className="font-medium">{day.temp}°</span>
        <span className="text-white/60 text-sm">{day.tempLow}°</span>
      </div>
      
      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full",
            day.precipitation > 60 ? "bg-blue-500" : 
            day.precipitation > 30 ? "bg-blue-400" : "bg-blue-300",
          )}
          style={{ width: `${day.precipitation}%` }}
        />
      </div>
      <div className="text-xs text-white/60 mt-1">{day.precipitation}%</div>
    </div>
  );
};

export default WeatherForecast;
