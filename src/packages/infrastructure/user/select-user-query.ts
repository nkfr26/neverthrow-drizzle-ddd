import { eq } from "drizzle-orm";
import { Result, ResultAsync, ok, safeTry } from "neverthrow";
import type { DrizzleClient } from "../../../db";
import { type UserDataModel, usersTable } from "../../../db/schema";
import { User, UserId, UserName } from "../../domain/user/model";
import { DbClientError } from "../errors";

export const selectUserByIdQuery = (db: DrizzleClient) => (id: UserId) =>
  ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.userId, id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
export type SelectUserByIdQuery = ReturnType<typeof selectUserByIdQuery>;

export const selectAllUsersQuery = (db: DrizzleClient) => () =>
  ResultAsync.fromPromise(
    db.select().from(usersTable),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) => Result.combine(userDataModels.map(toModel)));
export type SelectAllUsersQuery = ReturnType<typeof selectAllUsersQuery>;

export const selectUserByNameQuery = (db: DrizzleClient) => (name: UserName) =>
  ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.name, name)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
export type SelectUserByNameQuery = ReturnType<typeof selectUserByNameQuery>;

const toModel = (from: UserDataModel) =>
  safeTry(function* () {
    return ok(User(yield* UserId(from.userId), yield* UserName(from.name)));
  });
