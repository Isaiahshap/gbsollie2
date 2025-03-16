'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

export function Book3D({ imageSrc, alt, className = '' }: { imageSrc: string; alt: string; className?: string }) {
  const bookRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const book = bookRef.current;
    if (!book) return;
    
    let requestId: number;
    let targetRotateX = 0;
    let targetRotateY = 0;
    let currentRotateX = 0;
    let currentRotateY = 0;
    
    // Smoother animation with lerping
    const animate = () => {
      // Smooth interpolation with lower factor for more gradual movement
      currentRotateX += (targetRotateX - currentRotateX) * 0.08;
      currentRotateY += (targetRotateY - currentRotateY) * 0.08;
      
      // Apply transform with smoother values
      book.style.transform = `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)`;
      
      // Continue animation loop
      requestId = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = book.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate rotation based on mouse position - more subtle (max 3 degrees)
      targetRotateY = ((e.clientX - centerX) / (rect.width / 2)) * 3;
      targetRotateX = ((centerY - e.clientY) / (rect.height / 2)) * 2;
    };
    
    const handleMouseLeave = () => {
      // Smoothly return to original position
      targetRotateX = 0;
      targetRotateY = 0;
    };
    
    // Start animation loop
    requestId = requestAnimationFrame(animate);
    
    // Listen for mouse events
    document.addEventListener('mousemove', handleMouseMove);
    book.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      // Clean up
      document.removeEventListener('mousemove', handleMouseMove);
      book.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(requestId);
    };
  }, []);
  
  return (
    <div ref={bookRef} className={`book-3d ${className}`}>
      <div className="book-pages"></div>
      <div className="book-pages-edge"></div>
      <div className="book-cover">
        <Image src={imageSrc} alt={alt} fill className="object-cover" />
      </div>
      <div className="book-spine"></div>
      <div className="book-glow"></div>
    </div>
  );
}

export default Book3D; 