"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import { Playfair_Display } from "next/font/google";
import { api } from "@/trpc/react";
import Link from "next/link";
import Image from "next/image";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function AutoresPage() {
  const { data: authors = [], isLoading } = api.author.list.useQuery();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--cv-backgroundDefault)",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
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
            Autores Brasileiros
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "var(--cv-textMuted80)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Conheça os grandes escritores que moldaram a literatura brasileira e
            deixaram um legado inesquecível.
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
        {isLoading ? (
          <Typography level="body-lg" sx={{ textAlign: "center" }}>
            Carregando autores...
          </Typography>
        ) : authors.length === 0 ? (
          <Typography level="body-lg" sx={{ textAlign: "center" }}>
            Nenhum autor encontrado.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug ?? author.id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  variant="outlined"
                  sx={{
                    height: "100%",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 16px rgba(34,139,34,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          height: 200,
                          borderRadius: 2,
                          overflow: "hidden",
                          bgcolor: "var(--cv-neutral200)",
                        }}
                      >
                        {author.image ? (
                          <Image
                            src={String(author.image)}
                            alt={author.name}
                            fill
                            style={{ objectFit: "cover" }}
                            unoptimized
                          />
                        ) : (
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "3rem",
                              color: "var(--cv-textMuted80)",
                            }}
                          >
                            {author.name.slice(0, 1).toUpperCase()}
                          </Box>
                        )}
                      </Box>
                      <Stack spacing={1}>
                        <Typography
                          level="h4"
                          sx={{
                            fontWeight: 700,
                            color: "var(--cv-textPrimary)",
                          }}
                        >
                          {author.name}
                        </Typography>
                        {author.period && (
                          <Typography
                            level="body-sm"
                            sx={{ color: "var(--cv-textMuted80)" }}
                          >
                            {author.period}
                          </Typography>
                        )}
                        {author.books && author.books.length > 0 && (
                          <Typography
                            level="body-sm"
                            sx={{ color: "var(--cv-textMuted80)" }}
                          >
                            {author.books.length}{" "}
                            {author.books.length === 1 ? "obra" : "obras"}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
