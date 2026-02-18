import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OpportunityInputsSchema } from "~/features/ai-engine/types";
import { OpportunityService } from "~/features/ai-engine/services/opportunities.service";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const aiOpportunitiesRouter = createTRPCRouter({
  /**
   * Generates concrete opportunities based on target orientation and constraints.
   */
  generate: protectedProcedure
    .input(OpportunityInputsSchema.extend({
      orientationId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      try {
        const { orientationId, ...serviceInputs } = input;
        
        const result = await OpportunityService.generateOpportunities(serviceInputs);

        return await ctx.db.aiOpportunity.create({
          data: {
            userId: ctx.session.user.id,
            orientationId: orientationId,
            inputs: serviceInputs as any,
            output: result as any,
          },
        });
      } catch (error) {
        // Log detailed error for server-side monitoring
        console.error(`[OpportunitiesRouter] Generation failed for user ${ctx.session.user.id}:`, error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Une erreur inattendue est survenue lors de la génération des opportunités.",
        });
      }
    }),

  /**
   * Fetches the latest opportunities for the current user.
   */
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.aiOpportunity.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
});
