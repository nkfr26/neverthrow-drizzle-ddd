import { db } from "./db";
import { userExists } from "./packages/domain/user/service/user-exists";
import {
  selectUserByIdQuery,
  selectUserByNameQuery,
  updateUserCommand,
} from "./packages/infrastructure/user";
import { updateUser } from "./packages/use-case/user/update-user";

const f = async () =>
  await updateUser(
    selectUserByIdQuery(db),
    userExists(selectUserByNameQuery(db)),
    updateUserCommand(db),
  )("01966230-8abb-71ca-80f2-0f127a1c4cf0", "hoge").match(
    (value) => value,
    (error) => error,
  );

// トランザクションが必要な場合
// const f = async () =>
//   await db
//     .transaction((tx) =>
//       updateUser(
//         selectUserByIdQuery(tx),
//         userExists(selectUserByNameQuery(tx)),
//         updateUserCommand(tx),
//       )("01966230-8abb-71ca-80f2-0f127a1c4cf0", "hoge").match(
//         (value) => value,
//         (error) => {
//           throw error;
//         },
//       ),
//     )
//     .catch((error) => error);

const main = async () => {
  console.log(await f());
};
main();
