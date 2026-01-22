import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getTopFocusTasks } from "~/features/execution/logic/focus-engine";
import { TRPCError } from "@trpc/server";
import { AiCoachService } from "~/features/ai-coach/services/ai-service";

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

    if (!actionPlan) return { tasks: [], planStatus: null };

    // 2. Filter & Sort via Logic Engine
    const tasks = getTopFocusTasks(actionPlan.tasks);
    
    return {
      tasks,
      planStatus: actionPlan.status,
    };
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
   * Deletes a task.
   */
  deleteTask: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const task = await ctx.db.task.findFirst({
        where: {
          id: input.id,
          actionPlan: { userId: ctx.session.user.id },
        },
      });

      if (!task) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return ctx.db.task.delete({
        where: { id: input.id },
      });
    }),

  /**
   * Validates the current Action Plan (DRAFT -> ACTIVE).
   */
  validatePlan: protectedProcedure.mutation(async ({ ctx }) => {
    const actionPlan = await ctx.db.actionPlan.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!actionPlan) throw new TRPCError({ code: "NOT_FOUND" });

    return ctx.db.actionPlan.update({
      where: { id: actionPlan.id },
      data: { status: "ACTIVE" },
    });
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
          data: { userId: ctx.session.user.id, status: "DRAFT" },
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

  /**
   * Generates an initial Action Plan based on DVP-B data and/or Chat Context.
   */
  generatePlan: protectedProcedure.mutation(async ({ ctx }) => {
    // 1. Ensure Action Plan exists
    let plan = await ctx.db.actionPlan.findUnique({
      where: { userId: ctx.session.user.id },
    });

    if (!plan) {
      plan = await ctx.db.actionPlan.create({
        data: { userId: ctx.session.user.id, status: "DRAFT" },
      });
    } else {
      // If plan exists, reset to DRAFT if explicitly regenerating
      await ctx.db.actionPlan.update({
        where: { id: plan.id },
        data: { status: "DRAFT" },
      });
    }

    // 2. Fetch latest DVP Data & Chat History
    const dvp = await ctx.db.dvpRecord.findFirst({
      where: { userId: ctx.session.user.id },
      orderBy: { updatedAt: "desc" },
    });
    
    const chatHistory = await ctx.db.chatMessage.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "asc" },
      take: 20, // Analyze last 20 messages for context
    });

    let newTasks = [];

    // 3. Try to generate from Chat Context
    if (chatHistory.length > 0) {
      const generatedTasks = await AiCoachService.generatePlanFromContext(
        chatHistory, 
        dvp?.data || {}
      );
      
      if (generatedTasks && generatedTasks.length > 0) {
        newTasks = generatedTasks.map((t: any) => ({
          title: t.title,
          description: t.description,
          priority: (['HIGH', 'MEDIUM', 'LOW'].includes(t.priority) ? t.priority : 'MEDIUM'),
          status: "PENDING",
        }));
      }
    }

    // 4. Fallback to DVP Logic if AI failed or no chat history
    if (newTasks.length === 0) {
      const data = (dvp?.data as any) || {};
      const city = data.project?.city || "votre ville de destination";
      const budget = data.budget?.savings ? `${data.budget.savings}€` : "votre budget";
      const field = data.project?.studyType || "votre formation";

      newTasks = [
        {
          title: `Rechercher un logement à ${city}`,
          description: `Commencez à explorer les quartiers et les résidences étudiantes à ${city}.`,
          priority: "HIGH",
          status: "PENDING",
        },
        {
          title: `Valider le budget de ${budget}`,
          description: "Vérifiez vos sources de financement et assurez-vous que l'épargne est disponible.",
          priority: "HIGH",
          status: "PENDING",
        },
        {
          title: `Préparer le dossier pour ${field}`,
          description: "Rassemblez les documents administratifs nécessaires pour votre inscription.",
          priority: "MEDIUM",
          status: "PENDING",
        },
      ];
    }

    // 5. Batch Create Tasks
    await ctx.db.task.createMany({
      data: newTasks.map((t: any) => ({
        actionPlanId: plan!.id, // We know plan exists (created or found)
        title: t.title,
        description: t.description,
        priority: t.priority as "HIGH" | "MEDIUM" | "LOW",
        status: "PENDING",
      })),
    });

    return { success: true, count: newTasks.length };
  }),

  /**
   * Generates a structured Action Plan based on chat history and DVP context.
   * Used by the "Generate Plan" button in Focus Dashboard.
   */
  async generatePlanFromContext(messages: any[], dvpContext: any) {
    try {
      const model = getLLMModel();
      const contextString = JSON.stringify(dvpContext);
      const conversationString = messages.map(m => `${m.role}: ${m.content}`).join('\n');

      const prompt = `
        You are an expert academic coach. 
        Based on the student's project context and their recent conversation history, generate a concrete Action Plan with 3-5 tasks.
        
        Context: ${contextString}
        
        Recent Conversation:
        ${conversationString}
        
        Return a JSON object with a "tasks" array. Each task must have:
        - title (string)
        - description (string)
        - priority ("HIGH", "MEDIUM", "LOW")
      `;

      // We use streamText but we want a single object. 
      // Actually generateObject is better for this, but to keep dependencies simple we can use a tool-like approach or just parse JSON from text.
      // Let's use generateObject if available, or just standard text generation with JSON instruction.
      
      // Since we want to return data to the TRPC router, we'll use a non-streaming call if possible.
      // ai sdk has 'generateObject'. Let's use that if we can import it, otherwise fallback to text.
      
      // For now, let's assume we use text generation and parse it.
      // Or better, let's use the same 'tool' trick but force the model to use it?
      // No, let's just ask for JSON.
      
      const { generateText } = await import('ai');
      
      const { text } = await generateText({
        model: model,
        system: "You are a helpful assistant that outputs only valid JSON.",
        prompt: prompt,
      });

      const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const result = JSON.parse(cleanText);
      
      if (result && Array.isArray(result.tasks)) {
        return result.tasks;
      }
      return null;
    } catch (error) {
      console.error("AI Plan Generation Error:", error);
      return null;
    }
  }
};
