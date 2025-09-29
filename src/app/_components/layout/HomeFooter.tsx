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

export default function HomeFooter() {
  const footerLinks = [
    {
      title: "Navegação",
      links: [
        { label: "Contos", href: "/contos" },
        { label: "Autores", href: "/autores" },
        { label: "Categorias", href: "/categorias" },
        { label: "Sobre", href: "/sobre" },
      ]
    },
    {
      title: "Comunidade",
      links: [
        { label: "Início", href: "/" },
        { label: "Perfil", href: "/profile" },
        { label: "Contato", href: "/contato" },
        { label: "Ajuda", href: "/ajuda" },
      ]
    },
    {
      title: "Suporte",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Suporte", href: "/suporte" },
        { label: "Privacidade", href: "/privacidade" },
        { label: "Termos", href: "/termos" },
      ]
    }
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
              Descubra a riqueza da literatura brasileira através de contos que 
              preservam nossa cultura e inspiram novas gerações de leitores.
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