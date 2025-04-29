import { err } from "neverthrow";
import { UserId, UserName } from "../../domain/user/model";
import { changeUserName } from "../../domain/user/model/user";
import type { UserExists } from "../../domain/user/service/user-exists";
import type {
  SelectUserByIdQuery,
  UpdateUserCommand,
} from "../../infrastructure/user";
import { CanNotRegisterUserError, UserNotFoundError } from "./errors";

export const updateUserName =
  (
    selectUserByIdQuery: SelectUserByIdQuery,
    userExists: UserExists,
    updateUserCommand: UpdateUserCommand,
  ) =>
  async (id: string, name: string) => {
    // ユーザーIDのバリデーション
    const userIdResult = UserId(id);
    if (userIdResult.isErr()) return err(userIdResult.error);

    // ユーザーの存在確認
    const userResult = await selectUserByIdQuery(userIdResult.value);
    if (userResult.isErr()) return err(userResult.error);
    const user = userResult.value;
    if (user === undefined)
      return err(new UserNotFoundError("ユーザーが見つかりませんでした。"));

    // ユーザー名のバリデーション
    const userNameResult = UserName(name);
    if (userNameResult.isErr()) return err(userNameResult.error);

    // ユーザー名の変更
    const updatedUser = changeUserName(user, userNameResult.value);

    // ユーザーの重複確認
    const existsResult = await userExists(updatedUser);
    if (existsResult.isErr()) return err(existsResult.error);
    if (existsResult.value)
      return err(new CanNotRegisterUserError("ユーザーは既に存在しています。"));

    // ユーザー名の更新
    return await updateUserCommand(updatedUser);
  };
