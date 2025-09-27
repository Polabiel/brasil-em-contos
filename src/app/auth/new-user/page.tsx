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

function NewUserContent() {
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
              Brasil em <Box component="span" sx={{ color: 'primary.500' }}>Contos</Box>
            </Typography>
            <Typography level="body-lg">
              Bem-vindo(a) à plataforma!
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
                    bgcolor: 'success.100',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PersonAddIcon sx={{ fontSize: 32, color: 'success.500' }} />
                </Box>
                
                <Stack spacing={2} alignItems="center">
                  <Stack spacing={1}>
                    <Typography level="title-lg">
                      Conta criada com sucesso! 🎉
                    </Typography>
                    <Typography level="body-md" color="neutral">
                      Sua jornada pelas histórias brasileiras começa agora.
                    </Typography>
                  </Stack>
                  
                  <Chip variant="soft" color="success" size="sm">
                    Novo usuário
                  </Chip>
                </Stack>
                
                <Typography level="body-sm" color="neutral" textAlign="left" sx={{ width: '100%' }}>
                  O que você pode fazer:
                </Typography>
                
                <Stack spacing={1} sx={{ width: '100%' }}>
                  <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    📚 Descobrir contos clássicos e contemporâneos
                  </Typography>
                  <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    ✍️ Criar e compartilhar suas próprias histórias
                  </Typography>
                  <Typography level="body-sm" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    💬 Interagir com outros leitores e escritores
                  </Typography>
                </Stack>
                
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Link href="/">
                    <Button
                      variant="solid"
                      color="primary"
                      sx={{ width: '100%' }}
                      size="lg"
                    >
                      Começar Jornada
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          <Link href="/">
            <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted60)', '&:hover': { color: 'var(--cv-textMuted80)' } }}>
              ← Ir para página inicial
            </Typography>
          </Link>
        </Stack>
      </Box>
    </Sheet>
  );
}

export default function NewUser() {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size="lg" />
        </Sheet>
      }
    >
      <NewUserContent />
    </Suspense>
  );
}