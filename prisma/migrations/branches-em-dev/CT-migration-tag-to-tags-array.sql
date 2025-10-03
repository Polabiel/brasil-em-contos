-- Migration: Tag singular para Tags array (EXECUTADO MANUALMENTE EM PRODUÇÃO)
-- Branch: main
-- Data: 2025-10-03
-- Status: APLICADO EM PRODUÇÃO
--
-- IMPORTANTE: Esta migração JÁ FOI APLICADA MANUALMENTE no banco Neon em produção.
-- Os dados da coluna "tag" foram PERDIDOS durante a aplicação manual.
-- Este arquivo serve apenas para documentação histórica.
--
-- O que foi feito manualmente:
-- 1. Adicionados novos valores ao enum BookTag: MODERNISMO, CONTEMPORANEO
-- 2. Criada coluna "tags" como array de BookTag
-- 3. Tentativa de migração de dados falhou (syntax error)
-- 4. Coluna "tag" foi removida (dados perdidos)
--
-- Estado atual:
-- - Coluna "tags" existe como BookTag[] com default []
-- - Todos os 5 posts em produção têm tags = {} (vazio)
-- - Schema Prisma atualizado para refletir tags[]
-- - Código atualizado para trabalhar com arrays

-- Adicionar MODERNISMO ao enum BookTag (se não existir)
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

-- Adicionar CONTEMPORANEO ao enum BookTag (se não existir)
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

-- NOTA: As queries abaixo NÃO DEVEM SER EXECUTADAS novamente.
-- Elas estão aqui apenas para documentar o que DEVERIA ter sido feito:

-- CORRETO (mas não executado):
-- ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "tags" "BookTag"[] DEFAULT '{}';
-- UPDATE "Post" SET "tags" = ARRAY["tag"] WHERE "tag" IS NOT NULL;
-- ALTER TABLE "Post" DROP COLUMN IF EXISTS "tag";

-- O que realmente aconteceu em produção:
-- 1. Coluna "tags" foi criada
-- 2. UPDATE falhou devido a syntax error
-- 3. Coluna "tag" foi removida (dados perdidos)
