import z from "zod/v4";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { octetInputParser } from "@trpc/server/http";

export const files = createTRPCRouter({
    upload: publicProcedure
        .input(octetInputParser)
        .mutation(async ({input}) => {
            
        }),
});