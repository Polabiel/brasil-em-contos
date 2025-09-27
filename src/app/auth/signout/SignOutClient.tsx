"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SignOutButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSignOut}
      className={className}
      aria-busy={loading}
    >
      {loading ? "Saindo..." : "Sim, sair da conta"}
    </button>
  );
}
