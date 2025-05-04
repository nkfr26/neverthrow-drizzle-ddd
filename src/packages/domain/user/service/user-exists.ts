import type { SelectUserByNameQuery } from "../../../infrastructure/user";
import type { User } from "../model";

export const userExists =
  (selectUserByNameQuery: SelectUserByNameQuery) => (user: User) =>
    selectUserByNameQuery(user.name).map(
      (duplicateUser) => duplicateUser !== undefined,
    );
export type UserExists = ReturnType<typeof userExists>;
