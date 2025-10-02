import React from 'react';
import { PostsGridSkeleton } from '@/app/_components/loading/LoadingSkeleton';

export default function Loading() {
  return <PostsGridSkeleton count={3} />;
}
