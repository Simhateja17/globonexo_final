"use client";

import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import dynamic from "next/dynamic";

// Dynamically import LaserFlow to avoid SSR issues with Three.js
const LaserFlow = dynamic(() => import("./LaserFlow"), { ssr: false });

const HeroSection = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  // ============================================
  // 🔆 LASER BRIGHTNESS CONTROL (0 to 100)
  // ============================================
  const LASER_BRIGHTNESS = 25; // ← Change this value (0 = off, 50 = normal, 100 = max)
  // ============================================

  // Calculate intensity values based on brightness percentage
  const brightness = Math.max(0, Math.min(100, LASER_BRIGHTNESS)) / 100;
  const fogIntensity = 0.8 * brightness;      // Max: 0.8
  const wispIntensity = 8.0 * brightness;     // Max: 8.0
  const falloffStart = 0.8 + (0.8 * brightness); // Range: 0.8 to 1.6

  // Client/Partner logos - using text for now, can be replaced with actual logos
  const trustedCompanies = [
    "Microsoft", "Google", "Amazon", "SAP", "Siemens", "BMW", "Bosch", "Deutsche Bank"
  ];

  return (
    <section className="w-full relative flex flex-col items-center px-5 sm:px-10 lg:px-[140px] pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
      {/* Laser Flow Effect - positioned BEHIND all content */}
      {LASER_BRIGHTNESS > 0 && (
        <div 
          className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none"
          style={{ 
            height: '100%', 
            minHeight: '700px',
            opacity: brightness
          }}
        >
          <LaserFlow
            color="#95DE64"
            horizontalBeamOffset={0}
            verticalBeamOffset={-0.5}
            verticalSizing={4.0}
            horizontalSizing={0.6}
            fogIntensity={fogIntensity}
            wispIntensity={wispIntensity}
            falloffStart={falloffStart}
            flowSpeed={0.3}
          />
        </div>
      )}

      {/* Content wrapper - stays ABOVE the laser */}
      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Main Heading - Two Lines - Always stays in 2 lines on all screen sizes */}
        <h1 className="w-full max-w-[1200px] text-center mb-6 sm:mb-8">
          <span className={`block text-[5.8vw] sm:text-4xl lg:text-[52px] xl:text-[60px] font-medium leading-[1.2] sm:leading-tight lg:leading-[1.2] ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            International <span className="text-[#95DE64]">IT & AI Expert Hub</span>
          </span>
          <span className={`block text-[5.8vw] sm:text-4xl lg:text-[52px] xl:text-[60px] font-medium leading-[1.2] sm:leading-tight lg:leading-[1.2] mt-1 sm:mt-2 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            For Your <span className="text-[#95DE64]">Universal Success</span>
          </span>
        </h1>

        {/* Description */}
        <p className={`max-w-[850px] text-center text-sm sm:text-base font-normal leading-[22px] sm:leading-[26px] mb-8 sm:mb-10 lg:mb-12 px-4 ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          At Globonexo, we empower European IT & AI and software companies with world-class outstaffing solutions that transform challenges into opportunities. With our headquarters in Germany and a network of development center across India, Poland, Czech Republic, Ukraine, and Moldova, we provide seamless access to a global talent pool that drives innovation and delivers results.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 sm:mb-16 lg:mb-20">
          <Link 
            href="/join" 
            className="glass-button text-black text-sm font-medium leading-[22px] px-8 py-3 rounded-xl min-w-[160px] h-[44px] flex items-center justify-center"
          >
            Get Started
          </Link>
          <Link 
            href="/contact" 
            className={`text-sm font-medium leading-[22px] px-8 py-3 rounded-xl min-w-[160px] h-[44px] flex items-center justify-center ${
              isLightMode 
                ? 'glass-card-light text-[#141414] hover:text-[#95DE64]' 
                : 'glass-button-outline text-[#F0F0F0] hover:text-[#95DE64]'
            }`}
          >
            Book A Call
          </Link>
        </div>

        {/* Trust Section */}
        <div className="w-full max-w-[1000px] flex flex-col items-center">
          {/* Trust Label */}
          <p className={`text-xs font-normal tracking-wide mb-6 ${
            isLightMode ? 'text-[#8C8C8C]' : 'text-[#8C8C8C]'
          }`}>
            Trusted by businesses of all sizes worldwide
          </p>

          {/* Company Logos */}
          <div className="w-full flex flex-wrap justify-center items-center gap-6 sm:gap-8 lg:gap-12">
            {trustedCompanies.map((company, index) => (
              <div 
                key={index}
                className={`text-sm sm:text-base font-medium opacity-50 hover:opacity-100 transition-opacity cursor-default ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
