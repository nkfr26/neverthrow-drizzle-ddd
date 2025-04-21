import { checkUserExists } from "./domain/user/service/check-user-exists";
import {
  findUserById,
  findUserByName,
  updateUser,
} from "./infrastructure/user-repository";
import { updateUserName } from "./use-case/user/update-user-name";

// registerUser(checkUserExists(findUserByName), insertUser)("nokky");
updateUserName(
  findUserById,
  checkUserExists(findUserByName),
  updateUser,
)("019658c7-f60a-72fd-a008-edd598ab8c68", "nokky2");
