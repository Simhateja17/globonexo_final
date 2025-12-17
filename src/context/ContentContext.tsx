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
  AboutPageContent,
  BlogPageContent,
  ServicesPageContent,
  GlobalPresencePageContent,
  JoinPageContent,
  AllPagesContent,
  defaultHomepageContent,
  defaultAboutPageContent,
  defaultBlogPageContent,
  defaultServicesPageContent,
  defaultGlobalPresencePageContent,
  defaultJoinPageContent,
  defaultAllPagesContent,
} from "@/types/content";

interface ContentContextType {
  // Homepage content (legacy support)
  content: HomepageContent;
  // All pages content
  allContent: AllPagesContent;
  loading: boolean;
  error: string | null;
  // Homepage section updates
  updateHero: (data: HeroContent) => Promise<void>;
  updateServices: (data: ServicesContent) => Promise<void>;
  updateAbout: (data: AboutContent) => Promise<void>;
  updateWhyChooseUs: (data: WhyChooseUsContent) => Promise<void>;
  updateTestimonials: (data: TestimonialsContent) => Promise<void>;
  updateFAQ: (data: FAQContent) => Promise<void>;
  updateContact: (data: ContactContent) => Promise<void>;
  // Full page updates
  updateAboutPage: (data: AboutPageContent) => Promise<void>;
  updateBlogPage: (data: BlogPageContent) => Promise<void>;
  updateServicesPage: (data: ServicesPageContent) => Promise<void>;
  updateGlobalPresencePage: (data: GlobalPresencePageContent) => Promise<void>;
  updateJoinPage: (data: JoinPageContent) => Promise<void>;
  refreshContent: () => Promise<void>;
  initializeContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const CONTENT_COLLECTION = "content";

// Document IDs for each page
const DOC_IDS = {
  homepage: "homepage",
  aboutPage: "aboutPage",
  blogPage: "blogPage",
  servicesPage: "servicesPage",
  globalPresencePage: "globalPresencePage",
  joinPage: "joinPage",
};

export function ContentProvider({ children }: { children: ReactNode }) {
  const [allContent, setAllContent] = useState<AllPagesContent>(defaultAllPagesContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all content from Firestore
  const fetchAllContent = useCallback(async () => {
    try {
      setError(null);
      
      const [homepageSnap, aboutSnap, blogSnap, servicesSnap, globalPresenceSnap, joinSnap] = await Promise.all([
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.homepage)),
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.aboutPage)),
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.blogPage)),
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.servicesPage)),
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.globalPresencePage)),
        getDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.joinPage)),
      ]);

      setAllContent({
        homepage: homepageSnap.exists() 
          ? { ...defaultHomepageContent, ...homepageSnap.data() as HomepageContent }
          : defaultHomepageContent,
        aboutPage: aboutSnap.exists()
          ? { ...defaultAboutPageContent, ...aboutSnap.data() as AboutPageContent }
          : defaultAboutPageContent,
        blogPage: blogSnap.exists()
          ? { ...defaultBlogPageContent, ...blogSnap.data() as BlogPageContent }
          : defaultBlogPageContent,
        servicesPage: servicesSnap.exists()
          ? { ...defaultServicesPageContent, ...servicesSnap.data() as ServicesPageContent }
          : defaultServicesPageContent,
        globalPresencePage: globalPresenceSnap.exists()
          ? { ...defaultGlobalPresencePageContent, ...globalPresenceSnap.data() as GlobalPresencePageContent }
          : defaultGlobalPresencePageContent,
        joinPage: joinSnap.exists()
          ? { ...defaultJoinPageContent, ...joinSnap.data() as JoinPageContent }
          : defaultJoinPageContent,
      });
    } catch (err: unknown) {
      console.error("Error fetching content:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch content";
      setError(errorMessage);
      setAllContent(defaultAllPagesContent);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize all content in Firestore (for first-time setup)
  const initializeContent = async () => {
    try {
      setError(null);
      await Promise.all([
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.homepage), defaultHomepageContent),
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.aboutPage), defaultAboutPageContent),
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.blogPage), defaultBlogPageContent),
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.servicesPage), defaultServicesPageContent),
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.globalPresencePage), defaultGlobalPresencePageContent),
        setDoc(doc(db, CONTENT_COLLECTION, DOC_IDS.joinPage), defaultJoinPageContent),
      ]);
      setAllContent(defaultAllPagesContent);
    } catch (err: unknown) {
      console.error("Error initializing content:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to initialize content";
      setError(errorMessage);
      throw err;
    }
  };

  // Set up real-time listeners for all documents
  useEffect(() => {
    const unsubscribes: (() => void)[] = [];

    // Homepage listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.homepage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              homepage: { ...defaultHomepageContent, ...docSnap.data() as HomepageContent }
            }));
          }
        },
        (err) => console.error("Error listening to homepage:", err)
      )
    );

    // About page listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.aboutPage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              aboutPage: { ...defaultAboutPageContent, ...docSnap.data() as AboutPageContent }
            }));
          }
        },
        (err) => console.error("Error listening to about page:", err)
      )
    );

    // Blog page listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.blogPage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              blogPage: { ...defaultBlogPageContent, ...docSnap.data() as BlogPageContent }
            }));
          }
        },
        (err) => console.error("Error listening to blog page:", err)
      )
    );

    // Services page listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.servicesPage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              servicesPage: { ...defaultServicesPageContent, ...docSnap.data() as ServicesPageContent }
            }));
          }
        },
        (err) => console.error("Error listening to services page:", err)
      )
    );

    // Global presence page listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.globalPresencePage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              globalPresencePage: { ...defaultGlobalPresencePageContent, ...docSnap.data() as GlobalPresencePageContent }
            }));
          }
        },
        (err) => console.error("Error listening to global presence page:", err)
      )
    );

    // Join page listener
    unsubscribes.push(
      onSnapshot(
        doc(db, CONTENT_COLLECTION, DOC_IDS.joinPage),
        (docSnap) => {
          if (docSnap.exists()) {
            setAllContent(prev => ({
              ...prev,
              joinPage: { ...defaultJoinPageContent, ...docSnap.data() as JoinPageContent }
            }));
          }
        },
        (err) => console.error("Error listening to join page:", err)
      )
    );

    // Initial fetch
    fetchAllContent();

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [fetchAllContent]);

  // Update homepage sections
  const updateHomepageSection = async <T extends keyof HomepageContent>(
    section: T,
    data: HomepageContent[T]
  ) => {
    try {
      setError(null);
      const docRef = doc(db, CONTENT_COLLECTION, DOC_IDS.homepage);
      const newContent = { ...allContent.homepage, [section]: data };
      await setDoc(docRef, newContent);
    } catch (err: unknown) {
      console.error(`Error updating ${section}:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to update ${section}`;
      setError(errorMessage);
      throw err;
    }
  };

  // Update full page content
  const updatePageContent = async <T extends keyof AllPagesContent>(
    pageKey: T,
    docId: string,
    data: AllPagesContent[T]
  ) => {
    try {
      setError(null);
      const docRef = doc(db, CONTENT_COLLECTION, docId);
      await setDoc(docRef, data);
    } catch (err: unknown) {
      console.error(`Error updating ${pageKey}:`, err);
      const errorMessage = err instanceof Error ? err.message : `Failed to update ${pageKey}`;
      setError(errorMessage);
      throw err;
    }
  };

  const updateHero = (data: HeroContent) => updateHomepageSection("hero", data);
  const updateServices = (data: ServicesContent) => updateHomepageSection("services", data);
  const updateAbout = (data: AboutContent) => updateHomepageSection("about", data);
  const updateWhyChooseUs = (data: WhyChooseUsContent) => updateHomepageSection("whyChooseUs", data);
  const updateTestimonials = (data: TestimonialsContent) => updateHomepageSection("testimonials", data);
  const updateFAQ = (data: FAQContent) => updateHomepageSection("faq", data);
  const updateContact = (data: ContactContent) => updateHomepageSection("contact", data);

  const updateAboutPage = (data: AboutPageContent) => updatePageContent("aboutPage", DOC_IDS.aboutPage, data);
  const updateBlogPage = (data: BlogPageContent) => updatePageContent("blogPage", DOC_IDS.blogPage, data);
  const updateServicesPage = (data: ServicesPageContent) => updatePageContent("servicesPage", DOC_IDS.servicesPage, data);
  const updateGlobalPresencePage = (data: GlobalPresencePageContent) => updatePageContent("globalPresencePage", DOC_IDS.globalPresencePage, data);
  const updateJoinPage = (data: JoinPageContent) => updatePageContent("joinPage", DOC_IDS.joinPage, data);

  const refreshContent = fetchAllContent;

  const value: ContentContextType = {
    content: allContent.homepage,
    allContent,
    loading,
    error,
    updateHero,
    updateServices,
    updateAbout,
    updateWhyChooseUs,
    updateTestimonials,
    updateFAQ,
    updateContact,
    updateAboutPage,
    updateBlogPage,
    updateServicesPage,
    updateGlobalPresencePage,
    updateJoinPage,
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
