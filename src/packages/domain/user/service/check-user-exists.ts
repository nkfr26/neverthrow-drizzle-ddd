import type { FindUserByName } from "../../../infrastructure/user-repository";
import type { User } from "../model";

export const checkUserExists =
  (findUserByName: FindUserByName) => (user: User) => {
    return findUserByName(user.name).map(
      (duplicateUser) => duplicateUser !== undefined,
    );
  };
export type CheckUserExists = ReturnType<typeof checkUserExists>;
