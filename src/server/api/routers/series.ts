import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc"
import { books } from "~/server/db/schema/book";
import { series as seriesTable } from "~/server/db/schema/series";
import { eq, sql } from "drizzle-orm";

export const series = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            ctx.db.query.series.findMany({});
        }),

    recentlyAdded: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(20),
            libraryId: z.string().optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
                where: input.libraryId ? (series, {eq}) => eq(series.libraryId, input.libraryId!) : undefined,
                orderBy: (series, { desc }) => [desc(series.createdAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });
            const totalRecords = await ctx.db.$count(seriesTable, input.libraryId ? eq(seriesTable.libraryId, input.libraryId!) : undefined);

            return {
                series: results,
                pagination: {
                    previousPage: input.cursor > 0 ? input.cursor - 1 : null,
                    nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
                    totalRecords,
                }
            };
        }),

    recentlyUpdated: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(20),
            libraryId: z.string().optional(),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
                where: (series, {gt, eq, and}) => input.libraryId ? and(
                    gt(ctx.db.$count(books, eq(sql`"books"."seriesId"`, series.id)), 1), // TODO replace with proper table vars when possible
                    eq(series.libraryId, input.libraryId!),
                ) : gt(ctx.db.$count(books, eq(sql`"books"."seriesId"`, series.id)), 1), // TODO replace with proper table vars when possible
                orderBy: (series, { desc }) => [desc(series.updatedAt)],
                limit: input.pageSize,
                offset: input.cursor * input.pageSize,
            });
            const totalRecords = await ctx.db.$count(seriesTable, input.libraryId ? eq(seriesTable.libraryId, input.libraryId!) : undefined);

            return {
                series: results,
                pagination: {
                    previousPage: input.cursor > 0 ? input.cursor - 1 : null,
                    nextPage: results.length >= input.pageSize ? input.cursor + 1 : null,
                    totalRecords,
                }
            };
        }),
});