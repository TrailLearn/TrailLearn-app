import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const beingProfileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.beingProfile.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),

  updateTrv: protectedProcedure
    .input(
      z.object({
        trvFrequency: z.number(),
        trvLabel: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.beingProfile.upsert({
        where: { userId: ctx.session.user.id },
        update: {
          trvFrequency: input.trvFrequency,
          trvLabel: input.trvLabel,
          vitalRenewalRate: input.trvFrequency, // Sync for legacy
        },
        create: {
          userId: ctx.session.user.id,
          trvFrequency: input.trvFrequency,
          trvLabel: input.trvLabel,
          vitalRenewalRate: input.trvFrequency,
        },
      });
    }),
});
