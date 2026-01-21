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

  getRuleVersions: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.session.user.role !== "ADMIN") {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    return ctx.db.ruleVersion.findMany({
      orderBy: { createdAt: "desc" },
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

      // --- VERSIONING LOGIC ---
      
      return await ctx.db.$transaction(async (tx) => {
        // 1. Update the Rule itself
        const updatedRule = await tx.businessRule.update({
          where: { id: input.id },
          data: {
            value: input.value,
            updatedBy: ctx.session.user.id,
          },
        });

        // 2. Determine next Version Number
        const lastVersion = await tx.ruleVersion.findFirst({
          orderBy: { createdAt: "desc" },
        });

        let nextVersion = "1.0.0";
        if (lastVersion) {
          const parts = lastVersion.version.split('.');
          if (parts.length === 3 && parts.every(p => !isNaN(Number(p)))) {
            const numbers = parts.map(Number);
            numbers[2]! += 1; // Increment patch version
            nextVersion = numbers.join('.');
          } else {
            // Fallback for non-standard versions: append timestamp
            nextVersion = `v-${Date.now()}`;
          }
        }

        // 3. Create new RuleVersion
        const newRuleVersion = await tx.ruleVersion.create({
          data: {
            version: nextVersion,
            description: `Auto-generated after update of rule: ${rule.key}. Reason: ${input.reason}`,
            isActive: true,
          },
        });

        // 4. Mark all other versions as inactive
        await tx.ruleVersion.updateMany({
          where: { id: { not: newRuleVersion.id } },
          data: { isActive: false },
        });

        // 5. Audit Log
        await tx.auditLog.create({
          data: {
            userId: ctx.session.user.id,
            entityType: "BusinessRule",
            entityId: rule.id,
            action: "UPDATE",
            details: {
              reason: input.reason,
              oldValue,
              newValue: input.value,
              key: rule.key,
              newRuleVersion: nextVersion,
            },
          },
        });

        return updatedRule;
      });
    }),
});