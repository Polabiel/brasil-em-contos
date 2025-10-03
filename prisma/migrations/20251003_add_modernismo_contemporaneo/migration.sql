-- Migration: Add MODERNISMO and CONTEMPORANEO to BookTag enum
-- Generated: 2025-10-03
-- This migration adds two new values to the BookTag enum

-- Add MODERNISMO if it doesn't exist
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

-- Add CONTEMPORANEO if it doesn't exist
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
