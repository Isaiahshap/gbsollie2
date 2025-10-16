'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Download, Mail, Facebook, Instagram, Youtube, Globe, FileText, BookOpen, Headphones } from 'lucide-react';
import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function MediaKitPage() {
  const downloadResources = [
    {
      name: 'Cat Luker Book Cover',
      file: '/mediakit/gb_cover.png',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'Image (PNG)',
    },
    {
      name: 'Audiobook Cover',
      file: '/mediakit/gb_audio_book.jpg',
      icon: <Headphones className="w-5 h-5" />,
      type: 'Image (JPG)',
    },
    {
      name: 'Journey to the Light Cover',
      file: '/mediakit/Journey.jpg',
      icon: <BookOpen className="w-5 h-5" />,
      type: 'Image (JPG)',
    },
    {
      name: 'Cat Luker Sample Chapters',
      file: '/mediakit/Cat_Luker_Sample.pdf',
      icon: <FileText className="w-5 h-5" />,
      type: 'PDF',
    },
    {
      name: 'Journey Activity Guide',
      file: '/mediakit/Journey_Lessons.pdf',
      icon: <FileText className="w-5 h-5" />,
      type: 'PDF',
    },
    {
      name: 'Complete Media Kit (PDF)',
      file: '/mediakit/mediakit.pdf',
      icon: <FileText className="w-5 h-5" />,
      type: 'PDF',
    },
  ];


  return (
    <>
      {/* Hero Section */}
      <Section 
        className="night-gradient relative overflow-hidden"
        id="media-kit-hero"
      >
        {/* Starry background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: '#fff',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 4 + 3}s ease-in-out infinite alternate`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-secondary mb-4 text-shadow-magical">
              Media & Press Kit
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Everything you need to know about G.B. Sollie and the Cat Luker series
            </p>
          </motion.div>
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
          }
        `}</style>
      </Section>

      {/* Author Bio Section */}
      <Section bgColor="bg-white" id="author-bio">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-whimsical overflow-hidden shadow-xl">
              <Image
                src="/mediakit/headshot_gb.jpg"
                alt="G.B. Sollie - Author Headshot"
                fill
                className="object-cover"
                priority
              />
            </div>
            <motion.a
              href="/mediakit/headshot_gb.jpg"
              download="GB_Sollie_Headshot.jpg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-4 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-whimsical text-sm font-medium shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Headshot
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-display text-primary mb-4">
              About the Author
            </h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-3">
                G.B. Sollie, affectionately known as the &quot;Carpool Grandaddy,&quot; is the author of{' '}
                <strong>Cat Luker: The Dark Clock</strong>, Book-1 of The Swamp Witch Chronicles series. 
                Born from stories told to his grandkids during school carpools, his writing blends fun 
                fantasy with Christian values.
              </p>
              <p className="text-gray-700 leading-relaxed font-medium">
                Raised in Dothan, Alabama, G.B. inherited a storytelling gene from his grandfather 
                (Big Daddy, a.k.a. Preacher Sollie). With a growing family of grandchildren, G.B. is 
                passionate about preserving values and love passed down through generations, sharing them 
                with young readers through captivating Christian fantasy adventures.
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* About the Book */}
      <Section className="bg-gray-50" id="about-book">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-6 text-center">
            About Cat Luker: The Dark Clock
          </h2>
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-whimsical shadow-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              Set in 1930s Alabama, <strong>Cat Luker: The Dark Clock</strong> follows Cat, Little 
              Preacher and Jane Alice as they face the mystery of the Swamp Witch. Blending adventure, 
              morality, and faith, the story helps families talk about courage and God&apos;s goodness.
            </p>
            <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
              <h3 className="font-bold text-primary mb-2">Features:</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Hand-drawn illustrations
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Bible study guide included
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Grammy-winner narrated audiobook
                </li>
                <li className="flex items-start">
                  <span className="text-secondary mr-2">✓</span>
                  Lexile 880L (ages 9-13)
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* Downloadable Resources */}
      <Section bgColor="bg-white" id="downloads">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-6 text-center">
            Downloadable Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {downloadResources.map((resource, index) => (
              <motion.a
                key={index}
                href={resource.file}
                download
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gray-50 p-4 rounded-whimsical border border-gray-200 hover:border-secondary"
                style={{ boxShadow: 'none' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    {resource.icon}
                  </div>
                  <Download className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-primary mb-1 text-sm">{resource.name}</h3>
                <p className="text-xs text-gray-600">{resource.type}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Media Assets & Links */}
      <Section className="bg-gray-50" id="media-links">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-display text-primary mb-6 text-center">
            Media Links & Contact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-whimsical border border-primary/20 shadow-sm">
              <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Links
              </h3>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://www.gbsollie.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-primary transition-colors underline"
                >
                  www.gbsollie.com
                </a>
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-primary transition-colors underline"
                >
                  Cat Luker on Amazon
                </a>
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-Swamp-Chronicles/dp/B0DFD1X33T" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-gray-700 hover:text-primary transition-colors underline"
                >
                  Audiobook on Audible
                </a>
              </div>
            </div>

            <div className="bg-white p-4 rounded-whimsical border border-secondary/30 shadow-sm">
              <h3 className="font-bold text-primary mb-3">Social Media</h3>
              <div className="space-y-2 text-sm">
                <a 
                  href="https://www.instagram.com/gbsollie_author/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  @gbsollie_author
                </a>
                <a 
                  href="https://www.facebook.com/people/GB-Sollie-Author/61573584629874/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  GB Sollie Author
                </a>
                <a 
                  href="https://youtu.be/JBg2c5LzfzU" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  YouTube Channel
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary to-primary-light p-6 rounded-whimsical shadow-lg text-white text-center">
            <h3 className="text-xl font-display mb-3">Press Contact</h3>
            <p className="mb-4">
              For media inquiries, interviews, or promotional opportunities
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-semibold mb-2">Yeshaya Shapiro</p>
              <a 
                href="mailto:yeshaya@yeshaya.dev"
                className="flex items-center justify-center gap-2 text-secondary hover:text-white transition-colors font-medium"
              >
                <Mail className="w-4 h-4" />
                yeshaya@yeshaya.dev
              </a>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* CTA Section */}
      <Section className="night-gradient relative overflow-hidden" id="media-kit-cta">
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: '#fff',
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-display text-secondary mb-6 text-shadow-magical">
            Let&apos;s Connect
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Interested in featuring G.B. Sollie or the Cat Luker series? We&apos;d love to hear from you!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg">
              Get in Touch
            </Button>
            <Button href="/books" variant="outline" size="lg">
              Explore the Books
            </Button>
          </div>
        </motion.div>
      </Section>
    </>
  );
}

