import { eq } from "drizzle-orm";
import { ResultAsync } from "neverthrow";
import type { DrizzleClient } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const updateUserCommand = (db: DrizzleClient) => (user: User) =>
  ResultAsync.fromPromise(
    db
      .update(usersTable)
      .set({ name: user.name })
      .where(eq(usersTable.userId, user.id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
export type UpdateUserCommand = ReturnType<typeof updateUserCommand>;
