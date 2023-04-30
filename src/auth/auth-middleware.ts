import { BaseException } from "../common/exceptions/errors";
import { authServiceObj as authService } from "../common/constants/services";

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
