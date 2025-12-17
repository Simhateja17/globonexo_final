// CMS Content Types for Firestore

// ============================================
// HERO SECTION
// ============================================
export interface HeroContent {
  headingLine1: string;        // "International"
  headingLine1Highlight: string; // "IT & Expert Hub"
  headingLine2: string;        // "For Your"
  headingLine2Highlight: string; // "Universal Success"
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  trustLabel: string;
  trustedCompanies: string[];
}

// ============================================
// SERVICES SECTION
// ============================================
export interface ServiceCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  isGreenTitle: boolean;
  learnMoreLink: string;
  order: number;
}

export interface ServicesContent {
  superheading: string;
  heading: string;
  description: string;
  cards: ServiceCard[];
}

// ============================================
// ABOUT SECTION
// ============================================
export interface StatCard {
  id: string;
  value: string;
  label: string;
  order: number;
}

export interface AboutContent {
  superheading: string;
  heading: string;
  paragraphs: string[];
  buttonText: string;
  buttonLink: string;
  stats: StatCard[];
}

// ============================================
// WHY CHOOSE US SECTION
// ============================================
export interface WhyChooseCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface WhyChooseUsContent {
  superheading: string;
  heading: string;
  description: string;
  cards: WhyChooseCard[];
}

// ============================================
// TESTIMONIALS SECTION
// ============================================
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  order: number;
}

export interface TestimonialsContent {
  superheading: string;
  heading: string;
  description: string;
  testimonials: Testimonial[];
}

// ============================================
// FAQ SECTION
// ============================================
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  column: 'left' | 'right';
  order: number;
}

export interface FAQContent {
  superheading: string;
  heading: string;
  description: string;
  items: FAQItem[];
}

// ============================================
// CONTACT SECTION
// ============================================
export interface SocialLink {
  id: string;
  icon: string;
  alt: string;
  href: string;
  order: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  phone2: string;
  address: string;
}

export interface ContactContent {
  superheading: string;
  heading: string;
  description: string;
  contactCardTitle: string;
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
}

// ============================================
// ALL HOMEPAGE CONTENT
// ============================================
export interface HomepageContent {
  hero: HeroContent;
  services: ServicesContent;
  about: AboutContent;
  whyChooseUs: WhyChooseUsContent;
  testimonials: TestimonialsContent;
  faq: FAQContent;
  contact: ContactContent;
}

// ============================================
// ABOUT PAGE CONTENT
// ============================================
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  linkedinUrl: string;
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  order: number;
}

export interface AboutPageContent {
  // Page Header
  pageTitle: string;
  pageDescription: string;
  
  // About Section
  aboutSuperheading: string;
  aboutHeading: string;
  aboutDescription: string;
  aboutButtonText: string;
  aboutButtonLink: string;
  aboutImage: string;
  aboutImageLight: string;
  
  // Our Story Section
  storySuperheading: string;
  storyHeading: string;
  storyParagraphs: string[];
  
  // Leadership Team Section
  teamSuperheading: string;
  teamHeading: string;
  teamDescription: string;
  teamMembers: TeamMember[];
}

// ============================================
// BLOG PAGE CONTENT
// ============================================
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  extendedExcerpt?: string;
  image: string;
  slug: string;
  content?: string;
  order: number;
}

export interface BlogPageContent {
  pageTitle: string;
  pageDescription: string;
  posts: BlogPost[];
}

// ============================================
// SERVICES PAGE CONTENT
// ============================================
export interface ServiceBlock {
  id: string;
  superheading: string;
  title: string;
  paragraphs: string[];
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  isReversed: boolean;
  order: number;
}

export interface ServicesPageContent {
  pageTitle: string;
  pageBreadcrumb: string;
  pageDescription: string;
  blocks: ServiceBlock[];
}

// ============================================
// GLOBAL PRESENCE PAGE CONTENT
// ============================================
export interface LocationDesignation {
  type: string;
  color: string;
}

export interface GlobalLocation {
  id: string;
  name: string;
  designations: LocationDesignation[];
  x: number;
  y: number;
}

