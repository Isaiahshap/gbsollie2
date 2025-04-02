'use client';

import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JourneyActivityGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center p-4">
      <motion.div 
        className="max-w-lg w-full bg-white rounded-xl shadow-xl p-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-display text-primary mb-4">
          Journey Activity Guide
        </h1>
        
        <div className="w-24 h-1 bg-secondary mx-auto mb-6 rounded-full"></div>
        
        <p className="text-gray-600 mb-8">
          Download your free activity guide to enhance your reading experience of &quot;Journey&quot;.
        </p>

        <motion.a 
          href="/journey-activity-guide.pdf"
          download="Journey-Activity-Guide.pdf"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Download className="w-5 h-5" />
          Download Guide
        </motion.a>
        
        <p className="text-sm text-gray-500 mt-6">
          PDF format • Free download
        </p>
      </motion.div>
    </div>
  );
} 