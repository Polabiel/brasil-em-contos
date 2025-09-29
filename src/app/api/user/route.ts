import { NextResponse } from 'next/server';
import { auth } from '@/server/auth';
import { db } from '@/server/db';

export async function GET(_req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });

  const user = await db.user.findUnique({ where: { id: session.user.id }, select: { id: true, name: true, email: true, image: true } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ ok: true, user });
}

export async function PATCH(req: Request) {
  if (req.method !== 'PATCH') return NextResponse.json({ error: 'Method not allowed' }, { status: 405, headers: { Allow: 'PATCH' } });
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  const contentType = req.headers.get('content-type') ?? '';
  const updates: { name?: string | null; image?: string | null; imageBlob?: Buffer | null; imageMime?: string | null } = {};

  // Validation: limit uploads to reasonable size and mime types
  const MAX_UPLOAD_BYTES = 2_000_000; // 2MB
  const MIME_WHITELIST = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

  if (contentType.includes('multipart/form-data')) {
    // handle form-data upload
    const form = await req.formData();
    const nameField = form.get('name');
    const imageField = form.get('image');
    const avatar = form.get('avatar'); // file input

    if (typeof nameField === 'string') updates.name = nameField.trim().length > 0 ? nameField.trim() : null;
    if (typeof imageField === 'string') updates.image = imageField.trim().length > 0 ? imageField.trim() : null;

    if (avatar && typeof (avatar as Blob).arrayBuffer === 'function') {
      const blob = avatar as Blob;
      const ab = await blob.arrayBuffer();
      const buf = Buffer.from(ab);
      if (buf.length > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'Image too large (max 2MB)' }, { status: 400 });
      // prefer File type to read mime safely
      let mime: string | null = null;
      try {
        if ((blob as File).type) mime = (blob as File).type;
      } catch {
        mime = null;
      }
      if (mime && !MIME_WHITELIST.includes(mime)) return NextResponse.json({ error: 'Unsupported image type' }, { status: 400 });
      updates.imageBlob = buf;
      updates.imageMime = mime;
    }
  } else {
    // JSON fallback (backwards compatible)
    const raw = await req.json().catch(() => ({})) as unknown;
    const body = (typeof raw === 'object' && raw !== null) ? raw as Record<string, unknown> : {};
    const { name, image, imageBlob, imageMime } = body as { name?: unknown; image?: unknown; imageBlob?: unknown; imageMime?: unknown };

    if (typeof name === 'string') updates.name = name.trim().length > 0 ? name.trim() : null;
    if (typeof image === 'string') updates.image = image.trim().length > 0 ? image.trim() : null;

    if (typeof imageBlob === 'string' && typeof imageMime === 'string') {
      const buf = Buffer.from(imageBlob, 'base64');
      if (buf.length > MAX_UPLOAD_BYTES) {
        return NextResponse.json({ error: 'Image too large (max 2MB)' }, { status: 400 });
      }
      if (!MIME_WHITELIST.includes(imageMime)) {
        return NextResponse.json({ error: 'Unsupported image type' }, { status: 400 });
      }
      updates.imageBlob = buf;
      updates.imageMime = imageMime;
    }
  }

  try {
    const updated = await db.user.update({ where: { id: session.user.id }, data: updates, select: { id: true, name: true, email: true, image: true } });
    return NextResponse.json({ ok: true, user: updated });
  } catch {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
