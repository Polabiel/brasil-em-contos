-- Migration: add_image_blob
-- Generated: 2025-09-28

-- Add imageBlob and imageMime if missing
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Post' AND column_name='imageBlob') THEN
    ALTER TABLE "public"."Post" ADD COLUMN "imageBlob" BYTEA;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='Post' AND column_name='imageMime') THEN
    ALTER TABLE "public"."Post" ADD COLUMN "imageMime" TEXT;
  END IF;
END$$;
