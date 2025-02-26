'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// Only import ScrollTrigger on the client side
let ScrollTrigger: typeof import('gsap/ScrollTrigger').ScrollTrigger | undefined;
if (typeof window !== 'undefined') {
  // Dynamic import for ScrollTrigger
  import('gsap/ScrollTrigger').then(module => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
}

// Non-hook animation setup functions
const setupTextReveal = (element: HTMLElement) => {
  if (!element || typeof window === 'undefined') return;
  
  // Create a simple opacity and y position animation
  gsap.fromTo(element, 
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
    }
  );
};

const setupParallaxEffect = (element: HTMLElement, options = { speed: 0.5, direction: 'y' }) => {
  if (!element || typeof window === 'undefined') return;
  
  const { speed, direction } = options;

  const animProps = {
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  };

  // Create animation based on direction
  if (direction === 'y') {
    gsap.to(element, {
      y: () => speed * 100,
      ...animProps,
    });
  } else if (direction === 'x') {
    gsap.to(element, {
      x: () => speed * 100,
      ...animProps,
    });
  }
};

const setupStaggerAnimation = (
  container: HTMLElement, 
  options = { stagger: 0.1, y: 20, delay: 0.2, duration: 0.6 }
) => {
  if (!container || typeof window === 'undefined') return;
  
  const childElements = Array.from(container.children);
  const { stagger, y, delay, duration } = options;

  // Hide elements initially
  gsap.set(childElements, { opacity: 0, y });

  // Create animation
  gsap.to(childElements, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: container,
      start: 'top 80%',
    },
  });
};

const setupFloatingAnimation = (
  element: HTMLElement, 
  options = { y: 15, duration: 3, delay: 0 }
) => {
  if (!element || typeof window === 'undefined') return;
  
  const { y, duration, delay } = options;

  // Create floating animation
  const tl = gsap.timeline({ repeat: -1, yoyo: true, delay });
  tl.to(element, {
    y,
    duration,
    ease: 'power1.inOut',
  });
  
  return tl; // Return timeline for cleanup
};

// React hooks that use the setup functions
export const useTextReveal = (elementRef: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    if (!elementRef.current) return;
    setupTextReveal(elementRef.current);
  }, [elementRef]);
};

export const useParallaxEffect = (
  elementRef: React.RefObject<HTMLElement>,
  options = { speed: 0.5, direction: 'y' as 'x' | 'y' }
) => {
  useEffect(() => {
    if (!elementRef.current) return;
    
    // Capture the current value of the ref
    const element = elementRef.current;
    
    setupParallaxEffect(element, options);
    
    // Cleanup
    return () => {
      if (typeof window !== 'undefined' && ScrollTrigger) {
        ScrollTrigger.getAll().forEach((st: import('gsap/ScrollTrigger').ScrollTrigger) => {
          if (st.vars.trigger === element) {
            st.kill();
          }
        });
      }
    };
  }, [elementRef, options]);
};

export const useStaggerAnimation = (
  containerRef: React.RefObject<HTMLElement>,
  options = { stagger: 0.1, y: 20, delay: 0.2, duration: 0.6 }
) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;
    
    const element = containerRef.current;
    
    // Only use ScrollTrigger if it's been initialized
    if (typeof ScrollTrigger !== 'undefined') {
      setupStaggerAnimation(element, options);
      
      return () => {
        if (typeof window !== 'undefined' && ScrollTrigger) {
          ScrollTrigger.getAll().forEach((st: import('gsap/ScrollTrigger').ScrollTrigger) => {
            if (st.vars.trigger === element) {
              st.kill();
            }
          });
        }
      };
    }
  }, [containerRef, options]);
};

export const useFloatingAnimation = (
  elementRef: React.RefObject<HTMLElement>,
  options = { y: 15, duration: 3, delay: 0 }
) => {
  useEffect(() => {
    if (!elementRef.current) return;
    const timeline = setupFloatingAnimation(elementRef.current, options);
    
    // Cleanup
    return () => {
      if (timeline) timeline.kill();
    };
  }, [elementRef, options]);
};

export const usePageTransition = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const container = containerRef.current;

    // Create page enter animation
    gsap.fromTo(
      container,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      }
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(container);
    };
  }, []);

  return containerRef;
}; 