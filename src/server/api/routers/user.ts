import { z } from "zod";
import { hash } from "bcryptjs";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(8).max(32),
      }),
    )
    .mutation(async ({ ctx, input }) => {

      const {name,email,password} = input
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const hashedPassword = await hash(password, 10) ; 


      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword
        },
      });
    }),

});
