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
      // ... existing code ...
    }),

  /**
   * Finalizes the conversational session by synthesizing chat history into structured hypotheses.
   */
  finalizeSession: protectedProcedure
    .input(z.object({
      messages: z.array(z.object({
        role: z.string(),
        content: z.string().optional(), // Content might be empty or missing in some edge cases
        // Add other fields if necessary, but role/content are core
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        // 1. Generate Synthesis via LLM
        const synthesis = await generateDvpBSynthesis(input.messages);

        // 2. Wrap in transaction for atomic storage
        return await ctx.db.$transaction(async (tx) => {
          // A. Store Snapshot
          const snapshot = await tx.dvpBSnapshot.create({
            data: {
              userId: ctx.session.user.id,
              summary: synthesis.summary,
              finalScore: synthesis.globalClarityScore,
              data: synthesis as any,
            },
          });

          // B. Create Hypotheses
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

          // C. Audit Log
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
