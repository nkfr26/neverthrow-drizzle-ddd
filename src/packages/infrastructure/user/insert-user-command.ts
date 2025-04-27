import { ResultAsync } from "neverthrow";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const insertUserCommand = (user: User) => {
  return ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
};
export type InsertUserCommand = typeof insertUserCommand;
