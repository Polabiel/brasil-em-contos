import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function SobrePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--cv-backgroundDefault)",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          overflow: "hidden",
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
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Typography
            level="h1"
            className={playfair.className}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 2,
            }}
          >
            Sobre Brasil em Contos
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "var(--cv-textSecondary)",
              maxWidth: "600px",
              mx: "auto",
              lineHeight: "var(--line-height-relaxed)",
            }}
          >
            Celebrando a riqueza da literatura brasileira através de contos que
            preservam nossa cultura.
          </Typography>
        </Box>
      </Box>

      {/* Banner da disciplina (estilizado) */}
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 4, md: 6 },
        }}
      >
        <Card
          variant="outlined"
          sx={{
            mb: 4,
            px: { xs: 2, md: 3 },
            py: 2.5,
            borderRadius: 3,
            background: "rgba(255,255,255,0.10)",
            border: "none",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.07)",
            position: "relative",
            overflow: "visible",
            "&:before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 16,
              bottom: 16,
              width: 6,
              borderRadius: 8,
              background:
                "linear-gradient(180deg, var(--cv-brazilGreen) 0%, #fff 100%)",
              zIndex: 1,
            },
          }}
        >
          <CardContent sx={{ p: 0, pl: 4, position: "relative" }}>
            <Typography
              level="h3"
              className={playfair.className}
              sx={{
                fontSize: { xs: "1.05rem", md: "1.2rem" },
                fontWeight: 700,
                color: "var(--cv-textPrimary)",
                mb: 1,
              }}
            >
              Trabalho de Antropologia — Brasil em Contos
            </Typography>
            <Stack direction="row" alignItems="flex-start" spacing={2}>
              <Box
                sx={{
                  mt: 0.5,
                  mr: 1,
                  fontSize: 32,
                  color: "var(--cv-brazilGreen)",
                  flexShrink: 0,
                  userSelect: "none",
                }}
                aria-label="Livro"
              >
                📖
              </Box>
              <Stack spacing={1}>
                <Typography
                  level="body-sm"
                  sx={{
                    mt: 1,
                    mb: 0.5,
                    letterSpacing: 0.5,
                    color: "var(--cv-textSecondary)",
                  }}
                >
                  Site desenvolvido para a disciplina de Antropologia do curso
                  de Administração da Universidade Estadual de Maringá.
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textSecondary)" }}
                >
                  <strong>Professora:</strong> Renata Oliveira Dos Santos
                </Typography>
                <Typography
                  level="body-sm"
                  sx={{
                    color: "var(--cv-brazilGreen)",
                    fontWeight: 700,
                    mt: 1,
                    mb: 0.5,
                    letterSpacing: 0.5,
                  }}
                >
                  Integrantes
                </Typography>
                <Stack component="ul" spacing={0.5} sx={{ pl: 2, m: 0 }}>
                  <Typography
                    component="li"
                    level="body-sm"
                    sx={{ color: "var(--cv-textSecondary)" }}
                  >
                    Bruna Stefany de Matos Maranesi — RA: 145728
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: "900px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Stack spacing={4}>
          {/* Mission */}
          <Card variant="outlined">
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                  mb: 2,
                }}
              >
                Nossa Missão
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: "var(--cv-textMuted80)",
                  lineHeight: 1.8,
                }}
              >
                Brasil em Contos é uma plataforma dedicada a preservar, celebrar
                e compartilhar a rica tradição literária brasileira. Nossa
                missão é tornar acessível os contos clássicos e contemporâneos
                que moldaram nossa cultura, inspirando novas gerações de
                leitores e escritores.
              </Typography>
            </CardContent>
          </Card>

          {/* What We Offer */}
          <Card variant="outlined">
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                  mb: 3,
                }}
              >
                O Que Oferecemos
              </Typography>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      color: "var(--cv-brazilGreen)",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    📚 Biblioteca Digital
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "var(--cv-textMuted80)" }}
                  >
                    Acesse uma vasta coleção de contos brasileiros, desde os
                    clássicos de Machado de Assis até obras contemporâneas de
                    autores modernos.
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      color: "var(--cv-brazilGreen)",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    ✍️ Espaço para Escritores
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "var(--cv-textMuted80)" }}
                  >
                    Compartilhe suas próprias histórias e conecte-se com uma
                    comunidade apaixonada por literatura brasileira.
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    level="h4"
                    sx={{
                      color: "var(--cv-brazilGreen)",
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    🌟 Comunidade Literária
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{ color: "var(--cv-textMuted80)" }}
                  >
                    Participe de discussões, descubra novos autores e faça parte
                    de uma comunidade que valoriza a cultura literária
                    brasileira.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Our Story */}
          <Card variant="outlined">
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                  mb: 2,
                }}
              >
                Nossa História
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: "var(--cv-textMuted80)",
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Brasil em Contos nasceu do amor pela literatura brasileira e do
                desejo de torná-la mais acessível a todos. Acreditamos que os
                contos são uma forma única de capturar a essência de uma
                cultura, e a literatura brasileira oferece uma riqueza
                incomparável de histórias, perspectivas e vozes.
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: "var(--cv-textMuted80)",
                  lineHeight: 1.8,
                }}
              >
                Desenvolvido com ❤️ para a literatura brasileira, nosso objetivo
                é criar um espaço onde leitores de todas as idades possam
                descobrir, aprender e se inspirar com as obras que definem nossa
                identidade cultural.
              </Typography>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card
            variant="outlined"
            sx={{
              background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 100%)`,
              border: "none",
            }}
          >
            <CardContent>
              <Typography
                level="h2"
                sx={{
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                  mb: 2,
                  textAlign: "center",
                }}
              >
                Junte-se a Nós
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  color: "var(--cv-textMuted80)",
                  textAlign: "center",
                  lineHeight: 1.8,
                }}
              >
                Seja você um leitor apaixonado, um escritor em busca de
                inspiração, ou simplesmente alguém que aprecia a cultura
                brasileira, você é bem-vindo aqui. Juntos, vamos continuar a
                celebrar e preservar as histórias que nos tornam únicos.
              </Typography>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
}
