import { User } from "./user.model";

export class UserService {
    async users() {
        return await User.findAll()
    }
}


