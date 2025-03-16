'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Mail size={20} />, href: 'mailto:contact@gbsollie.com', label: 'Email' },
  ];

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
    <footer className="bg-primary text-white pt-12 pb-6 relative overflow-hidden">
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
        <div className="absolute top-10 left-10 w-32 h-32 opacity-10 pointer-events-none">
          <Image
            src="/images/illustrations/book.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
        
        {/* Magical hat illustration */}
        <div className="absolute bottom-10 right-10 w-36 h-36 opacity-10 pointer-events-none">
          <Image
            src="/images/illustrations/hat-color.png"
            alt=""
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="inline-block group">
              <motion.h3 
                className="text-3xl font-display text-secondary relative"
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
            <p className="text-gray-300 max-w-sm">
              Children&apos;s fantasy author bringing magical adventures to young readers, where imagination knows no bounds.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold mb-4 text-secondary-light flex items-center">
              <Sparkles size={18} className="mr-2" />
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Link href={link.href} className="hover:text-secondary transition-colors hover:text-shadow-sm">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold mb-4 text-secondary-light flex items-center">
              <Sparkles size={18} className="mr-2" />
              Join the Adventure
            </h4>
            <p className="text-gray-300">
              Sign up to get updates on new books, events, and exclusive content!
            </p>
            <form className="mt-4 space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-whimsical bg-primary-light text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary"
                required
              />
              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-secondary text-primary font-bold rounded-whimsical hover:bg-secondary-light transition-colors duration-300 hover:shadow-glow"
                whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(249, 213, 110, 0.5)" }}
                whileTap={{ scale: 0.98 }}
              >
                Sign Up
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Copyright and Legal Links */}
        <div className="pt-6 mt-6 border-t border-gray-700/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-sm text-gray-300 mb-2 md:mb-0">
                © {currentYear} G.B. Sollie. All rights reserved.
              </p>
              <p className="text-sm text-gray-300 mb-4 md:mb-0">
                Website made with <span className="text-red-500 mx-0.5">❤</span> by <a href="https://yeshaya.dev" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-secondary-light transition-colors hover:underline">yeshaya.dev</a>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="text-sm text-white hover:text-secondary-light transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-white hover:text-secondary-light transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-sm text-white hover:text-secondary-light transition-colors">
                Accessibility
              </Link>
              <Link href="/cookie-policy" className="text-sm text-white hover:text-secondary-light transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add keyframes for the twinkling and pulsing stars */}
      <style jsx global>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        
        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.9; }
          100% { transform: scale(0.9); opacity: 0.7; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 7s ease-in-out infinite;
        }
        
        .hover\:shadow-glow:hover {
          box-shadow: 0 0 15px rgba(249, 213, 110, 0.5);
        }
        
        .hover\:text-shadow-sm:hover {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
        }
        
        .text-shadow-magical {
          text-shadow: 0 0 10px rgba(249, 213, 110, 0.7);
        }
      `}</style>
    </footer>
  );
} 