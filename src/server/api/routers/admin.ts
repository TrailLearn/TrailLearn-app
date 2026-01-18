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
      value: z.any(),
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
