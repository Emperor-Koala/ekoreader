import { pgTable } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { books } from "./book";
import { createInsertSchema } from "drizzle-zod";
import { nanoid, createdAt, deletedAt, updatedAt } from "./_common";

export const libraries = pgTable("libraries", (t) => ({
    id: nanoid(t),
    name: t.varchar({ length: 100 }).notNull(),
    rootFolder: t.varchar({ length: 255 }).notNull(),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const libraryRelations = relations(libraries, ({many}) => ({
    books: many(books),
}));

export const CreateLibrarySchema = createInsertSchema(libraries).omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
});