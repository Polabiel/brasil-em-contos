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
import { useSession } from "next-auth/react";
import Image from "next/image";
// api import removed - not used in this component
// Image import removed - not used in this component

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
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "92vh", md: "92vh" },
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
                  transition: "all 0.2s ease",
                  width: { xs: session ? "100%" : "auto", sm: "auto" },
                  justifyContent: "center",
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
                      transition: "all 0.2s ease",
                      "&:hover": {
                        bgcolor: "var(--cv-brazilGreen)",
                        color: "white",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <i
                      className="fas fa-user-plus"
                      style={{ marginRight: 8 }}
                    />
                    Cadastre-se
                  </Button>
                </Link>
              )}
            </Stack>
          </Stack>

          <Box
            sx={{
              flex: { xs: 1, md: "0 0 40%" },
              display: "flex",
              flexDirection: "column",
              gap: { xs: 3, md: 3, lg: 4 },
              maxWidth: { xs: "100%", md: "520px" },
              mx: 0,
            }}
          >
            <Card
              sx={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(8px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.3)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Chip
                    size="sm"
                    variant="solid"
                    sx={{
                      alignSelf: "flex-start",
                      bgcolor: "var(--cv-brazilGreen)",
                      color: "white",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                    }}
                  >
                    Blogueiras
                  </Chip>

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
                            width: 100,
                            height: 100,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            src={b.img}
                            alt={b.name}
                            width={100}
                            height={100}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                            }}
                          />
                        </Box>

                        <Typography
                          level="body-md"
                          sx={{ fontWeight: 700, fontSize: "0.95rem" }}
                        >
                          {b.name}
                        </Typography>

                        <Typography
                          level="body-sm"
                          sx={{
                            color: "var(--cv-textMuted70)",
                            fontSize: "0.85rem",
                          }}
                        >
                          {b.desc}
                        </Typography>
                      </Stack>
                    ))}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
