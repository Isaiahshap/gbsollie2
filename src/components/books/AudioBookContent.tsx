'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Download } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

export default function AudioBookContent() {
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
            backgroundImage: 'url(/images/audio-bg.jpg)',
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
                  Cat Luker: The Audio Experience
                </h1>
                <p className="text-xl opacity-90 mb-6">
                  Journey through 1930s Alabama with Monroe Jones&apos;s captivating narration
                </p>
                <div className="flex flex-wrap gap-4">

                  <Button href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.GRujj-iPyOYwXod2kg9_pkxaffPk-CsSbp_nR35nKqM.TbDH45EBK1Vh4av7v4y_DiyYSQUDv0U2ogGn68eFY-g&qid=1740608342&sr=8-1">
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
                  src="/images/audiocover.png" 
                  alt="Cat Luker: The Audio Experience Cover" 
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
        id="introduction"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">THE AUDIO EXPERIENCE</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-whimsical shadow-lg border border-gray-100">
            <div className="prose prose-lg text-black">
              <p>
                Immerse yourself in the world of 1930s rural Alabama through the voice of G.B. Sollie, bringing his own characters to life in this captivating audio adaptation.
              </p>
              <p>
                More than just a narration, this audio experience features subtle sound effects and ambient music that transport listeners directly into Cat Luker&apos;s world. From the chirping of birds in the Big Oak to the eerie sounds of the swamp, every detail has been carefully crafted.
              </p>
              <p>
                Whether you&apos;re a long-time fan of the Cat Luker series or discovering this magical world for the first time, the audio experience offers a fresh way to connect with these beloved characters and their timeless story of courage, faith, and friendship.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Audio Features Overview */}
      <Section 
        className="bg-white"
        id="audio-features"
      >
        <div className="text-center mb-12">
          <h2 className="text-primary mb-4">Experience the Magic</h2>
          <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="md:hidden relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
            <Image 
              src="/images/audiocover.png" 
              alt="Cat Luker: The Audio Experience Cover" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none text-black">
            <p>
              Step into the world of 1930s Alabama with this immersive audio experience narrated by author G.B. Sollie. Listen as the adventures of Cat, Little Preacher, and Jane Alice come alive through professional narration enhanced with ambient sounds and music.
            </p>
            <p>
              This is more than just an audiobook - it&apos;s a complete auditory journey that captures the essence of the original story while adding new dimensions through sound.
            </p>
            <div className="not-prose mt-6">
              <h3 className="text-primary font-bold text-xl mb-4">Audio Features:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Professional narration by grammy winner, Monroe Jones
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Authentic southern accents and character voices
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Ambient sound effects from the Alabama countryside
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mr-3 text-primary">✓</span>
                  Original musical score setting the perfect tone
                </li>
              </ul>
            </div>
          </div>
          
          <div className="hidden md:block relative h-[500px] w-full rounded-whimsical overflow-hidden shadow-xl">
            <Image 
              src="/images/drama.png" 
              alt="Dramatic audio experience" 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">Studio Quality</h3>
              <p className="text-sm">
                Recorded in a professional studio with high-quality equipment to ensure an immersive listening experience.
              </p>
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
              <h2 className="text-primary-dark text-3xl md:text-4xl font-display mb-6">Buy Your Audio Experience</h2>
              <p className="text-primary-dark text-lg mb-8">
                Experience this immersive audio journey through 1930s Alabama with Cat Luker and friends, available now on Amazon!
              </p>
              
              <div className="space-y-4">
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.GRujj-iPyOYwXod2kg9_pkxaffPk-CsSbp_nR35nKqM.TbDH45EBK1Vh4av7v4y_DiyYSQUDv0U2ogGn68eFY-g&qid=1740608342&sr=8-1" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <ShoppingBag size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Buy on Amazon</h3>
                    <p className="text-sm opacity-80">Available Now!</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
                
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.GRujj-iPyOYwXod2kg9_pkxaffPk-CsSbp_nR35nKqM.TbDH45EBK1Vh4av7v4y_DiyYSQUDv0U2ogGn68eFY-g&qid=1740608342&sr=8-1" 
                  className="group flex items-center bg-white text-primary hover:bg-primary hover:text-white transition-all duration-300 p-4 rounded-whimsical shadow-lg border-2 border-primary/20"
                >
                  <div className="bg-primary text-white p-3 rounded-full mr-4 group-hover:bg-white group-hover:text-primary transition-all">
                    <Download size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-lg">Listen on Audible</h3>
                    <p className="text-sm opacity-80">Stream or download through Amazon Audible</p>
                  </div>
                  <ArrowRight className="ml-auto transition-transform group-hover:translate-x-1" size={20} />
                </a>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative w-[250px] h-[375px] mx-auto transform rotate-6 transition-all hover:rotate-0 duration-300">
                <Image 
                  src="/images/audiocover.png" 
                  alt="Cat Luker: The Audio Experience Cover" 
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