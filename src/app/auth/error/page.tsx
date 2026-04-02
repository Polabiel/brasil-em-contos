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
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

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
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230d6b2f' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          opacity: 0.6,
        },
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center">
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography
              level="h2"
              className={playfair.className}
              sx={{
                color: "var(--cv-textPrimary)",
                fontSize: { xs: "1.8rem", md: "2rem" },
                fontWeight: 700,
              }}
            >
              Brasil em{" "}
              <Box component="span" sx={{ color: "var(--cv-brazilGreen)" }}>
                Contos
              </Box>
            </Typography>
            <Typography level="body-lg" sx={{ color: "var(--cv-textSecondary)" }}>
              Erro na autenticação
            </Typography>
          </Stack>

          <Card
            variant="outlined"
            sx={{
              width: "100%",
              boxShadow: "var(--shadow-lg)",
              border: "2px solid var(--cv-primaryLight)",
              borderRadius: "var(--radius-2xl)",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={3} alignItems="center" textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "rgba(239, 68, 68, 0.1)",
                    border: "2px solid rgba(239, 68, 68, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ErrorOutlineIcon
                    sx={{ fontSize: 40, color: "#ef4444" }}
                  />
                </Box>

                <Stack spacing={1.5}>
                  <Typography
                    level="title-lg"
                    className={playfair.className}
                    sx={{
                      color: "#ef4444",
                      fontSize: "1.2rem",
                      fontWeight: 700,
                    }}
                  >
                    {errorMessage}
                  </Typography>
                  <Typography level="body-md" sx={{ color: "var(--cv-textSecondary)" }}>
                    {errorDetails}
                  </Typography>
                </Stack>

                <Stack spacing={2} sx={{ width: "100%" }}>
                  <Link href="/auth/signin">
                    <Button
                      variant="solid"
                      sx={{
                        width: "100%",
                        background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, #0a5222 100%)",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        py: 1.2,
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-md)",
                        transition: "all var(--transition-base)",
                        "&:hover": {
                          boxShadow: "var(--shadow-lg)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      Tentar Novamente
                    </Button>
                  </Link>

                  <Link href="/">
                    <Button
                      variant="outlined"
                      sx={{
                        width: "100%",
                        borderColor: "var(--cv-primaryLight)",
                        color: "var(--cv-textPrimary)",
                        fontWeight: 600,
                        fontSize: "0.95rem",
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        py: 1.2,
                        borderRadius: "var(--radius-lg)",
                        transition: "all var(--transition-base)",
                        "&:hover": {
                          borderColor: "var(--cv-brazilGreen)",
                          bgcolor: "rgba(13, 107, 47, 0.05)",
                        },
                      }}
                    >
                      Voltar ao Início
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}

export default function AuthError(props: Props) {
  return (
    <Suspense
      fallback={
        <Sheet
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <ErrorContent searchParams={props.searchParams} />
    </Suspense>
  );
}
