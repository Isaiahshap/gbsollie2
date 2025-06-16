'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Coffee, ArrowRight, Sparkles, MapPin } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

// Animated star component for night sky
const AnimatedStar = ({ size, top, left, delay, duration }: { size: number, top: string, left: string, delay: number, duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      top,
      left,
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
      pointerEvents: "none",
      willChange: "opacity, transform, backgroundColor",
      transform: "translateZ(0)"
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
      delay: delay + 0.3,
      ease: "easeInOut"
    }}
  />
);

// Type definition for star objects
interface StarObject {
  size: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
  id: number;
}

// Shooting star component
const ShootingStar = ({ top, left, duration, delay, angle }: 
  { top: string, left: string, duration: number, delay: number, angle: number }) => {
  // Calculate movement based on angle
  const distance = 200;
  const xDistance = Math.sin(angle * Math.PI / 180) * distance;
  const yDistance = Math.cos(angle * Math.PI / 180) * distance;
  
  return (
    <motion.div
      className="absolute w-[3px] h-[120px] rounded-full"
      style={{
        top,
        left,
        transform: `rotate(${angle}deg)`,
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(249, 213, 110, 0.4) 100%)",
        opacity: 0,
        transformOrigin: "top left",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        willChange: "opacity, transform",
      }}
      animate={{
        opacity: [0, 0.9, 0],
        x: ["0px", `${xDistance}px`],
        y: ["0px", `${yDistance}px`],
        scale: [1, 0.8],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 15 + 8,
        ease: "easeOut"
      }}
    />
  );
};

// Sparkle animation component
const Sparkle = ({ size, top, left, duration, delay, color = "#FFFFFF" }: 
  { size: number, top: string, left: string, duration: number, delay: number, color?: string }) => (
  <motion.div
    className="absolute"
    style={{
      width: size,
      height: size,
      top,
      left,
      opacity: 0,
      backgroundColor: color,
      borderRadius: "50%",
      boxShadow: `0 0 ${size * 2}px ${color}`,
      zIndex: 2,
      pointerEvents: "none",
    }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.2, 1, 0.2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      repeatDelay: Math.random() * 4 + 2,
    }}
  />
);

// Floating cloud component
const FloatingCloud = ({ top, left, scale }: { top: string, left: string, scale: number }) => (
  <motion.div
    className="absolute"
    style={{
      top,
      left,
      width: `${scale * 200}px`,
      height: `${scale * 80}px`,
      opacity: 0.1,
      filter: "blur(20px)",
      background: "white",
      borderRadius: "100px",
      zIndex: 1,
    }}
    animate={{
      x: [0, scale * 50, 0],
      opacity: [0.05, 0.12, 0.05],
    }}
    transition={{
      duration: 20 + scale * 10,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }}
  />
);

