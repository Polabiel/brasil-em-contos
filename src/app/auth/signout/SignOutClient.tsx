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
      color="danger"
      loading={loading}
      startDecorator={!loading && <LogoutIcon />}
      sx={{ width: '100%' }}
    >
      {loading ? "Saindo..." : "Sim, sair da conta"}
    </Button>
  );
}
