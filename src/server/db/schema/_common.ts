import { sql } from "drizzle-orm";
import type { SQLiteColumnBuilders } from "drizzle-orm/sqlite-core/columns/all";
import { customAlphabet } from "nanoid";

const nanoidGen = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);
export const nanoid = (t: SQLiteColumnBuilders) => 
    t.text({ length: 12 })
        .primaryKey()
        .$default(() => nanoidGen());

export const createdAt = (t: SQLiteColumnBuilders) => 
    t.integer({ mode: 'timestamp' })
        .$defaultFn(() => sql`now()`)
        .notNull();
export const updatedAt = (t: SQLiteColumnBuilders) =>
    t.integer({ mode: 'timestamp' })
        .$onUpdateFn(() => sql`now()`);
export const deletedAt = (t: SQLiteColumnBuilders) => 
    t.integer({ mode: 'timestamp' });