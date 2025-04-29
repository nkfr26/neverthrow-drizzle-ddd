import { userExists } from "./packages/domain/user/service/user-exists";
import {
  deleteUserCommand,
  insertUserCommand,
  selectAllUsersQuery,
  selectUserByIdQuery,
  selectUserByNameQuery,
  updateUserCommand,
} from "./packages/infrastructure/user";
import { deleteUser } from "./packages/use-case/user/delete-user";
import { getAllUsers } from "./packages/use-case/user/get-all-users";
import { registerUser } from "./packages/use-case/user/register-user";
import { updateUser } from "./packages/use-case/user/update-user";

const main = async () => {
  await registerUser(
    userExists(selectUserByNameQuery),
    insertUserCommand,
  )("hoge").then((result) => {
    result.match(
      (value) => console.log(value),
      (error) => console.error(error),
    );
  });

  await getAllUsers(selectAllUsersQuery)().then((result) => {
    result.match(
      (value) => console.log(value),
      (error) => console.error(error),
    );
  });

  await updateUser(
    selectUserByIdQuery,
    userExists(selectUserByNameQuery),
    updateUserCommand,
  )("01966230-8abb-71ca-80f2-0f127a1c4cf0", "fuga").then((result) => {
    result.match(
      (value) => console.log(value),
      (error) => console.error(error),
    );
  });

  await deleteUser(
    selectUserByIdQuery,
    deleteUserCommand,
  )("01966230-8abb-71ca-80f2-0f127a1c4cf0").then((result) => {
    result.match(
      (value) => console.log(value),
      (error) => console.error(error),
    );
  });
};

main();
