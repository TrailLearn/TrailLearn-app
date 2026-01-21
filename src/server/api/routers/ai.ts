import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { calculateClarity } from "~/features/ai-coach/logic/calculate-clarity";
import { dvpDataSchema } from "~/features/dvp/types";
import { TRPCError } from "@trpc/server";

export const aiRouter = createTRPCRouter({
  /**
   * Updates the Clarity Index for the current user.
   * Triggered after significant chat interactions or DVP updates.
   */
  updateClarityIndex: protectedProcedure
    .input(z.object({
      source: z.enum(["USER_INPUT", "RULE_UPDATE"]),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. Get the latest DVP data for the user
      const latestDvp = await ctx.db.dvpRecord.findFirst({
        where: { userId: ctx.session.user.id },
        orderBy: { updatedAt: "desc" },
      });

      // 2. Calculate Clarity (with Type Safety)
      let parsedData = null;
      if (latestDvp?.data) {
        // Safe parsing to ensure runtime type integrity
        const result = dvpDataSchema.safeParse(latestDvp.data);
        if (result.success) {
          parsedData = result.data;
        } else {
          console.warn("Invalid DVP Data found during Clarity calculation:", result.error);
        }
      }

      const clarityResult = calculateClarity(parsedData);

      // 3. Ensure RuleVersion exists (V1)
      const ruleVersion = await ctx.db.ruleVersion.upsert({
        where: { version: clarityResult.rulesVersion },
        update: {},
        create: {
          version: clarityResult.rulesVersion,
          description: "Initial Clarity Index Heuristic (Completion + Presence)",
          isActive: true,
        },
      });

      // 4. Store the new index
      const newIndex = await ctx.db.clarityIndex.create({
        data: {
          userId: ctx.session.user.id,
          score: clarityResult.score,
          details: clarityResult.details as any,
          ruleVersionId: ruleVersion.id,
          source: input.source,
        },
      });

      // 5. Audit Log (Task 4)
      await ctx.db.auditLog.create({
        data: {
          entityType: "ClarityIndex",
          entityId: newIndex.id,
          action: "CREATE",
          userId: ctx.session.user.id,
          details: {
            score: clarityResult.score,
            source: input.source,
            ruleVersion: ruleVersion.version,
          },
        },
      });

      return newIndex;
    }),

  /**
   * Retrieves the latest Clarity Index for the dashboard.
   */
  getLatestClarity: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.clarityIndex.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: { ruleVersion: true },
    });
  }),
});
