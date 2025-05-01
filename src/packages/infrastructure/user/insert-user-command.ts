import { ResultAsync } from "neverthrow";
import type { DrizzleClient } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const insertUserCommand = (db: DrizzleClient) => (user: User) => {
  return ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  );
};
export type InsertUserCommand = ReturnType<typeof insertUserCommand>;
