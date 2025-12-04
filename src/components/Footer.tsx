"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "GDPR Compliance", href: "#" },
    { name: "Cookies Policy", href: "#" },
    { name: "Sitemap", href: "#" },
  ];

  const serviceLinks = [
    { name: "Services", href: "#services" },
    { name: "Industries", href: "#" },
  ];

  return (
    <footer className="w-full py-8 sm:py-10 lg:py-10 transition-colors duration-300">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
          {/* Logo and Description */}
          <div className="flex flex-col gap-4 lg:gap-6 lg:max-w-[327px]">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src={isLightMode ? "/globonexo_light_mode.png" : "/globonexo_logo_dark_mode.png"}
                alt="Globonexo"
                width={180}
                height={40}
                className="h-8 sm:h-9 lg:h-10 w-auto"
              />
            </Link>

            {/* Description */}
            <p className={`text-xs font-normal leading-5 ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              Lorem ipsum dolor sit amet aspernatur exercitationem fugiat.
            </p>
          </div>

          {/* Links Sections */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 lg:gap-[200px]">
            {/* Legal Section */}
            <div className="flex flex-col gap-4">
              <h3 className={`text-lg sm:text-xl font-medium leading-7 sm:leading-8 ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                Legal
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`text-sm font-normal leading-[22px] hover:text-[#95DE64] transition-colors duration-200 ${
                        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services Section */}
            <div className="flex flex-col gap-4">
              <h3 className={`text-lg sm:text-xl font-medium leading-7 sm:leading-8 ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}>
                Our services
              </h3>
              <ul className="flex flex-col gap-2 sm:gap-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`text-sm font-normal leading-[22px] hover:text-[#95DE64] transition-colors duration-200 ${
                        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
