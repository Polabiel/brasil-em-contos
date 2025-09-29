"use client";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";

export default function PostCardSkeleton({ isLarge = false }: { isLarge?: boolean }) {
  return (
    <Card
      variant="outlined"
      sx={{
        position: 'relative',
        height: isLarge ? 400 : 320,
        overflow: 'hidden',
        background: 'var(--cv-backgroundPaper)',
        border: '1px solid var(--cv-neutral200)',
        borderRadius: 12,
      }}
    >
      <Box sx={{ width: '100%', height: isLarge ? 200 : 160, background: 'linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.02))' }} />
      <CardContent sx={{ p: isLarge ? 3 : 2.5, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Stack spacing={1} sx={{ width: '100%' }}>
          <Box sx={{ height: isLarge ? 28 : 20, background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.06) 75%)', borderRadius: 1, backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite' }} />
          <Box sx={{ height: isLarge ? 16 : 12, width: '40%', background: 'linear-gradient(90deg, rgba(0,0,0,0.04) 25%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.04) 75%)', borderRadius: 1, backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite' }} />
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ height: isLarge ? 64 : 48, background: 'linear-gradient(90deg, rgba(0,0,0,0.03) 25%, rgba(255,255,255,0.02) 50%, rgba(0,0,0,0.03) 75%)', borderRadius: 2, backgroundSize: '200% 100%', animation: 'shimmer 1.6s linear infinite' }} />

      <style jsx global>{`
        @keyframes shimmer { from { background-position: 200% 0 } to { background-position: -200% 0 } }
      `}</style>
      </CardContent>
    </Card>
  );
}
