"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const CORRECT_PASSWORD = "MovingForward2026";
const STORAGE_KEY = "globonexo_authenticated";

export default function PasswordModal({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Check if already authenticated in this session
    const authenticated = sessionStorage.getItem(STORAGE_KEY);
    setIsAuthenticated(authenticated === "true");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword("");
    }
  };

  // Show nothing while checking authentication status
  if (isAuthenticated === null) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999]">
        <div className="w-8 h-8 border-2 border-[#95DE64] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If authenticated, show the website
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show password modal
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-[9999] p-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#95DE64]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#95DE64]/5 rounded-full blur-3xl" />
      </div>

      {/* Modal */}
      <div 
        className={`relative bg-[#0a0a0a] border border-[#95DE64]/20 rounded-2xl p-8 md:p-12 max-w-md w-full shadow-2xl shadow-[#95DE64]/10 ${
          isShaking ? "animate-shake" : ""
        }`}
      >
        {/* Logo or Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/globonexo_logo_dark_mode.png"
              alt="Globonexo"
              width={200}
              height={50}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <p className="text-[#BFBFBF] text-sm md:text-base">
            Enter password to access the website
          </p>
        </div>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#95DE64] focus:ring-1 focus:ring-[#95DE64] transition-all duration-200"
              autoFocus
              autoComplete="off"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center animate-fadeIn">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#95DE64] text-black font-semibold py-3 px-6 rounded-lg hover:bg-[#7bc653] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Enter Site
          </button>
        </form>

        {/* Decorative elements */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#95DE64] rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#95DE64] rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#95DE64] rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#95DE64] rounded-br-lg" />
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
