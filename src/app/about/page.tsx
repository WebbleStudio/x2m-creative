import { Metadata } from "next";
import Script from "next/script";
import Hero from "@/components/sections/Hero";

export const metadata: Metadata = {
  title: "Chi Siamo - X2M Creative",
  description: "Scopri la storia di X2M Creative: agenzia creativa italiana specializzata in branding, social media strategy, video making e advertisement. La nostra missione è far crescere il tuo brand combinando creatività e strategia.",
  keywords: ["chi siamo x2m creative", "agenzia creativa italiana", "team x2m", "storia x2m creative", "missione brand growth", "creatività strategia"],
      openGraph: {
      title: "Chi Siamo - X2M Creative",
      description: "Scopri la storia di X2M Creative: agenzia creativa italiana specializzata in branding, social media strategy, video making e advertisement.",
    url: "https://x2m-creative.vercel.app/about",
    type: "website",
    images: [
      {
        url: "/img/X2M.png",
        width: 1200,
        height: 630,
        alt: "X2M Creative Team",
      },
    ],
  },
  twitter: {
          title: "Chi Siamo - X2M Creative",
      description: "Scopri la storia di X2M Creative: agenzia creativa italiana specializzata in branding, social media strategy, video making e advertisement.",
    images: ["/img/X2M.png"],
  },
  alternates: {
    canonical: "https://x2m-creative.vercel.app/about",
  },
};

