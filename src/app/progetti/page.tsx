import React from "react";
import Hero from "@/components/sections/Hero";

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

function getBaseUrl() {
  // Se siamo in produzione, usa l'URL hardcoded
  if (process.env.VERCEL_ENV === 'production') {
    return 'https://x2m-creative.vercel.app';
  }
  
  // Se abbiamo NEXT_PUBLIC_BASE_URL, usalo
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  
  // Se abbiamo VERCEL_URL, usalo
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  
  // Fallback per sviluppo locale
  return "http://localhost:3000";
}

async function getProgetti(): Promise<Progetto[]> {
  // Su Vercel, usa URL assoluto. In locale, usa relativo
  const apiUrl = process.env.VERCEL_ENV 
    ? `https://x2m-creative.vercel.app/api/progetti`
    : `${getBaseUrl()}/api/progetti`;
    
  const res = await fetch(apiUrl, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProgettiPage() {
  const progetti = await getProgetti();
  // Mostra solo quelli visibili (aggiungeremo toggle in dashboard)
  const visibili = progetti.filter(p => p.visibile);

  return (
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
        <h2 className="text-3xl font-bold mb-8">Scegli quale creatività ti deve stupire</h2>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {visibili.length === 0 ? (
            <div className="col-span-3 text-center text-main-white/60">Nessun progetto visibile.</div>
          ) : (
            visibili.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 rounded-2xl flex flex-col w-full items-start overflow-hidden"
              >
                {p.immagine && (
                  <img
                    src={p.immagine}
                    alt={p.titolo}
                    className="w-full h-48 object-cover rounded-t-2xl"
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
                      >
                        <h3 className="font-instrument-serif text-2xl font-normal text-main-white group-hover:underline">
                          {p.titolo}
                        </h3>
                        <img
                          src="/img/icons/External-Link.svg"
                          alt="External link"
                          className="w-6 h-6 ml-1 opacity-80 group-hover:opacity-100"
                        />
                      </a>
                    ) : (
                      <>
                        <h3 className="font-instrument-serif text-2xl font-normal text-main-white">
                          {p.titolo}
                        </h3>
                        <img
                          src="/img/icons/External-Link.svg"
                          alt="External link"
                          className="w-6 h-6 ml-1 opacity-80"
                        />
                      </>
                    )}
                  </div>
                  <p className="text-main-white/80 text-base font-raleway">
                    {p.descrizione}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
} 