-- Migration: add_description_image
-- Generated: 2025-09-28

-- Add description column if missing
ALTER TABLE "public"."Post" ADD COLUMN IF NOT EXISTS "description" TEXT;

-- Add image column if missing
ALTER TABLE "public"."Post" ADD COLUMN IF NOT EXISTS "image" TEXT;
