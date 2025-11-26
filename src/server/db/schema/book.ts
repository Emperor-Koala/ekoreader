import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, updatedAt } from "./_common";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod/v4";

export const Book = pgTable("books", (t) => ({
    id: t.integer().notNull().primaryKey().generatedByDefaultAsIdentity(),
    title: t.varchar({ length: 255 }).notNull(),
    summary: t.text().notNull(),
    cover: t.varchar({ length: 255 }),
    file: t.varchar({ length: 255 }).notNull(),
    authors: t.jsonb().$type<string[]>().notNull().default([]),
    releaseDate: t.date(),
    tags: t.jsonb().$type<string[]>().notNull().default([]),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const CreateBookSchema = createInsertSchema(Book).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

export const UpdateBookSchema = createUpdateSchema(Book, {
    id: z.number(),
}).omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});