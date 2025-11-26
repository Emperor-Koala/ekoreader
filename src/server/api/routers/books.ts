import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { CreateBookSchema } from "~/server/db/schema/book";

export const books = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            return ctx.db.query.books.findMany({});
        }),

    createBook: publicProcedure
        .input(CreateBookSchema)
        .mutation(async ({ctx, input}) => {
            console.debug(ctx, input);
        }),
});