import { ResultAsync } from "neverthrow";
import type { User } from "../../domain/user/model";
import type { DrizzleClient } from "../drizzle-client";
import { DbClientError } from "../errors";
import { usersTable } from "../schema";

export const insertUserCommand = (db: DrizzleClient) => (user: User) =>
  ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
export type InsertUserCommand = ReturnType<typeof insertUserCommand>;
