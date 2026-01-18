import { z } from "zod";
import { createTRPCRouter, adminProcedure, protectedProcedure } from "~/server/api/trpc";

export const adminRouter = createTRPCRouter({
  // Read rules (authenticated users)
  getAllRules: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.businessRule.findMany({
      orderBy: { key: "asc" },
    });
  }),

  // Get rule by key (authenticated users)
  getRule: protectedProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.businessRule.findUnique({
        where: { key: input.key },
      });
    }),

  // Update rule (ADMIN only)
  updateRule: adminProcedure
    .input(z.object({
      id: z.string(),
      value: z.union([
        // Housing Prices Schema
        z.object({
          residence: z.object({ min: z.number(), max: z.number() }),
          coloc: z.object({ min: z.number(), max: z.number() }),
          studio: z.object({ min: z.number(), max: z.number() }),
          homestay: z.object({ min: z.number(), max: z.number() }),
        }),
        // Thresholds Schema
        z.object({
          seuil_survie: z.number(),
          seuil_confort: z.number(),
          min_language_level: z.string(),
        }),
        // City Index Schema
        z.record(z.string(), z.number()),
        // Fallback for new rule types (must be an object)
        z.record(z.string(), z.any()),
      ]),
      description: z.string().optional(),
      version: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.businessRule.update({
        where: { id: input.id },
        data: {
          value: input.value,
          description: input.description,
          version: input.version,
          updatedBy: ctx.session.user.id,
        },
      });
    }),
});
