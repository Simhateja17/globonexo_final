"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

interface NavItemProps {
  label: string;
  href: string;
  hasDropdown?: boolean;
  isLightMode?: boolean;
  isActive?: boolean;
}

const NavItem = ({ label, href, hasDropdown = true, isLightMode = false, isActive = false }: NavItemProps) => {
  return (
    <Link href={href} className="flex items-center gap-1 cursor-pointer group">
      <span className={`text-sm font-medium leading-[22px] group-hover:text-[#95DE64] transition-colors ${
        isActive ? 'text-[#95DE64]' : (isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]')
      }`}>
        {label}
      </span>
      {hasDropdown && (
        <svg
          className="w-2 h-1 mt-[2px] transition-transform group-hover:rotate-180"
          viewBox="0 0 8 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1L4 3L7 1"
            stroke={isActive ? "#95DE64" : (isLightMode ? "#141414" : "#F0F0F0")}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isLightMode = theme === "light";
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", hasDropdown: true },
    { label: "About us", href: "/about", hasDropdown: true },
    { label: "Services", href: "/services", hasDropdown: true },
    { label: "Special expertise", href: "/expertise", hasDropdown: true },
    { label: "Learn more", href: "/blog", hasDropdown: true },
    { label: "Contact", href: "/contact", hasDropdown: true },
  ];

  return (
    <nav className={`w-full ${isLightMode ? 'bg-white' : 'bg-black'} transition-colors duration-300`}>
      <div className="max-w-[1440px] mx-auto h-[70px] flex items-center justify-between px-5 sm:px-10 lg:px-[140px] py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src={isLightMode ? "/globonexo_light_mode.png" : "/globonexo_logo_dark_mode.png"}
            alt="Globonexo Logo"
            width={160}
            height={40}
            className="h-8 w-auto sm:h-10"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <NavItem 
              key={item.label} 
              label={item.label} 
              href={item.href}
              hasDropdown={item.hasDropdown} 
              isLightMode={isLightMode}
              isActive={pathname === item.href}
            />
          ))}
        </div>

        {/* Right Side - Light Switch & Join Now */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Light Switch - 38x38px same as Join Now button height */}
          <Image
            src={isLightMode ? "/light_switch_light_mode.png" : "/light_switch.png"}
            alt="Toggle theme"
            width={38}
            height={38}
            className="w-[38px] h-[38px] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={toggleTheme}
          />

          {/* Join Now Button */}
          <button className="hidden sm:flex items-center justify-center bg-[#95DE64] text-black text-sm font-medium leading-[22px] px-6 py-2 rounded-lg hover:bg-[#7bc653] transition-colors min-w-[105px] h-[38px]">
            Join now
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className={`w-6 h-6 ${isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden ${isLightMode ? 'bg-white border-gray-200' : 'bg-black border-gray-800'} border-t px-5 py-4`}>
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between py-2">
                <span className={`text-sm font-medium ${
                  pathname === item.href ? 'text-[#95DE64]' : (isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]')
                }`}>{item.label}</span>
                {item.hasDropdown && (
                  <svg
                    className="w-2 h-1"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L4 3L7 1"
                      stroke={pathname === item.href ? "#95DE64" : (isLightMode ? "#141414" : "#F0F0F0")}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </Link>
            ))}
            {/* Mobile Join Now Button */}
            <button className="sm:hidden mt-2 w-full bg-[#95DE64] text-black text-sm font-medium leading-[22px] px-6 py-2 rounded-lg hover:bg-[#7bc653] transition-colors h-[38px]">
              Join now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
