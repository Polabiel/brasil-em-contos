"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { api } from "@/trpc/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

function getAuthorName(author: unknown, createdBy: unknown): string {
  if (
    author &&
    typeof author === "object" &&
    "name" in author &&
    typeof author.name === "string"
  ) {
    return author.name;
  }
  if (
    createdBy &&
    typeof createdBy === "object" &&
    "name" in createdBy &&
    typeof createdBy.name === "string"
  ) {
    return createdBy.name;
  }
  return "Autor";
}

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function HeroSection() {
  const { data: featuredPosts, isLoading } = api.post.featured.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "60vh", md: "70vh" },
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 8 },
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23228b22" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: 0.4,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side - Content */}
          <Stack
            spacing={4}
            sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}
          >
            <Stack spacing={2}>
              <Typography
                level="h1"
                className={playfair.className}
                sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                  fontWeight: 700,
                  color: "var(--cv-textPrimary)",
                  lineHeight: 1.1,
                  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                Brasil em{" "}
                <Box
                  component="span"
                  sx={{
                    color: "var(--cv-brazilGreen)",
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: "var(--cv-brazilYellow)",
                      borderRadius: 2,
                      opacity: 0.7,
                    },
                  }}
                >
                  Contos
                </Box>
              </Typography>

              <Typography
                level="h4"
                className={inter.className}
                sx={{
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  fontWeight: 500,
                  color: "var(--cv-textMuted80)",
                  maxWidth: { xs: "100%", md: "600px" },
                  lineHeight: 1.6,
                }}
              >
                Descubra a rica tradição literária brasileira através de contos
                que capturam a alma e a diversidade de nossa cultura. Uma
                jornada pela palavra escrita que celebra nossos grandes mestres
                e novos talentos.
              </Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ alignItems: { xs: "stretch", sm: "center" } }}
            >
              <Button
                variant="solid"
                size="lg"
                sx={{
                  bgcolor: "var(--cv-brazilGreen)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
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
                <i className="fas fa-book-open" style={{ marginRight: 8 }} />
                Explorar Contos
              </Button>

              <Link href="/auth/signin" style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  size="lg"
                  sx={{
                    borderColor: "var(--cv-brazilGreen)",
                    color: "var(--cv-brazilGreen)",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 8,
                    borderWidth: 2,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  <i className="fas fa-user-plus" style={{ marginRight: 8 }} />
                  Começar Jornada
                </Button>
              </Link>
            </Stack>

            {/* Features highlights */}
            <Stack
              direction="row"
              spacing={3}
              sx={{
                justifyContent: { xs: "center", md: "flex-start" },
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-brazilYellow)",
                  }}
                />
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted70)", fontWeight: 500 }}
                >
                  Contos Clássicos
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-brazilYellow)",
                  }}
                />
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted70)", fontWeight: 500 }}
                >
                  Novos Talentos
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: "var(--cv-brazilYellow)",
                  }}
                />
                <Typography
                  level="body-sm"
                  sx={{ color: "var(--cv-textMuted70)", fontWeight: 500 }}
                >
                  Cultura Brasileira
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Right side - Featured Posts */}
          <Box
            sx={{
              flex: { xs: 1, md: "0 0 50%" },
              display: "flex",
              flexDirection: { xs: "column", md: "row", lg: "column" },
              gap: { xs: 3, md: 3, lg: 4 },
              maxWidth: { xs: "100%", md: "600px" },
              mx: "auto",
            }}
          >
            {isLoading ? (
              // Loading skeleton
              <>
                {[1, 2].map((index) => (
                  <Card
                    key={index}
                    sx={{
                      flex: 1,
                      minHeight: { xs: 200, md: 160, lg: 220 },
                      background: "rgba(255,255,255,0.9)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 16,
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      animation: "pulse 1.5s ease-in-out infinite alternate",
                      "@keyframes pulse": {
                        from: { opacity: 0.6 },
                        to: { opacity: 1 },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          height: 16,
                          bgcolor: "var(--cv-textMuted20)",
                          borderRadius: 4,
                          mb: 2,
                        }}
                      />
                      <Box
                        sx={{
                          height: 40,
                          bgcolor: "var(--cv-textMuted10)",
                          borderRadius: 4,
                          mb: 2,
                        }}
                      />
                      <Box
                        sx={{
                          height: 12,
                          width: "60%",
                          bgcolor: "var(--cv-textMuted20)",
                          borderRadius: 4,
                        }}
                      />
                    </CardContent>
                  </Card>
                ))}
              </>
            ) : featuredPosts && featuredPosts.length > 0 ? (
              // Featured posts
              <>
                {featuredPosts.slice(0, 2).map((post) => (
                  <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    style={{ textDecoration: "none", flex: 1 }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        minHeight: { xs: 200, md: 160, lg: 220 },
                        background: "rgba(255,255,255,0.95)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.3)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        cursor: "pointer",
                        position: "relative",
                        overflow: "hidden",
                        "&:hover": {
                          transform: "translateY(-6px)",
                          boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                          "& .post-title": {
                            color: "var(--cv-brazilGreen)",
                          },
                        },
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: 3,
                          background: `linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow))`,
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        {/* Featured badge */}
                        <Chip
                          size="sm"
                          variant="solid"
                          sx={{
                            alignSelf: "flex-end",
                            bgcolor: "var(--cv-brazilGreen)",
                            color: "white",
                            fontWeight: 600,
                            fontSize: "0.7rem",
                            mb: 2,
                          }}
                        >
                          ✨ Em Destaque
                        </Chip>

                        <Typography
                          level="title-lg"
                          className={`${playfair.className} post-title`}
                          sx={{
                            fontWeight: 700,
                            fontSize: {
                              xs: "1rem",
                              md: "0.95rem",
                              lg: "1.1rem",
                            },
                            color: "var(--cv-textPrimary)",
                            lineHeight: 1.3,
                            mb: 1.5,
                            display: "-webkit-box",
                            WebkitLineClamp: { xs: 2, lg: 3 },
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            transition: "color 0.3s ease",
                          }}
                        >
                          {post.name}
                        </Typography>

                        <Typography
                          level="body-sm"
                          sx={{
                            color: "var(--cv-textMuted70)",
                            lineHeight: 1.4,
                            fontSize: { xs: "0.8rem", lg: "0.85rem" },
                            flex: 1,
                            display: "-webkit-box",
                            WebkitLineClamp: { xs: 2, lg: 3 },
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            mb: 2,
                          }}
                        >
                          {post.description ??
                            (post.content?.slice(0, 100)
                              ? post.content.slice(0, 100) + "..."
                              : "")}
                        </Typography>

                        {/* Author info */}
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            level="body-xs"
                            sx={{
                              color: "var(--cv-brazilGreen)",
                              fontWeight: 600,
                              fontSize: "0.75rem",
                            }}
                          >
                            {getAuthorName(post.author, post.createdBy)}
                          </Typography>

                          {post.tag && (
                            <Chip
                              size="sm"
                              variant="soft"
                              sx={{
                                bgcolor: "var(--cv-brazilYellow)",
                                color: "var(--cv-textPrimary)",
                                fontSize: "0.65rem",
                                fontWeight: 500,
                              }}
                            >
                              {post.tag}
                            </Chip>
                          )}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </>
            ) : (
              // No featured posts fallback
              <Card
                sx={{
                  minHeight: { xs: 200, md: 160, lg: 220 },
                  background: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack spacing={2} alignItems="center" textAlign="center">
                  <Typography level="h4" sx={{ fontSize: "1.5rem" }}>
                    📚
                  </Typography>
                  <Typography
                    level="title-md"
                    sx={{ color: "var(--cv-textMuted70)", fontSize: "0.9rem" }}
                  >
                    Posts em destaque aparecerão aqui
                  </Typography>
                  <Typography
                    level="body-sm"
                    sx={{ color: "var(--cv-textMuted50)", fontSize: "0.8rem" }}
                  >
                    Configure no painel administrativo
                  </Typography>
                </Stack>
              </Card>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
