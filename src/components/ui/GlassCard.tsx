
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

const GlassCard = ({ 
  children, 
  className, 
  hoverEffect = true, 
  onClick 
}: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-panel p-4 overflow-hidden transition-all duration-300",
        hoverEffect && "hover:shadow-neon-cyan hover:border-cosmic-cyan/30 animate-tilt",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
