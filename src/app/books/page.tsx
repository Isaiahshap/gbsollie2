'use client';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import { ArrowRight, Star, BookOpen, ShoppingBag } from 'lucide-react';

export default function BooksPage() {
  return (
    <>
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden" id="books-hero">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/images/cem.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-primary/70"></div>
        
        {/* Bottom gradient for seamless transition to starry background */}
        <div 
          className="absolute bottom-0 left-0 right-0 z-10" 
          style={{ 
            height: '100px', 
            background: 'linear-gradient(to bottom, transparent, #081020)',
          }}
        ></div>
        
        {/* Content */}
        <div className="relative h-full z-10 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display mb-8 text-white drop-shadow-lg">
              Explore My Books
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto text-white drop-shadow-md font-medium">
              Embark on magical adventures through the pages of G.B. Sollie&apos;s captivating series for young readers.
            </p>
          </div>
        </div>
      </div>
      
      <Section
        className="bg-[#081020] relative overflow-hidden"
        id="book-list"
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

          {/* Gradient overlay to ensure cards are readable */}
          <div 
            className="absolute inset-0" 
            style={{
              background: "radial-gradient(circle at center, rgba(16, 42, 94, 0.3) 0%, rgba(8, 16, 32, 0.4) 100%)"
            }}
          ></div>
        </div>

        <div className="grid grid-cols-1 gap-16 relative z-10">
          {/* Cat Luker: The Swamp Witch Chronicles */}
          <div className="rounded-whimsical bg-white p-8 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all duration-300 border-4 border-secondary shadow-[0_0_15px_rgba(249,213,110,0.3)]">
            <div className="w-full md:w-1/4 flex-shrink-0">
              <div className="relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
                <Image 
                  src="/images/Catlukercover.png" 
                  alt="Cat Luker: The Swamp Witch Chronicles" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center mb-3">
                <h3 className="text-3xl text-primary font-bold mr-4">Cat Luker: The Swamp Witch Chronicles</h3>
                <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                  Featured
                </div>
              </div>
              <h2 className="text-primary font-bold text-xl mb-4">Book 1 - The Dark Clock</h2>
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Set in 1930s rural Alabama during the Great Depression, this compelling tale follows three young friends—Cat, Little Preacher, and Jane Alice—as they travel back in time and confront the mysterious Swamp Witch. When strange occurrences begin happening in their small town of Aimwell, the children&apos;s curiosity leads them into the heart of the swamp, where local legend claims a witch has lived for generations.
              </p>
              <p className="text-gray-700 mb-6">
                This coming-of-age story tests their courage, strengthens their faith, and teaches valuable lessons about friendship, bravery, and trust in God.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/cat-luker-dark-clock" variant="primary">
                  Read More <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                  variant="primary"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Buy Now <ShoppingBag className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* A Journey to the Light */}
          <div className="rounded-whimsical bg-white p-8 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all duration-300 border-4 border-secondary shadow-[0_0_15px_rgba(249,213,110,0.3)]">
            <div className="w-full md:w-1/4 flex-shrink-0">
              <div className="relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <p className="text-primary font-bold">Coming Soon</p>
                </div>
                <Image 
                  src="/images/journeycover.jpg" 
                  alt="A Journey to the Light" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl text-primary font-bold mb-4">A Journey to the Light</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Join Cat and her friends on a spiritual adventure as they discover the meaning of hope in the darkest of times. This new extension to the Cat Luker series delves deeper into themes of faith, perseverance, and the power of friendship.
              </p>
              <p className="text-gray-700 mb-6">
                This book is available in print form on Amazon and as an eBook, but please note that because it has a textbook format it is not available on Kindle. You can read it on other devices, such as tablets and smartphones (see full list on Amazon).
              </p>
              <p className="text-gray-700 mb-6">
                Join the newsletter to be the first to know more about the book and receive exclusive content and special offers. We are in the process of producing an online Bible Study video series for example.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/a-journey-to-the-light" variant="primary">
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button 
                  href="https://www.amazon.com/Journey-Light-Bible-Companion-Chronicles/dp/1735359661/" 
                  variant="primary"
                  className="bg-primary text-white  hover:bg-primary/90"
                >
                  Buy Now <ShoppingBag className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </div>

          {/* Cat Luker: The Audio Experience */}
          <div className="rounded-whimsical bg-white p-8 flex flex-col md:flex-row gap-8 hover:shadow-lg transition-all duration-300 border-4 border-secondary shadow-[0_0_15px_rgba(249,213,110,0.3)]">
            <div className="w-full md:w-1/4 flex-shrink-0">
              <div className="relative w-full aspect-[2/3] rounded-whimsical overflow-hidden shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-sm">
                  <p className="text-primary font-bold">Coming Soon</p>
                </div>
                <Image 
                  src="/images/audiocover.png" 
                  alt="Cat Luker: The Audio Experience" 
                  fill
                  className="object-fill"
                />
              </div>
            </div>
            <div className="flex-grow">
              <h3 className="text-3xl text-primary font-bold mb-4">Cat Luker: The Audio Experience</h3>
              <p className="text-gray-700 mb-6 text-lg">
                Experience the magic of Cat Luker through the voice of grammy winner, Monroe Jones. This audio adaptation brings the world of 1930s Aimwell to life with professional narration, sound effects, and music.
              </p>
              <p className="text-gray-700 mb-6">
                Perfect for road trips, bedtime stories, or simply enjoying the adventure in a new way. The audio version makes the Cat Luker experience accessible to children of all reading levels.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button href="/audio-book" variant="primary">
                  Learn More <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0?_encoding=UTF8&dib_tag=se&dib=eyJ2IjoiMSJ9.GRujj-iPyOYwXod2kg9_pkxaffPk-CsSbp_nR35nKqM.TbDH45EBK1Vh4av7v4y_DiyYSQUDv0U2ogGn68eFY-g&qid=1740608342&sr=8-1" 
                  variant="primary"
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Buy Now <ShoppingBag className="ml-2" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Add keyframes for the twinkling effect */}
        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}</style>
      </Section>

      {/* Call to Action */}
      <Section 
        className="bg-secondary"
        id="books-cta"
      >
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-primary-dark mb-6">Share the Adventure</h2>
          <p className="text-xl text-primary-dark/90 mb-8">
            G.B. Sollie&apos;s books make perfect gifts for young readers who love adventure, mystery, and stories that celebrate faith and family values.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg" className="bg-primary text-white hover:bg-primary/90">
              Request Signed Copy <BookOpen className="ml-2" size={18} />
            </Button>
            <Button href="/about" variant="primary" size="lg" className="bg-primary text-white hover:bg-primary/90">
              About the Author
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
} 