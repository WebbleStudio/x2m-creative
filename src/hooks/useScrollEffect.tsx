"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook with immediate scroll down response and delayed scroll up for smooth UX.
 * @param {number} [threshold=10] - The scroll threshold in pixels to trigger the effect.
 * @param {number} [upDelay=100] - Delay in ms only when scrolling back to top (prevents flickering).
 * @returns {boolean} - True if the page is scrolled beyond the threshold, false otherwise.
 */
export const useScrollEffect = (threshold: number = 10, upDelay: number = 100): boolean => {
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const shouldBeScrolled = currentScrollY > threshold;
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (shouldBeScrolled) {
        // IMMEDIATE response when scrolling down
        if (!scrolled) {
          setScrolled(true);
        }
      } else {
        // DELAYED response when scrolling up (prevents flickering)
        if (scrolled) {
          timeoutRef.current = setTimeout(() => {
            setScrolled(false);
            timeoutRef.current = null;
          }, upDelay);
        }
      }
    };

    // Add scroll listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call immediately to set initial state
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [threshold, upDelay, scrolled]);

  return scrolled;
}; 