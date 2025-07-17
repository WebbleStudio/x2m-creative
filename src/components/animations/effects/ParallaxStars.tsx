"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface StarConfig {
  src: string;
  alt: string;
  initialTop: number; // in px
  initialLeft: number; // in px
  speed: number; // parallax speed factor
  width?: number;
  height?: number;
}

interface ParallaxStarsProps {
  stars: StarConfig[];
}

const ParallaxStars: React.FC<ParallaxStarsProps> = ({ stars }) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      refs.current.forEach((el, i) => {
        if (el) {
          const { initialTop, speed } = stars[i];
          el.style.transform = `translateY(${initialTop + scrollY * speed}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stars]);

  return (
    <>
      {stars.map((star, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          style={{
            position: 'absolute',
            top: 0,
            left: star.initialLeft,
            zIndex: 20,
            pointerEvents: 'none',
            width: star.width || 40,
            height: star.height || 40,
            willChange: 'transform',
          }}
          aria-hidden="true"
        >
          <Image
            src={star.src}
            alt={star.alt}
            width={star.width || 40}
            height={star.height || 40}
            style={{ width: '100%', height: 'auto' }}
            loading="lazy"
          />
        </div>
      ))}
    </>
  );
};

export default ParallaxStars; 