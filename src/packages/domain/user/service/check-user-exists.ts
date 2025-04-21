import type { ResultAsync } from "neverthrow";
import type { DbClientError } from "../../../infrastructure/errors";
import type { FindUserByName } from "../../../infrastructure/user-repository";
import type { ValidationError } from "../../errors";
import type { User } from "../model";

export type CheckUserExists = (
  user: User,
) => ResultAsync<boolean, DbClientError | ValidationError>;

export const checkUserExists =
  (findUserByName: FindUserByName): CheckUserExists =>
  (user: User) => {
    return findUserByName(user.name).map(
      (duplicateUser) => duplicateUser !== undefined,
    );
  };
