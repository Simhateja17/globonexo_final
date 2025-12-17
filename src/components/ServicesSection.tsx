"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  isGreenTitle?: boolean;
  isLightMode?: boolean;
}

const ServiceCard = ({ icon, title, description, isGreenTitle = false, isLightMode = false }: ServiceCardProps) => {
  // Mobile: 300x358 on 390px screen = 76.9% width, 91.8% height ratio
  // Padding: 24px on 390px = 6.15% | Gap: 24px = 6.15% | Border-radius: 12px = 3.08%
  return (
    <div className={`flex-shrink-0 w-[76.9vw] sm:w-[320px] lg:w-[370px] min-h-[91.8vw] sm:min-h-[340px] lg:min-h-[358px] rounded-[3.08vw] sm:rounded-2xl lg:rounded-3xl p-[6.15vw] sm:p-5 lg:p-6 flex flex-col gap-[6.15vw] sm:gap-5 lg:gap-6 glass-shimmer ${
      isLightMode ? 'glass-card-light' : 'glass-card'
    }`}>
      {/* Icon */}
      <div className="text-[12.3vw] sm:text-5xl lg:text-6xl h-[12.3vw] sm:h-[50px] lg:h-[64px] flex items-center">
        {icon}
      </div>

      {/* Title */}
      <h3 
        className={`text-[5.13vw] sm:text-xl lg:text-2xl font-medium leading-[1.33] ${
          isGreenTitle ? 'text-[#95DE64]' : (isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]')
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className={`text-[3.59vw] sm:text-sm font-normal leading-[1.57] flex-grow ${
        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
      }`}>
        {description}
      </p>

      {/* Learn More Link */}
      <Link 
        href="#" 
        className={`flex items-center gap-[2.05vw] sm:gap-2 hover:text-[#95DE64] transition-colors group mt-auto ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}
      >
        <span className="text-[3.59vw] sm:text-sm font-normal leading-[1.57]">Learn more</span>
        <svg 
          className="w-[5.13vw] h-[5.13vw] sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" 
          viewBox="0 0 20 20" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M4 10H16M16 10L11 5M16 10L11 15" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </div>
  );
};

const ServicesSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const { theme } = useTheme();
  const { content } = useContent();
  const servicesContent = content.services;
  const isLightMode = theme === "light";


  // Use content from Firestore
  const services = servicesContent.cards.map(card => ({
    icon: card.icon,
    title: card.title,
    description: card.description,
    isGreenTitle: card.isGreenTitle,
    learnMoreLink: card.learnMoreLink,
  }));
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isInteracting && scrollContainer) {
        // Always read current scroll position to continue from where user left off
        let currentScroll = scrollContainer.scrollLeft;
        currentScroll += scrollSpeed;
        
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (currentScroll >= maxScroll) {
          currentScroll = 0;
        }
        
        scrollContainer.scrollLeft = currentScroll;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isInteracting]);

  // Mobile section: 390px width, 60px vertical padding = 15.4%, 24px horizontal padding = 6.15%
  // Gap between header and cards: 40px on 390px = 10.25%
  return (
    <section className="w-full py-[15.4vw] sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px]">
        {/* Section Header */}
        <div className="mb-[10.25vw] sm:mb-8 lg:mb-12">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide uppercase">
            {servicesContent.superheading}
          </p>

          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            {servicesContent.heading}
          </h2>

          {/* Description */}
          <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
            isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
          }`}>
            {servicesContent.description}
          </p>
        </div>
      </div>

      {/* Scrolling Cards Container with fade effect - 1160px for 1440px screen (80.5%) */}
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px] mx-auto">
          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="flex gap-[4vw] sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Render cards twice for seamless loop effect */}
            {[...services, ...services].map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                isGreenTitle={service.isGreenTitle}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
