import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    variables: {
      SUPABASE_URL: process.env.SUPABASE_URL ? '✅ SET' : '❌ MISSING',
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING',
      SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY ? '✅ SET' : '❌ MISSING',
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? '✅ SET' : '❌ MISSING',
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || '❌ MISSING',
      VERCEL_URL: process.env.VERCEL_URL || '❌ MISSING'
    },
    note: 'Questo endpoint verrà rimosso dopo il debug'
  });
} 