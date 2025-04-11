
import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import BackgroundEffects from '../ui/BackgroundEffects';
import { useLocation } from 'react-router-dom';

type Tab = 'dashboard' | 'radar' | 'forecast' | 'airquality' | 'settings';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const path = location.pathname;
  
  // Set active tab based on current route
  let activeTab: Tab = 'dashboard';
  if (path.includes('radar')) activeTab = 'radar';
  else if (path.includes('forecast')) activeTab = 'forecast';
  else if (path.includes('airquality')) activeTab = 'airquality';
  else if (path.includes('settings')) activeTab = 'settings';
  else activeTab = 'dashboard';

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <BackgroundEffects />
      
      <Sidebar activeTab={activeTab} />
      
      <main className="flex-1 overflow-auto p-6 cosmic-grid">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
