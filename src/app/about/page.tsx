"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQSection from "@/components/FAQSection";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  return (
    <main className={`min-h-screen transition-colors duration-300 ${
      isLightMode ? 'bg-white' : 'bg-black'
    }`}>
      <Navbar />
      
      {/* Page Header Section */}
      <section 
        className="w-full pt-6 sm:pt-7 lg:pt-[30px] pb-10 sm:pb-12 lg:pb-[60px]"
        style={{
          background: isLightMode 
            ? 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)'
            : 'linear-gradient(180deg, #000000 0%, #141414 100%)',
        }}
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
                About us
              </span>
            </div>

            {/* Page Title */}
            <h1 className={`text-[28px] sm:text-[32px] lg:text-[38px] font-medium leading-tight lg:leading-[46px] ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              About us
            </h1>

            {/* Description */}
            <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              Although, final stages of the internal network gives a complete experience of The Parameter of Speculative Environment
            </p>
          </div>
        </div>
      </section>

      {/* About Us Content Section */}
      <section className={`w-full py-16 sm:py-20 lg:py-[120px] transition-colors duration-300 ${
        isLightMode ? 'bg-white' : 'bg-black'
      }`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
            {/* Left Content */}
            <div className="flex flex-col gap-5 lg:gap-6 w-full lg:w-[43%]">
              {/* Superheading */}
              <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide">
                about us
              </p>

              {/* Main Heading */}
              <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                The best IT solution since 2015
              </h2>

              {/* Description */}
              <p className={`text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}>
                Although, final stages of the internal network gives a complete experience of The Parameter of Speculative Environment , Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptas quibusdam libero quos rem unde, sequi distinctio eum excepturi nobis facere expedita sint nulla aliquam, odio ea laboriosam hic? Consectetur ullam eveniet
              </p>

              {/* Join Now Button */}
              <Link
                href="#"
                className="inline-flex items-center justify-center min-w-[140px] sm:min-w-[160px] lg:min-w-[180px] h-[38px] px-6 py-2 bg-[#95DE64] hover:bg-[#7bc653] text-black text-sm font-medium leading-[22px] rounded-lg transition-colors duration-200 w-fit"
              >
                Join now
              </Link>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-[57%] flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px] sm:max-w-[550px] lg:max-w-[620px] aspect-[620/345]">
                <Image
                  src={isLightMode ? "/about_us_light_mode.png" : "/about_us.png"}
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
      <section className={`w-full py-16 sm:py-20 lg:py-[120px] transition-colors duration-300 ${
        isLightMode ? 'bg-white' : 'bg-black'
      }`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
            {/* Superheading */}
            <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide">
              our story
            </p>

            {/* Main Heading */}
            <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] max-w-[598px] ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              The journey and background of the company
            </h2>

            {/* Story Content */}
            <div className={`max-w-[1160px] flex flex-col gap-6 text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              <p>
                Globonexo was born out of a shared vision between two passionate entrepreneurs in Warsaw, Poland. After countless discussions, deep research, and leveraging our international experience and expertise, we recognised a growing need – businesses across Europe and the U.S. required skilled IT talent to drive innovation, but access to top developers was often limited by local availability and high costs.
              </p>
              
              <p>
                This insight prompted us to start Globonexo: a company that unites businesses with global IT talent through strategic outstaffing solutions. From its very beginning, our goal was to bridge the gap between companies and talented engineers with the help of the development services from our Indian, Polish, Ukrainian, and Moldovan centres with high-quality service providers.
              </p>
              
              <p>
                Starting as an idea over brainstorming sessions in Warsaw, the company has grown into a firm serving clients from various industries such as automotive, fintech, healthcare, and manufacturing.
              </p>
              
              <p>
                Our story at Globonexo is that of collaboration, growth, and global connectivity. We believe that innovation knows no borders, and by empowering companies with the right talent, we help them unlock new possibilities and scale to greater heights.
              </p>
              
              <p>
                This is just the beginning – and we're excited to grow alongside our clients, partners, and dedicated team of developers worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className={`w-full py-16 sm:py-20 lg:py-[120px] transition-colors duration-300 ${
        isLightMode ? 'bg-[#F5F5F5]' : 'bg-[#141414]'
      }`}>
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col gap-8 lg:gap-10">
            {/* Header */}
            <div className="flex flex-col gap-4">
              {/* Superheading */}
              <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] tracking-wide lowercase">
                leadership team
              </p>

              {/* Main Heading */}
              <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                Bios and photos of key executives and managers
              </h2>

              {/* Description */}
              <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}>
                As a matter of fact the unification of the coherent software provides a strict control over The Accomplishment of Intended Estimation
              </p>
            </div>

            {/* Team Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Card 1 - Bodih Dgmas */}
              <div className={`rounded-xl border p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 ${
                isLightMode 
                  ? 'bg-white border-[#E8E8E8]' 
                  : 'bg-[#1F1F1F] border-[#141414]'
              }`}>
                {/* Photo */}
                <div className="relative w-full aspect-square max-w-[224px] mx-auto">
                  <Image
                    src="/team_member_1.png"
                    alt="Bodih Dgmas"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                {/* Name */}
                <h3 className={`text-xl sm:text-2xl font-normal leading-8 ${
                  isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                }`}>
                  Bodih Dgmas
                </h3>
                
                {/* Role */}
                <p className="font-mono text-xs font-normal leading-5 text-[#95DE64]">
                  front-end developer
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/facebook_about_us.png" alt="Facebook" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/x.png" alt="X" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/instagram_about_us.png" alt="Instagram" width={24} height={24} />
                  </Link>
                </div>
              </div>

              {/* Card 2 - Ahmad Errami */}
              <div className={`rounded-xl border p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 ${
                isLightMode 
                  ? 'bg-white border-[#E8E8E8]' 
                  : 'bg-[#1F1F1F] border-[#141414]'
              }`}>
                {/* Photo */}
                <div className="relative w-full aspect-square max-w-[224px] mx-auto">
                  <Image
                    src="/team_member_2.png"
                    alt="Ahmad Errami"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                {/* Name */}
                <h3 className={`text-xl sm:text-2xl font-normal leading-8 ${
                  isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                }`}>
                  Ahmad Errami
                </h3>
                
                {/* Role */}
                <p className="font-mono text-xs font-normal leading-5 text-[#95DE64]">
                  back-end developer
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/facebook_about_us.png" alt="Facebook" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/x.png" alt="X" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/instagram_about_us.png" alt="Instagram" width={24} height={24} />
                  </Link>
                </div>
              </div>

              {/* Card 3 - John Smith */}
              <div className={`rounded-xl border p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 ${
                isLightMode 
                  ? 'bg-white border-[#E8E8E8]' 
                  : 'bg-[#1F1F1F] border-[#141414]'
              }`}>
                {/* Photo */}
                <div className="relative w-full aspect-square max-w-[224px] mx-auto">
                  <Image
                    src="/team_member_3.png"
                    alt="John Smith"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                {/* Name */}
                <h3 className={`text-xl sm:text-2xl font-normal leading-8 ${
                  isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                }`}>
                  John Smith
                </h3>
                
                {/* Role */}
                <p className="font-mono text-xs font-normal leading-5 text-[#95DE64]">
                  web designer
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/facebook_about_us.png" alt="Facebook" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/x.png" alt="X" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/instagram_about_us.png" alt="Instagram" width={24} height={24} />
                  </Link>
                </div>
              </div>

              {/* Card 4 - Satoshi Nakamoto */}
              <div className={`rounded-xl border p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 ${
                isLightMode 
                  ? 'bg-white border-[#E8E8E8]' 
                  : 'bg-[#1F1F1F] border-[#141414]'
              }`}>
                {/* Photo */}
                <div className="relative w-full aspect-square max-w-[224px] mx-auto">
                  <Image
                    src="/team_member_4.png"
                    alt="Satoshi Nakamoto"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                
                {/* Name */}
                <h3 className={`text-xl sm:text-2xl font-normal leading-8 ${
                  isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                }`}>
                  Satoshi Nakamoto
                </h3>
                
                {/* Role */}
                <p className="font-mono text-xs font-normal leading-5 text-[#95DE64]">
                  CEO founder
                </p>
                
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/facebook_about_us.png" alt="Facebook" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/x.png" alt="X" width={24} height={24} />
                  </Link>
                  <Link href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                    <Image src="/instagram_about_us.png" alt="Instagram" width={24} height={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </main>
  );
};

export default AboutPage;
