"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  isLightMode?: boolean;
}

const FAQItem = ({ question, answer, isOpen, onClick, isLightMode = false }: FAQItemProps) => {
  return (
    <div 
      className={`w-full rounded-2xl p-5 lg:p-6 cursor-pointer transition-all duration-300 ${
        isLightMode ? 'glass-card-light' : 'glass-card'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4">
        <span className={`text-sm font-normal leading-[22px] ${
          isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
        }`}>
          {question}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } ${isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'}`}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {/* Answer - expandable */}
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[200px] mt-4' : 'max-h-0'
        }`}
      >
        <p className={`text-sm font-normal leading-[22px] ${
          isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
        }`}>
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { theme } = useTheme();
  const { content } = useContent();
  const faqContent = content.faq;
  const isLightMode = theme === "light";

  // Use content from Firestore
  const leftColumnFAQs = faqContent.items
    .filter(item => item.column === 'left')
    .sort((a, b) => a.order - b.order)
    .map(item => ({
      question: item.question,
      answer: item.answer,
    }));

  const rightColumnFAQs = faqContent.items
    .filter(item => item.column === 'right')
    .sort((a, b) => a.order - b.order)
    .map(item => ({
      question: item.question,
      answer: item.answer,
    }));

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 sm:py-20 lg:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
            {faqContent.superheading}
          </p>

          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            {faqContent.heading}
          </h2>

          {/* Description */}
          <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
            isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
          }`}>
            {faqContent.description}
          </p>
        </div>

        {/* FAQ Grid - Two Columns */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 max-w-[1160px]">
          {/* Left Column */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[568px]">
            {leftColumnFAQs.map((faq, index) => (
              <FAQItem
                key={`left-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
                isLightMode={isLightMode}
              />
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[568px]">
            {rightColumnFAQs.map((faq, index) => (
              <FAQItem
                key={`right-${index}`}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index + leftColumnFAQs.length}
                onClick={() => handleClick(index + leftColumnFAQs.length)}
                isLightMode={isLightMode}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
