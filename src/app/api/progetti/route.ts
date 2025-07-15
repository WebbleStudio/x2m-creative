import { PrismaClient } from "../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET /api/progetti - lista di tutti i progetti
export async function GET() {
  const progetti = await prisma.progetto.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(progetti);
}

// POST /api/progetti - crea nuovo progetto
export async function POST(req: NextRequest) {
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
    },
  });
  return NextResponse.json(progetto);
} 