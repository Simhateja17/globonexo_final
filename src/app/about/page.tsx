"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import LiquidBackground from "@/components/LiquidBackground";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  const { theme } = useTheme();
  const { allContent, loading } = useContent();
  const isLightMode = theme === "light";
  
  const pageContent = allContent.aboutPage;

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
              <span className="text-sm font-normal leading-[22px] text-[#95DE64]">
                {pageContent.pageTitle}
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

      {/* About Us Content Section */}
      <section className="w-full py-16 sm:py-20 lg:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-col gap-5 lg:gap-6 w-full lg:w-[43%]">
              {/* Superheading */}
              <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide">
                {pageContent.aboutSuperheading}
              </p>

              {/* Main Heading */}
              <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                {pageContent.aboutHeading}
              </h2>

              {/* Description */}
              <p className={`text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}>
                {pageContent.aboutDescription}
              </p>

              {/* Join Now Button */}
              <Link
                href={pageContent.aboutButtonLink}
                className="inline-flex items-center justify-center min-w-[140px] sm:min-w-[160px] lg:min-w-[180px] h-[38px] px-6 py-2 glass-button text-black text-sm font-medium leading-[22px] rounded-xl transition-all duration-200 w-fit"
              >
                {pageContent.aboutButtonText}
              </Link>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[57%] flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[620px] aspect-[620/345]">
                <Image
                  src={isLightMode ? pageContent.aboutImageLight : pageContent.aboutImage}
                  alt="About Globonexo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-16 sm:py-20 lg:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Superheading */}
            <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide">
              {pageContent.storySuperheading}
            </p>

            {/* Main Heading */}
            <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] max-w-[598px] ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              {pageContent.storyHeading}
            </h2>

            {/* Story Content */}
            <div className={`max-w-[1160px] flex flex-col gap-6 text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              {pageContent.storyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="w-full py-16 sm:py-20 lg:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Header */}
            <div className="flex flex-col gap-4">
              {/* Superheading */}
              <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide lowercase">
                {pageContent.teamSuperheading}
              </p>

              {/* Main Heading */}
              <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                {pageContent.teamHeading}
              </h2>

              {/* Description */}
              <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}>
                {pageContent.teamDescription}
              </p>
            </div>

            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {pageContent.teamMembers.sort((a, b) => a.order - b.order).map((member) => (
                <div key={member.id} className={`rounded-2xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 glass-shimmer ${
                  isLightMode ? 'glass-card-light' : 'glass-card'
                }`}>
                  {/* Photo */}
                  <div className="relative w-full aspect-square max-w-[224px] mx-auto">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Name */}
                  <h3 className={`text-xl sm:text-2xl font-normal leading-8 ${
                    isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                  }`}>
                    {member.name}
                  </h3>
                  
                  {/* Role */}
                  <p className="font-mono text-xs font-normal leading-5 text-[#95DE64]">
                    {member.role}
                  </p>
                  
                  {/* Social Icons */}
                  <div className="flex items-center gap-4">
                    {member.linkedinUrl && (
                      <Link href={member.linkedinUrl} className="opacity-70 hover:opacity-100 transition-opacity">
                        <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                      </Link>
                    )}
                    {member.facebookUrl && (
                      <Link href={member.facebookUrl} className="opacity-70 hover:opacity-100 transition-opacity">
                        <Image src="/facebook_about_us.png" alt="Facebook" width={24} height={24} />
                      </Link>
                    )}
                    {member.twitterUrl && (
                      <Link href={member.twitterUrl} className="opacity-70 hover:opacity-100 transition-opacity">
                        <Image src="/x.png" alt="X" width={24} height={24} />
                      </Link>
                    )}
                    {member.instagramUrl && (
                      <Link href={member.instagramUrl} className="opacity-70 hover:opacity-100 transition-opacity">
                        <Image src="/instagram_about_us.png" alt="Instagram" width={24} height={24} />
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
      </div>
    </main>
  );
};

export default AboutPage;
