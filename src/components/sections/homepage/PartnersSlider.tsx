"use client";

import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Fallo", logo: "/img/partners/fallo.png" },
  { name: "Il Sole 24 Ore", logo: "/img/partners/il-sole-24-ore.png" },
  { name: "Refurbed", logo: "/img/partners/Refurbed.png" },
  { name: "United Colors", logo: "/img/partners/united-colors.png" },
  { name: "One", logo: "/img/partners/one.png" },
  { name: "Spotify", logo: "/img/partners/spotify.png" },
];

export default function PartnersSlider() {
  const [items] = useState(() => {
    // Inizializza con molte copie per garantire fluidità
    const copies: typeof partners = [];
    for (let i = 0; i < 20; i++) {
      copies.push(...partners);
    }
    return copies.map((partner, index) => ({
      ...partner,
      id: `${partner.name}-${index}`,
    }));
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      if (!isPaused && containerRef.current) {
        // Velocità di scroll (pixel per frame)
        const speed = 0.25;
        positionRef.current -= speed;

        containerRef.current.style.transform = `translateX(${positionRef.current}px)`;

        // Calcola la larghezza di un singolo set di partner (inclusi gap)
        // Stima approssimativa: ~100px medi per logo + gap responsive
        const averageLogoWidth = 100;
        const gapWidth =
          window.innerWidth >= 1024 ? 80 : window.innerWidth >= 768 ? 64 : 32;
        const singleSetWidth = partners.length * (averageLogoWidth + gapWidth);

        // Quando abbiamo scrollato abbastanza, riposiziona senza scatto
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current += singleSetWidth;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <section className="w-full bg-secondary py-12 md:py-16 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
        {/* Titolo */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">
            Hanno scelto di fidarsi di noi
          </p>
        </div>

        {/* Container dello slider */}
        <div className="relative w-full overflow-hidden">
          {/* Fade gradients ai bordi */}
          <div
            className="absolute left-0 top-0 w-20 md:w-32 h-full z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, #0c0c0c 0%, #0c0c0c 30%, rgba(12, 12, 12, 0) 100%)",
            }}
          />
          <div
            className="absolute right-0 top-0 w-20 md:w-32 h-full z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(to left, #0c0c0c 0%, #0c0c0c 30%, rgba(12, 12, 12, 0) 100%)",
            }}
          />

          {/* Slider con loop infinito vero */}
          <div
            ref={containerRef}
            className="flex items-center gap-8 md:gap-16 lg:gap-20 will-change-transform"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              width: "max-content",
            }}
          >
            {items.map((partner) => (
              <div
                key={partner.id}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="h-6 md:h-7 lg:h-8 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
