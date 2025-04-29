import { err } from "neverthrow";
import { v7 as uuidv7 } from "uuid";
import { User } from "../../domain/user/model/user";
import type { UserExists } from "../../domain/user/service/user-exists";
import type { InsertUserCommand } from "../../infrastructure/user";
import { CanNotRegisterUserError } from "./errors";

export const registerUser =
  (userExists: UserExists, insertUserCommand: InsertUserCommand) =>
  async (name: string) => {
    // ユーザーの生成
    const userResult = User(uuidv7(), name);
    if (userResult.isErr()) return err(userResult.error);

    // ユーザーの重複確認
    const existsResult = await userExists(userResult.value);
    if (existsResult.isErr()) return err(existsResult.error);
    if (existsResult.value)
      return err(new CanNotRegisterUserError("ユーザーは既に存在しています。"));

    // ユーザーの作成
    return await insertUserCommand(userResult.value);
  };
