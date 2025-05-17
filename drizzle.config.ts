import { defineConfig } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  schema: "./src/packages/infrastructure/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
