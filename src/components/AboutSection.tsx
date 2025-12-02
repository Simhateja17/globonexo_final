"use client";

import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => {
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
      className="w-full sm:w-[calc(50%-12px)] lg:w-[173.5px] h-[140px] sm:h-[160px] lg:h-[173.5px] bg-[#1F1F1F] rounded-xl p-4 sm:p-5 lg:p-6 flex flex-col items-center justify-center gap-2"
    >
      <span className="text-3xl sm:text-4xl lg:text-[48px] font-black leading-[46px] text-[#F0F0F0] text-center">
        {count}
      </span>
      <span className="text-sm font-normal leading-[22px] text-[#BFBFBF] text-center">
        {label}
      </span>
    </div>
  );
};

const AboutSection = () => {
  const stats = [
    { value: "9", label: "countries" },
    { value: "3", label: "continents" },
    { value: "320", label: "IT talents in our pool" },
    { value: "15", label: "industries" },
  ];

  return (
    <section 
      className="w-full py-12 sm:py-16 lg:py-20"
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #141414 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* Left Side - Stats Grid */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <div className="grid grid-cols-2 gap-4 lg:gap-6 w-full lg:w-[371px]">
              {stats.map((stat, index) => (
                <StatCard key={index} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1 max-w-[749px]">
            {/* Superheading */}
            <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
              about us
            </p>

            {/* Main Heading */}
            <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] text-[#F0F0F0] mb-6">
              Driving Innovation Through Global Collaboration
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-4 mb-8">
              <p className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
                Globonexo is an international IT outstaffing company committed to helping European companies grow faster and smarter. Our founders' proven track record in driving innovation and delivering IT solutions positions us as the trusted choice for outstaffing.
              </p>
              <p className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
                We provide businesses with cost-effective, scalable, and high-quality IT resources to meet their unique needs. Whether you're looking to expand your development team, shorten time-to-market, or access niche skills, Globonexo is your strategic partner.
              </p>
            </div>

            {/* Join Now Button */}
            <button className="bg-[#95DE64] text-black text-sm font-medium leading-[22px] px-6 py-2 rounded-lg hover:bg-[#7bc653] transition-colors min-w-[180px] h-[38px]">
              Join now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
