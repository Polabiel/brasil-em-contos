import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import requireAdminOrRedirect from "@/server/auth/requireAdmin";
import { z } from "zod";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 const res = await requireAdminOrRedirect();
 if (res instanceof NextResponse) return res;

 const { id: idParam } = await params;
 const id = Number(idParam);
 if (Number.isNaN(id))
  return NextResponse.json({
   error: 'invalid id'
  }, {
   status: 400
  });
 const bodySchema = z.object({
  name: z.string().min(1, "name required"),
  content: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  imageBlob: z.string().optional(),
  imageMime: z.string().optional(),
 });

 const contentType = req.headers.get('content-type') ?? '';
 const MAX_UPLOAD_BYTES = 5_000_000; // 5MB
 const MIME_WHITELIST = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

 let parsedBody;
 let parsed: z.infer<typeof bodySchema> | null = null;

 if (contentType.includes('multipart/form-data')) {
  const form = await req.formData();
  const nameField = form.get('name');
  const contentField = form.get('content');
  const descriptionField = form.get('description');
  const imageField = form.get('image');
  const file = form.get('imageFile');

  const toParse = {
    name: typeof nameField === 'string' ? nameField : '',
    content: typeof contentField === 'string' ? contentField : undefined,
    description: typeof descriptionField === 'string' ? descriptionField : undefined,
    image: typeof imageField === 'string' ? imageField : undefined,
  };

  parsedBody = bodySchema.safeParse(toParse);
  if (parsedBody.success) parsed = parsedBody.data;

  if (file && typeof (file as Blob).arrayBuffer === 'function') {
    const blob = file as Blob;
    const ab = await blob.arrayBuffer();
    const buf = Buffer.from(ab);
    if (buf.length > MAX_UPLOAD_BYTES) return NextResponse.json({ error: 'Image too large (max 5MB)' }, { status: 400 });
    const mime = (blob as File).type ?? null;
    if (mime && !MIME_WHITELIST.includes(mime)) return NextResponse.json({ error: 'Unsupported image type' }, { status: 400 });

    parsed ??= { name: toParse.name, content: toParse.content, description: toParse.description, image: toParse.image } as z.infer<typeof bodySchema>;
    (parsed as Record<string, unknown>).imageBlob = buf.toString('base64');
    (parsed as Record<string, unknown>).imageMime = mime;
  }
 } else {
  try {
    const raw = await req.json() as unknown;
    parsedBody = bodySchema.safeParse(raw);
    if (parsedBody.success) parsed = parsedBody.data;
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 });
  }
 }

 if (!parsed?.name) return NextResponse.json({ error: 'name required' }, { status: 400 });

 const name = String(parsed.name);
 const content = parsed.content == null ? null : String(parsed.content);
 const description = parsed.description == null ? null : String(parsed.description);
 const image = parsed.image == null ? null : String(parsed.image);
 const imageBlob = (parsed as Record<string, unknown>).imageBlob == null ? null : String((parsed as Record<string, unknown>).imageBlob);
 const imageMime = (parsed as Record<string, unknown>).imageMime == null ? null : String((parsed as Record<string, unknown>).imageMime);

 const updated = await db.post.update({ where: { id }, data: { name, content, description, image, imageBlob: imageBlob ? Buffer.from(imageBlob, 'base64') : undefined, imageMime: imageMime ?? undefined } });
 const safeContent: string | null = updated.content == null ? null : String(updated.content);
 const safeDescription: string | null = updated.description == null ? null : String(updated.description);
 const safeImage: string | null = updated.image == null ? null : String(updated.image);
 const post: { id: number; name: string; content: string | null; description: string | null; image: string | null } = {
  id: Number(updated.id),
  name: String(updated.name),
  content: safeContent,
  description: safeDescription,
  image: safeImage,
 };
 return NextResponse.json({ ok: true, post });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
 const res = await requireAdminOrRedirect();
 if (res instanceof NextResponse) return res;

 const { id: idParam } = await params;
 const id = Number(idParam);
 if (Number.isNaN(id)) {
  return NextResponse.json({ error: 'invalid id' }, { status: 400 });
 }

 await db.post.delete({ where: { id } });
 return NextResponse.json({ ok: true });
}
