import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disabilita scroll quando il loader è attivo
    document.body.style.overflow = 'hidden';
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15; // Incremento casuale per effetto realistico
      });
    }, 100);

    // Cleanup: riabilita scroll quando il componente viene smontato
    return () => {
      clearInterval(interval);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Logo con breathing effect */}
      <div className="mb-8 animate-breathing">
        <Image
          src="/img/X2M-white.png"
          alt="X2M Logo Loading"
          width={100}
          height={100}
          className="drop-shadow-2xl"
          priority
        />
      </div>
      
      {/* Progress bar */}
      <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      
      {/* Loading text */}
      <p className="mt-4 text-sm text-gray-300 font-raleway animate-pulse">
        Caricamento...
      </p>
    </div>
  );
} 