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
          description: "",
          features: []
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
        className={`w-full h-[80px] md:h-[120px] lg:h-[129px] rounded-[30px] flex items-center justify-between px-8 cursor-pointer overflow-hidden relative ${
          isActive ? 'opacity-0 pointer-events-none z-0' : 'z-0'
        } ${isContactCard ? 'border' : ''}`}
        onClick={() => onToggle(service.id)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: isActive ? 1 : 0.96 }}
        whileTap={{ scale: isActive ? 1 : 0.92 }}
        style={{ 
          position: 'relative',
          backgroundColor: isContactCard ? 'transparent' : '#F3F3F3',
          borderColor: isContactCard ? 'rgba(255,255,255,0.2)' : undefined
        }}
      >
        
        {/* Animated background color that fills from left to right */}
        <motion.div
          className="absolute inset-0 rounded-[30px]"
          style={{ backgroundColor: hoverColor }}
          initial={{ width: 0 }}
          animate={{ width: isHovered && !isActive ? '100%' : 0 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut"
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
              : isActive ? 'text-white/70' : (isHovered ? 'text-white/70' : 'text-[#0c0c0c]/30')
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
              <div className={`h-[80px] md:h-[100px] lg:h-[129px] flex items-center justify-between px-8 ${['video-making', 'social-media', 'branding', 'contact'].includes(service.id) ? 'pt-4 md:pt-8 lg:pt-0' : ''}`}>
                <h2 className={`font-raleway font-semibold text-[20px] md:text-[26px] ${service.id === 'branding' ? 'text-black' : 'text-white'}`}>
                  {service.title}
                </h2>
                <motion.div 
                  className={`text-[30px] cursor-pointer ${service.id === 'branding' ? 'text-black/70' : 'text-white/70'}`}
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

              {/* Contenuto del servizio espanso */}
              <div className={`flex-1 px-8 flex flex-col sm:items-center ${['video-making', 'social-media', 'branding', 'contact'].includes(service.id) ? 'sm:justify-start lg:-mt-8' : 'justify-center pb-8'}`}>
                {service.id === 'video-making' ? (
                  <>
                    {/* Container responsive: colonne SM-MD, righe da LG */}
                    <div className="hidden sm:flex sm:flex-row lg:flex-col w-full h-64 md:h-full gap-4">
                      {/* Colonna sinistra */}
                      <div className="flex-1 rounded-lg flex flex-col items-start justify-start">
                        <p className="text-white text-left font-raleway text-[17px] md:text-[18px] mt-6 lg:mt-4 mb-6 lg:mb-4 leading-tight 2xl:w-3/4">
                          Sei pronto a dare forma alla tua idea? Con il nostro servizio di Video Making, trasformiamo la tua visione in un video autentico e d'impatto.
                        </p>
                        <a 
                          href="https://www.youtube.com/@X2Marco" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          Vedi i miei video
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                      {/* Colonna destra */}
                      <div className="flex-1 rounded-lg flex items-center md:items-start lg:items-start justify-center">
                        <img 
                          src="/img/video-making-marco.png" 
                          alt="Video Making Marco" 
                          className="max-w-full max-h-full sm:mt-[18px] md:max-w-[95%] md:max-h-[95%] md:mt-4 lg:w-[348px] lg:h-[248px] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                    {/* Layout mobile - mostra paragrafo e button */}
                    <div className="sm:hidden flex flex-col items-start">
                      <p className="text-white text-left font-raleway text-[17px] leading-tight 2xl:w-3/4">
                        Sei pronto a dare forma alla tua idea? Con il nostro servizio di Video Making, trasformiamo la tua visione in un video autentico e d'impatto.
                      </p>
                      <a 
                        href="https://www.youtube.com/@X2Marco" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors mt-6"
                      >
                        Vedi i miei video
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </>
                ) : service.id === 'social-media' ? (
                  <>
                    {/* Container responsive: colonne SM-MD, righe da LG */}
                    <div className="hidden sm:flex sm:flex-row lg:flex-col w-full h-64 md:h-full gap-4">
                      {/* Colonna sinistra */}
                      <div className="flex-1 rounded-lg flex flex-col items-start justify-start">
                        <p className="text-white text-left font-raleway text-[17px] md:text-[18px] mt-6 lg:mt-4 mb-6 lg:mb-4 leading-tight 2xl:w-3/4">
                          Trasforma la tua presenza digitale con strategie social personalizzate. Creiamo contenuti autentici che connettono il tuo brand con la community giusta.
                        </p>
                        <a 
                          href="https://www.instagram.com/x2marco/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          Scopri i nostri social
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                      {/* Colonna destra */}
                      <div className="flex-1 rounded-lg flex items-center md:items-start lg:items-start justify-center">
                        <img 
                          src="/img/social-media-marco.png" 
                          alt="Social Media Marco" 
                          className="max-w-full max-h-full sm:mt-[18px] md:max-w-[95%] md:max-h-[95%] md:mt-4 lg:w-[348px] lg:h-[248px] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                    {/* Layout mobile - mostra paragrafo e button */}
                    <div className="sm:hidden flex flex-col items-start">
                      <p className="text-white text-left font-raleway text-[17px] leading-tight 2xl:w-3/4">
                        Trasforma la tua presenza digitale con strategie social personalizzate. Creiamo contenuti autentici che connettono il tuo brand con la community giusta.
                      </p>
                      <a 
                        href="https://www.instagram.com/x2marco/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors mt-6"
                      >
                        Scopri i nostri social
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1-2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </>
                ) : service.id === 'branding' ? (
                  <>
                    {/* Container responsive: colonne SM-MD, righe da LG */}
                    <div className="hidden sm:flex sm:flex-row lg:flex-col w-full h-64 md:h-full gap-4">
                      {/* Colonna sinistra */}
                      <div className="flex-1 rounded-lg flex flex-col items-start justify-start">
                        <p className="text-black text-left font-raleway text-[17px] md:text-[18px] mt-6 lg:mt-4 mb-6 lg:mb-4 leading-tight 2xl:w-3/4">
                          Il tuo brand merita un'identità visiva che racconta chi sei. Progettiamo loghi e sistemi di brand che lasciano il segno e restano impressi.
                        </p>
                        <a 
                          href="https://auth.services.adobe.com/en_US/deeplink.html#/social-only" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          Vedi i nostri brand
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                      {/* Colonna destra */}
                      <div className="flex-1 rounded-lg flex items-center md:items-start lg:items-start justify-center">
                        <img 
                          src="/img/branding-marco.png" 
                          alt="Branding Marco" 
                          className="max-w-full max-h-full sm:mt-[18px] md:max-w-[95%] md:max-h-[95%] md:mt-4 lg:w-[348px] lg:h-[248px] object-contain rounded-lg"
                        />
                      </div>
                    </div>
                    {/* Layout mobile - mostra paragrafo e button */}
                    <div className="sm:hidden flex flex-col items-start">
                      <p className="text-black text-left font-raleway text-[17px] leading-tight 2xl:w-3/4">
                        Il tuo brand merita un'identità visiva che racconta chi sei. Progettiamo loghi e sistemi di brand che lasciano il segno e restano impressi.
                      </p>
                      <a 
                        href="https://auth.services.adobe.com/en_US/deeplink.html#/social-only" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors mt-6"
                      >
                        Vedi i nostri brand
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </>
                ) : service.id === 'contact' ? (
                  <>
                    {/* Layout desktop senza immagine, allineato a sinistra */}
                    <div className="hidden sm:flex w-full">
                      <div className="flex flex-col items-start max-w-2xl">
                        <p className="text-white font-raleway text-[17px] md:text-[18px] mt-6 lg:mt-4 mb-6 lg:mb-4 leading-tight">
                          Hai un progetto in mente? Parliamone insieme! Ogni grande idea inizia con una conversazione. Contattaci per una consulenza gratuita.
                        </p>
                        <a 
                          href="#services" 
                          className="bg-white text-black px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-sm md:text-base flex items-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          Scrivici ora
                          <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15,3 21,3 21,9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                    {/* Layout mobile allineato a sinistra */}
                    <div className="sm:hidden flex flex-col items-start">
                      <p className="text-white font-raleway text-[17px] leading-tight">
                        Hai un progetto in mente? Parliamone insieme! Ogni grande idea inizia con una conversazione. Contattaci per una consulenza gratuita.
                      </p>
                      <a 
                        href="#services" 
                        className="bg-white text-black px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors mt-6"
                      >
                        Scrivici ora
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                          <polyline points="15,3 21,3 21,9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                      </a>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-white/90 mb-6 text-lg">
                      {service.content.intro}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.content.points.map((point, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center text-white/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + idx * 0.1, duration: 0.3 }}
                        >
                          <span className="w-2 h-2 bg-white/60 rounded-full mr-3 flex-shrink-0"></span>
                          {point}
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 