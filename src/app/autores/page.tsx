import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Footer from "@/app/_components/layout/Footer";

export default function AutoresPage() {
  return (
    <>
      <Box
        component="main"
        sx={{
          bgcolor: 'var(--cv-backgroundDefault)',
          py: { xs: 6, md: 8 },
          minHeight: '60vh',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography level="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 700 }}>
              Autores Brasileiros
            </Typography>
            <Typography level="body-lg" sx={{ maxWidth: 600, color: 'var(--cv-textMuted80)' }}>
              Conheça os grandes mestres da literatura brasileira que moldaram nossa identidade 
              cultural através de suas obras imortais.
            </Typography>
            <Box
              sx={{
                mt: 4,
                p: 4,
                bgcolor: 'var(--cv-neutral100)',
                borderRadius: 2,
                border: '1px solid var(--cv-neutral200)',
              }}
            >
              <Typography level="body-md" sx={{ color: 'var(--cv-textMuted70)' }}>
                ✍️ Esta página está em desenvolvimento. Em breve você encontrará aqui biografias 
                completas, obras principais e curiosidades sobre nossos autores.
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
      <Footer />
    </>
  );
}