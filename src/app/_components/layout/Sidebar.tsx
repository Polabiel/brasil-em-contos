"use client";

import React from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import TagsList from "./TagsList";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import CircularProgress from "@mui/joy/CircularProgress";

function TagsFetcher() {
  const { data, isLoading, error } = api.post.tags.useQuery();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        <CircularProgress size="sm" />
      </Box>
    );
  if (error)
    return (
      <Typography level="body-sm" sx={{ color: "var(--cv-textMuted80)" }}>
        Erro ao carregar tags
      </Typography>
    );

  const tags = (data ?? []).map((t: { tag: string; count: number }) => ({
    label: String(t.tag)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase()),
    value: String(t.tag),
    color: (t.tag.includes("REALISMO") || t.tag.includes("REGIONAL")
      ? "primary"
      : "default") as
      | "default"
      | "primary"
      | "success"
      | "warning"
      | "danger"
      | undefined,
  }));

  return <TagsList tags={tags} />;
}
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
    "O Brasil tem mais de 200 anos de literatura nacional rica e diversa",
    "Machado de Assis é considerado o maior escritor brasileiro",
    "A literatura brasileira reflete nossa diversidade cultural única",
    `O Brasil em Contos nasceu como um projeto de faculdade e continua ativo até hoje, ${new Date().getFullYear() - 2018} anos depois!`,
  ];

  const bloggers = [
    {
      id: "blog1",
      name: "Bruna Stefany",
      img: "/icon.png",
      desc: "A garota mais linda do mundo.",
    },
    {
      id: "blog2",
      name: "Gabriel Oliveira",
      img: "/icon.png",
      desc: "o dev. 💻",
    },
  ];

  return (
    <aside className="w-full space-y-4">
      {/* Blogueiras */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            level="h4"
            sx={{
              mb: 2,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <i
              className="fas fa-users"
              style={{ color: "var(--cv-brazilGreen)" }}
            />
            Blogueiras
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2,
              alignItems: "start",
            }}
          >
            {bloggers.map((b) => (
              <Stack
                key={b.id}
                spacing={1}
                alignItems="center"
                sx={{ textAlign: "center", p: 1 }}
              >
                <Box
                  sx={{
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    width: 80,
                    height: 80,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <Box
                    component="img"
                    src={b.img}
                    alt={b.name}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Box>

                <Typography
                  level="body-md"
                  sx={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  {b.name}
                </Typography>

                <Typography
                  level="body-sm"
                  sx={{
                    color: "var(--cv-textMuted70)",
                    fontSize: "0.8rem",
                  }}
                >
                  {b.desc}
                </Typography>
              </Stack>
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Book Tags (compact) - moved up to replace Categories */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            level="h4"
            sx={{
              mb: 1,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <i
              className="fas fa-tags"
              style={{ color: "var(--cv-brazilGreen)" }}
            />
            Categorias
          </Typography>
          <Box>
            {/* Fetch tags from server via tRPC */}
            <TagsFetcher />
          </Box>
        </CardContent>
      </Card>

      {/* Featured Authors (from DB) */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography
            level="h4"
            sx={{
              mb: 2,
              color: "var(--cv-textPrimary)",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <i
              className="fas fa-star"
              style={{ color: "var(--cv-brazilYellow)" }}
            />
            Grandes Nomes
          </Typography>

          {authorsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size="sm" />
            </Box>
          ) : authorsError ? (
            <Typography level="body-sm" sx={{ color: "var(--cv-textMuted80)" }}>
              Falha ao carregar autores
            </Typography>
          ) : (
            <Stack spacing={2}>
              {authors.length === 0 ? (
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted80)" }}
                >
                  Nenhum autor encontrado
                </Typography>
              ) : (
                authors.map((author: AuthorItem, index: number) => (
                  <Box key={author.id}>
                    <Link
                      href={`/authors/${author.slug ?? String(author.id)}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: 8,
                          cursor: "pointer",
                          transition: "all 0.2s ease",
                          border: "1px solid transparent",
                          "&:hover": {
                            bgcolor: "var(--cv-neutral50)",
                            borderColor: "var(--cv-brazilGreen)",
                            transform: "translateY(-2px)",
                          },
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
                            fontWeight: 600,
                            color: "var(--cv-textPrimary)",
                            mb: 0.5,
                          }}
                        >
                          {author.name}
                        </Typography>
                        {author.period && (
                          <Typography
                            level="body-xs"
                            sx={{
                              color: "var(--cv-textMuted60)",
                              mb: 0.5,
                              fontSize: "0.75rem",
                            }}
                          >
                            {author.period}
                          </Typography>
                        )}
                        {author.books && author.books.length > 0 && (
                          <Typography
                            level="body-sm"
                            sx={{
                              color: "var(--cv-textMuted70)",
                              fontSize: "0.8rem",
                              fontStyle: "italic",
                            }}
                          >
                            {author.books
                              .slice(0, 2)
                              .map((b) => b.title)
                              .join(", ")}
                          </Typography>
                        )}
                      </Box>
                    </Link>
                    {index < authors.length - 1 && <Divider sx={{ my: 1 }} />}
                  </Box>
                ))
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
          border: "1px solid var(--cv-brazilGreen)20",
        }}
      >
        <CardContent>
          <Typography
            level="h4"
            sx={{
              mb: 2,
              color: "var(--cv-brazilGreen)",
              fontWeight: 600,
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
