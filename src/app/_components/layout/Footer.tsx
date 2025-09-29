"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function Footer() {
  const footerLinks = [
    {
      title: "Explorar",
      links: [
        { label: "Contos", href: "/contos" },
        { label: "Autores", href: "/autores" },
        { label: "Categorias", href: "/categorias" },
        { label: "Posts", href: "/posts" },
      ]
    },
    {
      title: "Comunidade",
      links: [
        { label: "Sobre Nós", href: "/sobre" },
        { label: "Perfil", href: "/profile" },
        { label: "Contato", href: "/contato" },
        { label: "Ajuda", href: "/ajuda" },
      ]
    },
    {
      title: "Recursos",
      links: [
        { label: "Início", href: "/" },
        { label: "Buscar", href: "/buscar" },
        { label: "FAQ", href: "/faq" },
        { label: "Suporte", href: "/suporte" },
      ]
    }
  ];

  const culturalFacts = [
    "📚 Machado de Assis foi o primeiro presidente da Academia Brasileira de Letras",
    "🌟 Clarice Lispector revolucionou a literatura brasileira com sua prosa poética",
    "🏆 O Brasil possui uma das literaturas mais ricas e diversas da América Latina"
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'var(--cv-textPrimary)',
        color: 'white',
        pt: { xs: 4, md: 6 },
        pb: { xs: 2, md: 3 },
        background: `linear-gradient(135deg, var(--cv-textPrimary) 0%, #2d3748 100%)`,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffd700" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
        
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '2fr 1fr 1fr 1fr' },
            gap: { xs: 4, md: 6 },
            mb: 4
          }}
        >
          
          {/* Brand Section */}
          <Stack spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Image
                src="/icon.webp"
                alt="Brasil em Contos"
                width={48}
                height={48}
              />
              <Typography
                level="h3"
                className={playfair.className}
                sx={{
                  fontWeight: 600,
                  color: 'white',
                  fontSize: { xs: '1.5rem', md: '1.8rem' }
                }}
              >
                Brasil em <Box component="span" sx={{ color: 'var(--cv-brazilYellow)' }}>Contos</Box>
              </Typography>
            </Stack>

            <Typography
              level="body-md"
              sx={{
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.6,
                maxWidth: 400
              }}
            >
              Celebramos a riqueza da literatura brasileira através de contos que 
              preservam nossa cultura e inspiram novas gerações de leitores e escritores.
            </Typography>

            {/* Social Media */}
            <Stack direction="row" spacing={1}>
              <IconButton
                variant="plain"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    bgcolor: 'var(--cv-brazilYellow)',
                    color: 'var(--cv-textPrimary)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <i className="fab fa-facebook-f" />
              </IconButton>
              <IconButton
                variant="plain"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    bgcolor: 'var(--cv-brazilYellow)',
                    color: 'var(--cv-textPrimary)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <i className="fab fa-twitter" />
              </IconButton>
              <IconButton
                variant="plain"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    bgcolor: 'var(--cv-brazilYellow)',
                    color: 'var(--cv-textPrimary)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <i className="fab fa-instagram" />
              </IconButton>
              <IconButton
                variant="plain"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  '&:hover': {
                    bgcolor: 'var(--cv-brazilYellow)',
                    color: 'var(--cv-textPrimary)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                <i className="fab fa-youtube" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <Stack key={section.title} spacing={2}>
              <Typography
                level="title-md"
                sx={{
                  color: 'var(--cv-brazilYellow)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                {section.title}
              </Typography>
              <Stack spacing={1.5}>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      level="body-sm"
                      sx={{
                        color: 'rgba(255,255,255,0.8)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: 'var(--cv-brazilYellow)',
                          transform: 'translateX(4px)',
                        }
                      }}
                    >
                      {link.label}
                    </Typography>
                  </Link>
                ))}
              </Stack>
            </Stack>
          ))}
        </Box>

        {/* Cultural Facts Section */}
        <Box
          sx={{
            py: 3,
            px: 4,
            borderRadius: 8,
            bgcolor: 'rgba(255,215,0,0.1)',
            border: '1px solid rgba(255,215,0,0.2)',
            mb: 4,
          }}
        >
          <Typography
            level="title-md"
            sx={{
              color: 'var(--cv-brazilYellow)',
              fontWeight: 600,
              mb: 2,
              textAlign: 'center'
            }}
          >
            💡 Curiosidades da Literatura Brasileira
          </Typography>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 4 }}
            divider={<Divider orientation="vertical" sx={{ bgcolor: 'rgba(255,215,0,0.3)' }} />}
          >
            {culturalFacts.map((fact, index) => (
              <Typography
                key={index}
                level="body-sm"
                sx={{
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'center',
                  flex: 1,
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}
              >
                {fact}
              </Typography>
            ))}
          </Stack>
        </Box>

        {/* Newsletter Signup */}
        <Box
          sx={{
            textAlign: 'center',
            py: 3,
            px: 4,
            borderRadius: 8,
            bgcolor: 'rgba(34,139,34,0.2)',
            border: '1px solid rgba(34,139,34,0.3)',
            mb: 4,
          }}
        >
          <Typography
            level="title-md"
            sx={{
              color: 'white',
              fontWeight: 600,
              mb: 1,
            }}
          >
            📬 Receba nossas novidades
          </Typography>
          <Typography
            level="body-sm"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              mb: 2,
            }}
          >
            Fique por dentro dos novos contos e novidades da literatura brasileira
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Box
              component="input"
              placeholder="Seu e-mail"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 8,
                border: 'none',
                bgcolor: 'white',
                color: 'var(--cv-textPrimary)',
                minWidth: { xs: '100%', sm: 280 },
                fontSize: '0.95rem',
                '&:focus': {
                  outline: '2px solid var(--cv-brazilYellow)',
                }
              }}
            />
            <Box
              component="button"
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 8,
                border: 'none',
                bgcolor: 'var(--cv-brazilYellow)',
                color: 'var(--cv-textPrimary)',
                fontWeight: 600,
                cursor: 'pointer',
                minWidth: { xs: '100%', sm: 'auto' },
                fontSize: '0.95rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: '#e6c200',
                  transform: 'translateY(-1px)',
                }
              }}
            >
              Inscrever-se
            </Box>
          </Stack>
        </Box>

        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 3 }} />

        {/* Bottom Section */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            level="body-sm"
            sx={{
              color: 'rgba(255,255,255,0.6)',
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © 2024 Brasil em Contos. Todos os direitos reservados. 
            Desenvolvido com ❤️ para a literatura brasileira.
          </Typography>

          <Stack direction="row" spacing={3}>
            <Link href="https://github.com/polabiel/brasil-em-contos" style={{ textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
              <Typography
                level="body-sm"
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { color: 'var(--cv-brazilYellow)' }
                }}
              >
                <i className="fab fa-github" style={{ marginRight: 4 }} />
                Código-fonte
              </Typography>
            </Link>
            <Link href="/privacidade" style={{ textDecoration: 'none' }}>
              <Typography
                level="body-sm"
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { color: 'var(--cv-brazilYellow)' }
                }}
              >
                Privacidade
              </Typography>
            </Link>
            <Link href="/termos" style={{ textDecoration: 'none' }}>
              <Typography
                level="body-sm"
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { color: 'var(--cv-brazilYellow)' }
                }}
              >
                Termos
              </Typography>
            </Link>
            <Link href="/acessibilidade" style={{ textDecoration: 'none' }}>
              <Typography
                level="body-sm"
                sx={{
                  color: 'rgba(255,255,255,0.6)',
                  '&:hover': { color: 'var(--cv-brazilYellow)' }
                }}
              >
                Acessibilidade
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}