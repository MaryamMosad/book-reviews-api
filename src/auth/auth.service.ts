import { SignUpInput } from "./Inputs/sign-up.input";
import * as bcrypt from 'bcrypt'
import { BaseException } from "../common/exceptions/errors";
import { User } from "../user/user.model";
import { SignInInput } from "./Inputs/sign-in.input";
import { sign } from "jsonwebtoken"

export class AuthService {
    async signUp(input: SignUpInput) {
        try {
            await this.checkIfUserExists(input.email);
            const password = await bcrypt.hash(input.password, 12)
            const user = await User.create({ ...input, password })
            this.generateToken(user)
            return user
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError')
                throw new BaseException(602)
            throw e;
        }
    }
    async signIn(input: SignInInput) {
        const user = await User.findOne({ where: { email: input.email } })
        const correctPassword = await bcrypt.compare(input.password, user.password)
        if (!correctPassword) throw new BaseException(603);
        this.generateToken(user)
        return user;
    }
    private async checkIfUserExists(email: string) {
        const user = await User.findOne({ where: { email } })
        if (user) throw new BaseException(601)
    }
    private generateToken(user: User) {
        const token = sign({ id: user.id }, process.env.JWT_SECRET)
        user.token = token
    }
}

