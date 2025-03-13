'use client';

import { useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';
import GoldCard from '@/components/ui/GoldCard';

// Star component for the night sky background
const Star = ({ size, top, left, delay, duration }: { size: number, top: string, left: string, delay: number, duration: number }) => (
  <motion.div
    className="absolute rounded-full bg-white"
    style={{
      width: size,
      height: size,
      top,
      left,
    }}
    animate={{
      opacity: [0.1, 0.7, 0.1],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    }}
  />
);

export default function AboutPage() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  
  // Apply text reveal animation
  useTextReveal(quoteRef as React.RefObject<HTMLElement>);

  // Generate stars for the night sky with deterministic values
  const stars = useMemo(() => {
    const starCount = 250; // Further increased for better coverage
    
    // Prime numbers for creating pseudo-random distribution
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53];
    
    return Array.from({ length: starCount }).map((_, i) => {
      // Create pseudo-random but deterministic position values using prime numbers
      // This gives the appearance of randomness while being consistent
      const seed1 = (i * 13) % 100;
      const seed2 = (i * 17) % 100;
      
      // Apply different algorithms based on index to avoid grid-like patterns
      const topPercentage = (seed1 + primes[i % primes.length]) % 100;
      const leftPercentage = (seed2 + primes[(i + 7) % primes.length]) % 100;
      
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
  }, []);

  return (
    <>
      {/* Hero Section */}
      <Section 
        className="bg-[#0a1128] text-white relative overflow-hidden w-full"
        id="about-hero"
        fullHeight
      >
        {/* Night Sky Background - Full viewport width and height */}
        <div className="fixed inset-0 w-screen h-screen">
          {/* Stars - Distributed across the entire viewport */}
          {stars.map((star) => (
            <Star
              key={star.id}
              size={star.size}
              top={star.top}
              left={star.left}
              delay={star.delay}
              duration={star.duration}
            />
          ))}
          {/* Enhanced gradient overlay to add depth */}
          <div 
            className="absolute inset-0 w-screen h-screen" 
            style={{
              background: "radial-gradient(circle at center, rgba(16, 42, 94, 0.3) 0%, rgba(10, 17, 40, 0.95) 100%)"
            }}
          ></div>
        </div>
        
        <div className="container-custom relative z-10 min-h-screen flex flex-col items-center justify-center">
          {/* Central Image with Faded Edges */}
          <div className="relative w-full max-w-md mx-auto mb-8">
            <motion.div 
              className="relative aspect-square"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Decorative Circle */}
              <motion.div 
                className="absolute -inset-4 rounded-full bg-gradient-to-br from-secondary/40 to-primary/20"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              
              {/* Radial Gradient Overlay */}
              <div className="absolute inset-0 rounded-full" style={{
                background: "radial-gradient(circle, rgba(255,255,255,0) 50%, rgba(10,17,40,1) 100%)",
                zIndex: 2
              }}></div>
              
              {/* Main Image */}
              <div className="rounded-full overflow-hidden relative shadow-lg" style={{ zIndex: 1 }}>
                <Image 
                  src="/images/greg2.png" 
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

          {/* Bio Text */}
          <motion.div
            className="prose prose-lg max-w-2xl text-center mx-auto prose-invert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xl leading-relaxed">
              My claim to fame is that Cat and Little Preacher Sollie raised me
              down in Dothan, Alabama, and I inherited a storytelling gene from
              my dad&apos;s father (Big Daddy, a.k.a. Preacher Sollie).
            </p>
            <p>
              I have a bunch of grandkids, and counting, and I am reminded
              each day of how important this next generation will be.
            </p>
          </motion.div>

          {/* Enhanced Floating Illustrations - Repositioned to avoid text */}
          {/* Bear */}
          <motion.div 
            className="absolute w-24 h-24 md:w-32 md:h-32 cursor-pointer"
            style={{ top: '5%', left: '5%' }}
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
            style={{ bottom: '5%', right: '5%' }}
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
            style={{ top: '10%', right: '8%' }}
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
            style={{ bottom: '10%', left: '8%' }}
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
            style={{ top: '30%', left: '3%' }}
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
            style={{ top: '30%', right: '3%' }}
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
            style={{ top: '75%', right: '15%' }}
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
            style={{ bottom: '25%', right: '35%' }}
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

      {/* Gold Card Section */}
      <Section
        className="bg-white py-20"
        id="about-gold-card"
      >
        <div className="container mx-auto px-4 max-w-3xl">
          <GoldCard 
            content={{
              title: "G.B. Sollie - Author Portrait",
              subtitle: "Storyteller, Grandparent, and Creator of Magical Adventures",
              paragraphs: [
                "My claim to fame is that Cat and Little Preacher Sollie raised me down in Dothan, Alabama, and I inherited a storytelling gene from my dad's father (Big Daddy, a.k.a. Preacher Sollie).",
                "I have a bunch of grandkids, and counting, and I am reminded each day of how important this next generation will be."
              ],
              imageSrc: "/images/gregwkids.jpg",
              imageAlt: "G.B. Sollie - Author Portrait"
            }}
            className="mx-auto"
          />
        </div>
      </Section>

      {/* Featured Quote */}
      <Section 
        className="bg-secondary"
        id="featured-quote"
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
        className="bg-white"
        id="my-story"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">My Story</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative rounded-whimsical overflow-hidden shadow-lg aspect-[4/3]">
            <Image 
              src="/images/gregwkids.jpg" 
              alt="G.B. Sollie with family" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-black">
              My claim to fame is that Cat and Little Preacher Sollie raised me
              down in Dothan, Alabama, and I inherited a storytelling gene from
              my dad&apos;s father (Big Daddy, a.k.a. Preacher Sollie). My brothers,
              sisters, and I would pile into the family station wagon with our
              parents for trips to Aimwell as often as possible. With both sets of
              grandparents located there we would get loved unconditionally, fed
              like royalty for a few days, and then head home.
            </p>
            <p className="text-black">
              I heard countless
              stories about Aimwell and the characters that inhabited Marengo
              County over the years. It gave me a sense of how my parents were
              raised and a burning appreciation for why they were so special. It also
              has become my mission to share that rearing recipe, that love, with
              others through these stories, because it is something too valuable to
              be lost.
            </p>
            <p className="text-black">
              I have a bunch of grandkids, and counting, and I am reminded
              each day of how important this next generation will be.
            </p>
          </div>
        </div>
      </Section>

      {/* The Origins of Cat Luker */}
      <Section 
        className="bg-secondary"
        id="cat-luker-origins"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">The Origins of Cat Luker</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg max-w-none">
            <p className="text-black">
              Cat Luker was almost accidentally created after numerous carpool trips with my granddaughter. As I would drive her to school, I found myself making up stories to entertain her and the other kids during these rides.
            </p>
            <p className="text-black">
              What began as simple car ride entertainment soon evolved into something more. I started recording these improvised tales, and before I knew it, they had taken on a life of their own, gradually shaping the character and world of Cat Luker.
            </p>
            <p className="text-black">
              The character of Cat Luker is also deeply rooted in my own upbringing in Alabama. The values, experiences, and countryside adventures of my childhood found their way into these stories, creating a bridge between generations and preserving pieces of my heritage in a form that could be shared with young readers today.
            </p>
          </div>
          
          <div className="relative aspect-square">
            <Image 
              src="/images/trblackcat.png" 
              alt="Cat Luker" 
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {/* Faith and Values */}
      <Section 
        className="bg-gray-50"
        id="faith-values"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Faith & Values</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="prose prose-lg max-w-3xl mx-auto">
          <p className="lead text-xl text-black">
            And furthermore....
            If I could bottle-up what my dear parents meant to me and
            the impact they had on our family, and the impact their parents
            had on them, I would give it away. This book is as close as I can
            come to doing that. All they really had was love. My parents received
            it from theirs and they passed it down the line. If I stop and think
            about it, there is no doubt that it extends all the way back to Jesus.
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
            And you guessed it, love is at the center of that plan. I have been
            listening to a cleverly titled sermon series by Andy Stanley called,
            The Way - in the Manger and would like to extend that to the
            community where my parents were raised, and this book is set-
            Aimwell, Alabama. They embraced &quot;The Way - in the Manger&quot;
            philosophy, and it is reflected in this book series. I encourage you
            to take a long swig from that bottled-up gift and not look back.
          </p>
          <p className="font-bold text-center text-primary text-xl mt-8">
            Your kids will thank you!
          </p>
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
        className="bg-primary text-white"
        id="about-cta"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-white mb-6">Join the Adventure</h2>
          <p className="text-xl text-white/90 mb-8">
            Discover the magical world of Cat Luker and share these meaningful adventures with the young readers in your life.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/books" variant="primary" size="lg">
              Explore My Books
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 