"use client";

import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect scroll position with delay on show.
 * @param {number} [threshold=10] - The scroll threshold in pixels to trigger the effect.
 * @param {number} [delay=200] - Delay in ms before setting scrolled=true.
 * @returns {boolean} - True if the page is scrolled beyond the threshold (with delay), false otherwise.
 */
export const useScrollEffect = (threshold: number = 10, delay: number = 200): boolean => {
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        if (!scrolled && !timeoutRef.current) {
          timeoutRef.current = setTimeout(() => {
            setScrolled(true);
            timeoutRef.current = null;
          }, delay);
        }
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold, delay, scrolled]);

  return scrolled;
}; 