'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
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
    { name: 'Media', href: '/news' },
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
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container-custom">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Logo and About */}
          <motion.div variants={itemVariants} className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-3xl font-display text-secondary">G.B. Sollie</h3>
            </Link>
            <p className="text-gray-300 max-w-sm">
              Children&apos;s fantasy author bringing magical adventures to young readers, where imagination knows no bounds.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center hover:bg-secondary hover:text-primary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-secondary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="text-xl font-bold mb-4">Join the Adventure</h4>
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
              <button
                type="submit"
                className="w-full primary-button"
              >
                Sign Up
              </button>
            </form>
          </motion.div>
        </motion.div>

        {/* Copyright and Legal Links */}
        <div className="pt-6 mt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-300 mb-4 md:mb-0">
              © {currentYear} G.B. Sollie. All rights reserved.
            </p>
            
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <Link href="/privacy-policy" className="text-sm text-white hover:text-gray-200 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-sm text-white hover:text-gray-200 transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-sm text-white hover:text-gray-200 transition-colors">
                Accessibility
              </Link>
              <Link href="/cookie-policy" className="text-sm text-white hover:text-gray-200 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 