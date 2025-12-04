"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useState } from "react";

// Location data with positions (percentages based on map image)
const locations = [
  // USA – Boston (yellow dot on left side)
  {
    id: 'usa',
    name: 'USA – Boston',
    designations: [{ type: 'Sales & Representation office', color: '#FAAD14' }],
    x: 4.8,
    y: 44,
  },
  // United Kingdom – London (yellow dot)
  {
    id: 'uk',
    name: 'United Kingdom – London',
    designations: [{ type: 'Sales & Representation office', color: '#FAAD14' }],
    x: 40.3,
    y: 31.2,
  },
  // Germany – Stuttgart (red dot - both HQ and Sales)
  {
    id: 'germany',
    name: 'Germany – Stuttgart',
    designations: [
      { type: 'Sales & Representation office', color: '#FAAD14' },
      { type: 'Headquarters', color: '#FF4D4F' },
    ],
    x: 45,
    y: 35,
  },
  // Lithuania – Vilnius (green dot)
  {
    id: 'lithuania',
    name: 'Lithuania – Vilnius',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 52.5,
    y: 26,
  },
  // Latvia – Riga (green dot)
  {
    id: 'latvia',
    name: 'Latvia – Riga',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 53.8,
    y: 23,
  },
  // Poland – Warsaw (green dot)
  {
    id: 'poland',
    name: 'Poland – Warsaw',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 51,
    y: 30,
  },
  // Czech Republic – Prague (green dot)
  {
    id: 'czechia',
    name: 'Czech Republic – Prague',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 48,
    y: 34.3,
  },
  // Ukraine – Kyiv (green dot)
  {
    id: 'ukraine',
    name: 'Ukraine – Kyiv',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 56,
    y: 34,
  },
  // Moldova – Chisinau (green dot)
  {
    id: 'moldova',
    name: 'Moldova – Chisinau',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 55,
    y: 37.3,
  },
  // India – Delhi (green dot)
  {
    id: 'india',
    name: 'India – Delhi',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 79.5,
    y: 60,
  },
  // Vietnam – Hanoi (green dot)
  {
    id: 'vietnam',
    name: 'Vietnam – Hanoi',
    designations: [{ type: 'Development center', color: '#95DE64' }],
    x: 95.3,
    y: 76,
  },
];

