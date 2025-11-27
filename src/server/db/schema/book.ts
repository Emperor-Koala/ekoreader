import { pgTable } from "drizzle-orm/pg-core";
import { nanoid, createdAt, deletedAt, updatedAt } from "./_common";
import { createInsertSchema } from "drizzle-zod";
import z from "zod/v4";
import { libraries } from "./library";
import { relations } from "drizzle-orm";

export const books = pgTable("books", (t) => ({
    id: nanoid(t),
    libraryId: t.char({ length: 12 }).references(() => libraries.id),
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

export const bookRelations = relations(books, ({one}) => ({
    library: one(libraries, {
        fields: [books.libraryId],
        references: [libraries.id],
    }),
}));

export const CreateBookSchema = createInsertSchema(books, {
    cover: z.file().mime(["image/jpeg", "image/png"]),
    file: z.file().mime("application/epub+zip"),
}).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});

// export const UpdateBookSchema = createUpdateSchema(books, {
//     id: z.number(),
// }).omit({
//     createdAt: true,
//     updatedAt: true,
//     deletedAt: true,
// });