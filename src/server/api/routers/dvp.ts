import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { dvpDataSchema } from "~/features/dvp/types";

export const dvpRouter = createTRPCRouter({
  create: protectedProcedure
    .input(dvpDataSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.dvpRecord.create({
        data: {
          userId: ctx.session.user.id,
          data: input ?? {}, // Ensure input is valid object if optional
          status: "DRAFT",
        },
      });
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      data: dvpDataSchema.optional(),
      status: z.enum(["DRAFT", "COMPLETED", "ARCHIVED"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const updateData: any = {};
      if (input.data) updateData.data = input.data;
      if (input.status) updateData.status = input.status;

      return ctx.db.dvpRecord.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id, // Security: Ensure ownership
        },
        data: updateData,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.dvpRecord.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),
});
