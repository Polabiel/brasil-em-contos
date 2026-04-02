"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/joy/Box";

export default function SignInEmailClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const res = (await signIn("email", { email, redirect: false })) as
        | { error?: string }
        | undefined;
      if (res?.error) {
        setError(res.error ?? "Falha ao enviar e-mail de login.");
      } else {
        setMessage("Link de login enviado. Verifique seu e-mail.");
      }
    } catch (err) {
      setError((err as Error)?.message ?? "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
        <Box>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            startDecorator={<EmailIcon />}
            sx={{
              "--Input-radius": "var(--radius-lg)",
              "--Input-focusedBorderColor": "var(--cv-brazilGreen)",
              "--Input-focusedBoxShadow": "0 0 0 3px rgba(13, 107, 47, 0.1)",
              borderColor: "var(--cv-borderLight)",
              py: 1.2,
              fontSize: "0.95rem",
              "&:hover": {
                borderColor: "var(--cv-border)",
              },
            }}
          />
        </Box>
        <Button
          type="submit"
          variant="solid"
          loading={loading}
          disabled={loading || !email.trim()}
          sx={{
            background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, #0a5222 100%)",
            py: 1.2,
            fontWeight: 600,
            fontSize: "0.95rem",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-md)",
            transition: "all var(--transition-base)",
            "&:hover:not(:disabled)": {
              boxShadow: "var(--shadow-lg)",
              transform: "translateY(-2px)",
            },
            "&:disabled": {
              opacity: 0.5,
              cursor: "not-allowed",
            },
          }}
        >
          {loading ? "Enviando..." : "Entrar com Email"}
        </Button>

        {message && (
          <Alert variant="soft" color="success" sx={{ borderRadius: "var(--radius-lg)" }}>
            {message}
          </Alert>
        )}

        {error && (
          <Alert variant="soft" color="danger" sx={{ borderRadius: "var(--radius-lg)" }}>
            {error}
          </Alert>
        )}
      </Stack>
    </form>
  );
}
