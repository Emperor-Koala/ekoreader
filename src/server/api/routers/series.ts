import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc"

export const series = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            ctx.db.query.series.findMany({});
        }),

    recentlyAdded: publicProcedure
        .input(z.object({
            cursor: z.number().int().optional().default(0),
            pageSize: z.number().int().optional().default(15),
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
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
        }))
        .query(async ({ctx, input}) => {
            const results = await ctx.db.query.series.findMany({
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