"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiquidBackground from "@/components/LiquidBackground";
import FAQSection from "@/components/FAQSection";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import Image from "next/image";

// Blog data
const blogs = [
  {
    id: 1,
    title: "What is digital marketing and why is important?",
    category: "Category",
    date: "January 20, 2025",
    readTime: "5 minutes",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    extendedExcerpt: "Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?",
    image: "/blog_1.png",
    slug: "what-is-digital-marketing",
  },
  {
    id: 2,
    title: "What is digital marketing and why is important?",
    category: "Category",
    date: "January 20, 2025",
    readTime: "5 minutes",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?",
    image: "/blog_2.png",
    slug: "digital-marketing-importance",
  },
  {
    id: 3,
    title: "What is digital marketing and why is important?",
    category: "Category",
    date: "January 20, 2025",
    readTime: "5 minutes",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?",
    image: "/blog_3.png",
    slug: "marketing-strategies",
  },
  {
    id: 4,
    title: "What is digital marketing and why is important?",
    category: "Category",
    date: "January 20, 2025",
    readTime: "5 minutes",
    excerpt: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo earum id assumenda ad neque recusandae, quasi delenti voluptatum eos vel quas molestias?",
    image: "/blog_4.png",
    slug: "digital-trends",
  },
];

const BlogPage = () => {
  const { theme } = useTheme();
  const isLightMode = theme === "light";

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1, 4);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <LiquidBackground />
      <div className="relative z-10">
      <Navbar />
      
      {/* Page Header Section - Proportional padding based on viewport */}
      <section 
        className="w-full"
        style={{
          paddingTop: 'clamp(24px, 2.08vw, 30px)',
          paddingBottom: 'clamp(40px, 4.17vw, 60px)',
        }}
      >
        <div 
          className="w-full mx-auto"
          style={{
            maxWidth: 'min(1440px, 100vw)',
            paddingLeft: 'clamp(20px, 9.72vw, 140px)',
            paddingRight: 'clamp(20px, 9.72vw, 140px)',
          }}
        >
          <div 
            className="flex flex-col"
            style={{ gap: 'clamp(24px, 2.78vw, 40px)' }}
          >
            {/* Breadcrumb */}
            <div 
              className="flex items-center"
              style={{ gap: 'clamp(6px, 0.56vw, 8px)' }}
            >
              <Link 
                href="/" 
                className={`font-normal hover:text-[#95DE64] transition-colors ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                Home
              </Link>
              <span 
                className={`font-normal ${
                  isLightMode ? 'text-[#595959]' : 'text-[#8C8C8C]'
                }`}
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                /
              </span>
              <span 
                className="font-normal text-[#95DE64]"
                style={{
                  fontSize: 'clamp(12px, 0.97vw, 14px)',
                  lineHeight: 'clamp(18px, 1.53vw, 22px)',
                }}
              >
                Blog
              </span>
            </div>

            {/* Page Title */}
            <h1 
              className={`font-medium ${
                isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
              }`}
              style={{
                fontSize: 'clamp(28px, 2.64vw, 38px)',
                lineHeight: 'clamp(34px, 3.19vw, 46px)',
              }}
            >
              Blog
            </h1>

            {/* Description */}
            <p 
              className={`font-normal ${
                isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
              }`}
              style={{
                maxWidth: 'clamp(800px, 80.56vw, 1160px)',
                fontSize: 'clamp(12px, 0.97vw, 14px)',
                lineHeight: 'clamp(18px, 1.53vw, 22px)',
              }}
            >
              Although, final stages of the internal network gives a complete experience of The Parameter of Speculative Environment
            </p>
          </div>
        </div>
      </section>

      {/* Blog Content Section - Proportional padding */}
      <section 
        className="w-full"
        style={{
          paddingTop: 'clamp(64px, 8.33vw, 120px)',
          paddingBottom: 'clamp(64px, 8.33vw, 120px)',
        }}
      >
        <div 
          className="w-full mx-auto"
          style={{
            maxWidth: 'min(1440px, 100vw)',
            paddingLeft: 'clamp(20px, 9.72vw, 140px)',
            paddingRight: 'clamp(20px, 9.72vw, 140px)',
          }}
        >
          <div 
            className="flex flex-col"
            style={{ gap: 'clamp(20px, 1.67vw, 24px)' }}
          >
            {/* Featured Blog (Most Recent) */}
            <div 
              className={`w-full overflow-hidden flex flex-col lg:flex-row glass-shimmer ${
                isLightMode ? 'glass-card-light' : 'glass-card'
              }`}
              style={{ borderRadius: '20px' }}
            >
              {/* Featured Image - Proportional height */}
              <div 
                className="relative w-full lg:w-[66%] aspect-[764/480] lg:aspect-auto"
                style={{ height: 'auto', minHeight: 'clamp(300px, 33.33vw, 480px)' }}
              >
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Featured Content - Proportional padding and gaps */}
              <div 
                className="w-full lg:w-[34%] flex flex-col"
                style={{
                  padding: 'clamp(16px, 1.67vw, 24px)',
                  gap: 'clamp(12px, 1.11vw, 16px)',
                }}
              >
                {/* Tags Row */}
                <div 
                  className="flex flex-wrap items-center"
                  style={{ gap: 'clamp(6px, 0.56vw, 8px)' }}
                >
                  {/* Category Tag */}
                  <span 
                    className="font-normal text-[#95DE64] bg-[#95DE641A]"
                    style={{
                      padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                      borderRadius: 'clamp(3px, 0.28vw, 4px)',
                      fontSize: 'clamp(10px, 0.83vw, 12px)',
                      lineHeight: 'clamp(16px, 1.39vw, 20px)',
                    }}
                  >
                    {featuredBlog.category}
                  </span>
                  {/* Date Tag */}
                  <span 
                    className={`font-normal ${
                      isLightMode ? 'bg-[#E8E8E8] text-[#595959]' : 'bg-[#1F1F1F] text-[#BFBFBF]'
                    }`}
                    style={{
                      padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                      borderRadius: 'clamp(3px, 0.28vw, 4px)',
                      fontSize: 'clamp(10px, 0.83vw, 12px)',
                      lineHeight: 'clamp(16px, 1.39vw, 20px)',
                    }}
                  >
                    {featuredBlog.date}
                  </span>
                  {/* Read Time Tag */}
                  <span 
                    className={`font-normal ${
                      isLightMode ? 'bg-[#E8E8E8] text-[#595959]' : 'bg-[#1F1F1F] text-[#BFBFBF]'
                    }`}
                    style={{
                      padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                      borderRadius: 'clamp(3px, 0.28vw, 4px)',
                      fontSize: 'clamp(10px, 0.83vw, 12px)',
                      lineHeight: 'clamp(16px, 1.39vw, 20px)',
                    }}
                  >
                    {featuredBlog.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 
                  className={`font-medium ${
                    isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                  }`}
                  style={{
                    fontSize: 'clamp(18px, 1.67vw, 24px)',
                    lineHeight: 'clamp(22px, 1.94vw, 28px)',
                  }}
                >
                  {featuredBlog.title}
                </h2>

                {/* Excerpt */}
                <p 
                  className={`font-normal ${
                    isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                  }`}
                  style={{
                    fontSize: 'clamp(12px, 0.97vw, 14px)',
                    lineHeight: 'clamp(18px, 1.53vw, 22px)',
                  }}
                >
                  {featuredBlog.excerpt}
                </p>

                {/* Extended Excerpt (only for featured) */}
                <p 
                  className={`font-normal ${
                    isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                  }`}
                  style={{
                    fontSize: 'clamp(12px, 0.97vw, 14px)',
                    lineHeight: 'clamp(18px, 1.53vw, 22px)',
                  }}
                >
                  {featuredBlog.extendedExcerpt}
                </p>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center font-normal text-[#BFBFBF] hover:text-[#95DE64] transition-colors mt-auto"
                  style={{
                    gap: 'clamp(6px, 0.56vw, 8px)',
                    fontSize: 'clamp(12px, 0.97vw, 14px)',
                    lineHeight: 'clamp(18px, 1.53vw, 22px)',
                  }}
                >
                  Read more
                  <svg 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      width: 'clamp(16px, 1.39vw, 20px)',
                      height: 'clamp(16px, 1.39vw, 20px)',
                    }}
                  >
                    <path d="M4.16666 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Other Blog Cards Grid - Proportional gaps */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: 'clamp(16px, 1.67vw, 24px)' }}
            >
              {otherBlogs.map((blog) => (
                <div 
                  key={blog.id}
                  className={`overflow-hidden flex flex-col glass-shimmer ${
                    isLightMode ? 'glass-card-light' : 'glass-card'
                  }`}
                  style={{ borderRadius: '20px' }}
                >
                  {/* Blog Image - Proportional aspect ratio maintained */}
                  <div 
                    className="relative w-full"
                    style={{ aspectRatio: '370 / 200' }}
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Blog Content - Proportional padding and gaps */}
                  <div 
                    className="flex flex-col flex-1"
                    style={{
                      padding: 'clamp(14px, 1.39vw, 20px)',
                      gap: 'clamp(10px, 0.83vw, 12px)',
                    }}
                  >
                    {/* Tags Row */}
                    <div 
                      className="flex flex-wrap items-center"
                      style={{ gap: 'clamp(6px, 0.56vw, 8px)' }}
                    >
                      {/* Category Tag */}
                      <span 
                        className="font-normal text-[#95DE64] bg-[#95DE641A]"
                        style={{
                          padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                          borderRadius: 'clamp(3px, 0.28vw, 4px)',
                          fontSize: 'clamp(10px, 0.83vw, 12px)',
                          lineHeight: 'clamp(16px, 1.39vw, 20px)',
                        }}
                      >
                        {blog.category}
                      </span>
                      {/* Date Tag */}
                      <span 
                        className={`font-normal ${
                          isLightMode ? 'bg-[#E8E8E8] text-[#595959]' : 'bg-[#1F1F1F] text-[#BFBFBF]'
                        }`}
                        style={{
                          padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                          borderRadius: 'clamp(3px, 0.28vw, 4px)',
                          fontSize: 'clamp(10px, 0.83vw, 12px)',
                          lineHeight: 'clamp(16px, 1.39vw, 20px)',
                        }}
                      >
                        {blog.date}
                      </span>
                      {/* Read Time Tag */}
                      <span 
                        className={`font-normal ${
                          isLightMode ? 'bg-[#E8E8E8] text-[#595959]' : 'bg-[#1F1F1F] text-[#BFBFBF]'
                        }`}
                        style={{
                          padding: 'clamp(2px, 0.21vw, 3px) clamp(8px, 0.69vw, 10px)',
                          borderRadius: 'clamp(3px, 0.28vw, 4px)',
                          fontSize: 'clamp(10px, 0.83vw, 12px)',
                          lineHeight: 'clamp(16px, 1.39vw, 20px)',
                        }}
                      >
                        {blog.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className={`font-medium ${
                        isLightMode ? 'text-[#141414]' : 'text-[#F0F0F0]'
                      }`}
                      style={{
                        fontSize: 'clamp(16px, 1.39vw, 20px)',
                        lineHeight: 'clamp(22px, 1.94vw, 28px)',
                      }}
                    >
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p 
                      className={`font-normal ${
                        isLightMode ? 'text-[#595959]' : 'text-[#BFBFBF]'
                      }`}
                      style={{
                        fontSize: 'clamp(12px, 0.97vw, 14px)',
                        lineHeight: 'clamp(18px, 1.53vw, 22px)',
                      }}
                    >
                      {blog.excerpt}
                    </p>

                    {/* Read More Link */}
                    <Link 
                      href={`/blog/${blog.slug}`}
                      className="inline-flex items-center font-normal text-[#BFBFBF] hover:text-[#95DE64] transition-colors mt-auto"
                      style={{
                        gap: 'clamp(6px, 0.56vw, 8px)',
                        fontSize: 'clamp(12px, 0.97vw, 14px)',
                        lineHeight: 'clamp(18px, 1.53vw, 22px)',
                      }}
                    >
                      Read more
                      <svg 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        style={{
                          width: 'clamp(16px, 1.39vw, 20px)',
                          height: 'clamp(16px, 1.39vw, 20px)',
                        }}
                      >
                        <path d="M4.16666 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
      </div>
    </main>
  );
};

export default BlogPage;
