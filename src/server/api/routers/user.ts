import { z } from "zod";
import crypto from 'crypto';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { env } from "@/env";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .query(({ ctx, input }) => {
      const hashedPassword = crypto
        .createHmac('sha256', env.AUTH_SECRET!
        )
        .update(input.password)
        .digest('hex');

      return ctx.db.user.create({
        data: {
          email: input.email,
          hashedPassword,
        },
      });
    }),

  loginUser: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().base64() })).query(({ ctx, input }) => { /* empty */ })
});
