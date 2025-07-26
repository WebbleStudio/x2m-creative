/**
 * Utility per gestire URL API in modo sicuro per server e client side
 */

/**
 * Costruisce l'URL corretto per le chiamate API
 * - Client-side: usa URL relativi
 * - Server-side: usa URL assoluti quando necessario
 */
export function getApiUrl(endpoint: string): string {
  // Se siamo in ambiente client (browser), usa URL relativi
  if (typeof window !== "undefined") {
    return endpoint;
  }

  // SERVER-SIDE: determina l'URL assoluto corretto
  let host: string;

  if (process.env.NODE_ENV !== "production") {
    // Sviluppo locale: rileva automaticamente la porta
    const port = getDetectedPort();
    host = `http://localhost:${port}`;
    console.log("🔧 Sviluppo locale SSR: usando", `${host}${endpoint}`);
  } else {
    // PRODUZIONE: usa sempre il dominio personalizzato configurato
    if (process.env.NEXTAUTH_URL) {
      // URL configurato dall'utente (priorità massima)
      host = process.env.NEXTAUTH_URL;
      console.log(
        "🔧 Produzione SSR: usando NEXTAUTH_URL",
        `${host}${endpoint}`
      );
    } else {
      // Fallback sicuro per produzione
      host = "https://www.x2mcreative.com";
      console.log("🔧 Produzione SSR: usando fallback", `${host}${endpoint}`);
    }
  }

  return `${host}${endpoint}`;
}

/**
 * Rileva automaticamente la porta su cui Next.js è in esecuzione
 */
function getDetectedPort(): string {
  // 1. Prova con variabili d'ambiente comuni
  if (process.env.PORT) {
    console.log("🔧 Porta rilevata da PORT:", process.env.PORT);
    return process.env.PORT;
  }

  // 2. Prova a rilevare dalla variabile Next.js interna
  if (process.env.NEXT_PUBLIC_PORT) {
    console.log(
      "🔧 Porta rilevata da NEXT_PUBLIC_PORT:",
      process.env.NEXT_PUBLIC_PORT
    );
    return process.env.NEXT_PUBLIC_PORT;
  }

  // 3. Controlla se c'è una variabile specifica del server
  if (process.env.SERVER_PORT) {
    console.log("🔧 Porta rilevata da SERVER_PORT:", process.env.SERVER_PORT);
    return process.env.SERVER_PORT;
  }

  // 4. Prova a leggere dalla configurazione Next.js
  if (process.env.NEXT_PORT) {
    console.log("🔧 Porta rilevata da NEXT_PORT:", process.env.NEXT_PORT);
    return process.env.NEXT_PORT;
  }

  // 5. Fallback: usa 3000 come default
  console.log("⚠️ Porta non rilevata automaticamente, usando default 3000");
  console.log(
    "💡 Per impostare una porta specifica, usa: NEXT_PUBLIC_PORT=3001 npm run dev"
  );
  return "3000";
}

/**
 * Esegue una fetch sicura con gestione errori
 */
export async function fetchApi(endpoint: string, options?: RequestInit) {
  const url = getApiUrl(endpoint);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
}
