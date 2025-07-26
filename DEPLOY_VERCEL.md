# 🚀 Deploy su Vercel - Guida Completa

## 📋 Prerequisiti

Il progetto è ora **compatibile con Vercel**! Sono state fatte le seguenti modifiche:

### ✅ Modifiche completate:
- ✅ Database migrato da SQLite a PostgreSQL
- ✅ File upload migrato a Vercel Blob
- ✅ Build script aggiornato per production
- ✅ Dipendenze Vercel installate

## 🗄️ Setup Database (Vercel Postgres)

### 1. Crea Database Vercel Postgres
1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Crea nuovo progetto o vai al tuo progetto esistente
3. Vai su **Storage** → **Create Database** → **Postgres**
4. Copia la `DATABASE_URL` generata

### 2. Configura Environment Variables
Nel dashboard Vercel, vai su **Settings** → **Environment Variables** e aggiungi:

```env
# Database Supabase (NON Vercel Postgres)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Autenticazione
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://x2mcreative.com

# Upload (se usi Vercel Blob invece di Supabase Storage)
BLOB_READ_WRITE_TOKEN=[TOKEN_BLOB_VERCEL]
```

### 3. Ottieni Vercel Blob Token
1. Nel dashboard Vercel, vai su **Storage** → **Create** → **Blob**
2. Copia il `BLOB_READ_WRITE_TOKEN`

## 🚀 Deploy Steps

### 1. Push a GitHub
```bash
git add .
git commit -m "Preparato per deploy Vercel"
git push origin main
```

### 2. Connetti a Vercel
1. Vai su [vercel.com/new](https://vercel.com/new)
2. Importa il tuo repository GitHub
3. Vercel rileverà automaticamente Next.js

### 3. Configura Build
Vercel userà automaticamente:
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 4. Deploy!
Clicca **Deploy** - Vercel farà tutto automaticamente!

## 🔧 Migrazione Database (Se hai dati esistenti)

Se hai progetti/utenti nel database SQLite locale:

### Opzione A: Reset completo (raccomandato per test)
```bash
# Sul nuovo database Postgres, Vercel eseguirà automaticamente le migrations
```

### Opzione B: Migrazione dati (se hai dati importanti)
```bash
# Esporta da SQLite
npx prisma db seed --preview-feature

# Importa su PostgreSQL (dopo setup Vercel)
npx prisma db push
```

## 🛠️ Development Locale con PostgreSQL

Se vuoi testare localmente con PostgreSQL:

1. **Installa PostgreSQL** locale o usa Docker:
   ```bash
   docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
   ```

2. **Crea `.env.local`**:
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/x2marco"
   NEXTAUTH_SECRET="dev-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
   ```

3. **Applica migrations**:
   ```bash
   npx prisma migrate dev
   ```

## ⚡ Funzionalità Post-Deploy

Dopo il deploy su Vercel con dominio personalizzato:
- ✅ Admin dashboard: `https://www.x2mcreative.com/admin/login`
- ✅ API progetti: `https://www.x2mcreative.com/api/progetti`
- ✅ Upload immagini: Supabase Storage
- ✅ Database: Supabase PostgreSQL

## 🌐 Configurazione Dominio Personalizzato

1. **Su Vercel Dashboard**:
   - Vai su **Settings** → **Domains**
   - Aggiungi `x2mcreative.com` e `www.x2mcreative.com`
   - Configura i DNS secondo le indicazioni Vercel

2. **Aggiorna NEXTAUTH_URL**:
   ```env
   NEXTAUTH_URL=https://www.x2mcreative.com
   ```

3. **Verifica CORS/CSP**: Il dominio personalizzato è già configurato nel next.config.ts

## 🐛 Troubleshooting

### Dominio Personalizzato Non Funziona
- ✅ Verifica DNS: `dig x2mcreative.com` dovrebbe puntare a Vercel
- ✅ Controlla che `NEXTAUTH_URL=https://www.x2mcreative.com` sia impostato su Vercel
- ✅ Assicurati che il dominio sia verificato nel dashboard Vercel
- ✅ Aspetta fino a 24h per la propagazione DNS

### Errori API in Produzione
- ✅ Controlla che `SUPABASE_URL` e `SUPABASE_ANON_KEY` siano configurati
- ✅ Verifica che le API Routes siano accessibili su `https://www.x2mcreative.com/api/progetti`

### Login Non Funziona
- ✅ Assicurati che `NEXTAUTH_SECRET` sia impostato su Vercel
- ✅ Verifica che l'utente admin esista nella tabella Supabase `users`
- ✅ Controlla che `NEXTAUTH_URL` corrisponda al dominio attuale

### Build Error: "SUPABASE_URL not found"
- Assicurati di aver configurato le env variables Supabase su Vercel

### Upload Error: "BLOB_READ_WRITE_TOKEN"
- Vai su Vercel Storage → Blob → Copia il token (se usi Vercel Blob)
- Oppure configura Supabase Storage

## ✅ Checklist Pre-Deploy

Prima di fare il deploy su Vercel con `x2mcreative.com`:

### Variabili d'Ambiente su Vercel
- [ ] `SUPABASE_URL` - URL del progetto Supabase
- [ ] `SUPABASE_ANON_KEY` - Chiave pubblica Supabase  
- [ ] `SUPABASE_SERVICE_KEY` - Chiave privata Supabase (opzionale)
- [ ] `NEXTAUTH_SECRET` - Chiave segreta per NextAuth
- [ ] `NEXTAUTH_URL=https://www.x2mcreative.com` - URL del dominio personalizzato

### Supabase Database
- [ ] Tabella `users` esistente con utente admin
- [ ] Tabella `progetti` esistente (se hai progetti)
- [ ] Configurazione RLS corretta per le tabelle

### Vercel Dashboard
- [ ] Dominio `x2mcreative.com` aggiunto e verificato
- [ ] DNS configurato correttamente
- [ ] Build e deployment completati senza errori

---

**🎉 Il tuo progetto è ora pronto per Vercel con x2mcreative.com!** 