import { createdAt, deletedAt, nanoid, updatedAt } from "./_common";
import { relations } from "drizzle-orm";
import { books } from "./book";
import { libraries } from "./library";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const series = sqliteTable('series', (t) => ({
    id: nanoid(t),
    libraryId: t.text({ length: 12 }).notNull().references(() => libraries.id),
    title: t.text().notNull(),
    cover: t.text(),
    authors: t.text({ mode: "json" }).$type<string[]>().notNull().default([]),
    publisher: t.text(),
    genre: t.text({ mode: "json" }).$type<string[]>().notNull().default([]),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const seriesRelations = relations(series, ({one, many}) => ({
    books: many(books),
    library: one(libraries, {
        fields: [series.libraryId],
        references: [libraries.id],
    }),
}));