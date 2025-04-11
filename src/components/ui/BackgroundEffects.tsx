
import React, { useEffect, useRef } from 'react';

const BackgroundEffects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create stars (sparkles)
    const createSparkles = () => {
      for (let i = 0; i < 100; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        
        // Random position
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 2 + 1;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random animation delay
        sparkle.style.animationDelay = `${Math.random() * 4}s`;
        
        container.appendChild(sparkle);
      }
    };

    // Create meteors
    const createMeteors = () => {
      for (let i = 0; i < 10; i++) {
        const meteor = document.createElement('div');
        meteor.classList.add('meteor');
        
        // Random position
        meteor.style.left = `${Math.random() * 100}%`;
        meteor.style.top = `${Math.random() * 50}%`;
        
        // Random animation delay
        meteor.style.setProperty('--delay', String(Math.random() * 5));
        
        container.appendChild(meteor);
      }
    };

    createSparkles();
    createMeteors();

    // Mouse effect for stars (parallax)
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      const sparkles = container.querySelectorAll('.sparkle');
      sparkles.forEach((sparkle, index) => {
        const depth = Math.random() * 0.5;
        const moveX = (mouseX - 0.5) * depth * 20;
        const moveY = (mouseY - 0.5) * depth * 20;
        
        (sparkle as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]"
    />
  );
};

export default BackgroundEffects;
