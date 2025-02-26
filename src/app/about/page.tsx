'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useTextReveal } from '@/lib/animations';

export default function AboutPage() {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  
  // Apply text reveal animation
  useTextReveal(quoteRef as React.RefObject<HTMLElement>);

  return (
    <>
      {/* Hero Section */}
      <Section 
        className="bg-primary text-white"
        id="about-hero"
        fullHeight
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-display mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About G.B. Sollie
            </motion.h1>
            <motion.div
              className="prose prose-lg prose-invert max-w-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-xl leading-relaxed">
                My journey as an author began with the stories I heard as a child, passed down through generations in Aimwell, Alabama. These tales of family, faith, and adventure shaped my worldview and eventually inspired the Cat Luker series.
              </p>
              <p>
                I believe that children&apos;s literature has the power to shape young minds and hearts, teaching them about courage, kindness, and the enduring power of love.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative rounded-whimsical overflow-hidden aspect-square shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image 
              src="/images/author-portrait.jpg" 
              alt="G.B. Sollie - Author Portrait" 
              fill
              className="object-cover"
              priority
            />
          </motion.div>
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
            If I could bottle-up what my dear parents meant to me and the impact they had on our family, and the impact their parents had on them; I would give it away. And this book is as close as I can come to doing that.
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
              src="/images/family-photo.jpg" 
              alt="G.B. Sollie with family" 
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p>
              My claim to fame is that Cat and Little Preacher Sollie raised me down in Dothan, Alabama, and I inherited a storytelling gene from my dad&apos;s father (Big Daddy, a.k.a. Preacher Sollie). My brothers, sisters, and I would pile into the family station wagon with our parents for trips to Aimwell as often as possible. With both sets of grandparents located there we would get loved unconditionally, fed like royalty for a few days, and then head home.
            </p>
            <p>
              I heard countless stories about Aimwell and the characters that inhabited Marengo County over the years. It gave me a sense of how my parents were raised and a burning appreciation for why they were so special. It also has become my mission to share that rearing recipe, that love, with others through these stories, because it is something too valuable to be lost.
            </p>
            <p>
              I have a bunch of grandkids, and counting, and I am reminded each day of how important this next generation will be.
            </p>
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
          <p className="lead text-xl">
            All they really had was love. My parents received it from theirs and they passed it down the line. And if I stop and think about it, there is no doubt that it extends all the way back to Jesus. That love was poured out on them like a river, and that generation washed themselves clean in the flow.
          </p>
          <p>
            I have been listening to a cleverly titled sermon series by Andy Stanley called, &quot;The Way - in the Manger&quot; and would like to extend that to the community where my parents were raised, and this book is set- Aimwell, Alabama. They embraced &quot;The Way - in the Manger&quot; philosophy, and it is reflected in this book series. I encourage you to take a long swig from that bottled-up gift and not look back.
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
              <p className="text-gray-700">{item.description}</p>
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