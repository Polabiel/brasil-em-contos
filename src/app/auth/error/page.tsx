import Link from "next/link";
import { Suspense } from "react";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";

interface Props {
  searchParams: Promise<{
    error?: string;
  }>;
}

async function ErrorContent({ searchParams }: Props) {
  const params = await searchParams;
  const error = params.error;
  
  let errorMessage = "Ocorreu um erro durante a autenticação.";
  let errorDetails = "Por favor, tente novamente.";

  switch (error) {
    case "Configuration":
      errorMessage = "Erro de Configuração";
      errorDetails = "Houve um problema com a configuração do servidor.";
      break;
    case "AccessDenied":
      errorMessage = "Acesso Negado";
      errorDetails = "Você não tem permissão para acessar este recurso.";
      break;
    case "Verification":
      errorMessage = "Falha na Verificação";
      errorDetails = "O token de verificação é inválido ou expirou.";
      break;
    case "Default":
    default:
      errorMessage = "Erro de Autenticação";
      errorDetails = "Não foi possível completar o processo de login.";
      break;
  }

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
              Erro na autenticação
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
                    bgcolor: 'danger.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <ErrorOutlineIcon sx={{ fontSize: 32, color: 'danger.500' }} />
                </Box>
                
                <Stack spacing={1}>
                  <Typography level="title-lg" color="danger">
                    {errorMessage}
                  </Typography>
                  <Typography level="body-md" color="neutral">
                    {errorDetails}
                  </Typography>
                </Stack>
                
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

export default function AuthError(props: Props) {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <ErrorContent {...props} />
    </Suspense>
  );
}