import Image from 'next/image';

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
  return (
    <section className={`${heightClass ? heightClass : "min-h-[700px] md:h-screen lg:min-h-[850px]"} bg-main-white text-main-black flex flex-col items-center justify-center relative overflow-hidden ${noBgBox ? '' : 'pb-16'} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <Image
          src={backgroundImage}
          alt="Background accent"
          width={2000}
          height={1500}
          className="object-cover scale-150 sm:scale-100"
        />
      </div>

      <div className="text-center relative z-10">
        {/* Stelle Hero - versione Portfolio (noBgBox) */}
        {noBgBox ? (
          <>
            <Image
              src="/img/blue-star.png"
              alt="Blue star accent"
              width={26}
              height={26}
              className="absolute top-[-38px] left-[-28px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/img/green-star.png"
              alt="Green star accent"
              width={26}
              height={26}
              className="absolute top-[-38px] right-[-28px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
            />
            <Image
              src="/img/red-star.png"
              alt="Red star accent"
              width={26}
              height={26}
              className="absolute bottom-[-42px] left-[-10px] z-20 w-[26px] h-[26px] sm:w-[30px] sm:h-[30px] md:w-[34px] md:h-[34px] lg:w-[39px] lg:h-[39px] xl:w-[45px] xl:h-[45px] 2xl:w-[52px] 2xl:h-[52px]"
              style={{ width: 'auto', height: 'auto' }}
            />
          </>
        ) : (
          <>
            <Image 
              src="/img/blue-star.png" 
              alt="Blue star accent"
              width={40}
              height={40}
              className="absolute top-[-30px] left-[-15px] sm:top-[-40px] sm:left-[-30px] 2xl:top-[-60px] 2xl:left-[-60px] z-20 w-[40px] h-[40px] 2xl:w-[72px] 2xl:h-[72px]"
              style={{ width: '40px', height: '40px' }}
            />
            <Image 
              src="/img/green-star.png" 
              alt="Green star accent"
              width={40}
              height={40}
              className="absolute top-[-20px] right-[-10px] sm:top-[-30px] sm:right-[-25px] 2xl:top-[-50px] 2xl:right-[-60px] z-20 w-[40px] h-[40px] 2xl:w-[72px] 2xl:h-[72px]"
              style={{ width: '40px', height: '40px' }}
            />
            <Image 
              src="/img/red-star.png" 
              alt="Red star accent"
              width={40}
              height={40}
              className="absolute bottom-[-65px] left-[-10px] sm:bottom-[-75px] sm:left-[-18px] 2xl:bottom-[-90px] 2xl:left-[-60px] z-20 w-[40px] h-[40px] 2xl:w-[72px] 2xl:h-[72px]"
              style={{ width: '40px', height: '40px' }}
            />
          </>
        )}

        <div>
          {quote && author && (
            <p className="text-[18px] text-[#000000]/40 mb-4 font-raleway">
              - {author}
            </p>
          )}
          <h1 className="text-[62px] sm:text-[72px] md:text-[84px] lg:text-[96px] xl:text-[110px] 2xl:text-[130px] leading-[1.1em] font-degular-display font-semibold">
            <span className="relative inline-block px-2">
              {!noBgBox && <div className="absolute inset-0 bg-creative-blue rounded-[15px] -z-10 rotate-[2deg]"></div>}
              <span className={`relative ${noBgBox ? "text-main-black" : "text-main-white"}`}>{title.firstLine}</span>
            </span>
            {title.secondLine && (
              <>
                <br />
                {title.secondLine.gradient ? (
                  /* Mobile/tablet: Intelligence e Having fun separati */
                  <>
                    <span className="flex flex-col items-center lg:hidden">
                      <span className="font-sprat font-medium text-[57px] sm:text-[64px] md:text-[74px] xl:text-[100px] 2xl:text-[120px] bg-gradient-to-r from-[#254454] to-creative-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text tracking-[-3.5px]">
                        {title.secondLine.text.split(' ')[0]}
                      </span>
                      {title.thirdLine && (
                        <span className="font-degular-display font-semibold text-main-black xl:text-[100px] 2xl:text-[120px]" style={{marginTop: '-0.2em'}}>
                          {title.thirdLine}
                        </span>
                      )}
                    </span>

                    {/* Desktop: Intelligence Having fun insieme, ma solo Intelligence ha il gradiente */}
                    <span className="hidden lg:inline">
                      <span className="font-sprat font-medium lg:text-[84px] xl:text-[100px] 2xl:text-[120px] bg-gradient-to-r from-[#254454] to-creative-blue bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-text tracking-[-3.5px]">
                        {title.secondLine.text.split(' ')[0]}
                      </span>
                      {title.thirdLine && (
                        <span className="font-degular-display font-semibold lg:text-[84px] xl:text-[100px] 2xl:text-[120px] text-main-black ml-3 align-middle">
                          {title.thirdLine}
                        </span>
                      )}
                    </span>
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
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 text-center">
          <p className="text-[18px] text-[#000000]/40 font-raleway">
            Scopri di più
          </p>
          <img 
            src="/img/icons/arrows.svg" 
            alt="Scroll down arrows" 
            className="mx-auto mt-3 h-6 w-6 animate-bounce-custom"
          />
        </div>
      )}
    </section>
  );
} 