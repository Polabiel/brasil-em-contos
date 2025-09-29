import { createTRPCRouter, publicProcedure, adminProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const bookRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const sql = `
      SELECT b.id, b.title, b.year, b."authorId", a.name as "authorName"
      FROM "Book" b
      LEFT JOIN "Author" a ON a.id = b."authorId"
      ORDER BY b.title
    `;
    
    const rawRows = await ctx.db.$queryRawUnsafe(sql);
    
    interface BookRow { 
      id: number; 
      title: string; 
      year: number | null; 
      authorId: number | null;
      authorName: string | null;
    }

    return (rawRows as unknown[]).map((r) => {
      const row = r as BookRow;
      return {
        id: Number(row.id),
        title: String(row.title),
        year: row.year ? Number(row.year) : undefined,
        authorId: row.authorId ? Number(row.authorId) : null,
        authorName: typeof row.authorName === 'string' ? row.authorName : null,
      };
    });
  }),

  get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const sql = `
      SELECT b.id, b.title, b.year, b."authorId", a.name as "authorName"
      FROM "Book" b
      LEFT JOIN "Author" a ON a.id = b."authorId"
      WHERE b.id = $1
    `;
    
    const rawRows = await ctx.db.$queryRawUnsafe(sql, input.id);
    const rows = Array.isArray(rawRows) ? rawRows : [];
    const row = rows.length > 0 ? (rows[0] as Record<string, unknown>) : null;
    
    if (!row) return null;

    return {
      id: Number(row.id),
      title: String(row.title),
      year: row.year ? Number(row.year) : undefined,
      authorId: row.authorId ? Number(row.authorId) : null,
      authorName: typeof row.authorName === 'string' ? row.authorName : null,
    };
  }),

  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(1), 
      year: z.number().optional(), 
      authorId: z.number().optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const sql = `INSERT INTO "Book" (title, year, "authorId") VALUES ($1, $2, $3) RETURNING id, title, year, "authorId"`;
      const rawRows = await ctx.db.$queryRawUnsafe(sql, input.title, input.year ?? null, input.authorId ?? null);
      const rows = Array.isArray(rawRows) ? rawRows : [];
      const row = rows.length > 0 ? (rows[0] as Record<string, unknown>) : undefined;
      
      if (!row) throw new Error('insert failed');

      return {
        id: Number(row.id),
        title: String(row.title),
        year: row.year ? Number(row.year) : undefined,
        authorId: row.authorId ? Number(row.authorId) : null,
      };
    }),

  update: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      title: z.string().min(1), 
      year: z.number().optional(), 
      authorId: z.number().optional() 
    }))
    .mutation(async ({ ctx, input }) => {
      const sql = `UPDATE "Book" SET title = $1, year = $2, "authorId" = $3 WHERE id = $4 RETURNING id, title, year, "authorId"`;
      const rawRows = await ctx.db.$queryRawUnsafe(sql, input.title, input.year ?? null, input.authorId ?? null, input.id);
      const rows = Array.isArray(rawRows) ? rawRows : [];
      const row = rows.length > 0 ? (rows[0] as Record<string, unknown>) : undefined;
      
      if (!row) throw new Error('not found');

      return {
        id: Number(row.id),
        title: String(row.title),
        year: row.year ? Number(row.year) : undefined,
        authorId: row.authorId ? Number(row.authorId) : null,
      };
    }),

  delete: adminProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
    await ctx.db.$executeRawUnsafe(`DELETE FROM "Book" WHERE id = $1`, input.id);
    return { ok: true };
  }),
});