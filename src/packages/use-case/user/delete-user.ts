import { err, safeTry } from "neverthrow";
import { UserId } from "../../domain/user/model";
import type {
  DeleteUserCommand,
  SelectUserByIdQuery,
} from "../../infrastructure/user";
import { UserNotFoundError } from "./errors";

export const deleteUser =
  (
    selectUserByIdQuery: SelectUserByIdQuery,
    deleteUserCommand: DeleteUserCommand,
  ) =>
  (id: string) => {
    return safeTry(async function* () {
      // ユーザーIDのバリデーション
      const userId = yield* UserId(id);

      // ユーザーの存在確認
      const user = yield* selectUserByIdQuery(userId);
      if (user === undefined)
        return err(new UserNotFoundError("ユーザーが見つかりませんでした。"));

      // ユーザーの削除
      return deleteUserCommand(user);
    });
  };
