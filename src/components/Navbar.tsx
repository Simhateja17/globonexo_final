"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NavItemProps {
  label: string;
  hasDropdown?: boolean;
}

const NavItem = ({ label, hasDropdown = true }: NavItemProps) => {
  return (
    <div className="flex items-center gap-1 cursor-pointer group">
      <span className="text-[#F0F0F0] text-sm font-medium leading-[22px] group-hover:text-[#95DE64] transition-colors">
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
            stroke="#F0F0F0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", hasDropdown: true },
    { label: "About us", hasDropdown: true },
    { label: "Services", hasDropdown: true },
    { label: "Special expertise", hasDropdown: true },
    { label: "Learn more", hasDropdown: true },
    { label: "Contact", hasDropdown: true },
  ];

  return (
    <nav className="w-full bg-black">
      <div className="max-w-[1440px] mx-auto h-[70px] flex items-center justify-between px-5 sm:px-10 lg:px-[140px] py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/globonexo_logo_dark_mode.png"
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
            <NavItem key={item.label} label={item.label} hasDropdown={item.hasDropdown} />
          ))}
        </div>

        {/* Right Side - Light Switch & Join Now */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Light Switch - 38x38px same as Join Now button height */}
          <Image
            src="/light_switch.png"
            alt="Light mode toggle"
            width={38}
            height={38}
            className="w-[38px] h-[38px] cursor-pointer hover:opacity-80 transition-opacity"
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
              className="w-6 h-6 text-[#F0F0F0]"
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
        <div className="lg:hidden bg-black border-t border-gray-800 px-5 py-4">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2">
                <span className="text-[#F0F0F0] text-sm font-medium">{item.label}</span>
                {item.hasDropdown && (
                  <svg
                    className="w-2 h-1"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L4 3L7 1"
                      stroke="#F0F0F0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
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
