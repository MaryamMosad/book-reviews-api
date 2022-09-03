import { User } from "../../user/user.model";

export interface GqlContext {
    currentUser: User
}