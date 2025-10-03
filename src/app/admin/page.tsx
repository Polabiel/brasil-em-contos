import { requireAdminForPage } from "@/server/auth/requireAdmin";
import { Box, Typography, Stack, Button } from "@mui/joy";
import LinkNext from "next/link";

export default async function AdminPage() {
  await requireAdminForPage();

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      <Typography level="h2" sx={{ mb: 4 }}>
        Painel Administrativo
      </Typography>
      
      <Stack spacing={3}>
        <Box
          sx={{
            p: 3,
            border: "1px solid var(--cv-border)",
            borderRadius: 2,
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography level="h4" sx={{ mb: 1 }}>
                <i className="fas fa-file-alt" style={{ marginRight: 12 }} />
                Posts
              </Typography>
              <Typography level="body-sm" sx={{ color: "var(--cv-textMuted70)" }}>
                Gerenciar posts, criar novos conteúdos e editar publicações existentes
              </Typography>
            </Box>
            <LinkNext href="/admin/posts">
              <Button variant="solid" color="primary">
                Acessar
              </Button>
            </LinkNext>
          </Stack>
        </Box>

        <Box
          sx={{
            p: 3,
            border: "1px solid var(--cv-border)",
            borderRadius: 2,
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography level="h4" sx={{ mb: 1 }}>
                <i className="fas fa-user-pen" style={{ marginRight: 12 }} />
                Autores
              </Typography>
              <Typography level="body-sm" sx={{ color: "var(--cv-textMuted70)" }}>
                Gerenciar autores da literatura brasileira
              </Typography>
            </Box>
            <LinkNext href="/admin/authors">
              <Button variant="solid" color="primary">
                Acessar
              </Button>
            </LinkNext>
          </Stack>
        </Box>

        <Box
          sx={{
            p: 3,
            border: "1px solid var(--cv-border)",
            borderRadius: 2,
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "box-shadow 0.3s ease",
            },
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography level="h4" sx={{ mb: 1 }}>
                <i className="fas fa-book" style={{ marginRight: 12 }} />
                Livros
              </Typography>
              <Typography level="body-sm" sx={{ color: "var(--cv-textMuted70)" }}>
                Gerenciar livros e obras literárias
              </Typography>
            </Box>
            <LinkNext href="/admin/books">
              <Button variant="solid" color="primary">
                Acessar
              </Button>
            </LinkNext>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
