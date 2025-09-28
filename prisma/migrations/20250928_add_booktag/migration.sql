-- Migration: add BookTag enum type and tag column to Post
-- Generated: 2025-09-28

DO $$
BEGIN
  -- create enum type if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'BookTag') THEN
    CREATE TYPE "BookTag" AS ENUM (
      'TROVADORISMO', 'CLASSICISMO', 'BARROCO', 'ARCADISMO', 'ROMANTISMO', 'REALISMO', 'NATURALISMO', 'PARNASIANISMO', 'SIMBOLISMO', 'PRE_MODERNISMO', 'MODERNISMO', 'POS_MODERNISMO', 'CONTEMPORANEO', 'FICCAO_CIENTIFICA', 'FANTASIA', 'HORROR', 'THRILLER', 'POLICIAL', 'DRAMA', 'COMEDIA', 'POESIA', 'CRONICA', 'LITERATURA_INFANTOJUVENIL', 'REGIONAL', 'LITERATURA_FEMININA', 'BIOGRAFIA', 'MEMORIAS', 'AUTO_AJUDA', 'OUTROS'
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  -- if something goes wrong, raise to inspect
  RAISE NOTICE 'BookTag type exists or creation failed';
END$$;

-- add column 'tag' to table 'Post' if missing
ALTER TABLE IF EXISTS "Post" ADD COLUMN IF NOT EXISTS "tag" "BookTag" NULL;
