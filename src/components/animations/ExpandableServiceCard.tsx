"use client";

import { motion, AnimatePresence } from 'framer-motion';

interface Service {
  id: string;
  title: string;
  content: {
    intro: string;
    points: string[];
  };
  calendly?: boolean;
}

interface ExpandableServiceCardProps {
  service: Service;
  index: number;
  isActive: boolean;
  onToggle: (serviceId: string) => void;
  layout?: 'mobile' | 'lg'; // Nuova prop per il layout
}

export default function ExpandableServiceCard({
  service,
  index,
  isActive,
  onToggle,
  layout = 'mobile'
}: ExpandableServiceCardProps) {
  
  const getExpandAnimation = (index: number) => {
    const baseHeight = layout === 'lg' ? 130 : 80; // Mobile compatto, desktop originale
    const spacing = 12; // gap più grande
    
    // Calcolo diverso per mobile vs lg
    if (layout === 'lg') {
      // Su lg, deve coprire tutte e 4 le voci
      const totalHeight = (baseHeight * 4) + (spacing * 3); // 420px totale
      const startY = index * (baseHeight + spacing); // Posizione di partenza
      
      return {
        initial: {
          height: baseHeight,
          y: 0,
          zIndex: 1,
        },
        animate: {
          height: totalHeight,
          y: -startY, // Sposta verso l'alto per coprire dall'inizio
          zIndex: 10,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            bounce: 0.3,
            duration: 0.8
          }
        },
        exit: {
          height: baseHeight,
          y: 0,
          zIndex: 1,
          opacity: 0,
          transition: {
            height: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
              delay: 0.4
            },
            y: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
              delay: 0.4
            },
            opacity: {
              duration: 0.2,
              delay: 0.6
            }
          }
        }
      };
    } else {
      // Comportamento originale per mobile
      const totalHeight = (baseHeight * 4) + (spacing * 3); // Altezza totale area
      const startY = index * (baseHeight + spacing);
      
      return {
        initial: {
          height: baseHeight,
          y: 0,
          zIndex: 1,
        },
        animate: {
          height: totalHeight,
          y: -startY, // Sposta verso l'alto per coprire dall'inizio
          zIndex: 10,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 25,
            bounce: 0.3,
            duration: 0.8
          }
        },
        exit: {
          height: baseHeight,
          y: 0,
          zIndex: 1,
          opacity: 0,
          transition: {
            height: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
              delay: 0.4
            },
            y: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.5,
              delay: 0.4
            },
            opacity: {
              duration: 0.2,
              delay: 0.6
            }
          }
        }
      };
    }
  };

  const isContactCard = service.id === 'contact';

  return (
    <div className="relative">
      {/* Button base */}
      <motion.div
        className={`w-full h-[80px] md:h-[120px] lg:h-[130px] rounded-[30px] border border-white/20 flex items-center justify-between px-8 cursor-pointer overflow-hidden ${
          isContactCard ? 'bg-transparent' : 'bg-gray-200'
        }`}
        onClick={() => onToggle(service.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <h2 className={`font-raleway font-semibold text-[20px] md:text-[26px] ${isContactCard ? 'text-main-white' : 'text-[#0c0c0c]'}`}>
          {service.title}
        </h2>
        <motion.div 
          className={`text-[24px] ${
            isContactCard ? 'text-[#ffffff]/30' : 'text-[#0c0c0c]/30'
          }`}
          animate={{ 
            rotate: isActive ? 45 : 0 
          }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.4
          }}
        >
          →
        </motion.div>
      </motion.div>

      {/* Overlay espandibile */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            className={`absolute top-0 left-0 w-full rounded-[30px] border border-white/20 px-8 cursor-pointer overflow-hidden ${
              isContactCard 
                ? 'bg-main-black border-main-white' 
                : 'bg-gray-200'
            }`}
            variants={getExpandAnimation(index)}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => onToggle(service.id)}
          >
            {/* Header dell'overlay */}
            <div className="flex items-center justify-between h-[80px] md:h-[120px] lg:h-[130px]">
              <h2 className={`font-raleway font-semibold text-[20px] md:text-[26px] ${isContactCard ? 'text-main-white' : 'text-[#0c0c0c]'}`}>
                {service.title}
              </h2>
            </div>
            
            {/* Contenuto espanso con testo più piccolo */}
            <div className="py-4 px-1">
              {/* Intro */}
              <p className={`text-sm md:text-base font-raleway font-medium mb-4 ${service.calendly ? 'text-white' : 'text-[#0c0c0c]'}`}> 
                {service.content.intro}
              </p>
              
              {/* Punti elenco */}
              <ul className="space-y-2 mb-4">
                {service.content.points.map((point, idx) => (
                  <li key={idx} className={`text-sm md:text-base font-raleway font-normal flex items-start gap-2 ${service.calendly ? 'text-white/90' : 'text-[#0c0c0c]/80'}`}>
                    <span className={`text-xs mt-1.5 ${service.calendly ? 'text-white/60' : 'text-[#0c0c0c]/40'}`}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
              
              {service.calendly && (
                <div className="flex justify-start mt-6">
                  <a
                    href="https://calendly.com/" // Sostituisci con il tuo link Calendly
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full bg-creative-blue text-white font-semibold text-sm md:text-base shadow-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    Prenota call
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 