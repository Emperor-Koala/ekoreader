import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { CreateBookSchema } from "~/server/db/schema/book";
import { eq } from "drizzle-orm";
import { books as booksTable } from "~/server/db/schema/book";

export const books = createTRPCRouter({
    getById: publicProcedure
        .input(z.string().length(12))
        .query(({ctx, input: id}) => ctx.db.query.books.findFirst({
            where: (books, {eq}) => eq(books.id, id),
            with: {
                library: true,
            },
        })),

    list: publicProcedure
        .input(z.object({
            page: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(20),
            libraryId: z.string().optional(),
        }))
        .query(async ({ctx, input }) => {
            const results = await ctx.db.query.books.findMany({
                limit: input.pageSize,
                offset: input.page * input.pageSize,
            });
            const totalRecords = await ctx.db.$count(booksTable, input.libraryId ? eq(booksTable.libraryId, input.libraryId!) : undefined);

            return {
                books: results,
                pagination: {
                    previousPage: input.page > 0 ? input.page - 1 : null,
                    nextPage: results.length >= input.pageSize ? input.page + 1 : null,
                    totalRecords,
                    totalPages: Math.ceil(totalRecords / input.pageSize),
                }
            }
        }),

    recentlyAdded: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(20),
            libraryId: z.string().optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.books.findMany({
                where: input.libraryId ? (books, {eq}) => eq(books.libraryId, input.libraryId!) : undefined,
                orderBy: (books, { desc }) => [desc(books.createdAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });
            const totalRecords = await ctx.db.$count(booksTable, input.libraryId ? eq(booksTable.libraryId, input.libraryId!) : undefined);

            return {
                books: results,
                pagination: {
                    previousPage: input.cursor > 0 ? input.cursor - 1 : null,
                    nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
                    totalRecords,
                }
            };
        }),

    createBook: publicProcedure
        .input(CreateBookSchema)
        .mutation(async ({ctx, input}) => {
            console.debug(ctx, input);
        }),
});