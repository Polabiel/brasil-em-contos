import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const authorRouter = createTRPCRouter({
 list: publicProcedure.query(async ({ ctx }) => {
  // Use raw SQL to aggregate books per author — keeps typings stable until prisma client is regenerated
  const sql = `
      SELECT a.id, a.name, a.period,
        COALESCE(json_agg(json_build_object('id', b.id, 'title', b.title, 'year', b.year)) FILTER (WHERE b.id IS NOT NULL), '[]') as books
      FROM "Author" a
      LEFT JOIN "Book" b ON b."authorId" = a.id
      GROUP BY a.id
      ORDER BY a.name
    `;

  const rawRows = await ctx.db.$queryRawUnsafe(sql);

  interface BookRow { id: number; title: string; year?: number }
  interface AuthorRow { id: number; name: string; period: string | null; books: string | BookRow[] }

  return (rawRows as unknown[]).map((r) => {
   const row = r as AuthorRow;
   let books: BookRow[] = [];

   if (typeof row.books === 'string') {
    try {
     const parsed = JSON.parse(row.books) as unknown;
     if (Array.isArray(parsed)) {
      const safeToString = (v: unknown) => (v == null ? '' : (typeof v === 'string' ? v : JSON.stringify(v)));
      books = parsed.map((b) => {
       const rec = b as Record<string, unknown>;
       const idVal = rec.id;
       const titleVal = rec.title;
       const yearVal = rec.year;
       const id = typeof idVal === 'number' ? idVal : idVal != null ? Number(idVal) : 0;
       const title = safeToString(titleVal);
       const year = typeof yearVal === 'number' ? yearVal : yearVal != null ? Number(yearVal) : undefined;
       return { id: id, title: title, year };
      });
     }
    } catch {
     books = [];
    }
   } else if (Array.isArray(row.books)) {
    const maybeBooks = row.books as unknown[];
    const safeToString2 = (v: unknown) => (v == null ? '' : (typeof v === 'string' ? v : JSON.stringify(v)));
    books = maybeBooks.map((b) => {
     const rec = b as Record<string, unknown>;
     const idVal = rec.id;
     const titleVal = rec.title;
     const yearVal = rec.year;
     const id = typeof idVal === 'number' ? idVal : idVal != null ? Number(idVal) : 0;
     const title = safeToString2(titleVal);
     const year = typeof yearVal === 'number' ? yearVal : yearVal != null ? Number(yearVal) : undefined;
     return { id: id, title: title, year };
    });
   }

   return {
    id: Number(row.id),
    name: String(row.name),
    period: row.period ?? undefined,
    books: books.map((b) => ({ id: Number(b.id), title: String(b.title), year: b.year ?? undefined })),
   };
  });
 }),
 get: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
  const row = await ctx.db.$queryRawUnsafe(
   `SELECT a.id, a.name, a.period, a.bio, COALESCE(json_agg(json_build_object('id', b.id, 'title', b.title, 'year', b.year)) FILTER (WHERE b.id IS NOT NULL), '[]') as books FROM "Author" a LEFT JOIN "Book" b ON b."authorId" = a.id WHERE a.id = $1 GROUP BY a.id`,
   input.id,
  );
  const maybeRaw = (row as unknown[])[0] as Record<string, unknown> | undefined;
  if (!maybeRaw) return null;
  const id = typeof maybeRaw.id === 'number' ? maybeRaw.id : maybeRaw.id != null ? Number(maybeRaw.id) : 0;
  const name = (typeof maybeRaw.name === 'string' || typeof maybeRaw.name === 'number') ? String(maybeRaw.name) : '';
  const period = (typeof maybeRaw.period === 'string' || typeof maybeRaw.period === 'number') ? String(maybeRaw.period) : undefined;
  const bio = (typeof maybeRaw.bio === 'string' || typeof maybeRaw.bio === 'number') ? String(maybeRaw.bio) : undefined;
  let booksParsed: Array<{ id: number; title: string; year?: number }> = [];
  try {
   const rawBooks = maybeRaw.books;
   const booksCandidate: unknown = typeof rawBooks === 'string' ? JSON.parse(String(rawBooks)) : (Array.isArray(rawBooks) ? rawBooks : []);
   if (Array.isArray(booksCandidate)) {
    booksParsed = booksCandidate.map((b) => {
     const rec = b as Record<string, unknown>;
     const bid = typeof rec.id === 'number' ? rec.id : rec.id != null ? Number(rec.id) : 0;
     const title = (typeof rec.title === 'string' || typeof rec.title === 'number') ? String(rec.title) : '';
     const year = rec.year == null ? undefined : (typeof rec.year === 'number' ? rec.year : Number(rec.year));
     return { id: bid, title, year };
    });
   }
  } catch {
   booksParsed = [];
  }

  return { id: Number(id), name: String(name), period, bio, books: booksParsed };
 }),

 create: publicProcedure.input(z.object({ name: z.string().min(1), period: z.string().optional(), bio: z.string().optional() })).mutation(async ({ ctx, input }) => {
  // Use raw SQL insert and return created id to avoid referencing prisma model methods until client is regenerated
  const sql = `INSERT INTO "Author" (name, period, bio) VALUES ($1, $2, $3) RETURNING id, name, period, bio`;
  const rowsRaw = await ctx.db.$queryRawUnsafe(sql, input.name, input.period ?? null, input.bio ?? null);
  const rows = Array.isArray(rowsRaw) ? rowsRaw : [];
  const r = rows.length > 0 ? (rows[0] as Record<string, unknown>) : undefined;
  if (!r) throw new Error('insert failed');
  const rid = typeof r.id === 'number' ? r.id : r.id != null ? Number(r.id) : 0;
  const rname = typeof r.name === 'string' || typeof r.name === 'number' ? String(r.name) : '';
  const rperiod = typeof r.period === 'string' || typeof r.period === 'number' ? String(r.period) : undefined;
  const rbio = typeof r.bio === 'string' || typeof r.bio === 'number' ? String(r.bio) : undefined;
  return { id: Number(rid), name: String(rname), period: rperiod, bio: rbio };
 }),

 update: publicProcedure.input(z.object({ id: z.number(), name: z.string().min(1), period: z.string().optional(), bio: z.string().optional() })).mutation(async ({ ctx, input }) => {
  const sql = `UPDATE "Author" SET name = $1, period = $2, bio = $3 WHERE id = $4 RETURNING id, name, period, bio`;
  const rowsRaw = await ctx.db.$queryRawUnsafe(sql, input.name, input.period ?? null, input.bio ?? null, input.id);
  const rows = Array.isArray(rowsRaw) ? rowsRaw : [];
  const r = rows.length > 0 ? (rows[0] as Record<string, unknown>) : undefined;
  if (!r) throw new Error('not found');
  const rid2 = typeof r.id === 'number' ? r.id : r.id != null ? Number(r.id) : 0;
  const rname2 = typeof r.name === 'string' || typeof r.name === 'number' ? String(r.name) : '';
  const rperiod2 = typeof r.period === 'string' || typeof r.period === 'number' ? String(r.period) : undefined;
  const rbio2 = typeof r.bio === 'string' || typeof r.bio === 'number' ? String(r.bio) : undefined;
  return { id: Number(rid2), name: String(rname2), period: rperiod2, bio: rbio2 };
 }),

 delete: publicProcedure.input(z.object({ id: z.number() })).mutation(async ({ ctx, input }) => {
  // delete books by author then author
  await ctx.db.$executeRawUnsafe(`DELETE FROM "Book" WHERE "authorId" = $1`, input.id);
  await ctx.db.$executeRawUnsafe(`DELETE FROM "Author" WHERE id = $1`, input.id);
  return { ok: true };
 }),
});
