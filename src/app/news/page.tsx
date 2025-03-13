'use client';

import Image from 'next/image';
import Link from 'next/link';
import Section from '@/components/ui/Section';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight, Star, MegaphoneIcon } from 'lucide-react';

export default function NewsPage() {

  
  // Sample news items
  const newsItems = [
    {
      id: 1,
      title: "Cat Luker Series: Book One - The Dark Clock Illustrated Edition Available Now!",
      excerpt: "The first book in the exciting Cat Luker series has arrived! This beautifully illustrated edition of The Dark Clock follows Cat and friends on a thrilling time-travel adventure to French-speaking Alabama, blending historical fantasy with faith-based storytelling. Complete with a unique Bible study guide!",
      date: "April 15, 2023",
      readTime: "2 min read",
      category: "books",
      image: "/images/Catlukercover.png",
      featured: true
    },
    {
      id: 2,
      title: "Summer Reading Tour Announcement",
      excerpt: "Join G.B. Sollie on a nationwide summer reading tour! Coming to bookstores, libraries, and schools across the country.",
      date: "March 28, 2023",
      readTime: "3 min read",
      category: "events",
      image: "/images/gregwkids.jpg"
    },
    {
      id: 3,
      title: "A Journey to the Light Audiobook Released",
      excerpt: "Experience the magical journey in a whole new way with the professionally narrated audiobook, now available on all major platforms.",
      date: "February 12, 2023",
      readTime: "2 min read",
      category: "media",
      image: "/images/audiocover.png"
    },
    {
      id: 4,
      title: "Alabama Book Festival Appearance",
      excerpt: "G.B. Sollie will be a featured author at this year's Alabama Book Festival. Meet the author and get your books signed!",
      date: "January 30, 2023",
      readTime: "4 min read",
      category: "events",
      image: "/images/alabama.jpg"
    },
    {
      id: 5,
      title: "Faith in Literature Award Nomination",
      excerpt: "A Journey to the Light has been nominated for the prestigious Faith in Literature Award, celebrating works that inspire and uplift readers.",
      date: "December 15, 2022",
      readTime: "3 min read",
      category: "books",
      image: "/images/faith.jpg"
    },
    {
      id: 6,
      title: "Movie Adaptation in Development",
      excerpt: "Exciting news! The Cat Luker series has been optioned for a film adaptation. Stay tuned for more details as production begins.",
      date: "November 2, 2022",
      readTime: "5 min read",
      category: "media",
      image: "/images/moviecoverart.png"
    }
  ];
  
  // No need to filter news items anymore since there are no categories
  // const filteredNews = activeCategory === 'all' 
  //   ? newsItems 
  //   : newsItems.filter(item => item.category === activeCategory);
  
  // Get featured news item
  const featuredNews = newsItems.find(item => item.featured);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <>
      {/* Hero Section with playful elements */}
      <Section 
        className="bg-gradient-to-b from-primary to-primary-light text-white overflow-hidden relative py-16"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[15%] text-secondary opacity-70"
            animate={{ 
              y: [-10, 10, -10],
              transition: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Star size={40} fill="#F9D56E" strokeWidth={1} />
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-[20%] text-secondary opacity-80"
            animate={{ 
              y: [-15, 15, -15],
              transition: {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }
            }}
          >
            <Star size={30} fill="#F9D56E" strokeWidth={1} />
          </motion.div>
          <motion.div 
            className="absolute top-40 right-[10%] text-secondary opacity-70"
            animate={{ 
              rotate: [0, 360],
              transition: {
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-secondary/30"></div>
          </motion.div>
        </div>

        <motion.div 
          className="text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ rotate: -3 }}
            animate={{ rotate: 3 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-secondary drop-shadow-lg">
              News & Adventures!
            </h1>
          </motion.div>
          <p className="text-xl max-w-2xl mx-auto text-white/90 mb-8">
            Stay updated with the latest book releases, events, and behind-the-scenes peeks 
            into the magical worlds of G.B. Sollie!
          </p>
        </motion.div>
      </Section>

      {/* Featured news item - moved up after hero section */}
      {featuredNews && (
        <Section className="bg-white pt-8 pb-8">
          <motion.div 
            className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <span className="bg-secondary text-primary text-sm font-medium py-1 px-3 rounded-full">
                Featured
              </span>
              <span className="bg-purple-500 text-white text-sm font-medium py-1 px-3 rounded-full">
                Illustrated Edition
              </span>
            </div>
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-primary text-white text-sm font-bold py-1 px-3 rounded-full">
                Book One
              </span>
            </div>
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="aspect-w-16 aspect-h-9 md:aspect-none md:h-full">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="object-cover w-full h-full"
                    width={600}
                    height={400}
                  />
                </div>
              </div>
              <div className="p-6 md:w-1/2">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" /> {featuredNews.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" /> {featuredNews.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">{featuredNews.title}</h2>
                <p className="text-gray-700 mb-4">{featuredNews.excerpt}</p>
                <Link 
                  href={`/news/${featuredNews.id}`} 
                  className="inline-flex items-center font-medium text-primary hover:text-secondary transition-colors"
                >
                  Read the full story <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        </Section>
      )}

      {/* News grid - directly after featured or hero section */}
      <Section className="bg-white pb-16">
        {newsItems.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {newsItems
              .filter(item => !item.featured) // Only filter out featured items as we're already showing it above
              .slice(0, 3) // Limit to only 3 cards
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden h-full flex flex-col"
                  variants={itemVariants}
                >
                  <Link href={`/news/${item.id}`} className="block relative">
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full rounded-t-lg hover:scale-105 transition-transform duration-700"
                        width={600}
                        height={450}
                      />
                      {/* Show category as an elegant badge */}
                      <div className="absolute top-4 right-4">
                        <span className="inline-block bg-white/90 text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                          {item.category === 'books' ? 'Book News' : 
                           item.category === 'events' ? 'Events' : 
                           item.category === 'media' ? 'Media' : 'Update'}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1.5" /> {item.date}
                      </span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1.5" /> {item.readTime}
                      </span>
                    </div>
                    <Link href={`/news/${item.id}`} className="block group">
                      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">{item.excerpt}</p>
                    <Link 
                      href={`/news/${item.id}`} 
                      className="inline-flex items-center text-sm font-medium text-primary hover:text-secondary transition-colors mt-auto self-start px-4 py-2 bg-secondary/10 rounded-full"
                    >
                      Read more <ChevronRight size={16} className="ml-1.5" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">No news found. Check back soon!</p>
          </div>
        )}
      </Section>

      {/* Newsletter Section */}
      <Section className="bg-secondary py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-primary/10" 
            animate={{ 
              scale: [1, 1.1, 1],
              transition: { duration: 6, repeat: Infinity }
            }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-10 w-60 h-60 rounded-full bg-primary/10"
            animate={{ 
              scale: [1.1, 1, 1.1],
              transition: { duration: 6, repeat: Infinity }
            }}
          />
        </div>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-secondary">
              <MegaphoneIcon size={28} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-primary-dark mb-4">Never Miss an Update!</h2>
          <p className="text-primary-dark text-lg mb-8">
            Subscribe to the newsletter for exclusive content, early announcements, and special offers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-5 py-4 rounded-full text-black font-medium border-2 border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <motion.button 
              className="bg-primary text-white font-bold py-4 px-8 rounded-full"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
          <p className="text-xs text-primary-dark/70 mt-4">
            We respect your privacy and will never share your information.
          </p>
        </motion.div>
      </Section>
    </>
  );
} 