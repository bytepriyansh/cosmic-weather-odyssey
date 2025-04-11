
import React, { useState } from 'react';
import { LayoutDashboard, Radar, CalendarClock, Wind, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';

type Tab = 'dashboard' | 'radar' | 'forecast' | 'airquality' | 'settings';

interface SidebarProps {
  activeTab: Tab;
}

const Sidebar = ({ activeTab }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { id: 'radar' as Tab, label: 'Radar', icon: Radar, path: '/radar' },
    { id: 'forecast' as Tab, label: 'Forecast', icon: CalendarClock, path: '/forecast' },
    { id: 'airquality' as Tab, label: 'Air Quality', icon: Wind, path: '/airquality' },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const handleTabClick = (tab: Tab, path: string) => {
    navigate(path);
  };

  return (
    <div 
      className={cn(
        "h-full glass-panel flex flex-col border-r border-cosmic-cyan/20 transition-all duration-500",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex justify-between items-center p-4">
        {expanded && (
          <h2 className="text-lg font-orbitron text-cosmic-cyan animate-pulse-glow">
            COSMIC<span className="text-cosmic-magenta">WEATHER</span>
          </h2>
        )}
        <button 
          onClick={toggleSidebar}
          className="cosmic-icon-button ml-auto"
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      <div className="mt-10 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id, tab.path)}
            className={cn(
              "w-full flex items-center p-4 transition-all duration-300 group relative overflow-hidden",
              activeTab === tab.id
                ? "text-cosmic-cyan bg-cosmic-cyan/10 border-l-2 border-cosmic-cyan"
                : "text-white/70 hover:text-cosmic-cyan hover:bg-cosmic-cyan/5"
            )}
          >
            <div className="relative z-10 flex items-center">
              <tab.icon 
                size={22} 
                className={cn(
                  "transition-all", 
                  activeTab === tab.id ? "animate-pulse-glow" : "group-hover:scale-110"
                )} 
              />
              
              {expanded && (
                <span className="ml-4 font-medium">{tab.label}</span>
              )}
            </div>

            {/* Interactive ripple effect */}
            <span 
              className={cn(
                "absolute inset-0 opacity-0 bg-cosmic-cyan/10 group-hover:opacity-100 group-active:animate-ripple",
                activeTab === tab.id && "opacity-30"
              )}
            />
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-cosmic-cyan/20">
        {expanded ? (
          <div className="text-xs text-white/50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cosmic-cyan animate-pulse-glow mr-2" />
            Weather System Online
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 rounded-full bg-cosmic-cyan animate-pulse-glow" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
