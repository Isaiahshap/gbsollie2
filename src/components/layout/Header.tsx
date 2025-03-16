'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Book, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Books data for the dropdown
const books = [
  { 
    title: "Cat Luker: The Swamp Witch Chronicles", 
    path: "/cat-luker-dark-clock",
    image: "/images/Catlukercover.png"
  },
  { 
    title: "A Journey to the Light", 
    path: "/a-journey-to-the-light",
    image: "/images/journeycover.jpg"
  },
  { 
    title: "Cat Luker: The Audio Experience", 
    path: "/audio-book",
    image: "/images/audiocover.png"
  }
];

const navItems = [
  { name: 'Home', path: '/' },
  { 
    name: 'Books', 
    path: '/books',
    hasDropdown: true,
    dropdownContent: books
  },
  { name: 'About', path: '/about' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  // Close dropdown when path changes
  useEffect(() => {
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownToggle = (navItem: string, isHovering: boolean) => {
    if (isHovering) {
      setActiveDropdown(navItem);
    } else {
      setActiveDropdown(null);
    }
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm py-3 shadow-2xl"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 8px 16px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-50">
          <motion.div 
            className="text-2xl md:text-3xl font-display text-white hover:opacity-80 transition-opacity"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            G.B. Sollie
          </motion.div>
        </Link>

        {/* Navigation - always visible */}
        <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => item.hasDropdown && handleDropdownToggle(item.name, true)}
              onHoverEnd={() => item.hasDropdown && handleDropdownToggle(item.name, false)}
            >
              <Link 
                href={item.path}
                className={`nav-link text-xs sm:text-sm md:text-base px-1 sm:px-2 md:px-3 ${pathname === item.path ? 'active' : ''} ${item.hasDropdown ? 'flex items-center' : ''}`}
                onClick={() => item.hasDropdown && setActiveDropdown(null)}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown size={14} className="ml-1 hidden sm:inline-block" />}
              </Link>
              
              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      className="absolute top-full right-0 sm:right-auto sm:left-0 mt-2 w-64 dropdown-menu z-50"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 rounded-whimsical bg-secondary shadow-md">
                        <div className="flex flex-col gap-2">
                          {item.dropdownContent.map((book, i) => (
                            <Link 
                              key={i} 
                              href={book.path}
                              className="flex items-center p-2 rounded-whimsical hover:bg-white/20 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="relative w-10 h-14 rounded overflow-hidden mr-3 shadow-sm">
                                <Image
                                  src={book.image}
                                  alt={book.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-primary-dark text-sm font-medium line-clamp-2">
                                {book.title}
                              </span>
                            </Link>
                          ))}
                          
                          <div className="border-t border-primary/10 mt-2 pt-2">
                            <Link 
                              href="/books"
                              className="flex items-center justify-center p-2 text-primary-dark text-sm font-medium rounded-whimsical hover:bg-white/20 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <Book size={14} className="mr-1" />
                              View All Books
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          ))}
        </nav>
      </div>
    </header>
  );
} 