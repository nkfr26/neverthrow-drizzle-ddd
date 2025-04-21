import { err } from "neverthrow";
import { v7 as uuidv7 } from "uuid";
import { User } from "../../domain/user/model/user";
import type { CheckUserExists } from "../../domain/user/service/check-user-exists";
import type { InsertUser } from "../../infrastructure/user-repository";
import { CanNotRegisterUserError } from "./errors";

export const registerUser =
  (checkUserExists: CheckUserExists, insertUser: InsertUser) =>
  async (name: string) => {
    // ユーザーの生成
    const user = User(uuidv7(), name);
    if (user.isErr()) return err(user.error);

    // ユーザー名の重複確認
    const existsResult = await checkUserExists(user.value);
    if (existsResult.isErr()) return err(existsResult.error);
    if (existsResult.value)
      return err(new CanNotRegisterUserError("ユーザーは既に存在しています。"));

    // ユーザーの作成
    return await insertUser(user.value);
  };
