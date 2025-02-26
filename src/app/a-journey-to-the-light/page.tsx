'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ShoppingBag, Gift } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

export default function JourneyToLightPage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  // Apply text reveal animation
  useTextReveal(titleRef as React.RefObject<HTMLElement>);

  // Create parallax effect
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    const parallaxBg = document.querySelector('.parallax-bg');
    if (!parallaxBg) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      (parallaxBg as HTMLElement).style.transform = `translateY(${scrollPosition * 0.4}px)`;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set position
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/* Parallax Background */}
        <div 
          className="parallax-bg absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/light-bg.jpg)',
            height: '120%',
            top: '-10%'
          }}
        ></div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary z-10"></div>
        
        <div className="relative z-20 container-custom h-full flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 
                  ref={titleRef}
                  className="text-4xl md:text-5xl lg:text-6xl font-display leading-none mb-4"
                >
                  A Journey to the Light
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  Bible Study Guide & Companion to Cat Luker: The Swamp Witch Chronicles
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="#about-guide" variant="primary">
                    Learn More <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button href="https://www.amazon.com/Journey-Light-Bible-Companion-Chronicles/dp/1735359661/">
                    Buy Now <ShoppingBag className="ml-2" size={18} />
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative w-[300px] h-[450px] mx-auto drop-shadow-2xl">
                <Image 
                  src="/images/journeycover.jpg" 
                  alt="A Journey to the Light Bible Study Guide Cover" 
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <Section 
        className="bg-white"
        id="about-guide"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">INTRODUCTION</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-whimsical shadow-lg border border-gray-100">
            <div className="prose prose-lg text-black">
              <p>
                Welcome to the Bible Study Guide for The Dark Clock, Book 1 of Cat Luker: The Swamp Witch Chronicles, Christian Fantasy series.
              </p>
              <p>
                Let me warn you: this is not a typical Bible study guide! Here, you will need to use your imagination and place yourself in the characters&apos; shoes. As you do, you will be faced with situations that might be scary and confusing. Your mission is to grasp the Christian symbolism and opportunities for understanding and relate them to your life&apos;s journey. Those that do will thrive!
              </p>
              <p>
                I love to read. I&apos;ve enjoyed many adventures in my life— through the books I&apos;ve read—and they have inspired me and given me confidence and courage to take daring steps in my real life. For example, the book The Hobbit begins with a step into an adventure. That is how life works: you have to take that first step.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* About the Guide */}
      <Section 
        className="bg-white"
        id="guide-overview"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">The Journey Begins</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:hidden relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
            <Image 
              src="/images/journeycover.jpg" 
              alt="A Journey to the Light Bible Study Guide Cover" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-black">
            <p>
              From a very young age, I wanted to read the Bible from front to back. I tried a few times, but I inevitably ran out of steam. I had not prepared myself for the journey. I did not realize that I needed to do more than read; I needed to seek God. What a wonderful life it has been since then.
            </p>
            <p>
              As you go through this Guide, please realize that you are seeking God.
            </p>
            <p>
              Did you know that the Bible is filled with fantastic creatures? From giants and terrifying cherubim to leviathan sea monsters and dragons, not to mention witchcraft, wizards, and magicians, the Bible is rich with strange and amazing characters. You will find that amazing characters will appear in your life as well—and not all will be fantastic. The world is filled with good and evil. At some point in your life, you will have to confront evil and make decisions about what action you want to take to deal with it.
            </p>
            <div className="not-prose mt-6">
              <h3 className="text-primary font-bold text-xl mb-4">Perfect For:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Youth groups and Bible studies
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Family devotional time
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Classroom faith discussions
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Individual spiritual growth
                </li>
              </ul>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px] w-full rounded-whimsical overflow-hidden shadow-xl">
            <Image 
              src="/images/faith.jpg" 
              alt="Bible study with youth" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">Faith Development</h3>
              <p className="text-sm">
                Engage with scripture in a new and exciting way that connects with young readers through adventure and imagination.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Seven Foundational Elements */}
      <Section 
        className="bg-gray-50"
        id="foundational-elements"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">The Seven Foundational Elements</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-whimsical shadow-lg border border-gray-100">
            <div className="prose prose-lg text-black">
              <p>
                The people that were the inspiration for Cat Luker: The Swamp Witch Chronicles grew up in the Great Depression of the 1930s, an extremely difficult period of time in America. It was even more difficult in the rural South, where times had already been hard. Without jobs or much money, people had to live off the land, raise their own food, and make things by hand. The children had to use their imaginations to entertain themselves—and going on adventures was a popular option.
              </p>
              <p>
                When those children grew into adulthood, they became known as the Greatest Generation because of the many difficulties they had overcome. It is clear that God was with them, and they prospered, but it was not easy. There are lessons to be learned from these strong souls. They built their lives on a foundation of faith, with seven foundational elements:
              </p>

              <ul>
                <li><strong>Courage</strong> — Physical, mental, emotional, and spiritual. The courage to believe.</li>
                <li><strong>Focused discipline</strong> — Hard work, patience, perseverance, and self-control. The discipline to seek God.</li>
                <li><strong>Honesty</strong> — Integrity, fairness, trust, and truthfulness.</li>
                <li><strong>The value of freedom</strong> — Understanding and appreciating their Bill of Rights.</li>
                <li><strong>Personal responsibility</strong> — Being a good team player. Owning up.</li>
                <li><strong>Ambitious ingenuity</strong> — Taking risks, trying to grow, and being creative. Using their God-given talents.</li>
                <li><strong>Love-based compassion</strong> — Embracing the teachings of Jesus. Standing up for others.</li>
              </ul>
              
              <p>
                These are attributes we should all embrace and strive for.
              </p>
              <p>
                As I&apos;ve asked you to be mindful of seeking God as you work through this Guide, know that the real-life Cat and Little Preacher remained faithful to that practice for as long as they lived. I got to see it firsthand, since they were my parents. And they made an amazing difference in this world, and I know you can as well.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Button href="https://www.amazon.com/Journey-Light-Bible-Companion-Chronicles/dp/1735359661/">
                Get Your Copy Today <BookOpen className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Purchase CTA */}
      <Section 
        className="bg-gradient-to-br from-secondary to-secondary/80"
        id="purchase-cta"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-primary-dark text-3xl md:text-4xl font-display mb-6">Begin Your Spiritual Journey Today</h2>
              <p className="text-primary-dark text-lg mb-8">
                Deepen your understanding of faith through adventure and imagination with this unique Bible study companion to the Cat Luker series.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://www.amazon.com/Journey-Light-Bible-Companion-Chronicles/dp/1735359661/" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Purchase on Amazon</h3>
                    <p className="text-sm opacity-80">Available in paperback format</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="/cat-luker-dark-clock" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <BookOpen size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Explore Cat Luker</h3>
                    <p className="text-sm opacity-80">Discover the story that inspired this guide</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="/contact" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <Gift size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Request Group Materials</h3>
                    <p className="text-sm opacity-80">Get resources for your youth group or classroom</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative w-[250px] h-[375px] mx-auto transform rotate-6 transition-all hover:rotate-0 duration-300">
                <Image 
                  src="/images/journeycover.jpg" 
                  alt="A Journey to the Light Bible Study Guide Cover" 
                  fill
                  className="object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
} 