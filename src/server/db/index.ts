import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import * as auth from "./schema/auth";
import { File } from "./schema/file";
import { Book } from "./schema/book";

const databaseUrl = `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`;

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? postgres(databaseUrl);
if (env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle(conn, {
	schema: {
		...auth,
		files: File,
		books: Book,
	},
});
