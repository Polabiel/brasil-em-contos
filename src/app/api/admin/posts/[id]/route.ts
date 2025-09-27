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
 });

 let parsedBody;
 try {
  const raw = await req.json() as unknown;
  parsedBody = bodySchema.safeParse(raw);
 } catch {
  return NextResponse.json({ error: 'invalid json' }, { status: 400 });
 }

 if (!parsedBody.success) {
  return NextResponse.json({ error: 'name required' }, { status: 400 });
 }

 const name = parsedBody.data.name;
 const content = parsedBody.data.content;
 if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 });

 const updated = await db.post.update({ where: { id }, data: { name, content } });
 const safeContent: string | null = updated.content == null ? null : String(updated.content);
 const post: { id: number; name: string; content: string | null } = {
  id: Number(updated.id),
  name: String(updated.name),
  content: safeContent,
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
