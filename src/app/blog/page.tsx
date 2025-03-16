'use client';

import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen } from 'lucide-react';

export default function BlogPage() {
  // Sample blog posts with more blog-like metadata
  const blogPosts = [
    {
      id: 1,
      title: "Cat Luker Series: Book One - The Dark Clock Illustrated Edition Available Now!",
      excerpt: "The first book in the exciting Cat Luker series has arrived! This beautifully illustrated edition of The Dark Clock follows Cat and friends on a thrilling time-travel adventure to French-speaking Alabama, blending historical fantasy with faith-based storytelling. Complete with a unique Bible study guide!",
      date: "April 15, 2023",
      readTime: "5 min read",
      categories: ["books", "new release"],
      tags: ["cat luker", "illustrated", "dark clock"],
      author: "G.B. Sollie",
      image: "/images/Catlukercover.png",
      featured: true
    },
    {
      id: 2,
      title: "Behind the Pages: Creating the World of Cat Luker",
      excerpt: "Join me on a journey through the creative process of building the magical world of Cat Luker. Learn about the inspirations, research, and faith-filled moments that shaped this beloved series.",
      date: "March 28, 2023",
      readTime: "8 min read",
      categories: ["writing process", "behind the scenes"],
      tags: ["worldbuilding", "inspiration", "creative process"],
      author: "G.B. Sollie",
      image: "/images/gregwkids.jpg"
    },
    {
      id: 3,
      title: "A Journey to the Light Audiobook Released",
      excerpt: "Experience the magical journey in a whole new way with the professionally narrated audiobook, now available on all major platforms. In this post, I share the exciting process of bringing the story to life through audio.",
      date: "February 12, 2023",
      readTime: "6 min read",
      categories: ["media", "new release"],
      tags: ["audiobook", "journey to the light", "narration"],
      author: "G.B. Sollie",
      image: "/images/audiocover.png"
    },
    {
      id: 4,
      title: "Faith and Fantasy: Finding Balance in Children's Literature",
      excerpt: "How do we balance magical worlds with meaningful faith messages? In this reflection, I explore the delicate art of weaving Christian themes into fantasy stories that captivate young readers while nurturing their spiritual growth.",
      date: "January 30, 2023",
      readTime: "10 min read",
      categories: ["faith", "writing craft"],
      tags: ["christian fiction", "fantasy", "spirituality"],
      author: "G.B. Sollie",
      image: "/images/alabama.jpg"
    },
    {
      id: 5,
      title: "Reader Spotlight: Letters from Young Adventurers",
      excerpt: "Nothing brings me more joy than hearing from my young readers! In this heartwarming collection, I share some of the wonderful letters and artwork I've received from children touched by my stories.",
      date: "December 15, 2022",
      readTime: "7 min read",
      categories: ["reader stories", "community"],
      tags: ["fan mail", "young readers", "artwork"],
      author: "G.B. Sollie",
      image: "/images/faith.jpg"
    },
    {
      id: 6,
      title: "From Page to Screen: The Cat Luker Adventure Continues",
      excerpt: "Exciting news! The Cat Luker series has been optioned for a film adaptation. Join me behind the scenes as we begin this thrilling new chapter in Cat's journey from page to screen.",
      date: "November 2, 2022",
      readTime: "9 min read",
      categories: ["media", "announcements"],
      tags: ["film adaptation", "movie news", "cat luker"],
      author: "G.B. Sollie",
      image: "/images/moviecoverart.png"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      {/* Minimal Elegant Hero Section */}
      <div className="relative z-10 pt-28 pb-20 px-4 md:px-0">
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-display text-center text-white mb-4 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="block text-[#FFD700]">The Author&apos;s Journal</span>
          </motion.h1>
        </div>
      </div>

      {/* Blog post grid - Redesigned */}
      <Section className="pb-24 z-10 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <motion.div 
                key={post.id}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform-gpu will-change-transform"
                initial={{ y: 0 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.5
                }}
              >
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={300}
                    className="w-full h-52 object-cover"
                    priority={post.id <= 3}
                  />
                  <div className="absolute top-3 right-3">
                    <div className="flex flex-wrap gap-2">
                      {post.categories.slice(0, 2).map(category => (
                        <span 
                          key={category} 
                          className="bg-[#FFD700] text-[#0A1128] text-xs font-medium py-1 px-3 rounded-md shadow-md"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl text-[#0A1128] mb-3 line-clamp-2">{post.title}</h3>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar size={12} className="mr-1" /> {post.date}
                    </span>
                    <span className="flex items-center">
                      <Clock size={12} className="mr-1" /> {post.readTime}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 1 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-flex items-center text-sm font-medium text-[#0A1128] hover:text-[#FFD700] transition-colors mt-auto group"
                    >
                      <BookOpen size={16} className="mr-2 transition-transform group-hover:scale-110" /> 
                      <span>Read post</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Newsletter signup - Simplified */}
      <Section className="bg-transparent py-16 z-10 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="backdrop-blur-md bg-white/5 rounded-xl p-8 border border-white/10 shadow-xl"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
            <div className="w-16 h-1 bg-[#FFD700] mx-auto rounded-full mb-6 shadow-[0_0_8px_rgba(255,215,0,0.6)]"></div>
            
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-[#FFD700] focus:border-[#FFD700] text-white placeholder-white/60"
              />
              <button className="bg-[#FFD700] hover:bg-white text-[#0A1128] px-6 py-3 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </Section>
    </>
  );
} 