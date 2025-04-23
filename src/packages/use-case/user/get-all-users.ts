import type { SelectAllUsersQuery } from "../../infrastructure/user";

export const getAllUsers = (selectAllUsersQuery: SelectAllUsersQuery) => () => {
  return selectAllUsersQuery();
};
