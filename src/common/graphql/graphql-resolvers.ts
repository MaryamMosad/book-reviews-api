import { AuthResolver } from "../../auth/auth.resolver";
import { GenreResolver } from "../../genre/genre.resolver";
import { RoleResolver } from "../../roles/roles.resolver";
import { UserResolver } from "../../user/user.resolver";

export const resolvers = [
  UserResolver,
  AuthResolver,
  GenreResolver,
  RoleResolver,
] as const;
