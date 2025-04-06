import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData: { name: string; email: string; city: string }) => void;
  title?: string;
  description?: string;
  downloadText?: string;
}

export default function NewsletterModal({
  isOpen,
  onClose,
  onSubmit,
  title = "Download Your Free Bible Study Guide",
  description = "Sign up to receive your free \"Journey to Light\" Bible study guide and updates on new releases.",
  downloadText = "Download Bible Study Guide"
}: NewsletterModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    // Get form data
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const city = formData.get('city') as string;
    
    try {
      // Call the onSubmit handler if provided
      if (onSubmit) {
        onSubmit({ name, email, city });
      } else {
        // Default behavior - submit to API endpoint
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, city }),
        });
        
        const data = await response.json();
        
        if (!response.ok && !data.sandboxMode) {
          // Handle error from either the HTTP status or the response body
          const errorMessage = data.error || `Failed to subscribe: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
        
        // Success - check if we're in sandbox mode
        if (data.sandboxMode) {
          alert(data.message || "Your information has been submitted. During development, the website owner will be notified of your request.");
        } else {
          alert("Thank you! Your Bible guide will be sent to your email shortly.");
        }
        
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-whimsical p-8 max-w-md w-full relative"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
          <p className="text-black mt-2">
            {description}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="modal-name" className="block text-sm font-medium text-black mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="modal-name"
                name="name"
                required
                className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-black mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="modal-email"
                name="email"
                required
                className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                placeholder="john@example.com"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="modal-city" className="block text-sm font-medium text-black mb-1">
                Your City
              </label>
              <input
                type="text"
                id="modal-city"
                name="city"
                required
                className="w-full px-4 py-2 rounded-whimsical border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-black"
                placeholder="Birmingham"
                disabled={isLoading}
              />
            </div>
            
            <div className="pt-2">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                icon={<Download size={18} />} 
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : downloadText}
              </Button>
            </div>
            
            <p className="text-sm text-gray-800 mt-4">
              By subscribing, you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. We respect your privacy and will never share your information.
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
