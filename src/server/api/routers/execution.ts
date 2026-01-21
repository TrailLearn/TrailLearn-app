import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getTopFocusTasks } from "~/features/execution/logic/focus-engine";
import { TRPCError } from "@trpc/server";

export const executionRouter = createTRPCRouter({
  /**
   * Retrieves the Top 3 Focus Tasks for the user.
   */
  getFocusTasks: protectedProcedure.query(async ({ ctx }) => {
    // 1. Get User's Action Plan
    const actionPlan = await ctx.db.actionPlan.findUnique({
      where: { userId: ctx.session.user.id },
      include: { tasks: true },
    });

    if (!actionPlan) return [];

    // 2. Filter & Sort via Logic Engine
    return getTopFocusTasks(actionPlan.tasks);
  }),

  /**
   * Retrieves the full backlog (all tasks).
   */
  getBacklog: protectedProcedure.query(async ({ ctx }) => {
    const actionPlan = await ctx.db.actionPlan.findUnique({
      where: { userId: ctx.session.user.id },
      include: { tasks: { orderBy: { createdAt: "desc" } } },
    });
    return actionPlan?.tasks || [];
  }),

  /**
   * Creates a new task manually.
   */
  createTask: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
    }))
    .mutation(async ({ ctx, input }) => {
      // Find or create Action Plan
      let plan = await ctx.db.actionPlan.findUnique({
        where: { userId: ctx.session.user.id },
      });

      if (!plan) {
        plan = await ctx.db.actionPlan.create({
          data: { userId: ctx.session.user.id },
        });
      }

      return ctx.db.task.create({
        data: {
          actionPlanId: plan.id,
          title: input.title,
          priority: input.priority,
          status: "PENDING",
        },
      });
    }),

  /**
   * Updates task status and optional narrative feedback.
   */
  updateTaskStatus: protectedProcedure
    .input(z.object({
      id: z.string(),
      status: z.enum(["PENDING", "DONE", "SKIPPED"]),
      feedback: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Security check: Ensure task belongs to user
      const task = await ctx.db.task.findFirst({
        where: {
          id: input.id,
          actionPlan: { userId: ctx.session.user.id },
        },
      });

      if (!task) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Task not found" });
      }

      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          status: input.status,
          userFeedback: input.feedback,
        },
      });
    }),

  /**
   * Attaches a proof/evidence URL to a task.
   */
  addEvidence: protectedProcedure
    .input(z.object({
      id: z.string(),
      evidenceUrl: z.string().url(),
    }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findFirst({
        where: {
          id: input.id,
          actionPlan: { userId: ctx.session.user.id },
        },
      });

      if (!task) throw new TRPCError({ code: "NOT_FOUND" });

      return ctx.db.task.update({
        where: { id: input.id },
        data: { evidenceUrl: input.evidenceUrl },
      });
    }),
});
