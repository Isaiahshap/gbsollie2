'use client';

import { motion } from 'framer-motion';

export default function NorthernLights() {
  return (
    <>
      {/* Northern Lights Effects */}
      <motion.div 
        className="absolute top-[10%] left-[5%] w-[40%] h-[60%] rounded-full bg-[#1E88E5]/20"
        initial={{ 
          opacity: 0.3,
          scale: 1, 
          x: 0, 
          y: 0,
          filter: "blur(30px)"
        }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, -5, 0],
          filter: ["blur(30px)", "blur(40px)", "blur(30px)"]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-[20%] right-[15%] w-[30%] h-[50%] rounded-full bg-[#9C27B0]/15"
        initial={{ 
          opacity: 0.3,
          scale: 1, 
          x: 0, 
          y: 0,
          filter: "blur(30px)"
        }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, -5, 0],
          filter: ["blur(30px)", "blur(40px)", "blur(30px)"]
        }}
        transition={{ 
          delay: 1.5,
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[10%] left-[25%] w-[45%] h-[40%] rounded-full bg-[#64FFDA]/10"
        initial={{ 
          opacity: 0.3,
          scale: 1, 
          x: 0, 
          y: 0,
          filter: "blur(30px)"
        }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, -5, 0],
          filter: ["blur(30px)", "blur(40px)", "blur(30px)"]
        }}
        transition={{ 
          delay: 3,
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
    </>
  );
} 