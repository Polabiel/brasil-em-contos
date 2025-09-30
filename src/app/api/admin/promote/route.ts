import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/server/auth";
import {
  hasAdminDiscordIds,
  isUserLinkedToAdminDiscord,
} from "@/server/auth/admins";
import { db } from "@/server/db";
import type { Session } from "next-auth";

type PromoteBody = {
  action?: "promote" | "demote";
  userId?: string;
  email?: string;
  providerAccountId?: string;
};

async function ensureAdmin(session: Session | null) {
  if (!session?.user)
    return { ok: false, status: 401, message: "Unauthorized" };

  if (session.user.role === "ADMIN") return { ok: true };

  if (hasAdminDiscordIds()) {
    const linked = await isUserLinkedToAdminDiscord(session.user.id);

    if (linked) return { ok: true };
  }
  return { ok: false, status: 403, message: "Forbidden" };
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const session = await auth();

  const check = await ensureAdmin(session);

  if (!check.ok)
    return NextResponse.json(
      { error: check.message },
      { status: check.status },
    );

  const body = (await req.json().catch(() => ({}))) as PromoteBody;
  const action = body.action ?? "promote";

  let targetUserId: string | null = null;
  if (body.userId) targetUserId = body.userId;

  if (body.email) {
    const u = await db.user.findUnique({ where: { email: body.email } });

    if (u) targetUserId = u.id;
  }

  if (body.providerAccountId) {
    const a = await db.account.findFirst({
      where: { provider: "discord", providerAccountId: body.providerAccountId },
    });
    if (a) targetUserId = a.userId;
  }

  if (!targetUserId)
    return NextResponse.json({ error: "target not found" }, { status: 400 });

  const role = action === "demote" ? "USER" : "ADMIN";
  const updated = await db.user.update({
    where: { id: targetUserId },
    data: { role },
  });

  return NextResponse.json({
    ok: true,
    user: { id: updated.id, role: updated.role },
  });
}
