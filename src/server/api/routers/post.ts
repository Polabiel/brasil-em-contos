import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { BookTagValues } from '@/lib/bookTags';

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: adminProcedure
    .input(z.object({ name: z.string().min(1), description: z.string().optional(), image: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description ?? null,
          image: input.image ?? null,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  recent: publicProcedure
    .input(
      z
        .object({
          take: z.number().min(1).max(20).optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const take = input?.take ?? 4;
      const posts = await ctx.db.post.findMany({
        where: { featured: { not: true } }, // Exclude featured posts
        orderBy: { createdAt: "desc" },
        take,
        include: { createdBy: true },
      });
      return posts;
    }),

  featured: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 2, // Maximum 2 featured posts
      include: { 
        createdBy: true,
        author: true 
      },
    });
    return posts;
  }),

  updateFeatured: adminProcedure
    .input(z.object({ 
      id: z.number(), 
      featured: z.boolean() 
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.update({
        where: { id: input.id },
        data: { featured: input.featured },
        include: {
          createdBy: true,
          author: true,
        },
      });
    }),

  adminList: adminProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        createdBy: true,
        author: true,
      },
    });
    return posts;
  }),

  // Return tags (enum) with counts from posts — use raw SQL to avoid Prisma client type syncing issues
  tags: publicProcedure.query(async ({ ctx }) => {
    const rows = await ctx.db.$queryRawUnsafe<Array<{ tag: string | null; count: number }>>(
      `SELECT tag, COUNT(*)::int as count FROM "Post" WHERE tag IS NOT NULL GROUP BY tag ORDER BY count DESC;`,
    );

    return rows.map((r) => ({ tag: String(r.tag), count: Number(r.count) }));
  }),

  // return enum values for BookTag so frontend can populate selects
  bookTags: publicProcedure.query(() => {
    return BookTagValues;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
