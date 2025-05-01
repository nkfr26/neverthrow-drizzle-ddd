import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import { type PostgresJsQueryResultHKT, drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "../../env";

const client = postgres(env.DATABASE_URL);
export const db = drizzle({ client });

export type DrizzleClient =
  | typeof db
  | PgTransaction<
      PostgresJsQueryResultHKT,
      Record<string, never>,
      ExtractTablesWithRelations<Record<string, never>>
    >;
