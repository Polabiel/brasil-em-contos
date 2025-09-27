import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/server/db";
import requireAdminOrRedirect from "@/server/auth/requireAdmin";
import { auth } from "@/server/auth";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const res = await requireAdminOrRedirect();
  if (res instanceof NextResponse) return res;

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'No user session' }, { status: 401 });
  }

  const bodySchema = z.object({
    name: z.string().min(1, "name required"),
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

  const { name } = parsedBody.data;

  const created = await db.post.create({
    data: {
      name,
      content: "",
      createdById: session.user.id,
    },
  });

  return NextResponse.json({ ok: true, post: { id: created.id, name: created.name } });
}