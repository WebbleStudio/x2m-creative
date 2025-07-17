"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  trigger?: 'mount' | 'scroll';
  threshold?: number;
  className?: string;
  once?: boolean;
  style?: React.CSSProperties;
}

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  distance = 30,
  trigger = 'scroll',
  threshold = 0.1,
  className = '',
  once = true,
  style
}: FadeUpProps) {
  const [isVisible, setIsVisible] = useState(trigger === 'mount');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (trigger === 'mount') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [trigger, threshold, once]);

  const variants = {
    hidden: {
      opacity: 0,
      y: distance,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom cubic-bezier for smooth, fancy effect
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
} 