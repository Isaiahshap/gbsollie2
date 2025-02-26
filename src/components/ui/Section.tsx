'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation variants
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  noPadding?: boolean;
  containerClassName?: string;
  animate?: boolean;
  bgColor?: string;
  asElement?: React.ElementType;
  bgImage?: string;
  customVariants?: Variants;
  animateOnScroll?: boolean;
}

export default function Section({
  id,
  className,
  children,
  fullHeight = false,
  noPadding = false,
  containerClassName,
  animate = true,
  bgColor,
  asElement: Element = 'section',
  bgImage,
  customVariants,
  animateOnScroll = false
}: SectionProps) {
  
  // Dynamic styles based on props
  const sectionClasses = cn(
    // Base styles
    'relative overflow-hidden',
    // Conditional styles
    fullHeight && 'min-h-screen',
    !noPadding && 'py-16 md:py-24',
    bgColor,
    className
  );
  
  const containerClasses = cn(
    'container-custom relative z-10', 
    containerClassName
  );

  // Background image style
  const bgImageStyle = bgImage ? {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return animate ? (
    <Element
      id={id}
      className={sectionClasses}
      style={bgImageStyle}
    >
      <motion.div 
        className={containerClasses}
        initial="hidden"
        {...(animateOnScroll 
          ? { whileInView: "visible", viewport: { once: true, amount: 0.2 } }
          : { animate: "visible" }
        )}
        variants={customVariants || sectionVariants}
      >
        {React.Children.map(children, (child, i) => {
          if (React.isValidElement(child)) {
            return (
              <motion.div key={i} variants={itemVariants}>
                {child}
              </motion.div>
            );
          }
          return child;
        })}
      </motion.div>
    </Element>
  ) : (
    <Element id={id} className={sectionClasses} style={bgImageStyle}>
      <div className={containerClasses}>
        {children}
      </div>
    </Element>
  );
} 