import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { CreateBookSchema } from "~/server/db/schema/book";

export const books = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            ctx.db.query.books.findMany({});
        }),

    recentlyAdded: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(15),
            libraryId: z.string().length(12).optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.books.findMany({
                where: input.libraryId ? (books, {eq}) => eq(books.libraryId, input.libraryId!) : undefined,
                orderBy: (books, { desc }) => [desc(books.createdAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });

            return {
                books: results,
                nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
            };
        }),

    createBook: publicProcedure
        .input(CreateBookSchema)
        .mutation(async ({ctx, input}) => {
            console.debug(ctx, input);
        }),
});