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

  // Fetch available tag values from server (Prisma enum via tRPC)
  const bookTagsQuery = api.post.bookTags.useQuery();

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
      <Box id="mais-historias" sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          level="h2"
          className={playfair.className}
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontWeight: 700,
            background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)",
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
              background: "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))",
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
        <Grid container spacing={3}>
          {displayItems.map((p, index) => {
            const isLarge = index === 0;
            if (p === "coming-soon") {
              return (
                <Grid xs={12} sm={6} md={4} key="coming-soon">
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    whileHover={{ scale: 1.03, y: -6 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ perspective: "800px" }}
                  >
                    <Card
                      variant="plain"
                      sx={{
                        position: "relative",
                        width: 350,
                        height: 550,
                        transition: "all 0.35s cubic-bezier(0.2, 0, 0.2, 1)",
                        cursor: "pointer",
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.92)",
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><rect width='24' height='24' fill='%23ffffff'/><path fill='%23000000' opacity='0.02' d='M0 0h1v1H0zM2 3h1v1H2zM5 1h1v1H5z'/></svg>")`,
                        backgroundRepeat: "repeat",
                        border: "1px solid rgba(0,0,0,0.06)",
                        backdropFilter: "blur(6px)",
                        WebkitBackdropFilter: "blur(6px)",
                        borderRadius: 16,
                        display: "flex",
                        flexDirection: "column",
                        p: 0,
                        boxShadow: "0 8px 30px rgba(2,6,23,0.06)",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "4px",
                          background:
                            "linear-gradient(90deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))",
                          opacity: 0.6,
                          transition: "opacity 0.3s ease",
                        },
                        "&:hover": {
                          borderColor: "rgba(0,0,0,0.08)",
                          boxShadow: "0 18px 40px rgba(2,6,23,0.12)",
                          transform: "translateY(-6px)",
                          "&::before": {
                            opacity: 1,
                          },
                        },
                      }}
                    >
                      <Box sx={{ position: "relative", width: "100%", height: 260, flexShrink: 0, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <motion.div animate={{ translateY: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                          <Typography level="h1" sx={{ color: "#111111", fontSize: "3.4rem", fontWeight: 800, textShadow: "0 6px 18px rgba(0,0,0,0.06)", opacity: 0.95 }}>
                            🚀
                          </Typography>
                        </motion.div>
                      </Box>

                      <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column", background: "transparent" }}>
                        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.15 }}>
                            <Typography level="title-md" className={playfair.className} sx={{ fontWeight: 700, color: "#111111", lineHeight: 1.3, textAlign: "center", fontSize: "1.6rem" }}>
                              Em Breve
                            </Typography>
                          </motion.div>

                          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.3 }}>
                            <Typography level="body-sm" sx={{ color: "#333333", lineHeight: 1.5, textAlign: "center", flexGrow: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              Novas histórias incríveis estão chegando... Prepare-se para mais aventuras literárias!
                            </Typography>
                          </motion.div>

                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45, delay: 0.5 }} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                              <Box sx={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(45deg, #e6e6e6, #ffffff)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.06)" }}>
                                <i className="fas fa-clock" style={{ color: "#111111", fontSize: "1.05rem" }} />
                              </Box>
                            </Box>
                          </motion.div>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
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
            const date = post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "";
            const category = post.tags && post.tags.length > 0 
              ? formatTag(post.tags[0]) 
              : formatTag(null);
            const readTime = getReadTime(post.description);

            return (
              <Grid key={String(post.id)}>
                <Link
                  href={`/posts/${post.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      position: "relative",
                      width: 350,
                      height: 550,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      overflow: "hidden",
                      background: "var(--cv-backgroundPaper)",
                      border: "2px solid var(--cv-neutral200)",
                      borderRadius: 16,
                      display: "flex",
                      flexDirection: "column",
                      p: 0,
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow), var(--cv-brazilBlue))",
                        opacity: 0,
                        transition: "opacity 0.4s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-12px) scale(1.02)",
                        boxShadow: "0 24px 48px rgba(34,139,34,0.2)",
                        borderColor: "var(--cv-brazilGreen)",
                        "&::before": {
                          opacity: 1,
                        },
                        "& .post-image": {
                          transform: "scale(1.1) rotate(1deg)",
                        },
                        "& .post-overlay": {
                          opacity: 1,
                        },
                        "& .read-more": {
                          transform: "translateY(0)",
                          opacity: 1,
                        },
                      },
                      "& .post-image": {
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "top",
                        transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
                          transform: "none",
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

                    <Box
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: 260,
                        flexShrink: 0,
                        overflow: "hidden",
                      }}
                    >
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.name}
                          fill
                          sizes="(max-width: 600px) 100vw, 390px"
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            transition: "transform 0.3s ease",
                            display: "block",
                          }}
                          className="post-image"
                          unoptimized
                        />
                      ) : (
                        <Box
                          className="post-image"
                          sx={{
                            position: "absolute",
                            inset: 0,
                            display: "block",
                            transition: "transform 0.3s ease",
                            backgroundColor: "var(--cv-neutral100)",
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
                          background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(34,139,34,0.6) 100%)",
                          opacity: 0,
                          transition: "opacity 0.4s ease",
                          zIndex: 2,
                        }}
                      />

                      {/* Category Chip */}
                      <Chip
                        variant="solid"
                        size="sm"
                        sx={{
                          position: "absolute",
                          top: 8,
                          left: 12,
                          transform: "none",
                          zIndex: 3,
                          bgcolor: "var(--cv-brazilYellow)",
                          color: "var(--cv-textPrimary)",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          boxShadow: "0 2px 8px rgba(255,215,0,0.4)",
                          "&:hover": {
                            transform: "scale(1.1) translateY(-2px)",
                            boxShadow: "0 4px 12px rgba(255,215,0,0.6)",
                          },
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
                          className={playfair.className}
                          sx={{
                            fontWeight: 700,
                            color: "var(--cv-textPrimary)",
                            lineHeight: 1.3,
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            transition: "color 0.3s ease",
                            "&:hover": {
                              color: "var(--cv-brazilGreen)",
                            },
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
                            {post.author?.name ?? "Autor Desconhecido"}
                          </Typography>

                          <Typography
                            level="body-xs"
                            sx={{ color: "var(--cv-textMuted70)" }}
                          >
                            {post.createdBy?.name
                              ? `Criado: ${post.createdBy.name}`
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
