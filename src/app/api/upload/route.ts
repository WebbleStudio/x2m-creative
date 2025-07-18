import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

// Configurazione con placeholder per evitare build errors
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key-configure-env-variables';

// Flag per controllare se la configurazione è valida
const isConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;

if (!isConfigured) {
  console.error('❌ CONFIGURAZIONE MANCANTE: Devi configurare SUPABASE_URL e SUPABASE_ANON_KEY in .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  if (!isConfigured) {
    console.error('❌ Supabase non configurato per upload');
    return NextResponse.json({ error: 'Upload non configurato - Configura le variabili d\'ambiente' }, { status: 500 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Nessun file inviato" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Genera un nome file unico
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    
    // Carica su Supabase Storage (bucket 'uploads')
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return NextResponse.json({ error: "Errore durante l'upload su Supabase" }, { status: 500 });
    }

    // Ottieni la URL pubblica
    const { data: publicUrlData } = supabase.storage
      .from("uploads")
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Errore durante l'upload del file" }, { status: 500 });
  }
} 