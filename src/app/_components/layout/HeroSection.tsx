"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Button from "@mui/joy/Button";
import Container from "@mui/joy/Container";
import { Playfair_Display, Inter } from "next/font/google";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CategoriesCarousel from "./CategoriesCarousel";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export default function HeroSection() {
  const { data: session } = useSession();

  return (
    <>
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: "92vh", md: "92vh" },
          background: `linear-gradient(0deg, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0) 60%), linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
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
        <Container
          maxWidth="xl"
          sx={{ position: "relative", zIndex: 1, px: { xs: 2, md: 6 } }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 4, md: 6 }}
            alignItems="center"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {/* Left side - Illustration */}
            <Box
              sx={{
                flex: { xs: "0 0 auto", md: "0 0 22%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: { xs: 0, md: 2 },
              }}
            >
              <Box
                component="img"
                src="/icon.png"
                alt="Slogan icon"
                sx={{
                  width: { xs: 120, sm: 200, md: "100%" },
                  height: "auto",
                  maxWidth: 380,
                  animation: "float 6s ease-in-out infinite",
                  filter: "drop-shadow(0 8px 24px rgba(34,139,34,0.3))",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05) rotate(5deg)",
                    filter: "drop-shadow(0 12px 32px rgba(34,139,34,0.4))",
                  },
                  "@keyframes float": {
                    "0%, 100%": {
                      transform: "translateY(0px) rotate(0deg)",
                    },
                    "50%": {
                      transform: "translateY(-20px) rotate(2deg)",
                    },
                  },
                }}
              />
            </Box>

            {/* Center content */}
            <Stack
              spacing={4}
              sx={{
                flex: { xs: "1 1 auto", md: "0 0 38%" },
                textAlign: { xs: "center", md: "left" },
                px: { xs: 0, md: 2 },
                maxWidth: { md: 680 },
              }}
            >
              <Stack spacing={2}>
                <Typography
                  level="h1"
                  className={playfair.className}
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    fontWeight: 700,
                    color: "var(--cv-textPrimary)",
                    lineHeight: 1.1,
                    textShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  Brasil em{" "}
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      position: "relative",
                      display: "inline-block",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -8,
                        left: 0,
                        right: 0,
                        height: 6,
                        background: "linear-gradient(90deg, var(--cv-brazilGreen), var(--cv-brazilYellow), var(--cv-brazilBlue))",
                        borderRadius: 3,
                        opacity: 0.8,
                        animation: "shimmer 3s ease-in-out infinite",
                      },
                      "@keyframes shimmer": {
                        "0%, 100%": {
                          transform: "scaleX(1)",
                          opacity: 0.8,
                        },
                        "50%": {
                          transform: "scaleX(0.95)",
                          opacity: 1,
                        },
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
                  onClick={() => {
                    const element = document.getElementById('mais-historias');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  sx={{
                    bgcolor: "var(--cv-brazilGreen)",
                    color: "white",
                    px: session ? 6 : 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    borderRadius: 8,
                    boxShadow: "0 4px 14px 0 rgba(34,139,34,0.3)",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    width: { xs: session ? "100%" : "auto", sm: "auto" },
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: 0,
                      height: 0,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                      transform: "translate(-50%, -50%)",
                      transition: "width 0.6s ease, height 0.6s ease",
                    },
                    "&:hover": {
                      bgcolor: "#1e5f28",
                      boxShadow: "0 8px 24px 0 rgba(34,139,34,0.5)",
                      transform: "translateY(-4px) scale(1.05)",
                      "&::before": {
                        width: "300px",
                        height: "300px",
                      },
                    },
                    "&:active": {
                      transform: "translateY(-2px) scale(1.02)",
                    },
                  }}
                >
                  <i className="fas fa-book-open" style={{ marginRight: 8, position: "relative", zIndex: 1 }} />
                  <span style={{ position: "relative", zIndex: 1 }}>Explorar Contos</span>
                </Button>

                {!session && (
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
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        position: "relative",
                        overflow: "hidden",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: "-100%",
                          width: "100%",
                          height: "100%",
                          background: "var(--cv-brazilGreen)",
                          transition: "left 0.4s ease",
                          zIndex: -1,
                        },
                        "&:hover": {
                          color: "white",
                          borderColor: "var(--cv-brazilGreen)",
                          transform: "translateY(-4px) scale(1.05)",
                          boxShadow: "0 8px 24px rgba(34,139,34,0.3)",
                          "&::before": {
                            left: 0,
                          },
                        },
                      }}
                    >
                      <i
                        className="fas fa-user-plus"
                        style={{ marginRight: 8, position: "relative", zIndex: 1 }}
                      />
                      <span style={{ position: "relative", zIndex: 1 }}>Cadastre-se</span>
                    </Button>
                  </Link>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Categories Carousel */}
      <CategoriesCarousel />
    </>
  );
}
