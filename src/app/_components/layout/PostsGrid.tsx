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
  // If featured posts exist, show only non-featured in the regular grid to avoid duplicates
  const postsForGrid = featured && featured.length > 0 ? nonFeatured : orderedPosts;
  const items: PostItem[] = isLoading
    ? Array.from({ length: 6 }).map(() => null)
    : postsForGrid && postsForGrid.length > 0
      ? postsForGrid.slice(0, 6)
      : [];

  // Add "Em breve" sentinels - one for each image
  const displayItems: (PostItem | "coming-soon")[] = [...items];
  if (!isLoading && postsForGrid && postsForGrid.length > 0) {
    displayItems.push("coming-soon", "coming-soon", "coming-soon");
  }

  // Check if we should show empty state (no posts at all, neither featured nor regular)
  const showEmptyState =
    !isLoading && (!posts || posts.length === 0);

  return (
    <Box sx={{ mb: 6 }}>
      {/* Featured Books Section */}
      {!isLoading && featured && featured.length > 0 && (
        <Box sx={{ mb: 8 }}>
          {/* Featured Title */}
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              level="h2"
              className={playfair.className}
              sx={{
                fontSize: { xs: "2rem", md: "3rem" },
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
                  width: "80px",
                  height: "4px",
                  background:
                    "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))",
                  borderRadius: "2px",
                },
              }}
            >
              {featured.length === 1
                ? "⭐ Livro Destaque do Mês"
                : "⭐ Livros Destaques do Mês"}
            </Typography>
            <Typography
              level="body-lg"
              sx={{
                color: "var(--cv-textMuted80)",
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
                mt: 2,
              }}
            >
              {featured.length === 1
                ? "Selecionado especialmente para você este mês"
                : "Selecionados especialmente para você este mês"}
            </Typography>
          </Box>

          {/* Featured Books Grid */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 4,
              justifyContent: "center",
              alignItems: "stretch",
              maxWidth: featured.length === 1 ? "400px" : "1200px",
              mx: "auto",
            }}
          >
            {featured.map((post) => {
              const category =
                post.tags && post.tags.length > 0
                  ? formatTag(post.tags[0])
                  : "Conto Brasileiro";
              const readTime = getReadTime(post.content);

              return (
                <Box
                  key={post.id}
                  sx={{
                    flex: featured.length === 1 ? "1 1 100%" : "1 1 300px",
                    maxWidth: 350,
                    mx: "auto",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-16px) scale(1.02)",
                      "& .featured-card": {
                        boxShadow:
                          "0 32px 64px rgba(34,139,34,0.3), 0 16px 32px rgba(255,215,0,0.2)",
                      },
                    },
                  }}
                >
                  <Link
                    href={`/posts/${post.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Card
                      className="featured-card"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 500,
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "var(--cv-backgroundPaper)",
                        border: "3px solid var(--cv-brazilYellow)",
                        borderRadius: 16,
                        p: 0,
                        boxShadow:
                          "0 16px 48px rgba(34,139,34,0.2), 0 8px 24px rgba(255,215,0,0.15)",
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
                            top: 16,
                            right: 16,
                            zIndex: 3,
                            bgcolor: "var(--cv-brazilGreen)",
                            "&:hover": {
                              bgcolor: "#1e5f28",
                            },
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            router.push(`/admin/posts/${post.id}/edit`);
                          }}
                        >
                          <i className="fas fa-pen" aria-hidden="true" />
                        </IconButton>
                      )}

                      {/* Featured Badge */}
                      <Chip
                        variant="solid"
                        size="md"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          zIndex: 3,
                          bgcolor: "var(--cv-brazilGreen)",
                          color: "white",
                          fontWeight: 700,
                          fontSize: "0.85rem",
                          boxShadow: "0 4px 12px rgba(34,139,34,0.5)",
                          px: 2,
                          py: 1,
                        }}
                      >
                        ⭐ DESTAQUE
                      </Chip>

                      {/* Book Image */}
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.name}
                          fill
                          sizes="350px"
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
                          bottom: 12,
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

                    {/* Book Info Below Card */}
                    <Box
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        width: "100%",
                        px: 1,
                      }}
                    >
                      <Typography
                        level="h3"
                        className={playfair.className}
                        sx={{
                          fontWeight: 700,
                          color: "var(--cv-textPrimary)",
                          lineHeight: 1.3,
                          fontSize: { xs: "1.3rem", md: "1.5rem" },
                          mb: 0.5,
                        }}
                      >
                        {post.name}
                      </Typography>

                      <Typography
                        level="body-md"
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
                            fontSize: "0.85rem",
                          }}
                        />
                        <Typography
                          level="body-sm"
                          sx={{ color: "var(--cv-textMuted70)" }}
                        >
                          {readTime} leitura
                        </Typography>
                      </Stack>
                    </Box>
                  </Link>
                </Box>
              );
            })}
          </Box>
        </Box>
      )}

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
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          {displayItems.map((p, index) => {
            const isLarge = index === 0;
            if (p === "coming-soon") {
              // Array de imagens disponíveis
              const comingSoonImages = [
                "/em_breve/canção.jpg",
                "/em_breve/a_palavra.jpg",
                "/em_breve/pequena.jpg",
              ];

              // Calcular qual imagem usar baseado no índice
              const comingSoonCount = displayItems
                .slice(0, index)
                .filter((item) => item === "coming-soon").length;
              const imageIndex = comingSoonCount % comingSoonImages.length;
              const imageSrc =
                comingSoonImages[imageIndex] ?? "/em_breve/canção.jpg";

              // Gerar datas diferentes para cada card 'Em breve' usando Date
              // Base: 10/12/2025 (10 de dezembro de 2025)
              const comingSoonBase = new Date(2025, 11, 10); // mês é 0-indexado (11 = dezembro)
              // Offsets em dias para criar datas diferentes (ajuste conforme necessário)
              const comingSoonOffsets = [0, 30, 60];
              const comingSoonDates = comingSoonOffsets.map((offset) => {
                const d = new Date(comingSoonBase);
                d.setDate(d.getDate() + offset);
                return d.toLocaleDateString("pt-BR");
              });
              const dateText =
                comingSoonDates[imageIndex % comingSoonDates.length];

              return (
                <Grid xs={12} sm={6} md={4} key={`coming-soon-${index}`}>
                  <Box
                    sx={{
                      maxWidth: 300,
                      mx: "auto",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-12px)",
                        "& .coming-soon-card": {
                          boxShadow:
                            "0 24px 48px rgba(0,0,0,0.25), 0 12px 24px rgba(0,0,0,0.15)",
                        },
                      },
                    }}
                  >
                    <Card
                      className="coming-soon-card"
                      variant="outlined"
                      sx={{
                        position: "relative",
                        width: 300,
                        height: 450,
                        transition: "all 0.35s cubic-bezier(0.2, 0, 0.2, 1)",
                        cursor: "pointer",
                        overflow: "hidden",
                        border: "2px solid var(--cv-neutral200)",
                        borderRadius: 12,
                        p: 0,
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      }}
                    >
                      {/* Imagem de fundo */}
                      <Image
                        src={imageSrc}
                        alt="Em breve"
                        fill
                        sizes="300px"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        unoptimized
                      />

                      {/* Overlay escuro (esfumado preto) */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)",
                          zIndex: 1,
                        }}
                      />

                      {/* Conteúdo centralizado */}
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                          p: 3,
                        }}
                      >
                        <Typography
                          level="title-lg"
                          className={playfair.className}
                          sx={{
                            fontWeight: 700,
                            color: "white",
                            lineHeight: 1.3,
                            textAlign: "center",
                            fontSize: "1.6rem",
                            mb: 2,
                            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                          }}
                        >
                          Novas resenhas em breve
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                          justifyContent="center"
                        >
                          <i
                            className="fas fa-clock"
                            style={{
                              color: "white",
                              fontSize: "0.85rem",
                            }}
                          />
                          <Typography
                            level="body-sm"
                            sx={{
                              color: "white",
                              fontWeight: 600,
                              textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                            }}
                          >
                            {dateText}
                          </Typography>
                        </Stack>
                      </Box>
                    </Card>

                    {/* Box de texto vazio para manter alinhamento */}
                    <Box
                      sx={{
                        mt: 2,
                        textAlign: "center",
                        width: "100%",
                        px: 1,
                        visibility: "hidden",
                      }}
                    >
                      <Typography level="body-xs">placeholder</Typography>
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
