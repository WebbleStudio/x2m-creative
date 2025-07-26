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
    // PRODUZIONE: usa sempre il dominio personalizzato configurato
    if (process.env.NEXTAUTH_URL) {
      // URL configurato dall'utente (priorità massima)
      host = process.env.NEXTAUTH_URL;
      console.log('🔧 Produzione SSR: usando NEXTAUTH_URL', `${host}${endpoint}`);
    } else {
      // Fallback sicuro per produzione
      host = 'https://www.x2mcreative.com';
      console.log('🔧 Produzione SSR: usando fallback', `${host}${endpoint}`);
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