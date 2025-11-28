import { pgTable } from "drizzle-orm/pg-core";
import { createdAt, deletedAt, nanoid, updatedAt } from "./_common";
import { relations } from "drizzle-orm";
import { books } from "./book";
import { libraries } from "./library";

export const series = pgTable('series', (t) => ({
    id: nanoid(t),
    libraryId: t.char({ length: 12 }).notNull().references(() => libraries.id),
    title: t.varchar({ length: 255 }).notNull(),
    cover: t.varchar({ length: 255 }),
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