import { Args, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { Genre } from "./genre.model";
import { GenreService } from "./genre.service";
import { CreateGenreInput } from "./inputs/create-genre.input";
import { UpdateGenreInput } from "./inputs/update-genre.input";
import { RolesPermissions } from "../roles/role-permissions";

@Resolver(Genre)
export class GenreResolver {
  constructor(
    private readonly genreService: GenreService = new GenreService()
  ) {}

  @Query((returns) => [Genre])
  async genres() {
    return await this.genreService.genres();
  }

  @Authorized(RolesPermissions.CREATE_GENRES)
  @Mutation((returns) => Genre)
  async createGenre(@Args() input: CreateGenreInput) {
    return await this.genreService.createGenre(input);
  }

  @Authorized(RolesPermissions.UPDATE_GENRES)
  @Mutation((returns) => Genre)
  async updateGenre(@Args() input: UpdateGenreInput) {
    return await this.genreService.updateGenre(input);
  }
}
