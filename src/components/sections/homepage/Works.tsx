import StackingCards from '@/components/animations/transitions/StackingCards';
import React from 'react';

interface Progetto {
  id: string;
  titolo: string;
  descrizione: string;
  immagine: string;
  visibile: boolean;
  in_evidenza: boolean;
  created_at: string;
}

async function getProgettiInEvidenza(): Promise<Progetto[]> {
  // Importa l'utility per URL API sicuri
  const { getApiUrl } = await import('@/lib/utils/api');
  
  try {
    const apiUrl = getApiUrl('/api/progetti');
    const timestamp = Date.now();
    const urlWithTimestamp = `${apiUrl}?t=${timestamp}`;
    
    console.log('🔧 Fetching progetti from:', urlWithTimestamp);
    
    const res = await fetch(urlWithTimestamp, { 
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    
    const progetti = await res.json();
    return progetti.filter((p: Progetto) => p.in_evidenza).slice(0, 3);
  } catch (error) {
    console.error('Errore caricamento progetti in evidenza:', error);
    return []; // Fallback sicuro
  }
}

export default async function Works() {
  const progettiEvidenza = await getProgettiInEvidenza();
  const cards = progettiEvidenza.map((p) => ({
    id: p.id,
    image: p.immagine,
    title: p.titolo,
    description: p.descrizione,
  }));

  return (
    <section className="relative w-full min-h-[700px] md:min-h-[800px] lg:min-h-[850px] xl:min-h-[900px] bg-main-black flex flex-col items-center justify-center overflow-hidden py-16">
      <StackingCards cards={cards} heightClass="h-[220px] sm:h-[320px] md:h-[400px] 2xl:h-[480px]" />
      <div className="flex justify-center mt-16">
        <a
          href="/progetti"
          className="px-6 py-2 lg:px-8 lg:py-3 rounded-full bg-transparent border border-white/50 text-white/50 font-semibold text-sm lg:text-base transition hover:bg-white/10 hover:text-white hover:border-white"
        >
          Scopri di più
        </a>
      </div>
    </section>
  );
} 