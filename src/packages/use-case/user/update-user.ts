import { err, safeTry } from "neverthrow";
import { UserId, UserName } from "../../domain/user/model";
import { changeUserName } from "../../domain/user/model/user";
import type { UserExists } from "../../domain/user/service/user-exists";
import type {
  SelectUserByIdQuery,
  UpdateUserCommand,
} from "../../infrastructure/user";
import { CanNotRegisterUserError, UserNotFoundError } from "./errors";

export const updateUser =
  (
    selectUserByIdQuery: SelectUserByIdQuery,
    userExists: UserExists,
    updateUserCommand: UpdateUserCommand,
  ) =>
  (id: string, name: string) =>
    safeTry(async function* () {
      // ユーザーIDのバリデーション
      const userId = yield* UserId(id);

      // ユーザーの存在確認
      const user = yield* selectUserByIdQuery(userId);
      if (user === undefined) {
        return err(new UserNotFoundError("ユーザーが見つかりませんでした。"));
      }

      // ユーザー名のバリデーション
      const userName = yield* UserName(name);

      // ユーザー名の変更
      const updatedUser = changeUserName(user, userName);

      // ユーザーの重複確認
      const exists = yield* userExists(updatedUser);
      if (exists) {
        return err(
          new CanNotRegisterUserError("ユーザーは既に存在しています。"),
        );
      }

      // ユーザーの更新
      return updateUserCommand(updatedUser);
    });