export default function ContactPage() {
  // Refs for animations
  const quoteRef = useRef<HTMLDivElement>(null);
  
  // Apply text reveal animation
  useTextReveal(quoteRef as React.RefObject<HTMLElement>);

  // Stars state management
  const [starsReady, setStarsReady] = useState(false);
  const [stars, setStars] = useState<StarObject[]>([]);
  
  // Generate stars for night sky
  useEffect(() => {
    const timer = setTimeout(() => {
      setStarsReady(true);
      
      // Generate small stars
      const smallStars = Array.from({ length: 80 }, (_, i) => ({
        size: Math.random() * 2 + 1,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2,
        id: i,
      }));
      
      // Generate medium stars
      const mediumStars = Array.from({ length: 25 }, (_, i) => ({
        size: Math.random() * 3 + 2,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3,
        id: i + 100,
      }));
      
      // Generate large stars
      const largeStars = Array.from({ length: 10 }, (_, i) => ({
        size: Math.random() * 4 + 3,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 7,
        duration: Math.random() * 5 + 4,
        id: i + 200,
      }));
      
      setStars([...smallStars, ...mediumStars, ...largeStars]);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section with Night Sky */}
      <Section 
        className="bg-midnight overflow-hidden relative min-h-[60vh] flex items-center"
        id="contact-hero"
        bgColor="bg-gradient-to-b from-[#040C29] via-[#0A1743] to-[#051326]"
        animate={false}
      >
        {/* Animated Night Sky */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars */}
          {starsReady && stars.map((star) => (
            <AnimatedStar
              key={star.id}
              size={star.size}
              top={star.top}
              left={star.left}
              delay={star.delay}
              duration={star.duration}
            />
          ))}
          
          {/* Shooting Stars */}
          {starsReady && Array.from({ length: 5 }).map((_, i) => (
            <ShootingStar
              key={`shooting-${i}`}
              top={`${Math.random() * 60}%`}
              left={`${Math.random() * 70}%`}
              duration={0.8}
              delay={Math.random() * 15 + i * 5}
              angle={Math.random() * 45}
            />
          ))}
          
          {/* Floating Clouds for distant nebula effect */}
          <FloatingCloud top="15%" left="10%" scale={1.5} />
          <FloatingCloud top="50%" left="75%" scale={1} />
          <FloatingCloud top="70%" left="30%" scale={0.8} />
          
          {/* Moon */}
          <motion.div
            className="absolute w-28 h-28 rounded-full bg-[#F4E99B] shadow-[0_0_60px_rgba(244,233,155,0.4)]"
            style={{ top: '15%', right: '15%' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          >
            <motion.div
              className="absolute w-24 h-24 rounded-full bg-[#040C29]"
              style={{ top: '5%', left: '15%' }}
            />
          </motion.div>
        </div>
        
        <div className="container-custom relative z-10 py-16 md:py-24">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="inline-block"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.3,
                type: "spring",
                stiffness: 200
              }}
            >
              <h1 className="text-5xl md:text-7xl font-display mb-6 text-secondary text-shadow-magical">
                Contact Me
              </h1>
            </motion.div>
            
            <motion.div 
              ref={quoteRef}
              className="mb-8 text-xl text-white/90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="leading-relaxed">
                I&apos;d love to hear from you! Whether you have questions about my books, 
                want to schedule an author visit, or just want to say hello — your message will reach me directly.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button 
                href="#contact-form" 
                variant="primary" 
                size="lg"
                className="shadow-[0_0_15px_rgba(249,213,110,0.3)]"
              >
                Send a Message <Sparkles className="ml-2" size={18} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>
      
      {/* Contact Methods Section */}
      <Section 
        className="night-gradient relative overflow-hidden py-20"
        id="contact-methods"
        animate={true}
        animateOnScroll={true}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Small sparkles */}
          {Array.from({ length: 10 }).map((_, i) => (
            <Sparkle
              key={`sparkle-${i}`}
              size={Math.random() * 4 + 2}
              top={`${Math.random() * 100}%`}
              left={`${Math.random() * 100}%`}
              duration={Math.random() * 2 + 1}
              delay={Math.random() * 3}
              color={i % 3 === 0 ? "#F9D56E" : "#FFFFFF"}
            />
          ))}
        </div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display text-secondary mb-4 text-shadow-magical">
              Magical Ways to Reach Me
            </h2>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-secondary/40 via-secondary to-secondary/40 mx-auto rounded-full glow"
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Mail size={32} />,
                title: 'Email Me',
                subtitle: 'Get in Touch',
                info: 'greg.sollie@gmail.com',
                link: 'mailto:greg.sollie@gmail.com',
                color: 'from-secondary/90 to-yellow-600/90',
                borderColor: 'border-secondary',
                iconBg: 'bg-gradient-to-br from-yellow-300 to-secondary',
                delay: 0
              },
              {
                icon: <MapPin size={32} />,
                title: 'Location',
                subtitle: 'Find Me',
                info: 'Georgia, United States',
                link: null,
                color: 'from-primary/90 to-blue-700/90',
                borderColor: 'border-primary-light',
                iconBg: 'bg-gradient-to-br from-blue-300 to-primary',
                delay: 0.4
              },
              {
                icon: <Coffee size={32} />,
                title: 'Contact Form',
                subtitle: 'Use the form',
                info: 'Send a message',
                link: '#contact-form',
                color: 'from-accent/90 to-purple-700/90',
              }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + (item.delay || 0) }}
              >
                {/* Card with glass morphism effect */}
                <div className={`relative rounded-whimsical overflow-hidden group`}>
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 backdrop-blur-sm bg-black/5" />
                  
                  {/* Border glow */}
                  <div className={`absolute inset-0 border-2 ${item.borderColor} rounded-whimsical opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Card content */}
                  <div className="relative p-8 flex flex-col items-center text-center z-10">
                    {/* Floating sparkles - only visible on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <Sparkle
                          key={`card-sparkle-${index}-${i}`}
                          size={Math.random() * 3 + 1}
                          top={`${Math.random() * 100}%`}
                          left={`${Math.random() * 100}%`}
                          duration={Math.random() * 1.5 + 0.8}
                          delay={Math.random() * 2}
                          color="#FFFFFF"
                        />
                      ))}
                    </div>
                    
                    {/* Icon */}
                    <motion.div 
                      className={`w-20 h-20 rounded-full ${item.iconBg} shadow-lg flex items-center justify-center mb-6`}
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, 5, -5, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <div className="text-white">
                        {item.icon}
                      </div>
                    </motion.div>
                    
                    {/* Magical light beam under icon */}
                    <div className="absolute top-[76px] left-1/2 -translate-x-1/2 w-10 h-20 bg-gradient-to-b from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md" />
                    
                    {/* Text content */}
                    <h3 className="text-white text-2xl mb-1 font-bold text-shadow-sm">{item.title}</h3>
                    <h4 className="text-white text-opacity-80 text-sm mb-5 font-medium">{item.subtitle}</h4>
                    
                    {/* Contact info */}
                    {item.link ? (
                      <motion.a 
                        href={item.link} 
                        className="text-white text-lg hover:text-white font-medium transition-colors inline-flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="border-b-2 border-white/30 hover:border-white/80 transition-colors pb-1">{item.info}</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                          }}
                          className="inline-flex ml-2"
                        >
                          <ArrowRight size={16} className="text-white" />
                        </motion.div>
                      </motion.a>
                    ) : (
                      <p className="text-white text-lg font-medium border-b-2 border-white/30 inline-block pb-1">{item.info}</p>
                    )}
                  </div>
                </div>
                
                {/* Shadow underneath */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-md rounded-full z-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
      
      {/* Contact Form Section */}
      <Section 
        className="night-gradient relative overflow-hidden"
        id="contact-form"
        animate={false}
        noPadding={true}
      >
        {/* Animated starry background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {starsReady && stars.slice(0, 40).map((star) => (
            <AnimatedStar
              key={`form-star-${star.id}`}
              size={star.size * 0.7} // Smaller stars for subtlety
              top={star.top}
              left={star.left}
              delay={star.delay + 5} // Offset delay
              duration={star.duration + 2}
            />
          ))}
        </div>
        
        <div className="container-custom py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Story and Book Illustration */}
            <div className="flex flex-col">
              {/* Write Your Story Component */}
              <motion.div
                className="mb-10 text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-secondary text-3xl md:text-4xl font-display mb-4 text-shadow-magical">Write Your Story</h3>
                <p className="text-white/90 text-lg mb-4 max-w-md mx-auto">
                  Every message begins a new adventure. I can&apos;t wait to hear from you and discover where our story will lead.
                </p>
                
                {/* Quote */}
                <div className="mt-6 pt-3 border-t border-white/20 max-w-xs mx-auto">
                  <p className="italic text-white/70 text-sm mb-2">
                    &quot;Books are a uniquely portable magic.&quot;
                  </p>
                  <p className="text-secondary text-xs">— Stephen King</p>
                </div>
              </motion.div>
              
              {/* Divider */}
              <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-secondary/40 to-transparent mb-10"></div>
              
              {/* Book Illustration */}
              <motion.div 
                className="relative mx-auto mb-16 max-w-sm px-6 py-8 bg-black/30 border border-white/10 backdrop-blur-sm rounded-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative flex justify-center items-center min-h-[280px]">
                  <Image
                    src="/images/illustrations/book.png"
                    alt="Illustrated magical book glowing with golden light, representing the enchanting stories of G.B. Sollie"
                    width={240}
                    height={240}
                    quality={100}
                    priority
                    className="z-10 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                    style={{ objectFit: 'contain' }}
                    onError={() => {
                      console.error("Book image failed to load");
                      console.log("Image path:", "/images/illustrations/book.png");
                    }}
                  />
                </div>
              </motion.div>
            </div>
            
            {/* Right Column: Contact Form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl md:text-4xl font-display text-secondary mb-4 text-shadow-magical">
                  Send a Message
                </h2>
                <p className="text-white/80">
                  Fill out the form below and I&apos;ll respond as soon as possible.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                {/* Google Form Link */}
                <div className="rounded-whimsical overflow-hidden bg-white/5 backdrop-blur-sm border-2 border-secondary/20 shadow-[0_10px_50px_rgba(249,213,110,0.1)] p-10 text-center">
                  <div className="mb-6">
                    <h3 className="text-white text-xl mb-4">Use our Contact Form</h3>
                    <p className="text-white/70 mb-8">
                      Click the button below to access our contact form directly. It will open in a new tab.
                    </p>
                  </div>
                  
                  <a
                    href="https://docs.google.com/forms/d/1goxAq4UYCliOhkvVbJjJu2AXsS0L4XnWKs7-EqX8bEc/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-whimsical transition-all duration-300 font-medium bg-secondary text-primary-dark hover:bg-secondary-light h-14 px-8 text-lg shadow-[0_0_15px_rgba(249,213,110,0.3)]"
                  >
                    Open Contact Form
                  </a>
                </div>

                <div className="mt-6 text-white/60 text-sm text-center">
                  <p>Or email me directly at <a href="mailto:greg.sollie@gmail.com" className="text-secondary font-medium underline hover:text-secondary-light transition-colors">greg.sollie@gmail.com</a></p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* FAQ Section */}
      <Section 
        className="bg-primary-dark relative overflow-hidden"
        id="faq"
        animate={true}
        animateOnScroll={true}
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-secondary mb-4 text-shadow-magical">
            Frequently Asked Questions
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Answers to common questions about author visits, book inquiries, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              question: "Do you offer virtual author visits?",
              answer: "Yes! I offer both in-person and virtual author visits for schools, libraries, and book clubs. Virtual visits can be scheduled worldwide, while in-person visits are currently limited to the Southeastern United States."
            },
            {
              question: "How can I get a signed copy of your books?",
              answer: "Signed copies can be ordered directly through my website during special promotional periods. You can also catch me at book signing events throughout the year, which I announce on my social media and newsletter."
            },
            {
              question: "Are your books available as e-books or audiobooks?",
              answer: "Yes! The Cat Luker series is available in e-book format, and the audiobook versions are currently in production, narrated by the talented Grammy award-winning producer, Monroe Jones."
            },
            {
              question: "Do you accept speaking engagements?",
              answer: "Absolutely! I'm available for speaking engagements at conferences, schools, libraries, and special events. Please use the contact form above to inquire about availability and rates."
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-whimsical border-2 border-white/10 hover:border-secondary/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-secondary text-xl mb-3 font-bold">{faq.question}</h3>
              <p className="text-white/80">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      
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
        
        /* Additional text shadow for heading */
        .text-shadow-magical {
          text-shadow: 0 2px 10px rgba(249, 213, 110, 0.5);
        }
      `}</style>
    </>
  );
} 