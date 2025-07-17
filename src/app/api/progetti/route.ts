import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// GET /api/progetti - lista di tutti i progetti
export async function GET() {
  const { data: progetti, error } = await supabase
    .from('progetti')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Errore nel caricamento progetti' }, { status: 500 });
  }

  return NextResponse.json(progetti || []);
}

// POST /api/progetti - crea nuovo progetto
export async function POST(req: NextRequest) {
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
} 