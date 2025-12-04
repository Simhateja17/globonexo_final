"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

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
  const isLightMode = theme === "light";

  const leftColumnFAQs = [
    {
      question: "Can we choose and interview developers ourselves?",
      answer: "Yes, you have full control over the selection process. We provide you with pre-vetted candidates, and you can interview them to ensure they meet your specific requirements before making a decision.",
    },
    {
      question: "How do you ensure developer quality and productivity?",
      answer: "We have a rigorous vetting process that includes technical assessments, code reviews, and soft skills evaluation. We also provide ongoing performance monitoring and regular check-ins to ensure consistent quality.",
    },
    {
      question: "What is IT & AI outstaffing and how does it differ from outsourcing?",
      answer: "IT & AI outstaffing means you hire dedicated developers who work exclusively for you while we handle HR and administrative tasks. Unlike outsourcing, you maintain direct control over the team and their work.",
    },
    {
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
    },
    {
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
    },
    {
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
    },
    {
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
    },
    {
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
    },
  ];

  const rightColumnFAQs = [
    {
      question: "What tech stacks do your developers use?",
      answer: "Our developers are proficient in a wide range of technologies including React, Angular, Vue.js, Node.js, Python, Java, .NET, AWS, Azure, and many more. We can match expertise to your specific stack.",
    },
    {
      question: "How is outstaffing priced?",
      answer: "Our pricing is transparent and competitive. You pay a monthly rate per developer that covers their salary, benefits, workspace, and our management fee. No hidden costs or surprises.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
    {
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
    },
  ];

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
            faq
          </p>

          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            Frequently Asked Questions
          </h2>

          {/* Description */}
          <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
            isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
          }`}>
            Got Questions? We've Got Answers to Help You Understand Globonexo Better!
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
