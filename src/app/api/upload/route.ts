import { NextRequest, NextResponse } from "next/server";
import { put } from '@vercel/blob';

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Nessun file inviato" }, { status: 400 });
  }

  try {
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    
    // Upload to Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: "Errore durante l'upload del file" }, { status: 500 });
  }
} 