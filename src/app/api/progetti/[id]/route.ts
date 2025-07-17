import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// PATCH /api/progetti/[id] - aggiorna progetto
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const data = await req.json();
  const { titolo, descrizione, immagine, link, visibile, inEvidenza } = data;
  
  const updateData: any = {};
  if (titolo !== undefined) updateData.titolo = titolo;
  if (descrizione !== undefined) updateData.descrizione = descrizione;
  if (immagine !== undefined) updateData.immagine = immagine;
  if (link !== undefined) updateData.link = link;
  if (visibile !== undefined) updateData.visibile = visibile;
  if (inEvidenza !== undefined) updateData.in_evidenza = inEvidenza;

  const { data: progetto, error } = await supabase
    .from('progetti')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Errore nell\'aggiornamento progetto' }, { status: 500 });
  }

  return NextResponse.json(progetto);
}

// DELETE /api/progetti/[id] - elimina progetto
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  const { error } = await supabase
    .from('progetti')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Errore nell\'eliminazione progetto' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
} 