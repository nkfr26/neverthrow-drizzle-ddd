import { ResultAsync } from "neverthrow";
import { db } from "../../../db";
import { usersTable } from "../../../db/schema";
import type { User } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const insertUserCommand = (user: User) => {
  return ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    () => new DbClientError(),
  );
};
export type InsertUserCommand = typeof insertUserCommand;
