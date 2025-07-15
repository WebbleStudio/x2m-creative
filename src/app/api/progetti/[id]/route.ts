import { PrismaClient } from "../../../../generated/prisma";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// DELETE /api/progetti/[id] - elimina progetto
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  await prisma.progetto.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

// PATCH /api/progetti/[id] - modifica progetto
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await req.json();
  const progetto = await prisma.progetto.update({
    where: { id },
    data,
  });
  return NextResponse.json(progetto);
} 