import Link from "next/link";
import { Suspense } from "react";
import SignOutButton from "./SignOutClient";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";

function SignOutContent() {
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
              Desconectar da sua conta
            </Typography>
          </Stack>

          <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
              <Stack spacing={3} alignItems="center" textAlign="center">
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    bgcolor: 'warning.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <WarningIcon sx={{ fontSize: 32, color: 'warning.500' }} />
                </Box>
                
                <Stack spacing={1}>
                  <Typography level="title-lg">Confirmar Saída</Typography>
                  <Typography level="body-md" color="neutral">
                    Tem certeza que deseja sair da sua conta?
                  </Typography>
                </Stack>
                
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <SignOutButton />
                  
                  <Link href="/">
                    <Button
                      variant="outlined"
                      color="neutral"
                      sx={{ width: '100%' }}
                    >
                      Cancelar
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Link href="/">
            <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted60)', '&:hover': { color: 'var(--cv-textMuted80)' } }}>
              ← Voltar ao início
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Sheet>
  );
}

export default function SignOut() {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <SignOutContent />
    </Suspense>
  );
}