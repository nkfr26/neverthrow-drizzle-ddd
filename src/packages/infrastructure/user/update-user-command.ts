import { eq } from "drizzle-orm";
import { ResultAsync } from "neverthrow";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const updateUserCommand = (user: User) => {
  return ResultAsync.fromPromise(
    db
      .update(usersTable)
      .set({ name: user.name })
      .where(eq(usersTable.userId, user.id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
};
export type UpdateUserCommand = typeof updateUserCommand;
