"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  isGreenTitle?: boolean;
}

const ServiceCard = ({ icon, title, description, isGreenTitle = false }: ServiceCardProps) => {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[370px] h-[320px] lg:h-[358px] bg-[#141414] rounded-xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6">
      {/* Icon */}
      <div className="text-5xl lg:text-6xl h-[50px] lg:h-[64px] flex items-center">
        {icon}
      </div>

      {/* Title */}
      <h3 
        className={`text-xl lg:text-2xl font-medium leading-8 ${
          isGreenTitle ? 'text-[#95DE64]' : 'text-[#F0F0F0]'
        }`}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm font-normal leading-[22px] text-[#BFBFBF] flex-grow">
        {description}
      </p>

      {/* Learn More Link */}
      <Link 
        href="#" 
        className="flex items-center gap-2 text-[#BFBFBF] hover:text-[#95DE64] transition-colors group mt-auto"
      >
        <span className="text-sm font-normal leading-[22px]">Learn more</span>
        <svg 
          className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
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
  const [isHovered, setIsHovered] = useState(false);

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
      title: "IT Helpdesk Services",
      description: "Reliable 24/7 multilingual IT support tailored to businesses of all sizes. Focused on enhancing customer satisfaction with fast and efficient issue resolution.",
      isGreenTitle: false,
    },
    {
      icon: "🧩",
      title: "Custom Solutions for Unique Needs",
      description: "Bespoke IT and software solutions designed to address specific challenges and goals. Emphasis on scalability, innovation, and alignment with business strategies.",
      isGreenTitle: false,
    },
  ];

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed here

    const animate = () => {
      if (!isHovered && scrollContainer) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll when reaching the end (loop effect)
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovered]);

  return (
    <section className="w-full bg-black py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        {/* Section Header */}
        <div className="mb-8 lg:mb-12">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide uppercase">
            our services
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] text-[#F0F0F0] mb-4">
            What we're offering
          </h2>

          {/* Description */}
          <p className="max-w-[1160px] text-sm font-normal leading-[22px] text-[#BFBFBF]">
            We specialize in outstaffing solutions, including staff augmentation and dedicated teams, alongside software testing, and 24/7 multilingual IT helpdesk services. With expertise in modern technologies like AI, ML, cloud solutions, and a deep understanding of the European market, we deliver tailored solutions that drive innovation and scalability.
          </p>
        </div>
      </div>

      {/* Scrolling Cards Container with fade effect - 1160px for 1440px screen (80.5%) */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px] mx-auto">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-[60px] sm:w-[80px] lg:w-[120px] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-[60px] sm:w-[80px] lg:w-[120px] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
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
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
