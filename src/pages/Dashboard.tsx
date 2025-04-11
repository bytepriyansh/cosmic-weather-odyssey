
import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { useParams } from 'react-router-dom';
import LocationSearch from '../components/weather/LocationSearch';
import CurrentWeather from '../components/weather/CurrentWeather';
import WeatherForecast from '../components/weather/WeatherForecast';
import TemperatureChart from '../components/weather/TemperatureChart';
import SunCycle from '../components/weather/SunCycle';
import GlassCard from '../components/ui/GlassCard';
import { Clock, User, RefreshCw } from 'lucide-react';
import { useWeatherData } from '../hooks/useWeatherData';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [location, setLocation] = useState('New York, USA');
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const { data, loading } = useWeatherData(location);
  
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      
      // Format time as HH:MM:SS
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      
      // Format date as Day, Month DD, YYYY
      const dateStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
      
      setCurrentTime(timeStr);
      setCurrentDate(dateStr);
    };
    
    // Update immediately
    updateDateTime();
    
    // Update every second
    const interval = setInterval(updateDateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
  };
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };
  
  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="flex items-center gap-6 mb-6">
        <div className="w-1/3">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>
        
        <div className="flex-1 flex justify-center">
          <GlassCard className="px-4 py-2 mx-auto flex items-center gap-2">
            <Clock size={18} className="text-cosmic-cyan" />
            <div>
              <div className="text-sm opacity-80">{currentDate}</div>
              <div className="font-orbitron text-lg">{currentTime}</div>
            </div>
          </GlassCard>
        </div>
        
        <div className="flex gap-4 items-center">
          <button 
            onClick={handleRefresh}
            className="cosmic-icon-button p-2.5"
          >
            <RefreshCw size={20} className={isRefreshing ? "animate-spin" : ""} />
          </button>
          
          <GlassCard className="p-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-cosmic-cyan rounded-full flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="text-sm">
              <div className="font-medium">Guest User</div>
              <div className="text-xs opacity-60">Mission Control</div>
            </div>
          </GlassCard>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Main Weather Card */}
        <div className="lg:col-span-1">
          <CurrentWeather location={location} />
        </div>
        
        {/* Temperature Chart */}
        <div className="lg:col-span-2">
          <TemperatureChart />
        </div>
      </div>
      
      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Forecast */}
        <div className="lg:col-span-3">
          <WeatherForecast />
        </div>
        
        {/* Sun Cycle */}
        <div className="lg:col-span-1">
          {data && (
            <SunCycle 
              sunrise={data.sunTimes.sunrise}
              sunset={data.sunTimes.sunset}
              currentTime={data.sunTimes.currentTime}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
