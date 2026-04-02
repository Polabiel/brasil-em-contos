import Link from "next/link";
import { Suspense } from "react";
import Sheet from "@mui/joy/Sheet";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CircularProgress from "@mui/joy/CircularProgress";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

function NewUserContent() {
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
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228b22" fill-opacity="0.04"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        },
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 520, position: "relative", zIndex: 1 }}
      >
        <Stack spacing={4} alignItems="center">
          {/* Celebration Header */}
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 100,
                height: 100,
                background: `linear-gradient(135deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
                boxShadow: "0 12px 32px rgba(34,139,34,0.4)",
                animation: "bounce 2s ease-in-out infinite",
                "@keyframes bounce": {
                  "0%, 100%": { transform: "translateY(0)" },
                  "50%": { transform: "translateY(-10px)" },
                },
              }}
            >
              🎉
            </Box>

            <Stack spacing={1}>
              <Typography
                level="h1"
                className={playfair.className}
                sx={{
                  fontSize: "2.2rem",
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
                level="h2"
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: 600,
                  color: "var(--cv-textPrimary)",
                }}
              >
                Bem-vindo à Nossa Comunidade!
              </Typography>

              <Typography
                level="body-lg"
                sx={{ color: "var(--cv-textMuted80)", fontSize: "1.1rem" }}
              >
                Sua jornada pela literatura brasileira começa aqui
              </Typography>
            </Stack>
          </Stack>

          <Card
            variant="outlined"
            sx={{
              width: "100%",
              boxShadow: "var(--shadow-lg)",
              border: "2px solid var(--cv-primaryLight)",
              borderRadius: "var(--radius-2xl)",
              overflow: "hidden",
              background: "rgba(255,255,255,0.02)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack spacing={4} alignItems="center">
                {/* Success Icon and Message */}
                <Stack spacing={3} alignItems="center" textAlign="center">
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(13, 107, 47, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid var(--cv-brazilGreen)",
                    }}
                  >
                    <PersonAddIcon
                      sx={{ fontSize: 40, color: "var(--cv-brazilGreen)" }}
                    />
                  </Box>

                  <Stack spacing={2} alignItems="center">
                    <Typography
                      level="h3"
                      className={playfair.className}
                      sx={{
                        fontWeight: 700,
                        color: "var(--cv-textPrimary)",
                        fontSize: { xs: "1.2rem", md: "1.4rem" },
                      }}
                    >
                      ✨ Conta Criada com Sucesso!
                    </Typography>

                    <Typography
                      level="body-lg"
                      sx={{
                        color: "var(--cv-textSecondary)",
                        lineHeight: 1.6,
                        maxWidth: 400,
                      }}
                    >
                      Agora você faz parte de uma comunidade apaixonada pela
                      rica literatura brasileira. Prepare-se para descobrir
                      histórias incríveis!
                    </Typography>

                    <Chip
                      variant="soft"
                      size="lg"
                      sx={{
                        background: "linear-gradient(135deg, rgba(13, 107, 47, 0.1) 0%, rgba(245, 158, 11, 0.15) 100%)",
                        color: "var(--cv-brazilGreen)",
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        border: "2px solid rgba(13, 107, 47, 0.2)",
                      }}
                    >
                      🆕 Novo Leitor
                    </Chip>
                  </Stack>
                </Stack>

                <Divider sx={{ width: "100%", my: 1, borderColor: "var(--cv-borderLight)" }} />

                {/* What you can do */}
                <Stack spacing={3} sx={{ width: "100%" }}>
                  <Typography
                    level="title-md"
                    sx={{
                      color: "var(--cv-textPrimary)",
                      fontWeight: 700,
                      textAlign: "center",
                      fontSize: "1.2rem",
                    }}
                  >
                    🌟 O que você pode fazer agora:
                  </Typography>

                  <Stack spacing={2.5}>
                    {[
                      {
                        icon: "📚",
                        title: "Explorar Contos Clássicos",
                        desc: "Descubra obras-primas de Machado de Assis, Clarice Lispector e outros grandes nomes",
                      },
                      {
                        icon: "✍️",
                        title: "Compartilhar Suas Histórias",
                        desc: "Publique seus próprios contos e conecte-se com outros escritores brasileiros",
                      },
                      {
                        icon: "💬",
                        title: "Participar da Comunidade",
                        desc: "Comente, avalie e discuta literatura com leitores de todo o Brasil",
                      },
                      {
                        icon: "🎭",
                        title: "Descobrir Novos Talentos",
                        desc: "Conheça autores contemporâneos e suas perspectivas sobre o Brasil atual",
                      },
                    ].map((feature, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 2.5,
                          p: 2,
                          borderRadius: 8,
                          bgcolor: "var(--cv-neutral50)",
                          border: "1px solid var(--cv-neutral200)",
                          transition: "all 0.2s ease",
                          "&:hover": {
                            bgcolor: "var(--cv-brazilGreen)05",
                            borderColor: "var(--cv-brazilGreen)30",
                            transform: "translateY(-2px)",
                          },
                        }}
                      >
                        <Box sx={{ fontSize: "1.8rem", flexShrink: 0 }}>
                          {feature.icon}
                        </Box>
                        <Stack spacing={0.5}>
                          <Typography
                            level="title-sm"
                            sx={{
                              color: "var(--cv-textPrimary)",
                              fontWeight: 600,
                            }}
                          >
                            {feature.title}
                          </Typography>
                          <Typography
                            level="body-sm"
                            sx={{
                              color: "var(--cv-textMuted80)",
                              lineHeight: 1.5,
                            }}
                          >
                            {feature.desc}
                          </Typography>
                        </Stack>
                      </Box>
                    ))}
                  </Stack>
                </Stack>

                {/* Call to Action */}
                <Stack spacing={3} sx={{ width: "100%", pt: 2 }}>
                  <Link href="/" style={{ textDecoration: "none" }}>
                    <Button
                      variant="solid"
                      size="lg"
                      sx={{
                        width: "100%",
                        background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, #0a5222 100%)",
                        color: "white",
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                        borderRadius: "var(--radius-lg)",
                        boxShadow: "var(--shadow-lg)",
                        transition: "all var(--transition-base)",
                        "&:hover": {
                          boxShadow: "0 12px 32px rgba(13, 107, 47, 0.4)",
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <Box sx={{ fontSize: "1.2rem", mr: 1 }}>🚀</Box>
                      Começar Minha Jornada Literária
                    </Button>
                  </Link>

                  <Typography
                    level="body-sm"
                    sx={{
                      color: "var(--cv-textMuted60)",
                      textAlign: "center",
                      fontStyle: "italic",
                    }}
                  >
                    &quot;A leitura é uma conversa com os homens mais ilustres
                    dos séculos passados.&quot; - René Descartes
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Bottom Navigation */}
          <Stack spacing={2} alignItems="center">
            <Typography level="body-sm" sx={{ color: "var(--cv-textMuted60)" }}>
              Precisa de ajuda para começar?
            </Typography>

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
                <i className="fas fa-home" style={{ fontSize: "0.8rem" }} />
                Ir para página inicial
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default function NewUser() {
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
      <NewUserContent />
    </Suspense>
  );
}
