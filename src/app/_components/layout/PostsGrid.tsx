"use client";

import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Chip from "@mui/joy/Chip";
import Button from "@mui/joy/Button";
import PostCardSkeleton from "./PostCardSkeleton";
import Stack from "@mui/joy/Stack";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/trpc/react";
import { useSearchParams, useRouter } from "next/navigation";

import { Playfair_Display } from "next/font/google";
import { motion } from "motion/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function PostsGrid() {
  const { data: session } = useSession();

  const search = useSearchParams();
  const tag = search?.get?.("tag") ?? undefined;
  const router = useRouter();

  const recentQueryOptions = {
    retry: false,
    refetchOnWindowFocus: false,
  } as const;

  // Always call the hooks in the same order — enable/disable them via options
  const byTagQuery = api.post.byTag.useQuery(
    { tag: tag ?? "", take: 12 },
    { ...recentQueryOptions, enabled: Boolean(tag) },
  );

  const recentQuery = api.post.recent.useQuery(
    { take: 12 },
    { ...recentQueryOptions, enabled: !tag },
  );

  const { data: allPosts, isLoading } = tag ? byTagQuery : recentQuery;

  // Fetch featured posts so we can prioritize them
  const { data: featuredPosts } = api.post.featured.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const posts = allPosts ?? [];

  // Combine featured posts first (sorted alphabetically by name), then the rest
  const featured = (featuredPosts ?? [])
    .slice()
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));

  // Build a map of featured IDs to avoid duplicates
  const featuredIds = new Set((featured ?? []).map((p) => p.id));

  const nonFeatured = posts.filter((p) => !featuredIds.has(p.id));

  // Final ordered list: featured first, then non-featured (both trimmed to requested take)
  const orderedPosts = [...featured, ...nonFeatured].slice(0, 12);

  const formatTag = (tag?: string | null): string => {
    if (!tag) return "Conto Brasileiro";
    return String(tag)
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const getReadTime = (text?: string | null) => {
    const content = (text ?? "").trim();
    if (!content) return "1 min";
    const words = content.split(/\s+/).filter(Boolean).length;
    const wpm = 200;
    const minutes = Math.max(1, Math.ceil(words / wpm));
    return `${minutes} min`;
  };

  type PostItem = {
    id: number;
    name: string;
    createdAt?: Date | string;
    description?: string | null;
    image?: string | null;
    content?: string | null;
    tags?: string[];
    author?: { name: string | null } | null;
    createdBy?: { name: string | null } | null;
    featured?: boolean;
  } | null;

  // Show loading skeletons while loading, or posts if available, otherwise show empty state
  const items: PostItem[] = isLoading
    ? Array.from({ length: 6 }).map(() => null)
    : orderedPosts && orderedPosts.length > 0
      ? orderedPosts.slice(0, 6)
      : [];

  // Add "Em breve" sentinel at the end when posts exist
  const displayItems: (PostItem | "coming-soon")[] = [...items];
  if (!isLoading && orderedPosts && orderedPosts.length > 0) {
    displayItems.push("coming-soon");
  }

  // Check if we should show empty state
  const showEmptyState =
    !isLoading && (!orderedPosts || orderedPosts.length === 0);

  return (
    <Box sx={{ mb: 6 }}>
      <Box
        id="mais-historias"
        sx={{ mb: 4, textAlign: "center", justifyContent: "center" }}
      >
        <Typography
          level="h2"
          className={playfair.className}
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontWeight: 700,
            background:
              "linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 1,
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "60px",
              height: "4px",
              background:
                "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))",
              borderRadius: "2px",
            },
          }}
        >
          Mais Histórias
        </Typography>
        <Typography
          level="body-lg"
          sx={{
            color: "var(--cv-textMuted80)",
            maxWidth: 600,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          Descubra contos que celebram a diversidade e riqueza da literatura
          brasileira
        </Typography>
        {tag ? (
          <Box
            sx={{
              mt: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Chip size="sm" variant="soft" sx={{ fontWeight: 700 }}>
              Filtrando por:{" "}
              {String(tag)
                .replaceAll("_", " ")
                .toLowerCase()
                .replace(/(^\w|\s\w)/g, (m: string) => m.toUpperCase())}
            </Chip>
            <Link href="/" scroll={false} style={{ textDecoration: "none" }}>
              <Button size="sm" variant="outlined">
                Limpar filtro
              </Button>
            </Link>
          </Box>
        ) : null}
      </Box>

      {/* Empty State */}
      {showEmptyState ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            px: 4,
            backgroundColor: "var(--cv-backgroundPaper)",
            borderRadius: 16,
            border: "1px solid var(--cv-neutral200)",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          <Box
            sx={{
              fontSize: "4rem",
              color: "var(--cv-textMuted60)",
              mb: 3,
            }}
          >
            📚
          </Box>
          <Typography
            level="h3"
            sx={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 2,
            }}
          >
            Ainda não há histórias publicadas
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "var(--cv-textMuted80)",
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Seja o primeiro a compartilhar uma história que celebra a rica
            cultura brasileira. Nossos contos estão esperando para serem
            descobertos!
          </Typography>

          {session?.user?.role === "ADMIN" && (
            <Button
              variant="solid"
              size="lg"
              onClick={() => router.push("/admin/posts/create")}
              sx={{
                bgcolor: "var(--cv-brazilGreen)",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                borderRadius: 8,
                boxShadow: "0 4px 14px 0 rgba(34,139,34,0.3)",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#1e5f28",
                  boxShadow: "0 6px 20px 0 rgba(34,139,34,0.4)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              <i className="fas fa-plus" style={{ marginRight: 8 }} />
              Criar Primeira História
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {displayItems.map((p, index) => {
            const isLarge = index === 0;
            if (p === "coming-soon") {
              return (
                <Grid xs={12} sm={6} md={4} key="coming-soon">
                  <Box
                    sx={{
                      maxWidth: 300,
                      mx: "auto",

                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        "& .coming-soon-card": {
                          boxShadow:
                            "0 24px 48px rgba(0,0,0,0.15), 0 12px 24px rgba(0,0,0,0.1)",
                        },
                      },
                    }}
                  >
                    <Card
                      className="coming-soon-card"
                      variant="plain"
                      sx={{
                        position: "relative",
                        width: 300,
                        height: 450,
                        transition: "all 0.35s cubic-bezier(0.2, 0, 0.2, 1)",
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.92)",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><rect width='24' height='24' fill='%23ffffff'/><path fill='%23000000' opacity='0.02' d='M0 0h1v1H0zM2 3h1v1H2zM5 1h1v1H5z'/></svg>")`,
                        backgroundRepeat: "repeat",
                        border: "2px solid rgba(0,0,0,0.06)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        borderRadius: 12,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 3,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      }}
                    >
                      <motion.div
                        animate={{ translateY: [0, -6, 0] }}
                        transition={{
                          duration: 3.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Typography
                          level="h1"
                          sx={{
                            color: "#111111",
                            fontSize: "3.4rem",
                            fontWeight: 800,
                            textShadow: "0 6px 18px rgba(0,0,0,0.06)",
                            opacity: 0.95,
                            mb: 3,
                          }}
                        >
                          🚀
                        </Typography>
                      </motion.div>

                      <Typography
                        level="title-lg"
                        className={playfair.className}
                        sx={{
                          fontWeight: 700,
                          color: "#111111",
                          lineHeight: 1.3,
                          textAlign: "center",
                          fontSize: "1.6rem",
                          mb: 2,
                        }}
                      >
                        Em Breve
                      </Typography>

                      <Typography
                        level="body-sm"
                        sx={{
                          color: "#333333",
                          lineHeight: 1.5,
                          textAlign: "center",
                          px: 2,
                        }}
                      >
                        Novas histórias incríveis estão chegando...
                      </Typography>
                    </Card>

                    {/* Data de lançamento */}
                    <Box
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        width: "100%",
                        px: 1,
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <i
                          className="fas fa-clock"
                          style={{
                            color: "var(--cv-textMuted60)",
                            fontSize: "0.75rem",
                          }}
                        />
                        <Typography
                          level="body-xs"
                          sx={{ color: "var(--cv-textMuted70)" }}
                        >
                          {new Date(2026, 7, 10).toLocaleDateString("pt-BR")}
                        </Typography>
                      </Stack>
                    </Box>
                  </Box>
                </Grid>
              );
            }
            const isPlaceholder = !p;
            if (isPlaceholder) {
              return (
                <Grid xs={12} sm={6} md={isLarge ? 8 : 4} key={`ph-${index}`}>
                  <PostCardSkeleton isLarge={isLarge} />
                </Grid>
              );
            }

            const post = p;
            const category =
              post.tags && post.tags.length > 0
                ? formatTag(post.tags[0])
                : "Conto Brasileiro";
            const readTime = getReadTime(post.content);

            return (
              <Grid key={String(post.id)}>
                <Box
                  sx={{
                    maxWidth: 300,
                    mx: "auto",
                    justifyContent: "center",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-12px)",
                      "& .book-card": {
                        boxShadow:
                          "0 24px 48px rgba(34,139,34,0.25), 0 12px 24px rgba(0,0,0,0.15)",
                      },
                    },
                  }}
                >
                  <Link
                    href={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card
                      className="book-card"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        width: 300,
                        height: 450,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "var(--cv-backgroundPaper)",
                        border: "2px solid var(--cv-neutral200)",
                        borderRadius: 12,
                        p: 0,
                        justifyContent: "center",

                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      }}
                    >
                      {session?.user?.role === "ADMIN" && (
                        <IconButton
                          aria-label={`Editar post ${post.id}`}
                          size="sm"
                          variant="solid"
                          color="primary"
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 3,
                            bgcolor: "var(--cv-brazilGreen)",
                            "&:hover": {
                              bgcolor: "#1e5f28",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/posts/${post.id}/edit`);
                          }}
                        >
                          <i className="fas fa-pen" aria-hidden="true" />
                        </IconButton>
                      )}

                      {/* Imagem da Capa - Preenche todo o Card */}
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.name}
                          fill
                          sizes="300px"
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                          unoptimized
                        />
                      ) : (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "var(--cv-neutral100)",
                          }}
                        />
                      )}

                      {/* Category Chip */}
                      <Chip
                        variant="solid"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 12,
                          zIndex: 3,
                          bgcolor: "var(--cv-brazilYellow)",
                          color: "var(--cv-textPrimary)",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          boxShadow: "0 2px 8px rgba(255,215,0,0.4)",
                        }}
                      >
                        {category}
                      </Chip>
                    </Card>

                    {/* Informações do Livro - FORA DO CARD */}
                    <Box
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        width: "100%",
                        px: 1,
                      }}
                    >
                      {/* Título */}
                      <Typography
                        level="title-lg"
                        className={playfair.className}
                        sx={{
                          fontWeight: 700,
                          color: "var(--cv-textPrimary)",
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          mb: 0.5,
                        }}
                      >
                        {post.name}
                      </Typography>

                      {/* Autor */}
                      <Typography
                        level="body-sm"
                        sx={{
                          color: "var(--cv-brazilGreen)",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                          mb: 1,
                        }}
                      >
                        {post.author?.name ?? "Autor Desconhecido"}
                      </Typography>

                      {/* Tempo de Leitura */}
                      <Stack
                        direction="row"
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="center"
                      >
                        <i
                          className="fas fa-clock"
                          style={{
                            color: "var(--cv-textMuted60)",
                            fontSize: "0.75rem",
                          }}
                        />
                        <Typography
                          level="body-xs"
                          sx={{ color: "var(--cv-textMuted70)" }}
                        >
                          {readTime} leitura
                        </Typography>
                      </Stack>
                    </Box>
                  </Link>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Show more button */}
      {!showEmptyState && posts.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography
            level="body-md"
            sx={{ color: "var(--cv-textMuted70)", mb: 2 }}
          >
            Explore mais histórias da literatura brasileira
          </Typography>
          <Box
            component="button"
            sx={{
              bgcolor: "transparent",
              border: "2px solid var(--cv-brazilGreen)",
              color: "var(--cv-brazilGreen)",
              px: 4,
              py: 1.5,
              borderRadius: 8,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "var(--cv-brazilGreen)",
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(34,139,34,0.3)",
              },
            }}
            onClick={() => console.log("Ver mais histórias")}
          >
            <i className="fas fa-plus" style={{ marginRight: 8 }} />
            Ver Mais Contos
          </Box>
        </Box>
      )}
    </Box>
  );
}
