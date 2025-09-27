"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Stack from "@mui/joy/Stack";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Alert from "@mui/joy/Alert";
import EmailIcon from "@mui/icons-material/Email";

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
      <Stack spacing={2}>
        <Input
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          startDecorator={<EmailIcon />}
        />
        <Button
          type="submit"
          variant="soft"
          loading={loading}
          disabled={loading || !email.trim()}
        >
          {loading ? "Enviando..." : "Entrar com Email"}
        </Button>

        {message && (
          <Alert variant="soft" color="success">
            {message}
          </Alert>
        )}
        
        {error && (
          <Alert variant="soft" color="danger">
            {error}
          </Alert>
        )}
      </Stack>
    </form>
  );
}