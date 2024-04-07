/* eslint-disable @typescript-eslint/no-unsafe-return */
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({

  addCategory: publicProcedure
    .input(z.object({ data: z.array(z.object({name:z.string().min(1)}) ) }))
    .mutation(async ({ ctx, input }) => {
    
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      return ctx.db.category.createMany({
        data: input.data,
      });
    }),

  getCategories: publicProcedure
  .input(z.object({ skip: z.number(),take:z.number() }))
  .query(({ ctx,input }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.category.findMany({
      skip:input.skip,
      take:input.take,
      // orderBy: { createdAt: "asc" },
    });
  }),

  getTotalCount: publicProcedure
  .query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    return ctx.db.category.count();
  }),
});
