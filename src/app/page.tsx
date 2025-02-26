'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Award, Mail } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import Section from '@/components/ui/Section';
import { useStaggerAnimation } from '@/lib/animations';

export function Book3D({ imageSrc, alt, className = '' }: { imageSrc: string; alt: string; className?: string }) {
  const bookRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = book.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position
      // Keep the effect subtle (max 10 degrees)
      const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 5;
      const rotateX = ((centerY - e.clientY) / (rect.height / 2)) * 5;
      
      // Apply transform
      book.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };
    
    const handleMouseLeave = () => {
      // Reset to original position
      book.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };
    
    // Listen for mouse events
    document.addEventListener('mousemove', handleMouseMove);
    book.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      book.removeEventListener('mouseleave', handleMouseLeave);
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
  

  // Stagger animation for book list
  useStaggerAnimation(bookListRef as React.RefObject<HTMLElement>);
  
  return (
    <>
      {/* Hero Section */}
      <div 
        id="hero-section"
        className="relative min-h-screen overflow-hidden flex items-center mt-[-84px] pt-[64px]"
        style={{
          backgroundImage: 'url(/images/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/80 z-0"></div>
        
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
                Join award-winning author G.B. Sollie on a magical journey through faith, courage, and adventure with the Cat Luker series.
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
            Scroll Down
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
        className="bg-white"
        id="featured-books"
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-5xl font-display text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Discover My Books
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-secondary mx-auto rounded-full"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
        
        <div ref={bookListRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Cat Luker */}
          <Link href="/cat-luker-dark-clock" className="group">
            <div className="bg-gray-50 rounded-whimsical p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[2/3] mb-4 rounded-whimsical overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                <Image
                  src="/images/Catlukercover.png"
                  alt="Cat Luker: The Swamp Witch Chronicles"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                Cat Luker: The Swamp Witch Chronicles
              </h3>
              <p className="text-gray-600 flex-grow mb-4">
                Set in 1930s rural Alabama during the Great Depression, this compelling tale follows three young friends as they confront the mysterious Swamp Witch.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <span className="text-accent font-medium flex items-center group-hover:underline">
                  Read More <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          </Link>
          
          {/* A Journey to the Light */}
          <Link href="/a-journey-to-the-light" className="group">
            <div className="bg-gray-50 rounded-whimsical p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[2/3] mb-4 rounded-whimsical overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <p className="text-primary font-bold">Coming Soon</p>
                </div>
                <Image
                  src="/images/journeycover.jpg"
                  alt="A Journey to the Light"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                A Journey to the Light
              </h3>
              <p className="text-gray-600 flex-grow mb-4">
                Join Cat and her friends on a new adventure as they discover the meaning of hope in the darkest of times. Coming soon!
              </p>
              <div className="flex items-center justify-end">
                <span className="text-accent font-medium flex items-center group-hover:underline">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          </Link>
          
          {/* Audio Book */}
          <Link href="/audio-book" className="group">
            <div className="bg-gray-50 rounded-whimsical p-6 flex flex-col h-full hover:shadow-lg transition-all duration-300">
              <div className="relative w-full aspect-[2/3] mb-4 rounded-whimsical overflow-hidden shadow-md group-hover:shadow-lg transition-all">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <p className="text-primary font-bold">Coming Soon</p>
                </div>
                <Image
                  src="/images/audiocover.png"
                  alt="Cat Luker Audio Book"
                  fill
                  className="object-fill group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                Cat Luker: The Audio Experience
              </h3>
              <p className="text-gray-600 flex-grow mb-4">
                Experience the magic of Cat Luker through the voice of G.B. Sollie himself. Perfect for road trips and bedtime stories!
              </p>
              <div className="flex items-center justify-end">
                <span className="text-accent font-medium flex items-center group-hover:underline">
                  Learn More <ArrowRight size={16} className="ml-1" />
                </span>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="text-center">
          <Button href="/books" variant="secondary">
            View All Books
          </Button>
        </div>
      </Section>
      
      {/* About the Author */}
      <Section 
        className="bg-gray-50"
        id="about-author"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-whimsical overflow-hidden aspect-square shadow-xl">
              <Image
                src="/images/gregwkids.jpg"
                alt="G.B. Sollie - Author Portrait"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-secondary p-4 rounded-whimsical shadow-lg">
              <Award className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-6">Meet G.B. Sollie</h2>
            <div className="prose prose-lg text-gray-800 font-medium">
              <p>
                My journey as an author began with the stories I heard as a child, passed down through generations in Aimwell, Alabama. These tales of family, faith, and adventure shaped my worldview and eventually inspired the Cat Luker series.
              </p>
              <p>
                I believe that children&apos;s literature has the power to shape young minds and hearts, teaching them about courage, kindness, and the enduring power of love.
              </p>
              <blockquote className="not-italic border-l-4 border-secondary pl-4 my-6 text-gray-900">
                &quot;If I could bottle-up what my dear parents meant to me and the impact they had on our family, I would give it away. And this book is as close as I can come to doing that.&quot;
              </blockquote>
            </div>
            <div className="mt-6">
              <Button href="/about" variant="secondary">
                Read My Story
              </Button>
            </div>
          </motion.div>
        </div>
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              quote: "The Cat Luker series has become a family favorite. Our children ask for these stories night after night!",
              author: "Sarah M., Parent",
              rating: 5
            },
            {
              quote: "G.B. Sollie weaves faith, history, and adventure into stories that captivate young readers while teaching valuable life lessons.",
              author: "John D., Elementary School Teacher",
              rating: 5
            },
            {
              quote: "The Depression-era setting brings to life an important part of American history in a way that children can understand and connect with.",
              author: "Michelle T., Librarian",
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
              <p className="italic text-white/90 mb-4">&quot;{testimonial.quote}&quot;</p>
              <p className="text-secondary font-bold">— {testimonial.author}</p>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Recent News */}
      <Section 
        className="bg-white"
        id="recent-news"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">Latest Updates</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "New Book Announcement",
              date: "July 15, 2023",
              excerpt: "Exciting news! The second book in the Cat Luker series is now in production and will be released early next year.",
              image: "/images/news-1.jpg"
            },
            {
              title: "School Tour Dates Announced",
              date: "August 2, 2023",
              excerpt: "G.B. Sollie will be visiting schools across Alabama this fall. Check the events calendar for dates and locations.",
              image: "/images/news-2.jpg"
            },
            {
              title: "Cat Luker Wins Children's Book Award",
              date: "June 30, 2023",
              excerpt: "We're honored to announce that Cat Luker: The Swamp Witch Chronicles has received the Southern Literature Award for Children's Fiction.",
              image: "/images/news-3.jpg"
            }
          ].map((news, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-whimsical overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{news.date}</p>
                <h3 className="text-xl font-bold text-primary mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4">{news.excerpt}</p>
                <Link href="/news" className="text-accent hover:underline flex items-center">
                  Read More <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button href="/news" variant="secondary">
            View All News
          </Button>
        </div>
      </Section>
      
      {/* Newsletter Signup */}
      <Section 
        className="bg-secondary relative"
        id="newsletter"
      >
        {/* Add subtle background image */}
        <div 
          className="absolute inset-0 opacity-10 z-0 pointer-events-none"
          style={{
            backgroundImage: 'url(/images/trblackcat.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left 100px bottom 0px',
            mixBlendMode: 'soft-light'
          }}
        ></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-display text-primary-dark mb-6"
            >
              Join the Adventure
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-primary-dark mb-4"
            >
              Subscribe to my newsletter for:
            </motion.p>
            <motion.ul
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-3 mb-6"
            >
              {[
                "Early access to new books",
                "Exclusive content and behind-the-scenes",
                "Special offers and discounts",
                "Event announcements and book signings"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center mr-3 text-white">✓</span>
                  <span className="text-primary-dark">{item}</span>
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
            className="bg-white p-8 rounded-whimsical shadow-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <h3 className="text-2xl font-bold text-primary mb-6">Sign Up Today</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              <div className="pt-2">
                <Button type="submit" variant="primary" fullWidth icon={<Mail size={18} />}>
                  Subscribe to Newsletter
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                By subscribing, you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. We respect your privacy and will never share your information.
              </p>
            </div>
          </motion.form>
        </div>
      </Section>
    </>
  );
}
