'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

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

  return (
    <>
      {/* Hero Section */}
      <Section 
        className="bg-primary text-white"
        id="contact-hero"
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display mb-6">Get in Touch</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Have questions about my books, interested in scheduling an author visit, or just want to say hello? I&apos;d love to hear from you!
          </p>
        </motion.div>
      </Section>

      {/* Contact Information */}
      <Section 
        className="bg-white"
        id="contact-info"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Mail size={24} />,
              title: 'Email',
              info: 'contact@gbsollie.com',
              link: 'mailto:contact@gbsollie.com'
            },
            {
              icon: <Phone size={24} />,
              title: 'Phone',
              info: '(555) 123-4567',
              link: 'tel:+15551234567'
            },
            {
              icon: <MapPin size={24} />,
              title: 'Location',
              info: 'Alabama, United States',
              link: null
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gray-50 p-6 rounded-whimsical shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-primary text-xl mb-2 font-bold">{item.title}</h3>
              {item.link ? (
                <a 
                  href={item.link} 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {item.info}
                </a>
              ) : (
                <p className="text-gray-700">{item.info}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-whimsical shadow-lg p-8">
            <h2 className="text-2xl text-primary font-bold mb-6">Send Me a Message</h2>
            
            {isSubmitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for getting in touch. I&apos;ll respond as soon as possible.
                </p>
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="books">Question about Books</option>
                    <option value="events">Author Visits & Events</option>
                    <option value="feedback">Reader Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  ></textarea>
                </div>
                
                {errorMessage && (
                  <div className="text-red-500 text-sm py-2">
                    {errorMessage}
                  </div>
                )}
                
                <div>
                  <Button 
                    type="submit" 
                    variant="secondary"
                    fullWidth
                    disabled={isSubmitting}
                    className="flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send className="ml-2" size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
          
          {/* FAQ Section */}
          <div>
            <h2 className="text-2xl text-primary font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  question: "Do you do school visits or virtual readings?",
                  answer: "Yes! I love connecting with young readers. Please use the contact form to inquire about availability and rates for in-person or virtual visits."
                },
                {
                  question: "Where can I purchase your books?",
                  answer: "My books are available on Amazon, Barnes & Noble, and select independent bookstores. You can also order signed copies directly through this website."
                },
                {
                  question: "Will there be more Cat Luker books?",
                  answer: "Absolutely! I'm currently working on the next adventure in the series. Join the newsletter to stay updated on new releases."
                },
                {
                  question: "Do you have resources for teachers and parents?",
                  answer: "Yes, I offer reading guides and activity sheets to complement the books. These resources are perfect for classroom or family discussions."
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-whimsical">
                  <h3 className="text-primary font-bold mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Follow on Social Media */}
      <Section 
        className="bg-secondary"
        id="social-media"
      >
        <div className="text-center">
          <h2 className="text-primary-dark mb-6">Follow the Journey</h2>
          <p className="text-primary-dark text-xl mb-8 max-w-2xl mx-auto">
            Connect with me on social media for updates, behind-the-scenes content, and more adventures!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { name: 'Facebook', href: '#', icon: 'facebook.svg' },
              { name: 'Instagram', href: '#', icon: 'instagram.svg' },
              { name: 'Twitter', href: '#', icon: 'twitter.svg' },
              { name: 'YouTube', href: '#', icon: 'youtube.svg' }
            ].map((platform, index) => (
              <Button 
                key={index}
                href={platform.href}
                variant="secondary"
                className="min-w-40"
              >
                Follow on {platform.name}
              </Button>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
} 