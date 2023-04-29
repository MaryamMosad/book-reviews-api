import { log } from "console";
import { BaseException } from "../common/exceptions/errors";
import { AuthService } from "./auth.service";

let authService = new AuthService();

export async function getUserFromRequestHeaders(req) {
  const token = req.headers["authorization"];
  if (!token) return null;
  return await authService.validateCurrentUser(token);
}

export async function authChecker(
  { context: { currentUser } },
  roles: string[]
) {
  if (!currentUser) throw new BaseException(600);

  if (
    roles &&
    !roles.every((role) =>
      currentUser.role?.permissions?.find((perm) => perm === role)
    )
  )
    throw new BaseException(600);
  return true;
}
