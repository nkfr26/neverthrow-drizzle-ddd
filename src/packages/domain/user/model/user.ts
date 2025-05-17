import type { UserId } from "./user-id";
import type { UserName } from "./user-name";

export type User = Readonly<{
  id: UserId;
  name: UserName;
}>;

export const User = (id: UserId, name: UserName): User => ({
  id,
  name,
});

export const changeUserName = (user: User, name: UserName) => ({
  ...user,
  name,
});
