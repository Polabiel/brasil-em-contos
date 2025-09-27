import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/server/auth";
import SignInDiscordButton from "./SignInClient";
import SignInEmailClient from "./SignInEmailClient";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";

async function SignInContent() {
  const session = await auth();
  return (
    <Sheet
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, var(--cv-gradientStart), var(--cv-backgroundDefault))`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 400 }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography level="h2" sx={{ color: 'var(--cv-textPrimary)' }}>
              Brasil em <span style={{ color: 'var(--cv-accentHsl)' }}>Contos</span>
            </Typography>
            <Typography level="body-lg" sx={{ color: 'var(--cv-textMuted80)' }}>
              Entre para descobrir as melhores histórias brasileiras
            </Typography>
          </Stack>

          <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
              <Typography level="title-lg" textAlign="center" sx={{ mb: 3 }}>
                Entrar
              </Typography>
              
              <Stack spacing={3}>
                <SignInDiscordButton />

                <Divider>
                  <Typography level="body-sm" sx={{ color: 'text.tertiary' }}>
                    ou
                  </Typography>
                </Divider>

                <SignInEmailClient />
              </Stack>
            </CardContent>
          </Card>

          <Stack spacing={1} alignItems="center">
            {session && (
              <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)' }}>
                Logado como {session.user?.name ?? session.user?.email}
              </Typography>
            )}
            <Link href="/">
              <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted60)', '&:hover': { color: 'var(--cv-textMuted80)' } }}>
                ← Voltar ao início
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Sheet>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <SignInContent />
    </Suspense>
  );
}