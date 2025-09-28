import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import EmailProvider from "next-auth/providers/nodemailer"
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import type { User as PrismaUser, $Enums } from "@prisma/client";

type UserWithRole = PrismaUser & { role?: $Enums.UserRole };
import { env } from "@/env";
import { isUserLinkedToAdminDiscord, hasAdminDiscordIds } from "./admins";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    DiscordProvider,
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.EMAIL_FROM,
      maxAge: 24 * 60 * 60,
      // Development helper: when SMTP is not configured (local dev), log the magic link
      // so we can complete the sign-in flow without a working mail server.
      // This does not disable sending when SMTP is configured.
      async sendVerificationRequest({ identifier, url }) {
        console.log(`[dev][email] Magic link for ${identifier}: ${url}`);
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  // Ensure NEXTAUTH_URL is defined. In production (Vercel) set NEXTAUTH_URL=https://your-domain
  // Auth.js validates the host of incoming requests against NEXTAUTH_URL. If you see
  // `UntrustedHost` errors in logs, configure the environment on the hosting provider.
  // Locally we allow a sensible default when NEXTAUTH_URL is not present.
  secret: env.AUTH_SECRET,
  // next-auth expects NEXTAUTH_URL to be correct; set a runtime fallback for local dev
  // (this does not replace properly configured production envs).
  // Note: we don't mutate process.env here; we just ensure the secret and rely on
  // deployment to provide NEXTAUTH_URL.
  callbacks: {
    session: async ({ session, user: nextAuthUser }) => {
      const user = nextAuthUser as unknown as UserWithRole | null;

      let role: $Enums.UserRole = user?.role ?? "USER";

      if (role !== "ADMIN" && user?.id && hasAdminDiscordIds()) {
        const linked = await isUserLinkedToAdminDiscord(user.id);
        if (linked) role = "ADMIN";
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id ?? session.user?.id ?? "",
          role,
        },
      };
    },
  },
} satisfies NextAuthConfig;
