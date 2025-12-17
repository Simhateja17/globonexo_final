"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";
import { useTheme } from "@/context/ThemeContext";
import { useContent } from "@/context/ContentContext";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, ChangeEvent } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Country list for dropdown
const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Bosnia and Herzegovina",
  "Brazil", "Bulgaria", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia", "Costa Rica",
  "Croatia", "Cyprus", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt", "El Salvador",
  "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece", "Guatemala",
  "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Libya",
  "Lithuania", "Luxembourg", "Malaysia", "Malta", "Mexico", "Moldova", "Monaco", "Mongolia", "Morocco",
  "Nepal", "Netherlands", "New Zealand", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia",
  "Saudi Arabia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Taiwan", "Thailand", "Tunisia", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam", "Yemen"
];

const JoinPage = () => {
  const { theme } = useTheme();
  const { allContent, loading } = useContent();
  const isLightMode = theme === "light";
  
  const pageContent = allContent.joinPage;
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    country: "",
    city: "",
    linkedinUrl: "",
    githubUrl: "",
    motivation: "",
    openToRelocation: true,
    agreeToPrivacy: false,
  });
  
  // File states
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [additionalDocs, setAdditionalDocs] = useState<File | null>(null);
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Refs
  const profilePictureRef = useRef<HTMLInputElement>(null);
  const cvRef = useRef<HTMLInputElement>(null);
  const additionalDocsRef = useRef<HTMLInputElement>(null);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  
  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({ ...prev, [name]: !prev[name as keyof typeof prev] }));
  };
  
  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCvChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setCvFile(file);
    }
  };
  
  const handleAdditionalDocsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAdditionalDocs(file);
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the privacy policy";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const uploadFile = async (file: File, path: string): Promise<string> => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const timestamp = Date.now();
      let profilePictureUrl = "";
      let cvUrl = "";
      let additionalDocsUrl = "";
      
      // Upload files
      if (profilePicture) {
        profilePictureUrl = await uploadFile(profilePicture, `applications/${timestamp}/profile-${profilePicture.name}`);
      }
      
      if (cvFile) {
        cvUrl = await uploadFile(cvFile, `applications/${timestamp}/cv-${cvFile.name}`);
      }
      
      if (additionalDocs) {
        additionalDocsUrl = await uploadFile(additionalDocs, `applications/${timestamp}/docs-${additionalDocs.name}`);
      }
      
      // Save to Firestore
      await addDoc(collection(db, "applications"), {
        ...formData,
        profilePictureUrl,
        cvUrl,
        additionalDocsUrl,
        createdAt: serverTimestamp(),
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (isSubmitted) {
    return (
      <main className="min-h-screen relative overflow-hidden">
        <LiquidBackground />
        <div className="relative z-10">
        <Navbar />
        
        {/* Success Section */}
        <section className="w-full min-h-[calc(100vh-70px-200px)] flex items-center justify-center py-[120px] px-5 sm:px-10 lg:px-[140px]">
          <div className="flex flex-col items-center gap-6">
            {/* Tick Mark */}
            <div className="w-14 h-14 rounded-full bg-[#95DE64] flex items-center justify-center">
              <Image
                src="/tick_mark.png"
                alt="Success"
                width={56}
                height={56}
                className="w-14 h-14"
              />
            </div>
            
            {/* Success Title */}
            <h2 className={`text-xl font-medium text-center ${
              isLightMode ? 'text-[#141414]' : 'text-white'
            }`}>
              {pageContent.successTitle}
            </h2>
            
            {/* Thank You Message */}
            <p className={`max-w-[450px] text-base font-normal leading-6 text-center ${
              isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
            }`}>
              {pageContent.successMessage}
            </p>
            
            {/* Back Button */}
            <Link
              href={pageContent.successButtonLink}
              className="inline-flex items-center justify-center min-w-[140px] h-[38px] px-6 py-2 glass-button text-black text-sm font-medium leading-[22px] rounded-xl transition-all duration-200"
            >
              {pageContent.successButtonText}
            </Link>
          </div>
        </section>
        
        <Footer />
        </div>
      </main>
    );
  }

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
              {pageContent.formTitle}
            </h1>

            {/* Description */}
            <p className={`max-w-[1160px] text-sm font-normal leading-[22px] ${
              isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
            }`}>
              {pageContent.formDescription || pageContent.pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Join Form Section */}
      <section className="w-full py-16 sm:py-20 lg:py-[120px]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-[140px]">
          <form onSubmit={handleSubmit} className={`flex flex-col gap-8 lg:gap-10 max-w-[450px] mx-auto p-8 rounded-2xl ${isLightMode ? 'glass-card-light' : 'glass-card'}`}>
            
            {/* Personal Information Section */}
            <div className="flex flex-col gap-6">
              {/* Section Header */}
              <div className="pb-2 border-b border-[#95DE64]">
                <h2 className={`text-base font-medium leading-6 ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}>
                  Personal Information
                </h2>
              </div>
              
              {/* Profile Picture and Name/Email Row */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Profile Picture Upload */}
                <div 
                  className="w-[112px] h-[112px] rounded-lg border border-dashed border-[#262626] flex flex-col items-center justify-center gap-1 p-4 cursor-pointer hover:border-[#95DE64] transition-colors flex-shrink-0"
                  onClick={() => profilePictureRef.current?.click()}
                  style={{ borderStyle: 'dashed', backgroundImage: profilePicturePreview ? `url(${profilePicturePreview})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  {!profilePicturePreview && (
                    <>
                      <span className="text-sm font-normal leading-[22px] text-[#8C8C8C] text-center">
                        Profile picture
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs font-normal leading-5 text-[#595959]">
                          Upload
                        </span>
                        <Image src="/upload.png" alt="Upload" width={20} height={20} />
                      </div>
                    </>
                  )}
                  <input
                    ref={profilePictureRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfilePictureChange}
                  />
                </div>
                
                {/* Name and Email Fields */}
                <div className="flex flex-col gap-4 flex-1">
                  {/* Full Name */}
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name*"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                      isLightMode ? 'text-[#141414]' : 'text-white'
                    } ${errors.fullName ? 'border-red-500' : ''}`}
                  />
                  
                  {/* Email Address */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                      isLightMode ? 'text-[#141414]' : 'text-white'
                    } ${errors.email ? 'border-red-500' : ''}`}
                  />
                </div>
              </div>
              
              {/* Phone Number */}
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}
              />
              
              {/* Country of Residence */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsCountryOpen(!isCountryOpen)}
                  className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 text-left flex items-center justify-between focus:border-[#95DE64] focus:outline-none transition-colors ${
                    formData.country ? (isLightMode ? 'text-[#141414]' : 'text-white') : 'text-[#8C8C8C]'
                  } ${errors.country ? 'border-red-500' : ''}`}
                >
                  <span>{formData.country || "Country of Residence*"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#8C8C8C"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                
                {isCountryOpen && (
                  <div className={`absolute top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded-lg border border-[#262626] z-50 ${
                    isLightMode ? 'bg-white' : 'bg-[#141414]'
                  }`}>
                    {countries.map((country) => (
                      <button
                        key={country}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, country }));
                          setIsCountryOpen(false);
                          if (errors.country) {
                            setErrors(prev => ({ ...prev, country: "" }));
                          }
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-[#95DE64] hover:text-black transition-colors ${
                          isLightMode ? 'text-[#141414]' : 'text-white'
                        }`}
                      >
                        {country}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* City */}
              <input
                type="text"
                name="city"
                placeholder="City*"
                value={formData.city}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                } ${errors.city ? 'border-red-500' : ''}`}
              />
              
              {/* LinkedIn Profile URL */}
              <input
                type="url"
                name="linkedinUrl"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}
              />
            </div>
            
            {/* CV & Additional Documents Section */}
            <div className="flex flex-col gap-6">
              {/* Section Header */}
              <div className="pb-2 border-b border-[#95DE64]">
                <h2 className={`text-base font-medium leading-6 ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}>
                  CV & Additional Documents
                </h2>
              </div>
              
              {/* Upload CV */}
              <div 
                className="w-full min-h-[76px] rounded-lg border border-dashed border-[#262626] flex flex-col items-center justify-center gap-1 p-4 cursor-pointer hover:border-[#95DE64] transition-colors"
                onClick={() => cvRef.current?.click()}
              >
                <span className="text-base font-normal leading-6 text-[#8C8C8C]">
                  {cvFile ? cvFile.name : "Upload CV"}
                </span>
                <span className="font-mono text-xs font-normal leading-5 text-[#595959]">
                  PDF or DOCX, max 10 MB
                </span>
                <input
                  ref={cvRef}
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={handleCvChange}
                />
              </div>
              
              {/* Upload Additional Documents */}
              <div 
                className="w-full min-h-[76px] rounded-lg border border-dashed border-[#262626] flex flex-col items-center justify-center gap-1 p-4 cursor-pointer hover:border-[#95DE64] transition-colors"
                onClick={() => additionalDocsRef.current?.click()}
              >
                <span className="text-base font-normal leading-6 text-[#8C8C8C]">
                  {additionalDocs ? additionalDocs.name : "Upload Additional Documents"}
                </span>
                <span className="font-mono text-xs font-normal leading-5 text-[#595959]">
                  PDF/DOCX/ZIP; certificates, portfolio, references, etc.
                </span>
                <input
                  ref={additionalDocsRef}
                  type="file"
                  accept=".pdf,.docx,.doc,.zip"
                  className="hidden"
                  onChange={handleAdditionalDocsChange}
                />
              </div>
            </div>
            
            {/* GitHub Profile Section */}
            <div className="flex flex-col gap-6">
              {/* Section Header */}
              <div className="pb-2 border-b border-[#95DE64]">
                <h2 className={`text-base font-medium leading-6 ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}>
                  GitHub Profile
                </h2>
              </div>
              
              {/* GitHub Profile URL */}
              <input
                type="url"
                name="githubUrl"
                placeholder="GitHub Profile URL"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className={`w-full h-12 px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}
              />
            </div>
            
            {/* Motivation Section */}
            <div className="flex flex-col gap-6">
              {/* Section Header */}
              <div className="pb-2 border-b border-[#95DE64]">
                <h2 className={`text-base font-medium leading-6 ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}>
                  Motivation
                </h2>
              </div>
              
              {/* Motivation Textarea */}
              <textarea
                name="motivation"
                placeholder="Why do you want to join Globonexo?"
                value={formData.motivation}
                onChange={handleInputChange}
                className={`w-full min-h-[96px] px-4 py-3 rounded-lg border border-[#262626] bg-transparent text-base font-normal leading-6 placeholder:text-[#8C8C8C] focus:border-[#95DE64] focus:outline-none transition-colors resize-none ${
                  isLightMode ? 'text-[#141414]' : 'text-white'
                }`}
              />
            </div>
            
            {/* Checkboxes */}
            <div className="flex flex-col gap-4">
              {/* Open to Relocation */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div 
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                    formData.openToRelocation ? 'bg-[#95DE64]' : 'border-2 border-[#262626]'
                  }`}
                  onClick={() => handleCheckboxChange('openToRelocation')}
                >
                  {formData.openToRelocation && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-base font-normal leading-6 text-[#8C8C8C]">
                  I am open to relocation or remote work assignments.
                </span>
              </label>
              
              {/* Agree to Privacy Policy */}
              <label className="flex items-start gap-3 cursor-pointer">
                <div 
                  className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
                    formData.agreeToPrivacy ? 'bg-[#95DE64]' : 'border-2 border-[#262626]'
                  } ${errors.agreeToPrivacy ? 'border-red-500' : ''}`}
                  onClick={() => handleCheckboxChange('agreeToPrivacy')}
                >
                  {formData.agreeToPrivacy && (
                    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 5L5 9L13 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-base font-normal leading-6 text-[#8C8C8C]">
                  I agree to the processing of my personal data in accordance with the{' '}
                  <Link href="/privacy" className="text-[#95DE64] hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 px-6 py-2 rounded-xl glass-button text-black text-sm font-medium leading-[22px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Send Application"}
            </button>
          </form>
        </div>
      </section>

      <Footer />
      </div>
    </main>
  );
};

export default JoinPage;
