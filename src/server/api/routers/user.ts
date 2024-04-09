import { z } from "zod";
import { compare, hash } from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env";
const secret_key = env.NEXT_PUBLIC_JWT_TOKEN;

export const userRouter = createTRPCRouter({
  loginUser: publicProcedure
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pwd, ...userWithoutPassword } = user;

      const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: "4h" });

      return {
        message: "logged in successfuly",
        token: token,
        user: userWithoutPassword,
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
      const { name, email, password } = input;
      // let token;
      const user = await ctx.db.user.findUnique({
        where: { email },
      });

      if (user) {
        throw new Error("User already exist");
      }

      const hashedPassword = await hash(password, 10);

      const result = await ctx.db.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
        },
      });
      const token = jwt.sign({ id: result.id }, secret_key, {
        expiresIn: "4h",
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: pwd, ...userWithoutPassword } = result;

      return {
        message: "user created",
        token: token,
        user: userWithoutPassword,
      };
    }),

  getUser: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      try {
        const { token } = input;
        interface tokenType extends JwtPayload {
          id: string;
        }

        const decodedId: tokenType = jwt.verify(token, secret_key) as tokenType;

        console.log("🚀 ~ .mutation ~ decodedId:", decodedId);
        // ctx.opts.req.h
        const result = await ctx.db.user.findUnique({
          where: {
            id: parseInt(decodedId.id),
          },
          include: { categories: true },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...user } = result!;

        return { message: "user fetched", data: user };
      } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Failed to fectch user ");
      }
    }),

  addCategories: publicProcedure
    .input(z.object({ categoryId: z.number(), userId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { categoryId, userId } = input;

        const user = await ctx.db.user.update({
          where: { id: userId },
          data: {
            categories: {
              connect: {
                id: categoryId,
              },
            },
          },
        });

        return { message: "Category added successfully!", data: user };
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

        const user = await ctx.db.user.update({
          where: { id: userId },
          data: {
            categories: {
              disconnect: {
                id: categoryId,
              },
            },
          },
        });
        return { message: "Category removed successfully!", data: user };
      } catch (error) {
        console.error("Error removing category to user:", error);
        throw new Error("Failed to remove category to user");
      }
      // user.
    }),
});
