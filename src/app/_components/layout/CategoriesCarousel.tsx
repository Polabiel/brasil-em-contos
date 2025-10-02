"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Stack from "@mui/joy/Stack";
import { Playfair_Display } from "next/font/google";
import { BookTagValues, type BookTag } from "@/lib/bookTags";
import { useRef, useEffect, useState } from "react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type Category = {
  value: BookTag;
  label: string;
};

type CategoryGroup = {
  title: string;
  categories: Category[];
  color: "primary" | "neutral" | "warning" | "success" | "danger";
};

export default function CategoriesCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const scrollSpeedRef = useRef(0.5); // pixels por frame

  const categories: Category[] = BookTagValues.map((tag: BookTag) => ({
    value: tag,
    label: tag
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase()),
  }));

  const categoryGroups: CategoryGroup[] = [
    {
      title: "Gêneros Narrativos",
      categories: categories.slice(0, 2),
      color: "primary",
    },
    {
      title: "Gênero Lírico",
      categories: categories.slice(2, 3),
      color: "neutral",
    },
    {
      title: "Gênero Dramático",
      categories: categories.slice(3, 4),
      color: "warning",
    },
    {
      title: "Temas Específicos",
      categories: categories.slice(4, 14),
      color: "success",
    },
    {
      title: "Outras Categorias",
      categories: categories.slice(14),
      color: "danger",
    },
  ];

  // Triplicar os grupos para criar efeito de loop infinito suave
  const infiniteGroups = [
    ...categoryGroups,
    ...categoryGroups,
    ...categoryGroups,
  ];

  // Auto-scroll contínuo com requestAnimationFrame
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const animate = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeedRef.current;

        // Reset para o meio quando chegar no final da primeira duplicação
        const singleSetWidth = container.scrollWidth / 3;
        if (container.scrollLeft >= singleSetWidth * 2) {
          container.scrollLeft = singleSetWidth;
        }
        // Reset para o meio quando voltar muito para trás
        if (container.scrollLeft <= 0) {
          container.scrollLeft = singleSetWidth;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Iniciar no meio (segundo conjunto)
    if (container.scrollLeft === 0) {
      const singleSetWidth = container.scrollWidth / 3;
      container.scrollLeft = singleSetWidth;
    }

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "white",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        borderTop: "1px solid var(--cv-neutral200)",
        overflow: "hidden",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Box>
            <Typography
              level="h2"
              sx={{
                fontFamily: playfair.style.fontFamily,
                fontWeight: 700,
                color: "var(--cv-textPrimary)",
                fontSize: { xs: "1.5rem", md: "2rem" },
                mb: 1,
                background:
                  "linear-gradient(135deg, var(--cv-brazilGreen) 0%, var(--cv-brazilYellow) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Explore Gêneros Literários
            </Typography>
            <Typography
              level="body-md"
              sx={{
                color: "var(--cv-textMuted70)",
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Descubra contos através dos diferentes gêneros literários
            </Typography>
          </Box>
        </Stack>

        {/* Carousel Container with fade edges */}
        <Box sx={{ position: "relative" }}>
          {/* Left fade overlay */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: { xs: 40, md: 80 },
              background: "linear-gradient(to right, white, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Right fade overlay */}
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: { xs: 40, md: 80 },
              background: "linear-gradient(to left, white, transparent)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Carousel - Infinite Loop */}
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              gap: 3,
              overflowX: "hidden",
              pb: 2,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {infiniteGroups.map((group, idx) => (
              <Box
                key={`${group.title}-${idx}`}
                sx={{
                  minWidth: { xs: 280, sm: 280, md: 300 },
                  bgcolor: "var(--cv-backgroundDefault)",
                  borderRadius: 3,
                  p: 3,
                  border: "2px solid var(--cv-neutral200)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  overflow: "hidden",
                  flexShrink: 0,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: `linear-gradient(90deg, ${
                      group.color === "primary"
                        ? "var(--cv-brazilBlue)"
                        : group.color === "neutral"
                          ? "var(--cv-neutral400)"
                          : group.color === "warning"
                            ? "var(--cv-brazilYellow)"
                            : group.color === "success"
                              ? "var(--cv-brazilGreen)"
                              : "var(--cv-brazilRed)"
                    }, transparent)`,
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  },
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 12px 32px rgba(34,139,34,0.2)",
                    borderColor: "var(--cv-brazilGreen)",
                    "&::before": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Typography
                  level="h4"
                  sx={{
                    fontFamily: playfair.style.fontFamily,
                    fontWeight: 700,
                    color: "var(--cv-textPrimary)",
                    mb: 2.5,
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    position: "relative",
                    paddingBottom: "8px",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "40px",
                      height: "3px",
                      bgcolor: "var(--cv-brazilGreen)",
                      borderRadius: "2px",
                    },
                  }}
                >
                  {group.title}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1.5,
                  }}
                >
                  {group.categories.map((category, catIdx) => (
                    <Chip
                      key={`${category.value}-${idx}-${catIdx}`}
                      variant="soft"
                      color={group.color}
                      sx={{
                        fontSize: "0.85rem",
                        py: 0.75,
                        px: 2,
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        fontWeight: 500,
                        "&:hover": {
                          transform: "translateY(-2px) scale(1.08)",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {category.label}
                    </Chip>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
