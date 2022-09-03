import { Ctx } from "type-graphql";
import { BaseException } from "../common/exceptions/errors";
import { GqlContext } from "../common/graphql/graphql-context";
import { UpdateUserInput } from "./inputs/update-user.input";
import { User } from "./user.model";

export class UserService {
    async users() {
        return await User.findAll()
    }

    async getUser(userId: string) {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) throw new BaseException(604);
        return user
    }

    async checkIfUserExists(email: string) {
        const user = await User.findOne({ where: { email } })
        if (user) throw new BaseException(601)
    }
    async updateUser(input: UpdateUserInput, currentUser: User) {
        const user = await User.update(input, { where: { id: currentUser.id }, returning: true })
        return user[1][0]
    }
}


