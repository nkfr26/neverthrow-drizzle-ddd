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
    const userResult = User(uuidv7(), name);
    if (userResult.isErr()) return userResult;

    // ユーザー名の重複確認
    const existsResult = await checkUserExists(userResult.value);
    if (existsResult.isErr()) return existsResult;
    if (existsResult.value)
      return err(new CanNotRegisterUserError("ユーザーは既に存在しています。"));

    // ユーザーの作成
    return await insertUser(userResult.value);
  };
