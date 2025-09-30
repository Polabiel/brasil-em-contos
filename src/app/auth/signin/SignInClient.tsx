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
        bgcolor: "var(--cv-primaryMain)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        
        justifyContent: "center",
        gap: 1.5,
        py: 1.5,
        fontWeight: 600,
        "&:hover": {
          bgcolor: "var(--cv-secondaryMain)",
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
