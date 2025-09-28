-- Migration for branch: add image to Post
-- Created at: 2025-09-27T00:10:00Z

ALTER TABLE "Post"
ADD COLUMN IF NOT EXISTS "image" TEXT;
