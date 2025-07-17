"use client";

import Image from 'next/image';
import ParallaxStars from '../../animations/effects/ParallaxStars';
import FadeUp from '../../animations/transitions/FadeUp';
import { useEffect, useState } from 'react';

interface HeroProps {
  quote?: string;
  author?: string;
  title: {
    firstLine: string;
    secondLine?: {
      text: string;
      gradient?: boolean;
    };
    thirdLine?: string;
  };
  showScrollIndicator?: boolean;
  backgroundImage?: string;
  className?: string;
  heightClass?: string; // nuova prop opzionale
  noBgBox?: boolean; // nuova prop opzionale
}

export default function Hero({ 
  quote,
  author,
  title,
  showScrollIndicator = true,
  backgroundImage = "/img/gradient.png",
  className = "",
  heightClass,
  noBgBox = false
}: HeroProps) {
  // Stato per gestire se il componente è montato (client-side)
  const [isMounted, setIsMounted] = useState(false);
  
  // Responsive stars positions - inizializzo con valori di default mobile
  const [stars, setStars] = useState([
    {
      src: '/img/blue-star.png',
      alt: 'Stella decorativa blu - Elemento grafico X2M Creative',
      initialTop: -30,
      initialLeft: -15,
      speed: 0.2,
      width: 40,
      height: 40,
    },
    {
      src: '/img/green-star.png',
      alt: 'Stella decorativa verde - Elemento grafico X2M Creative',
      initialTop: -20,
      initialLeft: 320, // valore di default mobile
      speed: 0.15,
      width: 40,
      height: 40,
    },
    {
      src: '/img/red-star.png',
      alt: 'Stella decorativa rossa - Elemento grafico X2M Creative',
      initialTop: 300,
      initialLeft: -10,
      speed: 0.25,
      width: 40,
      height: 40,
    },
  ]);

  useEffect(() => {
    // Indica che il componente è montato
    setIsMounted(true);
    
    function updateStarsPosition() {
      setStars([
        {
          src: '/img/blue-star.png',
          alt: 'Stella decorativa blu - Elemento grafico X2M Creative',
          initialTop: -30,
          initialLeft: -15,
          speed: 0.2,
          width: 40,
          height: 40,
        },
        {
          src: '/img/green-star.png',
          alt: 'Stella decorativa verde - Elemento grafico X2M Creative',
          initialTop: -20,
          initialLeft: window.innerWidth >= 1024 ? 900 : 320,
          speed: 0.15,
          width: 40,
          height: 40,
        },
        {
          src: '/img/red-star.png',
          alt: 'Stella decorativa rossa - Elemento grafico X2M Creative',
          initialTop: window.innerWidth >= 1536 ? 350 : 300,
          initialLeft: window.innerWidth >= 1536 ? -50 : -10,
          speed: 0.25,
          width: 40,
          height: 40,
        },
      ]);
    }
    
    // Aggiorna immediatamente le posizioni
    updateStarsPosition();
    
    // Ascolta i cambi di dimensione
    window.addEventListener('resize', updateStarsPosition);
    return () => window.removeEventListener('resize', updateStarsPosition);
  }, []);

  return (
    <section className={`${heightClass ? heightClass : "min-h-[700px] md:h-screen lg:min-h-[850px]"} bg-main-white text-main-black flex flex-col items-center justify-center relative overflow-hidden ${noBgBox ? '' : 'pb-16'} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src={backgroundImage}
                      alt="Sfondo decorativo con elementi grafici creativi per X2M Creative"
          width={2000}
          height={1500}
          className="object-cover scale-150 sm:scale-100"
          priority={backgroundImage === "/img/gradient.png"}
          loading={backgroundImage === "/img/gradient.png" ? "eager" : "lazy"}
        />
      </div>

      <div className="text-center relative z-10">
        {/* Stelle Hero - versione Portfolio (noBgBox) */}
        {noBgBox ? (
          <>
            <Image
              src="/img/blue-star.png"
              alt="Stella decorativa blu - Elemento grafico X2M Creative"
              width={26}
              height={26}
              className="absolute top-[-38px] left-[-28px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
              loading="lazy"
              aria-hidden="true"
            />
            <Image
              src="/img/green-star.png"
              alt="Stella decorativa verde - Elemento grafico X2M Creative"
              width={26}
              height={26}
              className="absolute top-[-38px] right-[-28px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
              loading="lazy"
              aria-hidden="true"
            />
            <Image
              src="/img/red-star.png"
              alt="Stella decorativa rossa - Elemento grafico X2M Creative"
              width={26}
              height={26}
              className="absolute bottom-[-42px] left-[-10px] 2xl:bottom-[-52px] 2xl:left-[-50px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
              loading="lazy"
              aria-hidden="true"
            />
          </>
        ) :
          // Renderizza ParallaxStars solo dopo che il componente è montato
          isMounted && <ParallaxStars stars={stars} />
        }

        <div>
          {quote && author && (
            <blockquote className="text-[18px] text-[#000000]/40 mb-4 font-raleway">
              <p>"{quote}"</p>
              <cite className="not-italic">- {author}</cite>
            </blockquote>
          )}
          {/* Show only author if quote is not present but author is */}
          {!quote && author && (
            <div className="text-[18px] text-[#000000]/40 mb-4 font-raleway">
              <cite className="not-italic">- {author}</cite>
            </div>
          )}
          <h1 className="text-[62px] sm:text-[72px] md:text-[84px] lg:text-[96px] xl:text-[110px] 2xl:text-[130px] leading-[1.1em] font-degular-display font-semibold">
            <span className="relative inline-block px-2 align-middle">
              {!noBgBox && (
                <div 
                  className="absolute inset-0 bg-creative-blue rounded-[15px] -z-10 animate-tilt-in" 
                  aria-hidden="true"
                ></div>
              )}
              <span className={`relative ${noBgBox ? "text-main-black" : "text-main-white"}`}>{title.firstLine}</span>
            </span>
            {/* 'is' fuori dal box azzurro, stile come 'Having fun' */}
            <FadeUp trigger="mount" delay={2.2} duration={0.8} distance={40} className="inline-block align-middle ml-2">
              <span className="font-degular-display font-semibold text-main-black xl:text-[110px] 2xl:text-[130px]" style={{letterSpacing: '-2px'}}>
                is
              </span>
            </FadeUp>
            {title.secondLine && (
              <>
                <br />
                {title.secondLine.gradient ? (
                  /* Mobile/tablet: Intelligence e Having fun separati */
                  <>
                    <span className="flex flex-col items-center lg:hidden">
                      <FadeUp trigger="mount" delay={2.5} duration={0.8} distance={40} className="inline-block">
                        <span className="font-sprat font-medium text-[57px] sm:text-[64px] md:text-[74px] xl:text-[100px] 2xl:text-[120px] bg-gradient-to-r from-[#254454] to-creative-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text tracking-[-3.5px]">
                          {title.secondLine.text.split(' ')[0]}
                        </span>
                      </FadeUp>
                      {title.thirdLine && (
                        <FadeUp trigger="mount" delay={3.0} duration={0.8} distance={40} className="inline-block" style={{marginTop: '-0.2em'}}>
                          <span className="font-degular-display font-semibold text-main-black xl:text-[100px] 2xl:text-[120px]">
                            {title.thirdLine}
                          </span>
                        </FadeUp>
                      )}
                    </span>

                    {/* Desktop: Intelligence Having fun insieme, ma solo Intelligence ha il gradiente */}
                    <FadeUp trigger="mount" delay={2.5} duration={0.8} distance={40} className="hidden lg:inline">
                      <span className="font-sprat font-medium lg:text-[84px] xl:text-[100px] 2xl:text-[120px] bg-gradient-to-r from-[#254454] to-creative-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text tracking-[-3.5px]">
                        {title.secondLine.text.split(' ')[0]}
                      </span>
                      {title.thirdLine && (
                        <span className="font-degular-display font-semibold lg:text-[84px] xl:text-[100px] 2xl:text-[120px] text-main-black ml-3 align-middle">
                          {title.thirdLine}
                        </span>
                      )}
                    </FadeUp>
                  </>
                ) : (
                  <span className="font-degular-display font-semibold text-main-black">
                    {title.secondLine.text}
                  </span>
                )}
              </>
            )}
            {title.thirdLine && !title.secondLine?.gradient && (
              <>
                <br />
                <span className="font-degular-display font-semibold text-main-black">
                  {title.thirdLine}
                </span>
              </>
            )}
          </h1>
          {noBgBox && title.firstLine === 'Portfolio' && (
            <p className="mt-2 text-lg text-main-black/70 font-raleway">immergiti nei nostri progetti</p>
          )}
        </div>
      </div>

      {showScrollIndicator && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center" role="navigation" aria-label="Indicatore di scroll">
          <p className="text-[18px] text-[#000000]/40 font-raleway">
            Scopri di più
          </p>
          <img 
            src="/img/icons/arrows.svg" 
            alt="Frecce di scroll verso il basso" 
            className="mx-auto mt-3 h-6 w-6 animate-bounce-custom"
            loading="lazy"
          />
        </div>
      )}
    </section>
  );
} 