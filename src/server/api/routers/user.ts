/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { compare, hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const secret_key = env.NEXT_PUBLIC_JWT_TOKEN;

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const user = await ctx.db.user.findUnique({
        where: { email },
        include: { categories: true },
      });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const validPassword = await compare(password, user.password);

      if (!validPassword) {
        throw new Error("Invalid email or password");
      }
      const {password:pwd, ...userWithoutPassword} = user

      const token = jwt.sign(input, secret_key, { expiresIn: "4h" });

      return { message: "logged in successfuly", token: token, user:userWithoutPassword };
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
      const { name, email, password } = input;
      // let token;
      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      if (user) {
        throw new Error("User already exist");
      }
     
      const hashedPassword = await hash(password, 10);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const token = jwt.sign(input, secret_key, { expiresIn: "4h" });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      const result = await ctx.db.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });


      const {password:pwd, ...userWithoutPassword} = result

      return { message: "user created", token: token, user:userWithoutPassword };
    }),

  addCategories: publicProcedure
    .input(z.object({ categoryId: z.number(), userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { categoryId, userId } = input;

         await ctx.db.user.update({
          where: { id: userId },
          data: {
            categories: {
              connect: {
                id: categoryId,
              },
            },
          },
        });

        return { message: "Category added successfully!" };
      } catch (error) {
        console.error("Error adding category to user:", error);
        throw new Error("Failed to add category to user");
      }
      // user.
    }),

    removeCategories: publicProcedure
    .input(z.object({ categoryId: z.number(), userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { categoryId, userId } = input;

        await ctx.db.user.update({
          where: { id: userId },
          data: {
            categories: {
              disconnect: {
                id: categoryId,
              },
            },
          },
        });
        return { message: "Category removed successfully!" };
      } catch (error) {
        console.error("Error removing category to user:", error);
        throw new Error("Failed to remove category to user");
      }
      // user.
    }),
});
