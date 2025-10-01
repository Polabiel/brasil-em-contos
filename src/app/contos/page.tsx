import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { Suspense } from "react";
import PostsGrid from "@/app/_components/layout/PostsGrid";
import GridSkeleton from "@/app/_components/layout/GridSkeleton";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export default function ContosPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "var(--cv-backgroundDefault)",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          py: { xs: 6, md: 8 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            maxWidth: "1200px",
            mx: "auto",
            textAlign: "center",
          }}
        >
          <Typography
            level="h1"
            className={playfair.className}
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 700,
              color: "var(--cv-textPrimary)",
              mb: 2,
            }}
          >
            Contos Brasileiros
          </Typography>
          <Typography
            level="body-lg"
            sx={{
              color: "var(--cv-textMuted80)",
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Explore a rica literatura brasileira através de contos clássicos e
            contemporâneos que celebram nossa cultura e história.
          </Typography>
        </Box>
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 6, md: 8 },
        }}
      >
        <Suspense fallback={<GridSkeleton />}>
          <PostsGrid />
        </Suspense>
      </Box>
    </Box>
  );
}