export interface GlobalPresencePageContent {
  pageTitle: string;
  pageDescription: string;
  locations: GlobalLocation[];
}

// ============================================
// JOIN PAGE CONTENT
// ============================================
export interface JoinPageContent {
  pageTitle: string;
  pageDescription: string;
  formTitle: string;
  formDescription: string;
  successTitle: string;
  successMessage: string;
  successButtonText: string;
  successButtonLink: string;
}

// ============================================
// ALL SITE CONTENT
// ============================================
export interface AllPagesContent {
  homepage: HomepageContent;
  aboutPage: AboutPageContent;
  blogPage: BlogPageContent;
  servicesPage: ServicesPageContent;
  globalPresencePage: GlobalPresencePageContent;
  joinPage: JoinPageContent;
}

// ============================================
// DEFAULT CONTENT (fallback when Firestore is empty)
// ============================================
export const defaultHeroContent: HeroContent = {
  headingLine1: "International",
  headingLine1Highlight: "IT & Expert Hub",
  headingLine2: "For Your",
  headingLine2Highlight: "Universal Success",
  description: "Globonexo is an international IT consulting company committed to helping European businesses grow faster and stronger. Our team of industry experts drives innovation and delivers IT solutions as a trusted strategic partner.",
  primaryButtonText: "Enquire Now",
  primaryButtonLink: "/contact",
  secondaryButtonText: "Schedule a Consultation",
  secondaryButtonLink: "/contact",
  trustLabel: "Trusted by businesses of all sizes worldwide",
  trustedCompanies: ["Microsoft", "Google", "Amazon", "SAP", "Siemens", "BMW", "Bosch", "Deutsche Bank"]
};

export const defaultServicesContent: ServicesContent = {
  superheading: "our services",
  heading: "What we're offering",
  description: "At Globonexo, we empower European enterprises with strategic IT solutions that foster innovation, efficiency, and trust. Our experienced consultants work hand-in-hand with clients to accelerate their growth and strengthen their competitive edge.",
  cards: [
    {
      id: "1",
      icon: "🐞",
      title: "Software Testing Services",
      description: "Ensure flawless performance with our end-to-end software testing solutions. From manual to automated testing, we help you deliver reliable, high-quality software with confidence.",
      isGreenTitle: true,
      learnMoreLink: "#",
      order: 1
    },
    {
      id: "2",
      icon: "🚀",
      title: "IT Solutions for Startups",
      description: "Accelerate your startup's growth with our customized IT services — from MVP development to scaling your tech infrastructure. We turn ideas into impactful digital products.",
      isGreenTitle: false,
      learnMoreLink: "#",
      order: 2
    },
    {
      id: "3",
      icon: "📈",
      title: "Flexibility and Scalability",
      description: "Scale your team effortlessly with our flexible engagement models. We help you adapt to changing project requirements while ensuring optimal efficiency and cost-effectiveness.",
      isGreenTitle: false,
      learnMoreLink: "#",
      order: 3
    },
    {
      id: "4",
      icon: "🤝",
      title: "Cultural and Technical Alignment",
      description: "We bridge global talent with your local business needs, ensuring seamless collaboration, smooth communication, and technically aligned delivery across borders.",
      isGreenTitle: false,
      learnMoreLink: "#",
      order: 4
    },
    {
      id: "5",
      icon: "🧑‍💻",
      title: "Outstaffing Solutions",
      description: "Access top-tier IT talent through our comprehensive outstaffing services. Build and scale your development team efficiently with skilled professionals who fit your culture and goals.",
      isGreenTitle: false,
      learnMoreLink: "#",
      order: 5
    }
  ]
};

