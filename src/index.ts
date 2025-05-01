import { db } from "./db";
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
  await getAllUsers(selectAllUsersQuery(db))().then((result) => {
    result.match(
      (value) => console.log(value),
      (error) => console.error(error),
    );
  });

  try {
    await db.transaction(async (tx) => {
      const result = await registerUser(
        userExists(selectUserByNameQuery(tx)),
        insertUserCommand(tx),
      )("hoge");

      result.match(
        (value) => console.log(value),
        (error) => {
          throw error;
        },
      );
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await db.transaction(async (tx) => {
      const result = await updateUser(
        selectUserByIdQuery(tx),
        userExists(selectUserByNameQuery(tx)),
        updateUserCommand(tx),
      )("01966230-8abb-71ca-80f2-0f127a1c4cf0", "fuga");

      result.match(
        (value) => console.log(value),
        (error) => {
          throw error;
        },
      );
    });
  } catch (error) {
    console.error(error);
  }

  try {
    await db.transaction(async (tx) => {
      const result = await deleteUser(
        selectUserByIdQuery(tx),
        deleteUserCommand(tx),
      )("01966230-8abb-71ca-80f2-0f127a1c4cf0");

      result.match(
        (value) => console.log(value),
        (error) => {
          throw error;
        },
      );
    });
  } catch (error) {
    console.error(error);
  }
};

main();
