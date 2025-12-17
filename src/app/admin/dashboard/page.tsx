"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";
import {
  HeroContent,
  ServicesContent,
  AboutContent,
  WhyChooseUsContent,
  TestimonialsContent,
  FAQContent,
  ContactContent,
  ServiceCard,
  StatCard,
  WhyChooseCard,
  Testimonial,
  FAQItem,
} from "@/types/content";

type TabType = "hero" | "services" | "about" | "whyChooseUs" | "testimonials" | "faq" | "contact";

export default function AdminDashboardPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { content, loading: contentLoading, updateHero, updateServices, updateAbout, updateWhyChooseUs, updateTestimonials, updateFAQ, updateContact, initializeContent } = useContent();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState<TabType>("hero");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Local state for editing
  const [heroData, setHeroData] = useState<HeroContent>(content.hero);
  const [servicesData, setServicesData] = useState<ServicesContent>(content.services);
  const [aboutData, setAboutData] = useState<AboutContent>(content.about);
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUsContent>(content.whyChooseUs);
  const [testimonialsData, setTestimonialsData] = useState<TestimonialsContent>(content.testimonials);
  const [faqData, setFaqData] = useState<FAQContent>(content.faq);
  const [contactData, setContactData] = useState<ContactContent>(content.contact);

  // Update local state when content changes
  useEffect(() => {
    setHeroData(content.hero);
    setServicesData(content.services);
    setAboutData(content.about);
    setWhyChooseUsData(content.whyChooseUs);
    setTestimonialsData(content.testimonials);
    setFaqData(content.faq);
    setContactData(content.contact);
  }, [content]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/admin/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || contentLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setSaveMessage({ type, text });
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      switch (activeTab) {
        case "hero":
          await updateHero(heroData);
          break;
        case "services":
          await updateServices(servicesData);
          break;
        case "about":
          await updateAbout(aboutData);
          break;
        case "whyChooseUs":
          await updateWhyChooseUs(whyChooseUsData);
          break;
        case "testimonials":
          await updateTestimonials(testimonialsData);
          break;
        case "faq":
          await updateFAQ(faqData);
          break;
        case "contact":
          await updateContact(contactData);
          break;
      }
      showMessage("success", "Changes saved successfully!");
    } catch {
      showMessage("error", "Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleInitialize = async () => {
    if (confirm("This will initialize the database with default content. Continue?")) {
      try {
        await initializeContent();
        showMessage("success", "Content initialized successfully!");
      } catch {
        showMessage("error", "Failed to initialize content.");
      }
    }
  };

  const tabs: { id: TabType; label: string }[] = [
    { id: "hero", label: "Hero Section" },
    { id: "services", label: "Services" },
    { id: "about", label: "About Us" },
    { id: "whyChooseUs", label: "Why Choose Us" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-[#262626] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">
              <span className="text-[#95DE64]">Globonexo</span> CMS
            </h1>
            <span className="text-xs text-[#595959] bg-[#1f1f1f] px-2 py-1 rounded">
              {user.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleInitialize}
              className="text-sm text-[#95DE64] hover:underline"
            >
              Initialize DB
            </button>
            <a
              href="/"
              target="_blank"
              className="text-sm text-[#BFBFBF] hover:text-white"
            >
              View Site →
            </a>
            <button
              onClick={handleSignOut}
              className="text-sm text-red-400 hover:text-red-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Save Message */}
        {saveMessage && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              saveMessage.type === "success"
                ? "bg-green-500/10 border border-green-500/30 text-green-400"
                : "bg-red-500/10 border border-red-500/30 text-red-400"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-[#262626] pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-[#95DE64] text-black"
                  : "bg-[#1f1f1f] text-[#BFBFBF] hover:bg-[#262626]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Editor */}
        <div className="bg-[#141414] border border-[#262626] rounded-xl p-6">
          {activeTab === "hero" && (
            <HeroEditor data={heroData} onChange={setHeroData} />
          )}
          {activeTab === "services" && (
            <ServicesEditor data={servicesData} onChange={setServicesData} />
          )}
          {activeTab === "about" && (
            <AboutEditor data={aboutData} onChange={setAboutData} />
          )}
          {activeTab === "whyChooseUs" && (
            <WhyChooseUsEditor data={whyChooseUsData} onChange={setWhyChooseUsData} />
          )}
          {activeTab === "testimonials" && (
            <TestimonialsEditor data={testimonialsData} onChange={setTestimonialsData} />
          )}
          {activeTab === "faq" && (
            <FAQEditor data={faqData} onChange={setFaqData} />
          )}
          {activeTab === "contact" && (
            <ContactEditor data={contactData} onChange={setContactData} />
          )}

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-[#262626] flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-[#95DE64] text-black font-medium rounded-lg hover:bg-[#7bc653] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EDITOR COMPONENTS
// ============================================

interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

function Input({ label, value, onChange, placeholder, multiline }: InputProps) {
  const className = "w-full px-4 py-3 bg-[#1f1f1f] border border-[#333] rounded-lg text-white placeholder-[#595959] focus:outline-none focus:border-[#95DE64] transition-colors";
  
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[#BFBFBF] mb-2">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}

// Hero Editor
function HeroEditor({ data, onChange }: { data: HeroContent; onChange: (data: HeroContent) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Hero Section</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-[#95DE64] mb-4">Heading Line 1</h3>
          <Input label="Text" value={data.headingLine1} onChange={(v) => onChange({ ...data, headingLine1: v })} />
          <Input label="Highlighted Text" value={data.headingLine1Highlight} onChange={(v) => onChange({ ...data, headingLine1Highlight: v })} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#95DE64] mb-4">Heading Line 2</h3>
          <Input label="Text" value={data.headingLine2} onChange={(v) => onChange({ ...data, headingLine2: v })} />
          <Input label="Highlighted Text" value={data.headingLine2Highlight} onChange={(v) => onChange({ ...data, headingLine2Highlight: v })} />
        </div>
      </div>

      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-[#95DE64] mb-4">Primary Button</h3>
          <Input label="Text" value={data.primaryButtonText} onChange={(v) => onChange({ ...data, primaryButtonText: v })} />
          <Input label="Link" value={data.primaryButtonLink} onChange={(v) => onChange({ ...data, primaryButtonLink: v })} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-[#95DE64] mb-4">Secondary Button</h3>
          <Input label="Text" value={data.secondaryButtonText} onChange={(v) => onChange({ ...data, secondaryButtonText: v })} />
          <Input label="Link" value={data.secondaryButtonLink} onChange={(v) => onChange({ ...data, secondaryButtonLink: v })} />
        </div>
      </div>

      <h3 className="text-sm font-medium text-[#95DE64] mb-4 mt-6">Trust Section</h3>
      <Input label="Trust Label" value={data.trustLabel} onChange={(v) => onChange({ ...data, trustLabel: v })} />
      <Input 
        label="Trusted Companies (comma-separated)" 
        value={data.trustedCompanies.join(", ")} 
        onChange={(v) => onChange({ ...data, trustedCompanies: v.split(",").map(s => s.trim()).filter(Boolean) })} 
      />
    </div>
  );
}

// Services Editor
function ServicesEditor({ data, onChange }: { data: ServicesContent; onChange: (data: ServicesContent) => void }) {
  const addCard = () => {
    const newCard: ServiceCard = {
      id: Date.now().toString(),
      icon: "🔧",
      title: "New Service",
      description: "Service description",
      isGreenTitle: false,
      learnMoreLink: "#",
      order: data.cards.length + 1
    };
    onChange({ ...data, cards: [...data.cards, newCard] });
  };

  const updateCard = (index: number, card: ServiceCard) => {
    const newCards = [...data.cards];
    newCards[index] = card;
    onChange({ ...data, cards: newCards });
  };

  const removeCard = (index: number) => {
    onChange({ ...data, cards: data.cards.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Services Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#95DE64]">Service Cards</h3>
          <button onClick={addCard} className="text-sm bg-[#95DE64] text-black px-4 py-2 rounded-lg hover:bg-[#7bc653]">
            + Add Card
          </button>
        </div>

        <div className="space-y-4">
          {data.cards.map((card, index) => (
            <div key={card.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#95DE64] text-sm">Card {index + 1}</span>
                <button onClick={() => removeCard(index)} className="text-red-400 hover:text-red-300 text-sm">
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Icon (emoji)" value={card.icon} onChange={(v) => updateCard(index, { ...card, icon: v })} />
                <Input label="Title" value={card.title} onChange={(v) => updateCard(index, { ...card, title: v })} />
              </div>
              <Input label="Description" value={card.description} onChange={(v) => updateCard(index, { ...card, description: v })} multiline />
              <div className="flex items-center gap-4">
                <Input label="Learn More Link" value={card.learnMoreLink} onChange={(v) => updateCard(index, { ...card, learnMoreLink: v })} />
                <label className="flex items-center gap-2 text-sm text-[#BFBFBF] mt-6">
                  <input
                    type="checkbox"
                    checked={card.isGreenTitle}
                    onChange={(e) => updateCard(index, { ...card, isGreenTitle: e.target.checked })}
                    className="w-4 h-4"
                  />
                  Green Title
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Editor
function AboutEditor({ data, onChange }: { data: AboutContent; onChange: (data: AboutContent) => void }) {
  const addStat = () => {
    const newStat: StatCard = {
      id: Date.now().toString(),
      value: "0",
      label: "new stat",
      order: data.stats.length + 1
    };
    onChange({ ...data, stats: [...data.stats, newStat] });
  };

  const updateStat = (index: number, stat: StatCard) => {
    const newStats = [...data.stats];
    newStats[index] = stat;
    onChange({ ...data, stats: newStats });
  };

  const removeStat = (index: number) => {
    onChange({ ...data, stats: data.stats.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">About Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#BFBFBF] mb-2">Paragraphs</label>
        {data.paragraphs.map((p, i) => (
          <div key={i} className="mb-2">
            <textarea
              value={p}
              onChange={(e) => {
                const newParagraphs = [...data.paragraphs];
                newParagraphs[i] = e.target.value;
                onChange({ ...data, paragraphs: newParagraphs });
              }}
              rows={2}
              className="w-full px-4 py-3 bg-[#1f1f1f] border border-[#333] rounded-lg text-white placeholder-[#595959] focus:outline-none focus:border-[#95DE64]"
            />
          </div>
        ))}
        <button
          onClick={() => onChange({ ...data, paragraphs: [...data.paragraphs, ""] })}
          className="text-sm text-[#95DE64] hover:underline"
        >
          + Add Paragraph
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Button Text" value={data.buttonText} onChange={(v) => onChange({ ...data, buttonText: v })} />
        <Input label="Button Link" value={data.buttonLink} onChange={(v) => onChange({ ...data, buttonLink: v })} />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#95DE64]">Stats</h3>
          <button onClick={addStat} className="text-sm bg-[#95DE64] text-black px-4 py-2 rounded-lg hover:bg-[#7bc653]">
            + Add Stat
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.stats.map((stat, index) => (
            <div key={stat.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[#95DE64] text-sm">Stat {index + 1}</span>
                <button onClick={() => removeStat(index)} className="text-red-400 hover:text-red-300 text-sm">
                  Remove
                </button>
              </div>
              <Input label="Value" value={stat.value} onChange={(v) => updateStat(index, { ...stat, value: v })} />
              <Input label="Label" value={stat.label} onChange={(v) => updateStat(index, { ...stat, label: v })} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Why Choose Us Editor
function WhyChooseUsEditor({ data, onChange }: { data: WhyChooseUsContent; onChange: (data: WhyChooseUsContent) => void }) {
  const addCard = () => {
    const newCard: WhyChooseCard = {
      id: Date.now().toString(),
      icon: "⭐",
      title: "New Reason",
      description: "Description",
      order: data.cards.length + 1
    };
    onChange({ ...data, cards: [...data.cards, newCard] });
  };

  const updateCard = (index: number, card: WhyChooseCard) => {
    const newCards = [...data.cards];
    newCards[index] = card;
    onChange({ ...data, cards: newCards });
  };

  const removeCard = (index: number) => {
    onChange({ ...data, cards: data.cards.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Why Choose Us Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#95DE64]">Cards</h3>
          <button onClick={addCard} className="text-sm bg-[#95DE64] text-black px-4 py-2 rounded-lg hover:bg-[#7bc653]">
            + Add Card
          </button>
        </div>

        <div className="space-y-4">
          {data.cards.map((card, index) => (
            <div key={card.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#95DE64] text-sm">Card {index + 1}</span>
                <button onClick={() => removeCard(index)} className="text-red-400 hover:text-red-300 text-sm">
                  Remove
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Icon (emoji)" value={card.icon} onChange={(v) => updateCard(index, { ...card, icon: v })} />
                <Input label="Title" value={card.title} onChange={(v) => updateCard(index, { ...card, title: v })} />
              </div>
              <Input label="Description" value={card.description} onChange={(v) => updateCard(index, { ...card, description: v })} multiline />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Testimonials Editor
function TestimonialsEditor({ data, onChange }: { data: TestimonialsContent; onChange: (data: TestimonialsContent) => void }) {
  const addTestimonial = () => {
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      quote: "New testimonial quote",
      name: "Name",
      title: "Title",
      order: data.testimonials.length + 1
    };
    onChange({ ...data, testimonials: [...data.testimonials, newTestimonial] });
  };

  const updateTestimonial = (index: number, testimonial: Testimonial) => {
    const newTestimonials = [...data.testimonials];
    newTestimonials[index] = testimonial;
    onChange({ ...data, testimonials: newTestimonials });
  };

  const removeTestimonial = (index: number) => {
    onChange({ ...data, testimonials: data.testimonials.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Testimonials Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />

      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-[#95DE64]">Testimonials</h3>
          <button onClick={addTestimonial} className="text-sm bg-[#95DE64] text-black px-4 py-2 rounded-lg hover:bg-[#7bc653]">
            + Add Testimonial
          </button>
        </div>

        <div className="space-y-4">
          {data.testimonials.map((t, index) => (
            <div key={t.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[#95DE64] text-sm">Testimonial {index + 1}</span>
                <button onClick={() => removeTestimonial(index)} className="text-red-400 hover:text-red-300 text-sm">
                  Remove
                </button>
              </div>
              <Input label="Quote" value={t.quote} onChange={(v) => updateTestimonial(index, { ...t, quote: v })} multiline />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name" value={t.name} onChange={(v) => updateTestimonial(index, { ...t, name: v })} />
                <Input label="Title" value={t.title} onChange={(v) => updateTestimonial(index, { ...t, title: v })} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// FAQ Editor
function FAQEditor({ data, onChange }: { data: FAQContent; onChange: (data: FAQContent) => void }) {
  const addFAQ = (column: 'left' | 'right') => {
    const newFAQ: FAQItem = {
      id: Date.now().toString(),
      question: "New question?",
      answer: "Answer here",
      column,
      order: data.items.filter(i => i.column === column).length + 1
    };
    onChange({ ...data, items: [...data.items, newFAQ] });
  };

  const updateFAQ = (index: number, faq: FAQItem) => {
    const newItems = [...data.items];
    newItems[index] = faq;
    onChange({ ...data, items: newItems });
  };

  const removeFAQ = (index: number) => {
    onChange({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  const leftFAQs = data.items.filter(i => i.column === 'left');
  const rightFAQs = data.items.filter(i => i.column === 'right');

  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">FAQ Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#95DE64]">Left Column</h3>
            <button onClick={() => addFAQ('left')} className="text-sm bg-[#95DE64] text-black px-3 py-1 rounded hover:bg-[#7bc653]">
              + Add
            </button>
          </div>
          <div className="space-y-4">
            {leftFAQs.map((faq) => {
              const index = data.items.findIndex(i => i.id === faq.id);
              return (
                <div key={faq.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
                  <div className="flex justify-end mb-2">
                    <button onClick={() => removeFAQ(index)} className="text-red-400 hover:text-red-300 text-sm">
                      Remove
                    </button>
                  </div>
                  <Input label="Question" value={faq.question} onChange={(v) => updateFAQ(index, { ...faq, question: v })} />
                  <Input label="Answer" value={faq.answer} onChange={(v) => updateFAQ(index, { ...faq, answer: v })} multiline />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#95DE64]">Right Column</h3>
            <button onClick={() => addFAQ('right')} className="text-sm bg-[#95DE64] text-black px-3 py-1 rounded hover:bg-[#7bc653]">
              + Add
            </button>
          </div>
          <div className="space-y-4">
            {rightFAQs.map((faq) => {
              const index = data.items.findIndex(i => i.id === faq.id);
              return (
                <div key={faq.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
                  <div className="flex justify-end mb-2">
                    <button onClick={() => removeFAQ(index)} className="text-red-400 hover:text-red-300 text-sm">
                      Remove
                    </button>
                  </div>
                  <Input label="Question" value={faq.question} onChange={(v) => updateFAQ(index, { ...faq, question: v })} />
                  <Input label="Answer" value={faq.answer} onChange={(v) => updateFAQ(index, { ...faq, answer: v })} multiline />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Editor
function ContactEditor({ data, onChange }: { data: ContactContent; onChange: (data: ContactContent) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-white mb-6">Contact Section</h2>
      
      <Input label="Superheading" value={data.superheading} onChange={(v) => onChange({ ...data, superheading: v })} />
      <Input label="Heading" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <Input label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} multiline />
      <Input label="Contact Card Title" value={data.contactCardTitle} onChange={(v) => onChange({ ...data, contactCardTitle: v })} />

      <h3 className="text-sm font-medium text-[#95DE64] mb-4 mt-6">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label="Email" 
          value={data.contactInfo.email} 
          onChange={(v) => onChange({ ...data, contactInfo: { ...data.contactInfo, email: v } })} 
        />
        <Input 
          label="Phone" 
          value={data.contactInfo.phone} 
          onChange={(v) => onChange({ ...data, contactInfo: { ...data.contactInfo, phone: v } })} 
        />
        <Input 
          label="Phone 2" 
          value={data.contactInfo.phone2} 
          onChange={(v) => onChange({ ...data, contactInfo: { ...data.contactInfo, phone2: v } })} 
        />
        <Input 
          label="Address" 
          value={data.contactInfo.address} 
          onChange={(v) => onChange({ ...data, contactInfo: { ...data.contactInfo, address: v } })} 
        />
      </div>

      <h3 className="text-sm font-medium text-[#95DE64] mb-4 mt-6">Social Links</h3>
      <div className="space-y-4">
        {data.socialLinks.map((link, index) => (
          <div key={link.id} className="bg-[#1f1f1f] border border-[#333] rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                label="Platform" 
                value={link.alt} 
                onChange={(v) => {
                  const newLinks = [...data.socialLinks];
                  newLinks[index] = { ...link, alt: v };
                  onChange({ ...data, socialLinks: newLinks });
                }} 
              />
              <Input 
                label="Icon Path" 
                value={link.icon} 
                onChange={(v) => {
                  const newLinks = [...data.socialLinks];
                  newLinks[index] = { ...link, icon: v };
                  onChange({ ...data, socialLinks: newLinks });
                }} 
              />
              <Input 
                label="URL" 
                value={link.href} 
                onChange={(v) => {
                  const newLinks = [...data.socialLinks];
                  newLinks[index] = { ...link, href: v };
                  onChange({ ...data, socialLinks: newLinks });
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