export const defaultAboutContent: AboutContent = {
  superheading: "about us",
  heading: "The Best IT Solution Since 2015",
  paragraphs: [
    "At Globonexo, we implement innovative IT solutions focused on the evolution, adaptation, and growth of your business.",
    "Our emphasis on quality, efficiency, and long-term partnerships ensures that every project delivers tangible results and lasting success."
  ],
  buttonText: "Join now",
  buttonLink: "/join",
  stats: [
    { id: "1", value: "9", label: "countries", order: 1 },
    { id: "2", value: "3", label: "continents", order: 2 },
    { id: "3", value: "320", label: "IT talents in our pool", order: 3 },
    { id: "4", value: "15", label: "industries", order: 4 }
  ]
};

export const defaultWhyChooseUsContent: WhyChooseUsContent = {
  superheading: "why choose us",
  heading: "Why Our Clients Choose Globonexo",
  description: "We enable seamless collaboration by deploying cutting-edge technologies and refined IT solutions, helping businesses strengthen their competitive edge in today's market. With a firm commitment to quality, innovation, and customer satisfaction, we help our clients achieve their goals faster, smarter, and more efficiently.",
  cards: [
    {
      id: "1",
      icon: "💼",
      title: "Built on Competence",
      description: "With deep technical knowledge and extensive experience from our founders and team members, we deliver results that align perfectly with your goals.",
      order: 1
    },
    {
      id: "2",
      icon: "🌍",
      title: "Global Talent Pool",
      description: "Gain access to a vast pool of high-class IT specialists from India and Eastern Europe — skilled professionals ready to bring your ideas to life.",
      order: 2
    },
    {
      id: "3",
      icon: "⚖️",
      title: "Cost Efficiency",
      description: "Optimize your IT operations, reduce costs, and never compromise on quality or timely delivery.",
      order: 3
    },
    {
      id: "4",
      icon: "📈",
      title: "Flexibility and Scalability",
      description: "Elastically scale your team according to project needs while maintaining agility and control.",
      order: 4
    },
    {
      id: "5",
      icon: "🧑‍💻",
      title: "Cultural and Technical Alignment",
      description: "We bridge global talent with local business needs, ensuring seamless communication, collaboration, and execution across projects.",
      order: 5
    }
  ]
};

export const defaultTestimonialsContent: TestimonialsContent = {
  superheading: "testimonials",
  heading: "Customers Testimonials",
  description: "Hear What Our Customers Say About Partnering with Globonexo!",
  testimonials: [
    {
      id: "1",
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi?»",
      name: "Satya Nadella",
      title: "Chief Executive Officer, Microsoft",
      order: 1
    },
    {
      id: "2",
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi?»",
      name: "Andy Jassy",
      title: "Chief Executive Officer, Amazon",
      order: 2
    },
    {
      id: "3",
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi?»",
      name: "Sundar Pichai",
      title: "Chief Executive Officer, Alphabet (Google)",
      order: 3
    },
    {
      id: "4",
      quote: "«Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, labore dolore laborum dolorum culpa ducimus ipsam quo, veniam animi pariatur facilis tempora incidunt nostrum quisquam, cum quasi laudantium? Voluptates, sequi?»",
      name: "Tim Cook",
      title: "Chief Executive Officer, Apple",
      order: 4
    }
  ]
};

