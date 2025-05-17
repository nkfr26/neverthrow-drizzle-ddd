import { eq } from "drizzle-orm";
import { ResultAsync } from "neverthrow";
import type { User } from "../../domain/user/model";
import type { DrizzleClient } from "../drizzle-client";
import { DbClientError } from "../errors";
import { usersTable } from "../schema";

export const deleteUserCommand = (db: DrizzleClient) => (user: User) =>
  ResultAsync.fromPromise(
    db.delete(usersTable).where(eq(usersTable.userId, user.id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
export type DeleteUserCommand = ReturnType<typeof deleteUserCommand>;
