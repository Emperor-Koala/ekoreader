import { sql } from "drizzle-orm";
import type { PgColumnsBuilders } from "drizzle-orm/pg-core/columns/all";

export const createdAt = (t: PgColumnsBuilders) => 
    t.timestamp({ withTimezone: true })
        .$defaultFn(() => sql`now()`)
        .notNull();
export const updatedAt = (t: PgColumnsBuilders) =>
    t.timestamp({ withTimezone: true })
        .$onUpdateFn(() => sql`now()`);
export const deletedAt = (t: PgColumnsBuilders) => 
    t.timestamp({ withTimezone: true });