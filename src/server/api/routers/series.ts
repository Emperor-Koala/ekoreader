import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc"
import { books } from "~/server/db/schema/book";

export const series = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            ctx.db.query.series.findMany({});
        }),

    recentlyAdded: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(15),
            libraryId: z.string().length(12).optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
                where: input.libraryId ? (series, {eq}) => eq(series.libraryId, input.libraryId!) : undefined,
                orderBy: (series, { desc }) => [desc(series.createdAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });

            return {
                series: results,
                nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
            };
        }),

    recentlyUpdated: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(15),
            libraryId: z.string().length(12).optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
                with: {
                    books: true,
                },
                where: (series, {gt, eq, and}) => input.libraryId ? and(
                    gt(ctx.db.$count(books, eq(books.seriesId, series.id)), 1),
                    eq(series.libraryId, input.libraryId!),
                ) : gt(ctx.db.$count(books, eq(books.seriesId, series.id)), 1),
                orderBy: (series, { desc }) => [desc(series.updatedAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });

            return {
                series: results,
                nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
            };
        }),
});