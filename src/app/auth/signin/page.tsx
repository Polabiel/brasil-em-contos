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
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const literaryQuotes = [
  {
    text: "A literatura é uma defesa contra as ofensas da vida.",
    author: "Cesare Pavese",
  },
  {
    text: "Quem lê muito e anda muito vê muito e sabe muito.",
    author: "Miguel de Cervantes",
  },
  {
    text: "Um livro deve ser o machado para o mar gelado dentro de nós.",
    author: "Franz Kafka",
  },
];

async function SignInContent() {
  const session = await auth();
  const randomQuote =
    literaryQuotes[Math.floor(Math.random() * literaryQuotes.length)];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: "flex",
        p: 2,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228b22" fill-opacity="0.04"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
          gap: { xs: 0, lg: 6 },
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Left Side - Branding & Quote */}
        <Box
          sx={{
            display: { xs: "none", lg: "block" },
            pr: 4,
          }}
        >
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    background: `linear-gradient(135deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    boxShadow: "0 8px 24px rgba(34,139,34,0.3)",
                  }}
                >
                  📚
                </Box>
                <Stack>
                  <Typography
                    level="h1"
                    className={playfair.className}
                    sx={{
                      fontSize: "2.5rem",
                      fontWeight: 700,
                      color: "var(--cv-textPrimary)",
                      lineHeight: 1.1,
                    }}
                  >
                    Brasil em{" "}
                    <Box
                      component="span"
                      sx={{ color: "var(--cv-brazilGreen)" }}
                    >
                      Contos
                    </Box>
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{
                      color: "var(--cv-textMuted70)",
                      fontSize: "0.9rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Literatura Brasileira
                  </Typography>
                </Stack>
              </Box>

              <Typography
                level="h2"
                sx={{
                  fontSize: "1.8rem",
                  fontWeight: 600,
                  color: "var(--cv-textPrimary)",
                  mb: 1,
                }}
              >
                Descubra a Riqueza dos Contos Brasileiros
              </Typography>

              <Typography
                level="body-lg"
                sx={{
                  color: "var(--cv-textMuted80)",
                  lineHeight: 1.6,
                  fontSize: "1.1rem",
                }}
              >
                Junte-se à nossa comunidade de leitores apaixonados pela
                literatura brasileira. Explore contos clássicos e contemporâneos
                que capturam a essência da nossa cultura.
              </Typography>
            </Stack>

            {/* Literary Quote */}
            <Card
              variant="soft"
              sx={{
                bgcolor: "var(--cv-brazilGreen)08",
                border: "1px solid var(--cv-brazilGreen)20",
                p: 3,
              }}
            >
              <CardContent>
                <Typography
                  level="body-md"
                  sx={{
                    fontStyle: "italic",
                    color: "var(--cv-textPrimary)",
                    fontSize: "1.05rem",
                    lineHeight: 1.6,
                    mb: 2,
                  }}
                >
                  &quot;{randomQuote?.text}&quot;
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "var(--cv-brazilGreen)",
                    fontWeight: 600,
                    textAlign: "right",
                  }}
                >
                  — {randomQuote?.author}
                </Typography>
              </CardContent>
            </Card>

            {/* Features */}
            <Stack spacing={2}>
              {[
                { icon: "📖", text: "Contos Clássicos e Contemporâneos" },
                { icon: "✍️", text: "Compartilhe Suas Próprias Histórias" },
                { icon: "🌟", text: "Comunidade de Leitores Brasileiros" },
                { icon: "🇧🇷", text: "Celebrando Nossa Cultura" },
              ].map((feature, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box sx={{ fontSize: "1.5rem" }}>{feature.icon}</Box>
                  <Typography
                    level="body-md"
                    sx={{
                      color: "var(--cv-textMuted80)",
                      fontWeight: 500,
                    }}
                  >
                    {feature.text}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>

        {/* Right Side - Sign In Form */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: { xs: "100vh", lg: "auto" },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 440 }}>
            <Stack spacing={4} alignItems="center">
              {/* Mobile Header */}
              <Stack
                spacing={1}
                alignItems="center"
                textAlign="center"
                sx={{ display: { xs: "flex", lg: "none" } }}
              >
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    background: `linear-gradient(135deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.8rem",
                    mb: 1,
                    boxShadow: "0 4px 12px rgba(34,139,34,0.3)",
                  }}
                >
                  📚
                </Box>
                <Typography
                  level="h2"
                  className={playfair.className}
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: 700,
                    color: "var(--cv-textPrimary)",
                  }}
                >
                  Brasil em{" "}
                  <Box component="span" sx={{ color: "var(--cv-brazilGreen)" }}>
                    Contos
                  </Box>
                </Typography>
                <Typography
                  level="body-lg"
                  sx={{ color: "var(--cv-textMuted80)" }}
                >
                  Entre para descobrir as melhores histórias brasileiras
                </Typography>
              </Stack>

              <Card
                variant="outlined"
                sx={{
                  width: "100%",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                  border: "1px solid var(--cv-neutral200)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
                  <Stack spacing={3}>
                    <Stack spacing={1} textAlign="center">
                      <Typography
                        level="h3"
                        sx={{
                          fontWeight: 700,
                          color: "var(--cv-textPrimary)",
                          fontSize: "1.4rem",
                        }}
                      >
                        Bem-vindo de Volta
                      </Typography>
                      <Typography
                        level="body-md"
                        sx={{
                          color: "var(--cv-textMuted70)",
                          fontSize: "0.95rem",
                        }}
                      >
                        Entre na sua conta para continuar sua jornada literária
                      </Typography>
                    </Stack>

                    <Stack spacing={3}>
                      <SignInDiscordButton />

                      <Divider>
                        <Typography
                          level="body-sm"
                          sx={{
                            color: "var(--cv-textMuted60)",
                            fontWeight: 500,
                          }}
                        >
                          ou continue com e-mail
                        </Typography>
                      </Divider>

                      <SignInEmailClient />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>

              <Stack spacing={2} alignItems="center">
                {session && (
                  <Card
                    variant="soft"
                    color="success"
                    sx={{ p: 2, width: "100%", textAlign: "center" }}
                  >
                    <Typography level="body-sm" sx={{ fontWeight: 500 }}>
                      ✅ Você já está logado como{" "}
                      {session.user?.name ?? session.user?.email}
                    </Typography>
                  </Card>
                )}

                <Link href="/" style={{ textDecoration: "none" }}>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: "var(--cv-textMuted60)",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      transition: "all 0.2s ease",
                      "&:hover": {
                        color: "var(--cv-brazilGreen)",
                        transform: "translateX(-2px)",
                      },
                    }}
                  >
                    <i
                      className="fas fa-arrow-left"
                      style={{ fontSize: "0.8rem" }}
                    />
                    Voltar ao início
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function SignIn() {
  return (
    <Suspense
      fallback={
        <Sheet
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 100%)`,
          }}
        >
          <Stack spacing={2} alignItems="center">
            <CircularProgress
              size="lg"
              sx={{
                "--CircularProgress-progressColor": "var(--cv-brazilGreen)",
              }}
            />
            <Typography level="body-md" sx={{ color: "var(--cv-textMuted80)" }}>
              Carregando...
            </Typography>
          </Stack>
        </Sheet>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
