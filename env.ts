import { config } from "dotenv";
import { z } from "zod";

config({ path: ".env" });

export const envVariables = z.object({
  DATABASE_URL: z.string(),
});

export const env = envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