export default function AboutPage() {
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://x2m-creative.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Chi Siamo",
        "item": "https://x2m-creative.vercel.app/about"
      }
    ]
  };

  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
                "name": "Chi Siamo - X2M Creative",
            "description": "Pagina informativa su X2M Creative: la nostra storia, missione e approccio al brand growth attraverso creatività e strategia",
    "url": "https://x2m-creative.vercel.app/about",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://x2m-creative.vercel.app/#organization"
    },
    "isPartOf": {
      "@type": "WebSite",
                    "name": "X2M Creative",
      "url": "https://x2m-creative.vercel.app"
    }
  };

  return (
    <>
      <Script
        id="breadcrumb-about-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Script
        id="about-page-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageJsonLd),
        }}
      />
      
      <main className="w-full">
        <Hero 
          title={{
            firstLine: "Chi Siamo"
          }}
          showScrollIndicator={false}
          heightClass="h-[450px] min-h-[450px] md:h-[450px] lg:h-[450px]"
          noBgBox={true}
        />
        
        <section className="min-h-[700px] bg-main-black text-main-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <header className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-degular-display">
                Creatività e Strategia per il <span className="text-creative-blue">Brand Growth</span>
              </h2>
              <p className="text-xl text-main-white/80 max-w-3xl mx-auto font-raleway leading-relaxed">
                X2M Creative nasce dalla passione per la creatività e dalla convinzione che ogni brand abbia una storia unica da raccontare. 
                Combiniamo design innovativo e strategia di marketing per trasformare le idee in successi concreti.
              </p>
            </header>

            <article className="space-y-16" itemScope itemType="https://schema.org/Organization">
              <meta itemProp="name" content="X2M Creative" />
              <meta itemProp="url" content="https://x2m-creative.vercel.app" />
              <meta itemProp="foundingDate" content="2024" />
              <meta itemProp="areaServed" content="Italy" />
              
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4 font-degular-display text-creative-blue">La Nostra Missione</h3>
                  <p className="text-main-white/80 font-raleway leading-relaxed mb-4" itemProp="description">
                    La nostra missione è semplice ma ambiziosa: far crescere il tuo brand in modo misurabile. 
                    Non ci limitiamo a creare contenuti belli, ma sviluppiamo strategie che generano risultati concreti e duraturi.
                  </p>
                  <p className="text-main-white/80 font-raleway leading-relaxed">
                    Ogni progetto è un'opportunità per dimostrare come la creatività, quando è guidata da una strategia solida, 
                    possa trasformare completamente la percezione di un brand e il suo successo sul mercato.
                  </p>
                </div>
                <div className="relative">
                  <div className="w-full h-64 bg-gradient-to-br from-creative-blue/20 to-main-white/10 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">🎯</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative order-2 md:order-1">
                  <div className="w-full h-64 bg-gradient-to-br from-main-white/10 to-creative-blue/20 rounded-2xl flex items-center justify-center">
                    <span className="text-6xl">🚀</span>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold mb-4 font-degular-display text-creative-blue">Il Nostro Approccio</h3>
                  <p className="text-main-white/80 font-raleway leading-relaxed mb-4">
                    Crediamo che la creatività senza strategia sia solo arte, e la strategia senza creatività sia solo freddezza. 
                    Il nostro approccio integra questi due elementi in un processo strutturato che parte dall'analisi del mercato 
                    e arriva alla realizzazione di soluzioni creative uniche.
                  </p>
                  <p className="text-main-white/80 font-raleway leading-relaxed">
                    Ogni cliente è un partner: ascoltiamo, comprendiamo, progettiamo e realizziamo insieme percorsi di crescita 
                    che rispettano l'identità del brand e massimizzano il suo potenziale.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-8 font-degular-display text-creative-blue">I Nostri Servizi</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-main-white/5 rounded-xl p-6 border border-main-white/10" itemScope itemType="https://schema.org/Service">
                    <div className="text-3xl mb-4">🎨</div>
                    <h4 className="font-semibold mb-2 font-degular-display" itemProp="name">Branding</h4>
                    <p className="text-sm text-main-white/70 font-raleway" itemProp="description">
                      Identità visive che raccontano la tua storia
                    </p>
                  </div>
                  <div className="bg-main-white/5 rounded-xl p-6 border border-main-white/10" itemScope itemType="https://schema.org/Service">
                    <div className="text-3xl mb-4">📱</div>
                    <h4 className="font-semibold mb-2 font-degular-display" itemProp="name">Social Media</h4>
                    <p className="text-sm text-main-white/70 font-raleway" itemProp="description">
                      Strategie social che generano engagement
                    </p>
                  </div>
                  <div className="bg-main-white/5 rounded-xl p-6 border border-main-white/10" itemScope itemType="https://schema.org/Service">
                    <div className="text-3xl mb-4">🎬</div>
                    <h4 className="font-semibold mb-2 font-degular-display" itemProp="name">Video Making</h4>
                    <p className="text-sm text-main-white/70 font-raleway" itemProp="description">
                      Video coinvolgenti che emozionano
                    </p>
                  </div>
                  <div className="bg-main-white/5 rounded-xl p-6 border border-main-white/10" itemScope itemType="https://schema.org/Service">
                    <div className="text-3xl mb-4">📊</div>
                    <h4 className="font-semibold mb-2 font-degular-display" itemProp="name">Advertisement</h4>
                    <p className="text-sm text-main-white/70 font-raleway" itemProp="description">
                      Campagne pubblicitarie che convertono
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center bg-creative-blue/10 rounded-2xl p-8 border border-creative-blue/20">
                <h3 className="text-2xl font-bold mb-4 font-degular-display text-creative-blue">Pronti a Far Crescere il Tuo Brand?</h3>
                <p className="text-main-white/80 font-raleway mb-6 max-w-2xl mx-auto">
                  Ogni grande storia inizia con una conversazione. Raccontaci la tua visione e scopriamo insieme 
                  come trasformarla in realtà attraverso creatività e strategia.
                </p>
                <a
                  href="https://calendly.com/x2marco/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-creative-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-creative-blue/80 transition-colors duration-300 font-raleway"
                  aria-label="Prenota una consulenza gratuita con X2M Creative (si apre in una nuova finestra)"
                >
                  Prenota una Consulenza Gratuita
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
    </>
  );
} 