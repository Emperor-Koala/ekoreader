import { nanoid, createdAt, deletedAt, updatedAt } from "./_common";
import { createInsertSchema } from "drizzle-zod";
import z from "zod/v4";
import { libraries } from "./library";
import { relations } from "drizzle-orm";
import { series } from "./series";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const books = sqliteTable("books", (t) => ({
    id: nanoid(t),
    libraryId: t.text({ length: 12 }).notNull().references(() => libraries.id),
    seriesId: t.text({ length: 12 }).notNull().references(() => series.id),
    seriesNumber: t.integer(),
    title: t.text().notNull(),
    summary: t.text().notNull(),
    cover: t.text(),
    file: t.text().notNull(),
    authors: t.text({ mode: "json" }).$type<string[]>().notNull().default([]),
    publisher: t.text(),
    genre: t.text({ mode: "json" }).$type<string[]>().notNull().default([]),
    releaseDate: t.integer({mode: 'timestamp'}),
    tags: t.text({ mode: "json" }).$type<string[]>().notNull().default([]),
    isbn: t.integer(),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const bookRelations = relations(books, ({one}) => ({
    library: one(libraries, {
        fields: [books.libraryId],
        references: [libraries.id],
    }),
    series: one(series, {
        fields: [books.seriesId],
        references: [series.id],
    }),
}));

export const CreateBookSchema = createInsertSchema(books, {
    cover: z.file().mime(["image/jpeg", "image/png"]).nullish(),
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