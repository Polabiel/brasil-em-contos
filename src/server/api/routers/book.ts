import {
  createTRPCRouter,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import type { Prisma } from "@prisma/client";
import { z } from "zod";

export const bookRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    const books = await ctx.db.book.findMany({
      orderBy: { title: "asc" },
      include: { author: { select: { id: true, name: true } } },
    });

    return books.map((b) => ({
      id: Number(b.id),
      title: String(b.title),
      year: b.year ?? undefined,
      authorId: b.authorId ?? null,
      authorName: b.author ? String(b.author.name) : null,
    }));
  }),

  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const book = await ctx.db.book.findUnique({
        where: { id: input.id },
        include: { author: { select: { name: true } } },
      });
      if (!book) return null;
      return {
        id: Number(book.id),
        title: String(book.title),
        year: book.year ?? undefined,
        authorId: book.authorId ?? null,
        authorName: book.author ? String(book.author.name) : null,
      };
    }),

  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        year: z.number().optional(),
        authorId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createData: Prisma.BookUncheckedCreateInput = {
        title: input.title,
        authorId: input.authorId,
      };

      if (typeof input.year === "number") createData.year = input.year;

      const created = await ctx.db.book.create({ data: createData });

      return {
        id: Number(created.id),
        title: String(created.title),
        year: created.year ?? undefined,
        authorId: created.authorId ?? null,
      };
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().min(1),
        year: z.number().optional(),
        authorId: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateData: Prisma.BookUncheckedUpdateInput = {
        title: input.title,
      };
      if (typeof input.year === "number") updateData.year = input.year;
      else if (input.year === null)
        updateData.year = null as unknown as number | null;

      if (typeof input.authorId === "number")
        updateData.authorId = input.authorId;

      const updated = await ctx.db.book.update({
        where: { id: input.id },
        data: updateData,
      });

      return {
        id: Number(updated.id),
        title: String(updated.title),
        year: updated.year ?? undefined,
        authorId: updated.authorId ?? null,
      };
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.book.delete({ where: { id: input.id } });
      return { ok: true };
    }),
});
