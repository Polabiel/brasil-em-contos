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
          height: "2px",
        }}
      />
      <Box
        component="main"
        sx={{
          background:
            "linear-gradient(50deg, #e8f5e9 0%, #e4f1ba 50%, #ffffff 100%)",
          backgroundSize: "200% 200%",
          animation: "gradientShift 15s ease infinite",
          py: { xs: 6, md: 8 },
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
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: "start",
            }}
          >
            <Box component="section">
              <Suspense fallback={<GridSkeleton />}>
                <PostsGrid />
              </Suspense>
            </Box>

            <Box component="aside">
              <Sidebar />
            </Box>
          </Box>
        </Box>
      </Box>

      <HomeFooter />
    </>
  );
}
