import { createTRPCRouter, publicProcedure } from "../trpc";

export const books = createTRPCRouter({
    listAll: publicProcedure
        .query(async ({ctx}) => {
            return ctx.db.query.books.findMany({});
        }),
});