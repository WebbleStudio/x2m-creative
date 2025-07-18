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
  const host = process.env.VERCEL_URL 
    ? `${protocol}://${process.env.VERCEL_URL}`
    : process.env.NEXTAUTH_URL 
    ? process.env.NEXTAUTH_URL
    : 'http://localhost:3000';
    
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