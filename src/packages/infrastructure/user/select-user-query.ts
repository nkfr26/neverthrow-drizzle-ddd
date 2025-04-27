import { eq } from "drizzle-orm";
import { Result, ResultAsync, ok } from "neverthrow";
import { db } from "../../../db";
import { type UserDataModel, usersTable } from "../../../db/schema";
import { User, type UserId, type UserName } from "../../domain/user/model";
import { DbClientError } from "../errors";

const toModel = (from: UserDataModel) => {
  return User(from.userId, from.name);
};

export const selectUserByIdQuery = (id: UserId) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.userId, id)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};
export type SelectUserByIdQuery = typeof selectUserByIdQuery;

export const selectAllUsersQuery = () => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) => Result.combine(userDataModels.map(toModel)));
};
export type SelectAllUsersQuery = typeof selectAllUsersQuery;

export const selectUserByNameQuery = (name: UserName) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.name, name)),
    (e) => new DbClientError("データベース接続確立エラー", { cause: e }),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};
export type SelectUserByNameQuery = typeof selectUserByNameQuery;
