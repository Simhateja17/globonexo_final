"use client";

import { useRef, useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
  isLightMode?: boolean;
}

const TestimonialCard = ({ quote, name, title, isLightMode = false }: TestimonialCardProps) => {
  // Mobile: 300x326 on 390px screen = 76.9% width, 83.6% height ratio
  // Padding: 24px on 390px = 6.15% | Gap: 24px = 6.15%
  return (
    <div className={`flex-shrink-0 w-[76.9vw] sm:w-[320px] lg:w-[370px] min-h-[83.6vw] sm:min-h-[280px] lg:min-h-[282px] rounded-[3vw] sm:rounded-2xl lg:rounded-3xl p-[6.15vw] sm:p-5 lg:p-6 flex flex-col gap-[6.15vw] sm:gap-5 lg:gap-6 glass-shimmer ${
      isLightMode ? 'glass-card-light' : 'glass-card'
    }`}>
      {/* Quote */}
      <p className={`text-sm font-normal leading-[22px] flex-1 ${
        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
      }`}>
        {quote}
      </p>

      {/* Author Info */}
      <div className="flex flex-col gap-1 mt-auto">
        {/* Name */}
        <h3 className={`text-xl sm:text-[22px] lg:text-2xl font-medium leading-8 ${
          isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
        }`}>
          {name}
        </h3>

        {/* Title */}
        <p className={`font-mono text-xs font-normal leading-5 ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          {title}
        </p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const testimonials = [
    {
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?»",
      name: "Satya Nadella",
      title: "Chief Executive Officer, Microsoft",
    },
    {
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?»",
      name: "Andy Jassy",
      title: "Chief Executive Officer, Amazon",
    },
    {
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?»",
      name: "Sundar Pichai",
      title: "Chief Executive Officer, Alphabet (Google)",
    },
    {
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi? Possimus ipsa, excepturi praesentium dolore quae placeat voluptatem doloremque deserunt?»",
      name: "Tim Cook",
      title: "Chief Executive Officer, Apple",
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
    <section className="w-full py-[15.4vw] sm:py-20 lg:py-[120px]">
      {/* Header Content */}
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px] mb-[10.25vw] sm:mb-8 lg:mb-10">
        {/* Superheading */}
        <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
          testimonials
        </p>

        {/* Main Heading */}
        <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
          isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
        }`}>
          Customers Testmonials
        </h2>

        {/* Description */}
        <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          Hear What Our Customers Say About Partnering with Globonexo!Hear What Our Customers Say About Partnering with Globonexo!
        </p>
      </div>

      {/* Scrolling Cards Container with fade effect */}
      <div className="max-w-[1440px] mx-auto px-[6.15vw] sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px]">
          {/* Left Fade Gradient */}
          <div className={`absolute left-0 top-0 bottom-0 w-[7.7vw] sm:w-[60px] lg:w-[80px] bg-gradient-to-r ${
            isLightMode ? 'from-white/80' : 'from-black/80'
          } to-transparent z-10 pointer-events-none`} />
          
          {/* Right Fade Gradient */}
          <div className={`absolute right-0 top-0 bottom-0 w-[7.7vw] sm:w-[60px] lg:w-[80px] bg-gradient-to-l ${
            isLightMode ? 'from-white/80' : 'from-black/80'
          } to-transparent z-10 pointer-events-none`} />

          {/* Scrolling Container */}
          <div 
            ref={scrollRef}
            className="flex gap-[4vw] sm:gap-5 lg:gap-6 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing touch-pan-x"
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
            {/* Render testimonials twice for seamless loop effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
