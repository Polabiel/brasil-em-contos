"use client";

import Grid from "@mui/joy/Grid";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
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
import { BookTagValues } from "@/lib/bookTags";
import { useSearchParams, useRouter } from "next/navigation";

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

  const categories = BookTagValues.map((tag) =>
    tag
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase()),
  );

  function getRandomCategory(index = 0) {
    return categories[index % categories.length];
  }

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
    tag?: string | null;
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

  // Check if we should show empty state
  const showEmptyState =
    !isLoading && (!orderedPosts || orderedPosts.length === 0);

  return (
    <Box sx={{ mb: 6 }}>
      <Box id="mais-historias" sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          level="h2"
          sx={{
            fontSize: { xs: "1.8rem", md: "2.2rem" },
            fontWeight: 700,
            color: "var(--cv-textPrimary)",
            mb: 1,
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
        <Grid container spacing={3}>
          {items.map((p, index) => {
            const isPlaceholder = !p;
            const isLarge = index === 0;
            if (isPlaceholder) {
              return (
                <Grid xs={12} sm={6} md={isLarge ? 8 : 4} key={`ph-${index}`}>
                  <PostCardSkeleton isLarge={isLarge} />
                </Grid>
              );
            }

            const post = p;
            const date = post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "";
            const category = getRandomCategory(index);
            const readTime = getReadTime(post.description);

            return (
              <Grid xs={12} sm={6} md={isLarge ? 8 : 4} key={String(post.id)}>
                <Link
                  href={`/posts/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      position: "relative",
                      height: isLarge ? 400 : 320,
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "var(--cv-backgroundPaper)",
                      border: "1px solid var(--cv-neutral200)",
                      borderRadius: 12,
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                        borderColor: "var(--cv-brazilGreen)",
                        "& .post-image": {
                          transform: "scale(1.05)",
                        },
                        "& .post-overlay": {
                          opacity: 1,
                        },
                        "& .read-more": {
                          transform: "translateY(0)",
                          opacity: 1,
                        },
                      },
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

                    {/* Image Section */}
                    <Box
                      sx={{
                        width: "100%",
                        height: isLarge ? 200 : 160,
                        position: "relative",
                        overflow: "hidden",
                        background: `linear-gradient(135deg, var(--cv-brazilGreen)20, var(--cv-brazilYellow)20)`,
                      }}
                    >
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="post-image"
                          unoptimized
                        />
                      ) : (
                        <Box
                          className="post-image"
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            background:
                              "linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      )}

                      {/* Overlay for better text readability */}
                      <Box
                        className="post-overlay"
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background:
                            "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                      />

                      {/* Category Chip */}
                      <Chip
                        variant="solid"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          bgcolor: "var(--cv-brazilYellow)",
                          color: "var(--cv-textPrimary)",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      >
                        {category}
                      </Chip>
                    </Box>

                    <CardContent
                      sx={{
                        p: isLarge ? 3 : 2.5,
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Stack spacing={isLarge ? 2 : 1.5} sx={{ flexGrow: 1 }}>
                        <Typography
                          level={isLarge ? "h4" : "title-md"}
                          sx={{
                            fontWeight: 700,
                            color: "var(--cv-textPrimary)",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <i
                              className="fas fa-calendar"
                              style={{
                                color: "var(--cv-textMuted60)",
                                fontSize: "0.8rem",
                              }}
                            />
                            <Typography
                              level="body-xs"
                              sx={{ color: "var(--cv-textMuted70)" }}
                            >
                              {date}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <i
                              className="fas fa-clock"
                              style={{
                                color: "var(--cv-textMuted60)",
                                fontSize: "0.8rem",
                              }}
                            />
                            <Typography
                              level="body-xs"
                              sx={{ color: "var(--cv-textMuted70)" }}
                            >
                              {readTime} leitura
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography
                          level="body-sm"
                          sx={{
                            color: "var(--cv-textMuted80)",
                            lineHeight: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: isLarge ? 3 : 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            flexGrow: 1,
                          }}
                        >
                          {post.description ??
                            "Uma história cativante que explora os aspectos únicos da cultura brasileira através da literatura."}
                        </Typography>

                        {/* Author and collaborator info */}
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography
                            level="body-xs"
                            sx={{
                              color: "var(--cv-brazilGreen)",
                              fontWeight: 600,
                            }}
                          >
                            {post.author?.name ??
                              post.createdBy?.name ??
                              "Autor"}
                          </Typography>

                          <Typography
                            level="body-xs"
                            sx={{ color: "var(--cv-textMuted70)" }}
                          >
                            {post.createdBy?.name
                              ? `Colaborador: ${post.createdBy.name}`
                              : ""}
                          </Typography>
                        </Stack>

                        {/* Read more button - appears on hover */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          className="read-more"
                          sx={{
                            transform: "translateY(8px)",
                            opacity: 0,
                            transition: "all 0.3s ease",
                            color: "var(--cv-brazilGreen)",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          }}
                        >
                          <span>Ler história</span>
                          <i
                            className="fas fa-arrow-right"
                            style={{ fontSize: "0.8rem" }}
                          />
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
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
