"use client";

import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface TranslateOnActiveProps {
  isActive: boolean;
  activeX?: number | string;
  activeY?: number | string;
  initialX?: number | string;
  initialY?: number | string;
  transitionConfig?: object;
  children: React.ReactNode;
  className?: string;
}

const TranslateOnActive: React.FC<TranslateOnActiveProps> = ({
  isActive,
  activeX = 0,
  activeY = 0,
  initialX = 0,
  initialY = 0,
  transitionConfig = { duration: 0.5, ease: "easeInOut" },
  children,
  className,
}) => {
  const controls = useAnimation();

  const variants = {
    active: { 
      x: activeX,
      y: activeY,
      transition: transitionConfig 
    },
    inactive: {
      x: initialX,
      y: initialY,
      transition: transitionConfig
    },
  };

  useEffect(() => {
    if (isActive) {
      controls.set("inactive"); // Reset to ensure animation replays correctly
      controls.start("active");
    } else {
      controls.start("inactive");
    }
  }, [isActive, controls, initialX, initialY, activeX, activeY]); // Include all relevant variant props

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

export default TranslateOnActive; 