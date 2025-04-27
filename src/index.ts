import { checkUserExists } from "./packages/domain/user/service/check-user-exists";
import {
  insertUserCommand,
  selectAllUsersQuery,
  selectUserByNameQuery,
} from "./packages/infrastructure/user";
import { getAllUsers } from "./packages/use-case/user/get-all-users";
import { registerUser } from "./packages/use-case/user/register-user";

const main = async () => {
  await registerUser(
    checkUserExists(selectUserByNameQuery),
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

  // await updateUserName(
  //   selectUserByIdQuery,
  //   checkUserExists(selectUserByNameQuery),
  //   updateUserCommand,
  // )("01966230-8abb-71ca-80f2-0f127a1c4cf0", "fuga").then((result) => {
  //   result.match(
  //     (value) => console.log(value),
  //     (error) => console.error(error),
  //   );
  // });

  // await deleteUser(
  //   selectUserByIdQuery,
  //   deleteUserCommand,
  // )("01966230-8abb-71ca-80f2-0f127a1c4cf0").then((result) => {
  //   result.match(
  //     (value) => console.log(value),
  //     (error) => console.error(error),
  //   );
  // });
};

main();
