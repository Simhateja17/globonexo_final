"use client";

import { useRef, useState, useEffect } from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  title: string;
}

const TestimonialCard = ({ quote, name, title }: TestimonialCardProps) => {
  return (
    <div className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[370px] h-[260px] sm:h-[272px] lg:h-[282px] bg-[#141414] rounded-xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6">
      {/* Quote */}
      <p className="text-sm font-normal leading-[22px] text-[#BFBFBF] flex-1">
        {quote}
      </p>

      {/* Author Info */}
      <div className="flex flex-col gap-1">
        {/* Name */}
        <h3 className="text-xl sm:text-[22px] lg:text-2xl font-medium leading-8 text-[#F0F0F0]">
          {name}
        </h3>

        {/* Title */}
        <p className="font-mono text-xs font-normal leading-5 text-[#BFBFBF]">
          {title}
        </p>
      </div>
    </div>
  );
};

const TestimonialsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto-scroll animation
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = scrollContainer.scrollLeft;
    const scrollSpeed = 0.5;

    const animate = () => {
      if (!isHovered && scrollContainer) {
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
  }, [isHovered]);

  return (
    <section className="w-full bg-black py-16 sm:py-20 lg:py-[120px]">
      {/* Header Content */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px] mb-8 lg:mb-10">
        {/* Superheading */}
        <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
          testimonials
        </p>

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] text-[#F0F0F0] mb-4">
          Customers Testmonials
        </h2>

        {/* Description */}
        <p className="max-w-[1160px] text-sm font-normal leading-[22px] text-[#BFBFBF]">
          Hear What Our Customers Say About Partnering with Globonexo!Hear What Our Customers Say About Partnering with Globonexo!
        </p>
      </div>

      {/* Scrolling Cards Container with fade effect */}
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="relative w-full lg:w-[1160px]">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-[40px] sm:w-[60px] lg:w-[80px] bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          
          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-[40px] sm:w-[60px] lg:w-[80px] bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

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
            {/* Render testimonials twice for seamless loop effect */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                name={testimonial.name}
                title={testimonial.title}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
