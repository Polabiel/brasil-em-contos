-- Migration: Convert single tag to tags array
-- Generated: 2025-10-03
-- This migration converts the Post.tag column (single BookTag) to Post.tags (array of BookTag)

-- Step 1: Add new tags column as array
ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "tags" "BookTag"[] DEFAULT '{}';

-- Step 2: Migrate existing data from tag to tags
UPDATE "Post" SET "tags" = ARRAY["tag"]::("BookTag"[]) WHERE "tag" IS NOT NULL;

-- Step 3: Drop old tag column
ALTER TABLE "Post" DROP COLUMN IF EXISTS "tag";
