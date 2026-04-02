import HeroSection from "@/app/_components/layout/HeroSection";
import Sidebar from "@/app/_components/layout/Sidebar";
import PostsGrid from "@/app/_components/layout/PostsGrid";
import { Suspense } from "react";
import HomeFooter from "@/app/_components/layout/HomeFooter";
import Box from "@mui/joy/Box";
import GridSkeleton from "./_components/layout/GridSkeleton";
import { Divider } from "@mui/joy";

export default async function Home() {
  return (
    <>
      <HeroSection />

      <Divider
        sx={{
          height: "1px",
          borderColor: "var(--cv-borderLight)",
          my: 0,
        }}
      />

      <Box
        component="main"
        sx={{
          background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 20s ease infinite",
          py: { xs: 8, md: 10 },
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%230d6b2f" fill-opacity="0.02"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.5,
          },
          "@keyframes gradientShift": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },
        }}
      >
        <Box
          sx={{
            mx: "auto",
            maxWidth: "1400px",
            px: { xs: 2, sm: 3, md: 4, lg: 6 },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr 320px" },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: "start",
            }}
          >
            {/* Main Content - Exploração de Contos */}
            <Box 
              component="section"
              id="mais-historias"
              sx={{
                minHeight: "600px",
              }}
            >
              <Suspense fallback={<GridSkeleton />}>
                <PostsGrid />
              </Suspense>
            </Box>

            {/* Sidebar - Filtros e Recomendações */}
            <Box 
              component="aside"
              sx={{
                display: { xs: "none", lg: "block" },
              }}
            >
              <Sidebar />
            </Box>
          </Box>
        </Box>
      </Box>

      <HomeFooter />
    </>
  );
}