const GlobalPresencePage = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10">
      <Navbar />
      
      {/* Page Header Section */}
      <section 
        className="w-full"
        style={{
          paddingTop: 'clamp(24px, 2.08vw, 30px)',
          paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        }}
      >
        <div 
          className="w-full mx-auto"
          style={{
            maxWidth: 'min(1440px, 100vw)',
            paddingLeft: 'clamp(20px, 9.72vw, 140px)',
            paddingRight: 'clamp(20px, 9.72vw, 140px)',
          }}
        >
          <div 
            className="flex flex-col"
            style={{ gap: 'clamp(24px, 2.78vw, 40px)' }}
          >
            {/* Breadcrumb */}
            <div 
              className="flex items-center"
              style={{ gap: 'clamp(6px, 0.56vw, 8px)' }}
            >
              <Link 
                href="/" 
                className={`font-normal hover:text-[#95DE64] transition-colors ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                Home
              </Link>
              <span 
                className={`font-normal ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                /
              </span>
              <span 
                className="font-normal text-[#95DE64]"
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                Global Presence
              </span>
            </div>

            {/* Page Title */}
            <h1 
              className={`font-medium ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}
              style={{
                fontSize: 'clamp(28px, 2.64vw, 38px)',
                lineHeight: 'clamp(34px, 3.19vw, 46px)',
              }}
            >
              Global Presence
            </h1>

            {/* Description */}
            <p 
              className={`font-normal ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}
              style={{
                maxWidth: 'clamp(800px, 80.56vw, 1160px)',
                fontSize: 'clamp(12px, 0.97vw, 14px)',
                lineHeight: 'clamp(18px, 1.53vw, 22px)',
              }}
            >
              Explore our international footprint across Europe, India, and North America.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={`w-full transition-colors duration-300 ${
        isLightMode ? 'bg-white' : 'bg-black'
      }`}>
        <div className="w-full overflow-hidden relative">
          {/* Map Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={isLightMode ? "/world_light_web.png" : "/world_dark_web.png"}
            alt="Globonexo Global Presence Map"
            className="w-full h-auto block"
          />
          
          {/* Invisible Hover Areas over existing dots */}
          <div className="absolute inset-0">
            {locations.map((location) => {
              // Determine popup position based on location
              const isLeftEdge = location.x < 15; // Boston area
              const isRightEdge = location.x > 85; // Vietnam area
              
              return (
                <div
                  key={location.id}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${location.x}%`,
                    top: `${location.y}%`,
                    transform: 'translate(-50%, -50%)',
                    // Invisible hover area
                    width: 'clamp(20px, 2vw, 30px)',
                    height: 'clamp(20px, 2vw, 30px)',
                  }}
                  onMouseEnter={() => setHoveredLocation(location.id)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Popup on Hover */}
                  {hoveredLocation === location.id && (
                    <div
                      className="absolute z-50 pointer-events-none"
                      style={{
                        // Position popup based on edge location
                        ...(isLeftEdge ? {
                          // Position to the right of the dot
                          left: 'calc(100% + clamp(8px, 0.69vw, 10px))',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        } : isRightEdge ? {
                          // Position to the left of the dot
                          right: 'calc(100% + clamp(8px, 0.69vw, 10px))',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        } : {
                          // Default: position above the dot
                          bottom: 'calc(100% + clamp(8px, 0.69vw, 10px))',
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }),
                        width: 'clamp(200px, 17.29vw, 249px)',
                        padding: 'clamp(12px, 1.11vw, 16px)',
                        borderRadius: 'clamp(4px, 0.37vw, 5.32px)',
                        border: '0.66px solid rgba(52, 51, 50, 0.3)',
                        background: isLightMode ? 'rgba(255, 255, 255, 0.95)' : '#1F1F1F',
                        backdropFilter: 'blur(5.32px)',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {/* Location Name */}
                      <p
                        className="font-normal whitespace-nowrap"
                        style={{
                          fontFamily: 'Roboto, sans-serif',
                          fontSize: 'clamp(13px, 1.11vw, 16px)',
                          lineHeight: 'clamp(20px, 1.67vw, 24px)',
                          color: isLightMode ? '#141414' : '#FFFFFF',
                          marginBottom: 'clamp(3px, 0.28vw, 4px)',
                        }}
                      >
                        {location.name}
                      </p>
                      
                      {/* Designations */}
                      <div 
                        className="flex flex-col"
                        style={{ gap: 'clamp(2px, 0.14vw, 2px)' }}
                      >
                        {location.designations.map((designation, index) => (
                          <p
                            key={index}
                            className="font-normal whitespace-nowrap"
                            style={{
                              fontFamily: '"Roboto Mono", monospace',
                              fontSize: 'clamp(10px, 0.83vw, 12px)',
                              lineHeight: 'clamp(16px, 1.39vw, 20px)',
                              color: designation.color,
                              fontVariantNumeric: 'lining-nums tabular-nums',
                            }}
                          >
                            {designation.type}
                          </p>
                        ))}
                      </div>

                      {/* Arrow - changes direction based on popup position */}
                      <div
                        className="absolute"
                        style={
                          isLeftEdge ? {
                            // Arrow pointing left
                            left: 'clamp(-5px, -0.35vw, -6px)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderTop: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderBottom: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderRight: `clamp(5px, 0.42vw, 6px) solid ${isLightMode ? 'rgba(255, 255, 255, 0.95)' : '#1F1F1F'}`,
                          } : isRightEdge ? {
                            // Arrow pointing right
                            right: 'clamp(-5px, -0.35vw, -6px)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '0',
                            height: '0',
                            borderTop: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderBottom: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderLeft: `clamp(5px, 0.42vw, 6px) solid ${isLightMode ? 'rgba(255, 255, 255, 0.95)' : '#1F1F1F'}`,
                          } : {
                            // Arrow pointing down (default)
                            bottom: 'clamp(-5px, -0.35vw, -6px)',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '0',
                            height: '0',
                            borderLeft: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderRight: 'clamp(5px, 0.42vw, 6px) solid transparent',
                            borderTop: `clamp(5px, 0.42vw, 6px) solid ${isLightMode ? 'rgba(255, 255, 255, 0.95)' : '#1F1F1F'}`,
                          }
                        }
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
};

export default GlobalPresencePage;
