import type { SelectUserByNameQuery } from "../../../infrastructure/user";
import type { User } from "../model";

export const checkUserExists =
  (selectUserByNameQuery: SelectUserByNameQuery) => (user: User) => {
    return selectUserByNameQuery(user.name).map(
      (duplicateUser) => duplicateUser !== undefined,
    );
  };
export type CheckUserExists = ReturnType<typeof checkUserExists>;
