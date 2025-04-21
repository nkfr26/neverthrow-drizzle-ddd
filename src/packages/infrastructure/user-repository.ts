import { eq } from "drizzle-orm";
import { type Result, ResultAsync, ok } from "neverthrow";
import type { RowList } from "postgres";
import { db } from "../../db";
import { type UserDataModel, usersTable } from "../../db/schema";
import type { ValidationError } from "../domain/errors";
import { User, type UserId, type UserName } from "../domain/user/model";
import { DbClientError } from "./errors";

const toModel = (from: UserDataModel): Result<User, ValidationError> => {
  return User(from.userId, from.name);
};

export type FindUserById = (
  id: UserId,
) => ResultAsync<User | undefined, DbClientError | ValidationError>;

export const findUserById: FindUserById = (id: UserId) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.userId, id)),
    () => new DbClientError(),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};

export type FindUserByName = (
  name: UserName,
) => ResultAsync<User | undefined, DbClientError | ValidationError>;

export const findUserByName: FindUserByName = (name: UserName) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.name, name)),
    () => new DbClientError(),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};

export type InsertUser = (
  user: User,
) => ResultAsync<RowList<never[]>, DbClientError>;

export const insertUser: InsertUser = (user: User) => {
  return ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    () => new DbClientError(),
  );
};

export type UpdateUser = (
  user: User,
) => ResultAsync<RowList<never[]>, DbClientError>;

export const updateUser: UpdateUser = (user: User) => {
  return ResultAsync.fromPromise(
    db
      .update(usersTable)
      .set({ name: user.name })
      .where(eq(usersTable.userId, user.id)),
    () => new DbClientError(),
  );
};
