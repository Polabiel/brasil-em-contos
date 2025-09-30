"use client";

import Grid from "@mui/joy/Grid";
import PostCardSkeleton from "./PostCardSkeleton";

export default function GridSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 6 }).map((_, i) => (
        <Grid xs={12} sm={6} md={i === 0 ? 8 : 4} key={`sk-${i}`}>
          <PostCardSkeleton isLarge={i === 0} />
        </Grid>
      ))}
    </Grid>
  );
}
