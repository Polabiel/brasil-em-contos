import HeroSection from "@/app/_components/layout/HeroSection";
import Sidebar from "@/app/_components/layout/Sidebar";
import PostsGrid from "@/app/_components/layout/PostsGrid";
import HomeFooter from "@/app/_components/layout/HomeFooter";
import Box from "@mui/joy/Box";

export default async function Home() {
  return (
    <>
      <HeroSection />

      <Box
        component="main"
        sx={{
          bgcolor: 'var(--cv-backgroundDefault)',
          py: { xs: 6, md: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: { xs: 4, md: 6, lg: 8 },
              alignItems: 'start',
            }}
          >
            <Box component="section">
              <PostsGrid />
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
