import { type Result, err, ok } from "neverthrow";
import type { Branded } from "../../branded";
import { ValidationError } from "../../errors";

export type UserName = Branded<string, "UserName">;

export const UserName = (value: string): Result<UserName, ValidationError> => {
  if (value.length < 3) {
    return err(new ValidationError("ユーザー名は3文字以上です。"));
  }
  return ok(value as UserName);
};
