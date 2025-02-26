'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

export default function CatLukerDarkClockPage() {
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
            backgroundImage: 'url(/images/swamp-bg.jpg)',
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
                  Cat Luker: The Swamp Witch Chronicles
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  A tale of courage, friendship, and faith in 1930s Alabama
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button href="#read-excerpt" variant="primary">
                    Read Excerpt <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button href="https://amazon.com">
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
                  src="/images/book-cover.jpg" 
                  alt="Cat Luker: The Swamp Witch Chronicles Book Cover" 
                  fill
                  className="object-cover rounded-lg"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Book Overview */}
      <Section 
        className="bg-white"
        id="book-overview"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">The Adventure Begins</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:hidden relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
            <Image 
              src="/images/book-cover.jpg" 
              alt="Cat Luker: The Swamp Witch Chronicles Book Cover" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Set in 1930s rural Alabama during the Great Depression, this compelling tale follows three young friends—Cat, Little Preacher, and Jane Alice—as they band together to confront the mysterious Swamp Witch.
            </p>
            <p>
              When strange occurrences begin happening in their small town of Aimwell, the children&apos;s curiosity leads them into the heart of the swamp, where local legend claims a witch has lived for generations. Despite warnings from their parents and the fear gripping their community, the children&apos;s faith and determination drive them forward.
            </p>
            <p>
              This coming-of-age story tests their courage, strengthens their faith, and teaches valuable lessons about friendship, bravery, and trust in God.
            </p>
            <div className="not-prose mt-6">
              <h3 className="text-primary font-bold text-xl mb-4">Perfect For:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Young readers ages 8-12
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Family read-alouds
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Classroom discussions on historical fiction
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Faith-based learning environments
                </li>
              </ul>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px] w-full rounded-whimsical overflow-hidden shadow-xl">
            <Image 
              src="/images/alabama-1930s.jpg" 
              alt="Rural Alabama in the 1930s" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">Historical Setting</h3>
              <p className="text-sm">
                Experience the authentic atmosphere of Depression-era Alabama through rich descriptions and historically accurate details.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Excerpt */}
      <Section 
        className="bg-gray-50"
        id="read-excerpt"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Read an Excerpt</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-whimsical shadow-lg border border-gray-100">
            <h3 className="font-display text-2xl text-primary mb-6">Chapter One: The Whispers</h3>
            
            <div className="prose prose-lg">
              <p>
                A long time ago, at the bottom of the Great Depression, Cat Luker lived in the backwoods of Alabama, down a red dirt road on the edge of a little town called Aimwell...
              </p>
              <p>
                She had six brothers and a momma named Gertrude Leafy Flowers. Her daddy, Johnny Luker, was a farmer and worked for the county doing roadwork from time to time. The family lived in an old house that wasn&apos;t painted and needed work. Her daddy called it a shotgun. It had an open breezeway in the middle where Cat liked to read, daydream, and draw pictures for hours on end.
              </p>
              <p>
                The first time Cat heard about the Swamp Witch was on a sticky summer evening when the cicadas were singing so loud she could barely hear herself think. Her brother Buddy came running into the yard, his eyes wide as dinner plates.
              </p>
              <p>
                &quot;Cat!&quot; he hollered, nearly tripping over the old hound dog sleeping by the porch steps. &quot;Little Preacher says he saw smoke coming from the witch&apos;s cabin!&quot;
              </p>
              <p>...</p>
            </div>
            
            <div className="mt-8 text-center">
              <Button href="https://amazon.com">
                Continue Reading <BookOpen className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Reviews */}
      <Section 
        className="bg-primary text-white"
        id="reviews"
      >
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">What Readers Are Saying</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-whimsical">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-white/90 italic mb-4">
              &quot;As a middle school teacher, I&apos;m always looking for books that engage students while teaching important values. Cat Luker does both beautifully. My students can&apos;t get enough of this adventure!&quot;
            </p>
            <div className="text-secondary font-bold">
              — Mrs. Johnson, 5th Grade Teacher
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-whimsical">
            <div className="flex text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-white/90 italic mb-4">
              &quot;My children love reading about Cat, Little Preacher, and Jane Alice. The historical setting provides wonderful opportunities to discuss what life was like during the Great Depression, and the themes of courage and faith resonate with our family values.&quot;
            </p>
            <div className="text-secondary font-bold">
              — Michael T., Parent of two
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <Button href="https://amazon.com" variant="primary">
            See All Reviews on Amazon
          </Button>
        </div>
      </Section>

      {/* Purchase CTA */}
      <Section 
        className="bg-secondary"
        id="purchase-cta"
      >
        <div className="text-center">
          <h2 className="text-primary-dark mb-4">Begin Your Adventure Today</h2>
          <p className="text-primary-dark text-xl mb-8 max-w-2xl mx-auto">
            Join Cat Luker and friends on an unforgettable journey of courage, faith, and friendship.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              href="https://amazon.com"
              variant="secondary"
              size="lg"
              className="shadow-lg"
            >
              Buy on Amazon
            </Button>
            <Button 
              href="/contact"
              variant="outline"
              size="lg"
            >
              Request Signed Copy
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 