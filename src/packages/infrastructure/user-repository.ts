import { eq } from "drizzle-orm";
import { ResultAsync, ok } from "neverthrow";
import { db } from "../../db";
import { type UserDataModel, usersTable } from "../../db/schema";
import { User, type UserId, type UserName } from "../domain/user/model";
import { DbClientError } from "./errors";

const toModel = (from: UserDataModel) => {
  return User(from.userId, from.name);
};

export const findUserById = (id: UserId) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.userId, id)),
    () => new DbClientError(),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};
export type FindUserById = typeof findUserById;

export const findUserByName = (name: UserName) => {
  return ResultAsync.fromPromise(
    db.select().from(usersTable).where(eq(usersTable.name, name)),
    () => new DbClientError(),
  ).andThen((userDataModels) =>
    userDataModels.length ? toModel(userDataModels[0]) : ok(undefined),
  );
};
export type FindUserByName = typeof findUserByName;

export const insertUser = (user: User) => {
  return ResultAsync.fromPromise(
    db.insert(usersTable).values({ userId: user.id, name: user.name }),
    () => new DbClientError(),
  );
};
export type InsertUser = typeof insertUser;

export const updateUser = (user: User) => {
  return ResultAsync.fromPromise(
    db
      .update(usersTable)
      .set({ name: user.name })
      .where(eq(usersTable.userId, user.id)),
    () => new DbClientError(),
  );
};
export type UpdateUser = typeof updateUser;
