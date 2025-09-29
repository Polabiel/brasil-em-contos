import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Footer from "@/app/_components/layout/Footer";

export default function CategoriasPage() {
  return (
    <>
      <Box
        component="main"
        sx={{
          bgcolor: "var(--cv-backgroundDefault)",
          py: { xs: 6, md: 8 },
          minHeight: "60vh",
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack spacing={6} alignItems="center" textAlign="center">
            <Stack spacing={3}>
              <Typography
                level="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                }}
              >
                Categorias
              </Typography>
              <Typography
                level="body-lg"
                sx={{
                  maxWidth: 600,
                  color: "var(--cv-textMuted80)",
                  lineHeight: 1.6,
                }}
              >
                Explore nossa literatura organizada por temas, gêneros e
                movimentos literários que caracterizam a rica tradição cultural
                brasileira.
              </Typography>
            </Stack>

            <Card variant="outlined" sx={{ width: "100%", maxWidth: 800 }}>
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3} alignItems="center">
                  <Box sx={{ fontSize: "3rem" }}>🏷️</Box>
                  <Typography
                    level="h4"
                    sx={{ color: "var(--cv-brazilGreen)" }}
                  >
                    Em Desenvolvimento
                  </Typography>
                  <Typography
                    level="body-md"
                    sx={{
                      color: "var(--cv-textMuted70)",
                      lineHeight: 1.7,
                      textAlign: "center",
                    }}
                  >
                    Esta página está em desenvolvimento. Em breve você
                    encontrará aqui categorias como Romantismo, Realismo,
                    Modernismo, Contos Urbanos, Literatura Regional e muito
                    mais.
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: "var(--cv-textMuted60)",
                      fontStyle: "italic",
                    }}
                  >
                    ✨ Aguarde novidades em nossa próxima atualização!
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
