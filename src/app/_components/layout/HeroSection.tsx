"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import { Playfair_Display, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function HeroSection() {
  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '60vh', md: '70vh' },
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228b22" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4,
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side - Content */}
          <Stack spacing={4} sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Stack spacing={2}>
              <Typography
                level="h1"
                className={playfair.className}
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  fontWeight: 700,
                  color: 'var(--cv-textPrimary)',
                  lineHeight: 1.1,
                  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                Brasil em{' '}
                <Box
                  component="span"
                  sx={{ 
                    color: 'var(--cv-brazilGreen)',
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'var(--cv-brazilYellow)',
                      borderRadius: 2,
                      opacity: 0.7,
                    }
                  }}
                >
                  Contos
                </Box>
              </Typography>

              <Typography
                level="h4"
                className={inter.className}
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 500,
                  color: 'var(--cv-textMuted80)',
                  maxWidth: { xs: '100%', md: '600px' },
                  lineHeight: 1.6,
                }}
              >
                Descubra a rica tradição literária brasileira através de contos que capturam 
                a alma e a diversidade de nossa cultura. Uma jornada pela palavra escrita 
                que celebra nossos grandes mestres e novos talentos.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ alignItems: { xs: 'stretch', sm: 'center' } }}
            >
              <Button
                variant="solid"
                size="lg"
                sx={{
                  bgcolor: 'var(--cv-brazilGreen)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 8,
                  boxShadow: '0 4px 14px 0 rgba(34,139,34,0.3)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#1e5f28',
                    boxShadow: '0 6px 20px 0 rgba(34,139,34,0.4)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <i className="fas fa-book-open" style={{ marginRight: 8 }} />
                Explorar Contos
              </Button>

              <Link href="/auth/signin" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="lg"
                  sx={{
                    borderColor: 'var(--cv-brazilGreen)',
                    color: 'var(--cv-brazilGreen)',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 8,
                    borderWidth: 2,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'var(--cv-brazilGreen)',
                      color: 'white',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: 8 }} />
                  Começar Jornada
                </Button>
              </Link>
            </Stack>

            {/* Features highlights */}
            <Stack direction="row" spacing={3} sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'var(--cv-brazilYellow)' 
                }} />
                <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)', fontWeight: 500 }}>
                  Contos Clássicos
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'var(--cv-brazilYellow)' 
                }} />
                <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)', fontWeight: 500 }}>
                  Novos Talentos
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ 
                  width: 8, 
                  height: 8, 
                  borderRadius: '50%', 
                  bgcolor: 'var(--cv-brazilYellow)' 
                }} />
                <Typography level="body-sm" sx={{ color: 'var(--cv-textMuted70)', fontWeight: 500 }}>
                  Cultura Brasileira
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Right side - Illustration */}
          <Box
            sx={{
              flex: { xs: 'none', md: '0 0 auto' },
              width: { xs: 280, md: 400 },
              height: { xs: 280, md: 400 },
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Background circle */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: `conic-gradient(from 0deg, var(--cv-brazilGreen)20, var(--cv-brazilYellow)40, var(--cv-brazilGreen)60)`,
                opacity: 0.1,
                animation: 'rotate 20s linear infinite',
                '@keyframes rotate': {
                  from: { transform: 'rotate(0deg)' },
                  to: { transform: 'rotate(360deg)' },
                },
              }}
            />
            
            {/* Main illustration - Book with Brazilian elements */}
            <Box
              sx={{
                position: 'relative',
                width: '70%',
                height: '70%',
                background: 'white',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                border: '3px solid var(--cv-brazilGreen)',
                '&::before': {
                  content: '"📚"',
                  fontSize: { xs: '3rem', md: '4rem' },
                  marginBottom: 2,
                },
              }}
            >
              <Typography
                level="title-lg"
                className={playfair.className}
                sx={{
                  color: 'var(--cv-brazilGreen)',
                  fontWeight: 700,
                  fontSize: { xs: '0.9rem', md: '1.1rem' },
                  textAlign: 'center',
                  px: 2,
                }}
              >
                Literatura Brasileira
              </Typography>
              <Typography
                level="body-sm"
                sx={{
                  color: 'var(--cv-textMuted70)',
                  textAlign: 'center',
                  px: 2,
                  mt: 0.5,
                }}
              >
                Contos & Crônicas
              </Typography>
            </Box>

            {/* Floating elements */}
            <Box
              sx={{
                position: 'absolute',
                top: '15%',
                right: '10%',
                fontSize: '1.5rem',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%, 100%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                },
              }}
            >
              📖
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: '20%',
                left: '15%',
                fontSize: '1.2rem',
                animation: 'float 3s ease-in-out infinite 1.5s',
              }}
            >
              ✨
            </Box>
            <Box
              sx={{
                position: 'absolute',
                top: '25%',
                left: '5%',
                fontSize: '1rem',
                animation: 'float 3s ease-in-out infinite 0.8s',
              }}
            >
              🇧🇷
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}