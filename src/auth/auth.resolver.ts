import { Args, Mutation, Resolver } from "type-graphql";
import { User } from "../user/user.model";
import { SignUpInput } from "./Inputs/sign-up.input";
import { AuthService } from "./auth.service";
import { SignInInput } from "./Inputs/sign-in.input";
@Resolver(User)
export class AuthResolver {
    constructor(private readonly authService: AuthService) {
        this.authService = new AuthService()
    }
    @Mutation(returns => User)
    async signUp(@Args() input: SignUpInput) {
        return await this.authService.signUp(input)
    }

    @Mutation(returns => User)
    async signIn(@Args() input: SignInInput) {
        return await this.authService.signIn(input)
    }
}
