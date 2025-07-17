"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

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
  layout?: 'mobile' | 'lg';
  containerRef?: React.RefObject<HTMLDivElement | null>;
  totalServices?: number;
}

export default function ExpandableServiceCard({
  service,
  index,
  isActive,
  onToggle,
  layout = 'mobile',
  containerRef,
  totalServices = 4
}: ExpandableServiceCardProps) {
  
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Funzione per ottenere il colore di hover basato sull'ID del servizio
  const getHoverColor = (serviceId: string) => {
    switch (serviceId) {
      case 'video-making':
        return '#F00034';
      case 'social-media':
        return '#00AAFF';
      case 'branding':
        return '#00F09C';
      case 'contact':
        return '#FF4D00';
      default:
        return '#F00034';
    }
  };

  // Funzione per ottenere il contenuto esteso per ogni servizio
  const getExpandedContent = (serviceId: string) => {
    switch (serviceId) {
      case 'video-making':
        return {
          title: "Video Making",
          description: "Trasformiamo le tue idee in video coinvolgenti e professionali.",
          features: [
            "Concept e storytelling",
            "Riprese professionali",
            "Editing e post-produzione"
          ]
        };
      case 'social-media':
        return {
          title: "Social Media Strategy",
          description: "Strategie personalizzate per far crescere il tuo brand online.",
          features: [
            "Piano editoriale strategico",
            "Creazione contenuti",
            "Community management"
          ]
        };
      case 'branding':
        return {
          title: "Branding & Identity",
          description: "Identità visive uniche che raccontano il tuo brand.",
          features: [
            "Logo design e brand identity",
            "Palette colori e typography",
            "Brand guidelines"
          ]
        };
      case 'contact':
        return {
          title: "Contattaci",
          description: "Iniziamo insieme il tuo progetto con una consulenza gratuita.",
          features: [
            "Consulenza strategica",
            "Proposta personalizzata",
            "Nessun impegno"
          ]
        };
      default:
        return {
          title: "Servizio",
          description: "Descrizione del servizio",
          features: []
        };
    }
  };

  const isContactCard = service.id === 'contact';
  const hoverColor = getHoverColor(service.id);
  const expandedContent = getExpandedContent(service.id);

  // Calcola la posizione e le dimensioni per l'overlay espandibile
  const getOverlayStyle = () => {
    if (!cardRef.current || !containerRef?.current) return {};

    const cardRect = cardRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calcola la posizione relativa al container
    const top = cardRect.top - containerRect.top;
    const left = cardRect.left - containerRect.left;
    
    // Calcola l'altezza totale basata sul layout
    let totalHeight;
    if (layout === 'lg') {
      // Per lg: 4 cards da 129px + 3 gap da 6px = 534px
      totalHeight = (4 * 129) + (3 * 6);
    } else {
      // Per mobile: 4 cards da 80px (mobile) o 120px (md) + 3 gap da 8px (space-y-2)
      const cardHeight = window.innerWidth >= 768 ? 120 : 80;
      totalHeight = (4 * cardHeight) + (3 * 8);
    }
    
    return {
      top: 0, // Inizia sempre dall'alto del container
      left: 0,
      width: '100%',
      height: totalHeight,
      originY: top // Usa questo per l'animazione di espansione
    };
  };

  const overlayStyle = getOverlayStyle();

  return (
    <>
      {/* Card base */}
      <motion.div
        ref={cardRef}
        className={`w-full h-[80px] md:h-[120px] lg:h-[129px] rounded-[30px] border border-white/20 flex items-center justify-between px-8 cursor-pointer overflow-hidden relative ${
          isContactCard ? 'bg-transparent' : 'bg-gray-200'
        } ${isActive ? 'opacity-0 pointer-events-none z-0' : 'z-0'}`}
        onClick={() => onToggle(service.id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: isActive ? 1 : 0.96 }}
        whileTap={{ scale: isActive ? 1 : 0.92 }}
        style={{ position: 'relative' }}
      >
        {/* Background colorato animato per hover */}
        <motion.div
          className="absolute inset-0 rounded-[30px]"
          style={{ backgroundColor: hoverColor }}
          initial={{ x: "-100%" }}
          animate={{ 
            x: (isHovered && !isActive) ? "0%" : "-100%"
          }}
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.4
          }}
        />
        
        <h2 className={`font-raleway font-semibold text-[20px] md:text-[26px] relative z-10 transition-colors duration-300 ${
          isContactCard 
            ? (isHovered && !isActive) ? 'text-white' : 'text-main-white'
            : isActive ? 'text-white' : 'text-[#0c0c0c]'
        }`}>
          {service.title}
        </h2>
        <motion.div 
          className={`text-[24px] relative z-10 transition-colors duration-300 ${
            isContactCard 
              ? (isHovered && !isActive) ? 'text-white/70' : 'text-[#ffffff]/30'
              : isActive ? 'text-white/70' : 'text-[#0c0c0c]/30'
          }`}
          animate={{ rotate: isActive ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isActive ? '×' : '→'}
        </motion.div>
      </motion.div>

      {/* Overlay espandibile */}
      <AnimatePresence>
        {isActive && containerRef?.current && (
          <motion.div
            className="absolute rounded-[30px] z-20 overflow-hidden cursor-pointer"
            style={{
              backgroundColor: hoverColor,
              ...overlayStyle
            }}
            onClick={() => onToggle(service.id)}
            initial={{ 
              height: layout === 'lg' ? 129 : (window.innerWidth >= 768 ? 120 : 80),
              top: overlayStyle.originY 
            }}
            animate={{ 
              height: overlayStyle.height,
              top: 0
            }}
            exit={{ 
              height: layout === 'lg' ? 129 : (window.innerWidth >= 768 ? 120 : 80),
              top: overlayStyle.originY,
              opacity: 0
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.6,
              opacity: { delay: 0.2, duration: 0.3 }
            }}
          >
                         <motion.div
               className="h-full flex flex-col text-white"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ 
                 opacity: { duration: 0.2 },
                 default: { delay: 0.2, duration: 0.4 }
               }}
             >
               {/* Header con titolo e X - mantiene la stessa struttura della card originale */}
               <div className="h-[80px] md:h-[120px] lg:h-[129px] flex items-center justify-between px-8">
                 <h2 className="font-raleway font-semibold text-[20px] md:text-[26px] text-white">
                   {service.title}
                 </h2>
                 <motion.div 
                   className="text-[30px] text-white/70 cursor-pointer"
                   onClick={(e) => {
                     e.stopPropagation();
                     onToggle(service.id);
                   }}
                   whileHover={{ scale: 1.1 }}
                   whileTap={{ scale: 0.9 }}
                 >
                   ×
                 </motion.div>
               </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 