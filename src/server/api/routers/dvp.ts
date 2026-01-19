import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { dvpDataSchema } from "~/features/dvp/types";
import { TRPCError } from "@trpc/server";
import { calculateViability } from "~/features/dvp/engine/calculate-viability";

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
      // Fetch existing record to perform merge
      const existingRecord = await ctx.db.dvpRecord.findUnique({
        where: { 
          id: input.id,
          userId: ctx.session.user.id 
        },
      });

      if (!existingRecord) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found or access denied" });
      }

      const updateData: any = {};
      
      if (input.data) {
        // Merge existing data with new data (shallow merge at root level is sufficient for independent sections)
        const currentData = (existingRecord.data as Record<string, any>) || {};
        updateData.data = {
          ...currentData,
          ...input.data,
        };
      }

      if (input.status) updateData.status = input.status;

      return ctx.db.dvpRecord.update({
        where: {
          id: input.id,
        },
        data: updateData,
      });
    }),

  submit: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const record = await ctx.db.dvpRecord.findUnique({
        where: { id: input.id, userId: ctx.session.user.id },
      });

      if (!record) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Record not found" });
      }

      const rules = await ctx.db.businessRule.findMany();
      const diagnostic = calculateViability(record.data as any, rules);

      return ctx.db.dvpRecord.update({
        where: { id: input.id },
        data: {
          status: "COMPLETED",
          calculationResult: diagnostic as any,
          rulesVersion: diagnostic.rulesVersion,
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.dvpRecord.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  getHistory: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.dvpRecord.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        rulesVersion: true,
        calculationResult: true,
      },
    });
  }),
});
