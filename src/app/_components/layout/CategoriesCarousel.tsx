"use client";

import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import { Playfair_Display } from "next/font/google";
import { BookTagValues, type BookTag } from "@/lib/bookTags";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type Category = {
  value: BookTag;
  label: string;
};

export default function CategoriesCarousel() {
  const categories: Category[] = BookTagValues.map((tag: BookTag) => ({
    value: tag,
    label: tag
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l: string) => l.toUpperCase()),
  }));

  return (
    <Box
      sx={{
        position: "relative",
        bgcolor: "white",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      <Box sx={{ maxWidth: "1400px", mx: "auto" }}>
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
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

        {/* Categories Grid (fixed column width per breakpoint) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fit, 180px)",
              sm: "repeat(auto-fit, 200px)",
              md: "repeat(auto-fit, 220px)",
            },
            justifyContent: "space-between",
            gap: { xs: 2.5, sm: 3, md: 4 },
            alignItems: "start",
            width: "100%",
            maxWidth: "1400px",
            mx: "auto",
            px: { xs: 2, md: 4 },
          }}
        >
          {categories.map((category) => (
            <Box key={category.value} sx={{ display: "flex", justifyContent: "center" }}>
              <Chip
                variant="soft"
                color="success"
                sx={{
                  width: { xs: 160, sm: 180, md: 200 },
                  textAlign: "center",
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  height: { xs: 48, md: 56 },
                  px: { xs: 2, md: 3 },
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.28s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  textTransform: "none",
                  "& .joy-Chip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  },
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.03)",
                    boxShadow: "0 10px 28px rgba(34,139,34,0.18)",
                    bgcolor: "var(--cv-brazilGreen)",
                    color: "white",
                  },
                }}
              >
                {category.label}
              </Chip>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
