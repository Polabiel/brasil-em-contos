import { NextResponse } from 'next/server';
import { auth } from '@/server/auth';
import { db } from '@/server/db';
import type { User } from '@prisma/client';

export async function GET(_req: Request) {
 const session = await auth();
 if (!session?.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    if (_req.method !== 'GET') return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'GET' } });
 const user = await db.user.findUnique({ where: { id: session.user.id }, select: { image: true, imageBlob: true, imageMime: true } }) as (Pick<User, 'image' | 'imageBlob' | 'imageMime'> | null);
 if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

 let imageUrl: string | null = null;
 let blob: Buffer | Uint8Array | null = null;
 let mime: string | null = null;
 if (user.image) imageUrl = user.image;
 if (user.imageBlob) blob = user.imageBlob as Buffer | Uint8Array;
 if (typeof user.imageMime === 'string') mime = user.imageMime;

 if (imageUrl && !blob) {
  const headers = new Headers({ 'Cache-Control': 'public, max-age=60' });
  return NextResponse.redirect(imageUrl, { headers });
 }

 if (blob) {
  const headers = new Headers();
  if (typeof mime === 'string') headers.set('Content-Type', mime);
  else headers.set('Content-Type', 'application/octet-stream');
  headers.set('Cache-Control', 'public, max-age=60, stale-while-revalidate=30');

  let ab: ArrayBuffer;
  if (typeof (blob as Buffer).byteLength === 'number') {
   const u8 = Uint8Array.from((blob as Buffer));
   ab = Uint8Array.from(u8).buffer;
  } else if (blob instanceof Uint8Array) {
   ab = Uint8Array.from(blob).buffer;
  } else {
   ab = new TextEncoder().encode(String(blob)).buffer;
  }

  return new NextResponse(ab, { headers });
 }

 return NextResponse.json({ error: 'No image' }, { status: 404 });
}