export const defaultFAQContent: FAQContent = {
  superheading: "faq",
  heading: "Frequently Asked Questions",
  description: "Got Questions? We've Got Answers to Help You Understand Globonexo Better!",
  items: [
    {
      id: "1",
      question: "Can we choose and interview developers ourselves?",
      answer: "Yes, you have full control over the selection process. We provide you with pre-vetted candidates, and you can interview them to ensure they meet your specific requirements before making a decision.",
      column: "left",
      order: 1
    },
    {
      id: "2",
      question: "How do you ensure developer quality and productivity?",
      answer: "We have a rigorous vetting process that includes technical assessments, code reviews, and soft skills evaluation. We also provide ongoing performance monitoring and regular check-ins to ensure consistent quality.",
      column: "left",
      order: 2
    },
    {
      id: "3",
      question: "What is IT & AI outstaffing and how does it differ from outsourcing?",
      answer: "IT & AI outstaffing means you hire dedicated developers who work exclusively for you while we handle HR and administrative tasks. Unlike outsourcing, you maintain direct control over the team and their work.",
      column: "left",
      order: 3
    },
    {
      id: "4",
      question: "How do you select the developers we will work with?",
      answer: "We match developers based on your technical requirements, project needs, and cultural fit. Our talent pool includes pre-vetted professionals with diverse skills and experience levels.",
      column: "left",
      order: 4
    },
    {
      id: "5",
      question: "What tech stacks do your developers use?",
      answer: "Our developers are proficient in a wide range of technologies including React, Angular, Vue.js, Node.js, Python, Java, .NET, AWS, Azure, and many more. We can match expertise to your specific stack.",
      column: "right",
      order: 1
    },
    {
      id: "6",
      question: "How is outstaffing priced?",
      answer: "Our pricing is transparent and competitive. You pay a monthly rate per developer that covers their salary, benefits, workspace, and our management fee. No hidden costs or surprises.",
      column: "right",
      order: 2
    },
    {
      id: "7",
      question: "How does your pricing compare to other outstaffing providers?",
      answer: "We offer competitive rates while maintaining high quality. Our pricing reflects the value of our rigorous vetting process, ongoing support, and access to top-tier talent from India and Eastern Europe.",
      column: "right",
      order: 3
    },
    {
      id: "8",
      question: "Do you offer a trial period?",
      answer: "Yes, we offer flexible trial periods so you can evaluate our developers before committing to a long-term engagement. This ensures you find the perfect fit for your team.",
      column: "right",
      order: 4
    }
  ]
};

export const defaultContactContent: ContactContent = {
  superheading: "contact",
  heading: "Contact us for Any Questions",
  description: "Let's Connect and Find the Right Solutions for You!",
  contactCardTitle: "Contact Info",
  contactInfo: {
    email: "contact.global@globonexo.com",
    phone: "+49 711 123456",
    phone2: "+49 711 123456",
    address: "Headquarters: Koenigstr. 10c, 70173 Stuttgart, Germany"
  },
  socialLinks: [
    { id: "1", icon: "/instagram.png", alt: "Instagram", href: "#", order: 1 },
    { id: "2", icon: "/twitter.png", alt: "Twitter", href: "#", order: 2 },
    { id: "3", icon: "/facebook.png", alt: "Facebook", href: "#", order: 3 },
    { id: "4", icon: "/youtube.png", alt: "YouTube", href: "#", order: 4 }
  ]
};

export const defaultHomepageContent: HomepageContent = {
  hero: defaultHeroContent,
  services: defaultServicesContent,
  about: defaultAboutContent,
  whyChooseUs: defaultWhyChooseUsContent,
  testimonials: defaultTestimonialsContent,
  faq: defaultFAQContent,
  contact: defaultContactContent
};

