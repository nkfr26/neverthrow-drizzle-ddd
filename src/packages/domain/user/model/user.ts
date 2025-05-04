import { type Result, ok, safeTry } from "neverthrow";
import type { ValidationError } from "../../errors";
import { UserId } from "./user-id";
import { UserName } from "./user-name";

export type User = Readonly<{
  id: UserId;
  name: UserName;
}>;

export const User = (id: string, name: string): Result<User, ValidationError> =>
  safeTry(function* () {
    return ok({
      id: yield* UserId(id),
      name: yield* UserName(name),
    });
  });

export const changeUserName = (user: User, name: UserName) => ({
  ...user,
  name,
});
