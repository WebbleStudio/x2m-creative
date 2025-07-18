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
  if (typeof window !== 'undefined') {
    return endpoint;
  }
  
  // Server-side: determina l'URL base
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  
  let host: string;
  if (process.env.VERCEL_URL) {
    // Su Vercel, usa sempre HTTPS per VERCEL_URL
    host = `https://${process.env.VERCEL_URL}`;
  } else if (process.env.NEXTAUTH_URL) {
    // URL configurato dall'utente
    host = process.env.NEXTAUTH_URL;
  } else if (process.env.NODE_ENV === 'production') {
    // Fallback sicuro per produzione
    host = 'https://www.x2mcreative.com';
  } else {
    // Sviluppo locale - usa URL relativo sicuro
    console.warn('⚠️ Sviluppo locale: usando URL relativi per API');
    return endpoint; // Usa URL relativi in sviluppo
  }
    
  return `${host}${endpoint}`;
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
        'Content-Type': 'application/json',
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