import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  getAllRules: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return ctx.db.businessRule.findMany({
      orderBy: { category: "asc" },
    });
  }),

  updateRule: protectedProcedure
    .input(z.object({
      id: z.string(),
      value: z.any(), // Value can be number or JSON
      reason: z.string().min(3, "Justification requise").max(500, "Justification trop longue"),
    }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== "ADMIN") {
        throw new TRPCError({ code: "FORBIDDEN" });
      }

      const rule = await ctx.db.businessRule.findUnique({
        where: { id: input.id },
      });

      if (!rule) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const oldValue = rule.value;

      // Update Rule
      const updatedRule = await ctx.db.businessRule.update({
        where: { id: input.id },
        data: {
          value: input.value,
          updatedBy: ctx.session.user.id,
          // Increment version logic could be added here (e.g. semantic or simple integer)
          // keeping simple for now
        },
      });

      // Audit Log
      await ctx.db.auditLog.create({
        data: {
          userId: ctx.session.user.id,
          entityType: "BusinessRule",
          entityId: rule.id,
          action: "UPDATE",
          details: {
            reason: input.reason,
            oldValue,
            newValue: input.value,
            key: rule.key
          },
        },
      });

      return updatedRule;
    }),
});