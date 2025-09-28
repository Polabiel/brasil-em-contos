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
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

function VerifyRequestContent() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228b22" fill-opacity="0.04"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 500, position: 'relative', zIndex: 1 }}>
        <Stack spacing={4} alignItems="center">
          
          {/* Header with Logo */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Box
              sx={{
                width: 80,
                height: 80,
                background: `linear-gradient(135deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                boxShadow: '0 8px 24px rgba(34,139,34,0.3)',
                mb: 1,
              }}
            >
              📧
            </Box>
            
            <Typography
              level="h2"
              className={playfair.className}
              sx={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--cv-textPrimary)',
              }}
            >
              Brasil em <Box component="span" sx={{ color: 'var(--cv-brazilGreen)' }}>Contos</Box>
            </Typography>
            
            <Typography level="body-lg" sx={{ color: 'var(--cv-textMuted80)', fontSize: '1.1rem' }}>
              Verificação de E-mail
            </Typography>
          </Stack>

          <Card 
            variant="outlined" 
            sx={{ 
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              border: '1px solid var(--cv-neutral200)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4} alignItems="center" textAlign="center">
                
                {/* Main Email Icon */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'var(--cv-brazilGreen)15',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '3px solid var(--cv-brazilGreen)30',
                  }}
                >
                  <EmailIcon sx={{ fontSize: 40, color: 'var(--cv-brazilGreen)' }} />
                </Box>
                
                <Stack spacing={2} textAlign="center">
                  <Typography 
                    level="h3" 
                    sx={{ 
                      fontWeight: 700,
                      color: 'var(--cv-textPrimary)',
                      fontSize: '1.5rem',
                    }}
                  >
                    Confira sua Caixa de Entrada
                  </Typography>
                  
                  <Typography 
                    level="body-lg" 
                    sx={{ 
                      color: 'var(--cv-textMuted80)',
                      lineHeight: 1.6,
                      fontSize: '1rem',
                    }}
                  >
                    Enviamos um link mágico de acesso para o seu e-mail. 
                    Clique no link para fazer login e começar sua jornada literária.
                  </Typography>
                </Stack>
                
                {/* Info Alert */}
                <Alert 
                  variant="soft" 
                  sx={{ 
                    width: '100%',
                    bgcolor: 'var(--cv-brazilYellow)15',
                    color: 'var(--cv-textPrimary)',
                    border: '1px solid var(--cv-brazilYellow)30',
                    borderRadius: 8,
                  }}
                >
                  <Stack spacing={1}>
                    <Typography level="body-sm" sx={{ fontWeight: 600 }}>
                      📮 Dica importante:
                    </Typography>
                    <Typography level="body-sm">
                      O link é válido por 24 horas. Se não encontrar o e-mail, 
                      verifique sua pasta de spam ou lixo eletrônico.
                    </Typography>
                  </Stack>
                </Alert>

                {/* Steps */}
                <Stack spacing={2} sx={{ width: '100%' }}>
                  <Typography 
                    level="title-md" 
                    sx={{ 
                      color: 'var(--cv-textPrimary)',
                      fontWeight: 600,
                      textAlign: 'left',
                    }}
                  >
                    Próximos passos:
                  </Typography>
                  
                  <Stack spacing={1.5} sx={{ pl: 2 }}>
                    {[
                      { step: '1', text: 'Abra seu aplicativo de e-mail' },
                      { step: '2', text: 'Encontre o e-mail de "Brasil em Contos"' },
                      { step: '3', text: 'Clique no botão "Entrar na Plataforma"' },
                      { step: '4', text: 'Pronto! Você será redirecionado automaticamente' },
                    ].map((item) => (
                      <Box key={item.step} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'var(--cv-brazilGreen)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                        >
                          {item.step}
                        </Box>
                        <Typography 
                          level="body-sm" 
                          sx={{ 
                            color: 'var(--cv-textMuted80)',
                            mt: 0.2,
                          }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </Stack>

                {/* Action Buttons */}
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                  sx={{ width: '100%', pt: 2 }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: 'var(--cv-brazilGreen)',
                      color: 'var(--cv-brazilGreen)',
                      flex: 1,
                      py: 1.2,
                      '&:hover': {
                        bgcolor: 'var(--cv-brazilGreen)10',
                      }
                    }}
                    onClick={() => window.location.reload()}
                  >
                    <i className="fas fa-redo" style={{ marginRight: 8, fontSize: '0.9rem' }} />
                    Reenviar E-mail
                  </Button>
                  
                  <Link href="/auth/signin" style={{ textDecoration: 'none', flex: 1 }}>
                    <Button
                      variant="solid"
                      sx={{
                        bgcolor: 'var(--cv-brazilGreen)',
                        width: '100%',
                        py: 1.2,
                        '&:hover': {
                          bgcolor: '#1e5f28',
                        }
                      }}
                    >
                      <i className="fas fa-arrow-left" style={{ marginRight: 8, fontSize: '0.9rem' }} />
                      Voltar ao Login
                    </Button>
                  </Link>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Bottom help text */}
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted60)' }}>
              Está com problemas? 
            </Typography>
            
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Typography 
                level="body-sm" 
                sx={{ 
                  color: 'var(--cv-textMuted60)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    color: 'var(--cv-brazilGreen)',
                    transform: 'translateX(-2px)',
                  }
                }}
              >
                <i className="fas fa-home" style={{ fontSize: '0.8rem' }} />
                Voltar ao início
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default function VerifyRequest() {
  return (
    <Suspense
      fallback={
        <Sheet sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 100%)`,
        }}>
          <Stack spacing={2} alignItems="center">
            <CircularProgress 
              size="lg" 
              sx={{ 
                '--CircularProgress-progressColor': 'var(--cv-brazilGreen)',
              }}
            />
            <Typography level="body-md" sx={{ color: 'var(--cv-textMuted80)' }}>
              Carregando...
            </Typography>
          </Stack>
        </Sheet>
      }
    >
      <VerifyRequestContent />
    </Suspense>
  );
}