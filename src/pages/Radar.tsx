
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { ZoomIn, ZoomOut, Layers, Maximize, RotateCcw } from 'lucide-react';

const Radar = () => {
  const [zoom, setZoom] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };
  
  const handleRotate = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-orbitron bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta bg-clip-text text-transparent animate-pulse-slow">
          Global Weather Radar
        </h1>
        
        <div className="flex gap-2">
          <button className="cosmic-icon-button" onClick={handleZoomIn}>
            <ZoomIn size={18} />
          </button>
          <button className="cosmic-icon-button" onClick={handleZoomOut}>
            <ZoomOut size={18} />
          </button>
          <button className="cosmic-icon-button" onClick={handleRotate}>
            <RotateCcw size={18} className={isRotating ? "animate-spin" : ""} />
          </button>
          <button className="cosmic-icon-button">
            <Layers size={18} />
          </button>
          <button className="cosmic-icon-button">
            <Maximize size={18} />
          </button>
        </div>
      </div>
      
      <GlassCard className="relative h-[calc(100vh-12rem)] overflow-hidden group animate-tilt" hoverEffect>
        <div className="absolute inset-0 bg-gradient-to-br from-cosmic-cyan/20 to-cosmic-magenta/20 opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <div 
          className="h-full w-full flex items-center justify-center transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        >
          <div className="relative w-[500px] h-[500px]">
            <div className="absolute inset-0 rounded-full border-2 border-cosmic-cyan/30 animate-ping-slow"></div>
            <div className="absolute inset-0 rounded-full border border-cosmic-magenta/40 animate-pulse-slow"></div>
            
            {/* Radar Sweep */}
            <div className="absolute inset-0 origin-center animate-spin-slow">
              <div className="h-1/2 w-1 bg-gradient-to-t from-cosmic-cyan to-transparent mx-auto"></div>
            </div>
            
            {/* Grid Lines */}
            <div className="absolute inset-0 rounded-full border border-cosmic-cyan/20"></div>
            <div className="absolute inset-[20%] rounded-full border border-cosmic-cyan/20"></div>
            <div className="absolute inset-[40%] rounded-full border border-cosmic-cyan/20"></div>
            <div className="absolute inset-[60%] rounded-full border border-cosmic-cyan/20"></div>
            <div className="absolute inset-[80%] rounded-full border border-cosmic-cyan/20"></div>
            
            {/* Map Markers */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cosmic-magenta rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-cosmic-cyan rounded-full animate-ping-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Data Overlays */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-mono">
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cosmic-cyan rounded-full"></div>
              <span>Precipitation</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-cosmic-magenta rounded-full"></div>
              <span>Storm Cells</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Lightning</span>
            </div>
          </div>
          
          <div className="bg-black/30 p-2 rounded backdrop-blur-sm">
            <div className="text-cosmic-cyan animate-pulse">SCANNING</div>
            <div>LAT: 40.7128° N</div>
            <div>LON: 74.0060° W</div>
          </div>
        </div>
      </GlassCard>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-4 animate-tilt-slow">
          <h3 className="font-medium mb-2 text-cosmic-cyan">Precipitation Levels</h3>
          <div className="h-40 bg-gradient-to-b from-cosmic-cyan/10 to-cosmic-cyan/30 rounded relative">
            <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-cosmic-cyan/20 rounded"></div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 animate-tilt-slow">
          <h3 className="font-medium mb-2 text-cosmic-magenta">Storm Intensity</h3>
          <div className="h-40 bg-gradient-to-b from-cosmic-magenta/10 to-cosmic-magenta/30 rounded relative">
            <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-cosmic-magenta/20 rounded"></div>
          </div>
        </GlassCard>
        
        <GlassCard className="p-4 animate-tilt-slow">
          <h3 className="font-medium mb-2 text-yellow-400">Lightning Activity</h3>
          <div className="h-40 bg-gradient-to-b from-yellow-400/10 to-yellow-400/30 rounded relative">
            <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-yellow-400/20 rounded"></div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Radar;
