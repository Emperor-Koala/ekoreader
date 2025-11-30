import type { Config } from "drizzle-kit";

export default {
	schema: "./src/server/db/schema",
	dialect: "sqlite",
	dbCredentials: {
		url: 'file:ekoreader.sqlite',
	},
} satisfies Config;
