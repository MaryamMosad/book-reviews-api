import { AuthService } from "../../auth/auth.service";
import { GenreService } from "../../genre/genre.service";
import { RoleService } from "../../roles/roles.service";
import { UserService } from "../../user/user.service";

const genreServiceObj = new GenreService();
const userServiceObj = new UserService();
const authServiceObj = new AuthService();
const roleServiceObj = new RoleService();

export { genreServiceObj, userServiceObj, authServiceObj, roleServiceObj };
