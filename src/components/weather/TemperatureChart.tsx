
import React, { useEffect, useRef } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import GlassCard from '../ui/GlassCard';

// Mock hourly temperature data
const getHourlyData = () => {
  const hours = [];
  for (let i = 0; i < 24; i++) {
    const hour = i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`;
    
    // Generate a temperature curve that peaks in the afternoon
    let temp;
    if (i < 6) {
      temp = Math.round(65 + i * 0.5); // Early morning - slowly rising
    } else if (i < 14) {
      temp = Math.round(68 + (i - 6) * 1.5); // Morning to afternoon - faster rise
    } else {
      temp = Math.round(80 - (i - 14) * 1.2); // Evening and night - falling
    }
    
    // Add small random variation
    temp += Math.round((Math.random() - 0.5) * 3);
    
    hours.push({
      hour,
      temp,
      feels: temp + Math.round(Math.random() * 4),
    });
  }
  return hours;
};

const hourlyData = getHourlyData();

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glassmorphism p-3 text-xs">
        <p className="font-orbitron text-cosmic-cyan">{label}</p>
        <p className="font-medium">Temp: {payload[0].value}°F</p>
        <p className="text-cosmic-magenta/80">Feels: {payload[1].value}°F</p>
      </div>
    );
  }
  return null;
};

const TemperatureChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const animateChart = () => {
      if (!chartRef.current) return;
      
      const paths = chartRef.current.querySelectorAll('path');
      paths.forEach((path, index) => {
        const pathLength = path.getTotalLength();
        
        // Set up the starting position
        path.style.strokeDasharray = `${pathLength}`;
        path.style.strokeDashoffset = `${pathLength}`;
        
        // Trigger a layout to get the animation working properly
        path.getBoundingClientRect();
        
        // Define the animation
        path.style.transition = `stroke-dashoffset 2s ease-in-out`;
        path.style.strokeDashoffset = '0';
      });
    };
    
    // Trigger animation when component mounts
    const timer = setTimeout(animateChart, 300);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <GlassCard>
      <div className="p-4">
        <h3 className="text-lg font-orbitron mb-4">24-Hour Temperature</h3>
        
        <div ref={chartRef} className="w-full h-52">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={hourlyData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0FF0FC" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0FF0FC" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="feelsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF00A0" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF00A0" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="hour" 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }} 
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                domain={['dataMin - 5', 'dataMax + 5']}
              />
              <Tooltip content={<CustomTooltip />} />
              
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="#0FF0FC" 
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#tempGradient)" 
                animationDuration={1500}
                activeDot={{ r: 6, fill: '#0FF0FC', stroke: '#FFFFFF' }}
              />
              <Area 
                type="monotone" 
                dataKey="feels" 
                stroke="#FF00A0" 
                strokeWidth={1.5}
                fillOpacity={1}
                fill="url(#feelsGradient)" 
                animationDuration={1500}
                activeDot={{ r: 4, fill: '#FF00A0', stroke: '#FFFFFF' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center mt-2 space-x-6 text-xs">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cosmic-cyan mr-2" />
            <span>Actual</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cosmic-magenta mr-2" />
            <span>Feels Like</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default TemperatureChart;
