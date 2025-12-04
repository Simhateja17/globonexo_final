'use client';

import { useTheme } from '@/context/ThemeContext';

const LiquidBackground = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';

  return (
    <>
      {/* Base gradient background */}
      <div 
        className={`fixed inset-0 z-0 transition-colors duration-700 ${
          isLightMode ? 'liquid-bg-light' : 'liquid-bg-dark'
        }`}
        aria-hidden="true"
      />
      
      {/* Animated gradient orbs for depth */}
      <div 
        className="liquid-orb liquid-orb-1"
        style={{
          opacity: isLightMode ? 0.25 : 0.35,
        }}
        aria-hidden="true"
      />
      <div 
        className="liquid-orb liquid-orb-2"
        style={{
          opacity: isLightMode ? 0.2 : 0.3,
        }}
        aria-hidden="true"
      />

      {/* Subtle noise texture overlay for glass realism */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
    </>
  );
};

export default LiquidBackground;
