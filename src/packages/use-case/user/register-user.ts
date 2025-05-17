import { err, safeTry } from "neverthrow";
import { v7 as uuidv7 } from "uuid";
import { UserId, UserName } from "../../domain/user/model";
import { User } from "../../domain/user/model/user";
import type { UserExists } from "../../domain/user/service/user-exists";
import type { InsertUserCommand } from "../../infrastructure/user";
import { CanNotRegisterUserError } from "./errors";

export const registerUser =
  (userExists: UserExists, insertUserCommand: InsertUserCommand) =>
  (name: string) =>
    safeTry(async function* () {
      // ユーザーの生成
      const user = User(yield* UserId(uuidv7()), yield* UserName(name));

      // ユーザーの重複確認
      const exists = yield* userExists(user);
      if (exists) {
        return err(
          new CanNotRegisterUserError("ユーザーは既に存在しています。"),
        );
      }

      // ユーザーの作成
      return insertUserCommand(user);
    });
