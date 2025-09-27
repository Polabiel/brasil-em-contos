import { NextResponse } from "next/server";
import { getAdminDiscordIds } from "@/server/auth/admins";
import { db } from "@/server/db";

export async function GET() {
 const ids = getAdminDiscordIds();
 const results = [];
 for (const id of ids) {
  const account = await db.account.findFirst({ where: { provider: 'discord', providerAccountId: id }, include: { user: true } });

  results.push({ discordId: id,
    user: account ? { id: account.user.id, email: account.user.email } : null });
 }
 return NextResponse.json({ admins: results });
}
