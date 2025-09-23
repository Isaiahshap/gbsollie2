'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Mail, Download, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import NewsletterModal from '@/components/ui/NewsletterModal';
import Book3D from '@/components/ui/Book3D';
import { useStaggerAnimation } from '@/lib/animations';

export default function Home() {
  // Refs for animations
  const bookListRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLFormElement>(null);
  
  // Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Add state for client-side rendering detection
  const [isClient, setIsClient] = useState(false);
  
  // Add state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  // Set isClient to true when the component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Stagger animation for book list
  useStaggerAnimation(bookListRef as React.RefObject<HTMLElement>);
  
  // Handle newsletter signup
  const handleNewsletterSubmit = async ({ name, email, city }: { name: string; email: string; city: string }) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, city }),
      });
      
      const data = await response.json();
      
      if (!response.ok && !data.sandboxMode) {
        throw new Error(data.error || `Failed to subscribe: ${response.status} ${response.statusText}`);
      }
      
      // Success - check if we're in sandbox mode
      if (data.sandboxMode) {
        alert(data.message || "Your information has been submitted. During development, the website owner will be notified of your request.");
      } else {
        alert("Thank you! Your Bible guide has been sent to your email.");
      }
      
      setIsModalOpen(false);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle form submission on the newsletter section
  const handleNewsletterFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const city = formData.get('city') as string;
    
    // Submit using the same handler
    await handleNewsletterSubmit({ name, email, city });
  };
  
  return (
    <>
      {/* Hero Section */}
      <div 
        id="hero-section"
        className="relative min-h-screen overflow-hidden flex items-center"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Additional gradient at the bottom to ensure smooth transition to the night-gradient section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent z-0"></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.25, 0.1, 0.25, 1], // Improved cubic-bezier easing
                when: "beforeChildren"
              }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-display leading-tight mb-6 text-shadow-magical"
              >
                <motion.span 
                  className="block" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: "easeOut",
                    delay: 0.3
                  }}
                >
                  Enchanting Stories
                </motion.span>
                <motion.span 
                  className="block" 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    ease: "easeOut",
                    delay: 0.6 
                  }}
                >
                  for Young Readers
                </motion.span>
              </motion.h1>
              <motion.p 
                className="text-xl text-white/90 mb-8 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9 }}
              >
                <strong><em>Join captivating author G.B. Sollie on a magical journey through faith.</em></strong>
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.1 }}
              >
                <Button href="/books" variant="primary" size="lg">
                  Explore Books <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  About the Author
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="hidden md:block relative book-wrapper"
              initial={{ opacity: 0, scale: 0.8, rotateY: 5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0
              }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.5,
                duration: 1.2
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                transition: { 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300
                } 
              }}
            >
              {isClient && (
                <Book3D 
                  imageSrc="/images/Catlukercover.png"
                  alt="Cat Luker: The Swamp Witch Chronicles"
                  className="h-[500px] w-[350px] mx-auto"
                />
              )}
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/80 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
          >
            Scroll
          </motion.span>
          <motion.div
            className="mt-2 w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <motion.div 
              className="w-1.5 h-1.5 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 24, 0] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
        
        {/* Lexile Logo - Desktop Only, Bottom Right */}
        <motion.div
          className="hidden md:block absolute bottom-6 right-6 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <div className="relative w-24 h-24 lg:w-28 lg:h-28">
            <Image
              src="/images/lexile.png"
              alt="Lexile Reading Level Certified"
              fill
              className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Featured Books Section */}
      <Section 
        className="night-gradient relative overflow-hidden"
        id="featured-books"
      >
        {/* Removing the mystical elements (bubbles) as requested */}
        
        <div className="relative flex justify-center items-center mb-12">
          {/* Background book illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute w-60 h-60 md:w-80 md:h-80"
          >
            <Image
              src="/images/illustrations/book.png"
              alt=""
              fill
              className="object-contain filter drop-shadow-glow"
              aria-hidden="true"
            />
          </motion.div>
          
          {/* Text content */}
          <div className="text-center relative z-10">
            <motion.h2 
              className="text-3xl md:text-5xl font-display text-secondary mb-4 text-shadow-magical"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Discover My Books
            </motion.h2>
            <motion.p 
              className="text-white/90 text-lg mb-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Faith-filled adventures that inspire young hearts, perfect for ages 9-13
            </motion.p>
            <motion.div 
              className="w-20 h-1 bg-secondary mx-auto rounded-full glow"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
        </div>
        
        {/* Improved mobile responsiveness with smaller gap and padding on mobile */}
        <div ref={bookListRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0 mb-8 md:mb-12 relative z-10">
          
          {/* A Journey to the Light */}
          <Link href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="group">
            <div className="bg-white/95 backdrop-blur-sm rounded-whimsical p-4 md:p-6 flex flex-col h-full transition-all duration-300 hover:translate-y-[-5px] book-card-glow">
              <div className="relative w-full aspect-[2/3] mb-3 md:mb-4 rounded-whimsical overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                </div>
                <Image
                  src="/images/journeycover.jpg"
                  alt="A Journey to the Light Bible Study Guide book cover featuring spiritual themes and adventure"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-1 md:mb-2 group-hover:text-accent transition-colors">
                A Journey to the Light
              </h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow mb-3 md:mb-4">
                Join Cat and her friends on a spiritual adventure as they discover the meaning of hope in the darkest of times.
              </p>
              <div className="flex items-center justify-between w-full gap-2">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://www.amazon.com/Journey-Light-Bible-Companion-Chronicles/dp/1735359661/", "_blank");
                  }}
                  className="inline-flex items-center justify-center rounded-whimsical transition-colors bg-primary text-white hover:bg-primary/90 px-3 md:px-4 py-2 text-xs md:text-sm font-medium flex-grow"
                >
                  Buy Now <ShoppingBag size={14} className="ml-1 md:ml-2" />
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setIsModalOpen(true); 
                  }}
                  className="inline-flex items-center justify-center rounded-whimsical transition-colors border-primary text-primary hover:bg-primary/10 px-3 md:px-4 py-2 text-xs md:text-sm font-medium flex-grow"
                >
                  Bible Guide <Download size={14} className="ml-1 md:ml-2" />
                </button>
              </div>
            </div>
          </Link>

          {/* Cat Luker */}
          <div className="group cursor-pointer" onClick={() => window.location.href = '/cat-luker-dark-clock'}>
            <div className="bg-white/95 backdrop-blur-sm rounded-whimsical p-4 md:p-6 flex flex-col h-full transition-all duration-300 border-2 border-accent/30 scale-100 md:scale-105 relative hover:translate-y-[-5px] book-card-glow">
              <div className="absolute -top-3 right-4 bg-accent text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-md">
                Featured
              </div>
              <div className="absolute -top-3 left-4 bg-secondary text-primary-dark px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-bold shadow-md">
                Illustrated!
              </div>
              <div className="relative w-full aspect-[2/3] mb-3 md:mb-4 rounded-whimsical overflow-hidden shadow-lg group-hover:shadow-xl transition-all">
                <Image
                  src="/images/Catlukercover.png"
                  alt="Cat Luker: The Swamp Witch Chronicles book cover showing three children in a mysterious swamp setting"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-primary mb-1 md:mb-2 group-hover:text-accent transition-colors">
                Cat Luker: The Swamp Witch Chronicles
              </h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow mb-3 md:mb-4">
                A time-traveling historical fantasy set in 1930s rural Alabama, where three young friends confront the mysterious Swamp Witch and journey back to French-speaking Alabama of the past.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="md:w-4 md:h-4" fill="currentColor" />
                  ))}
                </div>
                <Button 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
                >
                  Buy Now <ShoppingBag size={14} className="ml-1 md:ml-2" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Audio Book */}
          <div className="group cursor-pointer" onClick={() => window.location.href = '/audio-book'}>
            <div className="bg-white/95 backdrop-blur-sm rounded-whimsical p-4 md:p-6 flex flex-col h-full transition-all duration-300 hover:translate-y-[-5px] book-card-glow">
              <div className="relative w-full aspect-[2/3] mb-3 md:mb-4 rounded-whimsical overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <p className="text-primary font-bold text-sm md:text-base">Coming Soon</p>
                </div>
                <Image
                  src="/images/audiocover.png"
                  alt="Cat Luker audiobook cover with headphones graphic, narrated by Grammy award-winning producer Monroe Jones"
                  fill
                  className="object-fill group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-primary mb-1 md:mb-2 group-hover:text-accent transition-colors">
                Cat Luker: The Audio Experience
              </h3>
              <p className="text-sm md:text-base text-gray-600 flex-grow mb-3 md:mb-4">
                Revel in the magic of Cat Luker through the voice of grammy winner, Monroe Jones. Perfect for road trips and immersive storytelling!
              </p>
              <div className="flex items-center justify-end">
                <Button 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.GRujj-iPyOYwXod2kg9_pkxaffPk-CsSbp_nR35nKqM.TbDH45EBK1Vh4av7v4y_DiyYSQUDv0U2ogGn68eFY-g&qid=1740608342&sr=8-1"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
                >
                  Buy Now <ShoppingBag size={14} className="ml-1 md:ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center flex flex-col gap-4 items-center relative z-10">
          <Button href="/books" variant="secondary" size="lg" className="hover:shadow-magic">
            View All Books
          </Button>
        </div>
      </Section>
      
      {/* Lexile Reading Level Section */}
      <Section 
        className="night-gradient relative overflow-hidden py-6 md:py-8"
        id="lexile-level"
        animate={false}
      >
        {/* Magical starry background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Twinkling stars */}
          {[...Array(35)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: '#fff',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          
          {/* Golden glowing stars */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i + 100}
              className="absolute rounded-full glow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                backgroundColor: '#F9D56E',
                boxShadow: `0 0 ${Math.random() * 4 + 2}px #F9D56E`,
                opacity: Math.random() * 0.5 + 0.5,
                animation: `twinkle ${Math.random() * 5 + 4}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          {/* Title with magical styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
             className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-display text-secondary mb-2 text-shadow-magical">
              Reading Level Certified
            </h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full glow"></div>
          </motion.div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Lexile Logo with magical frame */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <Image
                  src="/images/lexile.png"
                  alt="Lexile Reading Level Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
            
            {/* Content with magical styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h3 className="text-2xl md:text-3xl font-display text-secondary mb-4 text-shadow-magical">
                880L Reading Level
              </h3>
              <div className="bg-white/10 backdrop-blur-sm rounded-whimsical p-4 border border-secondary/20">
                <p className="text-white/90 mb-3 text-sm md:text-base leading-relaxed">
                  The Lexile System helps match readers to books at their perfect skill level. 
                  <strong className="text-secondary"> Cat Luker: The Dark Clock</strong> is designed for developing readers, 
                  ensuring an engaging experience that builds confidence.
                </p>
              </div>
            </motion.div>
            
            {/* Magical 3D Book */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 5 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                rotateY: 0
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.6,
                duration: 1.2
              }}
              whileHover={{ 
                scale: 1.05,
                rotateY: -5,
                transition: { 
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300
                } 
              }}
              className="flex justify-center relative book-wrapper"
            >
              {isClient && (
                <Book3D 
                  imageSrc="/images/lexilebook.png"
                  alt="Cat Luker book with Lexile certification"
                   className="h-[350px] w-[200px] mx-auto"
                />
              )}
              
       
            </motion.div>
          </div>
        </div>
      </Section>
      
      {/* About the Author */}
      <Section 
        className="night-gradient relative overflow-hidden"
        id="about-author"
        animate={false}
      >
        {/* Realistic night sky with stars - expanded to full width */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width: '120vw', left: '-10vw' }}>
          {/* Small twinkling stars - increased quantity and spread */}
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
          
          {/* Medium stars with glow - increased quantity and spread */}
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
                pointerEvents: 'none', // Prevent hover interactions
                willChange: 'opacity, box-shadow', // Performance optimization
                transform: 'translateZ(0)' // Hardware acceleration
              }}
            />
          ))}
          
          {/* Larger, brighter stars - increased quantity and spread */}
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
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="relative book-wrapper">
            <div className="relative rounded-whimsical overflow-hidden aspect-square shadow-xl book-card-glow">
              <Image
                src="/images/gregwkids.jpg"
                alt="G.B. Sollie, author of Cat Luker series, smiling with his family members including grandchildren"
                fill
                className="object-cover"
              />
              
            </div>
            
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-secondary p-4 rounded-whimsical shadow-lg"
              whileHover={{ rotate: 10, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Award className="w-10 h-10 text-primary" />
            </motion.div>
            
            {/* Decorative hat replacing the star */}
            <motion.div 
              className="absolute -top-16 -left-16 w-36 h-36"
            >
              <Image 
                src="/images/illustrations/hat-color.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </motion.div>
          </div>
          
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-secondary mb-6 text-shadow-magical">Meet G.B. Sollie</h2>
            <div className="prose prose-lg text-white/90 font-medium">
              <p>
                My journey as an author began with the stories I heard as a child, passed down through generations in Aimwell, Alabama. These tales of family, faith, and adventure shaped my worldview and eventually inspired the Cat Luker series.
              </p>
              <p>
                I believe that children&apos;s literature has the power to shape young minds and hearts, teaching them about courage, kindness, and the enduring power of love.
              </p>
              <blockquote className="not-italic pl-4 my-6 text-white relative border-l-0">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-accent to-secondary-light rounded-full glow"></div>
                &quot;If I could bottle-up what my dear parents meant to me and the impact they had on our family, I would give it away. And this book is as close as I can come to doing that.&quot;
              </blockquote>
            </div>
            <div className="mt-6 relative inline-block">
              <Button 
                href="/about" 
                variant="primary" 
                className="relative z-10 btn-primary"
              >
                Read My Story
              </Button>
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
        `}</style>
      </Section>
      
      {/* YouTube Video Section */}
      <Section 
        className="purple-night-gradient relative overflow-hidden"
        id="youtube-video"
        animate={false}
      >
        {/* Magical floating stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Small twinkling stars */}
          {[...Array(40)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: '#fff',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
          
          {/* Medium glowing stars */}
          {[...Array(15)].map((_, i) => (
            <div 
              key={i + 100}
              className="absolute rounded-full glow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                backgroundColor: i % 3 === 0 ? '#F9D56E' : i % 3 === 1 ? '#fff' : '#B4E4FF',
                boxShadow: `0 0 ${Math.random() * 4 + 2}px ${i % 3 === 0 ? '#F9D56E' : i % 3 === 1 ? '#fff' : '#B4E4FF'}`,
                opacity: Math.random() * 0.5 + 0.5,
                animation: `twinkle ${Math.random() * 5 + 4}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
                pointerEvents: 'none',
                willChange: 'opacity, box-shadow',
                transform: 'translateZ(0)'
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-display text-secondary mb-4 text-shadow-magical"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Watch My Latest YouTube Video
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-secondary mx-auto rounded-full glow"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-whimsical overflow-hidden shadow-xl book-card-glow bg-white/5 backdrop-blur-sm p-6 border-2 border-secondary/30">
              <div className="relative aspect-video rounded-whimsical overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/JBg2c5LzfzU"
                  title="G.B. Sollie YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              
              {/* Magical decorative elements around the video */}
              <motion.div 
                className="absolute -top-4 -left-4 w-16 h-16"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <Image 
                  src="/images/illustrations/steeple.png"
                  alt=""
                  fill
                  className="object-contain filter drop-shadow-glow"
                  aria-hidden="true"
                />
              </motion.div>

              <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16"
                animate={{ 
                  rotate: [0, -360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1
                }}
              >
                <Image 
                  src="/images/illustrations/book.png"
                  alt=""
                  fill
                  className="object-contain filter drop-shadow-glow"
                  aria-hidden="true"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Additional magical sparkles */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </Section>
      
      {/* Testimonials */}
      <Section 
        className="bg-[#081020] relative overflow-hidden -mt-1"
        id="testimonials"
        noPadding={true}
      >
        {/* Starry background - extended to full viewport width and height with proper positioning */}
        <div 
          className="absolute overflow-hidden" 
          style={{ 
            width: '100vw', 
            height: '100%',
            left: '50%', 
            top: '0',
            transform: 'translateX(-50%)',
            zIndex: 0
          }}
        >
          {/* Stars background - static stars */}
          <div className="absolute inset-0">
            {Array.from({ length: 150 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: i % 5 === 0 ? 2 : 1,
                  height: i % 5 === 0 ? 2 : 1,
                  top: `${Math.floor(Math.random() * 100)}%`,
                  left: `${Math.floor(Math.random() * 100)}%`,
                  opacity: Math.random() * 0.5 + 0.1,
                }}
              />
            ))}
          </div>
          
          {/* Subtle glowing stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={`glow-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 3,
                height: 3,
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
                background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                opacity: 0.4,
                animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
          
          {/* Add some larger, brighter stars */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`bright-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 4,
                height: 4,
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
                backgroundColor: i % 3 === 0 ? '#F9D56E' : '#fff',
                boxShadow: i % 3 === 0 ? '0 0 4px #F9D56E' : '0 0 4px #fff',
                opacity: 0.7,
                animation: `twinkle ${4 + Math.random() * 5}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}

          {/* Gradient overlay to ensure testimonials are readable */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "radial-gradient(circle at center, rgba(16, 42, 94, 0.3) 0%, rgba(8, 16, 32, 0.4) 100%)"
            }}
          ></div>
        </div>

        <div ref={testimonialRef} className="relative z-10 px-4 py-16 md:py-24 container-custom mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-display text-secondary mb-4 text-shadow-magical"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              What Readers Say
            </motion.h2>
            <motion.div 
              className="w-20 h-1 bg-secondary mx-auto rounded-full glow"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Swamp Witch Chronicles Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-whimsical bg-white/10 backdrop-blur-sm p-8 hover:shadow-lg transition-all duration-300 border-2 border-secondary/30 shadow-[0_0_15px_rgba(249,213,110,0.15)]"
            >
              <h3 className="text-2xl font-bold text-secondary mb-3">The Swamp Witch Chronicles</h3>
              <div className="flex text-yellow-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="italic text-white/90 mb-6 text-lg">
                &quot;In my process, I first look for the story. Whether it&apos;s music, a book, or a painting—anything, really—there&apos;s always a story. In the case of The Swamp Witch Chronicles—box checked. It&apos;s an adventure/fantasy involving three kids from rural 1930s Alabama, enthralled in an epic battle of good vs. evil. As I read, my mind was filled with images of classics like The Chronicles of Narnia mixed with the folksiness of The Adventures of Tom Sawyer. Everything a middle-grade reader could ask for. But, as with any great surface story, there&apos;s also something more profound, something bigger, lurking underneath.&quot;
              </p>
              <div className="flex flex-col">
                <p className="text-secondary font-bold text-lg">— Monroe Jones</p>
                <p className="text-white/80">Grammy Award-winning Producer</p>
              </div>
            </motion.div>

            {/* A Journey to the Light Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-whimsical bg-white/10 backdrop-blur-sm p-8 hover:shadow-lg transition-all duration-300 border-2 border-secondary/30 shadow-[0_0_15px_rgba(249,213,110,0.15)]"
            >
              <h3 className="text-2xl font-bold text-secondary mb-3">A Journey to the Light Bible Study Guide and Companion to Cat Luker: The Swamp Witch Chronicles</h3>
              <div className="flex text-yellow-400 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="italic text-white/90 mb-6 text-lg">
                &quot;It&apos;s really great! I think students who attend a study like this will really benefit from the ideas you lay out in the guide. So excited for you and the ways God is leading you through this project.&quot;
              </p>
              <div className="flex flex-col">
                <p className="text-secondary font-bold text-lg">— Cory Osborne</p>
                <p className="text-white/80">MIDDLE SCHOOL: MS Group Director Woodstock City Church</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Add keyframes for the twinkling effect if not already defined elsewhere */}
        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}</style>
      </Section>
      
      {/* Newsletter Signup */}

      <Section 
        className="bg-primary relative"
        id="newsletter"
        bgImage="/images/moviecoverart.png"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-display text-white mb-6"
            >
              Join the Adventure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-white mb-4"
            >
              Sign up for:
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              {[
                "Free Bible Study Guide - A unique companion that bridges faith and adventure",
                "Updates on new releases",
                "Newsletter",
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center mr-3 text-primary">✓</span>
                  <span className="text-white">{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>
          
          <motion.form
            ref={signupRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-whimsical shadow-lg relative"
            onSubmit={handleNewsletterFormSubmit}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Sign Up Today</h3>
            
            {formError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
                {formError}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black placeholder-black"
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-black mb-1">
                  Your City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black placeholder-black"
                  placeholder="Birmingham"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black placeholder-black"
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
              </div>
              <div className="pt-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  icon={<Mail size={18} />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Get Free Bible Study Guide"}
                </Button>
              </div>
              <p className="text-xs text-black mt-4">
                By signing up, you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. We respect your privacy and will never share your information.
              </p>
            </div>
          </motion.form>
        </div>
      </Section>
      
      {/* Use the NewsletterModal component */}
      {isClient && (
        <NewsletterModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleNewsletterSubmit}
        />
      )}
    </>
  );
}
