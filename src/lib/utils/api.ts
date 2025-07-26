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
  
  // SERVER-SIDE: determina l'URL assoluto corretto
  let host: string;
  
  if (process.env.NODE_ENV !== 'production') {
    // Sviluppo locale: usa localhost con porta dinamica
    const port = process.env.PORT || '3000';
    host = `http://localhost:${port}`;
    console.log('🔧 Sviluppo locale SSR: usando', `${host}${endpoint}`);
  } else {
    // PRODUZIONE: determina l'URL assoluto corretto
    if (process.env.VERCEL_URL) {
      // Su Vercel, usa sempre HTTPS per VERCEL_URL
      host = `https://${process.env.VERCEL_URL}`;
    } else if (process.env.NEXTAUTH_URL) {
      // URL configurato dall'utente (per produzione)
      host = process.env.NEXTAUTH_URL;
    } else {
      // Fallback sicuro per produzione
      host = 'https://x2mcreative.com';
    }
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