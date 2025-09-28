import { db } from "@/server/db";
import HeroSection from "@/app/_components/layout/HeroSection";
import Sidebar from "@/app/_components/layout/Sidebar";
import PostsGrid from "@/app/_components/layout/PostsGrid";
import HomeFooter from "@/app/_components/layout/HomeFooter";
import Box from "@mui/joy/Box";

type DBPost = {
  id: string | number | bigint;
  name: string | null;
  createdAt: Date | string | null;
  description: string | null;
  image: string | null;
};

export default async function Home() {

  const recent: DBPost[] = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
    include: {
      createdBy: true,
    },
  });

  const posts: Array<{ id: number; name: string; createdAt?: string; description?: string; image?: string }> = recent.map((r) => {
    return {
      id: Number(r.id),
      name: r.name ?? "",
      createdAt: r.createdAt
        ? typeof r.createdAt === "string"
          ? new Date(r.createdAt).toISOString()
          : r.createdAt instanceof Date
          ? r.createdAt.toISOString()
          : String(r.createdAt)
        : undefined,
      description: r.description ?? undefined,
      image: r.image ?? undefined,
    };
  });

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
              <PostsGrid posts={posts} />
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
