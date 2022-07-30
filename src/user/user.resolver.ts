import { Query, Resolver } from "type-graphql";
import { User } from "./user.model";
import { UserService } from "./user.service";

let userService = new UserService()

@Resolver(User)
export class UserResolver {
    constructor() {
    }
    @Query(returns => [User])
    async users() {
        return await userService.users();
    }

}
