import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { todoInput } from "~/types";

export const todoRouter = createTRPCRouter({
  all: protectedProcedure.query(async ({ ctx }) => {
    // return ctx.prisma.todo.findMany({
    //   where: {
    //     userId: ctx.session.user.id,
    //   },
    // });

    return [
      {
        id: "1",
        text: "test",
        done: false,
        userId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.create({
        data: {
          text: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.todo.delete({
        where: {
          id: input,
        },
      });
    }),

  toggle: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input: { id, done } }) => {
      return ctx.prisma.todo.update({
        where: {
          id,
        },
        data: {
          done,
        },
      });
    }),
});
