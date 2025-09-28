-- Migration for branch: add description to Post
-- Created at: 2025-09-27T00:00:00Z

ALTER TABLE "Post"
ADD COLUMN IF NOT EXISTS "description" TEXT;
