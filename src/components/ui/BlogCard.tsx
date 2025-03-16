'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Star } from 'lucide-react';

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    categories: string[];
    tags: string[];
    author: string;
    image: string;
    featured?: boolean;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.div 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-md border border-white/10 shadow-xl"
      whileHover={{ 
        y: -8,
        boxShadow: '0 20px 40px -10px rgba(0, 0, 20, 0.5), 0 0 15px rgba(124, 167, 255, 0.25)',
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Glassmorphism card overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
      
      {/* Glowing borders on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-blue-500/50 via-indigo-500/50 to-purple-500/50 opacity-70 blur-[2px]"></div>
      </div>
      
      {/* Rectangular image area (16:9 aspect ratio) */}
      <div className="relative pt-[56.25%]">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent"></div>
          
          {/* Floating stars */}
          {post.featured && (
            <div className="absolute top-0 right-0 p-4 z-20">
              <div className="relative">
                <Star size={20} className="text-yellow-300 animate-pulse fill-yellow-300" />
                <div className="absolute inset-0 blur-sm animate-pulse bg-yellow-300/30 rounded-full"></div>
              </div>
            </div>
          )}
          
          {/* Category pills */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
            {post.categories.map(category => (
              <div key={category} className="relative">
                <span 
                  className="bg-indigo-700/70 text-indigo-100 text-xs font-medium py-1 px-2.5 rounded-full backdrop-blur-sm border border-indigo-500/30 shadow-lg inline-block z-10"
                >
                  {category}
                </span>
                <div className="absolute inset-0 blur-sm bg-indigo-400/20 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Content area with glass effect */}
      <div className="p-6 relative z-20 bg-blue-950/30 backdrop-blur-md border-t border-white/5">
        <h3 className="font-bold text-xl text-white tracking-tight mb-3 group-hover:text-blue-200 transition-colors duration-300">{post.title}</h3>
        
        <div className="flex items-center gap-4 text-xs text-blue-300 mb-4">
          <span className="flex items-center">
            <Calendar size={12} className="mr-1.5 opacity-70" /> {post.date}
          </span>
          <span className="flex items-center">
            <Clock size={12} className="mr-1.5 opacity-70" /> {post.readTime}
          </span>
        </div>
        
        <p className="text-blue-200/80 text-sm mb-5 line-clamp-2">{post.excerpt}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5 mb-1">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs text-blue-300/70 bg-blue-800/30 px-2 py-0.5 rounded-full backdrop-blur-sm border border-blue-700/30">
                #{tag}
              </span>
            ))}
          </div>
          
          <Link 
            href={`/blog/${post.id}`} 
            className="inline-flex items-center text-sm font-medium relative overflow-hidden group/btn"
          >
            <span className="relative z-10 flex items-center bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent group-hover/btn:from-blue-300 group-hover/btn:to-indigo-200 transition-all duration-300">
              Read <BookOpen size={14} className="ml-1.5" />
            </span>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-400/80 to-indigo-400/80 transform origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300"></span>
          </Link>
        </div>
      </div>
      
      {/* Luxury sparkle effects */}
      <div className="absolute inset-0 pointer-events-none z-20">
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute rounded-full bg-white"
            initial={{ 
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              repeatDelay: Math.random() * 7 + 3,
              ease: "easeInOut"
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              boxShadow: '0 0 8px 2px rgba(255, 255, 255, 0.8)',
              filter: 'blur(0.5px)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
} 