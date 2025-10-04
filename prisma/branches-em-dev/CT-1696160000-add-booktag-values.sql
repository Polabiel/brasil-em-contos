-- Migration para adicionar novos valores ao enum BookTag (branch em dev)
-- Criado automaticamente pelo script assistente
-- Adiciona: AUTOBIOGRAFIA, ROMANTISMO, INFANTIL, COMPORTAMENTO, FICCAO_NARRATIVA, NARRATIVA

DO $$
BEGIN
    -- Apenas tenta adicionar cada valor; se já existir, ignora o erro
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'AUTOBIOGRAFIA';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'ROMANTISMO';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'INFANTIL';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'COMPORTAMENTO';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'FICCAO_NARRATIVA';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
    BEGIN
        ALTER TYPE "BookTag" ADD VALUE 'NARRATIVA';
    EXCEPTION WHEN duplicate_object THEN NULL; END;
END$$;

-- Observação: Para ambientes que não permitem DO blocks, executar os ALTER TYPEs individualmente.
