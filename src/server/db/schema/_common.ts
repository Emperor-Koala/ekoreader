import { sql } from "drizzle-orm";
import type { PgColumnsBuilders } from "drizzle-orm/pg-core/columns/all";
import { customAlphabet } from "nanoid";

const nanoidGen = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);
export const nanoid = (t: PgColumnsBuilders) => 
    t.char({ length: 12 })
        .primaryKey()
        .$default(() => nanoidGen());

export const createdAt = (t: PgColumnsBuilders) => 
    t.timestamp({ withTimezone: true })
        .$defaultFn(() => sql`now()`)
        .notNull();
export const updatedAt = (t: PgColumnsBuilders) =>
    t.timestamp({ withTimezone: true })
        .$onUpdateFn(() => sql`now()`);
export const deletedAt = (t: PgColumnsBuilders) => 
    t.timestamp({ withTimezone: true });