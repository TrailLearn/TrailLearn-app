import { z } from "zod";
import bcrypt from "bcryptjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2).optional(),
    }))
    .mutation(async ({ input }) => {
      const { email, password, name } = input;

      const exists = await db.user.findUnique({
        where: { email },
      });

      if (exists) {
        throw new Error("Cet email est déjà utilisé.");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await db.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name ?? email.split("@")[0],
        },
      });

      return { success: true, userId: user.id };
    }),
});
