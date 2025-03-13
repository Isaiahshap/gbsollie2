'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, PanInfo } from 'framer-motion';

interface GoldCardProps {
  className?: string;
  content: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    imageSrc: string;
    imageAlt: string;
  };
}

export const GoldCard = ({ className = '', content }: GoldCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  // Motion values for smooth drag animations
  const dragRotateX = useMotionValue(0);
  const dragRotateY = useMotionValue(0);
  
  // Apply spring physics for smooth rotation
  const springRotateX = useSpring(dragRotateX, { 
    stiffness: 150, 
    damping: 20, 
    mass: 0.5 
  });
  const springRotateY = useSpring(dragRotateY, { 
    stiffness: 150, 
    damping: 20, 
    mass: 0.5 
  });
  
  // Track mouse position globally (for hover effect)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging]);

  // Update card rotation based on mouse position relative to card (for hover effect)
  useEffect(() => {
    if (!cardRef.current || isDragging) return;

    const calculateCardEffects = () => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Calculate distance between mouse and card center (normalized)
      const distanceX = mousePosition.x - cardCenterX;
      const distanceY = mousePosition.y - cardCenterY;
      
      // Calculate absolute distance for distance-based damping
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const viewportDiagonal = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
      
      // Apply distance-based damping factor (1.0 when mouse is on card, decreases as mouse moves away)
      const dampingFactor = Math.max(0.1, 1 - Math.min(1, distance / (viewportDiagonal * 0.5)));
      
      // Calculate rotation based on mouse position relative to card center
      // with distance-based damping to reduce rotation at far distances
      const maxRotation = 8;
      const rotateYValue = ((distanceX / (rect.width / 2)) * maxRotation) * dampingFactor;
      const rotateXValue = ((distanceY / (rect.height / 2)) * -maxRotation) * dampingFactor;

      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };

    // Use requestAnimationFrame for smooth animations when hovering
    let animationFrameId: number;
    const animate = () => {
      calculateCardEffects();
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, isDragging]);

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    // Gradually return to neutral position when drag ends
    dragRotateX.set(0);
    dragRotateY.set(0);
  };

  const handleDrag = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Calculate rotation based on drag direction and distance
    // We use delta X and Y to determine which direction to rotate
    // Negative factor for Y makes it rotate intuitively (drag up = rotate down)
    const sensitivity = 0.15; // Control rotation sensitivity
    const newRotateY = info.delta.x * sensitivity;
    const newRotateX = -info.delta.y * sensitivity;
    
    // Apply rotation (additive to current rotation with limits)
    const maxRotation = 25;
    const minRotation = -25;
    
    // Current values
    const currentX = dragRotateX.get();
    const currentY = dragRotateY.get();
    
    // Calculate new values with limits
    const nextX = Math.max(minRotation, Math.min(maxRotation, currentX + newRotateX));
    const nextY = Math.max(minRotation, Math.min(maxRotation, currentY + newRotateY));
    
    // Set the motion values
    dragRotateX.set(nextX);
    dragRotateY.set(nextY);
  };
  
  // Calculate light position based on card rotation
  // This creates the effect of light coming from the viewer's perspective
  const getLightPosition = () => {
    // Get current rotation values (either from hover or drag)
    const currentRotateX = isDragging ? springRotateX.get() : rotateX;
    const currentRotateY = isDragging ? springRotateY.get() : rotateY;
    
    // Convert rotation to light position
    // When card rotates right (positive Y), light should appear more on the left (lower X%)
    // When card rotates down (positive X), light should appear more on the top (lower Y%)
    const maxRotation = isDragging ? 25 : 8;
    
    // Light starts at center (50%) and moves opposite to rotation
    // Normalize rotation to -1 to 1 range, then scale to get percentage shift from center
    const lightXOffset = -(currentRotateY / maxRotation) * 30; // Reduced from 50 to 30 for more subtle effect
    const lightYOffset = (currentRotateX / maxRotation) * 30;  // Reduced from 50 to 30 for more subtle effect
    
    return {
      x: 50 + lightXOffset,
      y: 50 + lightYOffset
    };
  };
  
  // Get light position that simulates viewer perspective
  const lightPosition = getLightPosition();
  const lightAngle = `${lightPosition.x}% ${lightPosition.y}%`;
  
  return (
    <div className={`relative perspective-1000 ${className}`}>
      <motion.div
        ref={cardRef}
        className="relative w-full rounded-2xl shadow-xl transform-style-3d cursor-grab active:cursor-grabbing"
        style={{
          transformStyle: 'preserve-3d',
          // Combine hover rotation with drag rotation
          rotateX: isDragging ? springRotateX : rotateX,
          rotateY: isDragging ? springRotateY : rotateY,
          background: `linear-gradient(135deg, 
            rgba(255, 215, 0, 0.95) 0%, 
            rgba(218, 165, 32, 0.98) 30%, 
            rgba(255, 215, 0, 1) 50%, 
            rgba(184, 134, 11, 0.98) 70%, 
            rgba(255, 215, 0, 0.95) 100%)`,
          backgroundSize: '400% 400%', // Increased size for smoother transitions
          backgroundPosition: lightAngle
        }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 200, bounceDamping: 20 }}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
        whileTap={{ cursor: "grabbing" }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.5
        }}
      >
        {/* Reflective overlay - simulates metallic shine */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${lightAngle}, 
              rgba(255, 255, 255, 0.8) 0%, 
              rgba(255, 255, 255, 0.3) 15%, 
              rgba(255, 255, 255, 0.1) 40%,
              rgba(255, 255, 255, 0) 70%)`,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Card content */}
        <div className="relative p-8 md:p-10 flex flex-col items-center text-center z-20">
          {/* Image */}
          <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border-4 border-white/30 shadow-inner transform translate-z-10" style={{ transform: 'translateZ(20px)' }}>
            <Image
              src={content.imageSrc}
              alt={content.imageAlt}
              fill
              className="object-cover"
            />
          </div>

          {/* Title */}
          <h2 
            className="font-display text-2xl md:text-3xl font-bold mb-2 text-black/90 transform translate-z-5"
            style={{ transform: 'translateZ(15px)' }}
          >
            {content.title}
          </h2>

          {/* Subtitle */}
          <p 
            className="text-lg md:text-xl mb-4 text-black/80 transform translate-z-5"
            style={{ transform: 'translateZ(10px)' }}
          >
            {content.subtitle}
          </p>

          {/* Paragraphs */}
          <div className="space-y-3 max-w-md text-black/70 text-sm md:text-base">
            {content.paragraphs.map((paragraph, index) => (
              <p 
                key={index} 
                className="transform translate-z-5"
                style={{ transform: 'translateZ(5px)' }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Edge lighting effect */}
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none border border-white/30"
          style={{
            boxShadow: `0 0 15px 2px rgba(255, 215, 0, 0.4), 
                        inset 0 0 20px rgba(255, 255, 255, 0.3)`,
            filter: 'brightness(1.05) blur(0.5px)'
          }}
        />
      </motion.div>
    </div>
  );
};

export default GoldCard; 