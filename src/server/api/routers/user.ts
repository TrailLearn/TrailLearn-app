import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

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
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          onboardingStatus: "COMPLETED",
          onboardingVersion: input.version,
        },
      });
    }),
});
