export class CanNotRegisterUserError extends Error {
  readonly type = "CanNotRegisterUserError";
}

export class UserNotFoundError extends Error {
  readonly type = "UserNotFoundError";
}
