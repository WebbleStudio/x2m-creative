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
DATABASE_URL=postgresql://[URL_FORNITO_DA_VERCEL]
NEXTAUTH_SECRET=your-super-secret-key-here
NEXTAUTH_URL=https://your-app.vercel.app
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

Dopo il deploy su Vercel:
- ✅ Admin dashboard: `https://your-app.vercel.app/admin/login`
- ✅ API progetti: `https://your-app.vercel.app/api/progetti`
- ✅ Upload immagini: Vercel Blob (automatico)
- ✅ Database: PostgreSQL Vercel (automatico)

## 🐛 Troubleshooting

### Build Error: "DATABASE_URL not found"
- Assicurati di aver configurato le env variables su Vercel

### Upload Error: "BLOB_READ_WRITE_TOKEN"
- Vai su Vercel Storage → Blob → Copia il token

### Migration Error
- Controlla che DATABASE_URL sia PostgreSQL valido
- Verifica che il database sia accessibile

---

**🎉 Il tuo progetto è ora pronto per Vercel!** 