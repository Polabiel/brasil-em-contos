import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const authorRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const authors = await ctx.db.author.findMany({
      orderBy: { name: "asc" },
      include: { books: { select: { id: true, title: true, year: true } } },
    });

    return authors.map((a) => ({
      id: Number(a.id),
      name: String(a.name),
      period: a.period ?? undefined,
      slug: a.slug ?? undefined,
      image: a.image ?? undefined,
      imageMime: a.imageMime ?? undefined,
      books: (a.books ?? []).map((b) => ({
        id: Number(b.id),
        title: String(b.title),
        year: b.year ?? undefined,
      })),
    }));
  }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const author = await ctx.db.author.findUnique({
        where: { id: input.id },
        include: { books: { select: { id: true, title: true, year: true } } },
      });
      if (!author) return null;
      return {
        id: Number(author.id),
        name: String(author.name),
        period: author.period ?? undefined,
        bio: author.bio ?? undefined,
        books: (author.books ?? []).map((b) => ({
          id: Number(b.id),
          title: String(b.title),
          year: b.year ?? undefined,
        })),
      };
    }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const author = await ctx.db.author.findUnique({
        where: { slug: input.slug },
        include: { books: { select: { id: true, title: true, year: true } } },
      });
      if (!author) return null;
      return {
        id: Number(author.id),
        name: String(author.name),
        period: author.period ?? undefined,
        bio: author.bio ?? undefined,
        image: author.image ?? undefined,
        imageMime: author.imageMime ?? undefined,
        books: (author.books ?? []).map((b) => ({
          id: Number(b.id),
          title: String(b.title),
          year: b.year ?? undefined,
        })),
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        period: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const created = await ctx.db.author.create({
        data: {
          name: input.name,
          period: input.period ?? null,
          bio: input.bio ?? null,
        },
      });
      return {
        id: Number(created.id),
        name: String(created.name),
        period: created.period ?? undefined,
        bio: created.bio ?? undefined,
      };
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        period: z.string().optional(),
        bio: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updated = await ctx.db.author.update({
        where: { id: input.id },
        data: {
          name: input.name,
          period: input.period ?? null,
          bio: input.bio ?? null,
        },
      });
      return {
        id: Number(updated.id),
        name: String(updated.name),
        period: updated.period ?? undefined,
        bio: updated.bio ?? undefined,
      };
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.book.deleteMany({ where: { authorId: input.id } });
      await ctx.db.author.delete({ where: { id: input.id } });
      return { ok: true };
    }),
});
