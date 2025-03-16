'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';
import GoldCard from '@/components/ui/GoldCard';

// Star component for the night sky background
const Star = ({ size, top, left, delay, duration }: { size: number, top: string, left: string, delay: number, duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      top,
      left,
      backgroundColor: "rgba(255, 255, 255, 0)", // Start completely transparent
      pointerEvents: "none", // Prevent hover interactions
      willChange: "opacity, transform, backgroundColor", // Performance optimization
      transform: "translateZ(0)" // Enable hardware acceleration
    }}
    initial={{
      opacity: 0,
      scale: 0
    }}
    animate={{
      opacity: [0, 0.1, 0.7, 0.1],
      scale: [0, 1, 1.2, 1],
      backgroundColor: ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      delay: delay + 0.5, // Add extra delay to ALL stars
      ease: "easeInOut" // Add easing for smoother animation
    }}
  />
);

export default function AboutPage() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  
  // Control when to render stars to prevent flash on initial load
  const [mounted, setMounted] = useState(false);
  const [starsReady, setStarsReady] = useState(false);
  
  // First wait for component to be mounted
  useEffect(() => {
    setMounted(true);
    
    // Then add a significant delay before showing stars
    const timer = setTimeout(() => {
      setStarsReady(true);
    }, 600); // Longer delay to ensure page is fully loaded
    
    return () => clearTimeout(timer);
  }, []);
  
  // Apply text reveal animation
  useTextReveal(quoteRef as React.RefObject<HTMLElement>);

  // Define proper type for star objects
  type Star = {
    size: number;
    top: string;
    left: string;
    delay: number;
    duration: number;
    id: number;
  };

  // Generate stars only after component is mounted
  const [stars, setStars] = useState<Star[]>([]);
  
  useEffect(() => {
    if (mounted) {
      const starCount = 300; // Reduced from 600 for better performance while maintaining visual appeal
      
      // Prime numbers for creating pseudo-random distribution
      const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
      
      const generatedStars = Array.from({ length: starCount }).map((_, i) => {
        // Create pseudo-random but deterministic position values using prime numbers
        // This gives the appearance of randomness while being consistent
        const seed1 = (i * 13) % 100;
        const seed2 = (i * 17) % 100;
        
        // Improved distribution algorithm that favors corners and edges
        let topPercentage, leftPercentage;
        
        // Add extra stars to the corners and edges
        if (i < 50) {
          // Top left corner
          topPercentage = (seed1 % 20);
          leftPercentage = (seed2 % 20);
        } else if (i < 100) {
          // Top right corner
          topPercentage = (seed1 % 20);
          leftPercentage = 80 + (seed2 % 20);
        } else if (i < 150) {
          // Bottom left corner
          topPercentage = 80 + (seed1 % 20);
          leftPercentage = (seed2 % 20);
        } else if (i < 200) {
          // Bottom right corner
          topPercentage = 80 + (seed1 % 20);
          leftPercentage = 80 + (seed2 % 20);
        } else {
          // General distribution for the rest
          topPercentage = (seed1 + primes[i % primes.length]) % 100;
          leftPercentage = (seed2 + primes[(i + 7) % primes.length]) % 100;
        }
        
        // Create varying star sizes with a deterministic pattern
        const sizeVariations = [1, 1.2, 1.5, 1.8, 2, 2.3, 2.7, 3];
        const sizeIndex = (i * 3 + 11) % sizeVariations.length;
        const size = sizeVariations[sizeIndex];
        
        // Vary animation delays deterministically
        const delayVariations = [0, 0.3, 0.7, 1.1, 1.5, 1.9, 2.3, 2.8, 3.3, 3.9, 4.5];
        const delayIndex = (i * 5 + 3) % delayVariations.length;
        const delay = delayVariations[delayIndex];
        
        // Vary animation durations deterministically
        const durationVariations = [3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
        const durationIndex = (i * 7 + 5) % durationVariations.length;
        const duration = durationVariations[durationIndex];
        
        return {
          size,
          top: `${topPercentage}%`,
          left: `${leftPercentage}%`,
          delay,
          duration,
          id: i,
        };
      });
      
      setStars(generatedStars);
    }
  }, [mounted]);

  return (
    <>
      {/* Hero Section */}
      <Section 
        className="bg-[#0a1128] text-white relative overflow-hidden w-full"
        id="about-hero"
        fullHeight
      >
        {/* Solid background to prevent any flashes */}
        <div className="absolute inset-0 bg-[#0a1128] z-0"></div>
        
        {/* Night Sky Background - Complete coverage with absolute positioning */}
        <AnimatePresence>
          {mounted && (
            <motion.div 
              className="absolute top-0 left-0 right-0 bottom-0" 
              style={{ 
                width: "120%", 
                height: "120%", 
                left: "-10%",
                top: "-10%",
                zIndex: 0
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Stars - Expanded coverage with larger area */}
              <div className="absolute inset-0" style={{ width: "100%", height: "100%", overflow: "hidden", pointerEvents: "none" }}>
                {starsReady && stars.map((star) => (
                  <Star
                    key={star.id}
                    size={star.size}
                    top={star.top}
                    left={star.left}
                    delay={star.delay}
                    duration={star.duration}
                  />
                ))}
              </div>
              
              {/* Enhanced gradient overlay with more opacity to ensure stars are visible everywhere */}
              <div 
                className="absolute inset-0" 
                style={{
                  width: "100%",
                  height: "100%",
                  background: "radial-gradient(circle at center, rgba(16, 42, 94, 0.4) 0%, rgba(10, 17, 40, 0.95) 100%)"
                }}
              ></div>
              
              {/* Add gradient fade at bottom for seamless transition */}
              <div 
                className="absolute bottom-0 left-0 right-0"
                style={{
                  height: "150px",
                  background: "linear-gradient(to bottom, rgba(10, 17, 40, 0) 0%, #0a1128 80%, #0a1128 100%)",
                  zIndex: 1
                }}
              ></div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="container-custom relative z-10 min-h-screen flex flex-col items-center justify-center">
          {/* Central Image with Faded Edges */}
          <div className="relative w-full max-w-md mx-auto mb-8 transform-gpu">
            <motion.div 
              className="relative aspect-square transform-gpu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeInOut" } 
              }}
            >
              {/* Decorative Circle */}
              <motion.div 
                className="absolute -inset-8 rounded-full bg-gradient-to-br from-secondary/70 to-primary/40 blur-md"
                style={{ pointerEvents: "none", willChange: "transform" }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Additional outer glow */}
              <motion.div 
                className="absolute -inset-12 rounded-full bg-gradient-to-r from-secondary/30 to-primary/20 blur-xl"
                style={{ pointerEvents: "none", willChange: "transform, opacity" }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.5,
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Intense center glow */}
              <motion.div 
                className="absolute -inset-2 rounded-full bg-gradient-to-br from-yellow-300/60 to-amber-500/30 blur-sm"
                style={{ pointerEvents: "none", willChange: "transform, opacity" }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              ></motion.div>
              
              {/* Subtle light rays */}
              <motion.div 
                className="absolute -inset-16 opacity-40"
                style={{
                  background: "radial-gradient(circle, rgba(249, 213, 110, 0.4) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [0.95, 1.1, 0.95],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              ></motion.div>
              
              {/* Radial Gradient Overlay - Enhanced to complement the glow */}
              <div className="absolute inset-0 rounded-full" style={{
                background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 40%, rgba(10,17,40,0.6) 100%)",
                mixBlendMode: "soft-light",
                zIndex: 2
              }}></div>
              
              {/* Main Image - Improved visibility with enhanced shadow and border */}
              <div 
                className="rounded-full overflow-hidden relative shadow-[0_0_25px_rgba(249,213,110,0.3)]" 
                style={{ 
                  zIndex: 1, 
                  height: "100%", 
                  width: "100%",
                  border: "2px solid rgba(249, 213, 110, 0.2)",
                }}
              >
                <Image 
                  src="/images/greg3.jpg" 
                  alt="G.B. Sollie - Author Portrait" 
                  fill
                  className="object-cover rounded-full"
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>

          {/* Title with colorful styling */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About G.B. Sollie
          </motion.h1>
          
          {/* Playful subtitle */}
          <motion.p
            className="text-lg md:text-xl font-medium text-secondary mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Storyteller, Grandparent, and Creator of Magical Adventures
          </motion.p>

          {/* Bio Text - Removed as requested since it will be in the gold card section */}

          {/* Enhanced Floating Illustrations - Repositioned to the sides */}
          {/* Bear */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ top: '15%', left: '2%' }}
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/bear.png" 
              alt="Bear illustration" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Monkey */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ bottom: '10%', right: '2%' }}
            animate={{
              y: [0, 20, 0],
              x: [0, -15, 0],
              rotate: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/monkey.png" 
              alt="Monkey illustration" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Snake - with circular path */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ top: '20%', right: '3%' }}
            animate={{
              x: [0, 20, 0, -20, 0],
              y: [0, 15, 30, 15, 0],
              rotate: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/snake.png" 
              alt="Snake illustration" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Squirrel */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ bottom: '20%', left: '3%' }}
            animate={{
              y: [0, -10, -20, -10, 0],
              x: [0, -5, 0, 5, 0],
              rotate: [0, -5, 0, 5, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.5
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/squirrel.png" 
              alt="Squirrel illustration" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Book */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ top: '40%', left: '5%' }}
            animate={{
              y: [0, 15, 30, 15, 0],
              x: [0, 10, 0, -10, 0],
              rotate: [0, 8, 0, -8, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "loop",
              delay: 2
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 },
              rotate: [0, 10, -10, 10, 0],
            }}
          >
            <Image 
              src="/images/illustrations/book.png" 
              alt="Book illustration" 
              fill
              className="object-contain"
            />
          </motion.div>

          {/* Hat */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ top: '40%', right: '5%' }}
            animate={{
              y: [0, -15, -30, -15, 0],
              x: [0, -10, 0, 10, 0],
              rotate: [0, -10, 0, 10, 0],
              scale: [1, 1.05, 1, 1.05, 1],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              repeatType: "loop",
              delay: 2.5
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/hat-color.png" 
              alt="Hat illustration" 
              fill
              className="object-contain"
            />
          </motion.div>
          
          {/* Add Salem to the mix */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ bottom: '30%', right: '7%' }}
            animate={{
              y: [0, 20, 0, -20, 0],
              x: [0, -20, 0, 20, 0],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "loop",
              delay: 3
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/salem.png" 
              alt="Salem illustration" 
              fill
              className="object-contain"
            />
          </motion.div>
          
          {/* Add Steeple to the mix */}
          <motion.div 
            className="absolute w-28 h-28 md:w-36 md:h-36 cursor-pointer"
            style={{ bottom: '5%', left: '12%' }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
            whileHover={{ 
              scale: 1.15,
              transition: { duration: 0.3 }
            }}
          >
            <Image 
              src="/images/illustrations/steeple.png" 
              alt="Steeple illustration" 
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      </Section>

      {/* Gold Card Section with gradient background - Improved seamless transition */}
      <div 
        id="about-gold-card"
        className="w-full relative overflow-hidden" 
        style={{
          background: "linear-gradient(to bottom, #0a1128 0%, #0a1128 5%, #09275e 35%, #806800 70%, #F9D56E 100%)",
          padding: "5rem 0 7rem",
          margin: "0",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Top gradient overlay for smoother blending */}
        <div 
          className="absolute top-0 left-0 right-0" 
          style={{
            height: "80px", 
            background: "linear-gradient(to bottom, #0a1128 0%, rgba(10, 17, 40, 0) 100%)",
            zIndex: 1
          }}
        ></div>
        
        {/* Bottom gradient overlay for seamless transition to the quote section */}
        <div 
          className="absolute bottom-0 left-0 right-0" 
          style={{
            height: "100px", 
            background: "linear-gradient(to bottom, rgba(249, 213, 110, 0) 0%, #F9D56E 100%)",
            zIndex: 1
          }}
        ></div>
        
        <div className="container mx-auto px-4 max-w-3xl relative z-10">
          <GoldCard 
            content={{
              title: "G.B. Sollie - Author Portrait",
              subtitle: "Storyteller, Grandparent, and Creator of Magical Adventures",
              paragraphs: [
                "My claim to fame is that Cat and Little Preacher Sollie raised me down in Dothan, Alabama, and I inherited a storytelling gene from my dad's father (Big Daddy, a.k.a. Preacher Sollie).",
                "I have a bunch of grandkids, and counting, and I am reminded each day of how important this next generation will be."
              ],
              imageSrc: "/images/greg2.png",
              imageAlt: "G.B. Sollie - Author Portrait"
            }}
            className="mx-auto"
          />
        </div>
      </div>

      {/* Featured Quote */}
      <Section 
        id="featured-quote"
        bgColor="bg-secondary"
        className="mt-0 pt-10"
      >
        <div className="relative max-w-4xl mx-auto text-center">
          <Quote className="absolute -top-10 left-0 text-primary/20" size={80} />
          <Quote className="absolute -bottom-10 right-0 rotate-180 text-primary/20" size={80} />
          
          <p 
            ref={quoteRef}
            className="text-2xl md:text-3xl font-display text-primary italic relative z-10 leading-relaxed"
          >
            If I could bottle-up what my dear parents meant to me and
            the impact they had on our family, and the impact their parents
            had on them, I would give it away. This book is as close as I can
            come to doing that.
          </p>
        </div>
      </Section>

      {/* My Story */}
      <Section 
        id="my-story"
        bgColor="bg-white"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-primary mb-4 text-3xl md:text-4xl lg:text-5xl font-display"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            My Story
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-secondary mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          ></motion.div>
        </div>
        
        <div className="relative">
          {/* Decorative elements */}
          <motion.div 
            className="absolute -left-4 -top-12 w-20 h-20 md:w-28 md:h-28 opacity-10 z-0"
            initial={{ opacity: 0, rotate: -15 }}
            whileInView={{ opacity: 0.1, rotate: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/images/illustrations/book.png" 
              alt="Decorative book" 
              fill 
              className="object-contain"
            />
          </motion.div>

          <motion.div 
            className="absolute -right-4 bottom-0 w-20 h-20 md:w-28 md:h-28 opacity-10 z-0"
            initial={{ opacity: 0, rotate: 15 }}
            whileInView={{ opacity: 0.1, rotate: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Image 
              src="/images/illustrations/hat-color.png" 
              alt="Decorative hat" 
              fill 
              className="object-contain"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div 
              className="relative overflow-hidden shadow-xl rounded-whimsical"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Decorative border */}
              <div className="absolute inset-0 border-4 border-secondary/20 rounded-whimsical z-20 pointer-events-none"></div>
              
              {/* Image with subtle parallax effect */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image 
                    src="/images/gregwkids.jpg" 
                    alt="G.B. Sollie with family" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
              </div>
              
              {/* Image caption */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-center text-sm bg-gradient-to-t from-black/70 to-transparent z-10">
                G.B. Sollie with family
              </div>
            </motion.div>
            
            <div className="relative">
              <motion.div 
                className="prose prose-lg max-w-none relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-whimsical border border-primary/10 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <p className="text-black first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-tight">
                  My claim to fame is that Cat and Little Preacher Sollie raised me
                  down in Dothan, Alabama, and I inherited a storytelling gene from
                  my dad&apos;s father (Big Daddy, a.k.a. Preacher Sollie). My brothers,
                  sisters, and I would pile into the family station wagon with our
                  parents for trips to Aimwell as often as possible. With both sets of
                  grandparents located there we would get loved unconditionally, fed
                  like royalty for a few days, and then head home.
                </p>
                <p className="text-black relative">
                  I heard countless
                  stories about Aimwell and the characters that inhabited Marengo
                  County over the years. It gave me a sense of how my parents were
                  raised and a burning appreciation for why they were so special. It also
                  has become my mission to share that rearing recipe, that love, with
                  others through these stories, because it is something too valuable to
                  be lost.
                </p>
                <p className="text-black font-medium">
                  I have a bunch of grandkids, and counting, and I am reminded
                  each day of how important this next generation will be.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* The Origins of Cat Luker */}
      <Section 
        id="cat-luker-origins"
        className="relative overflow-hidden"
        bgColor="bg-secondary"
      >
        {/* Large transparent background illustrations */}
          {/* Large book illustration */}
          <div className="absolute opacity-10" style={{ top: '-35%', right: '0%', width: '100%', height: '100%' }}>
            <Image 
              src="/images/illustrations/book.png" 
              alt="Background decoration" 
              fill
              className="object-contain"
            />
          </div>
          

        {/* Subtle background glow */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-full opacity-20 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255, 215, 0, 0.3), transparent 70%), radial-gradient(circle at 70% 60%, rgba(255, 180, 0, 0.3), transparent 70%)',
            backgroundSize: '100% 100%',
            filter: 'blur(40px)',
          }}></div>
        </motion.div>

        {/* Subtle sparkles - minimal and not distracting */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute rounded-full bg-white z-0"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 5 + 2,
            }}
          />
        ))}
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary mb-4 text-3xl md:text-4xl lg:text-5xl font-display">The Origins of Cat Luker</h2>
              <motion.div 
                className="w-32 h-1 bg-primary/40 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 128 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              ></motion.div>
            </motion.div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center justify-between relative">
            {/* Image - Moved to top of section for both mobile and desktop */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative w-[280px] sm:w-[320px] md:w-full max-w-md mx-auto">
                {/* Clean circular frame without colored overlays */}
                <motion.div 
                  className="absolute -inset-4 sm:-inset-6 rounded-full border-4 border-white/30 z-10"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                ></motion.div>
                
                <motion.div
                  className="relative aspect-square rounded-full overflow-hidden shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Grandkids image with NO color overlay */}
                  <Image 
                    src="/images/grandkids.jpg" 
                    alt="G.B. Sollie with grandkids" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 400px"
                    priority
                  />
                  
                  {/* Very subtle vignette that doesn't change color */}
                  <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] rounded-full"></div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Content - Always below image on mobile, beside on desktop */}
            <motion.div 
              className="w-full md:w-1/2 relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 p-6 sm:p-8 rounded-whimsical bg-white/95 backdrop-blur-sm shadow-xl border border-amber-300/30">
                <div className="prose prose-lg max-w-none relative z-10">
                  <p className="text-black first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-tight">
                    Cat Luker was almost accidentally created after numerous carpool trips with my granddaughter. As I would drive her to school, I found myself making up stories to entertain her and the other kids during these rides.
                  </p>
                  <p className="text-black">
                    What began as simple car ride entertainment soon evolved into something more. I started recording these improvised tales, and before I knew it, they had taken on a life of their own, gradually shaping the character and world of Cat Luker.
                  </p>
                  <p className="text-black font-medium">
                    The character of Cat Luker is also deeply rooted in my own upbringing in Alabama. The values, experiences, and countryside adventures of my childhood found their way into these stories, creating a bridge between generations and preserving pieces of my heritage in a form that could be shared with young readers today.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Faith and Values */}
      <Section 
        className="bg-gray-50 relative overflow-hidden"
        id="faith-values"
      >
        {/* Subtle cross background pattern - more elegant and subtle */}
        <div className="absolute inset-0 opacity-3 pointer-events-none">
          <div className="w-full h-full" style={{ 
            backgroundImage: "linear-gradient(to right, rgba(10, 17, 40, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(10, 17, 40, 0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}></div>
        </div>
        
        {/* Subtle light ray effect */}
        <motion.div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.6), transparent 70%)",
          }}
        ></motion.div>
        
        <div className="text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-primary mb-4 text-3xl md:text-4xl lg:text-5xl font-display">
              Faith & Values
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-1 bg-secondary rounded-full"></div>
              <div className="w-1 h-8 bg-secondary rounded-full"></div>
              <div className="w-20 h-1 bg-secondary rounded-full"></div>
            </div>
          </motion.div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left column with text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="prose prose-lg max-w-none bg-white/95 backdrop-blur-sm p-8 rounded-md shadow-md"
            >
              <p className="lead text-xl text-black">
                And furthermore....
                If I could bottle-up what my dear parents meant to me and
                the impact they had on our family, and the impact their parents
                had on them, I would give it away. This book is as close as I can
                come to doing that. All they really had was love. My parents received
                it from theirs and they passed it down the line. If I stop and think
                about it, there is <span className="text-primary font-semibold">no doubt that it extends all the way back to Jesus</span>. 
                That love was poured out on them like a river, and that generation
                washed themselves clean in the flow.
              </p>
              <p className="text-black">
                What does that mean to young
                parents today? If you think having to wake-up in the middle of the
                night with a crying infant is hard, fast-forward 15 years and look at
                what&apos;s in store. But just as there are techniques for getting your baby
                back to sleep, or better yet, sleeping peacefully through the night,
                there are techniques for surviving the tumultuous teens, or better
                yet sailing through them with peaceful nights.
                And you guessed it, <span className="text-primary font-semibold">love is at the center of that plan</span>. I have been
                listening to a cleverly titled sermon series by Andy Stanley called,
                <span className="text-primary font-semibold"> The Way - in the Manger</span> and would like to extend that to the
                community where my parents were raised, and this book is set-
                Aimwell, Alabama. They embraced &quot;The Way - in the Manger&quot;
                philosophy, and it is reflected in this book series. I encourage you
                to take a long swig from that bottled-up gift and not look back.
              </p>
              <p className="font-bold text-center text-primary text-xl mt-8">
                Your kids will thank you!
              </p>
            </motion.div>
            
            {/* Right column with image and decorative elements */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Main image with decorative frame */}
              <motion.div 
                className="relative overflow-hidden rounded-md shadow-xl border border-gray-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-[4/3] relative">
                  <Image 
                    src="/images/aimwell.png" 
                    alt="Aimwell, Alabama" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  
                  {/* Subtle light overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent"></div>
                </div>
                
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-center">
                  <p className="text-sm">Aimwell, Alabama - Where faith and community intertwine</p>
                </div>
              </motion.div>
              
              {/* Inspirational message box */}
              <motion.div 
                className="mt-8 p-6 bg-primary text-white rounded-md shadow-lg relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                {/* Elegant divider line at top */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-white/30"></div>
                
                {/* Simple cross icon using SVG (no emoji) */}
                <div className="absolute top-3 right-3 opacity-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14,9V5H10V9H6V13H10V19H14V13H18V9H14Z" />
                  </svg>
                </div>
                
                <h3 className="text-xl font-bold mb-3 relative z-10">Faith That Endures Generations</h3>
                <p className="relative z-10">The Christian values and love passed down through our family continue to shape and bless each new generation.</p>
                
                {/* Elegant divider line at bottom */}
                <div className="absolute bottom-0 left-1/4 right-1/4 h-px bg-white/30"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Writing Journey */}
      <Section 
        className="bg-white"
        id="writing-journey"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">My Writing Journey</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Inspiration",
              description: "The Cat Luker stories are drawn from real experiences and tales passed down through my family, set against the backdrop of 1930s rural Alabama."
            },
            {
              title: "Process",
              description: "I write to preserve the values, faith, and sense of adventure that shaped my childhood. Each story is crafted to entertain while imparting timeless wisdom."
            },
            {
              title: "Mission",
              description: "My goal is to create stories that bring families together, spark imagination, and pass on the legacy of love and faith that I was so blessed to receive."
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-8 rounded-whimsical shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-primary text-2xl mb-4 font-bold">{item.title}</h3>
              <p className="text-black">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section 
        className="bg-[#0a1128] text-white relative overflow-hidden"
        id="about-cta"
      >
        {/* Starry background matching footer */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars background - fewer, more subtle and static like in footer */}
          <div className="absolute inset-0 z-0">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: i % 3 === 0 ? 2 : 1,
                  height: i % 3 === 0 ? 2 : 1,
                  top: `${Math.floor(Math.random() * 100)}%`,
                  left: `${Math.floor(Math.random() * 100)}%`,
                  opacity: Math.random() * 0.3 + 0.1,
                }}
              />
            ))}
          </div>
          
          {/* Just a few subtle glowing stars */}
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`glow-star-${i}`}
              className="absolute rounded-full"
              style={{
                width: 3,
                height: 3,
                top: `${Math.floor(Math.random() * 100)}%`,
                left: `${Math.floor(Math.random() * 100)}%`,
                background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
                opacity: 0.3,
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="text-center max-w-2xl mx-auto relative z-20">
          <motion.h2 
            className="text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join the Adventure
          </motion.h2>
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Discover the magical world of Cat Luker and share these meaningful adventures with the young readers in your life.
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button href="/books" variant="primary" size="lg">
              Explore My Books
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </Section>
    </>
  );
} 