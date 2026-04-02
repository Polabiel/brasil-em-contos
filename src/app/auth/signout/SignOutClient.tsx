"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Button from "@mui/joy/Button";
import LogoutIcon from "@mui/icons-material/Logout";

export default function SignOutButton() {
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
    <Button
      onClick={handleSignOut}
      variant="solid"
      loading={loading}
      startDecorator={!loading && <LogoutIcon />}
      sx={{
        width: '100%',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        fontWeight: 600,
        fontSize: '0.95rem',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        py: 1.2,
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
        transition: 'all var(--transition-base)',
        '&:hover': {
          boxShadow: 'var(--shadow-lg)',
          transform: 'translateY(-2px)',
        },
      }}
    >
      {loading ? "Saindo..." : "Sim, sair da conta"}
    </Button>
  );
}
