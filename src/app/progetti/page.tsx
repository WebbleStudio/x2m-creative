import Hero from "@/components/sections/homepage/Hero";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Portfolio e Progetti - X2M Creative",
  description: "Scopri i progetti creativi di X2M Creative: branding, social media strategy, video making e advertisement per brand che vogliono distinguersi e crescere.",
  keywords: ["portfolio x2m creative", "progetti creativi", "case study branding", "lavori social media", "video marketing", "campagne pubblicitarie"],
      openGraph: {
      title: "Portfolio e Progetti - X2M Creative",
          description: "Scopri i progetti creativi di X2M Creative: branding, social media strategy, video making e advertisement per brand che vogliono distinguersi.",
    url: "https://x2m-creative.vercel.app/progetti",
    type: "website",
    images: [
      {
        url: "/img/X2M.png",
        width: 1200,
        height: 630,
        alt: "Portfolio X2M Creative",
      },
    ],
  },
  twitter: {
          title: "Portfolio e Progetti - X2M Creative",
      description: "Scopri i progetti creativi di X2M Creative: branding, social media strategy, video making e advertisement.",
    images: ["/img/X2M.png"],
  },
  alternates: {
    canonical: "https://x2m-creative.vercel.app/progetti",
  },
};

interface Progetto {
  id: string;
  titolo: string;
  descrizione: string;
  immagine: string;
  visibile: boolean;
  inEvidenza: boolean;
  createdAt: string;
  link?: string;
}

async function getProgetti(): Promise<Progetto[]> {
  // Su Vercel, usa URL assoluto. In locale, usa relativo
  const apiUrl = process.env.VERCEL_ENV 
    ? 'https://x2m-creative.vercel.app/api/progetti'
    : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
    
  const res = await fetch(`${apiUrl}${apiUrl.includes('/api/progetti') ? '' : '/api/progetti'}`, { 
    cache: 'no-store' 
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProgettiPage() {
  const progetti = await getProgetti();
  // Mostra solo quelli visibili (aggiungeremo toggle in dashboard)
  const visibili = progetti.filter(p => p.visibile);

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
        "name": "Portfolio",
        "item": "https://x2m-creative.vercel.app/progetti"
      }
    ]
  };

  const portfolioJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
                "name": "Portfolio X2M Creative",
            "description": "Portfolio completo dei progetti creativi realizzati da X2M Creative: branding, social media strategy, video making e advertisement",
    "url": "https://x2m-creative.vercel.app/progetti",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": visibili.length,
      "itemListElement": visibili.map((progetto, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": progetto.titolo,
        "description": progetto.descrizione,
        "creator": {
          "@type": "Organization",
          "name": "X2M Creative"
        },
        "image": progetto.immagine ? `https://x2m-creative.vercel.app${progetto.immagine}` : undefined,
        "url": progetto.link,
        "dateCreated": progetto.createdAt
      }))
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
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <Script
        id="portfolio-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(portfolioJsonLd),
        }}
      />
      
      <main className="w-full">
        <Hero 
          title={{
            firstLine: "Portfolio"
          }}
          showScrollIndicator={false}
          heightClass="h-[450px] min-h-[450px] md:h-[450px] lg:h-[450px]"
          noBgBox={true}
        />
        
        <section className="min-h-[700px] bg-main-black text-main-white flex flex-col items-center py-12 px-4">
          <header className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Scegli quale creatività ti deve stupire</h2>
            <p className="text-main-white/80 max-w-2xl mx-auto">
              Esplora i nostri progetti più significativi: ogni lavoro racconta una storia di successo, 
              creatività e strategia che ha portato risultati concreti ai nostri clienti.
            </p>
          </header>
          
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" role="region" aria-label="Portfolio progetti">
            {visibili.length === 0 ? (
              <div className="col-span-3 text-center text-main-white/60">Nessun progetto visibile.</div>
            ) :
              visibili.map((p) => (
                <article
                  key={p.id}
                  className="bg-white/10 rounded-2xl flex flex-col w-full items-start overflow-hidden"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  {p.immagine && (
                    <img
                      src={p.immagine}
                      alt={`Progetto ${p.titolo} - X2M Creative`}
                      className="w-full h-48 object-cover rounded-t-2xl"
                      loading="lazy"
                      itemProp="image"
                    />
                  )}
                  <div className="p-5 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 group"
                          aria-label={`Visualizza il progetto ${p.titolo} (si apre in una nuova finestra)`}
                          itemProp="url"
                        >
                          <h3 className="font-instrument-serif text-2xl font-normal text-main-white group-hover:underline" itemProp="name">
                            {p.titolo}
                          </h3>
                          <img
                            src="/img/icons/External-Link.svg"
                            alt="Link esterno"
                            className="w-6 h-6 ml-1 opacity-80 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="font-instrument-serif text-2xl font-normal text-main-white" itemProp="name">
                            {p.titolo}
                          </h3>
                          <img
                            src="/img/icons/External-Link.svg"
                            alt="Progetto in sviluppo"
                            className="w-6 h-6 ml-1 opacity-80"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-main-white/80 text-base font-raleway" itemProp="description">
                      {p.descrizione}
                    </p>
                    <meta itemProp="creator" content="X2M Creative" />
                    <meta itemProp="dateCreated" content={p.createdAt} />
                  </div>
                </article>
              ))
            }
          </div>
        </section>
      </main>
    </>
  );
} 