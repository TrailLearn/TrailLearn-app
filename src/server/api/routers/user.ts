import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  getOnboardingStatus: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
      select: { onboardingStatus: true, onboardingVersion: true },
    });
    return user;
  }),

  completeOnboarding: protectedProcedure
    .input(z.object({ version: z.number() }))
    .mutation(async ({ ctx, input }) => {
      console.log(`[completeOnboarding] Attempting to update user ${ctx.session.user.id}`);
      
      const userExists = await ctx.db.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!userExists) {
        console.error(`[completeOnboarding] User ${ctx.session.user.id} not found in DB! Session might be stale.`);
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Utilisateur introuvable. Veuillez vous reconnecter.",
        });
      }

      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          onboardingStatus: "COMPLETED",
          onboardingVersion: input.version,
        },
      });
    }),
});