// ============================================
// DEFAULT ABOUT PAGE CONTENT
// ============================================
export const defaultAboutPageContent: AboutPageContent = {
  pageTitle: "About us",
  pageDescription: "Learn more about Globonexo and our journey to becoming a trusted IT partner.",
  
  aboutSuperheading: "about us",
  aboutHeading: "The best IT solution since 2015",
  aboutDescription: "At Globonexo, we implement innovative IT solutions focused on the evolution, adaptation, and growth of your business. Our emphasis on quality, efficiency, and long-term partnerships ensures that every project delivers tangible results and lasting success.",
  aboutButtonText: "Join now",
  aboutButtonLink: "/join",
  aboutImage: "/about_us.png",
  aboutImageLight: "/about_us_light_mode.png",
  
  storySuperheading: "our story",
  storyHeading: "The journey and background of the company",
  storyParagraphs: [
    "Globonexo was born out of a shared vision between two passionate entrepreneurs in Warsaw, Poland. After countless discussions, deep research, and leveraging our international experience and expertise, we recognised a growing need – businesses across Europe and the U.S. required skilled IT talent to drive innovation, but access to top developers was often limited by local availability and high costs.",
    "This insight prompted us to start Globonexo: a company that unites businesses with global IT talent through strategic outstaffing solutions. From its very beginning, our goal was to bridge the gap between companies and talented engineers with the help of the development services from our Indian, Polish, Ukrainian, and Moldovan centres with high-quality service providers.",
    "Starting as an idea over brainstorming sessions in Warsaw, the company has grown into a firm serving clients from various industries such as automotive, fintech, healthcare, and manufacturing.",
    "Our story at Globonexo is that of collaboration, growth, and global connectivity. We believe that innovation knows no borders, and by empowering companies with the right talent, we help them unlock new possibilities and scale to greater heights.",
    "This is just the beginning – and we're excited to grow alongside our clients, partners, and dedicated team of developers worldwide."
  ],
  
  teamSuperheading: "leadership team",
  teamHeading: "Bios and photos of key executives and managers",
  teamDescription: "Meet the talented individuals who drive our company forward with their expertise and dedication.",
  teamMembers: [
    {
      id: "1",
      name: "Bodih Dgmas",
      role: "front-end developer",
      photo: "/team_member_1.png",
      linkedinUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      instagramUrl: "#",
      order: 1
    },
    {
      id: "2",
      name: "Ahmad Errami",
      role: "back-end developer",
      photo: "/team_member_2.png",
      linkedinUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      instagramUrl: "#",
      order: 2
    },
    {
      id: "3",
      name: "John Smith",
      role: "web designer",
      photo: "/team_member_3.png",
      linkedinUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      instagramUrl: "#",
      order: 3
    },
    {
      id: "4",
      name: "Satoshi Nakamoto",
      role: "CEO founder",
      photo: "/team_member_4.png",
      linkedinUrl: "#",
      facebookUrl: "#",
      twitterUrl: "#",
      instagramUrl: "#",
      order: 4
    }
  ]
};

// ============================================
// DEFAULT BLOG PAGE CONTENT
// ============================================
export const defaultBlogPageContent: BlogPageContent = {
  pageTitle: "Blog",
  pageDescription: "Stay updated with the latest insights, trends, and news from the IT industry.",
  posts: [
    {
      id: "1",
      title: "What is digital marketing and why is important?",
      category: "Marketing",
      date: "January 20, 2025",
      readTime: "5 minutes",
      excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?",
      extendedExcerpt: "Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias? Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
      image: "/blog_1.png",
      slug: "what-is-digital-marketing",
      order: 1
    },
    {
      id: "2",
      title: "The future of AI in software development",
      category: "Technology",
      date: "January 15, 2025",
      readTime: "7 minutes",
      excerpt: "Discover how artificial intelligence is revolutionizing the way we build and maintain software applications.",
      image: "/blog_2.png",
      slug: "future-of-ai-software-development",
      order: 2
    },
    {
      id: "3",
      title: "Best practices for remote team management",
      category: "Management",
      date: "January 10, 2025",
      readTime: "6 minutes",
      excerpt: "Learn effective strategies for managing distributed teams across different time zones and cultures.",
      image: "/blog_3.png",
      slug: "remote-team-management",
      order: 3
    },
    {
      id: "4",
      title: "Scaling your startup with the right IT infrastructure",
      category: "Startups",
      date: "January 5, 2025",
      readTime: "8 minutes",
      excerpt: "Essential tips for building a robust and scalable IT infrastructure that grows with your business.",
      image: "/blog_4.png",
      slug: "scaling-startup-it-infrastructure",
      order: 4
    }
  ]
};

