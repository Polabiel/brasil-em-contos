import { db } from "@/server/db";

let cachedIds: string[] | null = null;

export function getAdminDiscordIds(): string[] {
  if (cachedIds !== null) return cachedIds;
  const raw = process.env.ADMIN_DISCORD_IDS ?? "";
  cachedIds = raw.split(",").map((s) => s.trim()).filter(Boolean);
  return cachedIds;
}

export function hasAdminDiscordIds(): boolean {
  return getAdminDiscordIds().length > 0;
}

export async function isUserLinkedToAdminDiscord(userId: string): Promise<boolean> {
  const ids = getAdminDiscordIds();
  if (ids.length === 0) return false;

  const account = await db.account.findFirst({
    where: {
      provider: "discord",
      providerAccountId: { in: ids },
      userId,
    },
  });

  return !!account;
}

const Admins = { getAdminDiscordIds, hasAdminDiscordIds, isUserLinkedToAdminDiscord };

export default Admins;
