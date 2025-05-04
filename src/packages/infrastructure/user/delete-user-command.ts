import { eq } from "drizzle-orm";
import { ResultAsync } from "neverthrow";
import type { DrizzleClient } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const deleteUserCommand = (db: DrizzleClient) => (user: User) =>
  ResultAsync.fromPromise(
    db.delete(usersTable).where(eq(usersTable.userId, user.id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
export type DeleteUserCommand = ReturnType<typeof deleteUserCommand>;
