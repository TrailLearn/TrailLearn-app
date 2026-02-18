import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { OrientationInputsSchema } from "~/features/ai-engine/types";
import { OrientationService } from "~/features/ai-engine/services/orientation.service";
import { TRPCError } from "@trpc/server";

export const aiOrientationRouter = createTRPCRouter({
  /**
   * Generates a new structured orientation plan and saves it.
   */
  generate: protectedProcedure
    .input(OrientationInputsSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        const result = await OrientationService.generatePlan(input);

        return await ctx.db.aiOrientation.create({
          data: {
            userId: ctx.session.user.id,
            inputs: input as any,
            output: result as any,
          },
        });
      } catch (error) {
        // Log detailed error for server-side monitoring
        console.error(`[OrientationRouter] Generation failed for user ${ctx.session.user.id}:`, error);
        
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Une erreur inattendue est survenue lors de la génération de l'orientation.",
        });
      }
    }),

  /**
   * Fetches the latest orientation plan for the current user.
   */
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.aiOrientation.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
});
