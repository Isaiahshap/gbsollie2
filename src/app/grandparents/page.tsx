'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Heart, Book, Award, CheckCircle, ShoppingBag, FileText, Gift, Sparkles, Clock } from 'lucide-react';
import NewsletterModal from '@/components/ui/NewsletterModal';

export default function GrandparentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-white font-body overflow-x-hidden">
      {/* Hero Section - Above the Fold */}
      <section className="relative bg-gradient-to-br from-[#102A5E] to-[#1a4080] text-white overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container-custom relative z-10 py-12 md:py-16 lg:py-20">
          {/* Logo/Branding */}
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-display text-secondary mb-2">G.B. Sollie</h3>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Headline & CTAs */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              {/* Badges Container */}
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-6">
                {/* Urgency Badge */}
                <div className="inline-flex items-center gap-2 bg-accent text-white px-5 py-2 rounded-full text-base md:text-lg font-bold shadow-xl animate-pulse">
                  <Gift size={20} />
                  <span>Perfect Holiday Gift</span>
                </div>

                {/* Age Badge - Prominent */}
                <div className="inline-flex items-center gap-2 bg-secondary text-primary-dark px-6 py-3 rounded-full text-xl md:text-2xl font-bold shadow-xl">
                  <Award size={28} />
                  <span>Ages 9–13</span>
                </div>
              </motion.div>

              <motion.h1 
                variants={fadeIn}
                className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6"
                style={{ lineHeight: '1.2' }}
              >
                A Meaningful Gift for Your Grandchild
              </motion.h1>

              <motion.p 
                variants={fadeIn}
                className="text-2xl md:text-3xl mb-6 text-white/95 font-medium leading-relaxed"
              >
                Southern time-travel adventure • Clean, faith-forward suspense
              </motion.p>

              {/* Value Props - Quick Scan */}
              <motion.div 
                variants={fadeIn}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-8 border border-white/20"
              >
                <div className="grid grid-cols-2 gap-4 text-base md:text-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span>Amazon Prime Eligible</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span>5★ Rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span>Hand-Illustrated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-secondary flex-shrink-0" />
                    <span>FREE Study Guide</span>
                  </div>
                </div>
              </motion.div>

              {/* Two Big Buttons */}
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6"
              >
                <a 
                  href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-secondary text-primary-dark px-8 md:px-10 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:bg-secondary-light transition-all duration-300 hover:scale-105"
                >
                  <ShoppingBag size={28} />
                  Buy on Amazon
                </a>
                
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 md:px-10 py-5 md:py-6 rounded-full text-xl md:text-2xl font-bold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <FileText size={28} />
                  Preview Free Chapter
                </button>
              </motion.div>

              {/* Trust Signal - Quick */}
              <motion.div variants={fadeIn} className="flex items-center justify-center lg:justify-start gap-3 text-base md:text-lg">
                <div className="flex text-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={24} fill="currentColor" />
                  ))}
                </div>
                <span className="font-semibold">Loved by families nationwide</span>
              </motion.div>
            </motion.div>

            {/* Right Column - Book Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center lg:items-end justify-center relative"
            >
              {/* Price Badge above Book */}
              <div className="bg-accent text-white px-6 py-3 rounded-full text-xl md:text-2xl font-bold shadow-2xl mb-4 animate-bounce">
                Under $15
              </div>
              
              <div className="relative w-full max-w-md aspect-[2/3] book-card-glow">
                <Image
                  src="/images/Catlukercover.png"
                  alt="Cat Luker: The Dark Clock - A Southern time-travel adventure for ages 9-13"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar - Immediate Social Proof */}
      <section className="bg-secondary py-6">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-primary-dark font-bold text-base md:text-lg">
            <div className="flex items-center gap-2">
              <Award size={24} />
              <span>Lexile Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Star size={24} fill="currentColor" />
              <span>5 Stars on Amazon</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart size={24} />
              <span>Faith-Based Content</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={24} />
              <span>Hand-Illustrated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Reviews */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center text-primary mb-4"
            >
              What Grandmothers Are Saying
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-center text-primary-light mb-12 max-w-3xl mx-auto"
            >
              Real reviews from grandparents just like you
            </motion.p>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {/* Review 1 */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/10 hover:shadow-xl transition-shadow"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-primary-dark mb-6 leading-relaxed">
                  &quot;My granddaughter couldn&apos;t put it down! We read it together over the summer, and it sparked such wonderful conversations about faith and courage.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Margaret S.</p>
                    <p className="text-primary-light text-sm">Grandmother of 3</p>
                  </div>
                </div>
              </motion.div>

              {/* Review 2 */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/10 hover:shadow-xl transition-shadow"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-primary-dark mb-6 leading-relaxed">
                  &quot;Finally, a book with wholesome values that&apos;s actually exciting! My grandson loved the adventure, and I loved the positive messages.&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Dorothy R.</p>
                    <p className="text-primary-light text-sm">Proud Grandmother</p>
                  </div>
                </div>
              </motion.div>

              {/* Review 3 */}
              <motion.div 
                variants={fadeIn}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-primary/10 hover:shadow-xl transition-shadow"
              >
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={22} fill="currentColor" />
                  ))}
                </div>
                <p className="text-lg md:text-xl text-primary-dark mb-6 leading-relaxed">
                  &quot;Perfect gift for that &apos;hard-to-buy-for&apos; age. My granddaughter keeps asking to read more. Worth every penny!&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="text-accent" size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-primary text-lg">Barbara T.</p>
                    <p className="text-primary-light text-sm">Nana to 5 grandkids</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* CTA after social proof */}
            <motion.div variants={fadeIn} className="text-center mt-12">
              <a 
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-accent text-white px-10 py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:bg-accent/90 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag size={28} />
                Order Your Copy on Amazon
              </a>
              <p className="mt-4 text-primary-light text-lg">
                <span className="inline-flex items-center gap-2">
                  <Clock size={18} />
                  Order today for fast delivery
                </span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Grandparents Love It */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-center text-primary mb-4"
            >
              Why Grandmothers Love This Book
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-center text-primary-light mb-12 max-w-3xl mx-auto"
            >
              The perfect way to bond with your grandchild through a shared adventure
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {/* Benefit 1 */}
              <motion.div 
                variants={fadeIn}
                className="text-center bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center shadow-lg">
                  <Book className="text-primary" size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Read-Together Friendly</h3>
                <p className="text-lg md:text-xl text-primary-dark leading-relaxed">
                  Perfect length and pacing for reading aloud. Create lasting memories and strengthen your bond through shared adventure.
                </p>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div 
                variants={fadeIn}
                className="text-center bg-gradient-to-br from-accent/5 to-transparent rounded-2xl p-6"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center shadow-lg">
                  <Heart className="text-accent" size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Values You Trust</h3>
                <p className="text-lg md:text-xl text-primary-dark leading-relaxed">
                  Clean, wholesome content with strong Christian values. No surprises—just positive messages you want your grandchildren to learn.
                </p>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div 
                variants={fadeIn}
                className="text-center bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl p-6"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-secondary" size={48} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">They&apos;ll Actually Finish It</h3>
                <p className="text-lg md:text-xl text-primary-dark leading-relaxed">
                  An exciting adventure that keeps kids turning pages! Time-travel, mystery, and heroes they&apos;ll root for from start to finish.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Comparison Section - NEW */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-secondary/10 to-accent/10">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-display font-bold text-center text-primary mb-12"
            >
              Compare the Value
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Other Gifts */}
              <motion.div variants={fadeIn} className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border-2 border-gray-300">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">Other Gifts</h3>
                <ul className="space-y-4 text-lg text-primary-dark">
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">✗</span>
                    <span>Toys: $20-50, forgotten in weeks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">✗</span>
                    <span>Video games: $60+, limited educational value</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gray-400 mt-1">✗</span>
                    <span>Gift cards: Impersonal, no bonding</span>
                  </li>
                </ul>
              </motion.div>

              {/* This Book */}
              <motion.div variants={fadeIn} className="bg-gradient-to-br from-accent to-accent/80 text-white rounded-2xl p-8 border-2 border-accent shadow-2xl relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-primary-dark px-6 py-2 rounded-full text-sm font-bold">
                  BEST VALUE
                </div>
                <h3 className="text-2xl font-bold mb-6 text-center">Cat Luker Book</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                    <span><strong>Under $15</strong> - Amazing value</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                    <span><strong>Lasting memories</strong> reading together</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                    <span><strong>Builds faith & character</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-secondary flex-shrink-0 mt-1" size={24} />
                    <span><strong>FREE Bible Study Guide via QR code</strong></span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div variants={fadeIn} className="text-center mt-10">
              <p className="text-2xl md:text-3xl font-bold text-primary mb-6">
                Less than the cost of lunch out—but the memories will last forever
              </p>
              <a 
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-5 rounded-full text-xl md:text-2xl font-bold shadow-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag size={28} />
                Get It Now on Amazon
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Additional Details - What's Inside */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left - Image of author with grandkids */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-secondary/20">
                <Image
                  src="/images/gregwkids.jpg"
                  alt="Author G.B. Sollie with grandchildren - the inspiration for Cat Luker"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 shadow-lg border border-primary/10">
                <p className="text-lg md:text-xl italic text-primary-dark leading-relaxed mb-4">
                  &quot;I wrote Cat Luker for my own grandchildren during our car rides to school. Those stories became this book—now families everywhere are creating the same special memories I share with my grandkids.&quot;
                </p>
                <p className="font-bold text-primary text-xl">— G.B. Sollie</p>
                <p className="text-primary-light">Author, Grandfather & Former Educator</p>
              </div>
            </motion.div>

            {/* Right - Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-8">
                What Makes This Book Special?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: <Award size={32} />,
                    title: "Hand-Drawn Illustrations",
                    description: "Beautiful pen and ink artwork throughout—kids love looking at the pictures!"
                  },
                  {
                    icon: <Book size={32} />,
                    title: "Historical Adventure",
                    description: "Set in 1930s rural Alabama with authentic Southern charm and mystery"
                  },
                  {
                    icon: <Heart size={32} />,
                    title: "Faith-Based Themes",
                    description: "Biblical lessons woven naturally into an exciting adventure about good vs. evil"
                  },
                  {
                    icon: <Star size={32} />,
                    title: "880L Reading Level",
                    description: "Lexile-certified for ages 9-13—challenging but accessible for developing readers"
                  },
                  {
                    icon: <Gift size={32} />,
                    title: "FREE Bible Study Guide",
                    description: "QR code in the book unlocks a companion Bible Study Guide—perfect for family discussions"
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-start bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-lg md:text-xl text-primary-dark">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Risk Reversal Section - NEW */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl md:text-3xl font-display font-bold text-primary mb-8">
              Order Risk-Free with Amazon&apos;s Easy Returns
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <ShoppingBag className="text-primary" size={32} />
                </div>
                <h4 className="font-bold text-primary text-xl mb-2">Amazon Guarantee</h4>
                <p className="text-primary-dark text-lg">Easy returns if you&apos;re not satisfied</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="text-primary" size={32} />
                </div>
                <h4 className="font-bold text-primary text-xl mb-2">Fast Delivery</h4>
                <p className="text-primary-dark text-lg">Prime eligible for 2-day shipping</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Gift className="text-primary" size={32} />
                </div>
                <h4 className="font-bold text-primary text-xl mb-2">Bonus Inside</h4>
                <p className="text-primary-dark text-lg">FREE Bible Study Guide via QR code</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#102A5E] to-[#1a4080] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 4 + 2 + 'px',
                height: Math.random() * 4 + 2 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.5 + 0.2,
              }}
            />
          ))}
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div 
              variants={fadeIn}
              className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-lg md:text-xl font-bold mb-4 shadow-xl"
            >
              <Gift size={24} />
              <span>Perfect Holiday Gift • Ages 9–13</span>
            </motion.div>

            <motion.h2 
              variants={fadeIn}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6"
            >
              Give a Gift They&apos;ll Remember Forever
            </motion.h2>

            <motion.p 
              variants={fadeIn}
              className="text-2xl md:text-3xl mb-10 leading-relaxed"
            >
              More than a book—it&apos;s an adventure you&apos;ll share together
            </motion.p>

            <motion.div 
              variants={fadeIn}
              className="mb-8"
            >
              <a 
                href="https://www.amazon.com/Dark-Clock-Luker-SWAMP-CHRONICLES/dp/173535967X"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-secondary text-primary-dark px-10 md:px-12 py-6 md:py-7 rounded-full text-2xl md:text-3xl font-bold shadow-2xl hover:bg-secondary-light transition-all duration-300 hover:scale-105"
              >
                <ShoppingBag size={32} />
                Buy on Amazon Now
              </a>
              <p className="mt-6 text-xl md:text-2xl font-semibold">
                Under $15 • FREE Study Guide Included
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-lg md:text-xl"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-secondary" />
                <span>Amazon Prime Eligible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-secondary" />
                <span>FREE Bible Study Guide</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={24} className="text-secondary" />
                <span>5★ Rated</span>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-10 pt-8 border-t border-white/20">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white/90 hover:text-white text-lg underline"
              >
                Want to preview first? Download a free chapter →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-8 bg-primary text-white/80 text-center">
        <div className="container-custom">
          <p className="text-lg mb-4">
            <strong className="text-white">G.B. Sollie</strong> • Author of Cat Luker: The Swamp Witch Chronicles
          </p>
          <p className="text-base">
            © {new Date().getFullYear()} G.B. Sollie. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Newsletter Modal for Preview */}
      <NewsletterModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Preview the First Chapter Free"
        description="Enter your email to receive the first 22 pages of Cat Luker, plus a FREE Bible Study Guide—perfect for sharing with your grandchild."
        downloadText="Send Me the Preview"
        apiEndpoint="/api/subscribe-catluker"
      />
    </div>
  );
}
