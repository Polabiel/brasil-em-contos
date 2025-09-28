"use client";

import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Skeleton from "@mui/joy/Skeleton";
import Grid from "@mui/joy/Grid";

interface PostsGridSkeletonProps {
  count?: number;
}

export function PostsGridSkeleton({ count = 4 }: PostsGridSkeletonProps) {
  return (
    <Box sx={{ mb: 6 }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Skeleton variant="text" width={300} height={40} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="text" width={500} height={24} sx={{ mx: 'auto' }} />
      </Box>

      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => {
          const isLarge = index === 0;
          return (
            <Grid xs={12} sm={6} md={isLarge ? 8 : 4} key={index}>
              <Box
                sx={{
                  border: '1px solid var(--cv-neutral200)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  height: isLarge ? 400 : 320,
                }}
              >
                {/* Image Skeleton */}
                <Skeleton 
                  variant="rectangular" 
                  width="100%" 
                  height={isLarge ? 200 : 160}
                  sx={{ 
                    animation: 'pulse 1.5s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.6 },
                      '50%': { opacity: 0.8 },
                      '100%': { opacity: 0.6 },
                    },
                  }} 
                />
                
                {/* Content Skeleton */}
                <Stack spacing={isLarge ? 2 : 1.5} sx={{ p: isLarge ? 3 : 2.5 }}>
                  {/* Title */}
                  <Skeleton variant="text" width="90%" height={isLarge ? 32 : 24} />
                  
                  {/* Meta Info */}
                  <Stack direction="row" spacing={2}>
                    <Skeleton variant="text" width={80} height={16} />
                    <Skeleton variant="text" width={100} height={16} />
                  </Stack>
                  
                  {/* Description */}
                  <Stack spacing={0.5}>
                    <Skeleton variant="text" width="100%" height={16} />
                    <Skeleton variant="text" width="85%" height={16} />
                    {isLarge && <Skeleton variant="text" width="75%" height={16} />}
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Load More Button Skeleton */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Skeleton variant="text" width={200} height={20} sx={{ mx: 'auto', mb: 2 }} />
        <Skeleton variant="rectangular" width={180} height={48} sx={{ mx: 'auto', borderRadius: 8 }} />
      </Box>
    </Box>
  );
}

export function SidebarSkeleton() {
  return (
    <Stack spacing={4}>
      {/* Main Card Skeleton */}
      <Box
        sx={{
          border: '2px solid var(--cv-neutral200)',
          borderRadius: 12,
          p: 3,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Skeleton variant="circular" width={80} height={80} />
          <Stack spacing={1} alignItems="center" sx={{ width: '100%' }}>
            <Skeleton variant="text" width={160} height={28} />
            <Skeleton variant="text" width="100%" height={20} />
            <Skeleton variant="text" width="90%" height={20} />
            <Skeleton variant="text" width="80%" height={20} />
          </Stack>
          <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 6 }} />
        </Stack>
      </Box>

      {/* Categories Card Skeleton */}
      <Box
        sx={{
          border: '1px solid var(--cv-neutral200)',
          borderRadius: 8,
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="text" width={140} height={24} />
          {Array.from({ length: 4 }).map((_, index) => (
            <Stack key={index} direction="row" justifyContent="space-between" alignItems="center">
              <Skeleton variant="text" width={100} height={20} />
              <Skeleton variant="rectangular" width={30} height={20} sx={{ borderRadius: 4 }} />
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* Featured Authors Skeleton */}
      <Box
        sx={{
          border: '1px solid var(--cv-neutral200)',
          borderRadius: 8,
          p: 3,
        }}
      >
        <Stack spacing={2}>
          <Skeleton variant="text" width={120} height={24} />
          {Array.from({ length: 3 }).map((_, index) => (
            <Box key={index} sx={{ p: 2 }}>
              <Stack spacing={0.5}>
                <Skeleton variant="text" width={140} height={20} />
                <Skeleton variant="text" width={80} height={16} />
                <Skeleton variant="text" width="90%" height={16} />
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Newsletter Skeleton */}
      <Box
        sx={{
          border: '2px solid var(--cv-neutral200)',
          borderRadius: 8,
          p: 3,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Skeleton variant="text" width={20} height={24} />
          <Skeleton variant="text" width={180} height={20} />
          <Skeleton variant="text" width="100%" height={16} />
          <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 6 }} />
        </Stack>
      </Box>
    </Stack>
  );
}

export function HeroSkeleton() {
  return (
    <Box
      sx={{
        minHeight: { xs: '60vh', md: '70vh' },
        background: `linear-gradient(135deg, var(--cv-gradientStart) 0%, var(--cv-gradientMid) 50%, var(--cv-gradientEnd) 100%)`,
        display: 'flex',
        alignItems: 'center',
        py: { xs: 4, md: 8 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', width: '100%' }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side - Content */}
          <Stack spacing={4} sx={{ flex: 1, alignItems: { xs: 'center', md: 'flex-start' } }}>
            <Stack spacing={2} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Skeleton variant="text" width={400} height={60} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="90%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ width: '100%', maxWidth: 400 }}
            >
              <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 8 }} />
              <Skeleton variant="rectangular" width="100%" height={48} sx={{ borderRadius: 8 }} />
            </Stack>

            <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap' }}>
              {Array.from({ length: 3 }).map((_, index) => (
                <Stack key={index} direction="row" spacing={1} alignItems="center">
                  <Skeleton variant="circular" width={8} height={8} />
                  <Skeleton variant="text" width={120} height={16} />
                </Stack>
              ))}
            </Stack>
          </Stack>

          {/* Right side - Illustration */}
          <Box sx={{ width: { xs: 280, md: 400 }, height: { xs: 280, md: 400 } }}>
            <Skeleton 
              variant="circular" 
              width="100%" 
              height="100%"
              sx={{
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <HeroSkeleton />
      
      <Box
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
            <PostsGridSkeleton />
            <SidebarSkeleton />
          </Box>
        </Box>
      </Box>
    </>
  );
}