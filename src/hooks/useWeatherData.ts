
import { useState, useEffect } from 'react';

// Types for weather data
interface WeatherData {
  location: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    condition: string;
    conditionIcon: string;
    uvIndex: number;
  };
  forecast: Array<{
    day: string;
    date: string;
    high: number;
    low: number;
    condition: string;
    conditionIcon: string;
    precipitation: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    feelsLike: number;
    condition: string;
    conditionIcon: string;
  }>;
  sunTimes: {
    sunrise: string;
    sunset: string;
    currentTime: string;
  };
}

// Mock data function
const getMockWeatherData = (location: string): WeatherData => {
  // In a real app this would be an API call
  return {
    location,
    current: {
      temperature: 72,
      feelsLike: 75,
      humidity: 65,
      windSpeed: 8,
      condition: 'Partly Cloudy',
      conditionIcon: 'partly-cloudy-day',
      uvIndex: 6
    },
    forecast: [
      { day: 'MON', date: '04/12', high: 72, low: 58, condition: 'Clear', conditionIcon: 'clear-day', precipitation: 0 },
      { day: 'TUE', date: '04/13', high: 75, low: 60, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy-day', precipitation: 10 },
      { day: 'WED', date: '04/14', high: 70, low: 62, condition: 'Rain', conditionIcon: 'rain', precipitation: 60 },
      { day: 'THU', date: '04/15', high: 68, low: 57, condition: 'Rain', conditionIcon: 'rain', precipitation: 80 },
      { day: 'FRI', date: '04/16', high: 65, low: 55, condition: 'Cloudy', conditionIcon: 'cloudy', precipitation: 30 },
      { day: 'SAT', date: '04/17', high: 70, low: 58, condition: 'Partly Cloudy', conditionIcon: 'partly-cloudy-day', precipitation: 20 },
      { day: 'SUN', date: '04/18', high: 74, low: 60, condition: 'Clear', conditionIcon: 'clear-day', precipitation: 0 },
    ],
    hourly: Array.from({ length: 24 }, (_, i) => {
      const hour = i < 10 ? `0${i}:00` : `${i}:00`;
      // Generate a temperature curve
      let temp = 65;
      if (i < 6) {
        temp = 65 + i * 0.5; // Early morning - slowly rising
      } else if (i < 14) {
        temp = 68 + (i - 6) * 1.5; // Morning to afternoon - faster rise
      } else {
        temp = 80 - (i - 14) * 1.2; // Evening and night - falling
      }
      temp = Math.round(temp + (Math.random() - 0.5) * 3);
      
      return {
        time: hour,
        temperature: temp,
        feelsLike: temp + Math.round(Math.random() * 4),
        condition: i >= 6 && i <= 18 ? 'Partly Cloudy' : 'Clear',
        conditionIcon: i >= 6 && i <= 18 ? 'partly-cloudy-day' : 'clear-night'
      };
    }),
    sunTimes: {
      sunrise: '06:30',
      sunset: '19:45',
      currentTime: new Date().getHours() + ':' + 
                   (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes()
    }
  };
};

export const useWeatherData = (location: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        // const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
        // const data = await response.json();
        
        // For this demo, we'll use mock data
        const mockData = getMockWeatherData(location);
        
        // Simulate network delay
        setTimeout(() => {
          setData(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  return { data, loading, error };
};
