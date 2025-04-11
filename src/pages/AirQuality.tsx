
import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Wind, Droplets, AlertTriangle, Info, RefreshCw } from 'lucide-react';

const AirQuality = () => {
  const [aqi, setAqi] = useState(35);
  const [isAnimating, setIsAnimating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    // Simulate loading animation when component mounts
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleRefresh = () => {
    setRefreshing(true);
    setIsAnimating(true);
    // Simulate new data loading
    setTimeout(() => {
      const newAqi = Math.floor(Math.random() * 150);
      setAqi(newAqi);
      setRefreshing(false);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 1500);
  };
  
  const getAqiCategory = (value) => {
    if (value <= 50) return { category: 'Good', color: 'bg-green-500', textColor: 'text-green-500' };
    if (value <= 100) return { category: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-500' };
    if (value <= 150) return { category: 'Unhealthy for Sensitive Groups', color: 'bg-orange-500', textColor: 'text-orange-500' };
    if (value <= 200) return { category: 'Unhealthy', color: 'bg-red-500', textColor: 'text-red-500' };
    if (value <= 300) return { category: 'Very Unhealthy', color: 'bg-purple-500', textColor: 'text-purple-500' };
    return { category: 'Hazardous', color: 'bg-rose-700', textColor: 'text-rose-700' };
  };
  
  const { category, color, textColor } = getAqiCategory(aqi);

  // Pollutants data
  const pollutants = [
    { name: 'PM2.5', value: 12.5, unit: 'μg/m³', description: 'Fine particulate matter' },
    { name: 'PM10', value: 25.8, unit: 'μg/m³', description: 'Coarse particulate matter' },
    { name: 'O3', value: 85, unit: 'ppb', description: 'Ozone' },
    { name: 'NO2', value: 15, unit: 'ppb', description: 'Nitrogen dioxide' },
    { name: 'SO2', value: 5, unit: 'ppb', description: 'Sulfur dioxide' },
    { name: 'CO', value: 0.8, unit: 'ppm', description: 'Carbon monoxide' }
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-orbitron bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta bg-clip-text text-transparent animate-pulse-slow">
          Air Quality Monitor
        </h1>
        
        <button 
          className="cosmic-icon-button p-2.5 flex items-center gap-2"
          onClick={handleRefresh}
        >
          <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
          <span className="text-sm">Refresh Data</span>
        </button>
      </div>
      
      {/* Main AQI Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 md:col-span-2 flex flex-col items-center justify-center relative overflow-hidden animate-tilt">
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/5 to-cosmic-magenta/5 opacity-30"></div>
          
          <h2 className="text-lg font-medium mb-4">Air Quality Index</h2>
          
          <div className="relative w-60 h-60 mb-4">
            {/* AQI Gauge Background */}
            <div className="absolute inset-0 rounded-full border-8 border-gray-700/30"></div>
            
            {/* AQI Value Circle */}
            <div className={`absolute inset-4 rounded-full ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'} transition-all duration-1000 flex items-center justify-center`}>
              <div className={`absolute inset-0 rounded-full ${color} opacity-20 backdrop-blur-md`}></div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${textColor} transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}>
                  {aqi}
                </div>
                <div className="text-lg mt-2 font-medium">{category}</div>
              </div>
            </div>
            
            {/* Animated Rings */}
            <div className="absolute inset-0 rounded-full border-2 border-cosmic-cyan/30 animate-ping-slow"></div>
            <div className="absolute inset-2 rounded-full border border-cosmic-magenta/20 animate-spin-slow"></div>
          </div>
          
          <div className="text-center max-w-md">
            <p className="mb-2 font-medium">Current Status</p>
            <p className="text-sm opacity-80">
              {category === 'Good' && 'Air quality is satisfactory, and air pollution poses little or no risk.'}
              {category === 'Moderate' && 'Air quality is acceptable, but there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'}
              {category === 'Unhealthy for Sensitive Groups' && 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'}
              {category === 'Unhealthy' && 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'}
              {category === 'Very Unhealthy' && 'Health alert: The risk of health effects is increased for everyone.'}
              {category === 'Hazardous' && 'Health warning of emergency conditions: everyone is more likely to be affected.'}
            </p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex flex-col relative overflow-hidden animate-tilt">
          <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/5 to-cosmic-magenta/5 opacity-30"></div>
          
          <h2 className="text-lg font-medium mb-4">Health Recommendations</h2>
          
          <div className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Wind size={18} className="text-cosmic-cyan" />
              </div>
              <div>
                <h3 className="font-medium text-cosmic-cyan">Ventilation</h3>
                <p className="text-sm opacity-80">
                  {aqi <= 50 ? 'Safe to open windows and enjoy outdoor air.' :
                   aqi <= 100 ? 'Consider keeping windows closed during peak traffic hours.' :
                   'Keep windows closed and use air purifiers if available.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <AlertTriangle size={18} className="text-cosmic-magenta" />
              </div>
              <div>
                <h3 className="font-medium text-cosmic-magenta">Outdoor Activity</h3>
                <p className="text-sm opacity-80">
                  {aqi <= 50 ? 'Great conditions for outdoor activities.' :
                   aqi <= 100 ? 'Sensitive individuals should consider reducing prolonged outdoor exertion.' :
                   aqi <= 150 ? 'Everyone should reduce prolonged or heavy exertion outdoors.' :
                   'Avoid outdoor physical activities; stay indoors when possible.'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1">
                <Info size={18} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-400">Sensitive Groups</h3>
                <p className="text-sm opacity-80">
                  {aqi <= 50 ? 'No special precautions needed for sensitive groups.' :
                   aqi <= 100 ? 'Unusually sensitive people should consider reducing prolonged outdoor exertion.' :
                   'Children, elderly, and those with respiratory or heart conditions should limit outdoor exposure.'}
                </p>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
      
      {/* Pollutants Details */}
      <div>
        <h2 className="text-lg font-medium mb-4 text-cosmic-cyan">Pollutant Levels</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pollutants.map((pollutant, index) => (
            <GlassCard key={index} className="p-4 animate-tilt-slow">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">{pollutant.name}</h3>
                <div className="text-sm opacity-70">{pollutant.description}</div>
              </div>
              
              <div className="flex items-end gap-2 mb-2">
                <div className="text-2xl font-orbitron text-cosmic-cyan">{pollutant.value}</div>
                <div className="text-sm opacity-70 mb-1">{pollutant.unit}</div>
              </div>
              
              <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta animate-pulse-slow rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (pollutant.value / (pollutant.name === 'PM2.5' ? 35 : pollutant.name === 'PM10' ? 150 : pollutant.name === 'O3' ? 100 : pollutant.name === 'NO2' ? 100 : pollutant.name === 'SO2' ? 75 : 9)) * 100)}%` }}
                ></div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
      
      {/* Air Quality Trends */}
      <GlassCard className="p-6 animate-tilt">
        <h2 className="text-lg font-medium mb-6 text-cosmic-magenta">24-Hour AQI Trend</h2>
        
        <div className="h-48 relative">
          {/* Simple AQI trend visualization */}
          <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end">
            {Array.from({ length: 24 }, (_, i) => {
              const value = Math.floor(35 + Math.sin(i / 24 * Math.PI * 2) * 30 + Math.random() * 15);
              const { color } = getAqiCategory(value);
              return (
                <div 
                  key={i} 
                  className={`flex-1 ${color} mx-0.5 rounded-t opacity-60 transition-all duration-500`}
                  style={{ height: `${value}%` }}
                ></div>
              );
            })}
          </div>
          
          {/* Time indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs opacity-60 pt-2 border-t border-gray-500/30">
            <div>12 AM</div>
            <div>6 AM</div>
            <div>12 PM</div>
            <div>6 PM</div>
            <div>12 AM</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default AirQuality;
