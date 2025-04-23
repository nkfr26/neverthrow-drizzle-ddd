import { err } from "neverthrow";
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
  async (id: string) => {
    // ユーザーIDのバリデーション
    const userIdResult = UserId(id);
    if (userIdResult.isErr()) return userIdResult;

    // ユーザーの存在確認
    const userResult = await selectUserByIdQuery(userIdResult.value);
    if (userResult.isErr()) return userResult;
    const user = userResult.value;
    if (user === undefined)
      return err(new UserNotFoundError("ユーザーが見つかりませんでした。"));

    // ユーザーの削除
    return await deleteUserCommand(user);
  };
