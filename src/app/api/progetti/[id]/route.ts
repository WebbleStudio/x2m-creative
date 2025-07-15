import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// DELETE /api/progetti/[id] - elimina progetto
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await prisma.progetto.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// PATCH /api/progetti/[id] - modifica progetto
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await req.json();
  const progetto = await prisma.progetto.update({
    where: { id },
    data,
  });
  return NextResponse.json(progetto);
} 