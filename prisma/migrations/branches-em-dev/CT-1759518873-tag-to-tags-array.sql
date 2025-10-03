-- Migration: Change from single tag to tags array
-- Branch: main
-- Date: 2025-10-03
-- Description: This migration documents the change from tag (BookTag?) to tags (BookTag[])
--              and adds MODERNISMO and CONTEMPORANEO to the BookTag enum.
--
-- WARNING: This migration was partially executed directly in production.
--          The enum values (MODERNISMO, CONTEMPORANEO) were already added.
--          The column 'tag' was already dropped and 'tags' was already created.
--          Data from the original 'tag' column was LOST during this process.
--
-- Status: ALREADY APPLIED (manually in production)
-- 
-- Original intended migration steps:
-- 1. Add MODERNISMO to BookTag enum (DONE)
-- 2. Add CONTEMPORANEO to BookTag enum (DONE)
-- 3. Add tags column as array (DONE)
-- 4. Migrate data from tag to tags (FAILED - data lost)
-- 5. Drop tag column (DONE)
--
-- The following SQL represents what SHOULD have been executed:

-- Step 1 & 2: Add new enum values (already done)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'MODERNISMO' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'BookTag')
  ) THEN
    ALTER TYPE "BookTag" ADD VALUE 'MODERNISMO';
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum 
    WHERE enumlabel = 'CONTEMPORANEO' 
    AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'BookTag')
  ) THEN
    ALTER TYPE "BookTag" ADD VALUE 'CONTEMPORANEO';
  END IF;
END$$;

-- Step 3: Add tags column (already done)
-- ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "tags" "BookTag"[] DEFAULT '{}';

-- Step 4: Migrate data (FAILED - this should have been executed)
-- UPDATE "Post" SET "tags" = ARRAY["tag"] WHERE "tag" IS NOT NULL;

-- Step 5: Drop old column (already done)
-- ALTER TABLE "Post" DROP COLUMN IF EXISTS "tag";

-- Current state:
-- - Column "tags" exists as BookTag[] with default '{}'
-- - All posts have tags = '{}' (empty array)
-- - Original tag data was lost

-- Post-migration cleanup needed:
-- Users will need to manually re-tag their posts through the admin interface
