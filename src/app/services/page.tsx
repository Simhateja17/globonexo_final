"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";
import Link from "next/link";
import Image from "next/image";

interface ContentBlockProps {
  superheading: string;
  title: string;
  paragraphs: string[];
  ctaText: string;
  ctaLink: string;
  imageSrc?: string;
  imageAlt?: string;
  isReversed?: boolean;
  isLightMode?: boolean;
}

const ContentBlock = ({
  superheading,
  title,
  paragraphs,
  ctaText,
  ctaLink,
  imageSrc,
  imageAlt = "Placeholder",
  isReversed = false,
  isLightMode = false,
}: ContentBlockProps) => {
  return (
    <section className="w-full py-16 sm:py-20 lg:py-[120px]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-10 items-center`}>
          {/* Text Content */}
          <div className="flex flex-col gap-5 lg:gap-6 w-full lg:w-[58%]">
            {/* Superheading */}
            <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide">
              {superheading}
            </p>

            {/* Title */}
            <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] max-w-[672px] ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              {title}
            </h2>

            {/* Paragraphs */}
            <div className={`max-w-[672px] flex flex-col gap-4 text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href={ctaLink}
              className="inline-flex items-center justify-center w-fit min-w-[140px] h-[38px] px-6 py-2 glass-button text-black text-xs font-medium leading-5 tracking-wide uppercase rounded-xl transition-all duration-200"
            >
              {ctaText}
            </Link>
          </div>

          {/* Image Placeholder */}
          <div className="w-full lg:w-[42%] flex justify-center">
            <div className={`relative w-full max-w-[350px] sm:max-w-[400px] lg:max-w-[448px] aspect-square rounded-2xl overflow-hidden ${
              isLightMode ? 'glass-card-light' : 'glass-card'
            }`}>
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              ) : (
                /* Placeholder Icon */
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className={`w-16 h-16 sm:w-20 sm:h-20 ${isLightMode ? 'text-[#BFBFBF]' : 'text-[#595959]'}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  const { theme } = useTheme();
  const { allContent, loading } = useContent();
  const isLightMode = theme === "light";

  const pageContent = allContent.servicesPage;
  const sortedBlocks = [...pageContent.blocks].sort((a, b) => a.order - b.order);

  if (loading) {
    return (
      <main className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className={isLightMode ? 'text-[#141414]' : 'text-white'}>Loading...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10">
      <Navbar />
      
      {/* Page Header Section */}
      <section 
        className="w-full pt-6 sm:pt-7 lg:pt-[30px] pb-10 sm:pb-12 lg:pb-[60px]"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2">
              <Link 
                href="/" 
                className={`text-sm font-normal leading-[22px] hover:text-[#95DE64] transition-colors ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
              >
                Home
              </Link>
              <span className={`text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
              }`}>
                /
              </span>
              <Link 
                href="/services" 
                className={`text-sm font-normal leading-[22px] hover:text-[#95DE64] transition-colors ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
              >
                Services
              </Link>
              <span className={`text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
              }`}>
                /
              </span>
              <span className="text-sm font-normal leading-[22px] text-[#95DE64]">
                {pageContent.pageBreadcrumb}
              </span>
            </div>

            {/* Page Title */}
            <h1 className={`text-[28px] sm:text-[32px] lg:text-[38px] font-medium leading-tight lg:leading-[46px] ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              {pageContent.pageTitle}
            </h1>

            {/* Description */}
            <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              {pageContent.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic Content Blocks */}
      {sortedBlocks.map((block) => (
        <ContentBlock
          key={block.id}
          superheading={block.superheading}
          title={block.title}
          paragraphs={block.paragraphs}
          ctaText={block.ctaText}
          ctaLink={block.ctaLink}
          imageSrc={block.imageSrc}
          imageAlt={block.imageAlt}
          isReversed={block.isReversed}
          isLightMode={isLightMode}
        />
      ))}

      {/* Why Choose Us Section */}
      <WhyChooseUsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      <Footer />
      </div>
    </main>
  );
};

export default ServicesPage;
