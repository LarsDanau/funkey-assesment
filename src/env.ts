import { createEnv } from "@t3-oss/env-nextjs";
import { config } from "dotenv";
import { z } from "zod/v4";
config({ path: ".env" });

export const env = createEnv({
	server: {
		POSTGRES_URL: z.string().url(),
	},
	runtimeEnv: {
		POSTGRES_URL: process.env.POSTGRES_URL,
	},
});
