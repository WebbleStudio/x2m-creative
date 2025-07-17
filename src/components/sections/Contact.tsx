"use client";

export default function Contact() {
  return (
    <section 
      id="contact" 
      className="min-h-[700px] md:h-screen lg:min-h-[850px] xl:min-h-[900px] 2xl:min-h-[1100px] bg-main-black text-main-white flex flex-col items-center justify-center"
      itemScope 
      itemType="https://schema.org/ContactPoint"
      aria-labelledby="contact-heading"
    >
      {/* Invisible structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPoint",
            "contactType": "customer service",
            "areaServed": "IT",
            "availableLanguage": ["it", "en"],
            "url": "https://x2marco.com#contact",
            "parentOrganization": {
              "@type": "Organization",
              "name": "X2M Creative",
              "url": "https://x2marco.com"
            }
          })
        }}
      />
      
      <header className="mb-8 text-center lg:hidden">
        <h2 id="contact-heading" className="text-white text-4xl md:text-5xl font-raleway leading-tight">
          <span className="block text-white font-raleway font-medium text-[30px] md:text-[36px]">Richiedi una</span>
          <span className="block text-white font-instrument-serif italic mt-0.5 text-[30px] md:text-[36px]">Consulenza</span>
        </h2>
      </header>
      <div
        className="w-full aspect-square sm:aspect-auto sm:h-auto sm:min-h-[320px] md:min-h-[420px] lg:min-h-[550px] 2xl:min-h-[700px] rounded-3xl flex items-center justify-center mx-auto bg-repeat bg-left md:bg-left-bottom lg:bg-center relative lg:bg-[length:80%_auto]"
        style={{ 
          backgroundImage: "url('/img/contact-us.png')",
          backgroundSize: 'auto 100%'
        }}
        role="img"
        aria-label="Immagine di contatto X2M Creative"
      >
        {/* Overlay gradiente nero-trasparente dal basso verso l'alto */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
          
          {/* Box email nella parte bassa - nascosto su lg */}
          <form 
            action="https://formspree.io/f/xblkjlwv" 
            method="POST" 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] block lg:hidden"
            aria-label="Form di contatto mobile"
            itemProp="contactOption"
          >
            <div className="w-full bg-white/90 rounded-2xl flex items-center justify-center px-4 py-3 shadow-lg">
              <input
                type="email"
                name="email"
                placeholder="Inserisci la tua mail"
                required
                className="w-full bg-transparent border-none outline-none text-gray-500 placeholder-gray-400 text-base md:text-lg font-raleway text-center"
                aria-label="Indirizzo email per contatto"
                itemProp="email"
              />
              <button 
                type="submit" 
                className="ml-2 flex items-center justify-center bg-black hover:bg-neutral-900 text-white rounded-xl px-4 py-2 transition-all duration-200"
                aria-label="Invia richiesta di contatto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>

          {/* Riquadro bianco sulla destra - visibile solo su lg */}
          <div className="hidden lg:flex flex-col justify-center absolute right-6 top-6 bottom-6 w-1/2 bg-[#fafafa] bg-opacity-70 rounded-2xl backdrop-blur-sm p-12">
            <h2 className="text-black text-5xl font-raleway leading-tight mb-2">
              <span className="block font-raleway font-medium text-[42px]">Richiedi una</span>
              <span className="block font-instrument-serif italic text-[42px] mt-0.5">Consulenza</span>
            </h2>
            <p className="text-black text-lg font-raleway mb-8">
              Inserisci la tua mail. Ti contatteremo al più presto per offrirti una consulenza personalizzata.
            </p>
            <form 
              action="https://formspree.io/f/xblkjlwv" 
              method="POST" 
              className="w-full"
              aria-label="Form di contatto desktop"
              itemProp="contactOption"
            >
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Inserisci la tua mail"
                  required
                  className="w-full bg-white rounded-2xl px-6 py-5 text-gray-500 placeholder-gray-400 text-lg font-raleway shadow-md border-none outline-none"
                  aria-label="Indirizzo email per contatto"
                  itemProp="email"
                />
                <button 
                  type="submit" 
                  className="ml-2 flex items-center justify-center bg-black hover:bg-neutral-900 text-white rounded-xl px-5 py-4 transition-all duration-200"
                  aria-label="Invia richiesta di contatto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-7 h-7" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      
    </section>
  );
} 