"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Card {
  id: string;
  image?: string;
  title?: string;
  description?: string;
  link?: string;
}

interface StackingCardsProps {
  cards: Card[];
  height?: string;
  heightClass?: string;
}

export default function StackingCards({ cards, height = "250px", heightClass }: StackingCardsProps) {
  const [currentCards, setCurrentCards] = useState(cards);
  const [, ] = useState(0); // Per indicare quale card è al centro

  const handleCardClick = () => {
    setCurrentCards(prevCards => {
      const newCards = [...prevCards];
      const firstCard = newCards.shift();
      if (firstCard) {
        newCards.push(firstCard);
      }
      return newCards;
    });
  };

  const handlePrevious = () => {
    setCurrentCards(prevCards => {
      const newCards = [...prevCards];
      const lastCard = newCards.pop();
      if (lastCard) {
        newCards.unshift(lastCard);
      }
      return newCards;
    });
  };

  const handleNext = () => {
    setCurrentCards(prevCards => {
      const newCards = [...prevCards];
      const firstCard = newCards.shift();
      if (firstCard) {
        newCards.push(firstCard);
      }
      return newCards;
    });
  };

  // Funzioni per la rotazione delle card su lg (simile a Vision)
  const handleRotateNext = () => {
    setCurrentCards(prevCards => {
      const newCards = [...prevCards];
      const firstCard = newCards.shift();
      if (firstCard) {
        newCards.push(firstCard);
      }
      return newCards;
    });
  };

  const handleRotatePrevious = () => {
    setCurrentCards(prevCards => {
      const newCards = [...prevCards];
      const lastCard = newCards.pop();
      if (lastCard) {
        newCards.unshift(lastCard);
      }
      return newCards;
    });
  };

  const getCardAnimation = (index: number) => {
    const positions = [
      {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        scale: 1,
        opacity: 1,
        boxShadow: 'none',
        border: '1px solid rgba(255,255,255,0.4)',
      },
      {
        top: 24,
        left: 24,
        right: 24,
        zIndex: 20,
        scale: 0.95,
        opacity: 0.7,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255,255,255,0.4)',
      },
      {
        top: 48,
        left: 48,
        right: 48,
        zIndex: 10,
        scale: 0.90,
        opacity: 0.5,
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255,255,255,0.4)',
      }
    ];
    return positions[index] || positions[2];
  };

  const cardVariants = {
    initial: (index: number) => ({
      ...getCardAnimation(index),
      transition: { duration: 0 }
    }),
    animate: (index: number) => ({
      ...getCardAnimation(index),
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.6
      }
    })
  };

  // Varianti per layout a 3 card su lg (simile a Vision)
  const horizontalCardVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      rotateY: 0,
      filter: 'blur(0px)',
    },
    left: {
      x: -280,
      scale: 0.8,
      opacity: 0.6,
      zIndex: 5,
      rotateY: 25,
      filter: 'blur(1px)',
    },
    right: {
      x: 280,
      scale: 0.8,
      opacity: 0.6,
      zIndex: 5,
      rotateY: -25,
      filter: 'blur(1px)',
    },
  };

  const horizontalCardTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
  };

  // Function per determinare la posizione di ogni card su lg
  const getHorizontalVariantName = (index: number) => {
    if (index === 0) return "center";
    if (index === 1) return "right";
    if (index === 2) return "left";
    return "center";
  };

  // Se non ci sono progetti in evidenza, mostra un placeholder
  if (!currentCards.length) {
    return (
      <div className={`relative w-full ${heightClass || ''}`} style={!heightClass ? { height } : undefined}>
        <div className="absolute top-0 left-0 right-0 h-full flex items-center justify-center">
          <div className="w-full h-full bg-gray-400 rounded-[30px] flex items-center justify-center border border-dashed border-2 border-white text-black text-xl font-bold text-center">
            Aggiungi i tuoi progetti dalla dashboard
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${heightClass || ''}`} style={!heightClass ? { height } : undefined}>
      {/* Mobile/Tablet: Stacking Layout */}
      <div className="block lg:hidden">
        {/* Navigation Arrows per stacking */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-2">
          <motion.button
            onClick={handlePrevious}
            className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={handleNext}
            className="w-8 h-8 md:w-12 md:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence mode="popLayout">
          {currentCards.map((card, index) => (
            <motion.div
              key={card.id}
              custom={index}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              className={`absolute rounded-[30px] cursor-pointer flex flex-col items-start justify-start ${heightClass || ''}`}
              style={{
                ...(heightClass ? {} : { height }),
                backgroundImage: card.image ? `url('${card.image}')` : undefined,
                backgroundSize: card.image ? 'cover' : undefined,
                backgroundPosition: card.image ? 'center' : undefined,
                backgroundColor: card.image ? undefined : '#cccccc',
                ...getCardAnimation(index),
              }}
              onClick={handleCardClick}
              whileHover={{ scale: index === 0 ? 0.98 : undefined }}
              whileTap={{ scale: index === 0 ? 0.98 : undefined }}
            >
              <div className="flex flex-col items-start justify-start w-full h-full p-6 bg-gradient-to-b from-black/60 via-black/30 to-transparent rounded-[30px]">
                <span className="text-white font-semibold text-[20px] md:text-[26px] 2xl:text-[32px] text-left drop-shadow mb-0">
                  {card.title || "Progetto in evidenza"}
                </span>
                {card.description && (
                  <span className="text-white/80 text-[16px] md:text-[20px] 2xl:text-[24px] text-left drop-shadow mt-0.5 mb-0">
                    {card.description}
                  </span>
                )}
                <a
                  href={card.link || `#`}
                  target={card.link ? "_blank" : "_self"}
                  rel={card.link ? "noopener noreferrer" : undefined}
                  className="absolute left-6 bottom-6 px-4 md:px-6 py-2 md:py-3 rounded-full bg-white/40 text-white font-semibold text-sm md:text-base backdrop-blur-sm transition hover:bg-white/60 drop-shadow"
                  style={{ zIndex: 40 }}
                  onClick={card.link ? undefined : (e) => e.preventDefault()}
                >
                  {card.link ? "Visita Progetto" : "Vai al progetto"}
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Desktop LG: Layout a 3 card orizzontali (simile a Vision) */}
      <div 
        className="hidden lg:block relative w-full h-full"
        style={{ perspective: '1000px' }}
      >
        {/* Navigation Arrows */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50">
          <motion.button
            onClick={handleRotatePrevious}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
        </div>
        
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50">
          <motion.button
            onClick={handleRotateNext}
            className="w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 border border-white/30 hover:border-white/50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Container per le 3 card */}
        <div className="relative w-full h-full flex items-center justify-center">
          {currentCards.map((card, index) => (
            <motion.div
              key={card.id}
              variants={horizontalCardVariants}
              animate={getHorizontalVariantName(index)}
              transition={horizontalCardTransition}
              className={`absolute rounded-[30px] cursor-pointer flex flex-col items-start justify-start ${heightClass || ''} ${index === 0 ? 'lg:scale-110' : ''} w-[800px] 2xl:w-[1000px]`}
              style={{
                ...(heightClass ? {} : { height }),
                backgroundImage: card.image ? `url('${card.image}')` : undefined,
                backgroundSize: card.image ? 'cover' : undefined,
                backgroundPosition: card.image ? 'center' : undefined,
                backgroundColor: card.image ? undefined : '#cccccc',
              }}
              onClick={index === 0 ? undefined : (index === 1 ? handleRotateNext : handleRotatePrevious)}
              whileHover={{ 
                scale: index === 0 ? 0.98 : 0.85,
                transition: { duration: 0.2 }
              }}
            >
              <div className="flex flex-col items-start justify-start w-full h-full p-8 bg-gradient-to-b from-black/60 via-black/30 to-transparent rounded-[30px]">
                <span className="text-white font-semibold text-[28px] 2xl:text-[36px] text-left drop-shadow mb-2">
                  {card.title || "Progetto in evidenza"}
                </span>
                {card.description && (
                  <span className="text-white/80 text-[20px] 2xl:text-[26px] text-left drop-shadow mt-1 mb-0">
                    {card.description}
                  </span>
                )}
                {index === 0 && (
                  <a
                    href={card.link || `#`}
                    target={card.link ? "_blank" : "_self"}
                    rel={card.link ? "noopener noreferrer" : undefined}
                    className="absolute left-8 bottom-8 px-6 py-3 rounded-full bg-white/40 text-white font-semibold text-base backdrop-blur-sm transition hover:bg-white/60 drop-shadow"
                    onClick={card.link ? undefined : (e) => e.preventDefault()}
                  >
                    {card.link ? "Visita Progetto" : "Vai al progetto"}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 