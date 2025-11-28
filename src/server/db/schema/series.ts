import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, nanoid, updatedAt } from "./_common";
import { relations } from "drizzle-orm";
import { books } from "./book";

export const series = pgTable('series', (t) => ({
    id: nanoid(t),
    title: t.varchar({ length: 255 }).notNull(),
    cover: t.varchar({ length: 255 }),
    createdAt: createdAt(t),
    updatedAt: updatedAt(t),
    deletedAt: deletedAt(t),
}));

export const seriesRelations = relations(series, ({many}) => ({
    books: many(books),
}));