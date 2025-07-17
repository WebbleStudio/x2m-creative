"use client"; // This component will manage state and interactions

import { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion
import VisionCard from '../../ui/cards/VisionCard'; // Updated path for reorganized structure
import FadeUp from '../../animations/transitions/FadeUp';
import StaggeredFadeUp from '../../animations/transitions/StaggeredFadeUp';

interface CardData {
  id: number;
  number: number;
  title: string;
  content: string;
  imageUrl?: string;
  overlayImageUrl?: string;
  animateOverlay?: boolean; // Added flag for conditional animation
}

const initialCardsData: CardData[] = [
  { id: 1, number: 1, title: "Dinamico", content: "", imageUrl: "/img/bars.png", overlayImageUrl: "/img/redlines.png", animateOverlay: true },
  { id: 2, number: 2, title: "Creativo", content: "Content for card 2 - Our Core Values", imageUrl: "/img/lamp.png", overlayImageUrl: "/img/tools.png", animateOverlay: false },
  { id: 3, number: 3, title: "Affidabile", content: "Content for card 3 - Innovative Approach", imageUrl: "/img/planets.png", overlayImageUrl: "/img/rocket.png", animateOverlay: false },
  // For Framer Motion to animate smoothly, it's good if all cards are always "present"
  // even if some are styled to be "out of view" or fully transparent initially.
  // We'll stick to 3 cards for the left-center-right visual for now.
];

export default function Vision() {
  const [cardsData, setCardsData] = useState<CardData[]>(initialCardsData);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); // Stato per hover su lg

  // Effect for fade-in animation on mount/scroll into view (optional)
  // useEffect(() => {
  // setIsVisible(true); // This might not be needed if we use Framer Motion's initial/animate
  // }, []);

  const handleCardClick = (clickedCardId: number) => {
    setCardsData(prevCards => {
      const clickedIndex = prevCards.findIndex(card => card.id === clickedCardId);

      if (clickedIndex === 0) {
        // If center card is clicked, rotate forward by one
        const newCards = [...prevCards];
        const first = newCards.shift();
        if (first) newCards.push(first);
        return newCards;
      }

      // Allow clicking on any card to rotate
      if (clickedIndex > 0) {
        const newCards = [...prevCards];
        for (let i = 0; i < clickedIndex; i++) {
          const first = newCards.shift();
          if (first) newCards.push(first);
        }
        return newCards;
      }
      return prevCards;
    });
  };

  // Define animation variants for Framer Motion
  // These values might need fine-tuning for the "amaze me" effect!
  const cardVariants = {
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 10,
      rotateY: 0, // Added for potential 3D effect
      filter: 'blur(0px)', // No blur for the center card
    },
    left: {
      x: -250, // Increased distance
      scale: 0.7,
      opacity: 0.5,
      zIndex: 5,
      rotateY: 30, // Side cards slightly rotated
      filter: 'blur(1px)', // Blur for the left card
    },
    right: {
      x: 250,
      scale: 0.7,
      opacity: 0.5,
      zIndex: 5,
      rotateY: -30,
      filter: 'blur(1px)', // Ensured consistent blur
    },
    // For cards that might be "out of view" if we had more than 3
    // For now, with 3 cards, one will always be left, one center, one right.
  };
  
  const cardTransition = {
    type: "spring",
    stiffness: 260,
    damping: 30,
    // duration: 0.5 // Spring doesn't use duration directly like this, stiffness/damping control it
  };

  // Function to determine which variant a card should animate to
  const getVariantName = (index: number) => {
    if (index === 0) return "center";
    if (index === 1) return "right"; // Card at data index 1 is styled to be on the right
    if (index === 2) return "left";  // Card at data index 2 is styled to be on the left
    // This logic assumes the `cardsData` array is rotated such that:
    // cardsData[0] is always the one intended for the center
    // cardsData[1] is always the one intended for the right
    // cardsData[2] is always the one intended for the left
    return "center"; // Fallback, though with 3 cards, should always be one of the above
  };

  return (
    <section
      id="vision"
      className="min-h-[700px] md:h-screen lg:min-h-[850px] bg-main-black text-main-white flex flex-col items-center justify-center relative overflow-hidden"
      style={{ perspective: '1000px' }}
      itemScope
      itemType="https://schema.org/AboutPage"
      aria-labelledby="vision-heading"
    >
      {/* Invisible structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "La Nostra Visione - X2M Creative",
            "description": "X2M combina creatività e strategia per far crescere il tuo brand in modo misurabile. Approccio dinamico, creativo e affidabile.",
            "mainEntity": {
              "@type": "Organization",
              "name": "X2M Creative",
              "url": "https://x2marco.com",
              "description": "Agenzia creativa specializzata in branding, strategia social media e video marketing"
            },
            "about": [
              {
                "@type": "Thing",
                "name": "Approccio Dinamico",
                "description": "Soluzioni creative che si adattano alle esigenze del mercato"
              },
              {
                "@type": "Thing", 
                "name": "Creatività",
                "description": "Design innovativo e contenuti originali per il tuo brand"
              },
              {
                "@type": "Thing",
                "name": "Affidabilità",
                "description": "Partner di fiducia per la crescita sostenibile del tuo business"
              }
            ]
          })
        }}
      />
      
      <header className="w-full px-5 text-center mt-16"> {/* Added mt-16 here */}
        <h2 
          id="vision-heading"
          className="mb-6 font-degular-display leading-tight"
          itemProp="name"
        >
          <span className="block font-raleway font-medium text-[30px] md:text-[36px] 2xl:text-[45px]">Potenzia la tua visione.</span>
          <span className="block font-instrument-serif italic text-[30px] md:text-[36px] 2xl:text-[45px]">Amplifica i tuoi risultati.</span>
        </h2>
        <p 
          className="text-[15px] md:text-[18px] 2xl:text-[23px] text-main-white mt-0 mb-12 max-w-2xl mx-auto font-raleway font-medium"
          itemProp="description"
        >
          X2M combina creatività e strategia per far <br></br> crescere il tuo brand in modo misurabile
        </p>
      </header>
      
      {/* Responsive: animazione sotto lg, 3 card affiancate su lg+ */}
      <div className="w-full h-[400px] flex items-center justify-center relative">
        {/* Mobile/tablet: animazione */}
        <div className="flex-1 h-full block lg:hidden relative" role="region" aria-label="Caratteristiche aziendali interattive">
          <div className="relative flex items-center justify-center w-full h-full">
            {cardsData.map((card, index) => (
              <motion.div
                key={card.id}
                className="absolute"
                variants={{
                  ...cardVariants,
                  [getVariantName(index)]: {
                    ...cardVariants[getVariantName(index) as keyof typeof cardVariants],
                    transition: {
                      ...cardTransition,
                      delay: 0.2
                    }
                  }
                }}
                initial="hidden"
                animate={getVariantName(index)}
                transition={cardTransition}
                role="button"
                tabIndex={0}
                aria-label={`Carta ${card.title}, numero ${card.number}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.id);
                  }
                }}
              >
                <VisionCard
                  title={card.title}
                  cardNumber={card.number}
                  content={card.content}
                  imageUrl={card.imageUrl}
                  overlayImageUrl={card.overlayImageUrl}
                  animateOverlay={card.animateOverlay}
                  onClick={() => handleCardClick(card.id)}
                  isActive={index === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>
        {/* Desktop: 3 card affiancate senza animazione, overlay su hover */}
        <div className="hidden lg:flex flex-row items-center justify-center w-full h-full" role="region" aria-label="Caratteristiche aziendali">
          {cardsData.map((card, index) => (
            <FadeUp key={card.id} delay={0.2 + (index * 0.2)} duration={0.8} distance={40} threshold={0.2} className="h-full flex-1 max-w-[470px] lg:px-6 flex items-center justify-center">
              <article
                className="w-full h-full flex items-center justify-center"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                itemScope
                itemType="https://schema.org/CreativeWork"
              >
                <meta itemProp="name" content={card.title} />
                <meta itemProp="description" content={`Approccio ${card.title.toLowerCase()} di X2M Creative`} />
                <VisionCard
                  title={card.title}
                  cardNumber={card.number}
                  content={card.content}
                  imageUrl={card.imageUrl}
                  overlayImageUrl={card.overlayImageUrl}
                  animateOverlay={card.animateOverlay}
                  isActive={index === 0 ? hoveredIndex !== 0 : hoveredIndex === index}
                  size="lg"
                />
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
      {/* Placeholder for actual content of the Vision section if any */}
    </section>
  );
} 