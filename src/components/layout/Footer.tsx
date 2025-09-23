'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// Social Media Icons Components
const InstagramIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YouTubeIcon = ({ size = 20, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function Footer() {
  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Books', href: '/books' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-primary text-white pt-8 pb-4 relative overflow-hidden">
      {/* Magical starry background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: '120vw', left: '-10vw' }}>
        {/* Small twinkling stars */}
        {[...Array(60)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 120}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: '#fff',
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
        {/* Medium stars with glow */}
        {[...Array(25)].map((_, i) => (
          <div 
            key={i + 100}
            className="absolute rounded-full glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 120}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              backgroundColor: i % 3 === 0 ? '#F9D56E' : i % 3 === 1 ? '#fff' : '#B4E4FF',
              boxShadow: `0 0 ${Math.random() * 4 + 2}px ${i % 3 === 0 ? '#F9D56E' : i % 3 === 1 ? '#fff' : '#B4E4FF'}`,
              opacity: Math.random() * 0.5 + 0.5,
              animation: `twinkle ${Math.random() * 5 + 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
        {/* Larger, brighter stars */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i + 200}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 120}%`,
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%)',
              boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              opacity: Math.random() * 0.4 + 0.6,
              animation: `pulse ${Math.random() * 6 + 4}s ease-in-out infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        
        {/* Magical book illustration */}
        <div className="absolute top-10 left-10 w-24 h-24 opacity-10 pointer-events-none">
          <Image
            src="/images/illustrations/book.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        
        {/* Magical hat illustration */}
        <div className="absolute bottom-10 right-10 w-24 h-24 opacity-10 pointer-events-none">
          <Image
            src="/images/illustrations/hat-color.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="container-custom relative z-10 max-w-5xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="space-y-2 flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block group">
              <motion.h3 
                className="text-2xl md:text-3xl font-display text-secondary relative"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <span className="relative inline-block group-hover:text-shadow-magical transition-all duration-300">
                  G.B. Sollie
                  <span className="absolute -top-3 -right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Sparkles size={16} className="text-secondary-light" />
                  </span>
                </span>
              </motion.h3>
            </Link>
            <p className="text-gray-300 max-w-xs text-center md:text-left text-sm">
              Children&apos;s fantasy author bringing magical adventures to young readers, where imagination knows no bounds.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="space-y-2 flex flex-col items-center md:items-end">
            <h4 className="text-lg font-bold mb-1 text-secondary-light flex items-center">
              <Sparkles size={16} className="mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-1 text-center md:text-right">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Link href={link.href} className="hover:text-secondary transition-colors hover:text-shadow-sm text-sm">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Social Media Links */}
        <motion.div 
          variants={itemVariants}
          className="flex justify-center items-center space-x-4 mb-6"
        >
          <motion.a
            href="https://www.instagram.com/gbsollie_author/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Follow G.B. Sollie on Instagram"
          >
            <InstagramIcon size={20} className="text-white group-hover:text-primary transition-colors" />
          </motion.a>
          
          <motion.a
            href="https://www.facebook.com/share/19W3a68Nfv/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Follow G.B. Sollie on Facebook"
          >
            <FacebookIcon size={20} className="text-white group-hover:text-primary transition-colors" />
          </motion.a>
          
          <motion.a
            href="https://www.youtube.com/@gbsollie"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-secondary hover:border-secondary transition-all duration-300"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Subscribe to G.B. Sollie on YouTube"
          >
            <YouTubeIcon size={20} className="text-white group-hover:text-primary transition-colors" />
          </motion.a>
        </motion.div>

        {/* Copyright and Legal Links */}
        <div className="pt-4 mt-4 border-t border-gray-700/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs text-gray-300">
                © 2025 G.B. Sollie. All rights reserved.
              </p>
              <p className="text-xs text-gray-300">
                Website made with <span className="text-red-500 mx-0.5">❤</span> by <a href="https://yeshaya.dev" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary-light transition-colors hover:underline">yeshaya.dev</a>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/privacy-policy" className="text-xs text-white hover:text-secondary-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-xs text-white hover:text-secondary-light transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-xs text-white hover:text-secondary-light transition-colors">
                Accessibility
              </Link>
              <Link href="/cookie-policy" className="text-xs text-white hover:text-secondary-light transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS styles */}
      <style jsx global>{`
        /* Shimmer effect for primary button */
        @keyframes shimmer {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: -200% 0%;
          }
        }
        
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        
        /* Twinkle animation for stars */
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Pulse animation for bright stars */
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(0.9);
            box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
            box-shadow: 0 0 20px 2px rgba(255, 255, 255, 0.7);
          }
        }
        
        /* Additional text shadow for heading */
        .text-shadow-magical {
          text-shadow: 0 2px 10px rgba(249, 213, 110, 0.5);
        }
        
        .text-shadow-sm {
          text-shadow: 0 1px 3px rgba(249, 213, 110, 0.3);
        }
        
        /* Glow effect for hover */
        .hover-shadow-glow:hover {
          box-shadow: 0 0 15px rgba(249, 213, 110, 0.5);
        }
      `}</style>
    </footer>
  );
} 