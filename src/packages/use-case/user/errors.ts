export class UserNotFoundError extends Error {
  readonly type = "UserNotFoundError";
}

export class CanNotRegisterUserError extends Error {
  readonly type = "CanNotRegisterUserError";
}
