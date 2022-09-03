import { Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { GqlContext } from "../common/graphql/graphql-context";
import { UpdateUserInput } from "./inputs/update-user.input";
import { User } from "./user.model";
import { UserService } from "./user.service";


@Resolver(User)
export class UserResolver {
    constructor(private readonly userService: UserService) {
        this.userService = new UserService()
    }
    @Query(returns => [User])
    async users() {
        return await this.userService.users();
    }

    @Authorized()
    @Mutation(returns => User)
    async updateUserProfile(@Args() input: UpdateUserInput, @Ctx() ctx: GqlContext) {
        return await this.userService.updateUser(input, ctx.currentUser)
    }

}
