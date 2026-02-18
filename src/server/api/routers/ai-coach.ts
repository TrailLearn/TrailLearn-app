import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { AiType } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const aiCoachRouter = createTRPCRouter({
  /**
   * Creates a new conversation session.
   */
  createConversation: protectedProcedure
    .input(z.object({
      type: z.nativeEnum(AiType),
      title: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.aiConversation.create({
        data: {
          userId: ctx.session.user.id,
          type: input.type,
          title: input.title ?? (input.type === "ORIENTATION" ? "Nouvelle Orientation" : "Nouveau Profil"),
        },
      });
    }),

  /**
   * Fetches all conversations for the current user, grouped by type.
   */
  getConversations: protectedProcedure
    .input(z.object({
      type: z.nativeEnum(AiType).optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.db.aiConversation.findMany({
        where: {
          userId: ctx.session.user.id,
          type: input.type,
        },
        orderBy: { updatedAt: "desc" },
      });
    }),

  /**
   * Fetches messages for a specific conversation.
   */
  getMessages: protectedProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .query(async ({ ctx, input }) => {
      const conv = await ctx.db.aiConversation.findUnique({
        where: { id: input.conversationId },
      });

      if (!conv || conv.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Accès refusé." });
      }

      return ctx.db.aiMessage.findMany({
        where: { conversationId: input.conversationId },
        orderBy: { createdAt: "asc" },
      });
    }),

  /**
   * Saves a message (user or assistant) to the database.
   * Note: Assistant messages might include structuredData.
   */
  saveMessage: protectedProcedure
    .input(z.object({
      conversationId: z.string(),
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
      structuredData: z.any().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const conv = await ctx.db.aiConversation.findUnique({
        where: { id: input.conversationId },
      });

      if (!conv || conv.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Accès refusé." });
      }

      const message = await ctx.db.aiMessage.create({
        data: {
          conversationId: input.conversationId,
          role: input.role,
          content: input.content,
          structuredData: input.structuredData,
        },
      });

      // Update conversation timestamp
      await ctx.db.aiConversation.update({
        where: { id: input.conversationId },
        data: { updatedAt: new Date() },
      });

      return message;
    }),

  /**
   * Deletes a conversation and its messages.
   */
  deleteConversation: protectedProcedure
    .input(z.object({
      conversationId: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      const conv = await ctx.db.aiConversation.findUnique({
        where: { id: input.conversationId },
      });

      if (!conv || conv.userId !== ctx.session.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Accès refusé." });
      }

      return ctx.db.aiConversation.delete({
        where: { id: input.conversationId },
      });
    }),
});
