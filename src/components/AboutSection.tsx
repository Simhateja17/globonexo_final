"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";

interface StatCardProps {
  value: string;
  label: string;
  isLightMode?: boolean;
}

const StatCard = ({ value, label, isLightMode = false }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const numericValue = parseInt(value.replace(/\D/g, ''));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  // Animate count when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setCount(numericValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, numericValue]);

  return (
    <div
      ref={cardRef}
      className={`w-full sm:w-[calc(50%-12px)] lg:w-[173.5px] h-[140px] sm:h-[160px] lg:h-[173.5px] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-center gap-2 glass-shimmer ${
        isLightMode ? 'glass-card-light' : 'glass-card'
      }`}
    >
      <span className={`text-3xl sm:text-4xl lg:text-[48px] font-black leading-[46px] text-center ${
        isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
      }`}>
        {count}
      </span>
      <span className={`text-sm font-normal leading-[22px] text-center ${
        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
      }`}>
        {label}
      </span>
    </div>
  );
};

const AboutSection = () => {
  const { theme } = useTheme();
  const { content } = useContent();
  const aboutContent = content.about;
  const isLightMode = theme === "light";

  // Use content from Firestore
  const stats = aboutContent.stats.map(stat => ({
    value: stat.value,
    label: stat.label,
  }));

  return (
    <section 
      className="w-full py-12 sm:py-16 lg:py-20"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side - Stats Grid */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full lg:w-[371px]">
              {stats.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} isLightMode={isLightMode} />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 max-w-[749px]">
            {/* Superheading */}
            <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
              {aboutContent.superheading}
            </p>

            {/* Main Heading */}
            <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-6 ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              {aboutContent.heading}
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 mb-8">
              {aboutContent.paragraphs.map((paragraph, index) => (
                <p key={index} className={`text-sm font-normal leading-[22px] ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Join Now Button */}
            <button className="bg-[#95DE64] text-black text-sm font-medium leading-[22px] px-6 py-2 rounded-lg hover:bg-[#7bc653] transition-colors min-w-[180px] h-[38px]">
              {aboutContent.buttonText}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
