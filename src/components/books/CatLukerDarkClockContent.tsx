'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ShoppingBag, Download, Gift } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

export default function CatLukerDarkClockContent() {
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
                  Cat Luker: The Dark Clock
                  <br/>
                </h1>
                <div className="mb-3">
                  <span className="bg-secondary text-primary-dark px-3 py-1 rounded-full text-sm font-bold shadow-md inline-block mr-2">Book One</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium inline-block">The Swamp Witch Chronicles</span>
                </div>
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
                <div className="absolute -top-5 -right-5 bg-secondary text-primary-dark px-4 py-2 rounded-full font-bold shadow-lg z-10 transform rotate-12">
                  Illustrated Edition!
                </div>
                <div className="absolute -top-5 left-5 bg-primary text-white px-4 py-2 rounded-full font-bold shadow-lg z-10">
                  Book One
                </div>
                <Image 
                  src="/images/Catlukercover.png" 
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

      {/* Foreword */}
      <Section 
        className="bg-white"
        id="foreword"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">FOREWORD</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-whimsical shadow-lg border border-gray-100">
            <div className="prose prose-lg text-black">
              <p>
                When I was approached about the possibility of
                narrating The Swamp Witch Chronicles, of course,
                I was honored to be considered for the task. But
                as I hadn&apos;t yet read the book, I prepared myself for the (almost)
                inevitable let-down. You see, after three decades of helping artists
                and bands bring their stories to life through the music they create
                and engaging in all of the &quot;art-meets-commerce&quot; battles along the
                way, it&apos;s hard to emerge from those experiences without baggage.
              </p>
              <p>
                I can be cynical and jaded. I remained hopeful that there might
                be something inspiring out there to throw myself into, but more
                often than not—you get it. So, proceeding cautiously with all the
                mechanisms in place to protect myself from disappointment and
                armed with questions like, &quot;What if there&apos;s nothing there? What
                if I have nothing to bring to the project?&quot; I waded in.
              </p>
              <p>
                In my process, I first look for the story. Whether it&apos;s music,
                a book, or a painting—anything, really—there&apos;s always a story.
                In the case of The Swamp Witch Chronicles—box checked. It&apos;s an
                adventure/fantasy involving three kids from rural 1930s Alabama,
                enthralled in an epic battle of good vs. evil. As I read, my mind was
                filled with images of classics like The Chronicles of Narnia mixed
                with the folksiness of The Adventures of Tom Sawyer. Everything a
                middle-grade reader could ask for. But, as with any great surface
                story, there&apos;s also something more profound, something bigger,
                lurking underneath.
              </p>
              <br/>
              
              <p className="font-bold text-right">
                Monroe Jones<br/>
                Grammy Award-winning Producer
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Book Overview */}
      <Section 
        className="bg-white"
        id="book-overview"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">The Adventure Begins</h2>
          <p className="text-lg text-gray-600">Book One in the Cat Luker Series</p>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:hidden relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
            <Image 
              src="/images/Catlukercover.png" 
              alt="Cat Luker: The Swamp Witch Chronicles Book Cover" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-black">
            <p>
              At the bottom of the Great Depression in 1930s rural Alabama, three young friends- Cat, Little Preacher, and Jane Alice- form a secret alliance to do battle with the Swamp Witch. After a dare from her brothers, Cat comes face-to-face with the mysterious witch and barely escapes her clutches. Afraid of what she has found, she enlists her two friends on a mission to save their small town from the evil lurking in the swamp.
            </p>
            <p>
              This beautifully <strong>illustrated time-traveling adventure</strong> takes readers back to a forgotten era of French-speaking Alabama. As our heroes journey through time, they discover historical secrets and face challenges that test their faith and courage. This coming-of-age morality tale interweaves historical fantasy with spiritual growth as the children call on God for deliverance.
            </p>
            <div className="not-prose mt-6">
              <h3 className="text-primary font-bold text-xl mb-4">Perfect For:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Young readers ages 9-13
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
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Fans of time travel and historical fantasy
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Series readers looking for a new fantasy adventure
                </li>
              </ul>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px] w-full rounded-whimsical overflow-hidden shadow-xl">
            <Image 
              src="/images/alabama.jpg" 
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
            <h3 className="font-display text-4xl text-primary mb-6 text-center">Chapter One: The Dare</h3>
            
            <div className="prose prose-lg text-black">
              <p className="italic mb-6">
                Many have tried to record what happened in that God-forsaken swamp, just as it was handed down from the beginning by those with first-hand knowledge. With this in mind, since I myself have carefully investigated everything, it seemed a good idea for me to write an orderly account for you, most dear Catherine. My prayer is that others may know with certainty the wonderous things that you have done for your beloved.
              </p>
              <p>
                A long time ago, at the bottom of the Great Depression, Cat
                Luker lived in the backwoods of Alabama, down a red dirt road on
                the edge of a little town called Aimwell. She had six brothers and
                a momma named Gertrude Leafy Flowers. Her daddy, Johnny
                Luker, was a farmer and worked for the county doing roadwork
                from time to time. The family lived in an old house that wasn&apos;t
                painted and needed work. Her daddy called it a shotgun. It had an
                open breezeway in the middle where Cat liked to read, daydream,
                and draw pictures for hours on end. She was only ten years old
                but was already a talented, natural artist with a vivid imagination.
              </p>
              <p>
                Her brothers—Otto, Cecil, Raymond, John, James, and
                Curtis—called her Sister but all her friends called her Cat. She
                had long, wavy, black hair and green eyes, and her nickname fit
                her to a tee.
              </p>
            </div>
            
            <div className="mt-8 text-center">
              <Button href="https://amazon.com">
                Continue Reading <BookOpen className="ml-2" size={18} />
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
              <h2 className="text-primary-dark text-3xl md:text-4xl font-display mb-6">Begin Your Adventure Today</h2>
              <p className="text-primary-dark text-lg mb-8">
                Start the Cat Luker series with Book One: The Dark Clock. Join Cat and friends on an unforgettable journey through time to French-speaking Alabama in this beautifully illustrated adventure of courage, faith, and friendship.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Purchase on Amazon</h3>
                    <p className="text-sm opacity-80">Available in hardcover, paperback, and Kindle</p>
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
                    <h3 className="font-bold text-lg">Request a Signed Copy</h3>
                    <p className="text-sm opacity-80">The perfect gift for young readers</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="/audio-book" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <Download size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Audio Book</h3>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative w-[250px] h-[375px] mx-auto transform rotate-6 transition-all hover:rotate-0 duration-300">
                <Image 
                  src="/images/Catlukercover.png" 
                  alt="Cat Luker: The Swamp Witch Chronicles Book Cover" 
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