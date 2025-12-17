"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";

interface WhyChooseCardProps {
  icon: string;
  title: string;
  description: string;
  isLightMode?: boolean;
}

const WhyChooseCard = ({ icon, title, description, isLightMode = false }: WhyChooseCardProps) => {
  return (
    <div className={`flex-shrink-0 w-[240px] sm:w-[260px] lg:w-[272px] h-[280px] sm:h-[290px] lg:h-[302px] rounded-2xl lg:rounded-3xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 glass-shimmer ${
      isLightMode ? 'glass-card-light' : 'glass-card'
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
  const { content } = useContent();
  const whyChooseUsContent = content.whyChooseUs;
  const isLightMode = theme === "light";

  // Use content from Firestore
  const cards = whyChooseUsContent.cards.map(card => ({
    icon: card.icon,
    title: card.title,
    description: card.description,
  }));

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

  return (
    <section className="w-full py-16 sm:py-20 lg:py-[120px]">
      {/* Header Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px] mb-8 lg:mb-10">
        {/* Superheading */}
        <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
          {whyChooseUsContent.superheading}
        </p>

        {/* Main Heading */}
        <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
          isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
        }`}>
          {whyChooseUsContent.heading}
        </h2>

        {/* Description */}
        <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          {whyChooseUsContent.description}
        </p>
      </div>

      {/* Scrolling Cards Container with fade effect */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px]">
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
