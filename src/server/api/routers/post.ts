import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";
import { BookTag } from "@prisma/client";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        authorId: z.number().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          name: input.name,
          description: input.description ?? null,
          image: input.image ?? null,
          ...(input.authorId ? { authorId: input.authorId } : {}),
          ...(input.tags && input.tags.length > 0 ? { tags: input.tags as BookTag[] } : {}),
          createdById: ctx.session.user.id,
        },
        include: { createdBy: true, author: true },
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
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const take = input?.take ?? 4;
      const posts = await ctx.db.post.findMany({
        where: { featured: { not: true } },
        orderBy: { createdAt: "desc" },
        take,
        include: { createdBy: true, author: true },
      });
      return posts;
    }),

  featured: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: 2,
      include: {
        createdBy: true,
        author: true,
      },
    });
    return posts;
  }),

  byTag: publicProcedure
    .input(
      z.object({ tag: z.string(), take: z.number().min(1).max(50).optional() }),
    )
    .query(async ({ ctx, input }) => {
      const take = input.take ?? 12;
      const posts = await ctx.db.post.findMany({
        where: { tags: { has: input.tag as BookTag } },
        orderBy: { createdAt: "desc" },
        take,
        include: { createdBy: true, author: true },
      });
      return posts;
    }),

  updateFeatured: adminProcedure
    .input(
      z.object({
        id: z.number(),
        featured: z.boolean(),
      }),
    )
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

  update: adminProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1).optional(),
        content: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
        authorId: z.number().nullable().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const data: {
        name?: string;
        content?: string;
        description?: string | null;
        image?: string | null;
        tags?: BookTag[];
        authorId?: number | null;
      } = {};

      if (typeof input.name === "string") data.name = input.name;
      if (typeof input.content === "string") data.content = input.content;
      if (typeof input.description === "string")
        data.description = input.description ?? null;
      if (typeof input.image === "string") data.image = input.image ?? null;
      if (input.tags !== undefined) {
        data.tags = input.tags as BookTag[];
      }
      if (input.authorId !== undefined) {
        data.authorId = input.authorId;
      }

      return ctx.db.post.update({
        where: { id: input.id },
        data,
        include: { createdBy: true, author: true },
      });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.post.delete({ where: { id: input.id } });
      return { ok: true };
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

  tags: publicProcedure.query(async ({ ctx }) => {
    // Com tags[], não podemos usar groupBy diretamente
    // Vamos buscar todos os posts e contar tags manualmente
    const posts = await ctx.db.post.findMany({
      select: { tags: true },
      where: { tags: { isEmpty: false } },
    });

    const tagCount = new Map<string, number>();
    posts.forEach((post) => {
      const postTags = post.tags as string[];
      postTags.forEach((tag: string) => {
        tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1);
      });
    });

    const sorted = Array.from(tagCount.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    
    return sorted;
  }),

  bookTags: publicProcedure.query(() => {
    // BookTag is emitted by Prisma client as an object mapping keys to values
    // Object.values(BookTag) will return the enum string values
    return Object.values(BookTag) as string[];
  }),

  byAuthor: publicProcedure
    .input(z.object({ authorId: z.number() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.db.post.findMany({
        where: { authorId: input.authorId },
        orderBy: { createdAt: "desc" },
        include: { createdBy: true, author: true },
      });
      return posts;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
