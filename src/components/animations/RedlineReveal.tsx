"use client";

import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';

interface RedlineRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  isActive: boolean;
  className?: string;
}

const RedlineReveal: React.FC<RedlineRevealProps> = ({
  src,
  alt,
  width,
  height,
  isActive,
  className,
}) => {
  const controls = useAnimation();

  const variants = {
    hidden: { clipPath: 'inset(0 100% 0 0)' }, // Clipped from the right
    visible: { clipPath: 'inset(0 0% 0 0)' },   // Fully visible
  };

  useEffect(() => {
    if (isActive) {
      controls.set("hidden");
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isActive, controls]);

  return (
    <motion.div
      className={className}
      variants={variants}
      animate={controls}
      transition={{ duration: 0.5, ease: 'linear' }}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-contain"
      />
    </motion.div>
  );
};

export default RedlineReveal; 