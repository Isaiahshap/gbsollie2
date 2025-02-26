'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Book, ChevronDown } from 'lucide-react';
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
    title: "A Journey To The Light", 
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
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleDropdownToggle = (navItem: string) => {
    if (activeDropdown === navItem) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(navItem);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-sm py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="relative"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => item.hasDropdown && handleDropdownToggle(item.name)}
              onHoverEnd={() => item.hasDropdown && handleDropdownToggle(item.name)}
            >
              <Link 
                href={item.path}
                className={`nav-link ${pathname === item.path ? 'active' : ''} ${item.hasDropdown ? 'flex items-center' : ''}`}
              >
                {item.name}
                {item.hasDropdown && <ChevronDown size={16} className="ml-1" />}
              </Link>
              
              {/* Dropdown Menu */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {activeDropdown === item.name && (
                    <motion.div
                      className="absolute top-full left-0 mt-2 w-64 dropdown-menu"
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

        {/* Mobile menu button */}
        <button 
          className="lg:hidden z-50 text-white" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-40 flex items-center justify-center lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col items-center gap-8 text-center">
                {navItems.map((item) => (
                  <div key={item.path} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button 
                          onClick={() => handleDropdownToggle(item.name)}
                          className={`text-2xl font-medium flex items-center nav-link ${pathname === item.path ? 'active' : ''}`}
                        >
                          {item.name}
                          <ChevronDown 
                            size={20} 
                            className={`ml-2 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              className="mt-4 w-full space-y-2 bg-white/10 p-4 rounded-whimsical"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {item.dropdownContent.map((book, i) => (
                                <Link 
                                  key={i} 
                                  href={book.path}
                                  className="flex items-center p-2 text-white hover:text-secondary transition-colors"
                                >
                                  <div className="relative w-8 h-12 mr-2">
                                    <Image 
                                      src={book.image}
                                      alt={book.title}
                                      fill
                                      className="object-cover rounded"
                                    />
                                  </div>
                                  <span className="text-base">{book.title}</span>
                                </Link>
                              ))}
                              <Link 
                                href="/books"
                                className="block text-center text-white py-2 border-t border-white/20 mt-2"
                              >
                                View All Books
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.path}
                        className={`text-2xl font-medium nav-link ${pathname === item.path ? 'active' : ''}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
} 