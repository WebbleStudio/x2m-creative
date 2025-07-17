import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/progetti - lista di tutti i progetti
export async function GET() {
  try {
    const progetti = await prisma.progetto.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(progetti || []);
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json({ error: 'Errore nel caricamento progetti' }, { status: 500 });
  }
}

// POST /api/progetti - crea nuovo progetto
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { titolo, descrizione, immagine, link, visibile, inEvidenza } = data;
    
    const progetto = await prisma.progetto.create({
      data: {
        titolo,
        descrizione,
        immagine,
        link,
        visibile: !!visibile,
        inEvidenza: !!inEvidenza,
      }
    });

    return NextResponse.json(progetto);
  } catch (error) {
    console.error('Prisma error:', error);
    return NextResponse.json({ error: 'Errore nella creazione progetto' }, { status: 500 });
  }
} 