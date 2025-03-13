'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Star, Cloud, Sun, Moon } from 'lucide-react';

import Section from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // This would be replaced with actual form submission logic
    try {
      // Simulated success
      setIsSubmitted(true);
    } catch {
      // Simulated failure
      setErrorMessage('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const floatingAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
      }
    }
  };

  const popAnimation = {
    initial: { scale: 0 },
    animate: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <>
      {/* Hero Section with playful cloud background */}
      <Section 
        className="bg-gradient-to-b from-primary to-primary-light text-white overflow-hidden relative py-16"
        id="contact-hero"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-10 left-[10%] text-secondary opacity-70"
            {...floatingAnimation}
          >
            <Star size={40} fill="#F9D56E" strokeWidth={1} />
          </motion.div>
          <motion.div 
            className="absolute top-20 right-[15%] text-secondary opacity-80"
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
            className="absolute bottom-10 right-[20%] text-secondary opacity-70"
            animate={{ 
              y: [-8, 8, -8],
              transition: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }
            }}
          >
            <Star size={25} fill="#F9D56E" strokeWidth={1} />
          </motion.div>
          <motion.div 
            className="absolute top-32 left-[20%] text-white opacity-30"
            animate={{ 
              x: [10, 30, 10],
              transition: {
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Cloud size={80} />
          </motion.div>
          <motion.div 
            className="absolute bottom-20 left-[15%] text-white opacity-20"
            animate={{ 
              x: [30, -20, 30],
              transition: {
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }
            }}
          >
            <Cloud size={100} />
          </motion.div>
        </div>

        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-block mb-6"
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-2 text-secondary drop-shadow-lg">
              Let&apos;s Chat!
            </h1>
          </motion.div>
          <p className="text-xl max-w-2xl mx-auto text-white/90 mb-8">
            Have questions about my magical books, want to schedule an author visit, 
            or just want to say hello? I&apos;d love to hear from you!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="#contact-form" 
              className="inline-block bg-secondary text-primary font-bold px-8 py-4 rounded-whimsical transform transition-transform hover:shadow-lg"
            >
              Jump to Contact Form
            </a>
          </motion.div>
        </motion.div>
      </Section>

      {/* Contact Information with playful cards */}
      <Section 
        className="bg-white py-16"
        id="contact-info"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Mail size={28} />,
              title: 'Email Me',
              info: 'contact@gbsollie.com',
              link: 'mailto:contact@gbsollie.com',
              color: 'bg-secondary'
            },
            {
              icon: <Phone size={28} />,
              title: 'Call Me',
              info: '(555) 123-4567',
              link: 'tel:+15551234567',
              color: 'bg-accent'
            },
            {
              icon: <MapPin size={28} />,
              title: 'Find Me',
              info: 'Georgia, United States',
              link: null,
              color: 'bg-primary'
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`${item.color} p-6 rounded-whimsical shadow-lg hover:shadow-xl transition-shadow text-center transform`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { duration: 0.2 }
              }}
            >
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <div className={`text-${item.color === 'bg-secondary' ? 'primary' : (item.color === 'bg-primary' ? 'primary' : 'accent')}`}>
                  {item.icon}
                </div>
              </div>
              <h3 className={`text-white text-xl mb-2 font-bold`}>{item.title}</h3>
              {item.link ? (
                <a 
                  href={item.link} 
                  className="text-white hover:text-white/80 font-medium transition-colors"
                >
                  {item.info}
                </a>
              ) : (
                <p className="text-white font-medium">{item.info}</p>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form with fun styling */}
          <div id="contact-form" className="bg-white rounded-whimsical shadow-xl p-8 border-4 border-secondary relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star fill="#F9D56E" size={20} className="text-secondary" />
            </div>
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star fill="#F9D56E" size={20} className="text-secondary" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star fill="#F9D56E" size={20} className="text-secondary" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <Star fill="#F9D56E" size={20} className="text-secondary" />
            </div>
            
            <motion.h2 
              className="text-2xl text-primary font-bold mb-6 text-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative inline-block">
                Send Me a Magical Message
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-2 bg-secondary/50 rounded-full z-0"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                ></motion.div>
              </span>
            </motion.h2>
            
            {isSubmitted ? (
              <motion.div 
                className="text-center py-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div 
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <CheckCircle size={40} />
                </motion.div>
                <h3 className="text-2xl font-medium mb-2 text-primary">Hooray! Message Sent!</h3>
                <p className="text-black mb-6">
                  Thank you for your magical message! I&apos;ll respond as soon as I can.
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="bg-secondary text-primary hover:bg-secondary-light"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div {...popAnimation} transition={{ delay: 0.1 }}>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-whimsical border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-blue-50/30 text-black font-medium"
                      placeholder="e.g. Cat Luker"
                    />
                  </motion.div>
                  <motion.div {...popAnimation} transition={{ delay: 0.2 }}>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-whimsical border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-blue-50/30 text-black font-medium"
                      placeholder="e.g. cat@adventure.com"
                    />
                  </motion.div>
                </div>
                <motion.div {...popAnimation} transition={{ delay: 0.3 }}>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-1">
                    What&apos;s This About?
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-whimsical border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-blue-50/30 text-black font-medium appearance-none"
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23122848'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    <option value="">Pick something fun!</option>
                    <option value="general">Just Saying Hello!</option>
                    <option value="books">Question about Books</option>
                    <option value="events">Author Visits & Events</option>
                    <option value="feedback">I Read Your Book!</option>
                    <option value="other">Something Else Entirely</option>
                  </select>
                </motion.div>
                <motion.div {...popAnimation} transition={{ delay: 0.4 }}>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-1">
                    Your Magical Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-whimsical border-2 border-primary/20 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent bg-blue-50/30 text-black font-medium"
                    placeholder="Type your adventure here..."
                  ></textarea>
                </motion.div>
                
                {errorMessage && (
                  <motion.div 
                    className="text-red-500 text-sm py-2 bg-red-50 px-4 rounded-lg"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {errorMessage}
                  </motion.div>
                )}
                
                <motion.div 
                  className="pt-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary text-primary hover:bg-secondary-light font-bold text-lg py-4 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending Magic...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span> <Send className="ml-2" size={20} strokeWidth={2.5} />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            )}
          </div>
          
          {/* Fun FAQ Section with animations */}
          <div>
            <motion.h2 
              className="text-2xl text-primary font-bold mb-8 relative inline-block"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative z-10">Frequently Asked Questions</span>
              <motion.div 
                className="absolute -bottom-2 left-0 right-0 h-2 bg-secondary/50 rounded-full z-0"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
            </motion.h2>
            <div className="space-y-6">
              {[
                {
                  question: "Do you do school visits or virtual readings?",
                  answer: "Yes! I love connecting with young readers. Please use the contact form to inquire about availability and rates for in-person or virtual visits.",
                  icon: <Sun size={24} className="text-secondary" fill="#F9D56E" />
                },
                {
                  question: "Where can I purchase your books?",
                  answer: "My books are available on Amazon, Barnes & Noble, and select independent bookstores. You can also order signed copies directly through this website.",
                  icon: <Star size={24} className="text-secondary" fill="#F9D56E" />
                },
                {
                  question: "Will there be more Cat Luker books?",
                  answer: "Absolutely! I'm currently working on the next adventure in the series. Join the newsletter to stay updated on new releases.",
                  icon: <Moon size={24} className="text-secondary" fill="#F9D56E" />
                },
                {
                  question: "Do you have resources for teachers and parents?",
                  answer: "Yes, I offer reading guides and activity sheets to complement the books. These resources are perfect for classroom or family discussions.",
                  icon: <Cloud size={24} className="text-secondary" />
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white p-6 rounded-whimsical border-2 border-primary/10 shadow-md transition-all duration-300 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
                  whileHover={{ 
                    boxShadow: '0 8px 20px -4px rgba(18, 40, 72, 0.15)',
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  {/* Decorative background bubble that appears on hover */}
                  <motion.div 
                    className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-secondary/10 z-0 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.6 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                  
                  <motion.div 
                    className="absolute top-4 right-4 z-10"
                    whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-primary font-bold mb-2 text-lg group-hover:text-primary-dark transition-colors duration-300"
                      layout
                    >
                      {item.question}
                    </motion.h3>
                    <motion.p 
                      className="text-black transition-all duration-300 relative"
                      style={{ 
                        transformOrigin: "left center",
                      }}
                    >
                      {item.answer}
                    </motion.p>
                  </div>
                  
                  {/* Bottom highlight bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/5 overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                  
                  {/* Left vertical highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary/5 overflow-hidden">
                    <motion.div 
                      className="h-full w-full bg-secondary origin-top"
                      initial={{ scaleY: 0 }}
                      whileHover={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Follow on Social Media */}
      <Section 
        className="bg-secondary py-16 relative overflow-hidden"
        id="social-media"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-10 left-[5%] text-primary opacity-10"
            animate={{ 
              rotate: [0, 360],
              transition: {
                duration: 40,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="w-40 h-40 rounded-full border-8 border-primary"></div>
          </motion.div>
          <motion.div 
            className="absolute bottom-10 right-[5%] text-primary opacity-10"
            animate={{ 
              rotate: [360, 0],
              transition: {
                duration: 50,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="w-60 h-60 rounded-full border-8 border-primary"></div>
          </motion.div>
          <motion.div 
            className="absolute top-1/2 right-[20%] text-primary opacity-5"
            animate={{ 
              rotate: [0, 360],
              transition: {
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <div className="w-80 h-80 rounded-full border-8 border-primary"></div>
          </motion.div>
        </div>
        
        <div className="text-center relative z-10">
          <motion.h2 
            className="text-primary-dark mb-6 font-display text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join the Adventure!
          </motion.h2>
          <motion.p 
            className="text-primary-dark text-xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Connect with me on social media for updates, behind-the-scenes peeks, and more magical adventures!
          </motion.p>
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { name: 'Facebook', href: '#', icon: 'facebook.svg' },
              { name: 'Instagram', href: '#', icon: 'instagram.svg' },
              { name: 'Twitter', href: '#', icon: 'twitter.svg' },
              { name: 'YouTube', href: '#', icon: 'youtube.svg' }
            ].map((platform, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Button 
                  href={platform.href}
                  className="bg-primary text-white hover:bg-primary-light min-w-40 py-3 text-lg font-bold shadow-lg hover:shadow-xl"
                >
                  Follow on {platform.name}
                </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>
    </>
  );
} 