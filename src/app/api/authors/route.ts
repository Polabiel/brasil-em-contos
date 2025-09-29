import { NextResponse } from 'next/server';

export async function GET() {
  // Temporary stub: tRPC author.list is the canonical source. Return empty list to avoid direct db references.
  return NextResponse.json([]);
}
