import { SignUpInput } from "./Inputs/sign-up.input";
import { hashPassword, validatePassword } from "../common/utils/password-utils";
import { BaseException } from "../common/exceptions/errors";
import { User } from "../user/user.model";
import { SignInInput } from "./Inputs/sign-in.input";
import { sign, verify } from "jsonwebtoken";
import { UserService } from "../user/user.service";
import { Role } from "../roles/role.model";

export class AuthService {
  constructor(private readonly userService: UserService = new UserService()) {}
  async signUp(input: SignUpInput) {
    try {
      await this.userService.checkIfUserExists(input.email);
      const password = await hashPassword(input.password);
      const user = await User.create({ ...input, password });
      this.generateToken(user);
      return user;
    } catch (e) {
      if (e.name === "SequelizeUniqueConstraintError")
        throw new BaseException(602);
      throw e;
    }
  }
  async signIn(input: SignInInput) {
    const user = await User.findOne({ where: { email: input.email } });
    if (!user) throw new BaseException(604);
    const correctPassword = await validatePassword(
      input.password,
      user.password
    );
    if (!correctPassword) throw new BaseException(603);
    this.generateToken(user);
    return user;
  }

  private generateToken(user: User) {
    const token = sign({ userId: user.id }, process.env.JWT_SECRET);
    user.token = token;
  }
  async validateCurrentUser(token: string) {
    const payload = await verify(token, process.env.JWT_SECRET);
    try {
      return await this.userService.getUser(payload["userId"], [Role]);
    } catch {
      return null;
    }
  }
}
