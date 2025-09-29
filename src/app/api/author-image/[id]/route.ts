import { NextResponse } from 'next/server';
import { db } from '@/server/db';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const parts = url.pathname.split('/').filter(Boolean);
  const idRaw = parts[parts.length - 1];
  const id = Number(idRaw);
  if (!id) return NextResponse.json({ error: 'invalid id' }, { status: 400 });

  const author = await db.author.findUnique({ where: { id } });
  if (!author) return NextResponse.json({ error: 'not found' }, { status: 404 });

  if (!author.imageBlob) return NextResponse.json({ error: 'no image' }, { status: 404 });

  const headers = new Headers();
  headers.set('Content-Type', String(author.imageMime ?? 'application/octet-stream'));

  // author.imageBlob is Prisma Bytes (Uint8Array). Return directly as body.
  return new Response((author.imageBlob as unknown) as BufferSource, { status: 200, headers });
}
