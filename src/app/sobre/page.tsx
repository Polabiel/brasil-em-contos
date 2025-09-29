import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import Footer from "@/app/_components/layout/Footer";

export default function SobrePage() {
  return (
    <>
      <Box
        component="main"
        sx={{
          bgcolor: "var(--cv-backgroundDefault)",
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack spacing={6}>
            <Stack spacing={4} alignItems="center" textAlign="center">
              <Typography
                level="h1"
                sx={{ fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 700 }}
              >
                Sobre o Brasil em Contos
              </Typography>
              <Typography
                level="body-lg"
                sx={{ maxWidth: 800, color: "var(--cv-textMuted80)" }}
              >
                Uma plataforma dedicada à preservação, divulgação e celebração
                da literatura brasileira, com foco especial nos contos que
                definem nossa identidade cultural.
              </Typography>
            </Stack>

            <Card variant="outlined">
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <Typography
                    level="h3"
                    sx={{ color: "var(--cv-brazilGreen)" }}
                  >
                    Nossa Missão
                  </Typography>
                  <Typography level="body-md" sx={{ lineHeight: 1.8 }}>
                    O Brasil em Contos nasceu com o propósito de democratizar o
                    acesso à literatura brasileira, oferecendo uma experiência
                    de leitura moderna e envolvente. Acreditamos que os contos
                    são uma forma única de conhecer a alma brasileira,
                    refletindo nossa diversidade cultural, nossas tradições e
                    nossas transformações ao longo da história.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <Typography
                    level="h3"
                    sx={{ color: "var(--cv-brazilGreen)" }}
                  >
                    O que Oferecemos
                  </Typography>
                  <Stack spacing={2}>
                    <Box>
                      <Typography
                        level="title-md"
                        sx={{ mb: 1, color: "var(--cv-brazilYellow)" }}
                      >
                        📚 Biblioteca Digital
                      </Typography>
                      <Typography level="body-md">
                        Uma coleção cuidadosamente curada de contos brasileiros,
                        desde os clássicos do século XIX até as produções
                        contemporâneas mais relevantes.
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography
                        level="title-md"
                        sx={{ mb: 1, color: "var(--cv-brazilYellow)" }}
                      >
                        ✍️ Perfis de Autores
                      </Typography>
                      <Typography level="body-md">
                        Biografias detalhadas, contexto histórico e análises das
                        obras dos grandes mestres da literatura brasileira.
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Box>
                      <Typography
                        level="title-md"
                        sx={{ mb: 1, color: "var(--cv-brazilYellow)" }}
                      >
                        🏷️ Organização por Temas
                      </Typography>
                      <Typography level="body-md">
                        Contos organizados por movimentos literários, temas,
                        regiões e períodos históricos para facilitar descobertas
                        e estudos.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack spacing={3}>
                  <Typography
                    level="h3"
                    sx={{ color: "var(--cv-brazilGreen)" }}
                  >
                    Nossa Visão
                  </Typography>
                  <Typography level="body-md" sx={{ lineHeight: 1.8 }}>
                    Sonhamos com um Brasil onde a literatura seja acessível a
                    todos, onde cada pessoa possa se conectar com as histórias
                    que nos unem como nação. Queremos ser ponte entre o passado
                    e o presente, entre a tradição e a inovação, sempre
                    celebrando a riqueza inesgotável da nossa literatura.
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
