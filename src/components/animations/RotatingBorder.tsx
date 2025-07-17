"use client";

import React from 'react';

interface RotatingBorderProps {
  children: React.ReactNode;
  className?: string;
}

const RotatingBorder: React.FC<RotatingBorderProps> = ({ 
  children, 
  className = ""
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Content without modifications */}
      {children}
      
      {/* Animated border overlay */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-3xl opacity-60"
        style={{
          background: `conic-gradient(from 0deg, transparent, transparent, rgba(255, 255, 255, 0.9), transparent, transparent)`,
          animation: 'rotateBorder 4s linear infinite',
          filter: 'blur(1px)',
          zIndex: 20,
        }}
      />

      {/* Global styles for the animation */}
      <style jsx global>{`
        @keyframes rotateBorder {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RotatingBorder; 