// ============================================
// DEFAULT SERVICES PAGE CONTENT
// ============================================
export const defaultServicesPageContent: ServicesPageContent = {
  pageTitle: "Software Testing",
  pageBreadcrumb: "Software Testing",
  pageDescription: "Ensure flawless performance with our comprehensive software testing solutions.",
  blocks: [
    {
      id: "1",
      superheading: "quality assurance",
      title: "End-to-End Software Testing Solutions",
      paragraphs: [
        "Our comprehensive testing services cover every aspect of your software development lifecycle. From unit testing to integration testing, we ensure your applications perform flawlessly under all conditions.",
        "We employ industry-leading methodologies and tools to identify and eliminate bugs before they reach your users, saving you time and resources while maintaining the highest quality standards."
      ],
      ctaText: "GET STARTED",
      ctaLink: "/contact",
      imageSrc: "",
      imageAlt: "Software Testing",
      isReversed: false,
      order: 1
    },
    {
      id: "2",
      superheading: "automation",
      title: "Automated Testing for Continuous Delivery",
      paragraphs: [
        "Accelerate your release cycles with our automated testing solutions. We build robust test suites that integrate seamlessly with your CI/CD pipeline, enabling faster and more reliable deployments.",
        "Our automation experts work with leading frameworks like Selenium, Cypress, and Playwright to create maintainable and scalable test automation that grows with your application."
      ],
      ctaText: "LEARN MORE",
      ctaLink: "/contact",
      imageSrc: "",
      imageAlt: "Automated Testing",
      isReversed: true,
      order: 2
    }
  ]
};

// ============================================
// DEFAULT GLOBAL PRESENCE PAGE CONTENT
// ============================================
export const defaultGlobalPresencePageContent: GlobalPresencePageContent = {
  pageTitle: "Global Presence",
  pageDescription: "Explore our international footprint across Europe, India, and North America.",
  locations: [
    { id: "usa", name: "USA – Boston", designations: [{ type: "Sales & Representation office", color: "#FAAD14" }], x: 4.8, y: 44 },
    { id: "uk", name: "United Kingdom – London", designations: [{ type: "Sales & Representation office", color: "#FAAD14" }], x: 40.3, y: 31.2 },
    { id: "germany", name: "Germany – Stuttgart", designations: [{ type: "Sales & Representation office", color: "#FAAD14" }, { type: "Headquarters", color: "#FF4D4F" }], x: 45, y: 35 },
    { id: "lithuania", name: "Lithuania – Vilnius", designations: [{ type: "Development center", color: "#95DE64" }], x: 52.5, y: 26 },
    { id: "latvia", name: "Latvia – Riga", designations: [{ type: "Development center", color: "#95DE64" }], x: 53.8, y: 23 },
    { id: "poland", name: "Poland – Warsaw", designations: [{ type: "Development center", color: "#95DE64" }], x: 51, y: 30 },
    { id: "czechia", name: "Czech Republic – Prague", designations: [{ type: "Development center", color: "#95DE64" }], x: 48, y: 34.3 },
    { id: "ukraine", name: "Ukraine – Kyiv", designations: [{ type: "Development center", color: "#95DE64" }], x: 56, y: 34 },
    { id: "moldova", name: "Moldova – Chisinau", designations: [{ type: "Development center", color: "#95DE64" }], x: 55, y: 37.3 },
    { id: "india", name: "India – Delhi", designations: [{ type: "Development center", color: "#95DE64" }], x: 79.5, y: 60 },
    { id: "vietnam", name: "Vietnam – Hanoi", designations: [{ type: "Development center", color: "#95DE64" }], x: 95.3, y: 76 }
  ]
};

// ============================================
// DEFAULT JOIN PAGE CONTENT
// ============================================
export const defaultJoinPageContent: JoinPageContent = {
  pageTitle: "Join us",
  pageDescription: "Become part of our global team of IT professionals and work on exciting projects.",
  formTitle: "Application Form",
  formDescription: "Fill out the form below to apply for a position at Globonexo.",
  successTitle: "Application Sent Successfully!",
  successMessage: "Thank you for your interest in joining Globonexo. We will review your application and get back to you soon.",
  successButtonText: "Back to home",
  successButtonLink: "/"
};

// ============================================
// DEFAULT ALL PAGES CONTENT
// ============================================
export const defaultAllPagesContent: AllPagesContent = {
  homepage: defaultHomepageContent,
  aboutPage: defaultAboutPageContent,
  blogPage: defaultBlogPageContent,
  servicesPage: defaultServicesPageContent,
  globalPresencePage: defaultGlobalPresencePageContent,
  joinPage: defaultJoinPageContent
};