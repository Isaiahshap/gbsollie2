'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Gift, ShoppingBag, Star, Sparkles, Heart, Book, ArrowRight, Clock } from 'lucide-react';
import NewsletterModal from '@/components/ui/NewsletterModal';

// Optimized Snowflake component with GPU acceleration
const Snowflake = ({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) => {
  const xOffset = Math.random() * 30 - 15;
  
  return (
    <motion.div
      style={{
        position: 'absolute',
        left,
        top: '-20px',
        fontSize: `${size}px`,
        color: 'rgba(255, 255, 255, 0.7)',
        pointerEvents: 'none',
        willChange: 'transform, opacity',
      }}
      initial={{ 
        opacity: 0,
        y: 0,
      }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        y: 1000,
        x: xOffset,
        rotate: 180,
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        repeatDelay: 0,
      }}
    >
      ❄
    </motion.div>
  );
};

// Optimized Ornament decoration
const Ornament = ({ color, delay, top, left }: { color: string; delay: number; top: string; left: string }) => (
  <motion.div
    style={{
      position: 'absolute',
      width: '18px',
      height: '18px',
      backgroundColor: color,
      top,
      left,
      borderRadius: '50%',
      boxShadow: `0 0 12px ${color}`,
      willChange: 'transform',
    }}
    animate={{
      y: [0, 6, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export default function ChristmasGiftPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSnow, setShowSnow] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Delay snow start for better initial performance
  useEffect(() => {
    const snowTimer = setTimeout(() => {
      setShowSnow(true);
    }, 1000);

    return () => clearTimeout(snowTimer);
  }, []);

  // Countdown to Christmas
  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date('2025-12-25T00:00:00');
      const now = new Date();
      const difference = christmas.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Optimized Animated Snowfall - Delayed start */}
      {showSnow && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-50" style={{ willChange: 'transform' }}>
          {Array.from({ length: 15 }).map((_, i) => (
            <Snowflake
              key={`snow-${i}`}
              delay={i * 0.8}
              duration={10 + (i % 3) * 2}
              left={`${(i * 7) % 100}%`}
              size={14 + (i % 3) * 4}
            />
          ))}
        </div>
      )}

      {/* Candy Cane Decoration - Left Side */}
      <div className="fixed left-0 top-0 h-full w-32 md:w-48 pointer-events-none z-40 hidden lg:block" style={{ willChange: 'transform' }}>
        <Image
          src="/images/candycane.png"
          alt="Festive candy cane decoration"
          fill
          style={{ objectFit: 'contain', objectPosition: 'left center' }}
          priority={false}
          quality={75}
        />
      </div>

      {/* Candy Cane Decoration - Right Side */}
      <div className="fixed right-0 top-0 h-full w-32 md:w-48 pointer-events-none z-40 hidden lg:block" style={{ transform: 'scaleX(-1)', willChange: 'transform' }}>
        <Image
          src="/images/candycane.png"
          alt="Festive candy cane decoration"
          fill
          style={{ objectFit: 'contain', objectPosition: 'right center' }}
          priority={false}
          quality={75}
        />
      </div>

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/images/christmas1.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Lighter overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40" />
        
        {/* Floating ornaments */}
        <Ornament color="#DC2626" delay={0} top="15%" left="12%" />
        <Ornament color="#16A34A" delay={0.8} top="20%" left="88%" />
        <Ornament color="#EAB308" delay={1.6} top="75%" left="8%" />

        <div className="container mx-auto px-4 py-20 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Christmas Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full mb-8 shadow-lg"
            >
              <Gift className="text-red-600" size={24} />
              <span className="text-red-600 font-bold text-lg">Perfect Christmas Gift!</span>
              <Gift className="text-green-600" size={24} />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
              style={{
                textShadow: '0 0 30px rgba(220, 38, 38, 0.5), 0 0 60px rgba(22, 163, 74, 0.3)',
              }}
            >
              Give the Gift of
              <br />
              <span className="text-yellow-300">Adventure & Faith</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl mb-8 text-white font-semibold drop-shadow-lg"
            >
              The Perfect Present for Kids Ages 9-13
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-lg md:text-xl mb-12 text-white/95 max-w-3xl mx-auto drop-shadow-md"
            >
              This Christmas, give your child, grandchild, or student a magical adventure 
              that combines excitement with biblical values. Cat Luker&apos;s journey through 
              time will captivate young readers and strengthen their faith.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #DC2626, #991B1B)',
                  color: 'white',
                  padding: '20px 32px',
                  borderRadius: '9999px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  boxShadow: '0 20px 25px -5px rgba(220, 38, 38, 0.3)',
                  textDecoration: 'none',
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(220, 38, 38, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={28} />
                Order on Amazon Now
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </motion.a>

              <motion.button
                onClick={() => setIsModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #16A34A, #15803D)',
                  color: 'white',
                  padding: '20px 32px',
                  borderRadius: '9999px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  boxShadow: '0 20px 25px -5px rgba(22, 163, 74, 0.3)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(22, 163, 74, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Gift size={28} />
                Get Free Preview
                <motion.div
                  whileHover={{ rotate: 12 }}
                >
                  <Sparkles size={24} />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Countdown Timer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="mt-12 inline-block bg-white/95 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center gap-2 mb-3 justify-center">
                <Clock className="text-red-600" size={24} />
                <p className="text-red-600 font-bold text-lg">Time Until Christmas:</p>
              </div>
              <div className="flex gap-6 text-center">
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Minutes', value: timeLeft.minutes },
                  { label: 'Seconds', value: timeLeft.seconds },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="text-4xl font-bold text-green-700 mb-1">
                      {String(item.value).padStart(2, '0')}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold">{item.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why This Makes the Perfect Gift */}
      <section 
        className="relative py-20"
        style={{
          backgroundImage: 'url(/images/christmas2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40" />
        
        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 drop-shadow-lg">
              Why Parents & Grandparents Love This Gift
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Book size={48} />,
                title: 'Builds Faith',
                description: 'Biblical lessons woven into an exciting adventure that keeps kids reading.',
                color: 'from-red-500 to-red-600',
              },
              {
                icon: <Heart size={48} />,
                title: 'Age-Perfect',
                description: 'Perfectly crafted for ages 9-13 with appropriate themes and reading level.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: <Star size={48} />,
                title: 'Award-Winning',
                description: 'Acclaimed by parents, teachers, and young readers nationwide.',
                color: 'from-yellow-500 to-yellow-600',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-2xl"
              >
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${feature.color} text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Showcase */}
      <section className="relative py-20" style={{ background: 'linear-gradient(to bottom, #7f1d1d, #000000)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Book Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '2/3' }}>
                <div 
                  className="absolute -inset-4 rounded-3xl"
                  style={{
                    background: 'linear-gradient(135deg, #FBBF24, #DC2626, #16A34A)',
                    filter: 'blur(30px)',
                    opacity: 0.4,
                  }}
                />
                <div className="relative bg-white rounded-2xl overflow-hidden" style={{ width: '100%', height: '100%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                  <Image
                    src="/images/Catlukercover.png"
                    alt="Cat Luker: The Dark Clock - Perfect Christmas gift for ages 9-13"
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    quality={90}
                  />
                </div>
              </div>

              {/* Floating gift badge */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '-24px',
                  right: '-24px',
                  background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                  color: '#991B1B',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                  willChange: 'transform',
                }}
                animate={{ 
                  y: [0, -8, 0], 
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                🎁 Perfect Gift!
              </motion.div>
            </motion.div>

            {/* Book Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-white"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 drop-shadow-lg">
                Cat Luker: The Dark Clock
              </h2>
              <p className="text-xl mb-6 leading-relaxed drop-shadow-md">
                Join Cat and her friends on an unforgettable journey through time to 
                1930s French-speaking Alabama. This beautifully illustrated adventure 
                combines excitement, mystery, and powerful biblical lessons about 
                courage, faith, and friendship.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  '✨ Magical time-travel adventure',
                  '📖 Lexile 790L - Perfect for young readers',
                  '🎨 Stunning illustrations throughout',
                  '✝️ Biblical themes of faith and courage',
                  '🎯 Ideal for ages 9-13',
                  '📚 Start of an exciting series',
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-3 text-lg"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg" />
                    <span className="drop-shadow-md">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <motion.a
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                  color: '#991B1B',
                  padding: '20px 32px',
                  borderRadius: '9999px',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  boxShadow: '0 20px 25px -5px rgba(251, 191, 36, 0.3)',
                  textDecoration: 'none',
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.5)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingBag size={28} />
                Gift This Book Today
                <motion.div
                  whileHover={{ x: 5 }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bonus - Bible Study Guide */}
      <section className="relative py-20" style={{ background: 'linear-gradient(to bottom, #000000, #166534)' }}>
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-green-600 text-white px-6 py-3 rounded-full mb-6 font-bold text-lg shadow-lg">
                <Gift size={24} />
                SPECIAL CHRISTMAS BONUS
                <Gift size={24} />
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-4">
                Plus: FREE Bible Study Guide!
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Get a FREE downloadable Bible Study Guide when you sign up. Perfect for 
                youth groups, Sunday school, or family devotions!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
                <Image
                  src="/images/journeycover.jpg"
                  alt="A Journey to the Light - Free Bible Study Guide"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl shadow-xl"
                  sizes="(max-width: 768px) 100vw, 400px"
                  quality={85}
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">What&apos;s Included:</h3>
                <ul className="space-y-3 mb-8">
                  {[
                    'Chapter-by-chapter discussion questions',
                    'Biblical connections and lessons',
                    'Character study guides',
                    'Activities for youth groups',
                    'Family devotional prompts',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Star className="text-yellow-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700 text-lg">{item}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'linear-gradient(135deg, #16A34A, #15803D)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '9999px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    boxShadow: '0 20px 25px -5px rgba(22, 163, 74, 0.3)',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 25px 50px -12px rgba(22, 163, 74, 0.5)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={24} />
                  Download Free Guide
                  <motion.div
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section 
        className="relative py-20 overflow-hidden" 
        style={{
          background: 'repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 40px, #0f2818 40px, #0f2818 80px)',
        }}
      >
        {/* Black gradient overlay for center darkening */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 70%, transparent 100%)',
            zIndex: 1,
          }}
        />
        <div className="container mx-auto px-4 max-w-4xl text-center relative" style={{ zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 drop-shadow-lg">
              Give a Gift They&apos;ll Remember Forever
            </h2>
            <p className="text-2xl text-white/95 mb-12 drop-shadow-md">
              Order today and make this Christmas magical with adventure, faith, and friendship!
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
                  color: '#991B1B',
                  padding: '24px 40px',
                  borderRadius: '9999px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.5)',
                  textDecoration: 'none',
                }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 25px 50px -12px rgba(251, 191, 36, 0.7)',
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Gift size={32} />
                Order Your Gift Now
                <motion.div
                  whileHover={{ x: 8 }}
                >
                  <ArrowRight size={28} />
                </motion.div>
              </motion.a>
            </div>

            <p className="text-white/80 mt-8 text-lg">
              🎄 Free shipping available on Amazon Prime 🎄
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Modal */}
      <NewsletterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Get Your Free Bible Study Guide"
        description="Perfect for pairing with the Cat Luker book! Download your free guide and get exclusive updates on the series."
        downloadText="Download Free Guide"
        apiEndpoint="/api/subscribe"
      />

    </>
  );
}

