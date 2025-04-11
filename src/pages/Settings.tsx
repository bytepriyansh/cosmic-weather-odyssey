
import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Settings as SettingsIcon, Sun, Moon, Volume2, Volume, VolumeX, Sliders, Monitor, Smartphone, Globe, Languages, User, Bell, Lock, Cloud, Download } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState('cosmic');
  const [animations, setAnimations] = useState(true);
  const [sounds, setSounds] = useState(1);
  const [units, setUnits] = useState('imperial');
  const [language, setLanguage] = useState('english');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dataSourceExpanded, setDataSourceExpanded] = useState(false);
  
  const handleVolumeChange = (e) => {
    setSounds(parseFloat(e.target.value));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-orbitron bg-gradient-to-r from-cosmic-cyan to-cosmic-magenta bg-clip-text text-transparent animate-pulse-slow">
          System Settings
        </h1>
        
        <div className="flex items-center gap-2">
          <SettingsIcon size={18} className="text-cosmic-cyan" />
          <span className="text-sm">Control Panel</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Appearance Settings */}
        <GlassCard className="p-6 animate-tilt">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Monitor size={18} className="text-cosmic-cyan" />
            <span>Display Settings</span>
          </h2>
          
          <div className="space-y-6">
            {/* Theme Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Sun size={16} className="text-yellow-400" />
                <span>Theme</span>
              </label>
              
              <div className="grid grid-cols-3 gap-3">
                <button 
                  className={`p-4 rounded-lg transition-all duration-300 ${theme === 'cosmic' ? 'bg-cosmic-cyan/20 border border-cosmic-cyan' : 'bg-black/20 hover:bg-black/30'}`}
                  onClick={() => setTheme('cosmic')}
                >
                  <div className="h-16 rounded bg-gradient-to-br from-cosmic-cyan to-cosmic-magenta opacity-80 mb-2"></div>
                  <div className="text-xs">Cosmic</div>
                </button>
                
                <button 
                  className={`p-4 rounded-lg transition-all duration-300 ${theme === 'aurora' ? 'bg-cosmic-cyan/20 border border-cosmic-cyan' : 'bg-black/20 hover:bg-black/30'}`}
                  onClick={() => setTheme('aurora')}
                >
                  <div className="h-16 rounded bg-gradient-to-br from-green-400 to-blue-500 opacity-80 mb-2"></div>
                  <div className="text-xs">Aurora</div>
                </button>
                
                <button 
                  className={`p-4 rounded-lg transition-all duration-300 ${theme === 'sunset' ? 'bg-cosmic-cyan/20 border border-cosmic-cyan' : 'bg-black/20 hover:bg-black/30'}`}
                  onClick={() => setTheme('sunset')}
                >
                  <div className="h-16 rounded bg-gradient-to-br from-orange-500 to-pink-500 opacity-80 mb-2"></div>
                  <div className="text-xs">Sunset</div>
                </button>
              </div>
            </div>
            
            {/* Animations Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Sliders size={16} className="text-cosmic-magenta" />
                <span>UI Animations</span>
              </label>
              
              <button 
                className={`w-12 h-6 rounded-full relative ${animations ? 'bg-cosmic-cyan' : 'bg-gray-600'} transition-colors duration-300`}
                onClick={() => setAnimations(!animations)}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300 ${animations ? 'left-7' : 'left-0.5'}`}
                ></div>
              </button>
            </div>
            
            {/* Sound Effects */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                {sounds === 0 ? <VolumeX size={16} className="text-gray-400" /> : 
                 sounds < 0.5 ? <Volume size={16} className="text-yellow-400" /> : 
                 <Volume2 size={16} className="text-yellow-400" />}
                <span>Interface Sounds</span>
              </label>
              
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1"
                value={sounds}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </GlassCard>
        
        {/* Units & Language */}
        <GlassCard className="p-6 animate-tilt">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <Globe size={18} className="text-cosmic-magenta" />
            <span>Regional Settings</span>
          </h2>
          
          <div className="space-y-6">
            {/* Units */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Temperature Units</label>
              
              <div className="flex bg-black/20 rounded-lg p-1 w-fit">
                <button 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${units === 'imperial' ? 'bg-cosmic-cyan text-black font-medium' : 'hover:bg-black/20'}`}
                  onClick={() => setUnits('imperial')}
                >
                  Fahrenheit (°F)
                </button>
                
                <button 
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${units === 'metric' ? 'bg-cosmic-cyan text-black font-medium' : 'hover:bg-black/20'}`}
                  onClick={() => setUnits('metric')}
                >
                  Celsius (°C)
                </button>
              </div>
            </div>
            
            {/* Language */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Languages size={16} className="text-cosmic-cyan" />
                <span>Interface Language</span>
              </label>
              
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700 focus:border-cosmic-cyan focus:outline-none transition-colors duration-300"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="japanese">Japanese</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>
            
            {/* Auto Refresh */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Cloud size={16} className="text-yellow-400" />
                <span>Auto-refresh Weather Data</span>
              </label>
              
              <button 
                className={`w-12 h-6 rounded-full relative ${autoRefresh ? 'bg-cosmic-cyan' : 'bg-gray-600'} transition-colors duration-300`}
                onClick={() => setAutoRefresh(!autoRefresh)}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300 ${autoRefresh ? 'left-7' : 'left-0.5'}`}
                ></div>
              </button>
            </div>
          </div>
        </GlassCard>
        
        {/* User Preferences */}
        <GlassCard className="p-6 animate-tilt">
          <h2 className="text-lg font-medium mb-6 flex items-center gap-2">
            <User size={18} className="text-cosmic-cyan" />
            <span>User Preferences</span>
          </h2>
          
          <div className="space-y-6">
            {/* Default Location */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Default Location</label>
              <input 
                type="text" 
                placeholder="Enter city name"
                defaultValue="New York, USA"
                className="w-full p-3 rounded-lg bg-black/20 border border-gray-700 focus:border-cosmic-cyan focus:outline-none transition-colors duration-300"
              />
            </div>
            
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2">
                <Bell size={16} className="text-cosmic-magenta" />
                <span>Weather Alerts</span>
              </label>
              
              <button 
                className={`w-12 h-6 rounded-full relative ${notifications ? 'bg-cosmic-cyan' : 'bg-gray-600'} transition-colors duration-300`}
                onClick={() => setNotifications(!notifications)}
              >
                <div 
                  className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all duration-300 ${notifications ? 'left-7' : 'left-0.5'}`}
                ></div>
              </button>
            </div>
            
            {/* Privacy */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Lock size={16} className="text-yellow-400" />
                  <span>Privacy Settings</span>
                </label>
                
                <button className="text-xs text-cosmic-cyan">
                  Manage
                </button>
              </div>
              
              <div className="text-xs opacity-70">
                Control how your location data and preferences are stored and used.
              </div>
            </div>
          </div>
        </GlassCard>
        
        {/* Data Sources */}
        <GlassCard className="p-6 animate-tilt">
          <button 
            className="w-full text-left"
            onClick={() => setDataSourceExpanded(!dataSourceExpanded)}
          >
            <h2 className="text-lg font-medium mb-2 flex items-center gap-2">
              <Download size={18} className="text-cosmic-magenta" />
              <span>Weather Data Sources</span>
            </h2>
            
            <p className="text-sm opacity-70 mb-4">
              Configure which weather providers and APIs are used to fetch data.
            </p>
          </button>
          
          {dataSourceExpanded && (
            <div className="space-y-4 pt-2 border-t border-gray-700/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">OpenWeather API</div>
                  <div className="text-xs opacity-70">Primary data source</div>
                </div>
                
                <button 
                  className="px-3 py-1 bg-cosmic-cyan/20 rounded text-cosmic-cyan text-sm hover:bg-cosmic-cyan/30 transition-colors duration-300"
                >
                  Configure
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Weather.gov</div>
                  <div className="text-xs opacity-70">US weather alerts</div>
                </div>
                
                <button 
                  className="px-3 py-1 bg-cosmic-cyan/20 rounded text-cosmic-cyan text-sm hover:bg-cosmic-cyan/30 transition-colors duration-300"
                >
                  Configure
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">AirQuality.io</div>
                  <div className="text-xs opacity-70">Air quality data</div>
                </div>
                
                <button 
                  className="px-3 py-1 bg-cosmic-cyan/20 rounded text-cosmic-cyan text-sm hover:bg-cosmic-cyan/30 transition-colors duration-300"
                >
                  Configure
                </button>
              </div>
              
              <button 
                className="w-full p-2 mt-2 border border-dashed border-gray-700 rounded-lg text-sm text-center hover:border-cosmic-cyan hover:text-cosmic-cyan transition-colors duration-300"
              >
                + Add Custom Data Source
              </button>
            </div>
          )}
        </GlassCard>
      </div>
      
      {/* Footer Actions */}
      <div className="flex justify-end gap-4 pt-4">
        <button 
          className="px-6 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        >
          Cancel
        </button>
        
        <button 
          className="px-6 py-2 rounded-lg bg-cosmic-cyan text-black font-medium hover:bg-cosmic-cyan/80 transition-colors duration-300"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
