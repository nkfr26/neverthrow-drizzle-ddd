import type { ExtractTablesWithRelations } from "drizzle-orm";
import type { PgTransaction } from "drizzle-orm/pg-core";
import type {
  PostgresJsDatabase,
  PostgresJsQueryResultHKT,
} from "drizzle-orm/postgres-js";
import type postgres from "postgres";

export type DrizzleClient =
  | (PostgresJsDatabase<Record<string, never>> & {
      $client: postgres.Sql;
    })
  | PgTransaction<
      PostgresJsQueryResultHKT,
      Record<string, never>,
      ExtractTablesWithRelations<Record<string, never>>
    >;
