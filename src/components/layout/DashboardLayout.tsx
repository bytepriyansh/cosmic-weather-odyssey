
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import BackgroundEffects from '../ui/BackgroundEffects';

type Tab = 'dashboard' | 'radar' | 'forecast' | 'airquality' | 'settings';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <BackgroundEffects />
      
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 overflow-auto p-6 cosmic-grid">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
