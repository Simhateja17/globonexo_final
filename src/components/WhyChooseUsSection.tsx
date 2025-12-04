"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface WhyChooseCardProps {
  icon: string;
  title: string;
  description: string;
  isLightMode?: boolean;
}

const WhyChooseCard = ({ icon, title, description, isLightMode = false }: WhyChooseCardProps) => {
  return (
    <div className={`flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[272px] h-[280px] sm:h-[290px] lg:h-[302px] rounded-xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 border ${
      isLightMode ? 'bg-[#E5E5E5] border-[#D9D9D9]' : 'bg-[#1F1F1F] border-[#141414]'
    }`}>
      {/* Icon */}
      <div className="text-4xl lg:text-5xl">
        {icon}
      </div>

      {/* Title */}
      <h3 className={`text-xl lg:text-2xl font-medium leading-8 ${
        isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
      }`}>
        {title}
      </h3>

      {/* Description */}
      <p className={`text-sm font-normal leading-[22px] ${
        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
      }`}>
        {description}
      </p>
    </div>
  );
};

const WhyChooseUsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const cards = [
    {
      icon: "💼",
      title: "Built on Expertise",
      description: "While Globonexo is new, the extensive experience of our founders ensures we deliver exceptional results tailored to your goals.",
    },
    {
      icon: "🌍",
      title: "Global Talent Pool",
      description: "Our development center offer access to top-tier IT professionals from India and Eastern Europe, ready to execute your vision.",
    },
    {
      icon: "⚖️",
      title: "Cost Efficiency",
      description: "Save on recruitment and operational costs without compromising on quality.",
    },
    {
      icon: "📈",
      title: "Flexibility and Scalability",
      description: "Adapt your team size to your project's requirements, giving you unparalleled agility.",
    },
    {
      icon: "🧑‍💻",
      title: "Cultural and Technical Alignment",
      description: "We bridge global talent with local needs, ensuring seamless collaboration and delivery.",
    },
  ];

  // Auto-scroll animation - only on desktop
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    // Check if device supports touch (mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Don't auto-scroll on mobile devices
    if (isTouchDevice) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isInteracting && scrollContainer) {
        scrollPosition += scrollSpeed;
        
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
  }, [isInteracting]);

  return (
    <section className={`w-full py-16 sm:py-20 lg:py-[120px] transition-colors duration-300 ${
      isLightMode ? 'bg-[#F5F5F5]' : 'bg-[#141414]'
    }`}>
      {/* Header Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px] mb-8 lg:mb-10">
        {/* Superheading */}
        <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
          why choose us
        </p>

        {/* Main Heading */}
        <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
          isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
        }`}>
          Why Our Clients Choose Globonexo
        </h2>

        {/* Description */}
        <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          We offer seamless collaboration, access to cutting-edge technologies, and tailored solutions that help businesses grow and stay ahead in a competitive market. With a commitment to quality, innovation, and customer satisfaction, we empower our clients to achieve their goals faster and more efficiently.
        </p>
      </div>

      {/* Scrolling Cards Container with fade effect */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px]">
          {/* Left Fade Gradient */}
          <div className={`absolute left-0 top-0 bottom-0 w-[40px] sm:w-[60px] lg:w-[80px] bg-gradient-to-r ${isLightMode ? 'from-[#F5F5F5]' : 'from-[#141414]'} to-transparent z-10 pointer-events-none`} />
          
          {/* Right Fade Gradient */}
          <div className={`absolute right-0 top-0 bottom-0 w-[40px] sm:w-[60px] lg:w-[80px] bg-gradient-to-l ${isLightMode ? 'from-[#F5F5F5]' : 'from-[#141414]'} to-transparent z-10 pointer-events-none`} />

          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
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
            {[...cards, ...cards].map((card, index) => (
              <WhyChooseCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
