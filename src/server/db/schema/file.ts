import { pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { createdAt, deletedAt, updatedAt } from "./_common";

export const File = pgTable("file", (t) => ({
    id: t.integer().notNull().primaryKey().generatedByDefaultAsIdentity(),
    path: t.text().notNull(),
    size: t.integer().notNull(),
    mimeType: t.varchar({ length: 255 }).notNull(),
    customProperties: t.jsonb().notNull().default({}),
    order: t.integer().notNull(),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const CreateFileSchema = createInsertSchema(File).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export const UpdateFileSchema = createUpdateSchema(File, {
    id: z.number(),
}).omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});