import { CreateLibrarySchema } from "~/server/db/schema/library";
import { libraries as librariesTable } from "~/server/db/schema/library";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const libraries = createTRPCRouter({
    create: publicProcedure
        .input(CreateLibrarySchema)
        .mutation(({ctx, input}) => ctx.db.insert(librariesTable).values(input)),
});