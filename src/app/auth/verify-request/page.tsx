import Link from "next/link";
import { Suspense } from "react";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import EmailIcon from "@mui/icons-material/Email";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";

function VerifyRequestContent() {
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
              Verifique seu e-mail
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
                    bgcolor: 'primary.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <EmailIcon sx={{ fontSize: 32, color: 'primary.500' }} />
                </Box>
                
                <Stack spacing={1}>
                  <Typography level="title-lg">
                    Confira sua caixa de entrada
                  </Typography>
                  <Typography level="body-md" color="neutral">
                    Enviamos um link de acesso para o seu e-mail. 
                    Clique no link para fazer login.
                  </Typography>
                </Stack>
                
                <Alert variant="soft" color="primary" sx={{ width: '100%' }}>
                  <Typography level="body-sm">
                    📝 Não encontrou o e-mail? Verifique sua pasta de spam ou lixo eletrônico.
                  </Typography>
                </Alert>
                
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Link href="/auth/signin">
                    <Button
                      variant="solid"
                      color="primary"
                      sx={{ width: '100%' }}
                    >
                      Tentar Novamente
                    </Button>
                  </Link>
                  
                  <Link href="/">
                    <Button
                      variant="outlined"
                      color="neutral"
                      sx={{ width: '100%' }}
                    >
                      Voltar ao Início
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

export default function VerifyRequest() {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <VerifyRequestContent />
    </Suspense>
  );
}