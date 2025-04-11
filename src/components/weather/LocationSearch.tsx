
import React, { useState, useEffect, useRef } from 'react';
import { Search, Mic, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

const LocationSearch = ({ onLocationSelect }: LocationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock location data
  const locations = [
    'New York, USA',
    'London, UK',
    'Tokyo, Japan',
    'Paris, France',
    'Berlin, Germany',
    'Sydney, Australia',
    'Toronto, Canada',
    'Los Angeles, USA',
    'Amsterdam, Netherlands',
    'Singapore'
  ];

  useEffect(() => {
    // Filter locations based on search term
    if (searchTerm.length > 0) {
      const filtered = locations.filter(location => 
        location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMicClick = () => {
    // Simulate voice recognition
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchTerm('New York, USA');
      onLocationSelect('New York, USA');
    }, 2000);
  };

  const selectLocation = (location: string) => {
    setSearchTerm(location);
    onLocationSelect(location);
    setIsFocused(false);
  };

  const handleGeolocate = () => {
    // Simulate geolocation
    setTimeout(() => {
      setSearchTerm('Current Location');
      onLocationSelect('New York, USA');
    }, 1000);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      <div className={cn(
        "glass-panel flex items-center transition-all duration-300",
        isFocused ? "shadow-neon-cyan border-cosmic-cyan/40" : ""
      )}>
        <div className="flex-1 relative flex items-center p-3">
          <Search className="text-cosmic-cyan w-5 h-5 flex-shrink-0 mr-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search for a city..."
            className="bg-transparent border-none outline-none w-full text-white placeholder-white/50"
          />
        </div>
        
        <div className="flex items-center gap-2 pr-3">
          <button 
            onClick={handleGeolocate}
            className="cosmic-icon-button"
          >
            <MapPin size={18} />
          </button>
          <button 
            onClick={handleMicClick} 
            className={cn(
              "cosmic-icon-button relative",
              isListening && "text-cosmic-magenta bg-cosmic-magenta/20"
            )}
          >
            <Mic size={18} />
            {isListening && (
              <span className="absolute inset-0 animate-ping rounded-full bg-cosmic-magenta/50" />
            )}
          </button>
        </div>
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-panel z-20 animate-slide-up">
          <ul className="py-2">
            {suggestions.map((location, index) => (
              <li 
                key={index} 
                className="px-4 py-2 cursor-pointer hover:bg-cosmic-cyan/10 transition-colors flex items-center"
                onClick={() => selectLocation(location)}
              >
                <MapPin size={16} className="mr-2 text-cosmic-cyan" />
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
