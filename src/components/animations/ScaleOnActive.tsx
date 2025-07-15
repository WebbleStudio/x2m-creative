"use client";

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface ScaleOnActiveProps {
  isActive: boolean;
  targetScale: number;
  initialScale?: number;
  children: React.ReactNode;
  className?: string; // Allow passing className for positioning etc.
}

const ScaleOnActive: React.FC<ScaleOnActiveProps> = ({
  isActive,
  targetScale,
  initialScale = 1,
  children,
  className,
}) => {
  const controls = useAnimation();
  const defaultSpringTransition = { type: "spring", stiffness: 260, damping: 20 };

  const variants = {
    active: {
      scale: targetScale,
      transition: { ...defaultSpringTransition, delay: 0.2 } // User-adjusted delay
    },
    inactive: {
      scale: initialScale,
      transition: defaultSpringTransition
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.set("inactive"); // Reset to inactive state first
      controls.start("active");   // Then animate to active (respecting delay)
    } else {
      controls.start("inactive"); // Animate to inactive when not active
    }
  }, [isActive, controls, initialScale, targetScale]); // Added dependencies for variants

  return (
    <motion.div
      className={className}
      variants={variants}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default ScaleOnActive; 