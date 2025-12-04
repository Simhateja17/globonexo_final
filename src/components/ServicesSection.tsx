"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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
    <div className={`flex-shrink-0 w-[76.9vw] sm:w-[320px] lg:w-[370px] min-h-[91.8vw] sm:min-h-[340px] lg:min-h-[358px] rounded-[3.08vw] sm:rounded-xl p-[6.15vw] sm:p-5 lg:p-6 flex flex-col gap-[6.15vw] sm:gap-5 lg:gap-6 ${
      isLightMode ? 'bg-[#F0F0F0]' : 'bg-[#141414]'
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
  const isLightMode = theme === "light";

  const services = [
    {
      icon: "🤝",
      title: "Outstaffing Solutions",
      description: "Expertise in staff augmentation, dedicated teams, EOR (Employer of Record), and PEO (Professional Employer Organization) models.",
      isGreenTitle: false,
    },
    {
      icon: "🐞",
      title: "Software Testing Services",
      description: "Comprehensive QA and testing services to ensure robust, high-performance, and error-free software. Specialized in manual, automated, and performance testing for diverse industries.",
      isGreenTitle: true,
    },
    {
      icon: "🛠️",
      title: "IT & AI Helpdesk Services",
      description: "Reliable 24/7 multilingual IT & AI support tailored to businesses of all sizes. Focused on enhancing customer satisfaction with fast and efficient issue resolution.",
      isGreenTitle: false,
    },
    {
      icon: "🧩",
      title: "Custom Solutions for Unique Needs",
      description: "Bespoke IT & AI and software solutions designed to address specific challenges and goals. Emphasis on scalability, innovation, and alignment with business strategies.",
      isGreenTitle: false,
    },
  ];

  // Auto-scroll animation - works on both desktop and mobile
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
    <section className={`w-full py-[15.4vw] sm:py-16 lg:py-20 transition-colors duration-300 ${
      isLightMode ? 'bg-white' : 'bg-black'
    }`}>
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px]">
        {/* Section Header */}
        <div className="mb-[10.25vw] sm:mb-8 lg:mb-12">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide uppercase">
            our services
          </p>

          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            What we're offering
          </h2>

          {/* Description */}
          <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
            isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
          }`}>
            We specialize in outstaffing solutions, including staff augmentation and dedicated teams, alongside software testing, and 24/7 multilingual IT & AI helpdesk services. With expertise in modern technologies like AI, ML, cloud solutions, and a deep understanding of the European market, we deliver tailored solutions that drive innovation and scalability.
          </p>
        </div>
      </div>

      {/* Scrolling Cards Container with fade effect - 1160px for 1440px screen (80.5%) */}
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px] mx-auto">
          {/* Left Fade Gradient */}
          <div className={`absolute left-0 top-0 bottom-0 w-[7.7vw] sm:w-[80px] lg:w-[120px] bg-gradient-to-r ${
            isLightMode ? 'from-white' : 'from-black'
          } to-transparent z-10 pointer-events-none`} />
          
          {/* Right Fade Gradient */}
          <div className={`absolute right-0 top-0 bottom-0 w-[7.7vw] sm:w-[80px] lg:w-[120px] bg-gradient-to-l ${
            isLightMode ? 'from-white' : 'from-black'
          } to-transparent z-10 pointer-events-none`} />

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
