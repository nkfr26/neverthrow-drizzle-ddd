import { Result } from "neverthrow";
import type { ValidationError } from "../../errors";
import { UserId } from "./user-id";
import { UserName } from "./user-name";

export type User = Readonly<{
  id: UserId;
  name: UserName;
}>;

export const User = (
  id: string,
  name: string,
): Result<User, ValidationError> => {
  return Result.combine([UserId(id), UserName(name)]).map(([id, name]) => ({
    id,
    name,
  }));
};

export const changeUserName = (user: User, name: UserName) => ({
  ...user,
  name,
});
