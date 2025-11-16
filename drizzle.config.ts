import type { Config } from "drizzle-kit";

import { env } from "~/env";

const databaseUrl = `postgresql://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.DB_HOST}:${env.DB_PORT}/${env.DB_DATABASE}`;

export default {
	schema: "./src/server/db/schema",
	dialect: "postgresql",
	dbCredentials: {
		url: databaseUrl,
	},
} satisfies Config;
