"use client";

import Image from "next/image";
import { useState } from "react";

const ContactSection = () => {
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
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #141414 100%)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        {/* Header */}
        <div className="mb-8 lg:mb-10">
          {/* Superheading */}
          <p className="font-mono text-xs font-normal leading-5 text-[#95DE64] mb-2 tracking-wide">
            contact
          </p>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-[28px] lg:text-[30px] font-medium leading-tight lg:leading-[40px] text-[#F0F0F0] mb-4">
            Contact us for Any Questions
          </h2>

          {/* Description */}
          <p className="max-w-[1160px] text-sm font-normal leading-[22px] text-[#BFBFBF]">
            Let's Connect and Find the Right Solutions for You!
          </p>
        </div>

        {/* Content - Contact Info + Form */}
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1160px]">
          {/* Contact Info Card */}
          <div className="w-full lg:w-[370px] bg-[#141414] rounded-xl p-5 lg:p-6 flex flex-col gap-5 lg:gap-6">
            {/* Title */}
            <h3 className="text-xl lg:text-2xl font-medium leading-8 text-[#F0F0F0]">
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
                  className="w-4 h-4 object-contain"
                />
                <span className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
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
                  className="w-4 h-4 object-contain"
                />
                <span className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
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
                  className="w-4 h-4 object-contain mt-1"
                />
                <span className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
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
                  className="w-4 h-4 object-contain"
                />
                <span className="text-sm font-normal leading-[22px] text-[#BFBFBF]">
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
                  className="w-9 h-9 flex items-center justify-center bg-[#1F1F1F] rounded-lg p-2 hover:bg-[#2a2a2a] transition-colors"
                >
                  <Image
                    src={social.icon}
                    alt={social.alt}
                    width={20}
                    height={20}
                    className="w-5 h-5 object-contain"
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
                    className="w-full h-[59.5px] bg-[#1F1F1F] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] text-[#F0F0F0] placeholder-[#BFBFBF] outline-none focus:ring-1 focus:ring-[#95DE64] transition-all"
                  />

                  {/* Subject */}
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full h-[59.5px] bg-[#1F1F1F] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] text-[#F0F0F0] placeholder-[#BFBFBF] outline-none focus:ring-1 focus:ring-[#95DE64] transition-all"
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-[59.5px] bg-[#1F1F1F] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] text-[#F0F0F0] placeholder-[#BFBFBF] outline-none focus:ring-1 focus:ring-[#95DE64] transition-all"
                  />
                </div>

                {/* Right Column - Message */}
                <div className="w-full lg:w-[370px]">
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full h-[180px] lg:h-[226.5px] bg-[#1F1F1F] rounded-xl px-6 py-4 text-sm font-normal leading-[22px] text-[#F0F0F0] placeholder-[#BFBFBF] outline-none focus:ring-1 focus:ring-[#95DE64] transition-all resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-[59.5px] border border-[#95DE64] rounded-lg flex items-center justify-center text-[#95DE64] text-sm font-medium leading-[22px] hover:bg-[#95DE64] hover:text-black transition-colors"
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
