import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Configurazione con placeholder per evitare build errors
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key-configure-env-variables';

// Flag per controllare se la configurazione è valida
const isConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY;

if (!isConfigured) {
  console.error('❌ CONFIGURAZIONE MANCANTE: Devi configurare SUPABASE_URL e SUPABASE_ANON_KEY in .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// GET /api/progetti - lista di tutti i progetti
export async function GET() {
  // DEBUG: Log delle variabili in produzione
  console.log('🔧 DEBUG API /progetti chiamata:');
  console.log('- NODE_ENV:', process.env.NODE_ENV);
  console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING');
  console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING');
  console.log('- isConfigured:', isConfigured);
  
  if (!isConfigured) {
    console.error('❌ Supabase non configurato');
    return NextResponse.json({ 
      error: 'Database non configurato - Configura le variabili d\'ambiente',
      debug: {
        supabaseUrl: !!process.env.SUPABASE_URL,
        supabaseKey: !!process.env.SUPABASE_ANON_KEY,
        nodeEnv: process.env.NODE_ENV
      }
    }, { status: 500 });
  }

  try {
    console.log('🔧 Tentativo query Supabase...');
    const { data: progetti, error } = await supabase
      .from('progetti')
      .select('*')
      .order('created_at', { ascending: false });

    console.log('📊 Risultato query:');
    console.log('- Error:', error);
    console.log('- Data length:', progetti?.length || 0);
    console.log('- First project:', progetti?.[0]?.titolo || 'nessuno');

    if (error) {
      console.error('❌ Supabase error:', error);
      return NextResponse.json({ 
        error: 'Errore nel caricamento progetti',
        debug: { supabaseError: error.message }
      }, { status: 500 });
    }

    console.log('✅ Ritorno progetti:', progetti?.length || 0);
    return NextResponse.json(progetti || []);
  } catch (error) {
    console.error('💥 Catch error:', error);
    return NextResponse.json({ 
      error: 'Errore nel caricamento progetti',
      debug: { catchError: String(error) }
    }, { status: 500 });
  }
}

// POST /api/progetti - crea nuovo progetto
export async function POST(req: NextRequest) {
  if (!isConfigured) {
    console.error('❌ Supabase non configurato');
    return NextResponse.json({ error: 'Database non configurato - Configura le variabili d\'ambiente' }, { status: 500 });
  }

  try {
    const data = await req.json();
    const { titolo, descrizione, immagine, link, visibile, inEvidenza } = data;
    
    const { data: progetto, error } = await supabase
      .from('progetti')
      .insert([{
        titolo,
        descrizione,
        immagine,
        link,
        visibile: !!visibile,
        in_evidenza: !!inEvidenza,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Errore nella creazione progetto' }, { status: 500 });
    }

    return NextResponse.json(progetto);
  } catch (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Errore nella creazione progetto' }, { status: 500 });
  }
} 