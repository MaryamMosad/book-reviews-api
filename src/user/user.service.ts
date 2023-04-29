import { BaseException } from "../common/exceptions/errors";
import { UpdateUserInput } from "./inputs/update-user.input";
import { User } from "./user.model";
import { Includeable } from "sequelize";

export class UserService {
  async users() {
    return await User.findAll();
  }

  async getUser(userId: string, include: Includeable[] = []) {
    const user = await User.findOne({ where: { id: userId }, include });
    if (!user) throw new BaseException(604);
    return user;
  }

  async checkIfUserExists(email: string) {
    const user = await User.findOne({ where: { email } });
    if (user) throw new BaseException(601);
  }
  async updateUser(input: UpdateUserInput, currentUser: User) {
    const user = await User.update(input, {
      where: { id: currentUser.id },
      returning: true,
    });
    return user[1][0];
  }
}
