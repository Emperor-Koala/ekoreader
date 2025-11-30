import { relations, sql } from "drizzle-orm";
import { books } from "./book";
import { createInsertSchema } from "drizzle-zod";
import { nanoid, createdAt, deletedAt, updatedAt } from "./_common";
import { series } from "./series";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const libraries = sqliteTable("libraries", (t) => ({
    id: nanoid(t),
    name: t.text().notNull(),
    rootFolder: t.text().notNull(),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const libraryRelations = relations(libraries, ({many}) => ({
    books: many(books),
    series: many(series),
}));

export const CreateLibrarySchema = createInsertSchema(libraries).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});