import { requireAdminForPage } from "@/server/auth/requireAdmin";
import { Box, Typography, Stack, Button } from "@mui/joy";
import LinkNext from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default async function AdminPage() {
  await requireAdminForPage();

  const adminSections = [
    {
      icon: "📄",
      title: "Posts",
      description: "Gerenciar posts, criar novos conteúdos e editar publicações existentes",
      href: "/admin/posts",
    },
    {
      icon: "✍️",
      title: "Autores",
      description: "Gerenciar autores da literatura brasileira",
      href: "/admin/authors",
    },
    {
      icon: "📚",
      title: "Livros",
      description: "Gerenciar livros e obras literárias",
      href: "/admin/books",
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--cv-backgroundDefault)" }}>
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
            Painel Administrativo
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
            Centralize o gerenciamento de todo o conteúdo da plataforma
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Stack
          spacing={3}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(auto-fit, minmax(350px, 1fr))" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {adminSections.map((section) => (
            <Box
              key={section.href}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: "var(--radius-2xl)",
                border: "2px solid var(--cv-primaryLight)",
                background: "rgba(255,255,255,0.02)",
                backdropFilter: "blur(10px)",
                boxShadow: "var(--shadow-md)",
                transition: "all var(--transition-base)",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, transparent 100%)",
                  opacity: 0,
                  transition: "opacity var(--transition-base)",
                  pointerEvents: "none",
                },
                "&:hover": {
                  borderColor: "var(--cv-brazilGreen)",
                  boxShadow: "var(--shadow-lg)",
                  transform: "translateY(-4px)",
                  "&::before": {
                    opacity: 0.05,
                  },
                  "& .admin-icon": {
                    transform: "scale(1.1)",
                  },
                },
              }}
            >
              <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
                {/* Icon */}
                <Box
                  className="admin-icon"
                  sx={{
                    fontSize: 48,
                    transition: "transform var(--transition-base)",
                    userSelect: "none",
                  }}
                >
                  {section.icon}
                </Box>

                {/* Title and Description */}
                <Box>
                  <Typography
                    level="h3"
                    className={playfair.className}
                    sx={{
                      fontSize: { xs: "1.2rem", md: "1.4rem" },
                      fontWeight: 700,
                      color: "var(--cv-textPrimary)",
                      mb: 1,
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{
                      color: "var(--cv-textSecondary)",
                      lineHeight: "var(--line-height-relaxed)",
                    }}
                  >
                    {section.description}
                  </Typography>
                </Box>

                {/* Button */}
                <LinkNext href={section.href}>
                  <Button
                    variant="solid"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, #0a5222 100%)",
                      color: "white",
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      py: 1.2,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      "&:hover": {
                        boxShadow: "var(--shadow-lg)",
                        transform: "scale(1.02)",
                      },
                      transition: "all var(--transition-base)",
                    }}
                  >
                    Acessar
                  </Button>
                </LinkNext>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
