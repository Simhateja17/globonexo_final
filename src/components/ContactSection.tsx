"use client";

import Image from "next/image";
import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const ContactSection = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";
  
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const socialLinks = [
    { icon: "/instagram.png", alt: "Instagram", href: "#" },
    { icon: "/twitter.png", alt: "Twitter", href: "#" },
    { icon: "/facebook.png", alt: "Facebook", href: "#" },
    { icon: "/youtube.png", alt: "YouTube", href: "#" },
  ];

  return (
    <section 
      className="w-full py-16 sm:py-20 lg:py-[120px]"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
            contact
          </p>

          {/* Main Heading */}
          <h2 className={`text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] mb-4 ${
            isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
          }`}>
            Contact us for Any Questions
          </h2>

          {/* Description */}
          <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
            isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
          }`}>
            Let's Connect and Find the Right Solutions for You!
          </p>
        </div>

        {/* Content - Contact Info + Form */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1160px]">
          {/* Contact Info Card */}
          <div className={`w-full lg:w-[370px] rounded-2xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6 ${
            isLightMode ? 'glass-card-light' : 'glass-card'
          }`}>
            {/* Title */}
            <h3 className={`text-xl lg:text-2xl font-medium leading-8 ${
              isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
            }`}>
              Contact Info
            </h3>

            {/* Contact Details */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <Image
                  src="/mail.png"
                  alt="Email"
                  width={16}
                  height={16}
                  className={`w-4 h-4 object-contain ${isLightMode ? 'invert' : ''}`}
                />
                <span className={`text-sm font-normal leading-[22px] ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}>
                  conatct.global@globonexo.com
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Image
                  src="/phone.png"
                  alt="Phone"
                  width={16}
                  height={16}
                  className={`w-4 h-4 object-contain ${isLightMode ? 'invert' : ''}`}
                />
                <span className={`text-sm font-normal leading-[22px] ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}>
                  +49 711 123456
                </span>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <Image
                  src="/location.png"
                  alt="Location"
                  width={16}
                  height={16}
                  className={`w-4 h-4 object-contain mt-1 ${isLightMode ? 'invert' : ''}`}
                />
                <span className={`text-sm font-normal leading-[22px] ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}>
                  Headquarters: Koenigstr. 10c, 70173 Stuttgart, Germany
                </span>
              </div>

              {/* Phone 2 */}
              <div className="flex items-center gap-3">
                <Image
                  src="/phone.png"
                  alt="Phone"
                  width={16}
                  height={16}
                  className={`w-4 h-4 object-contain ${isLightMode ? 'invert' : ''}`}
                />
                <span className={`text-sm font-normal leading-[22px] ${
                  isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                }`}>
                  +49 711 123456
                </span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-2 mt-auto pt-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg p-2 transition-all ${
                    isLightMode 
                      ? 'bg-white/50 hover:bg-white/70 backdrop-blur-sm border border-white/30' 
                      : 'bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10'
                  }`}
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className={`w-5 h-5 object-contain ${isLightMode ? 'invert' : ''}`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="flex-1 max-w-[764px]">
            <div className="flex flex-col gap-6">
              {/* Form Fields Row */}
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Column - Name, Subject, Email */}
                <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-[370px]">
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full h-[59.5px] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] outline-none transition-all ${
                      isLightMode 
                        ? 'glass-input-light text-[#141414]' 
                        : 'glass-input text-[#F0F0F0]'
                    }`}
                  />

                  {/* Subject */}
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full h-[59.5px] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] outline-none transition-all ${
                      isLightMode 
                        ? 'glass-input-light text-[#141414]' 
                        : 'glass-input text-[#F0F0F0]'
                    }`}
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full h-[59.5px] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] outline-none transition-all ${
                      isLightMode 
                        ? 'glass-input-light text-[#141414]' 
                        : 'glass-input text-[#F0F0F0]'
                    }`}
                  />
                </div>

                {/* Right Column - Message */}
                <div className="w-full lg:w-[370px]">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full h-[180px] lg:h-[226.5px] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] outline-none transition-all resize-none ${
                      isLightMode 
                        ? 'glass-input-light text-[#141414]' 
                        : 'glass-input text-[#F0F0F0]'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[59.5px] glass-button-outline border border-[#95DE64] rounded-xl flex items-center justify-center text-[#95DE64] text-sm font-medium leading-[22px] hover:glass-button hover:text-black transition-all"
              >
                Send now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
