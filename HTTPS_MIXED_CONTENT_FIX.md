# Fix Mixed Content Issues (HTTPS con Richieste HTTP)

## 🔒 Problema Risolto

Il progetto aveva problemi di "mixed content" quando hostato su HTTPS perché faceva richieste HTTP, causando il lucchetto rosso nel browser.

## ✅ Modifiche Applicate

### 1. API URL Logic Migliorata
- **File modificati**: `Works.tsx`, `progetti/page.tsx`, `dashboard/page.tsx`, `UploadImage.tsx`
- **Problema**: Fallback hardcoded a `http://localhost:3000` 
- **Soluzione**: URL relativi per client-side, logica dinamica migliorata per server-side

### 2. Next.js Security Headers
- **File modificato**: `next.config.ts`
- **Aggiunto**: Header `upgrade-insecure-requests` per convertire automaticamente HTTP → HTTPS
- **Aggiunto**: `Strict-Transport-Security` per forzare HTTPS

### 3. Logica URL Robusta

#### Prima (PROBLEMATICO):
```js
const apiUrl = process.env.VERCEL_ENV 
  ? 'https://x2m-creative.vercel.app/api/progetti'
  : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000');
```

#### Dopo (CORRETTO):
```js
// Server-side
const apiUrl = process.env.NODE_ENV === 'production' && typeof window === 'undefined'
  ? `${baseUrl}/api/progetti`  // Solo quando necessario
  : '/api/progetti';           // URL relativo per client-side

// Client-side
const apiUrl = '/api/upload'; // Sempre URL relativo
```

## 🌐 Configurazione Ambiente

### Variabili d'Ambiente Obbligatorie:
```env
# Database
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Authentication
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=https://your-domain.com
```

### Variabili Opzionali:
```env
# Solo se necessario sovrascrivere auto-detection
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 🚀 Deploy su Vercel

1. **Configura Environment Variables** nel dashboard Vercel
2. **NEXTAUTH_URL** deve essere l'URL HTTPS del tuo sito
3. Le altre variabili vengono auto-rilevate correttamente

## ✅ Test Mixed Content

Dopo il deploy, verifica:
- [ ] Lucchetto verde nel browser (non rosso)
- [ ] Console browser senza errori "mixed content"
- [ ] Upload immagini funziona
- [ ] Dashboard admin funziona
- [ ] Portfolio carica correttamente

## 🔧 Come Funziona Ora

1. **Client-side**: Usa sempre URL relativi (`/api/progetti`)
2. **Server-side**: Costruisce URL assoluti solo quando necessario
3. **Browser**: Risolve automaticamente URL relativi come HTTPS
4. **Headers**: Convertono automaticamente richieste HTTP → HTTPS

## 📝 Note Tecniche

- `upgrade-insecure-requests` header forza l'upgrade HTTP → HTTPS
- URL relativi sono la soluzione più robusta per evitare mixed content
- `typeof window === 'undefined'` rileva se siamo server-side
- Fallback a localhost HTTP rimosso completamente 