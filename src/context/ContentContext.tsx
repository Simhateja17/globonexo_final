"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  HomepageContent,
  HeroContent,
  ServicesContent,
  AboutContent,
  WhyChooseUsContent,
  TestimonialsContent,
  FAQContent,
  ContactContent,
  defaultHomepageContent,
} from "@/types/content";

interface ContentContextType {
  content: HomepageContent;
  loading: boolean;
  error: string | null;
  updateHero: (data: HeroContent) => Promise<void>;
  updateServices: (data: ServicesContent) => Promise<void>;
  updateAbout: (data: AboutContent) => Promise<void>;
  updateWhyChooseUs: (data: WhyChooseUsContent) => Promise<void>;
  updateTestimonials: (data: TestimonialsContent) => Promise<void>;
  updateFAQ: (data: FAQContent) => Promise<void>;
  updateContact: (data: ContactContent) => Promise<void>;
  refreshContent: () => Promise<void>;
  initializeContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const CONTENT_DOC_ID = "homepage";
const CONTENT_COLLECTION = "content";

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch content from Firestore
  const fetchContent = useCallback(async () => {
    try {
      setError(null);
      const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data() as HomepageContent;
        setContent({ ...defaultHomepageContent, ...data });
      } else {
        // Use default content if no data exists
        setContent(defaultHomepageContent);
      }
    } catch (err: unknown) {
      console.error("Error fetching content:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch content";
      setError(errorMessage);
      // Fall back to default content on error
      setContent(defaultHomepageContent);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize content in Firestore (for first-time setup)
  const initializeContent = async () => {
    try {
      setError(null);
      const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
      await setDoc(docRef, defaultHomepageContent);
      setContent(defaultHomepageContent);
    } catch (err: unknown) {
      console.error("Error initializing content:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize content";
      setError(errorMessage);
      throw err;
    }
  };

  // Set up real-time listener
  useEffect(() => {
    const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as HomepageContent;
          setContent({ ...defaultHomepageContent, ...data });
        } else {
          setContent(defaultHomepageContent);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to content:", err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Update specific sections
  const updateSection = async <T extends keyof HomepageContent>(
    section: T,
    data: HomepageContent[T]
  ) => {
    try {
      setError(null);
      const docRef = doc(db, CONTENT_COLLECTION, CONTENT_DOC_ID);
      const newContent = { ...content, [section]: data };
      await setDoc(docRef, newContent);
      // Real-time listener will update the state
    } catch (err: unknown) {
      console.error(`Error updating ${section}:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to update ${section}`;
      setError(errorMessage);
      throw err;
    }
  };

  const updateHero = (data: HeroContent) => updateSection("hero", data);
  const updateServices = (data: ServicesContent) => updateSection("services", data);
  const updateAbout = (data: AboutContent) => updateSection("about", data);
  const updateWhyChooseUs = (data: WhyChooseUsContent) => updateSection("whyChooseUs", data);
  const updateTestimonials = (data: TestimonialsContent) => updateSection("testimonials", data);
  const updateFAQ = (data: FAQContent) => updateSection("faq", data);
  const updateContact = (data: ContactContent) => updateSection("contact", data);

  const refreshContent = fetchContent;

  const value: ContentContextType = {
    content,
    loading,
    error,
    updateHero,
    updateServices,
    updateAbout,
    updateWhyChooseUs,
    updateTestimonials,
    updateFAQ,
    updateContact,
    refreshContent,
    initializeContent,
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return context;
}
