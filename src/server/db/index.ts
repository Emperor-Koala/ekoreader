import { drizzle } from "drizzle-orm/libsql";

import { env } from "~/env";
import * as auth from "./schema/auth";
import * as books from "./schema/book";
import * as libraries from "./schema/library";
import * as series from "./schema/series";
import { createClient, type Client } from "@libsql/client";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
	client: Client | undefined;
};

const client = globalForDb.client ?? createClient({ url: 'file:ekoreader.sqlite' });
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle({
	client,
	schema: {
		...auth,
		...books,
		...libraries,
		...series,
	},
});
