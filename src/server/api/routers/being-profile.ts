import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const beingProfileRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.beingProfile.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),

  // Legacy: kept for compatibility if needed, but updateProfile is preferred
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

  updateProfile: protectedProcedure
    .input(
      z.object({
        trvFrequency: z.number().optional(),
        trvLabel: z.string().optional(),
        complexityLevel: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Prepare update data
      const data: any = {};
      if (input.trvFrequency !== undefined) {
        data.trvFrequency = input.trvFrequency;
        data.vitalRenewalRate = input.trvFrequency; // Sync
      }
      if (input.trvLabel !== undefined) data.trvLabel = input.trvLabel;
      if (input.complexityLevel !== undefined) data.complexityLevel = input.complexityLevel;

      return ctx.db.beingProfile.upsert({
        where: { userId: ctx.session.user.id },
        update: data,
        create: {
          userId: ctx.session.user.id,
          ...data,
        },
      });
    }),
});
