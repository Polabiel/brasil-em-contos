import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
  adminProcedure,
} from "@/server/api/trpc";

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
        orderBy: { createdAt: "desc" },
        take,
        include: { createdBy: true },
      });
      return posts;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
