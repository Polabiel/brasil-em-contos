import { z } from 'zod';

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc';

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({ where: { id: ctx.session.user.id }, select: { id: true, name: true, email: true, image: true, bio: true } });
    return user ?? null;
  }),

  update: protectedProcedure
    .input(z.object({ name: z.string().min(0).optional(), image: z.string().nullable().optional(), bio: z.string().nullable().optional() }))
    .mutation(async ({ ctx, input }) => {
      const updates: { name?: string | null; image?: string | null; bio?: string | null } = {};
      if (typeof input.name === 'string') updates.name = input.name.trim().length > 0 ? input.name.trim() : null;
      if (typeof input.image === 'string') updates.image = input.image.trim().length > 0 ? input.image.trim() : null;
      if (typeof input.bio === 'string') updates.bio = input.bio.trim().length > 0 ? input.bio.trim() : null;
      const updated = await ctx.db.user.update({ where: { id: ctx.session.user.id }, data: updates, select: { id: true, name: true, email: true, image: true, bio: true } });
      return updated;
    }),
});
