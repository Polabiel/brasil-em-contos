"use client";

import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import CircularProgress from "@mui/joy/CircularProgress";

import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export default function Sidebar() {
  const {
    data: authors = [],
    isLoading: authorsLoading,
    error: authorsError,
  } = api.author.list.useQuery();
  const trpcCtx = api.useContext();
  type AuthorItem = RouterOutputs["author"]["list"][number];

  const literaryFacts = [
    "Nosso blog surgiu por conta de um trabalho para a faculdade",
    "Com amor e dedicação, estamos a cerca de 3 anos trazendo resenhas",
    "Criamos um clube do livro que tem cerca de 20 pessoas",
  ];

  return (
    <aside className="w-full space-y-4">
      {/* Featured Authors (from DB) */}
      <Card
        variant="outlined"
        sx={{
          mb: 3,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1.5px solid var(--cv-neutral200)",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background:
              "linear-gradient(90deg, var(--cv-brazilYellow), var(--cv-brazilGreen))",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 6px 16px rgba(255,215,0,0.10)",
            borderColor: "var(--cv-brazilYellow)",
            "&::before": {
              opacity: 1,
            },
          },
        }}
      >
        <CardContent sx={{ py: 1.5, px: 1.5 }}>
          <Typography
            level="h4"
            className={playfair.className}
            sx={{
              mb: 1.2,
              color: "var(--cv-textPrimary)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
              fontSize: "1.05rem",
            }}
          >
            <i
              className="fas fa-star"
              style={{ color: "var(--cv-brazilYellow)", fontSize: 16 }}
            />
            Grandes Nomes
          </Typography>

          {authorsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 1 }}>
              <CircularProgress size="sm" />
            </Box>
          ) : authorsError ? (
            <Typography
              level="body-sm"
              sx={{
                color: "var(--cv-textMuted80)",
                fontSize: "0.85rem",
              }}
            >
              Falha ao carregar autores
            </Typography>
          ) : (
            <Stack spacing={1.2}>
              {authors.length === 0 ? (
                <Typography
                  level="body-sm"
                  sx={{
                    color: "var(--cv-textMuted80)",
                    fontSize: "0.85rem",
                  }}
                >
                  Nenhum autor encontrado
                </Typography>
              ) : (
                // Grid responsivo para autores - versão compacta e elegante
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(auto-fill, minmax(220px, 1fr))",
                      md: "1fr",
                    },
                    gap: { xs: 1, sm: 1.2 },
                  }}
                >
                  {authors.map((author: AuthorItem, index: number) => (
                    <Box key={author.id}>
                      <Link
                        href={`/authors/${author.slug ?? String(author.id)}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Box
                          sx={{
                            p: { xs: 0.8, sm: 1 },
                            borderRadius: { xs: 4, sm: 6 },
                            cursor: "pointer",
                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                            border: "1px solid transparent",
                            position: "relative",
                            overflow: "hidden",
                            minHeight: { xs: 44, sm: 54 },
                            bgcolor: "background.body",
                            boxShadow: "0 1px 3px rgba(34,139,34,0.03)",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              left: 0,
                              top: 0,
                              bottom: 0,
                              width: "2px",
                              background:
                                "linear-gradient(180deg, var(--cv-brazilGreen), var(--cv-brazilYellow))",
                              transform: "scaleY(0)",
                              transition: "transform 0.3s ease",
                            },
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              right: 0,
                              width: "0",
                              height: "100%",
                              background:
                                "linear-gradient(90deg, transparent, var(--cv-brazilGreen)05)",
                              transition: "width 0.4s ease",
                            },
                            "&:hover": {
                              bgcolor: "var(--cv-neutral50)",
                              borderColor: "var(--cv-brazilGreen)40",
                              transform: "translateX(3px) scale(1.01)",
                              boxShadow: "0 3px 8px rgba(34,139,34,0.08)",
                              "&::before": {
                                transform: "scaleY(1)",
                              },
                              "&::after": {
                                width: "100%",
                              },
                            },
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                          onMouseEnter={() => {
                            try {
                              if (author.slug)
                                void trpcCtx.author.bySlug.prefetch({
                                  slug: author.slug,
                                });
                            } catch {}
                          }}
                          onFocus={() => {
                            try {
                              if (author.slug)
                                void trpcCtx.author.bySlug.prefetch({
                                  slug: author.slug,
                                });
                            } catch {}
                          }}
                          onTouchStart={() => {
                            try {
                              if (author.slug)
                                void trpcCtx.author.bySlug.prefetch({
                                  slug: author.slug,
                                });
                            } catch {}
                          }}
                        >
                          <Typography
                            level="title-sm"
                            className={playfair.className}
                            sx={{
                              fontWeight: 700,
                              color: "var(--cv-textPrimary)",
                              mb: 0.15,
                              fontSize: { xs: "0.82rem", sm: "0.89rem" },
                              lineHeight: 1.2,
                              background:
                                "linear-gradient(135deg, var(--cv-textPrimary), var(--cv-brazilGreen))",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent",
                              backgroundClip: "text",
                            }}
                          >
                            {author.name}
                          </Typography>
                          {author.period && (
                            <Typography
                              level="body-xs"
                              sx={{
                                color: "var(--cv-textMuted60)",
                                mb: 0.15,
                                fontSize: { xs: "0.6rem", sm: "0.66rem" },
                                opacity: 0.8,
                              }}
                            >
                              {author.period}
                            </Typography>
                          )}
                          {author.bio && (
                            <Typography
                              level="body-xs"
                              sx={{
                                color: "var(--cv-textMuted60)",
                                mb: 0.15,
                                fontSize: { xs: "0.65rem", sm: "0.7rem" },
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                lineHeight: 1.3,
                              }}
                            >
                              {author.bio}
                            </Typography>
                          )}
                          {author.books && author.books.length > 0 && (
                            <Typography
                              level="body-xs"
                              sx={{
                                color: "var(--cv-brazilGreen)",
                                fontSize: { xs: "0.6rem", sm: "0.66rem" },
                                fontStyle: "italic",
                                mt: 0.15,
                                opacity: 0.85,
                                fontWeight: 500,
                              }}
                            >
                              {author.books
                                .slice(0, 1)
                                .map((b) => b.title)
                                .join("")}
                            </Typography>
                          )}
                        </Box>
                      </Link>
                      {/* Divider sutil */}
                      {index < authors.length - 1 && (
                        <Divider
                          sx={{
                            my: { xs: 0.5, sm: 0.7 },
                            display: { xs: "none", md: "block" },
                            opacity: 0.22,
                          }}
                        />
                      )}
                    </Box>
                  ))}
                </Box>
              )}
            </Stack>
          )}
        </CardContent>
      </Card>

      {/* Literary Facts */}
      <Card
        variant="soft"
        color="primary"
        sx={{
          mb: 4,
          bgcolor: "var(--cv-brazilGreen)08",
          border: "2px solid var(--cv-brazilGreen)20",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background:
              "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow), var(--cv-brazilBlue))",
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 12px 32px rgba(34,139,34,0.2)",
            bgcolor: "var(--cv-brazilGreen)12",
            borderColor: "var(--cv-brazilGreen)40",
            "&::before": {
              opacity: 1,
            },
          },
        }}
      >
        <CardContent>
          <Typography
            level="h4"
            className={playfair.className}
            sx={{
              mb: 2,
              color: "var(--cv-brazilGreen)",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <i className="fas fa-lightbulb" />
            Curiosidades
          </Typography>

          <Stack spacing={2}>
            {literaryFacts.map((fact, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 2,
                  transition: "all 0.3s ease",
                  py: 0.5,
                  px: 1,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "var(--cv-brazilGreen)08",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-brazilYellow)",
                    flexShrink: 0,
                    mt: 0.75,
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 0 0 var(--cv-brazilYellow)",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%, 100%": {
                        boxShadow: "0 0 0 0 var(--cv-brazilYellow)40",
                      },
                      "50%": {
                        boxShadow: "0 0 0 8px var(--cv-brazilYellow)00",
                      },
                    },
                  }}
                />
                <Typography
                  level="body-sm"
                  sx={{
                    color: "var(--cv-textMuted80)",
                    lineHeight: 1.5,
                  }}
                >
                  {fact}
                </Typography>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </aside>
  );
}
