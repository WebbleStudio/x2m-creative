import { NextRequest, NextResponse } from "next/server";
import cloudinary from "cloudinary";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "Nessun file inviato" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { folder: "uploads" },
        (error: any, result: cloudinary.UploadApiResponse | undefined) => {
          if (error) return reject(error);
          resolve(result!);
        }
      ).end(buffer);
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Errore durante l'upload del file" }, { status: 500 });
  }
} 