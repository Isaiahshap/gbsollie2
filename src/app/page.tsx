'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Mail, Download, ShoppingBag } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import NewsletterModal from '@/components/ui/NewsletterModal';
import { useStaggerAnimation } from '@/lib/animations';

export function Book3D({ imageSrc, alt, className = '' }: { imageSrc: string; alt: string; className?: string }) {
  const bookRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;
    
    let requestId: number;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    
    // Smoother animation with lerping
    const animate = () => {
      // Smooth interpolation with lower factor for more gradual movement
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;
      
      // Apply transform with smoother values
      book.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
      
      // Continue animation loop
      requestId = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = book.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position - more subtle (max 3 degrees)
      targetRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
      targetRotateX = ((centerY - e.clientY) / (rect.height / 2)) * 2;
    };
    
    const handleMouseLeave = () => {
      // Smoothly return to original position
      targetRotateX = 0;
      targetRotateY = 0;
    };
    
    // Start animation loop
    requestId = requestAnimationFrame(animate);
    
    // Listen for mouse events
    document.addEventListener('mousemove', handleMouseMove);
    book.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Clean up
      document.removeEventListener('mousemove', handleMouseMove);
      book.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestId);
    };
  }, []);
  
  return (
    <div ref={bookRef} className={`book-3d ${className}`}>
      <div className="book-pages"></div>
      <div className="book-pages-edge"></div>
      <div className="book-cover">
        <Image src={imageSrc} alt={alt} fill className="object-cover" />
      </div>
      <div className="book-spine"></div>
      <div className="book-glow"></div>
    </div>
  );
}

export default function Home() {
  // Refs for animations
  const bookListRef = useRef<HTMLDivElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const signupRef = useRef<HTMLFormElement>(null);
  
  // Add state for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stagger animation for book list
  useStaggerAnimation(bookListRef as React.RefObject<HTMLElement>);
  
  // Handle newsletter signup
  const handleNewsletterSubmit = ({ name, email, city }: { name: string; email: string; city: string }) => {
    // Add logic to handle the form submission
    // For example, sending data to an API
    console.log("Form submitted:", { name, email, city });
    
    // Show confirmation and close modal
    alert("Thank you! Your Bible guide will be emailed to you shortly.");
    setIsModalOpen(false);
  };
  
  return (
    <>
      {/* Hero Section */}
      <div 
        id="hero-section"
        className="relative min-h-screen overflow-hidden flex items-center pt-16 md:pt-20"
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
              <Book3D 
                imageSrc="/images/Catlukercover.png"
                alt="Cat Luker: The Swamp Witch Chronicles"
                className="h-[500px] w-[350px] mx-auto"
              />
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
                  alt="A Journey to the Light"
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
                  alt="Cat Luker: The Swamp Witch Chronicles"
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
                  alt="Cat Luker Audio Book"
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
                alt="G.B. Sollie - Author Portrait"
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
                alt="Decorative hat"
                fill
                className="object-contain"
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
      
      {/* Testimonials */}
      <Section 
        className="bg-primary text-white"
        id="testimonials"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-white mb-4">What Readers Say</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div 
          ref={testimonialRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              quote: "In my process, I first look for the story. Whether it's music, a book, or a painting—anything, really—there's always a story. In the case of The Swamp Witch Chronicles—box checked. It's an adventure/fantasy involving three kids from rural 1930s Alabama, enthralled in an epic battle of good vs. evil. As I read, my mind was filled with images of classics like The Chronicles of Narnia mixed with the folksiness of The Adventures of Tom Sawyer. Everything a middle-grade reader could ask for. But, as with any great surface story, there's also something more profound, something bigger, lurking underneath.",
              author: "Monroe Jones",
              subtitle: "Grammy Award-winning Producer",
              title: "The Swamp Witch Chronicles",
              rating: 5
            },
            {
              quote: "It's really great! I think students who attend a study like this will really benefit from the ideas you lay out in the guide. So excited for you and the ways God is leading you through this project.",
              author: "Cory Osborne",
              subtitle: "MIDDLE SCHOOL: MS Group Director Woodstock City Church",
              title: "A Journey to the Light Bible Study Guide and Companion to Cat Luker: The Swamp Witch Chronicles",
              rating: 5
            }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-6 rounded-whimsical"
            >
              <div className="flex text-yellow-400 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2">{testimonial.title}</h3>
              <p className="italic text-white/90 mb-4">&quot;{testimonial.quote}&quot;</p>
              <p className="text-secondary font-bold">— {testimonial.author}</p>
              <p className="text-white/80">{testimonial.subtitle}</p>
            </motion.div>
          ))}
        </div>
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
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Sign Up Today</h3>
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
                />
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" fullWidth icon={<Mail size={18} />}>
                  Get Free Bible Study Guide
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
      <NewsletterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewsletterSubmit}
      />
    </>
  );
}
