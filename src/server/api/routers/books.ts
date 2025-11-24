import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const books = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            return ctx.db.query.books.findMany({});
        }),

    createBook: publicProcedure
        .input(z.object())
        .mutation(async ({ctx, input}) => {
            console.debug(ctx, input);
        }),
});