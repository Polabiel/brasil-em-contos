import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";
import { isUserLinkedToAdminDiscord, hasAdminDiscordIds } from "./admins";

/**
 * Para usar em páginas (server components). Faz redirect automaticamente se não for admin.
 */
export async function requireAdminForPage() {
  const session = await auth();
  if (!session?.user) {
    redirect('/auth/signin');
  }

  if (session.user.role === 'ADMIN') return;

  if (hasAdminDiscordIds()) {
    const isLinked = await isUserLinkedToAdminDiscord(session.user.id);
    if (isLinked) return;
  }

  redirect('/auth/error');
}

/**
 * Verifica sessão e retorna NextResponse forbidden/unauthorized quando necessário.
 * Retorna null quando o acesso é permitido (usuário é admin).
 * Use em Middlewares ou Server Actions.
 */
export async function requireAdminOrRedirect() {
  const session = await auth();
  if (!session?.user) return NextResponse.redirect(new URL('/auth/signin', '/'));

  if (session.user.role === 'ADMIN') return null;

  if (hasAdminDiscordIds()) {
    const isLinked = await isUserLinkedToAdminDiscord(session.user.id);
    if (isLinked) return null;
  }

  return NextResponse.rewrite(new URL('/auth/error', '/'), { status: 403 });
}

export default requireAdminOrRedirect;
