import { config } from "dotenv";
import { z } from "zod";

config({ path: ".env" });

export const envSchema = z.object({
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
