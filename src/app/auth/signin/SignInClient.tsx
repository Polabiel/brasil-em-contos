"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";

export default function SignInDiscordButton() {
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
    <Button
      onClick={handleDiscordSignIn}
      variant="solid"
      loading={loading}
      sx={{
        background: "linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
        py: 1.2,
        fontWeight: 600,
        fontSize: "0.95rem",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        transition: "all var(--transition-base)",
        textTransform: "uppercase",
        letterSpacing: 0.5,
        "&:hover": {
          background: "linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%)",
          boxShadow: "var(--shadow-lg)",
          transform: "translateY(-2px)",
        },
      }}
      startDecorator={
        !loading && (
          <Box
            component="span"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <i
              className="fa-brands fa-discord"
              aria-hidden="true"
              style={{ fontSize: 20 }}
            ></i>
            <span className="sr-only">Discord</span>
          </Box>
        )
      }
    >
      {loading ? "Conectando..." : "Entrar com Discord"}
    </Button>
  );
}
