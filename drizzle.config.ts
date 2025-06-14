import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config({ path: ".env" });
import { env } from "@/env";

export default defineConfig({
	schema: "./src/db/schema.ts",
	out: "./supabase/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
});
