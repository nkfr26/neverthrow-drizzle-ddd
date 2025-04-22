import { checkUserExists } from "./domain/user/service/check-user-exists";
import {
  findUserById,
  findUserByName,
  updateUser,
} from "./infrastructure/user-repository";
import { updateUserName } from "./use-case/user/update-user-name";

// registerUser(checkUserExists(findUserByName), insertUser)("hoge");
updateUserName(
  findUserById,
  checkUserExists(findUserByName),
  updateUser,
)("01965e16-5c1e-739b-9c72-3aafe9d05ba4", "fuga").then((result) => {
  result.match(
    (value) => console.log(value),
    (error) => console.error(error),
  );
});
