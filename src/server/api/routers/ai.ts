import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { calculateClarity } from "~/features/ai-coach/logic/calculate-clarity";
import { generateDvpBSynthesis } from "~/features/ai-coach/logic/synthesis/generate-dvp-b";
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
      // 1. Get the latest DVP data AND User Preferences
      const [latestDvp, user] = await Promise.all([
        ctx.db.dvpRecord.findFirst({
          where: { userId: ctx.session.user.id },
          orderBy: { updatedAt: "desc" },
        }),
        ctx.db.user.findUnique({
          where: { id: ctx.session.user.id },
          select: { preferences: true },
        }),
      ]);

      // 2. Calculate Clarity (with Type Safety & Chat Fallback)
      let parsedData = null;
      if (latestDvp?.data) {
        const result = dvpDataSchema.safeParse(latestDvp.data);
        if (result.success) {
          parsedData = result.data;
        } else {
          console.warn("Invalid DVP Data found during Clarity calculation:", result.error);
        }
      }

      // Pass both sources: Wizard Data (parsedData) + Chat Data (user.preferences)
      const clarityResult = calculateClarity(parsedData, user?.preferences);

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

      // 5. Audit Log
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
   * Finalizes the conversational session by synthesizing chat history into structured hypotheses.
   */
  finalizeSession: protectedProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.string(),
        content: z.string().optional(),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const synthesis = await generateDvpBSynthesis(input.messages);

        return await ctx.db.$transaction(async (tx) => {
          const snapshot = await tx.dvpBSnapshot.create({
            data: {
              userId: ctx.session.user.id,
              summary: synthesis.summary,
              finalScore: synthesis.globalClarityScore,
              data: synthesis as any,
            },
          });

          const hypotheses = await Promise.all(
            synthesis.hypotheses.map((h) =>
              tx.hypothesis.create({
                data: {
                  userId: ctx.session.user.id,
                  title: h.title,
                  description: h.description,
                  feasibilityScore: h.feasibilityScore,
                  isPreferred: h.isPreferred,
                  details: h.details as any,
                },
              })
            )
          );

          await tx.auditLog.create({
            data: {
              entityType: "DvpBSnapshot",
              entityId: snapshot.id,
              action: "FINALIZE",
              userId: ctx.session.user.id,
              details: {
                hypothesisCount: hypotheses.length,
                finalScore: synthesis.globalClarityScore,
              },
            },
          });

          return { snapshotId: snapshot.id, hypothesisCount: hypotheses.length };
        });
      } catch (error) {
        console.error("Finalization Error:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Impossible de finaliser le projet. Veuillez réessayer.",
        });
      }
    }),

  getLatestClarity: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.clarityIndex.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      include: { ruleVersion: true },
    });
  }),
});
