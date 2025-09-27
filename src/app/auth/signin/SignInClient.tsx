"use client";

import { useState, type ReactNode } from "react";
import { signIn } from "next-auth/react";

export default function SignInDiscordButton({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  async function handleDiscordSignIn() {
    setLoading(true);
    try {
      await signIn("discord", { callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDiscordSignIn}
      className={className}
      aria-busy={loading}
    >
      {loading ? "Entrando..." : children ?? "Entrar com Discord"}
    </button>
  );
}
