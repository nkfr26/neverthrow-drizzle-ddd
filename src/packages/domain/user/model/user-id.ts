import { type Result, err, ok } from "neverthrow";
import { validate as uuidValidate } from "uuid";
import type { Branded } from "../../branded";
import { ValidationError } from "../../errors";

export type UserId = Branded<string, "UserId">;

export const UserId = (value: string): Result<UserId, ValidationError> => {
  if (!uuidValidate(value)) {
    return err(new ValidationError("ユーザーIDが不正です。"));
  }
  return ok(value as UserId);
};
