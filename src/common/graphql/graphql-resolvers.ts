import { AuthResolver } from "../../auth/auth.resolver";
import { GenreResolver } from "../../genre/genre.resolver";
import { UserResolver } from "../../user/user.resolver";

export const resolvers = [UserResolver, AuthResolver, GenreResolver] as const;
