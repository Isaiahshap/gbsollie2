'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, CheckCircle, Download, Pause } from 'lucide-react';
import NewsletterModal from '@/components/ui/NewsletterModal';

export default function MothersPage() {
  // State for audio player
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // State for carpool recording player
  const [isCarPoolPlaying, setIsCarPoolPlaying] = useState(false);
  const carPoolAudioRef = useRef<HTMLAudioElement>(null);
  
  // State for newsletter modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Function to toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Pause carpool audio if it's playing
        if (isCarPoolPlaying && carPoolAudioRef.current) {
          carPoolAudioRef.current.pause();
          setIsCarPoolPlaying(false);
        }
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Function to toggle carpool audio play/pause
  const toggleCarPoolAudio = () => {
    if (carPoolAudioRef.current) {
      if (isCarPoolPlaying) {
        carPoolAudioRef.current.pause();
      } else {
        // Pause main audio if it's playing
        if (isPlaying && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        carPoolAudioRef.current.play();
      }
      setIsCarPoolPlaying(!isCarPoolPlaying);
    }
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <div className="min-h-screen overflow-x-hidden font-body bg-gray-50">
        {/* Custom header */}
        <header className="pt-8 pb-6 bg-white border-b border-gray-100">
          <div className="container-custom">
            <Link href="/" className="block mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display text-primary">G.B. Sollie</h1>
            </Link>
          </div>
        </header>

        <main>
          {/* Hero Section - deep blue background */}
          <section className="py-12 relative overflow-hidden bg-primary text-white">
            <div className="absolute inset-0 opacity-10 bg-[url('/images/hero-bg.png')] bg-cover bg-center"></div>
            <div className="container-custom relative z-10">
              <motion.div 
                className="max-w-4xl mx-auto text-center"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  Embark on a Faith-Filled Adventure with Cat Luker!
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  A Christian Fantasy Novel That Sparks Imagination and Strengthens Faith, for Kids 9 to 13.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                  <Image 
                    src="/images/Catlukercover.png"
                    alt="Cat Luker: The Swamp Witch Chronicles book cover featuring three children standing in a mystical swamp with magical elements and vintage 1930s styling"
                    width={180}
                    height={250}
                    className="rounded-lg shadow-lg book-card-glow"
                  />
                  <a 
                    href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3 px-6 text-lg font-bold w-full sm:w-auto"
                  >
                    Get Your Copy Today
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Story Origin Section */}
          <section className="py-12 bg-white">
            <div className="container-custom">
              <motion.div 
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn} className="order-2 md:order-1">
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-primary mb-4">A Story Born from Carpool Rides</h2>
                  <p className="text-lg text-accent font-medium mb-4">Rest assured it is kid-tested and age appropriate!</p>
                  <div className="prose text-primary-light">
                    <p className="mb-4"><span className="font-bold text-accent">Cat Luker:</span> The Swamp Witch Chronicles began as stories I told my grandkids during our daily school carpools. These tall-tales, filled with excitement and important lessons, have evolved into a Christian fantasy adventure series that you and your child can now enjoy.</p>
                    <p className="mb-4">The story is packed with heart, faith, and biblical themes that will speak to your child&apos;s imagination and guide their spiritual growth.</p>
                    <p className="font-display italic text-lg text-primary">It&apos;s not just a book—it&apos;s an adventure that teaches timeless truths.</p>
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="order-1 md:order-2">
                  <div className="bg-gray-50 rounded-whimsical p-6 shadow-lg border border-primary/10">
                    <h3 className="font-display text-center text-primary mb-3">&quot;Listen to the love this book is built upon!&quot;</h3>
                    <div 
                      className="aspect-video bg-primary/10 rounded-md relative flex items-center justify-center cursor-pointer group"
                      onClick={toggleCarPoolAudio}
                    >
                      <Image
                        src="/images/grandkids.jpg"
                        alt="G.B. Sollie with grandkids"
                        fill
                        className="object-cover rounded-md group-hover:opacity-60 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/30 rounded-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                          {isCarPoolPlaying ? 
                            <Pause className="h-8 w-8 text-primary" /> : 
                            <Play className="h-8 w-8 text-primary" />
                          }
                        </div>
                      </div>
                      
                      {/* Hidden carpool audio element */}
                      <audio 
                        ref={carPoolAudioRef}
                        src="/recordings/carpool.m4a" 
                        onEnded={() => setIsCarPoolPlaying(false)}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <a 
                      href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary py-3 px-6"
                    >
                      Get Your Copy Today
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
                className="text-center mb-12"
              >
                <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                  Why Families Love Cat Luker
                </motion.h2>
              </motion.div>

              <motion.div 
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                {[
                  {
                    title: "Christian Fantasy Adventure",
                    description: "A unique blend of imagination and faith that will challenge your mind and heart!"
                  },
                  {
                    title: "Beautiful Illustrations",
                    description: "Hand-drawn pen and ink illustrations that bring the adventure to life. It starts with the cover, a great scene from the book!"
                  },
                  {
                    title: "Perfect for Family Reading",
                    description: "Great for bedtime stories or family book clubs and Bible Study Groups. It brings joy and adrenalin to kids, young and old!"
                  },
                  {
                    title: "Audiobook with Sound Effects",
                    description: "An immersive listening experience, narrated by Grammy-winning Monroe Jones. Like a movie in your mind!"
                  },
                  {
                    title: "Biblical Themes",
                    description: "Stories of courage, redemption, and faith that will resonate with young readers. A symbolic classic of Good versus Evil, like Narnia!"
                  },
                  {
                    title: "Amazing Characters",
                    description: "Who will make you laugh, think, and maybe even cheer out loud."
                  }
                ].map((feature, index) => (
                  <motion.div 
                    key={index}
                    variants={fadeIn}
                    className="bg-white rounded-whimsical p-6 shadow-md hover:shadow-lg transition-shadow border border-primary/10"
                  >
                    <h3 className="text-xl font-display font-bold text-primary mb-3">{feature.title}</h3>
                    <p className="text-primary-light">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center mt-12">
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-3 px-8 text-lg"
                >
                  Order Now
                </a>
              </div>
            </div>
          </section>

          {/* Audiobook Section */}
          <section className="py-12 bg-primary text-white">
            <div className="container-custom">
              <motion.div 
                className="grid md:grid-cols-2 gap-8 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeIn}>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    Listen to Cat Luker in a Whole New Way
                  </h2>
                  <p className="mb-4">
                    Transform the adventure into a full experience with our dramatized audiobook! With sound effects, music, and professional narration by Grammy-winning Monroe Jones, your child will be transported into a world of fantasy and faith.
                  </p>
                  <p className="mb-4">
                    Perfect for road trips, quiet afternoons, or just when you need a break from reading aloud. Believe me, it is absolutely enchanting!
                  </p>
                  <p className="mb-4">
                    Click below to hear an exclusive preview of the audiobook! This segment is a scene depicted on the book cover.
                  </p>
                  <div className="mt-6">
                    <button 
                      onClick={toggleAudio}
                      className="bg-secondary text-primary-dark px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-secondary-light transition-colors"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />} 
                      {isPlaying ? 'Pause Preview' : 'Play Preview'}
                    </button>
                    
                    {/* Hidden audio element */}
                    <audio 
                      ref={audioRef}
                      src="/recordings/audiobook.m4a" 
                      onEnded={() => setIsPlaying(false)}
                      className="hidden"
                    />
                  </div>
                </motion.div>
                
                <motion.div variants={fadeIn} className="flex justify-center">
                  <div className="relative w-full max-w-xs aspect-square">
                    <Image
                      src="/images/audiocover.png"
                      alt="Cat Luker Audiobook"
                      fill
                      className="object-contain book-card-glow"
                    />
                  </div>
                </motion.div>
              </motion.div>

              <div className="text-center mt-12">
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T/ref=tmm_aud_swatch_0"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary text-primary-dark px-8 py-3 rounded-full font-bold hover:bg-secondary-light transition-colors"
                >
                  Get the Audiobook Now
                </a>
              </div>
            </div>
          </section>

          {/* Full Experience Section */}
          <section id="order" className="py-12 bg-white">
            <div className="container-custom">
              <motion.div
                className="max-w-4xl mx-auto text-center mb-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                  Get the Full Experience: The Book + Audiobook Duo
                </h2>
              </motion.div>

              <motion.div 
                className="bg-gray-50 rounded-whimsical p-8 border border-primary/10 shadow-lg"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="text-secondary mt-1"><CheckCircle /></span>
                        <p className="text-primary-dark">The illustrated edition of the book is a perfect companion to the amazing sounds of the audiobook and vice-versa! Visuals and sound effects take you there.</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary mt-1"><CheckCircle /></span>
                        <p className="text-primary-dark">And get the companion Bible Study Guide – A Journey to the Light (downloadable PDF), for FREE! (A $9.95 value when purchased as a print book on Amazon) Please accept this as complimentary gift, regardless of Duo purchase.</p>
                      </li>
                    </ul>
                    
                    <div className="mt-6">
                      <p className="font-display text-lg text-primary font-bold">Why settle for one format when you can enjoy both? Get the printed book and audiobook together and enjoy Cat Luker in the way that works best for your family—whether reading or listening on-the-go!</p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="text-secondary font-bold">o</span>
                        <p className="text-primary-dark"><span className="font-bold">Printed Book:</span> Full of stunning illustrations, it&apos;s perfect for reading together at bedtime or in family book clubs.</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-secondary font-bold">o</span>
                        <p className="text-primary-dark"><span className="font-bold">Audiobook:</span> Dramatic narration, sound effects, and music bring the story to life.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-4">
                    <Image 
                      src="/images/Catlukercover.png"
                      alt="Cat Luker Book"
                      width={150}
                      height={220}
                      className="rounded-lg shadow-lg transform rotate-[-5deg] book-card-glow"
                    />
                    <div className="text-4xl font-bold text-primary">+</div>
                    <Image 
                      src="/images/audiocover.png"
                      alt="Cat Luker Audiobook"
                      width={150}
                      height={220}
                      className="rounded-lg shadow-lg transform rotate-[5deg] book-card-glow"
                    />
                  </div>
                </div>
                
                <div className="mt-8 text-center">
                  <a 
                    href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X/ref=tmm_pap_swatch_0"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary py-4 px-8 text-xl font-bold"
                  >
                    Order Your Duo Now
                  </a>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-12 bg-gray-50">
            <div className="container-custom">
              <motion.h2 
                className="text-3xl md:text-4xl font-display font-bold text-primary mb-8 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                What Families, Schools, and Churches Are Saying About Cat Luker
              </motion.h2>

              <motion.div 
                className="grid md:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {[
                  {
                    title: "A Middle Grade Reader",
                    quote: "Cat, Little Preacher, and Jane Alice felt like friends by the time I finished the book. It was an amazing adventure!",
                    author: "Lucy"
                  },
                  {
                    title: "A Mother's Feedback",
                    quote: "I enjoyed talking to my daughter about this story as she shared bits and pieces of the adventures. It has sparked questions about God and creation, and good versus evil. She loves Cat!",
                    author: "Whitney"
                  },
                  {
                    title: "Elementary School Educator",
                    quote: "I really, really hope there will be a sequel to Cat Luker. It was fantastic and I loved it. I plan to do a read aloud with my 4th and 5th grade library kids",
                    author: "Celise"
                  }
                ].map((testimonial, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white rounded-whimsical p-6 shadow-md hover:shadow-lg transition-shadow border border-primary/10"
                    variants={fadeIn}
                  >
                    <h3 className="text-xl font-display font-medium text-primary mb-2">{testimonial.title}</h3>
                    <p className="italic mb-4 text-primary-dark">&quot;{testimonial.quote}&quot;</p>
                    <p className="text-right font-bold text-primary">– {testimonial.author}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="mt-8 bg-white rounded-whimsical p-6 border border-primary/10 shadow-md"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <div className="relative w-full aspect-[3/4]">
                      <Image
                        src="/images/journeycover.jpg"
                        alt="A Journey to the Light Bible Study Guide"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-bold text-primary mb-2">A Journey to the Light</h3>
                    <p className="text-lg text-primary-dark mb-4">Bible Study Guide and companion to Cat Luker: The Swamp Witch Chronicles</p>
                    
                    <div className="bg-gray-50 p-4 rounded-md italic mb-4">
                      <p className="mb-2 text-primary-dark">&quot;It&apos;s really great! I think students who attend a study like this will really benefit from the ideas you lay out in the guide. So excited for you and the ways God is leading you through this project.&quot;</p>
                      <p className="font-bold text-primary">Cory Osborne</p>
                      <p className="text-sm text-primary-dark">MIDDLE SCHOOL :: MS Group Director</p>
                      <p className="text-sm text-primary-dark">Woodstock City Church</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-12 bg-accent text-white">
            <div className="container-custom">
              <motion.div 
                className="max-w-4xl mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeIn}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                      Want to See if Cat Luker is Right for Your Family?
                    </h2>
                    <p className="mb-6">
                      Download the First 22 Pages (FOREWORD, PROLOGUE, AND CHAPTER ONE) for FREE and get our Companion Bible Study Guide, A Journey to the Light (INTRODUCTION AND LESSON #1) for FREE, to start your family&apos;s adventure with Cat Luker. It&apos;s perfect for reading together and guiding discussions on faith, courage, and friendship.
                    </p>
                    <p className="mb-8">
                      Also! Enter to win our Box of Books Give-away, that includes 5 copies of Cat Luker and 5 copies of A Journey to the Light (Print Version of the Companion Bible Study Guide). Perfect for hosting neighborhood Book Club/Bible Study get-togethers ($125.00 Value).
                    </p>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center justify-center gap-2 bg-secondary text-primary-dark px-8 py-4 rounded-full font-bold mx-auto md:mx-0 hover:bg-secondary-light transition-colors"
                    >
                      <Download /> Download Both PDFs Now for Free
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <Image
                      src="/images/biblegroup.webp"
                      alt="Family Bible Study Group"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Custom footer just for the funnel page */}
          <footer className="bg-primary text-white py-8">
            <div className="container-custom">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-display font-bold mb-4">G.B. Sollie</h3>
                  <p className="text-white/80 max-w-md">
                    Children&apos;s fantasy author bringing magical adventures to young readers, 
                    where imagination knows no bounds.
                  </p>
                </div>
                <div className="flex flex-col md:items-end">
                  <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/" className="text-white/80 hover:text-white">Home</Link>
                    <Link href="/books" className="text-white/80 hover:text-white">Books</Link>
                    <Link href="/about" className="text-white/80 hover:text-white">About</Link>
                    <Link href="/contact" className="text-white/80 hover:text-white">Contact</Link>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-white/20 text-center">
                <p className="text-sm text-white/60">
                  &copy; {new Date().getFullYear()} G.B. Sollie. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
      
      {/* Newsletter Modal */}
      <NewsletterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Download Your Free Sample and Study Guide"
        description="Sign up to receive the first 22 pages of Cat Luker plus the matching Bible Study Guide lesson as a PDF, perfect for introducing the series to your family."
        downloadText="Download Combined PDFs"
        apiEndpoint="/api/subscribe-catluker"
      />
    </>
  );
} 